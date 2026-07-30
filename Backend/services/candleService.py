from databases.connection import SessionLocal
from models.candleModel import Candle
from datetime import datetime, timedelta

def save_candle(data):
    db = SessionLocal()

    try:
        ts = data["timestamp"] / 1_000_000
        dt = datetime.fromtimestamp(ts)

        # only save at 59th second
        if dt.second != 59:
            return

        candle_time = int(ts // 60 * 60)

        # check if candle already exists
        existing = (
            db.query(Candle)
            .filter(
                Candle.symbol == data["symbol"],
                Candle.candle_time == candle_time
            )
            .first()
        )

        if existing:
            return

        candle = Candle(
            symbol=data["symbol"],
            timeframe=data["resolution"],
            candle_time=candle_time,
            open=data["open"],
            high=data["high"],
            low=data["low"],
            close=data["close"],
            volume=data["volume"]
        )

        db.add(candle)
        db.commit()

    except Exception as e:
        db.rollback()
        print("Error saving candle:", e)

    finally:
        db.close()


def delete_old_candles(db):
    cutoff = int((datetime.now() - timedelta(days=7)).timestamp())

    db.query(Candle).filter(
        Candle.candle_time < cutoff
    ).delete()

    db.commit()