import { TrendingUp, Wrench, Coins, Sparkles } from 'lucide-react';
import type { AIInsight } from '../../mock/types';

const iconMap = {
  peak: TrendingUp,
  optimize: Sparkles,
  price: Coins,
  efficiency: Wrench,
};

export function AIInsightCard({ insight }: { insight: AIInsight }) {
  const Icon = iconMap[insight.icon];

  return (
    <div className="rounded-lg border border-border-soft bg-surface-2 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-magenta-dim text-magenta">
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-text">{insight.title}</p>
            <span className="shrink-0 font-mono text-[11px] text-text-faint">{insight.createdAt}</span>
          </div>
          {insight.probabilityPct !== undefined && (
            <p className="mt-0.5 font-mono text-xs text-magenta">{insight.probabilityPct}% de probabilidade</p>
          )}
          <p className="mt-1.5 text-xs leading-relaxed text-text-muted">{insight.description}</p>
          <p className="mt-2 rounded-md bg-base/40 px-2.5 py-2 text-xs leading-relaxed text-text">
            <span className="font-medium text-text">Recomendação: </span>
            {insight.recommendation}
          </p>
          {!!insight.estimatedSavingBrl && (
            <p className="mt-2 font-mono text-xs text-success">
              Economia estimada: R$ {insight.estimatedSavingBrl.toFixed(2).replace('.', ',')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
