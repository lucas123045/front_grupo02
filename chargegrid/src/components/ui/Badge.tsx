import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'magenta';

const toneClasses: Record<BadgeTone, string> = {
  neutral: 'bg-surface-3 text-text-muted',
  success: 'bg-success-dim text-success',
  warning: 'bg-warning-dim text-warning',
  danger: 'bg-red-dim text-red',
  info: 'bg-blue-dim text-blue',
  magenta: 'bg-magenta-dim text-magenta',
};

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  dot?: boolean;
  className?: string;
}

export function Badge({ children, tone = 'neutral', dot, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wide',
        toneClasses[tone],
        className,
      )}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', toneDot[tone])} />}
      {children}
    </span>
  );
}

const toneDot: Record<BadgeTone, string> = {
  neutral: 'bg-text-faint',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-red',
  info: 'bg-blue',
  magenta: 'bg-magenta',
};
