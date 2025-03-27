"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Download } from "lucide-react"
import { SimplifiedDataProvider, useNoiseData } from "@/components/simplified-data-provider"
import SimpleBarChart from "@/components/simple-bar-chart"
import SimplePieChart from "@/components/simple-pie-chart"
import { useState, useEffect } from "react"
import DynamicNoiseInsights from "@/components/dynamic-noise-insights"

// Update the DashboardContent component to better handle real-time updates
function DashboardContent() {
  const { data, loading } = useNoiseData()
  const [refreshKey, setRefreshKey] = useState(0)

  // Force re-render when data changes
  useEffect(() => {
    if (data) {
      setRefreshKey((prev) => prev + 1)
    }
  }, [data])

  if (loading || !data) {
    return (
      <div className="container mx-auto p-8 pt-24">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-2">Loading dashboard...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8 pt-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Noise Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor and analyze urban noise levels in your area</p>
          <p className="text-xs text-muted-foreground mt-1">
            Last updated: {new Date(data.timestamp).toLocaleTimeString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard title="Average Noise Level" value={`${data.averageNoise.toFixed(1)} dB`} />
        <StatCard title="Quiet Zones" value={data.quietZones.toString()} />
        <StatCard title="Noise Complaints" value={data.complaints.toString()} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Noise Distribution</CardTitle>
            <CardDescription>Distribution of noise levels across different categories</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <SimplePieChart key={`pie-${refreshKey}`} data={data.noiseDistribution} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Noise by Location</CardTitle>
            <CardDescription>Average noise levels across different areas</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <SimpleBarChart
              key={`bar-${refreshKey}`}
              data={data.noiseByLocation.map((item) => ({
                ...item,
                color: getColorForNoiseLevel(item.value),
              }))}
              maxValue={100}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Noise Levels by Time</CardTitle>
          <CardDescription>How noise levels change throughout the day</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <SimpleBarChart
            key={`time-${refreshKey}`}
            data={data.noiseByTime.map((item) => ({
              ...item,
              name: item.time,
              color: getColorForNoiseLevel(item.value),
            }))}
            maxValue={100}
          />
        </CardContent>
      </Card>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Noise Insights</CardTitle>
            <CardDescription>Key findings and recommendations based on noise data</CardDescription>
          </CardHeader>
          <CardContent>
            <DynamicNoiseInsights />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <SimplifiedDataProvider>
      <DashboardContent />
    </SimplifiedDataProvider>
  )
}

function StatCard({ title, value }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">{title}</span>
          <span className="text-2xl font-bold mt-1">{value}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function getColorForNoiseLevel(level: number): string {
  if (level < 45) return "#22c55e" // Very quiet - green
  if (level < 55) return "#84cc16" // Quiet - light green
  if (level < 65) return "#facc15" // Moderate - yellow
  if (level < 75) return "#f97316" // Loud - orange
  return "#ef4444" // Very loud - red
}

