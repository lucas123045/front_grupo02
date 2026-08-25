import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/cn';

interface KPICardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  unit?: string;
  tone?: 'red' | 'magenta' | 'blue' | 'success' | 'warning';
  trend?: { value: string; positive: boolean };
}

const toneClasses: Record<NonNullable<KPICardProps['tone']>, string> = {
  red: 'text-red bg-red-dim',
  magenta: 'text-magenta bg-magenta-dim',
  blue: 'text-blue bg-blue-dim',
  success: 'text-success bg-success-dim',
  warning: 'text-warning bg-warning-dim',
};

export function KPICard({ icon: Icon, label, value, unit, tone = 'blue', trend }: KPICardProps) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg', toneClasses[tone])}>
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </div>
        {trend && (
          <span className={cn('font-mono text-[11px] font-medium', trend.positive ? 'text-success' : 'text-red')}>
            {trend.positive ? '▲' : '▼'} {trend.value}
          </span>
        )}
      </div>
      <p className="mt-3 font-mono text-2xl font-semibold text-text">
        {value}
        {unit && <span className="ml-1 text-sm font-normal text-text-muted">{unit}</span>}
      </p>
      <p className="mt-0.5 text-xs text-text-muted">{label}</p>
    </div>
  );
}
