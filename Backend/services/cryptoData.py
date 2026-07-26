import requests
from datetime import datetime, timezone
import pytz

def CandleData(symbol):
    headers = {
        'Accept': 'application/json'
    }

    ist = pytz.timezone("Asia/Kolkata")
    startTime = int(datetime.now(ist).timestamp())
    dt = datetime.now(ist).replace(hour=0, minute=1, second=0, microsecond=0)
    endtime = int(dt.timestamp())
    
    r = requests.get('https://api.india.delta.exchange/v2/history/candles', params={
        'resolution': '1m',  'symbol': symbol,  'start': endtime,  'end': startTime
        }, headers = headers)
    
    return r.json()