"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Sample data for the timeline
const hourlyData = [
  { time: "12 AM", level: 45 },
  { time: "1 AM", level: 42 },
  { time: "2 AM", level: 40 },
  { time: "3 AM", level: 38 },
  { time: "4 AM", level: 39 },
  { time: "5 AM", level: 45 },
  { time: "6 AM", level: 52 },
  { time: "7 AM", level: 60 },
  { time: "8 AM", level: 68 },
  { time: "9 AM", level: 72 },
  { time: "10 AM", level: 70 },
  { time: "11 AM", level: 68 },
  { time: "12 PM", level: 69 },
  { time: "1 PM", level: 70 },
  { time: "2 PM", level: 68 },
  { time: "3 PM", level: 70 },
  { time: "4 PM", level: 73 },
  { time: "5 PM", level: 75 },
  { time: "6 PM", level: 72 },
  { time: "7 PM", level: 68 },
  { time: "8 PM", level: 65 },
  { time: "9 PM", level: 62 },
  { time: "10 PM", level: 58 },
  { time: "11 PM", level: 52 },
]

const dailyData = [
  { time: "Mon", level: 65 },
  { time: "Tue", level: 63 },
  { time: "Wed", level: 67 },
  { time: "Thu", level: 64 },
  { time: "Fri", level: 69 },
  { time: "Sat", level: 72 },
  { time: "Sun", level: 60 },
]

const monthlyData = [
  { time: "Jan", level: 62 },
  { time: "Feb", level: 63 },
  { time: "Mar", level: 65 },
  { time: "Apr", level: 64 },
  { time: "May", level: 66 },
  { time: "Jun", level: 68 },
  { time: "Jul", level: 70 },
  { time: "Aug", level: 71 },
  { time: "Sep", level: 67 },
  { time: "Oct", level: 65 },
  { time: "Nov", level: 64 },
  { time: "Dec", level: 63 },
]

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md text-xs">
        <p className="font-medium">{label}</p>
        <p className="text-blue-600">{`Noise Level: ${payload[0].value} dB`}</p>
      </div>
    )
  }

  return null
}

export default function NoiseTimeline() {
  const [timeRange, setTimeRange] = useState("hourly")

  // Get current data based on selected time range
  const getCurrentData = () => {
    switch (timeRange) {
      case "hourly":
        return hourlyData
      case "daily":
        return dailyData
      case "monthly":
        return monthlyData
      default:
        return hourlyData
    }
  }

  // Get gradient colors based on noise levels
  const getGradientColors = (data) => {
    const maxLevel = Math.max(...data.map((item) => item.level))

    if (maxLevel > 70) {
      return ["#fee2e2", "#ef4444"] // Red for high noise
    } else if (maxLevel > 60) {
      return ["#fef3c7", "#f59e0b"] // Amber for medium noise
    } else {
      return ["#dcfce7", "#10b981"] // Green for low noise
    }
  }

  const currentData = getCurrentData()
  const gradientColors = getGradientColors(currentData)

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Noise Timeline</h3>
          <Tabs defaultValue="hourly" value={timeRange} onValueChange={setTimeRange}>
            <TabsList className="grid grid-cols-3 h-7">
              <TabsTrigger value="hourly" className="text-xs">
                Today
              </TabsTrigger>
              <TabsTrigger value="daily" className="text-xs">
                Week
              </TabsTrigger>
              <TabsTrigger value="monthly" className="text-xs">
                Year
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorNoise" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={gradientColors[1]} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={gradientColors[0]} stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
              <YAxis
                domain={[30, 90]}
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={{ stroke: "#e5e7eb" }}
                tickFormatter={(value) => `${value}dB`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="level"
                stroke={gradientColors[1]}
                fillOpacity={1}
                fill="url(#colorNoise)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2 text-xs text-gray-500">
          <p>
            {timeRange === "hourly" && "Hourly noise levels throughout the day"}
            {timeRange === "daily" && "Daily average noise levels for the week"}
            {timeRange === "monthly" && "Monthly average noise levels for the year"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

