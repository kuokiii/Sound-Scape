"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Calendar, Clock, Info, Layers, MapPin, Volume2, VolumeX } from "lucide-react"
import EnhancedNoiseMap from "@/components/enhanced-noise-map"
import NoiseInfoCard from "@/components/noise-info-card"
import MapLegend from "@/components/map-legend"
import { useToast } from "@/components/ui/use-toast"
import { useMediaQuery } from "@/hooks/use-media-query"
import DynamicNoiseInsights from "@/components/dynamic-noise-insights"

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [showQuietZones, setShowQuietZones] = useState(true)
  const [showNoiseComplaints, setShowNoiseComplaints] = useState(false)
  const [timeOfDay, setTimeOfDay] = useState("current")
  const [showLegend, setShowLegend] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const { toast } = useToast()
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Default map center (New York City)
  const defaultCenter = { lat: 40.7128, lng: -74.006 }
  const defaultZoom = 14

  const handleLocationSelect = (location) => {
    setSelectedLocation(location)

    if (isMobile) {
      setShowControls(false)
    }
  }

  const toggleLegend = () => {
    setShowLegend(!showLegend)
  }

  const toggleControls = () => {
    setShowControls(!showControls)
  }

  return (
    <div className="relative h-[calc(100vh-4rem)] pt-16 flex flex-col md:flex-row">
      {/* Main Map Area */}
      <div className="relative flex-1 h-[60vh] md:h-full">
        <EnhancedNoiseMap
          center={defaultCenter}
          zoom={defaultZoom}
          onLocationSelect={handleLocationSelect}
          showQuietZones={showQuietZones}
          showNoiseComplaints={showNoiseComplaints}
          timeOfDay={timeOfDay}
        />

        {/* Mobile Toggle Controls Button */}
        <div className="md:hidden absolute top-4 left-4 z-20">
          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 rounded-full shadow-md bg-white hover:bg-blue-50"
            onClick={toggleControls}
          >
            <Layers className="h-5 w-5 text-blue-600" />
          </Button>
        </div>

        {/* Legend Toggle Button */}
        <div className="absolute top-4 right-4 z-20">
          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 rounded-full shadow-md bg-white hover:bg-blue-50"
            onClick={toggleLegend}
          >
            <Info className="h-5 w-5 text-blue-600" />
          </Button>
        </div>

        {/* Map Legend */}
        {showLegend && (
          <div className="absolute top-16 right-4 z-20 w-64 animate-in fade-in slide-in-from-top-5 duration-300">
            <MapLegend onClose={() => setShowLegend(false)} />
          </div>
        )}
      </div>

      {/* Controls Panel */}
      {(showControls || !isMobile) && (
        <div
          className={`absolute md:relative z-30 md:z-10 top-0 left-0 h-full w-[85vw] md:w-80 lg:w-96 bg-white shadow-lg md:shadow-none overflow-auto ${
            isMobile ? "pt-16 animate-in slide-in-from-left duration-300" : ""
          }`}
        >
          {isMobile && (
            <div className="absolute top-4 right-4">
              <Button variant="ghost" size="icon" onClick={toggleControls}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </Button>
            </div>
          )}

          <div className="p-4 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Noise Map</h2>
              <p className="text-gray-600 text-sm mb-4">
                Explore noise levels across the city. Click on any location to see detailed noise information.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Map Layers</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch id="show-quiet-zones" checked={showQuietZones} onCheckedChange={setShowQuietZones} />
                      <Label htmlFor="show-quiet-zones">Show Quiet Zones</Label>
                    </div>
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="show-complaints"
                        checked={showNoiseComplaints}
                        onCheckedChange={setShowNoiseComplaints}
                      />
                      <Label htmlFor="show-complaints">Show Noise Complaints</Label>
                    </div>
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Time of Day</h3>
                <Tabs defaultValue={timeOfDay} onValueChange={setTimeOfDay}>
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="current" className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Current
                    </TabsTrigger>
                    <TabsTrigger value="forecast" className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Forecast
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div>
                <h3 className="font-medium mb-2">Noise Level Filter</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <VolumeX className="h-4 w-4 text-green-600" />
                    <Slider defaultValue={[40, 90]} min={30} max={100} step={5} className="flex-1" />
                    <Volume2 className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Quiet (30dB)</span>
                    <span>Moderate (65dB)</span>
                    <span>Loud (100dB)</span>
                  </div>
                </div>
              </div>

              <Card className="border-blue-100 shadow-sm">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Noise Insights</h3>
                  <DynamicNoiseInsights />
                </CardContent>
              </Card>

              {selectedLocation && (
                <Card className="mt-6 border-blue-100 shadow-sm">
                  <CardContent className="p-0">
                    <div className="p-4 bg-blue-50 flex justify-between items-center">
                      <h3 className="font-medium text-blue-800">Selected Location</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-blue-800"
                        onClick={() => setSelectedLocation(null)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </Button>
                    </div>
                    <NoiseInfoCard location={selectedLocation} />
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Selected Location Panel */}
      {isMobile && selectedLocation && !showControls && (
        <div className="absolute bottom-0 left-0 right-0 z-20 max-h-[60vh] overflow-auto rounded-t-xl animate-in slide-in-from-bottom duration-300">
          <div className="bg-white shadow-lg">
            <div className="p-4 bg-blue-50 flex justify-between items-center">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                <h3 className="font-medium text-blue-800">Location Details</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-blue-800"
                onClick={() => setSelectedLocation(null)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </Button>
            </div>
            <NoiseInfoCard location={selectedLocation} />
          </div>
        </div>
      )}
    </div>
  )
}

