import { useEffect, useRef } from "react";
import { createChart, ColorType, CandlestickSeries, UTCTimestamp, CandlestickData } from "lightweight-charts";

type CandleStickData = CandlestickData<UTCTimestamp> & {
    time: number | string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
};

interface CandleStickChartProps {
    chartData: CandleStickData[];
    selectedSym: string
};

export default function CandleStickChart({ chartData, selectedSym }: CandleStickChartProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const root_url = process.env.NEXT_PUBLIC_ROOT_URL
    const ws_url = root_url?.replace(/^https?/, 'wss')

    useEffect(() => {
        if (!containerRef.current) return;

        const chart = createChart(containerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: "transparent" },
                textColor: "#fff",
            },
            width: containerRef.current.clientWidth,
            height: containerRef.current.clientHeight,
            grid: {
                vertLines: { color: "#222" },
                horzLines: { color: "#222" },
            },
            timeScale: {
                timeVisible: true,
                tickMarkFormatter: (time: any) => new Date(time * 1000).toLocaleTimeString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                }),
            },
        });

        const candleSeries = chart.addSeries(CandlestickSeries, { upColor: "#26a69a", downColor: "#ef5350", borderVisible: false, wickUpColor: "#26a69a", wickDownColor: "#ef5350" });

        let lastCandleTime: number | null = null;

        candleSeries.setData(chartData)

        const ws = new WebSocket(ws_url + "/live/ws");

        ws.onopen = () => {
            console.log("WebSocket connected");
            ws.send(JSON.stringify({
                action: "subscribe",
                symbol: selectedSym
            }))
        }

        ws.onmessage = (event) => {
            const candle = JSON.parse(event.data);

            // microseconds → seconds
            const seconds = Math.floor(candle.timestamp / 1_000_000);

            // align to 1-minute candle
            const time = (Math.floor(seconds / 60) * 60) as UTCTimestamp;

            const bar = {
                time,
                open: candle.open,
                high: candle.high,
                low: candle.low,
                close: candle.close,
            };

            candleSeries.update(bar);

            lastCandleTime = time;
        };

        // Resize handling (IMPORTANT: update height too)
        const handleResize = () => {
            if (!containerRef.current) return;

            chart.applyOptions({
                width: containerRef.current.clientWidth,
                height: containerRef.current.clientHeight,
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            ws.close();
            chart.remove();
        };
    }, [chartData]);

    return (
        <div className="w-screen px-10">
            <div ref={containerRef} className="w-full h-[72vh]" />
        </div>
    );
}