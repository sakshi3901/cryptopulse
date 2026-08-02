import json
from redis_client.client import redis_client
from webSocket.manager import manager

CHANNEL = "market_data"

async def subscribe_market_data():
    pubsub = redis_client.pubsub()
    await pubsub.subscribe(CHANNEL)

    async for message in pubsub.listen():
        if message["type"] == "message":
            data = json.loads(message["data"])
            await manager.broadcast(data)
