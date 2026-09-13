import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ContactForm from '@/components/ContactForm';

vi.mock('@vercel/analytics', () => ({
  track: vi.fn(),
}));

async function fillAndSubmit(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByPlaceholderText('Name'), 'Jane Doe');
  await user.type(screen.getByPlaceholderText('Email'), 'jane@example.com');
  await user.type(
    screen.getByPlaceholderText('What are you trying to fix?'),
    'My VPN keeps dropping.',
  );
  await user.click(screen.getByRole('checkbox'));
  await user.click(screen.getByRole('button', { name: /send message/i }));
}

describe('ContactForm', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('shows the sent confirmation after a successful submission', async () => {
    const user = userEvent.setup();
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      type: 'basic',
      ok: true,
    });

    render(<ContactForm />);
    await fillAndSubmit(user);

    await waitFor(() =>
      expect(
        screen.getByText(/your message is on its way/i),
      ).toBeInTheDocument(),
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('shows an error message when the request fails outright', async () => {
    const user = userEvent.setup();
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('network down'),
    );

    render(<ContactForm />);
    await fillAndSubmit(user);

    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent(/something went wrong/i),
    );
    expect(
      screen.queryByText(/your message is on its way/i),
    ).not.toBeInTheDocument();
  });

  it('treats an opaque response as a failure, not a success', async () => {
    // Regression test for commit 55477d2: a no-cors response is always
    // type "opaque" and always ok:false-but-truthy from fetch's
    // perspective — it must not be read as a successful submission.
    const user = userEvent.setup();
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      type: 'opaque',
      ok: false,
    });

    render(<ContactForm />);
    await fillAndSubmit(user);

    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent(/something went wrong/i),
    );
    expect(
      screen.queryByText(/your message is on its way/i),
    ).not.toBeInTheDocument();
  });

  it('does not submit while required fields are empty', async () => {
    const user = userEvent.setup();

    render(<ContactForm />);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(global.fetch).not.toHaveBeenCalled();
    expect(
      screen.queryByText(/your message is on its way/i),
    ).not.toBeInTheDocument();
  });
});
