"use client"

import { useRealTimeData } from "./real-time-data-service"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function RealTimeIndicator() {
  const { loading, lastUpdate } = useRealTimeData()
  const [showUpdate, setShowUpdate] = useState(false)

  useEffect(() => {
    if (lastUpdate) {
      setShowUpdate(true)
      const timer = setTimeout(() => {
        setShowUpdate(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [lastUpdate])

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showUpdate ? 1 : 0, y: showUpdate ? 0 : 20 }}
        className="bg-blue-600 text-white px-3 py-2 rounded-md shadow-lg flex items-center gap-2"
      >
        <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">Data updated</span>
      </motion.div>
    </div>
  )
}

