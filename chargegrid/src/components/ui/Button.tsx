import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline';
}

export function Button({ variant = 'ghost', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta',
        variant === 'primary' && 'bg-red text-white hover:bg-red/90',
        variant === 'outline' && 'border border-border text-text hover:border-text-faint',
        variant === 'ghost' && 'text-text-muted hover:bg-surface-2 hover:text-text',
        className,
      )}
      {...props}
    />
  );
}
