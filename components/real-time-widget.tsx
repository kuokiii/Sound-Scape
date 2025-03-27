"use client"

import { useRealTimeData } from "./real-time-data-service"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export default function RealTimeWidget() {
  const { data, loading, lastUpdate } = useRealTimeData()
  const [animateKey, setAnimateKey] = useState(0)

  // Trigger animation when data updates
  useEffect(() => {
    if (lastUpdate) {
      setAnimateKey((prev) => prev + 1)
    }
  }, [lastUpdate])

  if (!data) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Real-Time Noise Levels</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[200px]">
          <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </CardContent>
      </Card>
    )
  }

  // Get the top 3 noisiest areas
  const noisiestAreas = [...data.areas].sort((a, b) => b.value - a.value).slice(0, 3)

  // Get the top 3 quietest areas
  const quietestAreas = [...data.areas].sort((a, b) => a.value - b.value).slice(0, 3)

  // Get noise level category
  const getNoiseLevelCategory = (level) => {
    if (level < 45) return { label: "Very Quiet", color: "bg-green-100 text-green-800" }
    if (level < 55) return { label: "Quiet", color: "bg-blue-100 text-blue-800" }
    if (level < 65) return { label: "Moderate", color: "bg-yellow-100 text-yellow-800" }
    if (level < 75) return { label: "Loud", color: "bg-orange-100 text-orange-800" }
    return { label: "Very Loud", color: "bg-red-100 text-red-800" }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Real-Time Noise Levels</CardTitle>
          {loading && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Updating...</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Noisiest Areas</h3>
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {noisiestAreas.map((area, index) => (
                  <motion.div
                    key={`${area.name}-${animateKey}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    layout
                    className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
                  >
                    <span className="font-medium">{area.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getNoiseLevelCategory(area.value).color}>
                        {area.value.toFixed(1)} dB
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Quietest Areas</h3>
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {quietestAreas.map((area, index) => (
                  <motion.div
                    key={`${area.name}-${animateKey}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    layout
                    className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
                  >
                    <span className="font-medium">{area.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getNoiseLevelCategory(area.value).color}>
                        {area.value.toFixed(1)} dB
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="text-xs text-gray-500 text-right">Last updated: {data.lastUpdated}</div>
        </div>
      </CardContent>
    </Card>
  )
}

