from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from webSocket.manager import manager
from services.cryptoData import CandleData

router = APIRouter()

@router.websocket('/ws')
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)

    try:
        while True:
            message = await websocket.receive_json()
            if message["action"] == "subscribe":
                manager.subscribe(
                    websocket,
                    message["symbol"]
                )
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@router.get('/chart/{symbol}')
def chartData(symbol: str):
    return CandleData(symbol)