import { ArrowRight, Gauge } from 'lucide-react';
import type { DemandState } from '../../mock/types';
import { cn } from '../../lib/cn';

export function DemandControl({ data }: { data: DemandState }) {
  const pct = Math.round((data.currentKw / data.limitKw) * 100);
  const barTone = pct >= 90 ? 'bg-red' : pct >= 70 ? 'bg-warning' : 'bg-success';

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-xs text-text-muted">Demanda atual</span>
          <span className="font-mono text-sm text-text">
            {data.currentKw} / {data.limitKw} kW
          </span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-3">
          <div
            className={cn('h-full rounded-full transition-all', barTone)}
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
        </div>
        <p className="mt-1 text-right font-mono text-xs text-text-faint">{pct}%</p>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-border-soft bg-surface-2 px-3.5 py-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            {data.dynamicControlActive && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            )}
            <span className={cn('relative inline-flex h-2 w-2 rounded-full', data.dynamicControlActive ? 'bg-success' : 'bg-offline')} />
          </span>
          <div>
            <p className="text-xs font-semibold text-text">
              Controle dinâmico {data.dynamicControlActive ? 'ativo' : 'inativo'}
            </p>
            {data.reason && <p className="mt-0.5 max-w-[220px] text-[11px] text-text-muted">{data.reason}</p>}
          </div>
        </div>
        <Gauge className="h-4 w-4 shrink-0 text-text-faint" />
      </div>

      {data.adjustedFromKw !== undefined && data.adjustedToKw !== undefined && (
        <div className="flex items-center gap-2 font-mono text-sm text-text">
          <span className="text-text-muted">Potência do carregador</span>
          <span>{data.adjustedFromKw} kW</span>
          <ArrowRight className="h-3.5 w-3.5 text-magenta" />
          <span className="text-magenta">{data.adjustedToKw} kW</span>
        </div>
      )}
    </div>
  );
}
