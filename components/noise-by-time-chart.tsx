"use client"

import { useEffect, useRef } from "react"
import { useRealTimeData } from "./real-time-data-service"

export default function NoiseByTimeChart({ dateRange, location }: { dateRange?: string; location?: string }) {
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
    const chartWidth = canvas.width - 80
    const chartHeight = canvas.height - 80
    const startX = 60
    const startY = 40
    const maxValue = 100 // Maximum dB value

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw title
    ctx.font = "16px Inter, sans-serif"
    ctx.fillStyle = "#1f2937"
    ctx.textAlign = "center"
    ctx.fillText("Noise Levels Throughout the Day", canvas.width / 2, 25)

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
    for (let i = 0; i <= maxValue; i += 20) {
      const y = startY + chartHeight - (i / maxValue) * chartHeight
      ctx.fillText(i.toString() + " dB", startX - 10, y + 5)

      // Draw horizontal grid lines
      ctx.beginPath()
      ctx.moveTo(startX, y)
      ctx.lineTo(startX + chartWidth, y)
      ctx.strokeStyle = "#f3f4f6"
      ctx.stroke()
    }

    // Draw X-axis labels (every 3 hours to avoid crowding)
    ctx.textAlign = "center"
    for (let i = 0; i < data.hourlyData.length; i += 3) {
      const x = startX + (i / (data.hourlyData.length - 1)) * chartWidth
      ctx.fillText(data.hourlyData[i].hour, x, startY + chartHeight + 20)
    }

    // Draw line chart
    ctx.beginPath()
    data.hourlyData.forEach((point, index) => {
      const x = startX + (index / (data.hourlyData.length - 1)) * chartWidth
      const y = startY + chartHeight - (point.value / maxValue) * chartHeight

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 3
    ctx.stroke()

    // Fill area under the line
    ctx.lineTo(startX + chartWidth, startY + chartHeight)
    ctx.lineTo(startX, startY + chartHeight)
    ctx.closePath()
    ctx.fillStyle = "rgba(59, 130, 246, 0.1)"
    ctx.fill()

    // Draw data points
    data.hourlyData.forEach((point, index) => {
      const x = startX + (index / (data.hourlyData.length - 1)) * chartWidth
      const y = startY + chartHeight - (point.value / maxValue) * chartHeight

      // Determine point color based on noise level
      let pointColor
      if (point.value < 45)
        pointColor = "#10b981" // green
      else if (point.value < 55)
        pointColor = "#3b82f6" // blue
      else if (point.value < 65)
        pointColor = "#f59e0b" // amber
      else pointColor = "#ef4444" // red

      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = pointColor
      ctx.fill()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()
    })

    // Highlight current hour
    const currentHour = new Date().getHours()
    const hourString =
      currentHour === 0
        ? "12 AM"
        : currentHour < 12
          ? `${currentHour} AM`
          : currentHour === 12
            ? "12 PM"
            : `${currentHour - 12} PM`

    const currentHourIndex = data.hourlyData.findIndex((item) => item.hour === hourString)

    if (currentHourIndex !== -1) {
      const x = startX + (currentHourIndex / (data.hourlyData.length - 1)) * chartWidth
      const y = startY + chartHeight - (data.hourlyData[currentHourIndex].value / maxValue) * chartHeight

      // Draw highlight circle
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(59, 130, 246, 0.3)"
      ctx.fill()

      // Draw "Now" label
      ctx.font = "10px Inter, sans-serif"
      ctx.fillStyle = "#3b82f6"
      ctx.textAlign = "center"
      ctx.fillText("Now", x, y - 15)
    }

    // Draw noise level zones
    const dangerZoneY = startY + chartHeight - (65 / maxValue) * chartHeight
    const warningZoneY = startY + chartHeight - (55 / maxValue) * chartHeight
    const safeZoneY = startY + chartHeight - (45 / maxValue) * chartHeight

    // Draw zone labels
    ctx.textAlign = "left"
    ctx.font = "12px Inter, sans-serif"
    ctx.fillStyle = "#ef4444"
    ctx.fillText("Loud", startX + chartWidth + 5, (dangerZoneY + startY + chartHeight) / 2)
    ctx.fillStyle = "#f59e0b"
    ctx.fillText("Moderate", startX + chartWidth + 5, (warningZoneY + dangerZoneY) / 2)
    ctx.fillStyle = "#3b82f6"
    ctx.fillText("Quiet", startX + chartWidth + 5, (safeZoneY + warningZoneY) / 2)
    ctx.fillStyle = "#10b981"
    ctx.fillText("Very Quiet", startX + chartWidth + 5, (safeZoneY + startY) / 2)

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

