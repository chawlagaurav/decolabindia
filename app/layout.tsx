import type { Metadata } from 'next';
import './globals.css';
import './luxury.css';

export const metadata: Metadata = {
  title: 'Decolab — Interiors with intent',
  description: 'Bespoke interiors for exceptional residences and retail spaces.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
