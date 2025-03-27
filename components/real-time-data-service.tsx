"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

// Define the shape of our real-time data
interface NoiseData {
  timestamp: string
  lastUpdated: string
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
  stats: {
    averageNoise: number
    quietZones: number
    complaints: number
    noiseReduction: number
    trend: "improving" | "worsening" | "stable"
  }
  pieData: {
    name: string
    value: number
    color: string
  }[]
  histogramData: {
    range: string
    count: number
    color: string
  }[]
  insights: {
    id: number
    type: "alert" | "trend" | "pattern" | "discovery"
    title: string
    description: string
    color: string
    badge: string
    badgeColor: string
    action: string
    priority: number
  }[]
  // New data structures for our updated charts
  noiseDistribution: {
    name: string
    value: number
    color: string
  }[]
  noiseFrequency: {
    range: string
    count: number
    color: string
  }[]
  noiseByArea: {
    name: string
    value: number
    limit: number
  }[]
  noiseByTime: {
    time: string
    residential: number
    commercial: number
    industrial: number
  }[]
  noiseByLocation: {
    name: string
    current: number
    previous: number
    limit: number
  }[]
  noiseComplaints: {
    name: string
    value: number
    color: string
  }[]
  noiseComparison: {
    name: string
    current: number
    average: number
    best: number
  }[]
  noiseCalendar: {
    x: number
    y: number
    z: number
    day: string
    hour: string
    value: number
  }[]
}

// Create context
const RealTimeDataContext = createContext<{
  data: NoiseData | null
  loading: boolean
  error: string | null
  refreshData: () => void
  lastUpdate: Date | null
}>({
  data: null,
  loading: true,
  error: null,
  refreshData: () => {},
  lastUpdate: null,
})

