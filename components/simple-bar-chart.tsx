"use client"

import { useEffect, useRef } from "react"

interface BarChartProps {
  data: { name: string; value: number; color?: string }[]
  height?: number
  maxValue?: number
}

export default function SimpleBarChart({ data, height = 300, maxValue }: BarChartProps) {
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

    // Calculate dimensions
    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    const barWidth = chartWidth / data.length - 10

    // Find max value if not provided
    const max = maxValue || Math.max(...data.map((item) => item.value))

    // Draw axes
    ctx.strokeStyle = "#e5e7eb"
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, canvas.height - padding)
    ctx.lineTo(canvas.width - padding, canvas.height - padding)
    ctx.stroke()

    // Draw grid lines
    ctx.strokeStyle = "#f3f4f6"
    ctx.beginPath()
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i
      ctx.moveTo(padding, y)
      ctx.lineTo(canvas.width - padding, y)
    }
    ctx.stroke()

    // Draw y-axis labels
    ctx.fillStyle = "#6b7280"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "right"
    for (let i = 0; i <= 5; i++) {
      const value = max - (max / 5) * i
      const y = padding + (chartHeight / 5) * i
      ctx.fillText(value.toFixed(0), padding - 5, y + 4)
    }

    // Draw bars with animation
    data.forEach((item, index) => {
      const x = padding + index * (barWidth + 10)
      const fullBarHeight = (item.value / max) * chartHeight

      // Animate the bar height
      const animationDuration = 500 // ms
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / animationDuration, 1)
        const currentBarHeight = fullBarHeight * progress
        const y = canvas.height - padding - currentBarHeight

        // Clear previous bar
        ctx.clearRect(x, canvas.height - padding - chartHeight, barWidth, chartHeight)

        // Draw bar
        ctx.fillStyle = item.color || "#3b82f6"
        ctx.fillRect(x, y, barWidth, currentBarHeight)

        // Draw label
        ctx.fillStyle = "#6b7280"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(item.name, x + barWidth / 2, canvas.height - padding / 2)

        // Draw value
        if (progress === 1) {
          ctx.fillStyle = "#1f2937"
          ctx.fillText(item.value.toFixed(1), x + barWidth / 2, y - 5)
        }

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      animate()
    })
  }, [data, height, maxValue])

  return (
    <div className="w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

