"use client"

import { useEffect, useState } from "react"
import { useRealTimeData } from "./real-time-data-service"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts"

export default function NoiseComparisonChart() {
  const { data, loading } = useRealTimeData()
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (data && data.noiseComparison) {
      setChartData(data.noiseComparison)
    } else {
      // Default data if real-time data is not available
      setChartData([
        { name: "Your City", current: 68, average: 65, best: 58 },
        { name: "New York", current: 75, average: 72, best: 65 },
        { name: "Los Angeles", current: 72, average: 70, best: 62 },
        { name: "Chicago", current: 70, average: 68, best: 60 },
        { name: "Houston", current: 68, average: 66, best: 59 },
        { name: "Phoenix", current: 65, average: 63, best: 57 },
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
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis
            label={{ value: "Noise Level (dB)", angle: -90, position: "insideLeft" }}
            domain={[50, 80]}
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
          <Bar dataKey="current" name="Current" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="average" name="Historical Average" fill="#94a3b8" radius={[4, 4, 0, 0]} />
          <Bar dataKey="best" name="Best Recorded" fill="#22c55e" radius={[4, 4, 0, 0]} />
          <ReferenceLine
            y={65}
            stroke="#888"
            strokeDasharray="3 3"
            label={{ value: "WHO Guideline", position: "top" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

