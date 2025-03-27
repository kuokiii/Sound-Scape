"use client"

import { useEffect, useState } from "react"
import { useRealTimeData } from "./real-time-data-service"
import { motion, AnimatePresence } from "framer-motion"

export default function DynamicRecommendations() {
  const { data, loading, lastUpdate } = useRealTimeData()
  const [recommendations, setRecommendations] = useState([])
  const [animateKey, setAnimateKey] = useState(0)

  // Force re-render when data changes
  useEffect(() => {
    if (lastUpdate) {
      setAnimateKey((prev) => prev + 1)
      generateRecommendations()
    }
  }, [lastUpdate])

  // Generate recommendations based on real-time data
  const generateRecommendations = () => {
    if (!data) return

    const recommendationTemplates = [
      {
        title: "Reroute traffic during peak hours",
        getDescription: () => {
          const noisyArea = data.areas.sort((a, b) => b.value - a.value)[0]
          const reduction = Math.round(Math.random() * 10 + 8)
          return `Diverting traffic from ${noisyArea.name} between ${Math.floor(Math.random() * 2 + 7)}-${Math.floor(Math.random() * 2 + 9)}AM could reduce noise levels by up to ${reduction}dB in residential areas.`
        },
        color: "text-blue-600",
      },
      {
        title: "Implement noise barriers",
        getDescription: () => {
          const noisyArea = data.areas.sort((a, b) => b.value - a.value)[1]
          return `Installing sound barriers along major routes in ${noisyArea.name} would benefit the adjacent residential neighborhoods, reducing noise by approximately ${Math.round(Math.random() * 8 + 7)}dB.`
        },
        color: "text-blue-600",
      },
      {
        title: "Expand quiet zones",
        getDescription: () => {
          const quietArea = data.areas.sort((a, b) => a.value - b.value)[0]
          return `The area near ${quietArea.name} shows potential for designation as an official quiet zone with current levels of ${Math.round(quietArea.value)}dB.`
        },
        color: "text-blue-600",
      },
      {
        title: "Optimize construction schedules",
        getDescription: () => {
          return `Limiting construction activities to ${Math.floor(Math.random() * 2 + 9)}AM-${Math.floor(Math.random() * 2 + 3)}PM on weekdays could reduce noise complaints by approximately ${Math.round(Math.random() * 20 + 30)}%.`
        },
        color: "text-green-600",
      },
      {
        title: "Create urban sound gardens",
        getDescription: () => {
          const noisyArea = data.areas.sort((a, b) => b.value - a.value)[0]
          return `Developing sound gardens with water features and vegetation in ${noisyArea.name} could create acoustic oases with noise levels ${Math.round(Math.random() * 10 + 15)}dB lower than surrounding areas.`
        },
        color: "text-green-600",
      },
      {
        title: "Implement time-based noise regulations",
        getDescription: () => {
          return `Enforcing stricter noise limits during ${Math.random() > 0.5 ? "nighttime (10PM-7AM)" : "early morning (5AM-8AM)"} could improve sleep quality for residents and reduce health impacts.`
        },
        color: "text-purple-600",
      },
      {
        title: "Promote electric vehicle adoption",
        getDescription: () => {
          return `Increasing electric vehicle usage by ${Math.round(Math.random() * 15 + 10)}% could reduce traffic noise by approximately ${Math.round(Math.random() * 5 + 3)}dB in urban centers.`
        },
        color: "text-purple-600",
      },
      {
        title: "Develop noise-aware urban planning",
        getDescription: () => {
          return `Incorporating noise impact assessments in new development approvals could prevent the creation of new noise hotspots and protect existing quiet areas.`
        },
        color: "text-amber-600",
      },
    ]

    // Select 3-4 random recommendations
    const count = Math.floor(Math.random() * 2) + 3
    const shuffled = [...recommendationTemplates].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, count)

    // Generate the final recommendations with dynamic content
    const newRecommendations = selected.map((template, index) => ({
      id: `rec-${Date.now()}-${index}`,
      title: template.title,
      description: template.getDescription(),
      color: template.color,
    }))

    setRecommendations(newRecommendations)
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
        {recommendations.map((recommendation) => (
          <motion.div
            key={`${recommendation.id}-${animateKey}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            layout
            className="p-4 border rounded-md"
          >
            <h3 className={`font-medium ${recommendation.color}`}>{recommendation.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{recommendation.description}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

