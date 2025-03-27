"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedIconGridProps {
  icons: {
    icon: ReactNode
    title: string
    description: string
  }[]
  columns?: number
  className?: string
}

export default function AnimatedIconGrid({ icons, columns = 3, className = "" }: AnimatedIconGridProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-8 ${className}`}
    >
      {icons.map((iconData, index) => (
        <motion.div
          key={index}
          variants={item}
          className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-md hover:shadow-green-100 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-6 overflow-hidden">
            {iconData.icon}
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">{iconData.title}</h3>
          <p className="text-gray-600">{iconData.description}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

