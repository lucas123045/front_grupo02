import { Download, FileText } from 'lucide-react';
import { PageContainer, PageHeader } from '../components/layout/PageContainer';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CostBarChart } from '../components/charts/CostBarChart';
import { costHistory } from '../mock/energy';
import { sessions } from '../mock/sessions';

export default function Relatorios() {
  const totalEnergy = sessions.reduce((sum, s) => sum + s.energyKwh, 0);
  const totalCost = sessions.reduce((sum, s) => sum + s.costBrl, 0);
  const completed = sessions.filter((s) => s.status === 'concluida').length;

  const reports = [
    { name: 'Relatório operacional — Agosto 2026', type: 'Operacional', size: '182 KB' },
    { name: 'Relatório financeiro — Julho 2026', type: 'Financeiro', size: '96 KB' },
    { name: 'relatorio_sessoes.txt (exportação bruta)', type: 'Sessões', size: '41 KB' },
  ];

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Consolidado"
        title="Relatórios"
        description="Relatórios operacionais e financeiros gerados a partir do histórico de sessões."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-xs text-text-muted">Sessões concluídas (histórico)</p>
          <p className="mt-1 font-mono text-2xl font-semibold text-text">{completed}</p>
        </Card>
        <Card>
          <p className="text-xs text-text-muted">Energia total consumida</p>
          <p className="mt-1 font-mono text-2xl font-semibold text-text">{totalEnergy.toFixed(1)} <span className="text-sm font-normal text-text-muted">kWh</span></p>
        </Card>
        <Card>
          <p className="text-xs text-text-muted">Receita total (histórico)</p>
          <p className="mt-1 font-mono text-2xl font-semibold text-text">R$ {totalCost.toFixed(2).replace('.', ',')}</p>
        </Card>
      </div>

      <Card>
        <CardHeader eyebrow="Últimos 7 dias" title="Evolução de custo" />
        <CostBarChart data={costHistory} />
      </Card>

      <Card padded={false}>
        <div className="p-5 pb-0">
          <CardHeader eyebrow="Exportações" title="Relatórios disponíveis" />
        </div>
        <ul className="divide-y divide-border-soft">
          {reports.map((report) => (
            <li key={report.name} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="flex min-w-0 items-center gap-3">
                <FileText className="h-4 w-4 shrink-0 text-text-faint" />
                <div className="min-w-0">
                  <p className="truncate text-sm text-text">{report.name}</p>
                  <p className="text-xs text-text-muted">{report.type} · {report.size}</p>
                </div>
              </div>
              <Button variant="outline" className="shrink-0">
                <Download className="h-3.5 w-3.5" /> Baixar
              </Button>
            </li>
          ))}
        </ul>
      </Card>
    </PageContainer>
  );
}
