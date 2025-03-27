"use client"

import { useEffect, useState } from "react"
import { useRealTimeData } from "./real-time-data-service"
import { AlertTriangle, TrendingDown, Lightbulb, Clock, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function NoiseInsights() {
  const { data, loading } = useRealTimeData()
  const [insights, setInsights] = useState([])
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Generate insights based on real-time data or defaults
    const generateInsights = () => {
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
            "Downtown area is experiencing noise levels above 75dB, which exceeds recommended limits.",
            "Construction noise in the residential district has been consistently high for the past 3 hours.",
            "Traffic noise on Main Street has reached concerning levels during rush hour.",
            "Nightlife district is exceeding noise ordinance limits after midnight.",
            "Industrial zone noise is affecting nearby residential areas.",
          ],
        },
        {
          type: "trend",
          icon: <TrendingDown className="h-5 w-5 text-green-500" />,
          titles: [
            "Noise Reduction Trend",
            "Improving Acoustic Environment",
            "Positive Noise Pattern",
            "Noise Mitigation Success",
            "Quieter Urban Spaces",
          ],
          descriptions: [
            "Overall city noise levels have decreased by 8% compared to last month.",
            "New traffic management has reduced noise pollution in the downtown area.",
            "Residential areas are experiencing quieter evenings after new ordinance implementation.",
            "School zones show significant noise reduction during class hours.",
            "Park areas maintain consistently low noise levels throughout the week.",
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
            "Noise levels peak consistently between 8-9 AM and 5-6 PM on weekdays.",
            "Weekend noise patterns differ significantly from weekdays in entertainment districts.",
            "Construction noise follows a predictable pattern that can be used for planning quiet activities.",
            "Seasonal changes affect urban noise distribution and intensity.",
            "Noise levels in commercial areas follow business hours with predictable patterns.",
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
            "A previously unidentified quiet zone has been discovered near the botanical gardens.",
            "Analysis reveals that tree-lined streets reduce traffic noise by up to 30%.",
            "Building materials in the historic district provide natural sound insulation.",
            "Water features in urban parks mask city noise and create perceived quiet zones.",
            "Pedestrian-only zones show dramatically improved acoustic environments.",
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
            "Eastern neighborhoods consistently experience lower noise levels than western areas.",
            "Riverside areas benefit from natural sound barriers and show lower average noise.",
            "Elevated areas of the city experience less traffic noise but more aircraft noise.",
            "University district noise levels vary dramatically between term time and holidays.",
            "Coastal areas experience unique noise patterns influenced by weather and tourism.",
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

      return newInsights
    }

    // Set insights
    setInsights(generateInsights())
  }, [data, currentTime])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
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

  return (
    <div className="space-y-4">
      {insights.map((insight) => (
        <Card key={insight.id} className="overflow-hidden">
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
      ))}
    </div>
  )
}

