import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import type { AlertItem, AlertSeverity } from '../../mock/types';
import { cn } from '../../lib/cn';

const severityMeta: Record<AlertSeverity, { icon: typeof Info; className: string }> = {
  info: { icon: Info, className: 'text-blue bg-blue-dim' },
  success: { icon: CheckCircle2, className: 'text-success bg-success-dim' },
  warning: { icon: AlertTriangle, className: 'text-warning bg-warning-dim' },
  error: { icon: XCircle, className: 'text-red bg-red-dim' },
};

export function AlertsPanel({ alerts }: { alerts: AlertItem[] }) {
  return (
    <ul className="space-y-2.5">
      {alerts.map((alert) => {
        const meta = severityMeta[alert.severity];
        const Icon = meta.icon;
        return (
          <li key={alert.id} className="flex items-start gap-3">
            <div className={cn('mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full', meta.className)}>
              <Icon className="h-3.5 w-3.5" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-text">{alert.title}</p>
                <span className="shrink-0 font-mono text-[11px] text-text-faint">{alert.time}</span>
              </div>
              <p className="mt-0.5 text-xs leading-relaxed text-text-muted">{alert.message}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
