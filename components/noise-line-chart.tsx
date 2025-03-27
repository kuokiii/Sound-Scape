"use client"

import { useEffect, useState } from "react"
import { useRealTimeData } from "./real-time-data-service"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export default function NoiseLineChart() {
  const { data, loading } = useRealTimeData()
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (data && data.noiseByTime) {
      setChartData(data.noiseByTime)
    } else {
      // Default data if real-time data is not available
      setChartData([
        { time: "12 AM", residential: 45, commercial: 52, industrial: 58 },
        { time: "2 AM", residential: 42, commercial: 48, industrial: 55 },
        { time: "4 AM", residential: 40, commercial: 45, industrial: 52 },
        { time: "6 AM", residential: 48, commercial: 55, industrial: 62 },
        { time: "8 AM", residential: 58, commercial: 68, industrial: 75 },
        { time: "10 AM", residential: 55, commercial: 72, industrial: 78 },
        { time: "12 PM", residential: 56, commercial: 75, industrial: 80 },
        { time: "2 PM", residential: 54, commercial: 74, industrial: 82 },
        { time: "4 PM", residential: 58, commercial: 76, industrial: 81 },
        { time: "6 PM", residential: 62, commercial: 72, industrial: 76 },
        { time: "8 PM", residential: 58, commercial: 68, industrial: 72 },
        { time: "10 PM", residential: 52, commercial: 60, industrial: 65 },
      ])
    }
  }, [data])

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
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis
            label={{ value: "Noise Level (dB)", angle: -90, position: "insideLeft" }}
            domain={[30, 90]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltip>
                    <ChartTooltipContent
                      content={
                        <div>
                          <p className="font-medium">{label}</p>
                          {payload.map((entry, index) => (
                            <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
                              {entry.name}: {entry.value} dB
                            </p>
                          ))}
                        </div>
                      }
                    />
                  </ChartTooltip>
                )
              }
              return null
            }}
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Line
            type="monotone"
            dataKey="residential"
            name="Residential"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="commercial"
            name="Commercial"
            stroke="#f97316"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="industrial"
            name="Industrial"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

