"use client"

import { useEffect, useState } from "react"
import { useRealTimeData } from "./real-time-data-service"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, Tooltip, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid } from "recharts"

export default function NoiseCalendar() {
  const { data, loading } = useRealTimeData()
  const [chartData, setChartData] = useState([])
  const [days, setDays] = useState([])
  const [hours, setHours] = useState([])

  useEffect(() => {
    // Generate days and hours for the axes
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const hoursOfDay = Array.from({ length: 24 }, (_, i) => `${i}:00`)
    setDays(daysOfWeek)
    setHours(hoursOfDay)

    if (data && data.noiseCalendar) {
      setChartData(data.noiseCalendar)
    } else {
      // Generate default data if real-time data is not available
      const defaultData = []
      for (let day = 0; day < 7; day++) {
        for (let hour = 0; hour < 24; hour++) {
          // Generate a pattern: quieter at night, louder during day, with weekends being louder
          let baseNoise = 50

          // Time of day pattern
          if (hour >= 8 && hour <= 18) {
            baseNoise += 15 // Daytime is louder
          } else if (hour >= 19 && hour <= 22) {
            baseNoise += 10 // Evening is moderately loud
          } else if (hour >= 23 || hour <= 5) {
            baseNoise -= 10 // Night is quieter
          }

          // Day of week pattern
          if (day === 0 || day === 6) {
            // Weekends
            if (hour >= 10 && hour <= 14) {
              baseNoise += 5 // Weekend daytime activities
            }
            if (hour >= 20 && hour <= 23) {
              baseNoise += 10 // Weekend nightlife
            }
          } else {
            // Weekdays
            if ((hour >= 7 && hour <= 9) || (hour >= 16 && hour <= 18)) {
              baseNoise += 8 // Rush hours
            }
          }

          // Add some randomness
          const noise = Math.max(30, Math.min(85, baseNoise + (Math.random() * 10 - 5)))

          defaultData.push({
            x: day,
            y: hour,
            z: noise,
            day: daysOfWeek[day],
            hour: `${hour}:00`,
            value: Math.round(noise),
          })
        }
      }
      setChartData(defaultData)
    }
  }, [data])

  const getPointColor = (value) => {
    if (value < 45) return "#22c55e" // Very quiet - green
    if (value < 55) return "#84cc16" // Quiet - light green
    if (value < 65) return "#facc15" // Moderate - yellow
    if (value < 75) return "#f97316" // Loud - orange
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
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="x"
            name="day"
            domain={[0, 6]}
            tickCount={7}
            tickFormatter={(value) => days[value]}
            label={{ value: "Day of Week", position: "insideBottom", offset: -10 }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="hour"
            domain={[0, 23]}
            tickCount={12}
            tickFormatter={(value) => `${value}:00`}
            label={{ value: "Hour of Day", angle: -90, position: "insideLeft" }}
            reversed
          />
          <ZAxis type="number" dataKey="z" range={[50, 400]} domain={[30, 90]} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <ChartTooltip>
                    <ChartTooltipContent
                      content={
                        <div>
                          <p className="font-medium">
                            {data.day} at {data.hour}
                          </p>
                          <p className="text-sm">Noise Level: {data.value} dB</p>
                          <p
                            className={`text-sm font-medium ${
                              data.value < 55 ? "text-green-500" : data.value < 65 ? "text-yellow-500" : "text-red-500"
                            }`}
                          >
                            {data.value < 55 ? "Quiet" : data.value < 65 ? "Moderate" : "Loud"}
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
          <Scatter
            name="Noise Level"
            data={chartData}
            fill="#8884d8"
            shape={(props) => {
              const { cx, cy, payload } = props
              const color = getPointColor(payload.value)
              return <circle cx={cx} cy={cy} r={4} fill={color} stroke="none" />
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

