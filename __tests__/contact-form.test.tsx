import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const trackMock = vi.fn();

vi.mock('@vercel/analytics', () => ({
  track: (...args: unknown[]) => trackMock(...args),
}));

vi.mock('@/lib/site', () => ({
  contactEmail: 'solutions@wintersoperations.com',
  contactEndpoint: 'https://example.com/submit',
  googleForm: {
    formId: '',
    entryName: 'entry.name',
    entryEmail: 'entry.email',
    entryMessage: 'entry.message',
    entryConsent: 'entry.consent',
    consentValue: 'I consent to Winters Operations using this information to respond to my inquiry.',
  },
}));

import ContactForm from '@/components/ContactForm';

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByPlaceholderText('Name'), 'Jane Doe');
  await user.type(screen.getByPlaceholderText('Email'), 'jane@example.com');
  await user.type(
    screen.getByPlaceholderText('What are you trying to fix?'),
    'Our WAN keeps flapping.',
  );
  await user.click(screen.getByRole('checkbox'));
}

describe('ContactForm', () => {
  beforeEach(() => {
    trackMock.mockClear();
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('submits successfully and shows the confirmation message', async () => {
    const user = userEvent.setup();
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      type: 'basic',
      ok: true,
    });

    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByRole('status')).toHaveTextContent(
      /thanks — your message is on its way/i,
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);

    const [endpoint, options] = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(endpoint).toBe('https://example.com/submit');
    const body = options.body as URLSearchParams;
    expect(body.get('name')).toBe('Jane Doe');
    expect(body.get('email')).toBe('jane@example.com');
    expect(body.get('message')).toBe('Our WAN keeps flapping.');
    expect(trackMock).toHaveBeenCalledWith('contact_form_success');
  });

  it('shows an error message when the response is not ok', async () => {
    const user = userEvent.setup();
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      type: 'basic',
      ok: false,
    });

    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
    expect(trackMock).toHaveBeenCalledWith('contact_form_error');
  });

  it('treats an opaque response as a failure, not a silent success', async () => {
    const user = userEvent.setup();
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      type: 'opaque',
      ok: true,
    });

    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
    expect(trackMock).toHaveBeenCalledWith('contact_form_error');
    expect(screen.queryByRole('status', { name: '' })).not.toHaveTextContent(
      /thanks — your message is on its way/i,
    );
  });

  it('shows an error message when the request throws', async () => {
    const user = userEvent.setup();
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('network down'));

    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
    expect(trackMock).toHaveBeenCalledWith('contact_form_error');
  });

  it('marks name, email, message, and consent as required and does not submit an empty form', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    expect(screen.getByPlaceholderText('Name')).toBeRequired();
    expect(screen.getByPlaceholderText('Email')).toBeRequired();
    expect(screen.getByPlaceholderText('What are you trying to fix?')).toBeRequired();
    expect(screen.getByRole('checkbox')).toBeRequired();

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('requires a valid email address before submitting', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText('Name'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('Email'), 'not-an-email');
    await user.type(
      screen.getByPlaceholderText('What are you trying to fix?'),
      'Our WAN keeps flapping.',
    );
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(global.fetch).not.toHaveBeenCalled();
  });
});
