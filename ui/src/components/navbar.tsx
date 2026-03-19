'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Film, Heart } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useWatchlist } from '@/context/watchlist-context';
import { Badge } from '@/components/ui/badge';

const NAV_LINKS = [
  { href: '/', label: 'Search', icon: Film },
  { href: '/watchlist', label: 'Watchlist', icon: Heart },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const { watchlist } = useWatchlist();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        <Link href="/" className="mr-6 flex items-center gap-2 text-lg font-bold">
          <Film className="h-5 w-5" />
          Movie Explorer
        </Link>
        <nav className="flex items-center gap-4">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-foreground/80',
                pathname === href ? 'text-foreground' : 'text-foreground/60',
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
              {href === '/watchlist' && watchlist.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                  {watchlist.length}
                </Badge>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
