"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface FeatureBadgeProps {
  icon: ReactNode
  title: string
  description: string
  delay?: number
}

export default function FeatureBadge({ icon, title, description, delay = 0 }: FeatureBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="absolute bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