// Initial data
const initialData: NoiseData = {
  timestamp: new Date().toISOString(),
  lastUpdated: new Date().toLocaleTimeString(),
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
  stats: {
    averageNoise: 67.3,
    quietZones: 28,
    complaints: 143,
    noiseReduction: -4.2,
    trend: "improving",
  },
  pieData: [
    { name: "Very Quiet (<45 dB)", value: 15, color: "#10b981" },
    { name: "Quiet (45-55 dB)", value: 25, color: "#3b82f6" },
    { name: "Moderate (55-65 dB)", value: 30, color: "#f59e0b" },
    { name: "Loud (65-75 dB)", value: 20, color: "#ef4444" },
    { name: "Very Loud (>75 dB)", value: 10, color: "#dc2626" },
  ],
  histogramData: [
    { range: "30-40 dB", count: 5, color: "#10b981" },
    { range: "40-50 dB", count: 15, color: "#10b981" },
    { range: "50-60 dB", count: 25, color: "#3b82f6" },
    { range: "60-70 dB", count: 30, color: "#f59e0b" },
    { range: "70-80 dB", count: 18, color: "#ef4444" },
    { range: "80-90 dB", count: 7, color: "#dc2626" },
  ],
  insights: [
    {
      id: 1,
      type: "alert",
      title: "Construction noise spike",
      description: "Construction on Main Street is causing 15dB higher noise levels during 8AM-5PM",
      color: "text-red-500",
      badge: "Alert",
      badgeColor: "bg-red-100 text-red-800",
      action: "View on map",
      priority: 1,
    },
    {
      id: 2,
      type: "trend",
      title: "Morning commute getting quieter",
      description: "7-9AM noise levels have decreased by 8% over the past month",
      color: "text-green-500",
      badge: "Trend",
      badgeColor: "bg-green-100 text-green-800",
      action: "See trend",
      priority: 3,
    },
    {
      id: 3,
      type: "pattern",
      title: "Weekend noise pattern change",
      description: "Saturday noise levels are shifting from evenings to afternoons",
      color: "text-blue-500",
      badge: "Pattern",
      badgeColor: "bg-blue-100 text-blue-800",
      action: "View details",
      priority: 2,
    },
    {
      id: 4,
      type: "discovery",
      title: "New quiet zone identified",
      description: "Area near Riverside Park consistently shows <45dB during weekdays",
      color: "text-emerald-500",
      badge: "Discovery",
      badgeColor: "bg-emerald-100 text-emerald-800",
      action: "Add to quiet zones",
      priority: 4,
    },
  ],
  // New data for our updated charts
  noiseDistribution: [
    { name: "Very Quiet (<45dB)", value: 15, color: "#22c55e" },
    { name: "Quiet (45-55dB)", value: 25, color: "#84cc16" },
    { name: "Moderate (55-65dB)", value: 30, color: "#facc15" },
    { name: "Loud (65-75dB)", value: 20, color: "#f97316" },
    { name: "Very Loud (>75dB)", value: 10, color: "#ef4444" },
  ],
  noiseFrequency: [
    { range: "30-35", count: 5, color: "#22c55e" },
    { range: "35-40", count: 12, color: "#22c55e" },
    { range: "40-45", count: 18, color: "#22c55e" },
    { range: "45-50", count: 25, color: "#84cc16" },
    { range: "50-55", count: 32, color: "#84cc16" },
    { range: "55-60", count: 38, color: "#facc15" },
    { range: "60-65", count: 30, color: "#facc15" },
    { range: "65-70", count: 24, color: "#f97316" },
    { range: "70-75", count: 18, color: "#f97316" },
    { range: "75-80", count: 12, color: "#ef4444" },
    { range: "80-85", count: 8, color: "#ef4444" },
    { range: "85-90", count: 4, color: "#ef4444" },
  ],
  noiseByArea: [
    { name: "Downtown", value: 78, limit: 65 },
    { name: "Residential", value: 58, limit: 55 },
    { name: "Commercial", value: 72, limit: 65 },
    { name: "Industrial", value: 82, limit: 75 },
    { name: "Parks", value: 52, limit: 55 },
    { name: "Schools", value: 62, limit: 55 },
    { name: "Hospitals", value: 48, limit: 50 },
    { name: "Entertainment", value: 76, limit: 70 },
  ],
  noiseByTime: [
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
  ],
  noiseByLocation: [
    { name: "Downtown", current: 78, previous: 75, limit: 65 },
    { name: "Midtown", current: 72, previous: 70, limit: 65 },
    { name: "Uptown", current: 68, previous: 65, limit: 65 },
    { name: "Westside", current: 65, previous: 68, limit: 65 },
    { name: "Eastside", current: 62, previous: 64, limit: 65 },
    { name: "Southside", current: 70, previous: 72, limit: 65 },
    { name: "Northside", current: 64, previous: 62, limit: 65 },
    { name: "Harbor", current: 68, previous: 70, limit: 65 },
  ],
  noiseComplaints: [
    { name: "Construction", value: 35, color: "#f97316" },
    { name: "Traffic", value: 25, color: "#3b82f6" },
    { name: "Nightlife", value: 20, color: "#8b5cf6" },
    { name: "Neighbors", value: 15, color: "#ef4444" },
    { name: "Industrial", value: 5, color: "#84cc16" },
  ],
  noiseComparison: [
    { name: "Your City", current: 68, average: 65, best: 58 },
    { name: "New York", current: 75, average: 72, best: 65 },
    { name: "Los Angeles", current: 72, average: 70, best: 62 },
    { name: "Chicago", current: 70, average: 68, best: 60 },
    { name: "Houston", current: 68, average: 66, best: 59 },
    { name: "Phoenix", current: 65, average: 63, best: 57 },
  ],
  noiseCalendar: [], // This will be generated dynamically
}

// Generate calendar data
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const calendarData = []
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

    calendarData.push({
      x: day,
      y: hour,
      z: noise,
      day: daysOfWeek[day],
      hour: `${hour}:00`,
      value: Math.round(noise),
    })
  }
}
initialData.noiseCalendar = calendarData

