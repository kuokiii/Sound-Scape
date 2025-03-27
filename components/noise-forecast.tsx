"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Calendar, Clock, AlertTriangle } from "lucide-react"

// Sample forecast data
const tomorrowData = [
  { time: "12 AM", level: 44, events: [] },
  { time: "1 AM", level: 41, events: [] },
  { time: "2 AM", level: 39, events: [] },
  { time: "3 AM", level: 38, events: [] },
  { time: "4 AM", level: 40, events: [] },
  { time: "5 AM", level: 46, events: [] },
  { time: "6 AM", level: 53, events: [] },
  { time: "7 AM", level: 62, events: ["Morning commute"] },
  { time: "8 AM", level: 70, events: ["Morning commute", "School start"] },
  { time: "9 AM", level: 68, events: [] },
  { time: "10 AM", level: 65, events: [] },
  { time: "11 AM", level: 67, events: [] },
  { time: "12 PM", level: 69, events: ["Lunch hour"] },
  { time: "1 PM", level: 68, events: [] },
  { time: "2 PM", level: 66, events: [] },
  { time: "3 PM", level: 67, events: [] },
  { time: "4 PM", level: 70, events: ["School end"] },
  { time: "5 PM", level: 76, events: ["Evening commute", "Construction work"] },
  { time: "6 PM", level: 73, events: ["Construction work"] },
  { time: "7 PM", level: 67, events: [] },
  { time: "8 PM", level: 64, events: [] },
  { time: "9 PM", level: 60, events: [] },
  { time: "10 PM", level: 56, events: [] },
  { time: "11 PM", level: 50, events: [] },
]

const weekData = [
  { time: "Mon", level: 64, events: ["Normal weekday"] },
  { time: "Tue", level: 63, events: ["Normal weekday"] },
  { time: "Wed", level: 68, events: ["Construction on Main St"] },
  { time: "Thu", level: 72, events: ["Construction on Main St", "Outdoor concert"] },
  { time: "Fri", level: 70, events: ["Construction on Main St", "Weekend traffic"] },
  { time: "Sat", level: 67, events: ["Weekend activities", "Farmers market"] },
  { time: "Sun", level: 58, events: ["Reduced traffic"] },
]

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload

    return (
      <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md text-xs">
        <p className="font-medium">{label}</p>
        <p className="text-blue-600 font-medium">{`Noise Level: ${data.level} dB`}</p>

        {data.events && data.events.length > 0 && (
          <div className="mt-1 pt-1 border-t border-gray-100">
            <p className="font-medium">Events:</p>
            <ul className="mt-1">
              {data.events.map((event, index) => (
                <li key={index} className="flex items-center">
                  <AlertTriangle className="h-3 w-3 text-amber-500 mr-1" />
                  {event}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }

  return null
}

export default function NoiseForecast() {
  const [forecastRange, setForecastRange] = useState("tomorrow")

  // Get current data based on selected forecast range
  const getForecastData = () => {
    switch (forecastRange) {
      case "tomorrow":
        return tomorrowData
      case "week":
        return weekData
      default:
        return tomorrowData
    }
  }

  const currentData = getForecastData()

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h3 className="font-medium">Noise Forecast</h3>
          </div>
          <Tabs defaultValue="tomorrow" value={forecastRange} onValueChange={setForecastRange}>
            <TabsList className="grid grid-cols-2 h-7">
              <TabsTrigger value="tomorrow" className="text-xs flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Tomorrow
              </TabsTrigger>
              <TabsTrigger value="week" className="text-xs flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Week
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#93c5fd" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#dbeafe" stopOpacity={0.2} />
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
              <Area type="monotone" dataKey="level" stroke="#3b82f6" fillOpacity={1} fill="url(#colorForecast)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 text-xs">
          <h4 className="font-medium mb-1">Upcoming Noise Events</h4>
          <div className="space-y-1">
            {forecastRange === "tomorrow" && (
              <>
                <div className="flex items-center text-amber-600">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  <span>Morning commute (7 AM - 9 AM): Expect increased traffic noise</span>
                </div>
                <div className="flex items-center text-red-600">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  <span>Construction work (5 PM - 7 PM): Heavy machinery on Main Street</span>
                </div>
              </>
            )}

            {forecastRange === "week" && (
              <>
                <div className="flex items-center text-amber-600">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  <span>Construction on Main St (Wed-Fri): Roadwork and heavy machinery</span>
                </div>
                <div className="flex items-center text-red-600">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  <span>Outdoor concert (Thu): Amplified music in Central Park area</span>
                </div>
                <div className="flex items-center text-green-600">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  <span>Sunday: Quietest day of the week, good for outdoor activities</span>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

