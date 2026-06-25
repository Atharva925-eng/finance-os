import { ReactNode } from 'react';
import { cn } from '../lib/utils';
import Card from './Card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number; // e.g. 12.5 (represents 12.5%)
    isPositive: boolean;
  };
  trendLabel?: string;
  className?: string;
}

export default function StatCard({ title, value, icon, trend, trendLabel, className }: StatCardProps) {
  return (
    <Card className={cn("p-6", className)}>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            {value}
          </h3>
        </div>
        {icon && (
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>

      {trend && (
        <div className="flex items-center gap-2 mt-4">
          <span
            className={cn(
              "flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full",
              trend.isPositive
                ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                : "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400"
            )}
          >
            {trend.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(trend.value)}%
          </span>
          {trendLabel && (
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {trendLabel}
            </span>
          )}
        </div>
      )}
    </Card>
  );
}
