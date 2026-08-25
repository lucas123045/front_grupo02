import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

export function Card({ children, className, padded = true }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-surface',
        padded && 'p-5',
        className,
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}

export function CardHeader({ eyebrow, title, action }: CardHeaderProps) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        {eyebrow && (
          <p className="mb-1 font-mono text-[11px] uppercase tracking-wider text-text-faint">{eyebrow}</p>
        )}
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-text">{title}</h3>
      </div>
      {action}
    </div>
  );
}
