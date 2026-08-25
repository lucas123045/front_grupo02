import type { ReactNode } from 'react';

export function PageContainer({ children }: { children: ReactNode }) {
  return <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">{children}</div>;
}

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-magenta">{eyebrow}</p>
        <h2 className="font-display text-2xl font-semibold tracking-wide text-text">{title}</h2>
        {description && <p className="mt-1 max-w-2xl text-sm text-text-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}
