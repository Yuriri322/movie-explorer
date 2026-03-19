import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export function MediaCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-[2/3] rounded-none" />
      <CardContent className="p-3">
        <Skeleton className="h-4 w-3/4" />
        <div className="mt-2 flex items-center gap-2">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-10" />
        </div>
      </CardContent>
    </Card>
  );
}
