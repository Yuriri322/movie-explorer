'use client';

import Image from 'next/image';
import { Heart, Star } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useWatchlist, type WatchlistItem } from '@/context/watchlist-context';
import { MediaType } from '@/generated/graphql';
import { getImageUrl } from '@/lib/image';
import { cn } from '@/lib/utils';

interface MediaCardProps {
  item: WatchlistItem;
}

export function MediaCard({ item }: MediaCardProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(item.id);

  const imageUrl = getImageUrl(item.posterPath);
  const year = item.releaseDate ? new Date(item.releaseDate).getFullYear() : null;
  const rating = item.voteAverage != null ? Math.round(item.voteAverage * 10) / 10 : null;

  function handleToggleWatchlist() {
    if (inWatchlist) {
      removeFromWatchlist(item.id);
    } else {
      addToWatchlist(item);
    }
  }

  return (
    <Card className="group overflow-hidden">
      <div className="relative aspect-[2/3] bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No poster
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background/90"
          onClick={handleToggleWatchlist}
        >
          <Heart
            className={cn(
              'h-4 w-4',
              inWatchlist ? 'fill-red-500 text-red-500' : 'text-foreground',
            )}
          />
        </Button>
      </div>
      <CardContent className="p-3">
        <h3 className="text-sm font-medium leading-tight line-clamp-2">{item.title}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {item.mediaType === MediaType.Movie ? 'Movie' : 'TV'}
          </Badge>
          {year && (
            <span className="text-xs text-muted-foreground">{year}</span>
          )}
          {rating != null && rating > 0 && (
            <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
              {rating}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
