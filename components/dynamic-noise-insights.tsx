"use client"

import { useEffect, useState } from "react"
import { useRealTimeData } from "./real-time-data-service"
import { AlertTriangle, TrendingDown, TrendingUp, Lightbulb, Clock, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

export default function DynamicNoiseInsights() {
  const { data, loading, lastUpdate } = useRealTimeData()
  const [insights, setInsights] = useState([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [animateKey, setAnimateKey] = useState(0)

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  // Force re-render when data changes
  useEffect(() => {
    if (lastUpdate) {
      setAnimateKey((prev) => prev + 1)
      generateInsights()
    }
  }, [lastUpdate])

  // Generate insights based on real-time data
  const generateInsights = () => {
    if (!data) return

    // Define insight types
    const insightTypes = [
      {
        type: "alert",
        icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
        titles: [
          "Noise Threshold Exceeded",
          "High Noise Alert",
          "Noise Pollution Warning",
          "Critical Noise Levels Detected",
          "Noise Ordinance Violation Alert",
        ],
        descriptions: [
          `${data.areas[0].name} area is experiencing noise levels above ${Math.round(data.areas[0].value)}dB, which exceeds recommended limits.`,
          `Construction noise in the ${data.areas[1].name} district has been consistently high for the past 3 hours.`,
          `Traffic noise on Main Street has reached concerning levels of ${Math.round(data.areas[2].value)}dB during rush hour.`,
          `${data.areas[3].name} district is exceeding noise ordinance limits after midnight.`,
          `${data.areas[4].name} zone noise is affecting nearby residential areas with levels of ${Math.round(data.areas[4].value)}dB.`,
        ],
      },
      {
        type: "trend",
        icon:
          data.stats && data.stats.noiseReduction > 0 ? (
            <TrendingDown className="h-5 w-5 text-green-500" />
          ) : (
            <TrendingUp className="h-5 w-5 text-amber-500" />
          ),
        titles: [
          "Noise Reduction Trend",
          "Improving Acoustic Environment",
          "Positive Noise Pattern",
          "Noise Mitigation Success",
          "Quieter Urban Spaces",
        ],
        descriptions: [
          `Overall city noise levels have ${data.stats && data.stats.noiseReduction > 0 ? "decreased" : "increased"} by ${Math.abs(data.stats?.noiseReduction || 0).toFixed(1)}% compared to last month.`,
          `New traffic management has reduced noise pollution in the ${data.areas[Math.floor(Math.random() * data.areas.length)].name} area.`,
          `${data.areas[Math.floor(Math.random() * data.areas.length)].name} areas are experiencing quieter evenings after new ordinance implementation.`,
          `School zones show significant noise reduction of ${Math.round(Math.random() * 10 + 5)}% during class hours.`,
          `Park areas maintain consistently low noise levels of ${Math.round(data.areas.find((a) => a.name === "Parks")?.value || 45)}dB throughout the week.`,
        ],
      },
      {
        type: "pattern",
        icon: <Clock className="h-5 w-5 text-blue-500" />,
        titles: [
          "Noise Pattern Identified",
          "Temporal Noise Analysis",
          "Recurring Noise Events",
          "Predictable Noise Cycles",
          "Time-based Noise Insights",
        ],
        descriptions: [
          `Noise levels peak consistently between 8-9 AM (${Math.round(data.hourlyData[8]?.value || 65)}dB) and 5-6 PM (${Math.round(data.hourlyData[17]?.value || 70)}dB) on weekdays.`,
          `Weekend noise patterns differ significantly from weekdays in ${data.areas[Math.floor(Math.random() * data.areas.length)].name} districts.`,
          `Construction noise follows a predictable pattern that can be used for planning quiet activities.`,
          `Seasonal changes affect urban noise distribution and intensity by approximately ${Math.round(Math.random() * 8 + 2)}dB.`,
          `Noise levels in ${data.areas[Math.floor(Math.random() * data.areas.length)].name} areas follow business hours with predictable patterns.`,
        ],
      },
      {
        type: "discovery",
        icon: <Lightbulb className="h-5 w-5 text-yellow-500" />,
        titles: [
          "New Quiet Zone Discovered",
          "Acoustic Anomaly Found",
          "Noise Insight Discovery",
          "Unexpected Quiet Area",
          "Acoustic Environment Finding",
        ],
        descriptions: [
          `A previously unidentified quiet zone has been discovered near the ${data.areas[Math.floor(Math.random() * data.areas.length)].name} area.`,
          `Analysis reveals that tree-lined streets reduce traffic noise by up to ${Math.round(Math.random() * 15 + 20)}%.`,
          `Building materials in the historic district provide natural sound insulation, reducing noise by ${Math.round(Math.random() * 10 + 15)}dB.`,
          `Water features in urban parks mask city noise and create perceived quiet zones with levels as low as ${Math.round(Math.random() * 5 + 40)}dB.`,
          `Pedestrian-only zones show dramatically improved acoustic environments with a ${Math.round(Math.random() * 20 + 30)}% reduction in noise.`,
        ],
      },
      {
        type: "location",
        icon: <MapPin className="h-5 w-5 text-purple-500" />,
        titles: [
          "Location-based Noise Analysis",
          "Neighborhood Noise Profile",
          "Geographic Noise Distribution",
          "Area-specific Noise Insights",
          "Spatial Noise Patterns",
        ],
        descriptions: [
          `Eastern neighborhoods consistently experience ${Math.round(Math.random() * 10 + 5)}dB lower noise levels than western areas.`,
          `Riverside areas benefit from natural sound barriers and show ${Math.round(Math.random() * 8 + 12)}% lower average noise.`,
          `Elevated areas of the city experience less traffic noise but more aircraft noise, averaging ${Math.round(data.areas[Math.floor(Math.random() * data.areas.length)].value)}dB.`,
          `University district noise levels vary dramatically between term time (${Math.round(Math.random() * 10 + 60)}dB) and holidays (${Math.round(Math.random() * 10 + 45)}dB).`,
          `Coastal areas experience unique noise patterns influenced by weather and tourism, fluctuating by ${Math.round(Math.random() * 15 + 10)}dB seasonally.`,
        ],
      },
    ]

    // Generate 3-5 random insights
    const count = Math.floor(Math.random() * 3) + 3
    const selectedTypes = new Set()
    const newInsights = []

    while (newInsights.length < count) {
      // Select a random insight type
      const typeIndex = Math.floor(Math.random() * insightTypes.length)
      const type = insightTypes[typeIndex].type

      // Ensure we don't have too many of the same type
      if (selectedTypes.has(type) && Math.random() > 0.3) continue
      selectedTypes.add(type)

      const insightType = insightTypes[typeIndex]

      // Select random title and description
      const titleIndex = Math.floor(Math.random() * insightType.titles.length)
      const descIndex = Math.floor(Math.random() * insightType.descriptions.length)

      // Add timestamp variation
      const minutesAgo = Math.floor(Math.random() * 55) + 5
      const timestamp = new Date(currentTime.getTime() - minutesAgo * 60000)

      newInsights.push({
        id: `insight-${Date.now()}-${newInsights.length}`,
        type: insightType.type,
        icon: insightType.icon,
        title: insightType.titles[titleIndex],
        description: insightType.descriptions[descIndex],
        timestamp,
      })
    }

    // Sort insights by recency
    newInsights.sort((a, b) => b.timestamp - a.timestamp)

    setInsights(newInsights)
  }

  // Format timestamp as relative time
  const formatRelativeTime = (timestamp) => {
    const now = currentTime
    const diffMs = now.getTime() - timestamp.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins} min ago`

    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours} hr ago`

    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays} day ago`
  }

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {insights.map((insight) => (
          <motion.div
            key={`${insight.id}-${animateKey}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            layout
          >
            <Card className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1">{insight.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium">{insight.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {formatRelativeTime(insight.timestamp)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{insight.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

