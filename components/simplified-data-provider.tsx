"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Simplified data structure
interface NoiseData {
  timestamp: string
  averageNoise: number
  quietZones: number
  complaints: number
  noiseReduction: number
  noiseDistribution: { name: string; value: number; color: string }[]
  noiseByTime: { time: string; value: number }[]
  noiseByLocation: { name: string; value: number }[]
}

// Create context
const DataContext = createContext<{
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
  averageNoise: 67.3,
  quietZones: 28,
  complaints: 143,
  noiseReduction: 4.2,
  noiseDistribution: [
    { name: "Very Quiet (<45dB)", value: 15, color: "#22c55e" },
    { name: "Quiet (45-55dB)", value: 25, color: "#84cc16" },
    { name: "Moderate (55-65dB)", value: 30, color: "#facc15" },
    { name: "Loud (65-75dB)", value: 20, color: "#f97316" },
    { name: "Very Loud (>75dB)", value: 10, color: "#ef4444" },
  ],
  noiseByTime: [
    { time: "12 AM", value: 45 },
    { time: "3 AM", value: 38 },
    { time: "6 AM", value: 48 },
    { time: "9 AM", value: 72 },
    { time: "12 PM", value: 71 },
    { time: "3 PM", value: 67 },
    { time: "6 PM", value: 73 },
    { time: "9 PM", value: 60 },
  ],
  noiseByLocation: [
    { name: "Downtown", value: 78 },
    { name: "Residential", value: 58 },
    { name: "Parks", value: 42 },
    { name: "Commercial", value: 68 },
    { name: "Industrial", value: 82 },
    { name: "Schools", value: 52 },
    { name: "Hospitals", value: 45 },
    { name: "Transit Hubs", value: 78 },
  ],
}

// Provider component
export function SimplifiedDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<NoiseData>(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Function to update data with random variations
  const updateData = () => {
    setLoading(true)

    try {
      // Update timestamp
      const now = new Date()
      const newData = {
        ...data,
        timestamp: now.toISOString(),
      }

      // Update noise metrics with random variations
      newData.averageNoise = Math.max(50, Math.min(85, data.averageNoise + (Math.random() * 4 - 2)))
      newData.quietZones = Math.max(
        15,
        Math.min(40, data.quietZones + (Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0)),
      )
      newData.complaints = Math.max(100, Math.min(200, data.complaints + Math.floor(Math.random() * 10 - 5)))
      newData.noiseReduction = Math.max(0, Math.min(10, data.noiseReduction + (Math.random() * 0.6 - 0.3)))

      // Update noise distribution
      newData.noiseDistribution = data.noiseDistribution.map((item) => ({
        ...item,
        value: Math.max(5, Math.min(40, item.value + (Math.random() * 8 - 4))),
      }))

      // Update noise by time
      newData.noiseByTime = data.noiseByTime.map((item) => ({
        ...item,
        value: Math.max(35, Math.min(85, item.value + (Math.random() * 8 - 4))),
      }))

      // Update noise by location
      newData.noiseByLocation = data.noiseByLocation.map((item) => ({
        ...item,
        value: Math.max(35, Math.min(95, item.value + (Math.random() * 8 - 4))),
      }))

      setData(newData)
      setLoading(false)
    } catch (err) {
      console.error("Error updating data:", err)
      setError("Failed to update data")
      setLoading(false)
    }
  }

  // Set up automatic refresh every 5 seconds
  useEffect(() => {
    // Initial update
    updateData()

    // Set up interval for updates
    const interval = setInterval(updateData, 5000) // 5 seconds

    return () => clearInterval(interval)
  }, [])

  return <DataContext.Provider value={{ data, loading, error }}>{children}</DataContext.Provider>
}

// Hook to use the data
export function useNoiseData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useNoiseData must be used within a SimplifiedDataProvider")
  }
  return context
}

