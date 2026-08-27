import { useState } from 'react';
import { PageContainer, PageHeader } from '../components/layout/PageContainer';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { CHARGE_TYPES, type ChargeType, type ChargingSession } from '../mock/types';
import { useSessions } from '../context/SessionsContext';
import {
  calcularEnergiaNecessaria,
  calcularTempoNecessarioSegundos,
  gerarFatura,
  type Fatura,
} from '../lib/tarifacao';

// DEMO — sem requisição HTTP. "Adicionar carro" e "gerar fatura" rodam
// inteiramente no navegador, usando a mesma fórmula de equacoesRecarga.py +
// sistemaCobranca.py. O estado de sessões vem do SessionsContext, então
// Dashboard e Sessões refletem a sessão nova automaticamente.

const inputClass =
  'w-full rounded-lg border border-border-soft bg-surface-2 px-3.5 py-2.5 text-sm text-text outline-none focus:border-magenta';
const labelClass = 'mb-1.5 block text-xs font-medium uppercase tracking-wide text-text-faint';

export default function NovaSessao() {
  const { sessions, setSessions } = useSessions();
  const [fatura, setFatura] = useState<Fatura | null>(null);

  const [nome, setNome] = useState('');
  const [modelo, setModelo] = useState('');
  const [tipoRecarga, setTipoRecarga] = useState<ChargeType>('rapida');
  const [capacidade, setCapacidade] = useState(60);
  const [bateriaAtual, setBateriaAtual] = useState(40);

  function adicionarCarro() {
    if (!nome.trim() || !modelo.trim()) return;

    const quantidadeCarrosAtivos = sessions.filter((s) => s.status === 'em-andamento').length + 1;
    const energiaKwh = calcularEnergiaNecessaria(capacidade, bateriaAtual);
    const potenciaKw = CHARGE_TYPES[tipoRecarga].maxPowerKw;
    const tempoSegundos = calcularTempoNecessarioSegundos(energiaKwh, potenciaKw);
    const novaFatura = gerarFatura(nome, modelo, tipoRecarga, energiaKwh, quantidadeCarrosAtivos);

    const novaSessao: ChargingSession = {
      id: `S-${Math.floor(1000 + Math.random() * 9000)}`,
      stationId: 'HCA-001',
      stationName: 'HCA-001',
      clientName: nome,
      vehicleModel: modelo,
      chargeType: tipoRecarga,
      startedAt: new Date().toISOString(),
      durationMin: Math.round(tempoSegundos / 60),
      energyKwh: energiaKwh,
      avgPowerKw: potenciaKw,
      costBrl: novaFatura.totalBrl,
      status: 'em-andamento',
      batteryPct: bateriaAtual,
    };

    setSessions((prev) => [novaSessao, ...prev]);
    setFatura(novaFatura);
    setNome('');
    setModelo('');

    // Teto de segurança só pra demo: tempoSegundos já vem acelerado 100x
    // (equacoesRecarga.py), mas em cenários com bateria baixa + potência
    // baixa ainda pode passar de vários minutos. Sem isso, o timer real
    // continua sendo usado — só limitamos o que dispara a finalização.
    const TEMPO_MAX_DEMO_SEGUNDOS = 20;
    const delayMs = Math.min(tempoSegundos, TEMPO_MAX_DEMO_SEGUNDOS) * 1000;

    setTimeout(() => {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === novaSessao.id
            ? { ...s, status: 'concluida' as const, endedAt: new Date().toISOString() }
            : s,
        ),
      );
    }, delayMs);
  }

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Demonstração"
        title="Nova sessão de recarga"
        description="Simulação local da tarifação dinâmica — mesma regra de sistemaCobranca.py, calculada no navegador."
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader eyebrow="Cadastro" title="Adicionar carro" />
          <div className="space-y-3.5">
            <div>
              <label className={labelClass}>Nome do cliente</label>
              <input className={inputClass} value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: João Pedro" />
            </div>
            <div>
              <label className={labelClass}>Modelo do veículo</label>
              <input className={inputClass} value={modelo} onChange={(e) => setModelo(e.target.value)} placeholder="Ex: Tesla Model 3" />
            </div>
            <div>
              <label className={labelClass}>Tipo de recarga</label>
              <select
                className={inputClass}
                value={tipoRecarga}
                onChange={(e) => setTipoRecarga(e.target.value as ChargeType)}
              >
                {Object.values(CHARGE_TYPES).map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label} — até {t.maxPowerKw} kW
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className={labelClass}>Capacidade (kWh)</label>
                <input
                  type="number"
                  className={inputClass}
                  value={capacidade}
                  onChange={(e) => setCapacidade(Number(e.target.value))}
                />
              </div>
              <div>
                <label className={labelClass}>Bateria atual (%)</label>
                <input
                  type="number"
                  className={inputClass}
                  value={bateriaAtual}
                  onChange={(e) => setBateriaAtual(Number(e.target.value))}
                />
              </div>
            </div>
            <Button variant="primary" className="w-full justify-center" onClick={adicionarCarro}>
              Iniciar sessão e gerar fatura
            </Button>
          </div>
        </Card>

        <Card className={fatura ? 'border-magenta/30 bg-magenta-dim' : undefined}>
          <CardHeader eyebrow="Cobrança" title="Fatura gerada" />
          {!fatura ? (
            <p className="text-sm text-text-muted">Preencha o formulário e inicie uma sessão para ver a fatura calculada aqui.</p>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-text">{fatura.clienteNome}</p>
                  <p className="text-xs text-text-muted">{fatura.veiculoModelo}</p>
                </div>
                <Badge tone="magenta" dot>Em andamento</Badge>
              </div>

              <div className="space-y-1.5 rounded-lg border border-border-soft bg-surface-2 px-3.5 py-3 font-mono text-xs text-text-muted">
                <div className="flex justify-between"><span>Energia consumida</span><span className="text-text">{fatura.energiaKwh.toFixed(2)} kWh</span></div>
                <div className="flex justify-between"><span>Tarifa base (horário)</span><span>R$ {fatura.detalheTarifa.tarifaHorario.toFixed(2)}/kWh</span></div>
                <div className="flex justify-between"><span>Adicional por demanda</span><span>R$ {fatura.detalheTarifa.tarifaDemanda.toFixed(2)}/kWh</span></div>
                <div className="flex justify-between"><span>Adicional por tipo</span><span>R$ {fatura.detalheTarifa.tarifaTipo.toFixed(2)}/kWh</span></div>
                <div className="flex justify-between border-t border-border-soft pt-1.5"><span>Tarifa final</span><span className="text-text">R$ {fatura.detalheTarifa.tarifaFinal.toFixed(2)}/kWh</span></div>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-surface-3 px-3.5 py-3">
                <span className="text-sm text-text">Total</span>
                <span className="font-mono text-lg font-semibold text-text">R$ {fatura.totalBrl.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          )}
        </Card>
      </div>

      <Card padded={false} className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-text-faint">
              <th className="px-4 py-3 font-medium">Sessão</th>
              <th className="px-4 py-3 font-medium">Cliente / Veículo</th>
              <th className="px-4 py-3 font-medium">Tipo</th>
              <th className="px-4 py-3 font-medium">Duração</th>
              <th className="px-4 py-3 font-medium">Energia</th>
              <th className="px-4 py-3 font-medium">Custo</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.id} className="border-b border-border-soft last:border-0">
                <td className="px-4 py-3 font-mono text-xs text-text-muted">{session.id}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-text">{session.clientName}</p>
                  <p className="text-xs text-text-muted">{session.vehicleModel}</p>
                </td>
                <td className="px-4 py-3 text-text-muted">{CHARGE_TYPES[session.chargeType].label}</td>
                <td className="px-4 py-3 font-mono text-text-muted">{session.durationMin} min</td>
                <td className="px-4 py-3 font-mono text-text-muted">{session.energyKwh.toFixed(1)} kWh</td>
                <td className="px-4 py-3 font-mono text-text">R$ {session.costBrl.toFixed(2).replace('.', ',')}</td>
                <td className="px-4 py-3">
                  <Badge tone={session.status === 'em-andamento' ? 'info' : 'success'} dot>
                    {session.status === 'em-andamento' ? 'Em andamento' : 'Concluída'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </PageContainer>
  );
}
