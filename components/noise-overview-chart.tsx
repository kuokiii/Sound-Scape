"use client"

import { useEffect, useRef } from "react"
import { useRealTimeData } from "./real-time-data-service"

export default function NoiseOverviewChart({ dateRange, location }: { dateRange?: string; location?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { data, loading } = useRealTimeData()

  useEffect(() => {
    if (!canvasRef.current || !data) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const canvas = canvasRef.current
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Chart dimensions
    const chartWidth = canvas.width - 100
    const chartHeight = canvas.height - 80
    const barWidth = chartWidth / data.areas.length - 20
    const startX = 70
    const startY = 40

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw title
    ctx.font = "16px Inter, sans-serif"
    ctx.fillStyle = "#1f2937"
    ctx.textAlign = "center"
    ctx.fillText("Average Noise Levels by Area", canvas.width / 2, 25)

    // Draw Y-axis
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(startX, startY + chartHeight)
    ctx.strokeStyle = "#d1d5db"
    ctx.stroke()

    // Draw X-axis
    ctx.beginPath()
    ctx.moveTo(startX, startY + chartHeight)
    ctx.lineTo(startX + chartWidth, startY + chartHeight)
    ctx.stroke()

    // Draw Y-axis labels
    ctx.font = "12px Inter, sans-serif"
    ctx.fillStyle = "#6b7280"
    ctx.textAlign = "right"
    for (let i = 0; i <= 100; i += 20) {
      const y = startY + chartHeight - (i / 100) * chartHeight
      ctx.fillText(i.toString(), startX - 10, y + 5)

      // Draw horizontal grid lines
      ctx.beginPath()
      ctx.moveTo(startX, y)
      ctx.lineTo(startX + chartWidth, y)
      ctx.strokeStyle = "#f3f4f6"
      ctx.stroke()
    }

    // Draw bars and labels
    data.areas.forEach((item, index) => {
      const x = startX + 10 + index * (barWidth + 20)
      const barHeight = (item.value / 100) * chartHeight
      const y = startY + chartHeight - barHeight

      // Draw bar
      ctx.fillStyle = item.color
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw value on top of bar
      ctx.font = "12px Inter, sans-serif"
      ctx.fillStyle = "#1f2937"
      ctx.textAlign = "center"
      ctx.fillText(Math.round(item.value).toString(), x + barWidth / 2, y - 5)

      // Draw label below bar
      ctx.fillStyle = "#6b7280"
      ctx.save()
      ctx.translate(x + barWidth / 2, startY + chartHeight + 15)
      ctx.rotate(-Math.PI / 4)
      ctx.textAlign = "right"
      ctx.fillText(item.name, 0, 0)
      ctx.restore()
    })

    // Draw legend
    const legendX = canvas.width - 180
    const legendY = 60
    const legendItems = [
      { label: "Very Quiet (<45 dB)", color: "#10b981" },
      { label: "Quiet (45-55 dB)", color: "#3b82f6" },
      { label: "Moderate (55-65 dB)", color: "#f59e0b" },
      { label: "Loud (65+ dB)", color: "#ef4444" },
    ]

    legendItems.forEach((item, index) => {
      const y = legendY + index * 20

      // Draw color box
      ctx.fillStyle = item.color
      ctx.fillRect(legendX, y, 12, 12)

      // Draw label
      ctx.font = "12px Inter, sans-serif"
      ctx.fillStyle = "#6b7280"
      ctx.textAlign = "left"
      ctx.fillText(item.label, legendX + 20, y + 10)
    })

    // Draw last updated timestamp
    const timestamp = new Date(data.timestamp).toLocaleTimeString()
    ctx.font = "10px Inter, sans-serif"
    ctx.fillStyle = "#6b7280"
    ctx.textAlign = "right"
    ctx.fillText(`Last updated: ${timestamp}`, canvas.width - 10, canvas.height - 5)
  }, [data, dateRange, location])

  return (
    <div className="w-full h-full relative">
      <canvas ref={canvasRef} className="w-full h-full" />
      {loading && (
        <div className="absolute top-2 right-2 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded flex items-center">
          <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse mr-1"></div>
          <span>Updating...</span>
        </div>
      )}
    </div>
  )
}

