"use client"

import { useEffect, useState } from "react"
import { useRealTimeData } from "./real-time-data-service"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

export default function NoiseHistogram() {
  const { data, loading } = useRealTimeData()
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (data && data.noiseFrequency) {
      setChartData(data.noiseFrequency)
    } else {
      // Default data if real-time data is not available
      setChartData([
        { range: "30-35", count: 5, color: "#22c55e" },
        { range: "35-40", count: 12, color: "#22c55e" },
        { range: "40-45", count: 18, color: "#22c55e" },
        { range: "45-50", count: 25, color: "#84cc16" },
        { range: "50-55", count: 32, color: "#84cc16" },
        { range: "55-60", count: 38, color: "#facc15" },
        { range: "60-65", count: 30, color: "#facc15" },
        { range: "65-70", count: 24, color: "#f97316" },
        { range: "70-75", count: 18, color: "#f97316" },
        { range: "75-80", count: 12, color: "#ef4444" },
        { range: "80-85", count: 8, color: "#ef4444" },
        { range: "85-90", count: 4, color: "#ef4444" },
      ])
    }
  }, [data])

  const getBarColor = (range) => {
    const midpoint = Number.parseInt(range.split("-")[0]) + 2.5
    if (midpoint < 45) return "#22c55e" // Very quiet - green
    if (midpoint < 55) return "#84cc16" // Quiet - light green
    if (midpoint < 65) return "#facc15" // Moderate - yellow
    if (midpoint < 75) return "#f97316" // Loud - orange
    return "#ef4444" // Very loud - red
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 25,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="range"
            label={{ value: "Noise Level (dB)", position: "insideBottom", offset: -15 }}
            tick={{ fontSize: 12 }}
          />
          <YAxis label={{ value: "Frequency", angle: -90, position: "insideLeft" }} tick={{ fontSize: 12 }} />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltip>
                    <ChartTooltipContent
                      content={
                        <div>
                          <p className="font-medium">{label} dB</p>
                          <p className="text-sm text-muted-foreground">{payload[0].value} readings</p>
                        </div>
                      }
                    />
                  </ChartTooltip>
                )
              }
              return null
            }}
          />
          <Bar dataKey="count" name="Frequency" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.range)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

