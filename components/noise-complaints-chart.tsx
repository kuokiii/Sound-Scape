"use client"

import { useEffect, useState } from "react"
import { useRealTimeData } from "./real-time-data-service"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

export default function NoiseComplaintsChart() {
  const { data, loading } = useRealTimeData()
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (data && data.noiseComplaints) {
      setChartData(data.noiseComplaints)
    } else {
      // Default data if real-time data is not available
      setChartData([
        { name: "Construction", value: 35, color: "#f97316" },
        { name: "Traffic", value: 25, color: "#3b82f6" },
        { name: "Nightlife", value: 20, color: "#8b5cf6" },
        { name: "Neighbors", value: 15, color: "#ef4444" },
        { name: "Industrial", value: 5, color: "#84cc16" },
      ])
    }
  }, [data])

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
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
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltip>
                    <ChartTooltipContent
                      content={
                        <div>
                          <p className="font-medium">{payload[0].name}</p>
                          <p className="text-sm text-muted-foreground">{payload[0].value}% of total complaints</p>
                        </div>
                      }
                    />
                  </ChartTooltip>
                )
              }
              return null
            }}
          />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: "12px" }} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

