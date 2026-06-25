import { cn } from '../lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export default function Skeleton({ className, variant = 'rectangular' }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-slate-200 dark:bg-slate-800",
        variant === 'text' && "h-4 w-full rounded-md",
        variant === 'circular' && "rounded-full",
        variant === 'rectangular' && "rounded-2xl",
        className
      )}
    />
  );
}
