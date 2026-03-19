'use client';

import Link from 'next/link';
import { Heart, Search } from 'lucide-react';

import { useWatchlist } from '@/context/watchlist-context';
import { MediaCard } from '@/components/media-card';
import { EmptyState } from '@/components/empty-state';
import { Button } from '@/components/ui/button';

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();

  if (watchlist.length === 0) {
    return (
      <div className="space-y-4">
        <EmptyState
          icon={Heart}
          title="Your watchlist is empty"
          description="Add movies and TV shows from the search page to build your watchlist."
        />
        <div className="flex justify-center">
          <Button asChild variant="outline">
            <Link href="/">
              <Search className="mr-2 h-4 w-4" />
              Browse titles
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">
        My Watchlist
        <span className="ml-2 text-base font-normal text-muted-foreground">
          ({watchlist.length} {watchlist.length === 1 ? 'title' : 'titles'})
        </span>
      </h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {watchlist.map((item) => (
          <MediaCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
