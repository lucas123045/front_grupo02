"""Porte de SimuladorOCPP.py.

Em vez de só imprimir no console, cada mensagem OCPP 1.6 simulada também é
guardada em `log` (mais recente primeiro) para ser servida pela rota
GET /api/protocolos.
"""
import uuid
from datetime import datetime
from typing import Any, Dict, List

from .carros import Carro

LOG_MAX = 200


class SimuladorOCPP:
    def __init__(self):
        self.log: List[Dict[str, Any]] = []

    def _registrar(self, direction: str, action: str, payload: dict):
        agora = datetime.now()
        mensagem = {
            "id": str(uuid.uuid4())[:8],
            "action": action,
            "direction": direction,  # "out" = Charge Point -> Central System, "in" = resposta
            "payload": payload,
            "time": agora.strftime("%H:%M:%S"),
            "timestamp": agora.isoformat(),
        }
        self.log.insert(0, mensagem)
        del self.log[LOG_MAX:]
        return mensagem

    def enviar(self, action: str, payload: dict):
        return self._registrar("out", action, payload)

    def receber(self, action: str, payload: dict):
        return self._registrar("in", action, payload)

    def boot_notification(self):
        self.enviar(
            "BootNotification",
            {"chargePointModel": "SimuladorEV", "chargePointVendor": "Equipe02"},
        )
        self.receber(
            "BootNotification",
            {
                "status": "Accepted",
                "currentTime": datetime.now().isoformat(),
                "interval": 1,
            },
        )

    def iniciar_sessao(self, carro: Carro):
        self.enviar(
            "StartTransaction",
            {
                "connectorId": carro.id,
                "idTag": carro.nome,
                "meterStart": 0,
                "timestamp": datetime.now().isoformat(),
            },
        )
        self.receber(
            "StartTransaction",
            {"transactionId": carro.id, "status": "Accepted"},
        )

    def meter_values(self, carro: Carro):
        self.enviar(
            "MeterValues",
            {
                "connectorId": carro.id,
                "transactionId": carro.id,
                "meterValue": round(carro.bateria, 2),
                "timestamp": datetime.now().isoformat(),
            },
        )

    def encerrar_sessao(self, carro: Carro):
        self.enviar(
            "StopTransaction",
            {
                "transactionId": carro.id,
                "idTag": carro.nome,
                "meterStop": round(carro.energia, 2),
                "timestamp": datetime.now().isoformat(),
            },
        )
        self.receber("StopTransaction", {"status": "Accepted"})
