"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Navigation, Clock, Volume2, VolumeX, Car, Bike, User } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"

interface EnhancedRoutePlannerProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export default function EnhancedRoutePlanner() {
  const [startLocation, setStartLocation] = useState("")
  const [endLocation, setEndLocation] = useState("")
  const [prioritizeQuiet, setPrioritizeQuiet] = useState(true)
  const [maxNoiseLevel, setMaxNoiseLevel] = useState([65])
  const [transportMode, setTransportMode] = useState("walking")
  const [avoidFeatures, setAvoidFeatures] = useState({
    construction: true,
    traffic: true,
    events: false,
  })
  const [timeOfTravel, setTimeOfTravel] = useState("now")
  const [isLoading, setIsLoading] = useState(false)
  const [routes, setRoutes] = useState<any[]>([])
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null)
  const { toast } = useToast()

  // Sample route data for demonstration
  const sampleRoutes = {
    walking: [
      {
        id: 1,
        name: "Quiet Park Route",
        duration: 18,
        distance: 1.2,
        noiseLevel: 55,
        mode: "walking",
        description: "A peaceful route through residential areas and parks",
        noiseExposure: {
          quiet: 70,
          moderate: 20,
          loud: 10,
        },
        steps: [
          "Head north on Main St for 0.3 miles",
          "Turn right onto Park Ave and continue for 0.4 miles",
          "Enter Central Park and follow the path for 0.3 miles",
          "Exit park and turn left onto Quiet Lane for 0.2 miles",
          "Arrive at your destination",
        ],
        image: "/images/quiet-route.jpg",
      },
      {
        id: 2,
        name: "Balanced Residential Route",
        duration: 15,
        distance: 1.0,
        noiseLevel: 65,
        mode: "walking",
        description: "A good balance between quiet and efficiency",
        noiseExposure: {
          quiet: 40,
          moderate: 50,
          loud: 10,
        },
        steps: [
          "Head north on Main St for 0.3 miles",
          "Turn right onto Market St and continue for 0.5 miles",
          "Turn left onto Side St for 0.2 miles",
          "Arrive at your destination",
        ],
        image: "/images/balanced-route.jpg",
      },
      {
        id: 3,
        name: "Fastest Direct Route",
        duration: 12,
        distance: 0.8,
        noiseLevel: 75,
        mode: "walking",
        description: "The fastest route, but with higher noise levels",
        noiseExposure: {
          quiet: 10,
          moderate: 30,
          loud: 60,
        },
        steps: [
          "Head north on Main St for 0.3 miles",
          "Turn right onto Broadway and continue for 0.5 miles",
          "Arrive at your destination",
        ],
        image: "/images/fast-route.jpg",
      },
    ],
    cycling: [
      {
        id: 4,
        name: "Scenic Bike Path",
        duration: 10,
        distance: 2.0,
        noiseLevel: 50,
        mode: "cycling",
        description: "A dedicated bike path through green spaces",
        noiseExposure: {
          quiet: 80,
          moderate: 15,
          loud: 5,
        },
        steps: [
          "Head east to the bike path entrance (0.2 miles)",
          "Follow the dedicated bike path for 1.5 miles",
          "Exit bike path and continue on Cedar St for 0.3 miles",
          "Arrive at your destination",
        ],
        image: "/images/bike-path.jpg",
      },
      {
        id: 5,
        name: "Mixed-Use Path",
        duration: 8,
        distance: 1.7,
        noiseLevel: 60,
        mode: "cycling",
        description: "A route combining bike lanes and quieter streets",
        noiseExposure: {
          quiet: 50,
          moderate: 40,
          loud: 10,
        },
        steps: [
          "Take the bike lane on Oak St heading north for 0.8 miles",
          "Turn right onto the neighborhood greenway for 0.6 miles",
          "Continue on Pine St bike lane for 0.3 miles",
          "Arrive at your destination",
        ],
        image: "/images/mixed-path.jpg",
      },
      {
        id: 6,
        name: "Direct Bike Route",
        duration: 6,
        distance: 1.5,
        noiseLevel: 70,
        mode: "cycling",
        description: "The fastest cycling route using main roads",
        noiseExposure: {
          quiet: 20,
          moderate: 30,
          loud: 50,
        },
        steps: [
          "Take Main St bike lane heading north for 0.7 miles",
          "Turn right onto Broadway bike lane for 0.8 miles",
          "Arrive at your destination",
        ],
        image: "/images/direct-bike.jpg",
      },
    ],
    driving: [
      {
        id: 7,
        name: "Scenic Drive",
        duration: 12,
        distance: 3.5,
        noiseLevel: 60,
        mode: "driving",
        description: "A longer but more peaceful driving route",
        noiseExposure: {
          quiet: 60,
          moderate: 30,
          loud: 10,
        },
        steps: [
          "Drive south on Main St for 0.5 miles",
          "Turn right onto Parkway Dr and continue for 1.5 miles",
          "Turn left onto Riverside Dr for 1.0 mile",
          "Turn right onto Cedar St for 0.5 miles",
          "Arrive at your destination",
        ],
        image: "/images/scenic-drive.jpg",
      },
      {
        id: 8,
        name: "Balanced Route",
        duration: 10,
        distance: 2.8,
        noiseLevel: 65,
        mode: "driving",
        description: "A good balance between quiet roads and efficiency",
        noiseExposure: {
          quiet: 40,
          moderate: 40,
          loud: 20,
        },
        steps: [
          "Drive north on Main St for 1.0 mile",
          "Turn right onto Elm St and continue for 1.2 miles",
          "Turn left onto Oak St for 0.6 miles",
          "Arrive at your destination",
        ],
        image: "/images/balanced-drive.jpg",
      },
      {
        id: 9,
        name: "Fastest Route",
        duration: 8,
        distance: 2.2,
        noiseLevel: 75,
        mode: "driving",
        description: "The fastest driving route using highways and main roads",
        noiseExposure: {
          quiet: 10,
          moderate: 30,
          loud: 60,
        },
        steps: [
          "Take the highway entrance ramp and drive for 1.0 mile",
          "Exit onto Main St and continue for 0.8 miles",
          "Turn right onto Broadway for 0.4 miles",
          "Arrive at your destination",
        ],
        image: "/images/fast-drive.jpg",
      },
    ],
  }

  const handleFindRoute = () => {
    if (!startLocation || !endLocation) {
      toast({
        title: "Missing Information",
        description: "Please enter both start and end locations",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      // Get routes for the selected transport mode
      let availableRoutes = [...sampleRoutes[transportMode]]

      // Filter routes based on preferences
      if (prioritizeQuiet) {
        availableRoutes = availableRoutes.filter((r) => r.noiseLevel <= maxNoiseLevel[0])
      }

      // Apply additional filters
      if (avoidFeatures.construction) {
        // In a real app, this would filter out routes with construction
      }

      if (avoidFeatures.traffic) {
        // In a real app, this would filter out routes with heavy traffic
      }

      if (avoidFeatures.events) {
        // In a real app, this would filter out routes near events
      }

      if (availableRoutes.length === 0) {
        toast({
          title: "No Routes Found",
          description: "No routes match your noise preferences. Try adjusting your settings.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Sort by priority (quiet or fast)
      availableRoutes.sort((a, b) => {
        if (prioritizeQuiet) {
          return a.noiseLevel - b.noiseLevel
        } else {
          return a.duration - b.duration
        }
      })

      setRoutes(availableRoutes)
      setSelectedRoute(availableRoutes[0].id)
      setIsLoading(false)

      toast({
        title: "Routes Found",
        description: `Found ${availableRoutes.length} routes from ${startLocation} to ${endLocation}`,
      })
    }, 1500)
  }

  const handleUseCurrentLocation = () => {
    // Mock location for development
    setStartLocation("Current Location")
    toast({
      title: "Location Set",
      description: "Using your current location as the starting point",
    })
  }

  // Get the selected route details
  const getSelectedRouteDetails = () => {
    if (selectedRoute === null || routes.length === 0) return null
    return routes.find((route) => route.id === selectedRoute)
  }

  const selectedRouteDetails = getSelectedRouteDetails()

  // Get transport mode icon
  const getTransportIcon = (mode) => {
    switch (mode) {
      case "walking":
        return <User className="h-4 w-4" />
      case "cycling":
        return <Bike className="h-4 w-4" />
      case "driving":
        return <Car className="h-4 w-4" />
      default:
        return <Navigation className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="start-location">Start Location</Label>
            <Button variant="outline" size="sm" className="h-7 px-2 text-xs" onClick={handleUseCurrentLocation}>
              Use Current
            </Button>
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              id="start-location"
              placeholder="Enter starting point"
              className="pl-9"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="end-location">End Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              id="end-location"
              placeholder="Enter destination"
              className="pl-9"
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="prioritize-quiet" checked={prioritizeQuiet} onCheckedChange={setPrioritizeQuiet} />
              <Label htmlFor="prioritize-quiet">Prioritize quiet routes</Label>
            </div>
            <span className="text-sm text-gray-500">
              {prioritizeQuiet ? "Quieter but may be longer" : "Faster but may be louder"}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="max-noise">Maximum noise level: {maxNoiseLevel[0]} dB</Label>
            </div>
            <div className="flex items-center gap-3">
              <VolumeX className="h-4 w-4 text-green-600" />
              <Slider
                id="max-noise"
                defaultValue={[65]}
                max={90}
                min={40}
                step={5}
                value={maxNoiseLevel}
                onValueChange={setMaxNoiseLevel}
                disabled={!prioritizeQuiet}
                className="flex-1"
              />
              <Volume2 className="h-4 w-4 text-red-600" />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Quiet (40dB)</span>
              <span>Moderate (65dB)</span>
              <span>Loud (90dB)</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Transportation Mode</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={transportMode === "walking" ? "default" : "outline"}
                size="sm"
                onClick={() => setTransportMode("walking")}
                className={transportMode === "walking" ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                <User className="h-4 w-4 mr-2" />
                Walking
              </Button>
              <Button
                variant={transportMode === "cycling" ? "default" : "outline"}
                size="sm"
                onClick={() => setTransportMode("cycling")}
                className={transportMode === "cycling" ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                <Bike className="h-4 w-4 mr-2" />
                Cycling
              </Button>
              <Button
                variant={transportMode === "driving" ? "default" : "outline"}
                size="sm"
                onClick={() => setTransportMode("driving")}
                className={transportMode === "driving" ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                <Car className="h-4 w-4 mr-2" />
                Driving
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Avoid</Label>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="avoid-construction"
                  checked={avoidFeatures.construction}
                  onCheckedChange={(checked) => setAvoidFeatures({ ...avoidFeatures, construction: checked })}
                />
                <Label htmlFor="avoid-construction" className="text-sm">
                  Construction
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="avoid-traffic"
                  checked={avoidFeatures.traffic}
                  onCheckedChange={(checked) => setAvoidFeatures({ ...avoidFeatures, traffic: checked })}
                />
                <Label htmlFor="avoid-traffic" className="text-sm">
                  Heavy Traffic
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="avoid-events"
                  checked={avoidFeatures.events}
                  onCheckedChange={(checked) => setAvoidFeatures({ ...avoidFeatures, events: checked })}
                />
                <Label htmlFor="avoid-events" className="text-sm">
                  Events
                </Label>
              </div>
            </div>
          </div>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleFindRoute} disabled={isLoading}>
          {isLoading ? (
            <>
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
              Finding Routes...
            </>
          ) : (
            <>
              <Navigation className="h-4 w-4 mr-2" />
              Find Quiet Route
            </>
          )}
        </Button>
      </div>

      {routes.length > 0 && (
        <div className="space-y-4">
          <Tabs
            defaultValue={selectedRoute?.toString()}
            onValueChange={(value) => setSelectedRoute(Number.parseInt(value))}
          >
            <TabsList className="w-full">
              {routes.map((route) => (
                <TabsTrigger key={route.id} value={route.id.toString()} className="flex-1">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                      {getTransportIcon(route.mode)}
                      <span>{route.name.split(" ")[0]}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs mt-1">
                      <span>{route.duration} min</span>
                      <span className="text-gray-400">|</span>
                      <span>{route.noiseLevel} dB</span>
                    </div>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            {routes.map((route) => (
              <TabsContent key={route.id} value={route.id.toString()}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">{route.name}</h3>
                        <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-full text-xs font-medium text-blue-700">
                          <VolumeX className="h-3 w-3" />
                          {route.noiseLevel} dB
                        </div>
                      </div>

                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{route.duration} min</span>
                        </div>
                        <div>
                          <span>{route.distance} miles</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600">{route.description}</p>

                      <div className="pt-2">
                        <h4 className="text-sm font-medium mb-2">Noise Exposure</h4>
                        <div className="h-4 w-full rounded-full overflow-hidden bg-gray-100 flex">
                          <div
                            className="bg-green-500 h-full"
                            style={{ width: `${route.noiseExposure.quiet}%` }}
                            title="Quiet areas"
                          ></div>
                          <div
                            className="bg-blue-500 h-full"
                            style={{ width: `${route.noiseExposure.moderate}%` }}
                            title="Moderate noise"
                          ></div>
                          <div
                            className="bg-red-500 h-full"
                            style={{ width: `${route.noiseExposure.loud}%` }}
                            title="Loud areas"
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{route.noiseExposure.quiet}% Quiet</span>
                          <span>{route.noiseExposure.moderate}% Moderate</span>
                          <span>{route.noiseExposure.loud}% Loud</span>
                        </div>
                      </div>

                      <div className="relative h-48 w-full rounded-md overflow-hidden">
                        <Image
                          src={route.image || "/placeholder.svg?height=200&width=400"}
                          alt={`Route map for ${route.name}`}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Directions:</h4>
                        <ol className="space-y-2 pl-5 text-sm list-decimal">
                          {route.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}
    </div>
  )
}

