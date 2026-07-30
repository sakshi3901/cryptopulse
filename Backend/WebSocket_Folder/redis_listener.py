import asyncio
import json
from services.redis import redis_client
from WebSocket_Folder.client import manager

async def listen_market_data():
    stream = "market_data"
    last_id = "$"

    while True:
        messages = redis_client.xread(
            {stream: last_id},
            block = 5000,
            count = 100
        )

        if messages:
            for stream_name, entries in messages:
                for message_id, values in entries:
                    last_id = message_id
                    data = json.loads(values["data"])
                    data["timestamp"] = (data["timestamp"] // 1000000 // 60) * 60

                    await manager.broadcast(data)

        await asyncio.sleep(0)

        