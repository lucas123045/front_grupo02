import { AlertCircle, Car, MapPin, Zap } from 'lucide-react';
import { PageContainer, PageHeader } from '../components/layout/PageContainer';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { stations, stationStatusMeta } from '../mock/stations';
import { cn } from '../lib/cn';

export default function Estacoes() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Infraestrutura"
        title="Estações"
        description="Status em tempo real de cada eletroposto da planta."
      />

      <div className="flex flex-wrap gap-2">
        {(Object.keys(stationStatusMeta) as (keyof typeof stationStatusMeta)[]).map((key) => (
          <Badge key={key} dot tone={key === 'disponivel' ? 'success' : key === 'carregando' ? 'info' : key === 'atencao' ? 'warning' : key === 'erro' ? 'danger' : 'neutral'}>
            {stationStatusMeta[key].label}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stations.map((station) => {
          const meta = stationStatusMeta[station.status];
          const usagePct = Math.round((station.powerKw / station.maxPowerKw) * 100);
          return (
            <Card key={station.id} className="flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display text-sm font-semibold text-text">{station.name}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-text-muted">
                    <MapPin className="h-3 w-3" /> {station.location}
                  </p>
                </div>
                <span className={cn('flex items-center gap-1.5 font-mono text-[11px]', meta.textClass)}>
                  <span className={cn('h-1.5 w-1.5 rounded-full', meta.dotClass)} />
                  {meta.label}
                </span>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between font-mono text-xs text-text-muted">
                  <span>{station.powerKw.toFixed(1)} kW</span>
                  <span>{station.maxPowerKw} kW máx.</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
                  <div
                    className={cn('h-full rounded-full', station.status === 'erro' ? 'bg-red' : 'bg-blue')}
                    style={{ width: `${Math.min(usagePct, 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border-soft pt-3 text-xs">
                <div className="flex items-center gap-1.5 text-text-muted">
                  <Car className="h-3.5 w-3.5" />
                  {station.connectedVehicle ?? 'Sem veículo'}
                </div>
                <div className="flex items-center gap-1.5 text-text-muted">
                  <Zap className="h-3.5 w-3.5" />
                  {station.energyTodayKwh.toFixed(1)} kWh hoje
                </div>
              </div>

              {station.alertCount > 0 && (
                <div className="flex items-center gap-1.5 rounded-md bg-warning-dim px-2.5 py-1.5 text-xs text-warning">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {station.alertCount} alerta{station.alertCount > 1 ? 's' : ''} ativo{station.alertCount > 1 ? 's' : ''}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}
