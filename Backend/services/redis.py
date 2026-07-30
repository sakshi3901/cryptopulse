import redis
import os
import json

redis_client = redis.Redis(
    host=os.getenv("REDIS_HOST", "localhost"),
    port=6379,
    decode_responses=True
)


def add_market_data(data):
    redis_client.xadd(
        "market_data",
        {"data": json.dumps(data)},
        maxlen=100000,
        approximate=True
    )