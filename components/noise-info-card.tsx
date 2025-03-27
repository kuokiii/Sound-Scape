"use client"

import { motion } from "framer-motion"
import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Volume, Volume1, Volume2, VolumeX } from "lucide-react"

interface NoiseInfoCardProps {
  location: {
    lat: number
    lng: number
    noiseLevel: number
    address?: string
    timestamp: string
    type?: string
  }
}

export default function NoiseInfoCard({ location }: NoiseInfoCardProps) {
  // Determine noise level category
  const getNoiseLevelCategory = (level: number) => {
    if (level < 45)
      return { label: "Very Quiet", color: "bg-green-100 text-green-800", icon: <VolumeX className="h-4 w-4" /> }
    if (level < 55)
      return { label: "Quiet", color: "bg-emerald-100 text-emerald-800", icon: <VolumeX className="h-4 w-4" /> }
    if (level < 65)
      return { label: "Moderate", color: "bg-blue-100 text-blue-800", icon: <Volume className="h-4 w-4" /> }
    if (level < 75)
      return { label: "Loud", color: "bg-yellow-100 text-yellow-800", icon: <Volume1 className="h-4 w-4" /> }
    return { label: "Very Loud", color: "bg-red-100 text-red-800", icon: <Volume2 className="h-4 w-4" /> }
  }

  const category = getNoiseLevelCategory(location.noiseLevel)

  // Get health impact description
  const getHealthImpact = (level: number) => {
    if (level < 45) return "No health impact. Ideal for sleep and relaxation."
    if (level < 55) return "No significant health impact. Good for concentration and rest."
    if (level < 65) return "Minimal health impact. May cause mild annoyance during focused activities."
    if (level < 75) return "Moderate health impact. May cause stress and sleep disturbance with prolonged exposure."
    return "Significant health impact. Can cause hearing damage with prolonged exposure and increased stress levels."
  }

  // Format timestamp
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Calculate the percentage for the gauge
  const gaugePercentage = Math.min(location.noiseLevel / 100, 1)
  const gaugeColor =
    location.noiseLevel > 75
      ? "#ef4444"
      : location.noiseLevel > 65
        ? "#f59e0b"
        : location.noiseLevel > 55
          ? "#3b82f6"
          : "#10b981"

  return (
    <CardContent className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Noise Level</h3>
        <Badge variant="outline" className={`${category.color} flex items-center gap-1`}>
          {category.icon}
          {category.label}
        </Badge>
      </div>

      <div className="flex items-center justify-center">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={gaugeColor}
              strokeWidth="10"
              strokeDasharray="283"
              initial={{ strokeDashoffset: 283 }}
              animate={{ strokeDashoffset: 283 - 283 * gaugePercentage }}
              transition={{ duration: 1, ease: "easeOut" }}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <motion.div
            className="absolute flex flex-col items-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <span className="text-3xl font-bold">{location.noiseLevel}</span>
            <span className="text-xs text-gray-500">dB</span>
          </motion.div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Location:</span>
          <span>{location.address || `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Time:</span>
          <span>{formatTime(location.timestamp)}</span>
        </div>
      </div>

      <motion.div
        className="pt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h4 className="text-sm font-medium mb-1">Health Impact</h4>
        <p className="text-sm text-gray-600">{getHealthImpact(location.noiseLevel)}</p>
      </motion.div>

      <motion.div
        className="pt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h4 className="text-sm font-medium mb-1">Common Sources</h4>
        <p className="text-sm text-gray-600">
          {location.noiseLevel > 75
            ? "Construction, heavy traffic, loud music events"
            : location.noiseLevel > 65
              ? "Urban traffic, restaurants, busy offices"
              : location.noiseLevel > 55
                ? "Normal conversation, quiet office, light traffic"
                : "Library, quiet residential area, nature"}
        </p>
      </motion.div>
    </CardContent>
  )
}

