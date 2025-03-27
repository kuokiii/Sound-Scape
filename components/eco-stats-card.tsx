"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface EcoStatsCardProps {
  value: string
  label: string
  delay?: number
}

export default function EcoStatsCard({ value, label, delay = 0 }: EcoStatsCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-lg hover:shadow-green-100 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="text-4xl font-bold text-green-600 mb-2">{value}</div>
      <p className="text-gray-600">{label}</p>
    </motion.div>
  )
}

