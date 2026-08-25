import { Sun, BatteryMedium, House, Zap, Car } from 'lucide-react';
import type { EnergyFlowState } from '../../mock/types';
import { cn } from '../../lib/cn';

interface EnergyFlowProps {
  data: EnergyFlowState;
}

const nodeX = [100, 300, 500, 700, 900];

export function EnergyFlow({ data }: EnergyFlowProps) {
  const links = [
    { active: data.solarKw > 0, color: 'var(--color-warning)' },
    { active: data.batteryKw > 0, color: 'var(--color-magenta)' },
    { active: data.gridKw > 0 || data.chargerKw > 0, color: 'var(--color-blue)' },
    { active: data.vehicleConnected, color: 'var(--color-red)' },
  ];

  return (
    <div className="relative">
      <svg viewBox="0 0 1000 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
        {links.map((link, i) => (
          <line
            key={i}
            x1={nodeX[i]}
            y1={100}
            x2={nodeX[i + 1]}
            y2={100}
            stroke={link.active ? link.color : 'var(--color-border)'}
            strokeWidth={2}
            strokeDasharray="7 7"
            className={link.active ? 'animate-flow' : undefined}
            strokeLinecap="round"
          />
        ))}
      </svg>

      <div className="relative grid grid-cols-5 gap-1 pt-2">
        <FlowNode
          icon={Sun}
          label="Solar"
          value={`${data.solarKw.toFixed(1)} kW`}
          tone="warning"
          active={data.solarKw > 0}
        />
        <FlowNode
          icon={BatteryMedium}
          label="Bateria"
          value={`${data.batteryPct}%`}
          sub={data.batteryDirection === 'descarregando' ? 'Descarregando' : data.batteryDirection === 'carregando' ? 'Carregando' : 'Parada'}
          tone="magenta"
          active={data.batteryKw > 0}
        />
        <FlowNode
          icon={House}
          label="Rede / Residência"
          value={`${data.gridKw.toFixed(1)} kW`}
          tone="blue"
          active
        />
        <FlowNode
          icon={Zap}
          label="EV Charger"
          value={`${data.chargerKw.toFixed(1)} kW`}
          tone="red"
          active={data.chargerKw > 0}
        />
        <FlowNode
          icon={Car}
          label={data.vehicleModel ?? 'Sem veículo'}
          value={data.vehicleConnected ? `${data.vehicleBatteryPct}%` : '—'}
          tone="success"
          active={data.vehicleConnected}
        />
      </div>
    </div>
  );
}

interface FlowNodeProps {
  icon: typeof Sun;
  label: string;
  value: string;
  sub?: string;
  tone: 'warning' | 'magenta' | 'blue' | 'red' | 'success';
  active: boolean;
}

const toneRing: Record<FlowNodeProps['tone'], string> = {
  warning: 'border-warning text-warning',
  magenta: 'border-magenta text-magenta',
  blue: 'border-blue text-blue',
  red: 'border-red text-red',
  success: 'border-success text-success',
};

function FlowNode({ icon: Icon, label, value, sub, tone, active }: FlowNodeProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div
        className={cn(
          'flex h-14 w-14 items-center justify-center rounded-full border-2 bg-surface-2 transition-opacity',
          toneRing[tone],
          !active && 'opacity-35',
        )}
      >
        <Icon className={cn('h-6 w-6', active && 'animate-pulse-soft')} strokeWidth={1.6} />
      </div>
      <div>
        <p className="font-mono text-sm font-semibold text-text">{value}</p>
        <p className="text-[11px] leading-tight text-text-muted">{label}</p>
        {sub && <p className="text-[10px] leading-tight text-text-faint">{sub}</p>}
      </div>
    </div>
  );
}
