from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.login import router as login_router
from routers.liveData import router as live_data_router
from WebSocket_Folder.delta import start_websocket
import threading
import asyncio
from services.cryptoData import CandleData
from databases.connection import Base, engine
from WebSocket_Folder.redis_listener import listen_market_data

app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://cryptopulse-lemon-delta.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(login_router)
app.include_router(live_data_router, prefix="/live")

Base.metadata.create_all(
    bind=engine
)

@app.get('/')
def read_root():
    return {"message": "Backend is working"}

@app.on_event("startup")
async def startup_event():
    app.state.loop = asyncio.get_running_loop()

    # Start Redis listener
    asyncio.create_task(listen_market_data())

    # Start Delta websocket thread
    threading.Thread(target=start_websocket, args=(app.state.loop,), daemon=True).start()