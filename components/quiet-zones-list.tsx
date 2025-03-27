"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { VolumeX, MapPin, Navigation, Users, Clock, Coffee, Wifi, Power } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import Image from "next/image"

// Sample quiet zones data
const quietZonesData = [
  {
    id: 1,
    name: "Central Park Reading Area",
    description: "A secluded reading area surrounded by trees that block city noise",
    noiseLevel: 42,
    distance: 0.8,
    crowdLevel: "Low",
    bestTimes: "Weekday mornings, Sunday afternoons",
    amenities: ["Benches", "Shade", "Water fountain"],
    image: "/images/central-park.jpg",
  },
  {
    id: 2,
    name: "Riverside Library Garden",
    description: "Peaceful garden behind the main library with sound-dampening walls",
    noiseLevel: 38,
    distance: 1.2,
    crowdLevel: "Medium",
    bestTimes: "Weekday afternoons",
    amenities: ["Tables", "Wi-Fi", "Coffee shop nearby"],
    image: "/images/library-garden.jpg",
  },
  {
    id: 3,
    name: "Museum Courtyard",
    description: "Inner courtyard of the art museum with excellent acoustics",
    noiseLevel: 45,
    distance: 1.5,
    crowdLevel: "Low",
    bestTimes: "Tuesday-Thursday all day",
    amenities: ["Seating", "Art installations", "Café"],
    image: "/images/museum-courtyard.jpg",
  },
  {
    id: 4,
    name: "Botanical Garden Meditation Space",
    description: "Dedicated quiet zone within the botanical gardens",
    noiseLevel: 35,
    distance: 2.3,
    crowdLevel: "Very Low",
    bestTimes: "Early mornings, late afternoons",
    amenities: ["Meditation cushions", "Water features", "Guided sessions"],
    image: "/images/botanical-garden.jpg",
  },
  {
    id: 5,
    name: "University Campus Grove",
    description: "Tree-lined area on campus designed for studying",
    noiseLevel: 48,
    distance: 1.7,
    crowdLevel: "Medium",
    bestTimes: "Weekends, evening hours",
    amenities: ["Study tables", "Power outlets", "Wi-Fi"],
    image: "/images/campus-grove.jpg",
  },
]

// Get icon for amenity
const getAmenityIcon = (amenity: string) => {
  const lowerAmenity = amenity.toLowerCase()
  if (lowerAmenity.includes("coffee") || lowerAmenity.includes("café")) return <Coffee className="h-3 w-3" />
  if (lowerAmenity.includes("wi-fi")) return <Wifi className="h-3 w-3" />
  if (lowerAmenity.includes("power")) return <Power className="h-3 w-3" />
  return null
}

export default function QuietZonesList() {
  const [selectedZone, setSelectedZone] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState("noise") // noise, distance
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const { toast } = useToast()

  // Sort zones based on selected criteria
  const sortedZones = [...quietZonesData].sort((a, b) => {
    if (sortBy === "noise") {
      return a.noiseLevel - b.noiseLevel
    } else {
      return a.distance - b.distance
    }
  })

  const handleViewOnMap = (zone) => {
    // In a real app, this would center the map on the zone
    toast({
      title: "Zone Located",
      description: `${zone.name} has been located on the map`,
    })
  }

  const handleGetDirections = (zone) => {
    // In a real app, this would open the route planner with this destination
    toast({
      title: "Directions Ready",
      description: `Directions to ${zone.name} have been prepared`,
    })
  }

  const toggleCardExpansion = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <Button
            variant={sortBy === "noise" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("noise")}
            className={sortBy === "noise" ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            <VolumeX className="h-4 w-4 mr-1" />
            Sort by Quietest
          </Button>
          <Button
            variant={sortBy === "distance" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("distance")}
            className={sortBy === "distance" ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            <MapPin className="h-4 w-4 mr-1" />
            Sort by Closest
          </Button>
        </div>
      </div>

      <motion.div
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {sortedZones.map((zone, index) => (
          <motion.div
            key={zone.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <Card
              className={`overflow-hidden transition-all duration-300 ${
                expandedCard === zone.id ? "shadow-md" : "hover:shadow-md"
              }`}
            >
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div
                    className="w-full sm:w-24 h-24 bg-gray-100 flex-shrink-0 cursor-pointer relative"
                    onClick={() => toggleCardExpansion(zone.id)}
                  >
                    <Image
                      src={zone.image || "/placeholder.svg?height=100&width=100"}
                      alt={zone.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3 flex-1">
                    <div className="flex justify-between items-start">
                      <h3
                        className="font-medium text-base cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() => toggleCardExpansion(zone.id)}
                      >
                        {zone.name}
                      </h3>
                      <Badge variant="outline" className="bg-green-100 text-green-800 flex items-center gap-1">
                        <VolumeX className="h-3 w-3" />
                        {zone.noiseLevel} dB
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{zone.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {zone.distance} mi
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {zone.crowdLevel}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Best: {zone.bestTimes.split(",")[0]}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => handleViewOnMap(zone)}
                      >
                        <MapPin className="h-3 w-3 mr-1" />
                        View on Map
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => handleGetDirections(zone)}
                      >
                        <Navigation className="h-3 w-3 mr-1" />
                        Directions
                      </Button>
                    </div>
                  </div>
                </div>

                {expandedCard === zone.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-100 p-3"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Best Times to Visit</h4>
                        <div className="space-y-1">
                          {zone.bestTimes.split(",").map((time, i) => (
                            <div key={i} className="flex items-center text-xs">
                              <Clock className="h-3 w-3 text-blue-500 mr-2" />
                              <span>{time.trim()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Amenities</h4>
                        <div className="flex flex-wrap gap-2">
                          {zone.amenities.map((amenity, i) => (
                            <Badge key={i} variant="outline" className="flex items-center gap-1 bg-gray-50">
                              {getAmenityIcon(amenity)}
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

