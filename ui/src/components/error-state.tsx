import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
      <AlertCircle className="h-5 w-5 shrink-0" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
