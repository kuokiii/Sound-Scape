"use client"

import { useEffect, useState } from "react"
import { useRealTimeData } from "./real-time-data-service"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from "recharts"

export default function NoiseBarChart() {
  const { data, loading } = useRealTimeData()
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (data && data.noiseByArea) {
      setChartData(data.noiseByArea)
    } else {
      // Default data if real-time data is not available
      setChartData([
        { name: "Downtown", value: 78, limit: 65 },
        { name: "Residential", value: 58, limit: 55 },
        { name: "Commercial", value: 72, limit: 65 },
        { name: "Industrial", value: 82, limit: 75 },
        { name: "Parks", value: 52, limit: 55 },
        { name: "Schools", value: 62, limit: 55 },
        { name: "Hospitals", value: 48, limit: 50 },
        { name: "Entertainment", value: 76, limit: 70 },
      ])
    }
  }, [data])

  const getBarColor = (value, limit) => {
    return value > limit ? "#ef4444" : "#3b82f6"
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
            domain={[30, 90]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                const isOverLimit = data.value > data.limit
                return (
                  <ChartTooltip>
                    <ChartTooltipContent
                      content={
                        <div>
                          <p className="font-medium">{label}</p>
                          <p className="text-sm">Current: {data.value} dB</p>
                          <p className="text-sm">Limit: {data.limit} dB</p>
                          <p className={`text-sm font-medium ${isOverLimit ? "text-red-500" : "text-green-500"}`}>
                            {isOverLimit ? "Exceeds limit" : "Within limit"}
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
          <Bar dataKey="value" name="Noise Level" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.value, entry.limit)} />
            ))}
          </Bar>
          {chartData.map((entry, index) => (
            <ReferenceLine
              key={`ref-${index}`}
              x={entry.name}
              y={entry.limit}
              stroke="#888"
              strokeDasharray="3 3"
              isFront={false}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

