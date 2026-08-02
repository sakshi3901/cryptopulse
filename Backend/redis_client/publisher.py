import json
from redis_client.client import redis_client

CHANNEL = "market_data"

async def publish_market_data(data):
    await redis_client.publish(CHANNEL, json.dumps(data))