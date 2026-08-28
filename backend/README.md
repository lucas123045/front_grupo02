# ChargeGrid API

FastAPI que porta o simulador de recarga do Data Structures Sprint
(Equipe02-1CCPO: `Carros.py`, `equacoesRecarga.py`, `gerenciamentoDeRecarga.py`,
`sistemaCobranca.py`, `SimuladorOCPP.py`) para uma API HTTP consumida pelo
front-end React em `../`.

O loop bloqueante de CLI (`simuladorDeRecarga.py`) foi substituído por uma
tarefa assíncrona de fundo que avança a simulação 1x por segundo (mesma regra
de `monitorar_carregamento()`), disponível continuamente enquanto a API roda.

## Rodando

```bash
cd backend
python -m venv ../.venv        # se ainda não existir
../.venv/Scripts/activate      # Windows (Git Bash: source ../.venv/Scripts/activate)
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

O front-end (`npm run dev`, porta 5173) já tem um proxy de `/api` para
`http://127.0.0.1:8000` configurado em `vite.config.ts` — não precisa de CORS
extra em dev, mas a API também libera `*` via `CORSMiddleware` caso seja
acessada de outra origem.

## Endpoints

| Rota | Método | Descrição |
|---|---|---|
| `/api/sessions` | GET | Sessões ativas e finalizadas |
| `/api/sessions` | POST | Cadastra um carro (`{nome, modelo, tipoRecarga}`), inicia StartTransaction e retorna a fatura estimada |
| `/api/tarifas` | GET | Tarifa vigente por horário/demanda/tipo |
| `/api/demanda` | GET | Demanda atual vs. limite contratado (100 kW) |
| `/api/demanda/historico` | GET | Últimos pontos de demanda (para o gráfico) |
| `/api/protocolos` | GET | Log de mensagens OCPP 1.6 simuladas |
| `/api/relatorio` | GET | Totais consolidados (sessões, energia, receita) |

`tipoRecarga` usa os valores `lenta` \| `rapida` \| `prioridade` (mapeados
internamente para `'1'`/`'2'`/`'3'`, como no script original).

## Estado

O estado (carros ativos/finalizados, histórico de demanda, log OCPP) é
mantido em memória, em processo único — reinicia ao reiniciar a API. Isso é
suficiente para o propósito de demonstração do projeto; não há persistência
em banco de dados.
