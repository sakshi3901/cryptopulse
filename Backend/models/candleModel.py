from sqlalchemy import Column, Integer, String, Numeric, DateTime, BigInteger
from databases.connection import Base

class Candle(Base):
    __tablename__ = "candles"

    id = Column(Integer, primary_key = True)
    symbol = Column(String)
    timeframe = Column(String)
    candle_time = Column(BigInteger)
    open = Column(Numeric)
    high = Column(Numeric)
    low = Column(Numeric)
    close = Column(Numeric)
    volume = Column(Numeric)