import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Winters Operations',
  description: 'Operations and AI automation consulting for teams that need practical execution.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
