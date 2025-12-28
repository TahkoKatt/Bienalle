import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Biennale - Contemporary Arts Festival',
  description: 'Experience groundbreaking performances, opera, and contemporary arts at the Biennale festival.',
  keywords: ['biennale', 'festival', 'opera', 'contemporary arts', 'performance', 'music'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ fontFamily: 'var(--font-sans)' }}>
        {children}
      </body>
    </html>
  );
}
