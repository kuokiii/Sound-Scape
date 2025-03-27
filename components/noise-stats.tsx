"use client"

import { Progress } from "@/components/ui/progress"
import { Volume, Volume1, Volume2, VolumeX } from "lucide-react"
import { useRealTimeData } from "./real-time-data-service"
import { useEffect, useState } from "react"

export default function NoiseStats() {
  const { data, loading } = useRealTimeData()
  const [noiseCategories, setNoiseCategories] = useState([
    {
      name: "Very Quiet",
      range: "<45 dB",
      percentage: 15,
      icon: <VolumeX className="h-4 w-4" />,
      color: "bg-green-500",
      description: "Parks, libraries, residential areas at night",
    },
    {
      name: "Quiet",
      range: "45-55 dB",
      percentage: 25,
      icon: <VolumeX className="h-4 w-4" />,
      color: "bg-emerald-500",
      description: "Residential areas, quiet streets, suburbs",
    },
    {
      name: "Moderate",
      range: "55-65 dB",
      percentage: 30,
      icon: <Volume className="h-4 w-4" />,
      color: "bg-blue-500",
      description: "Normal conversation, office noise, light traffic",
    },
    {
      name: "Loud",
      range: "65-75 dB",
      percentage: 20,
      icon: <Volume1 className="h-4 w-4" />,
      color: "bg-yellow-500",
      description: "Busy traffic, restaurants, urban centers",
    },
    {
      name: "Very Loud",
      range: ">75 dB",
      percentage: 10,
      icon: <Volume2 className="h-4 w-4" />,
      color: "bg-red-500",
      description: "Construction sites, major roads, events",
    },
  ])

  // Update noise categories based on real-time data
  useEffect(() => {
    if (!data) return

    // Calculate percentages based on area noise levels
    const totalAreas = data.areas.length
    const veryQuietCount = data.areas.filter((area) => area.value < 45).length
    const quietCount = data.areas.filter((area) => area.value >= 45 && area.value < 55).length
    const moderateCount = data.areas.filter((area) => area.value >= 55 && area.value < 65).length
    const loudCount = data.areas.filter((area) => area.value >= 65 && area.value < 75).length
    const veryLoudCount = data.areas.filter((area) => area.value >= 75).length

    const updatedCategories = [...noiseCategories]
    updatedCategories[0].percentage = Math.round((veryQuietCount / totalAreas) * 100)
    updatedCategories[1].percentage = Math.round((quietCount / totalAreas) * 100)
    updatedCategories[2].percentage = Math.round((moderateCount / totalAreas) * 100)
    updatedCategories[3].percentage = Math.round((loudCount / totalAreas) * 100)
    updatedCategories[4].percentage = Math.round((veryLoudCount / totalAreas) * 100)

    setNoiseCategories(updatedCategories)
  }, [data])

  return (
    <div className="space-y-4 relative">
      {noiseCategories.map((category) => (
        <div key={category.name} className="space-y-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-gray-500">{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-gray-500">{category.range}</span>
              <span className="text-sm font-medium">{category.percentage}%</span>
            </div>
          </div>
          <Progress value={category.percentage} className={category.color} />
          <p className="text-xs text-gray-500">{category.description}</p>
        </div>
      ))}

      <div className="pt-2 border-t border-gray-100 mt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Healthiest time:</span>
          <span className="font-medium">5:00 AM - 7:00 AM</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-gray-500">Noisiest time:</span>
          <span className="font-medium">5:00 PM - 7:00 PM</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-gray-500">Quietest day:</span>
          <span className="font-medium">Sunday</span>
        </div>
      </div>
    </div>
  )
}

