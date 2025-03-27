"use client"

import { useEffect, useRef, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import { Button } from "@/components/ui/button"
import { Locate, ZoomIn, ZoomOut, AlertTriangle, Layers } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Add type declaration for google maps
declare global {
  interface Window {
    google: any
  }
}

interface EnhancedNoiseMapProps {
  center: { lat: number; lng: number }
  zoom: number
  onLocationSelect: (location: any) => void
  showQuietZones: boolean
  showNoiseComplaints: boolean
  timeOfDay: string
}

export default function EnhancedNoiseMap({
  center,
  zoom,
  onLocationSelect,
  showQuietZones,
  showNoiseComplaints,
  timeOfDay,
}: EnhancedNoiseMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [heatmap, setHeatmap] = useState<any>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [userMarker, setUserMarker] = useState<any>(null)
  const [quietZoneMarkers, setQuietZoneMarkers] = useState<any[]>([])
  const [complaintMarkers, setComplaintMarkers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [mapType, setMapType] = useState<string>("roadmap")
  const { toast } = useToast()
  const [googleLoaded, setGoogleLoaded] = useState(false)
  const [geolocationAttempted, setGeolocationAttempted] = useState(false)

  // Sample noise data for demonstration
  const sampleNoiseData = [
    { lat: 40.7128, lng: -74.006, level: 75 }, // NYC
    { lat: 40.7138, lng: -74.008, level: 82 },
    { lat: 40.7118, lng: -74.004, level: 68 },
    { lat: 40.7148, lng: -74.009, level: 55 },
    { lat: 40.7158, lng: -74.012, level: 45 },
    { lat: 40.7168, lng: -74.002, level: 62 },
    { lat: 40.7178, lng: -74.007, level: 78 },
    { lat: 40.7188, lng: -74.015, level: 50 },
    { lat: 40.7198, lng: -74.003, level: 65 },
    { lat: 40.7208, lng: -74.011, level: 72 },
    // Add more data points to create a more comprehensive heatmap
    { lat: 40.7135, lng: -74.01, level: 79 },
    { lat: 40.7145, lng: -74.005, level: 65 },
    { lat: 40.7155, lng: -74.015, level: 48 },
    { lat: 40.7165, lng: -74.007, level: 58 },
    { lat: 40.7175, lng: -74.003, level: 72 },
    { lat: 40.7185, lng: -74.012, level: 63 },
    { lat: 40.7195, lng: -74.008, level: 69 },
    { lat: 40.7205, lng: -74.004, level: 77 },
  ]

  // Sample quiet zones
  const sampleQuietZones = [
    {
      lat: 40.7158,
      lng: -74.012,
      name: "Central Park Area",
      level: 45,
      description: "A peaceful section of the park away from main paths",
    },
    {
      lat: 40.7188,
      lng: -74.015,
      name: "Riverside Library",
      level: 42,
      description: "Quiet garden space behind the main library",
    },
    {
      lat: 40.7228,
      lng: -74.018,
      name: "Botanical Gardens",
      level: 43,
      description: "Secluded area with natural sound barriers",
    },
  ]

  // Sample noise complaints
  const sampleNoiseComplaints = [
    {
      lat: 40.7138,
      lng: -74.008,
      type: "Construction",
      time: "08:30 AM",
      level: 82,
      description: "Construction noise outside permitted hours",
      status: "investigating",
    },
    {
      lat: 40.7178,
      lng: -74.007,
      type: "Nightlife",
      time: "11:45 PM",
      level: 78,
      description: "Loud music from restaurant",
      status: "pending",
    },
    {
      lat: 40.7208,
      lng: -74.011,
      type: "Traffic",
      time: "05:30 PM",
      level: 72,
      description: "Car alarm repeatedly going off",
      status: "resolved",
    },
  ]

  // Initialize Google Maps
  useEffect(() => {
    let isMounted = true
    let heatmapInterval: NodeJS.Timeout

    const initMap = async () => {
      if (!isMounted) return
      setIsLoading(true)

      try {
        const loader = new Loader({
          apiKey: "AIzaSyDc-yuZ_h6Yo-pj1YJkBWvb49HLf2P_yfE", // Using the provided Google Maps API key
          version: "weekly",
          libraries: ["visualization", "places"],
        })

        const google = await loader.load()
        setGoogleLoaded(true)

        if (!mapRef.current || !isMounted) return

        const mapInstance = new google.maps.Map(mapRef.current, {
          center,
          zoom,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          zoomControl: false,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
            },
            {
              featureType: "landscape",
              elementType: "geometry",
              stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.fill",
              stylers: [{ color: "#ffffff" }, { lightness: 17 }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }],
            },
            {
              featureType: "road.arterial",
              elementType: "geometry",
              stylers: [{ color: "#ffffff" }, { lightness: 18 }],
            },
            {
              featureType: "road.local",
              elementType: "geometry",
              stylers: [{ color: "#ffffff" }, { lightness: 16 }],
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#f2f2f2" }, { lightness: 19 }],
            },
          ],
        })

        // Create heatmap layer
        const heatmapData = sampleNoiseData.map((point) => {
          return {
            location: new google.maps.LatLng(point.lat, point.lng),
            weight: point.level / 100, // Normalize weight
          }
        })

        const heatmapLayer = new google.maps.visualization.HeatmapLayer({
          data: heatmapData,
          map: mapInstance,
          radius: 30,
          gradient: [
            "rgba(0, 255, 0, 0)",
            "rgba(0, 255, 0, 1)",
            "rgba(173, 255, 47, 1)",
            "rgba(255, 255, 0, 1)",
            "rgba(255, 165, 0, 1)",
            "rgba(255, 69, 0, 1)",
            "rgba(255, 0, 0, 1)",
          ],
        })

        // Add click event listener to map
        mapInstance.addListener("click", (event) => {
          if (event.latLng && isMounted) {
            const lat = event.latLng.lat()
            const lng = event.latLng.lng()

            // Find the closest noise data point
            let closestPoint = null
            let minDistance = Number.POSITIVE_INFINITY

            for (const point of sampleNoiseData) {
              const distance = Math.sqrt(Math.pow(point.lat - lat, 2) + Math.pow(point.lng - lng, 2))

              if (distance < minDistance) {
                minDistance = distance
                closestPoint = point
              }
            }

            if (closestPoint) {
              const noiseCategory =
                closestPoint.level < 45
                  ? "Very Quiet"
                  : closestPoint.level < 55
                    ? "Quiet"
                    : closestPoint.level < 65
                      ? "Moderate"
                      : closestPoint.level < 75
                        ? "Loud"
                        : "Very Loud"

              const healthImpact =
                closestPoint.level < 45
                  ? "No health impact"
                  : closestPoint.level < 55
                    ? "No significant health impact"
                    : closestPoint.level < 65
                      ? "Minimal health impact"
                      : closestPoint.level < 75
                        ? "Moderate health impact"
                        : "Significant health impact"

              onLocationSelect({
                lat,
                lng,
                noiseLevel: closestPoint.level,
                noiseCategory,
                healthImpact,
                address: "Sample Address", // In a real app, you would use reverse geocoding
                timestamp: new Date().toISOString(),
              })
            }
          }
        })

        // Add real-time updates to the heatmap
        const updateHeatmapData = () => {
          if (!isMounted) return

          const updatedData = sampleNoiseData.map((point) => {
            // Randomly adjust noise levels to simulate real-time changes
            const variation = Math.random() * 6 - 3 // Random value between -3 and 3
            const newLevel = Math.max(35, Math.min(95, point.level + variation))

            return {
              location: new google.maps.LatLng(point.lat, point.lng),
              weight: newLevel / 100,
            }
          })

          heatmapLayer.setData(updatedData)
        }

        // Update heatmap every 5 seconds
        heatmapInterval = setInterval(updateHeatmapData, 5000)

        setMap(mapInstance)
        setHeatmap(heatmapLayer)
        setIsLoading(false)

        // Don't automatically try to get user location on init
        // We'll let the user click the button instead
      } catch (error) {
        console.error("Error loading Google Maps:", error)
        if (isMounted) {
          setIsLoading(false)
          setLocationError("Failed to load Google Maps. Please try again later.")

          toast({
            title: "Map Error",
            description: "Failed to load Google Maps. Please try again later.",
            variant: "destructive",
          })
        }
      }
    }

    initMap()

    return () => {
      isMounted = false
      if (heatmapInterval) clearInterval(heatmapInterval)
    }
  }, [center, zoom, onLocationSelect, toast])

  // Update map when center or zoom changes
  useEffect(() => {
    if (map) {
      map.setCenter(center)
      map.setZoom(zoom)
    }
  }, [map, center, zoom])

  // Handle showing/hiding quiet zones
  useEffect(() => {
    if (!map || !window.google || !googleLoaded) return

    // Clear existing markers
    quietZoneMarkers.forEach((marker) => marker.setMap(null))

    if (showQuietZones) {
      // Create new markers
      const newMarkers = sampleQuietZones.map((zone) => {
        const marker = new window.google.maps.Marker({
          position: { lat: zone.lat, lng: zone.lng },
          map,
          title: `${zone.name} (${zone.level} dB)`,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: "#3b82f6",
            fillOpacity: 0.8,
            strokeColor: "#ffffff",
            strokeWeight: 2,
            scale: 10,
          },
        })

        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px;">
              <h3 style="font-weight: bold; margin-bottom: 4px;">${zone.name}</h3>
              <p style="color: #3b82f6; font-weight: bold; margin-bottom: 4px;">${zone.level} dB</p>
              <p style="font-size: 12px; color: #666;">${zone.description}</p>
            </div>
          `,
        })

        marker.addListener("click", () => {
          infoWindow.open(map, marker)
        })

        return marker
      })

      setQuietZoneMarkers(newMarkers)
    } else {
      setQuietZoneMarkers([])
    }
  }, [map, showQuietZones, googleLoaded])

  // Handle showing/hiding noise complaints
  useEffect(() => {
    if (!map || !window.google || !googleLoaded) return

    // Clear existing markers
    complaintMarkers.forEach((marker) => marker.setMap(null))

    if (showNoiseComplaints) {
      // Create new markers
      const newMarkers = sampleNoiseComplaints.map((complaint) => {
        const marker = new window.google.maps.Marker({
          position: { lat: complaint.lat, lng: complaint.lng },
          map,
          title: `${complaint.type} Noise (${complaint.level} dB)`,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: "#ef4444",
            fillOpacity: 0.8,
            strokeColor: "#ffffff",
            strokeWeight: 2,
            scale: 8,
          },
        })

        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px;">
              <h3 style="font-weight: bold; margin-bottom: 4px;">${complaint.type} Noise</h3>
              <p style="color: #ef4444; font-weight: bold; margin-bottom: 4px;">${complaint.level} dB</p>
              <p style="font-size: 12px; color: #666;">Reported at ${complaint.time}</p>
              <p style="font-size: 12px; color: #666;">${complaint.description}</p>
              <p style="font-size: 12px; color: #666;">Status: ${complaint.status}</p>
            </div>
          `,
        })

        marker.addListener("click", () => {
          infoWindow.open(map, marker)
        })

        return marker
      })

      setComplaintMarkers(newMarkers)
    } else {
      setComplaintMarkers([])
    }
  }, [map, showNoiseComplaints, googleLoaded])

  // Handle time of day changes
  useEffect(() => {
    if (!heatmap) return

    // In a real app, you would fetch different data based on timeOfDay
    // For demo purposes, we'll just adjust the heatmap opacity
    if (timeOfDay === "current") {
      heatmap.set("opacity", 0.8)
    } else if (timeOfDay === "forecast") {
      heatmap.set("opacity", 0.5) // Make it look more "predictive"
    }
  }, [heatmap, timeOfDay])

  // Get user's current location
  const getUserLocation = () => {
    setLocationError(null)
    setGeolocationAttempted(true)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(userPos)

          if (map) {
            map.setCenter(userPos)
            map.setZoom(15)

            // Remove previous user marker if exists
            if (userMarker) {
              userMarker.setMap(null)
            }

            if (window.google && googleLoaded) {
              // Add a marker for user's location
              const newMarker = new window.google.maps.Marker({
                position: userPos,
                map,
                title: "Your Location",
                icon: {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  fillColor: "#3b82f6",
                  fillOpacity: 1,
                  strokeColor: "#ffffff",
                  strokeWeight: 2,
                  scale: 8,
                },
                animation: window.google.maps.Animation.DROP,
              })

              setUserMarker(newMarker)

              // Add info window for user location
              const infoWindow = new window.google.maps.InfoWindow({
                content: `
                  <div style="padding: 8px;">
                    <h3 style="font-weight: bold; margin-bottom: 4px;">Your Location</h3>
                    <p style="font-size: 12px; color: #666;">Current noise levels will be displayed here</p>
                  </div>
                `,
              })

              newMarker.addListener("click", () => {
                infoWindow.open(map, newMarker)
              })
            }

            // Show success toast
            toast({
              title: "Location Found",
              description: "Your location has been detected and the map has been centered.",
              duration: 3000,
            })
          }
        },
        (error) => {
          console.error("Error getting user location:", error)
          setLocationError("Could not access your location. Please check your browser permissions.")

          // Show error toast
          toast({
            title: "Location Error",
            description: "Could not access your location. Please check your browser permissions.",
            variant: "destructive",
            duration: 5000,
          })
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
      )
    } else {
      setLocationError("Geolocation is not supported by this browser")

      // Show error toast
      toast({
        title: "Location Not Supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  // Toggle map type
  const toggleMapType = () => {
    if (!map) return

    const newMapType = mapType === "roadmap" ? "satellite" : "roadmap"
    map.setMapTypeId(newMapType)
    setMapType(newMapType)

    toast({
      title: "Map Type Changed",
      description: `Map view changed to ${newMapType === "roadmap" ? "street" : "satellite"} view`,
      duration: 2000,
    })
  }

  // Zoom controls
  const handleZoomIn = () => {
    if (map) {
      map.setZoom(map.getZoom() + 1)
    }
  }

  const handleZoomOut = () => {
    if (map) {
      map.setZoom(map.getZoom() - 1)
    }
  }

  return (
    <div className="relative h-full w-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-blue-600 font-medium">Loading map...</p>
          </div>
        </div>
      )}

      {locationError && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-50 text-red-600 px-4 py-2 rounded-md shadow-md flex items-center z-10">
          <AlertTriangle className="h-5 w-5 mr-2" />
          <span>{locationError}</span>
        </div>
      )}

      <div ref={mapRef} className="h-full w-full"></div>

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button
          variant="secondary"
          size="icon"
          className="h-10 w-10 rounded-full shadow-md bg-white hover:bg-blue-50"
          onClick={getUserLocation}
          title="Use my location"
        >
          <Locate className="h-5 w-5 text-blue-600" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-10 w-10 rounded-full shadow-md bg-white hover:bg-blue-50"
          onClick={handleZoomIn}
          title="Zoom in"
        >
          <ZoomIn className="h-5 w-5 text-blue-600" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-10 w-10 rounded-full shadow-md bg-white hover:bg-blue-50"
          onClick={handleZoomOut}
          title="Zoom out"
        >
          <ZoomOut className="h-5 w-5 text-blue-600" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-10 w-10 rounded-full shadow-md bg-white hover:bg-blue-50"
          onClick={toggleMapType}
          title={`Switch to ${mapType === "roadmap" ? "satellite" : "street"} view`}
        >
          <Layers className="h-5 w-5 text-blue-600" />
        </Button>
      </div>

      {/* Real-time indicator */}
      <div className="absolute top-4 left-4 bg-white/80 text-xs text-gray-700 px-2 py-1 rounded shadow-sm">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
          <span>Live data</span>
        </div>
      </div>
    </div>
  )
}

