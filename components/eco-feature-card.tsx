"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface EcoFeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  color?: string
  delay?: number
}

export default function EcoFeatureCard({ icon, title, description, color = "green", delay = 0 }: EcoFeatureCardProps) {
  const colorClasses = {
    green: {
      bg: "bg-green-50",
      iconBg: "bg-green-100",
      iconText: "text-green-600",
      hover: "hover:shadow-green-100/50",
      border: "border-green-100",
    },
    red: {
      bg: "bg-green-50",
      iconBg: "bg-red-100",
      iconText: "text-red-600",
      hover: "hover:shadow-red-100/50",
      border: "border-red-100",
    },
    amber: {
      bg: "bg-green-50",
      iconBg: "bg-amber-100",
      iconText: "text-amber-600",
      hover: "hover:shadow-amber-100/50",
      border: "border-amber-100",
    },
    blue: {
      bg: "bg-green-50",
      iconBg: "bg-blue-100",
      iconText: "text-blue-600",
      hover: "hover:shadow-blue-100/50",
      border: "border-blue-100",
    },
  }

  const colors = colorClasses[color] || colorClasses.green

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={`${colors.bg} rounded-xl p-8 text-center border ${colors.border} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${colors.hover}`}
    >
      <div className={`h-16 w-16 ${colors.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}>
        <div className={colors.iconText}>{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

