"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

// Define the shape of our real-time data
interface NoiseData {
  timestamp: string
  areas: {
    name: string
    value: number
    color: string
  }[]
  hourlyData: {
    hour: string
    value: number
  }[]
  locationData: {
    location: string
    morning: number
    afternoon: number
    evening: number
    night: number
  }[]
  complaintData: {
    type: string
    data: number[]
  }[]
}

// Create context
const RealTimeDataContext = createContext<{
  data: NoiseData | null
  loading: boolean
  error: string | null
}>({
  data: null,
  loading: true,
  error: null,
})

// Initial data
const initialData: NoiseData = {
  timestamp: new Date().toISOString(),
  areas: [
    { name: "Downtown", value: 75, color: "#ef4444" },
    { name: "Residential", value: 58, color: "#f59e0b" },
    { name: "Parks", value: 42, color: "#10b981" },
    { name: "Commercial", value: 68, color: "#f59e0b" },
    { name: "Industrial", value: 82, color: "#ef4444" },
    { name: "Schools", value: 52, color: "#3b82f6" },
    { name: "Hospitals", value: 45, color: "#10b981" },
    { name: "Transit Hubs", value: 78, color: "#ef4444" },
  ],
  hourlyData: [
    { hour: "12 AM", value: 45 },
    { hour: "1 AM", value: 42 },
    { hour: "2 AM", value: 40 },
    { hour: "3 AM", value: 38 },
    { hour: "4 AM", value: 37 },
    { hour: "5 AM", value: 39 },
    { hour: "6 AM", value: 48 },
    { hour: "7 AM", value: 58 },
    { hour: "8 AM", value: 68 },
    { hour: "9 AM", value: 72 },
    { hour: "10 AM", value: 70 },
    { hour: "11 AM", value: 69 },
    { hour: "12 PM", value: 71 },
    { hour: "1 PM", value: 70 },
    { hour: "2 PM", value: 68 },
    { hour: "3 PM", value: 67 },
    { hour: "4 PM", value: 69 },
    { hour: "5 PM", value: 75 },
    { hour: "6 PM", value: 73 },
    { hour: "7 PM", value: 70 },
    { hour: "8 PM", value: 65 },
    { hour: "9 PM", value: 60 },
    { hour: "10 PM", value: 55 },
    { hour: "11 PM", value: 50 },
  ],
  locationData: [
    { location: "Downtown", morning: 72, afternoon: 78, evening: 75, night: 68 },
    { location: "Residential", morning: 55, afternoon: 58, evening: 60, night: 45 },
    { location: "Parks", morning: 45, afternoon: 52, evening: 48, night: 38 },
    { location: "Commercial", morning: 65, afternoon: 70, evening: 68, night: 52 },
    { location: "Industrial", morning: 75, afternoon: 82, evening: 78, night: 65 },
    { location: "Schools", morning: 58, afternoon: 62, evening: 45, night: 35 },
    { location: "Hospitals", morning: 48, afternoon: 50, evening: 45, night: 42 },
  ],
  complaintData: [
    { type: "Construction", data: [12, 15, 14, 16, 15, 8, 5] },
    { type: "Traffic", data: [8, 9, 10, 9, 11, 7, 6] },
    { type: "Nightlife", data: [5, 6, 7, 9, 14, 18, 15] },
    { type: "Neighbors", data: [7, 6, 8, 7, 9, 12, 10] },
    { type: "Industrial", data: [6, 7, 6, 5, 6, 3, 2] },
  ],
}

// Provider component
export function RealTimeDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<NoiseData>(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Simulate real-time data updates
  useEffect(() => {
    const updateData = () => {
      setLoading(true)

      try {
        // In a real app, this would be a fetch call to an API endpoint
        // For demo purposes, we'll simulate data changes

        // Update timestamp
        const newData = { ...data, timestamp: new Date().toISOString() }

        // Update area noise levels with small random variations
        newData.areas = data.areas.map((area) => ({
          ...area,
          value: Math.max(35, Math.min(95, area.value + (Math.random() * 6 - 3))),
        }))

        // Update hourly data for the current hour
        const currentHour = new Date().getHours()
        const hourString =
          currentHour === 0
            ? "12 AM"
            : currentHour < 12
              ? `${currentHour} AM`
              : currentHour === 12
                ? "12 PM"
                : `${currentHour - 12} PM`

        newData.hourlyData = data.hourlyData.map((item) => {
          if (item.hour === hourString) {
            return {
              ...item,
              value: Math.max(35, Math.min(85, item.value + (Math.random() * 6 - 3))),
            }
          }
          return item
        })

        // Update location data
        newData.locationData = data.locationData.map((item) => ({
          ...item,
          morning: Math.max(35, Math.min(85, item.morning + (Math.random() * 4 - 2))),
          afternoon: Math.max(35, Math.min(85, item.afternoon + (Math.random() * 4 - 2))),
          evening: Math.max(35, Math.min(85, item.evening + (Math.random() * 4 - 2))),
          night: Math.max(35, Math.min(85, item.night + (Math.random() * 4 - 2))),
        }))

        // Update complaint data
        newData.complaintData = data.complaintData.map((item) => ({
          ...item,
          data: item.data.map((val) => Math.max(0, Math.min(20, val + (Math.random() * 2 - 1)))),
        }))

        setData(newData)
        setLoading(false)
      } catch (err) {
        console.error("Error updating real-time data:", err)
        setError("Failed to update real-time data")
        setLoading(false)
      }
    }

    // Update every 5 seconds
    const interval = setInterval(updateData, 5000)

    return () => clearInterval(interval)
  }, [data])

  return <RealTimeDataContext.Provider value={{ data, loading, error }}>{children}</RealTimeDataContext.Provider>
}

// Hook to use the real-time data
export function useRealTimeData() {
  const context = useContext(RealTimeDataContext)
  if (context === undefined) {
    throw new Error("useRealTimeData must be used within a RealTimeDataProvider")
  }
  return context
}

