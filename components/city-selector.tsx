"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { MapPin, VolumeX, ArrowRight } from "lucide-react"

interface City {
  id: string
  name: string
  image: string
  position: { lat: number; lng: number }
  noiseLevel: number
  quietZones: number
}

export default function CitySelector() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [cityDetails, setCityDetails] = useState<boolean>(false)
  const { toast } = useToast()

  const cities: City[] = [
    {
      id: "nyc",
      name: "New York City",
      image: "/placeholder.svg?height=200&width=300&text=New+York+City",
      position: { lat: 40.7128, lng: -74.006 },
      noiseLevel: 76,
      quietZones: 28,
    },
    {
      id: "sf",
      name: "San Francisco",
      image: "/placeholder.svg?height=200&width=300&text=San+Francisco",
      position: { lat: 37.7749, lng: -122.4194 },
      noiseLevel: 68,
      quietZones: 35,
    },
    {
      id: "chicago",
      name: "Chicago",
      image: "/placeholder.svg?height=200&width=300&text=Chicago",
      position: { lat: 41.8781, lng: -87.6298 },
      noiseLevel: 72,
      quietZones: 22,
    },
    {
      id: "la",
      name: "Los Angeles",
      image: "/placeholder.svg?height=200&width=300&text=Los+Angeles",
      position: { lat: 34.0522, lng: -118.2437 },
      noiseLevel: 74,
      quietZones: 19,
    },
    {
      id: "boston",
      name: "Boston",
      image: "/placeholder.svg?height=200&width=300&text=Boston",
      position: { lat: 42.3601, lng: -71.0589 },
      noiseLevel: 70,
      quietZones: 31,
    },
  ]

  const handleCitySelect = (cityId: string) => {
    setSelectedCity(cityId)
    setCityDetails(true)

    const city = cities.find((c) => c.id === cityId)
    if (city) {
      toast({
        title: `${city.name} Selected`,
        description: `Showing noise data for ${city.name}`,
        duration: 3000,
      })
    }
  }

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast({
            title: "Location Found",
            description: "Using your current location",
            duration: 3000,
          })
          setSelectedCity("current")
          setCityDetails(true)
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Could not access your location. Please check your browser permissions.",
            variant: "destructive",
            duration: 5000,
          })
        },
      )
    } else {
      toast({
        title: "Location Not Supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  const selectedCityData = cities.find((city) => city.id === selectedCity)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cities.map((city, index) => (
          <div
            key={city.id}
            className="opacity-100 transform translate-y-0 transition-all duration-300"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <Card
              className={`overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                selectedCity === city.id ? "ring-2 ring-blue-600" : ""
              }`}
              onClick={() => handleCitySelect(city.id)}
            >
              <div className="relative h-36">
                <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                <Image
                  src={city.image || "/placeholder.svg"}
                  alt={city.name}
                  fill
                  className="object-cover z-10"
                  onLoad={(e) => {
                    // Remove the loading animation when image loads
                    const target = e.target as HTMLImageElement
                    if (target.parentElement) {
                      const loadingDiv = target.parentElement.querySelector("div")
                      if (loadingDiv) loadingDiv.classList.remove("animate-pulse")
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 z-30">
                  <h3 className="text-white font-medium">{city.name}</h3>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Avg. Noise:</span>
                  <span
                    className={`font-medium ${
                      city.noiseLevel > 75
                        ? "text-red-600"
                        : city.noiseLevel > 65
                          ? "text-orange-600"
                          : city.noiseLevel > 55
                            ? "text-yellow-600"
                            : "text-green-600"
                    }`}
                  >
                    {city.noiseLevel} dB
                  </span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">Quiet Zones:</span>
                  <span className="font-medium">{city.quietZones}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline" onClick={handleUseCurrentLocation} className="flex items-center">
          <MapPin className="h-4 w-4 mr-2" />
          Use My Current Location
        </Button>
      </div>

      {cityDetails && selectedCityData && (
        <div className="opacity-100 transform translate-y-0 transition-all duration-500">
          <Card className="overflow-hidden border-blue-100">
            <div className="relative h-48 md:h-64">
              <Image
                src={selectedCityData.image || "/placeholder.svg"}
                alt={selectedCityData.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-white text-2xl font-bold">{selectedCityData.name}</h2>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center bg-black/30 text-white px-3 py-1 rounded-full text-sm">
                    <VolumeX className="h-4 w-4 mr-1" />
                    {selectedCityData.noiseLevel} dB Avg.
                  </div>
                  <div className="flex items-center bg-black/30 text-white px-3 py-1 rounded-full text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedCityData.quietZones} Quiet Zones
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2">Noise Profile</h3>
                  <p className="text-sm text-blue-700 mb-3">
                    {selectedCityData.name} has an average noise level of {selectedCityData.noiseLevel} dB, which is
                    {selectedCityData.noiseLevel > 70 ? " higher than" : " comparable to"} most urban areas.
                  </p>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        selectedCityData.noiseLevel > 75
                          ? "bg-red-500"
                          : selectedCityData.noiseLevel > 65
                            ? "bg-orange-500"
                            : selectedCityData.noiseLevel > 55
                              ? "bg-yellow-500"
                              : "bg-green-500"
                      }`}
                      style={{ width: `${selectedCityData.noiseLevel}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2">Quiet Zones</h3>
                  <p className="text-sm text-green-700 mb-3">
                    Discover {selectedCityData.quietZones} peaceful locations throughout {selectedCityData.name} where
                    you can escape the urban noise.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-green-200 text-green-700 hover:bg-green-100"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    View All Quiet Zones
                  </Button>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-purple-800 mb-2">Noise Forecast</h3>
                  <p className="text-sm text-purple-700 mb-3">
                    Plan your week with our noise level predictions for different areas of {selectedCityData.name}.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-purple-200 text-purple-700 hover:bg-purple-100"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    View Forecast
                  </Button>
                </div>
              </div>
              <div className="mt-6">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Explore {selectedCityData.name} Quiet Zones
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

