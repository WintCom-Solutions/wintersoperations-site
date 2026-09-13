import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import NetworkTopology from '@/app/network-topology/page';

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

describe('NetworkTopology', () => {
  it('shows HQ Datacenter details by default', () => {
    render(<NetworkTopology />);

    expect(
      screen.getByRole('heading', { name: /multi-site sd-wan topology/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'HQ Datacenter' })).toBeInTheDocument();
    expect(screen.getByText('Chicago, IL')).toBeInTheDocument();
    expect(screen.getByText('1000 Mbps')).toBeInTheDocument();
    expect(screen.getByText('24 devices')).toBeInTheDocument();
  });

  it('updates the details panel when a site is selected from All Sites', async () => {
    const user = userEvent.setup();

    render(<NetworkTopology />);

    await user.click(screen.getByRole('button', { name: 'West Regional' }));

    expect(screen.getByRole('heading', { name: 'West Regional' })).toBeInTheDocument();
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    expect(screen.getByText('300 Mbps')).toBeInTheDocument();
    expect(screen.getByText('16 devices')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'LA Branch' }));

    expect(screen.getByRole('heading', { name: 'LA Branch' })).toBeInTheDocument();
    expect(screen.getByText('Los Angeles, CA')).toBeInTheDocument();
    expect(screen.getByText('150 Mbps')).toBeInTheDocument();
    expect(screen.getAllByText('52ms').length).toBeGreaterThan(0);
  });
});
