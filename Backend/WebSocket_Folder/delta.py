import websocket
import json
from WebSocket_Folder.client import manager
import asyncio

# production websocket base url
WEBSOCKET_URL = "wss://socket.india.delta.exchange"
candles = {}

def on_error(ws, error):
    print(f"Socket Error: {error}")

def on_close(ws, close_status_code, close_msg):
    print(f"Socket closed with status: {close_status_code} and message: {close_msg}")


def on_open(ws):
  print(f"Socket opened")
  subscribe(ws, "candlestick_1m", ["BTCUSD", "ETHUSD", "SOLUSD"])


def subscribe(ws, channel, symbols):
    payload = {
        "type": "subscribe",
        "payload": {
            "channels": [
            {
                "name": channel,
                "symbols": symbols
            },
        ]
        }
    }
    ws.send(json.dumps(payload))

def on_message(ws, message, loop):
    message_json = json.loads(message)
    symbol = message_json["symbol"]

    if symbol not in candles:
       candles[symbol] = []

    candles[symbol].append(message_json)

    asyncio.run_coroutine_threadsafe(
        manager.broadcast(message_json),
        loop
    )

def start_websocket(loop):
  ws = websocket.WebSocketApp(WEBSOCKET_URL, on_message=lambda ws, msg: on_message(ws, msg, loop), on_error=on_error, on_close=on_close)
  ws.on_open = on_open
  ws.run_forever() # runs indefinitely
  