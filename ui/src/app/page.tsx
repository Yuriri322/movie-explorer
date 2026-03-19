'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, SearchX } from 'lucide-react';

import { useSearchMultiLazyQuery } from '@/generated/graphql';
import { useDebounce } from '@/hooks/use-debounce';
import { SearchInput } from '@/components/search-input';
import { MediaCard } from '@/components/media-card';
import { MediaCardSkeleton } from '@/components/media-card-skeleton';
import { EmptyState } from '@/components/empty-state';
import { ErrorState } from '@/components/error-state';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const abortControllerRef = useRef<AbortController | null>(null);

  const [executeSearch, { data, loading, error }] = useSearchMultiLazyQuery({
    fetchPolicy: 'network-only',
  });

  function search(searchQuery: string) {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    executeSearch({
      variables: { query: searchQuery },
      context: {
        fetchOptions: { signal: controller.signal },
      },
    });
  }

  useEffect(() => {
    if (debouncedQuery.trim()) {
      search(debouncedQuery.trim());
    }
  }, [debouncedQuery]);

  const results = data?.searchMulti.results ?? [];
  const hasSearched = debouncedQuery.trim().length > 0;
  const showSkeleton = loading && results.length === 0;
  const showEmpty = hasSearched && !loading && !error && results.length === 0;
  const showResults = results.length > 0;

  return (
    <div className="space-y-6">
      <SearchInput value={query} onChange={setQuery} />

      {error && <ErrorState message={error.message} />}

      {showSkeleton && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <MediaCardSkeleton key={i} />
          ))}
        </div>
      )}

      {showEmpty && (
        <EmptyState
          icon={SearchX}
          title="No results found"
          description={`We couldn't find any movies or TV shows matching "${debouncedQuery}".`}
        />
      )}

      {!hasSearched && !loading && (
        <EmptyState
          icon={Search}
          title="Search for movies & TV shows"
          description="Start typing to find your favorite titles."
        />
      )}

      {showResults && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {results.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
