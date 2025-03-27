"use client"

import { useEffect, useRef } from "react"

interface PieChartProps {
  data: { name: string; value: number; color: string }[]
  height?: number
}

export default function SimplePieChart({ data, height = 300 }: PieChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !data || data.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = height

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Calculate total value
    const total = data.reduce((sum, item) => sum + item.value, 0)

    // Animation settings
    const animationDuration = 500 // ms
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / animationDuration, 1)

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw pie chart with animation
      let startAngle = 0
      const radius = Math.min(canvas.width, canvas.height) / 2 - 40
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      data.forEach((item) => {
        const sliceAngle = (item.value / total) * 2 * Math.PI * progress

        // Draw slice
        ctx.fillStyle = item.color
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
        ctx.closePath()
        ctx.fill()

        // Calculate label position
        if (progress === 1) {
          const midAngle = startAngle + sliceAngle / 2
          const labelRadius = radius * 0.7
          const labelX = centerX + labelRadius * Math.cos(midAngle)
          const labelY = centerY + labelRadius * Math.sin(midAngle)

          // Draw percentage label
          const percentage = Math.round((item.value / total) * 100)
          ctx.fillStyle = "#ffffff"
          ctx.font = "bold 14px sans-serif"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(`${percentage}%`, labelX, labelY)
        }

        startAngle += sliceAngle
      })

      // Draw legend
      const legendX = canvas.width - 150
      const legendY = 40

      data.forEach((item, index) => {
        const y = legendY + index * 25

        // Draw color box
        ctx.fillStyle = item.color
        ctx.fillRect(legendX, y, 15, 15)

        // Draw label
        ctx.fillStyle = "#1f2937"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "left"
        ctx.textBaseline = "middle"
        ctx.fillText(item.name, legendX + 25, y + 7.5)
      })

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [data, height])

  return (
    <div className="w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