// Provider component
export function RealTimeDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<NoiseData>(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(new Date())

  // Function to update data with random variations
  const updateData = () => {
    setLoading(true)

    try {
      // In a real app, this would be a fetch call to an API endpoint
      // For demo purposes, we'll simulate data changes

      // Update timestamp
      const now = new Date()
      const newData = {
        ...data,
        timestamp: now.toISOString(),
        lastUpdated: now.toLocaleTimeString(),
      }

      // Update area noise levels with more significant random variations
      newData.areas = data.areas.map((area) => ({
        ...area,
        value: Math.max(35, Math.min(95, area.value + (Math.random() * 10 - 5))),
      }))

      // Update hourly data for the current hour with more noticeable changes
      const currentHour = now.getHours()
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
            value: Math.max(35, Math.min(85, item.value + (Math.random() * 10 - 5))),
          }
        }
        return item
      })

      // Update location data with more significant changes
      newData.locationData = data.locationData.map((item) => ({
        ...item,
        morning: Math.max(35, Math.min(85, item.morning + (Math.random() * 8 - 4))),
        afternoon: Math.max(35, Math.min(85, item.afternoon + (Math.random() * 8 - 4))),
        evening: Math.max(35, Math.min(85, item.evening + (Math.random() * 8 - 4))),
        night: Math.max(35, Math.min(85, item.night + (Math.random() * 8 - 4))),
      }))

      // Update complaint data with more noticeable changes
      newData.complaintData = data.complaintData.map((item) => ({
        ...item,
        data: item.data.map((val) => Math.max(0, Math.min(20, val + (Math.random() * 4 - 2)))),
      }))

      // Update stats with more significant changes
      const noiseChange = Math.random() * 4 - 2
      const quietZonesChange = Math.random() > 0.5 ? (Math.random() > 0.5 ? 1 : -1) : 0
      const complaintsChange = Math.floor(Math.random() * 10) - 5

      newData.stats = {
        ...data.stats,
        averageNoise: Number.parseFloat((data.stats.averageNoise + noiseChange).toFixed(1)),
        quietZones: data.stats.quietZones + quietZonesChange,
        complaints: data.stats.complaints + complaintsChange,
        noiseReduction: Number.parseFloat((data.stats.noiseReduction + (Math.random() * 0.8 - 0.4)).toFixed(1)),
        trend: Math.random() > 0.7 ? (Math.random() > 0.5 ? "improving" : "worsening") : data.stats.trend,
      }

      // Update pie chart data with more significant changes
      newData.pieData = data.pieData.map((slice) => ({
        ...slice,
        value: Math.max(5, Math.min(40, slice.value + (Math.random() * 10 - 5))),
      }))

      // Update histogram data with more significant changes
      newData.histogramData = data.histogramData.map((bar) => ({
        ...bar,
        count: Math.max(1, Math.min(40, bar.count + (Math.random() * 10 - 5))),
      }))

      // Update new chart data with more significant changes
      newData.noiseDistribution = data.noiseDistribution.map((item) => ({
        ...item,
        value: Math.max(5, Math.min(40, item.value + (Math.random() * 10 - 5))),
      }))

      newData.noiseFrequency = data.noiseFrequency.map((item) => ({
        ...item,
        count: Math.max(1, Math.min(40, item.count + (Math.random() * 10 - 5))),
      }))

      newData.noiseByArea = data.noiseByArea.map((item) => ({
        ...item,
        value: Math.max(35, Math.min(95, item.value + (Math.random() * 10 - 5))),
      }))

      newData.noiseByTime = data.noiseByTime.map((item) => ({
        ...item,
        residential: Math.max(35, Math.min(85, item.residential + (Math.random() * 10 - 5))),
        commercial: Math.max(35, Math.min(85, item.commercial + (Math.random() * 10 - 5))),
        industrial: Math.max(35, Math.min(85, item.industrial + (Math.random() * 10 - 5))),
      }))

      newData.noiseByLocation = data.noiseByLocation.map((item) => ({
        ...item,
        current: Math.max(35, Math.min(85, item.current + (Math.random() * 10 - 5))),
      }))

      newData.noiseComplaints = data.noiseComplaints.map((item) => ({
        ...item,
        value: Math.max(5, Math.min(40, item.value + (Math.random() * 10 - 5))),
      }))

      newData.noiseComparison = data.noiseComparison.map((item) => ({
        ...item,
        current: Math.max(35, Math.min(85, item.current + (Math.random() * 10 - 5))),
      }))

      // Update calendar data with more significant changes
      newData.noiseCalendar = data.noiseCalendar.map((item) => ({
        ...item,
        z: Math.max(30, Math.min(85, item.z + (Math.random() * 10 - 5))),
        value: Math.round(Math.max(30, Math.min(85, item.value + (Math.random() * 10 - 5)))),
      }))

      // Generate new AI-like insights occasionally
      if (Math.random() > 0.5) {
        // Create a completely new insight
        if (Math.random() > 0.7) {
          const insightTypes = ["alert", "trend", "pattern", "discovery"]
          const randomType = insightTypes[Math.floor(Math.random() * insightTypes.length)] as
            | "alert"
            | "trend"
            | "pattern"
            | "discovery"
          const randomTitleIndex = Math.floor(Math.random() * insightTitles.length)
          const randomDescIndex = Math.floor(Math.random() * insightDescriptions.length)

          const badgeText = randomType.charAt(0).toUpperCase() + randomType.slice(1)
          let badgeColor = ""
          let textColor = ""

          switch (randomType) {
            case "alert":
              badgeColor = "bg-red-100 text-red-800"
              textColor = "text-red-500"
              break
            case "trend":
              badgeColor = "bg-green-100 text-green-800"
              textColor = "text-green-500"
              break
            case "pattern":
              badgeColor = "bg-blue-100 text-blue-800"
              textColor = "text-blue-500"
              break
            case "discovery":
              badgeColor = "bg-emerald-100 text-emerald-800"
              textColor = "text-emerald-500"
              break
          }

          // Replace one insight with a new one
          const insightToReplaceIndex = Math.floor(Math.random() * newData.insights.length)

          newData.insights[insightToReplaceIndex] = {
            id: Date.now(),
            type: randomType,
            title: insightTitles[randomTitleIndex],
            description: insightDescriptions[randomDescIndex],
            color: textColor,
            badge: badgeText,
            badgeColor: badgeColor,
            action:
              randomType === "alert"
                ? "View on map"
                : randomType === "trend"
                  ? "See trend"
                  : randomType === "pattern"
                    ? "View details"
                    : "Add to quiet zones",
            priority: Math.floor(Math.random() * 4) + 1,
          }
        } else {
          // Just update existing insights
          newData.insights = newData.insights.map((insight) => {
            if (Math.random() > 0.7) {
              // Update this insight
              const randomTitleIndex = Math.floor(Math.random() * insightTitles.length)
              const randomDescIndex = Math.floor(Math.random() * insightDescriptions.length)

              return {
                ...insight,
                title: insightTitles[randomTitleIndex],
                description: insightDescriptions[randomDescIndex],
                priority: Math.floor(Math.random() * 4) + 1,
              }
            }
            return insight
          })
        }

        // Sort insights by priority
        newData.insights.sort((a, b) => a.priority - b.priority)
      }

      setData(newData)
      setLastUpdate(now)
      setLoading(false)
    } catch (err) {
      console.error("Error updating real-time data:", err)
      setError("Failed to update real-time data")
      setLoading(false)
    }
  }

  // Function to manually refresh data
  const refreshData = () => {
    updateData()
  }

  // Set up automatic refresh every 5 seconds
  useEffect(() => {
    // Initial update
    updateData()

    // Set up interval for updates
    const interval = setInterval(updateData, 5000) // 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <RealTimeDataContext.Provider value={{ data, loading, error, refreshData, lastUpdate }}>
      {children}
    </RealTimeDataContext.Provider>
  )
}

// Hook to use the real-time data
export function useRealTimeData() {
  const context = useContext(RealTimeDataContext)
  if (!context) {
    throw new Error("useRealTimeData must be used within a RealTimeDataProvider")
  }
  return context
}

const insightTitles = [
  "Sudden increase in noise levels reported",
  "Noise pollution decreasing in residential areas",
  "New noise complaints filed near construction site",
  "Unexpected quiet period observed in commercial zone",
  "Traffic noise significantly impacting local park",
]

const insightDescriptions = [
  "A sharp rise in noise levels has been detected, potentially affecting local residents.",
  "Positive trend: Noise pollution is decreasing in residential areas, improving quality of life.",
  "New noise complaints have been filed near the construction site, prompting further investigation.",
  "An unusual quiet period has been observed in the commercial zone, deviating from typical patterns.",
  "Traffic noise is significantly impacting the local park, affecting recreational activities.",
]

