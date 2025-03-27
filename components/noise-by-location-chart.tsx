"use client"

import { useEffect, useState } from "react"
import { useRealTimeData } from "./real-time-data-service"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export default function NoiseByLocationChart() {
  const { data, loading } = useRealTimeData()
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (data && data.noiseByLocation) {
      setChartData(data.noiseByLocation)
    } else {
      // Default data if real-time data is not available
      setChartData([
        { name: "Downtown", current: 78, previous: 75, limit: 65 },
        { name: "Midtown", current: 72, previous: 70, limit: 65 },
        { name: "Uptown", current: 68, previous: 65, limit: 65 },
        { name: "Westside", current: 65, previous: 68, limit: 65 },
        { name: "Eastside", current: 62, previous: 64, limit: 65 },
        { name: "Southside", current: 70, previous: 72, limit: 65 },
        { name: "Northside", current: 64, previous: 62, limit: 65 },
        { name: "Harbor", current: 68, previous: 70, limit: 65 },
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
            bottom: 25,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-45} textAnchor="end" height={60} />
          <YAxis
            label={{ value: "Noise Level (dB)", angle: -90, position: "insideLeft" }}
            domain={[40, 90]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                const currentOverLimit = data.current > data.limit
                const previousOverLimit = data.previous > data.limit
                const change = data.current - data.previous
                return (
                  <ChartTooltip>
                    <ChartTooltipContent
                      content={
                        <div>
                          <p className="font-medium">{label}</p>
                          <p className={`text-sm ${currentOverLimit ? "text-red-500" : "text-green-500"}`}>
                            Current: {data.current} dB {currentOverLimit ? "(Over limit)" : "(Within limit)"}
                          </p>
                          <p className={`text-sm ${previousOverLimit ? "text-red-500" : "text-green-500"}`}>
                            Previous: {data.previous} dB
                          </p>
                          <p className={`text-sm font-medium ${change > 0 ? "text-red-500" : "text-green-500"}`}>
                            Change: {change > 0 ? "+" : ""}
                            {change.toFixed(1)} dB
                          </p>
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
          <Bar dataKey="previous" name="Previous Period" fill="#94a3b8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

