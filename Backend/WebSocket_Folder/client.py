from fastapi import WebSocket
import threading

class ConnectionManager:
    def __init__(self):
        self.active_connections = {}
        self.lock = threading.Lock()

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        with self.lock:
            self.active_connections[websocket] = None

    def subscribe(self, websocket: WebSocket, symbol: str):
            with self.lock:
                if websocket in self.active_connections:
                    self.active_connections[websocket] = symbol       

    def disconnect(self, websocket: WebSocket):
        with self.lock:
            if websocket in self.active_connections:
                del self.active_connections[websocket]

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, data: dict):
        disconnected = []

        symbol = data['symbol']
        
        with self.lock:
            connections = dict(self.active_connections)

        for connection, subscribed_symbol in connections.items():
             
            try:
                if subscribed_symbol == symbol:
                    await connection.send_json(data)
            except Exception:
                disconnected.append(connection)

        for connection in disconnected:
            self.disconnect(connection)


manager = ConnectionManager()
