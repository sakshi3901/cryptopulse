'use client'
import CandleStickChart from '@/Components/Elements/CandleStickChart'
import { useEffect, useRef, useState } from 'react';
import type { CandlestickData, UTCTimestamp } from "lightweight-charts";
import { Label, ListBox, Select } from "@heroui/react";
import type { Key } from "@heroui/react";

type CandleStickData = CandlestickData<UTCTimestamp> & {
    time: number | string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
};

export default function ChartPage() {
    const [chartData, setChartData] = useState<CandleStickData[]>([])
    const [selectedSym, setSelectedSym] = useState("BTCUSD")
    const root_url = process.env.NEXT_PUBLIC_ROOT_URL
    const API_Counter = useRef(false)

    const symbols = ["BTCUSD", "ETHUSD", "SOLUSD"]

    const getData = async () => {
        try {
            const response = await fetch(root_url + `/live/chart/${selectedSym}`,
            );

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();
            const candles = (data.result).reverse()
            setChartData(candles)
        } catch (error) {
            console.error("Google authentication failed:", error);
            throw error; // Re-throw so the caller can handle it
        }
    }

    useEffect(() => {
        getData()
    }, [selectedSym])

    return (
        <div>
            <div>
                <Select className="w-[256px] ml-10 mb-5"
                    value={selectedSym}
                    onChange={(value) => setSelectedSym(String(value))}
                    aria-label="Select cryptocurrency"
                >
                    <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                        <ListBox>
                            {symbols.map((item, i) => (
                                <ListBox.Item id={item} key={i} textValue={item}>
                                    {item}
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            ))}
                        </ListBox>
                    </Select.Popover>
                </Select>
            </div>
            <CandleStickChart chartData={chartData} selectedSym={selectedSym} />
        </div>
    )
}