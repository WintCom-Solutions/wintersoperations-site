import React, { act } from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ITOpsConsole from '@/app/itops-console/page';

vi.mock('next/image', () => ({
  default: ({
    alt,
    src,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={String(src)} {...props} />
  ),
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

afterEach(() => {
  vi.useRealTimers();
});

describe('ITOpsConsole', () => {
  it('searches for a known device and renders inventory details', async () => {
    vi.useFakeTimers();
    let now = 1_000;
    vi.spyOn(Date, 'now').mockImplementation(() => now++);

    render(<ITOpsConsole />);

    expect(
      screen.getByRole('heading', { name: /device inventory search/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/active alerts/i)).toBeInTheDocument();
    expect(
      screen.getByText(/network latency spike detected on primary wan link/i),
    ).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(/switch-sf-01/i), {
      target: { value: 'switch-sf-01' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1800);
    });

    expect(screen.getAllByText('switch-sf-01').length).toBeGreaterThan(0);
    expect(screen.getAllByText('192.168.1.10').length).toBeGreaterThan(0);
    expect(screen.getByText('Cisco Meraki MS425-32')).toBeInTheDocument();
    expect(screen.getByText('San Francisco Regional')).toBeInTheDocument();
  });

  it('moves an alert out of active alerts when marked resolved', async () => {
    const user = userEvent.setup();

    render(<ITOpsConsole />);

    const activeAlerts = screen
      .getByText(/active alerts/i)
      .closest('div')?.parentElement;
    expect(activeAlerts).not.toBeNull();
    expect(
      within(activeAlerts as HTMLElement).getByText(
        /network latency spike detected on primary wan link/i,
      ),
    ).toBeInTheDocument();

    await user.click(
      within(activeAlerts as HTMLElement).getAllByRole('button', {
        name: /mark resolved/i,
      })[0],
    );

    expect(
      within(activeAlerts as HTMLElement).queryByText(
        /network latency spike detected on primary wan link/i,
      ),
    ).not.toBeInTheDocument();
    expect(screen.getByText(/resolved \(2\)/i)).toBeInTheDocument();
  });
});
