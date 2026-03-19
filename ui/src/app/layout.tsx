import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { ApolloWrapper } from '@/lib/apollo-provider';
import { WatchlistProvider } from '@/context/watchlist-context';
import { Navbar } from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Movie Explorer',
  description: 'Browse movies and TV shows',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <WatchlistProvider>
            <Navbar />
            <main className="container mx-auto px-4 py-6">{children}</main>
          </WatchlistProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
