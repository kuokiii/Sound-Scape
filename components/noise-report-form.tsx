"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Upload, Check, Volume2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function NoiseReportForm() {
  const [noiseType, setNoiseType] = useState("")
  const [noiseLevel, setNoiseLevel] = useState([70])
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!noiseType || !description || !location) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      toast({
        title: "Report Submitted",
        description: "Thank you for your noise report. City officials have been notified.",
      })
    }, 1500)
  }

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would use reverse geocoding to get the address
          setLocation("Current Location")
          toast({
            title: "Location Set",
            description: "Using your current location for the report",
          })
        },
        (error) => {
          console.error("Error getting location:", error)
          toast({
            title: "Location Error",
            description: "Could not access your location. Please check your browser permissions.",
            variant: "destructive",
          })
        },
      )
    } else {
      toast({
        title: "Not Supported",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      })
    }
  }

  const handleReset = () => {
    setNoiseType("")
    setNoiseLevel([70])
    setDescription("")
    setLocation("")
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return (
      <Card className="border-green-100">
        <CardContent className="pt-6 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-medium text-green-700 mb-2">Report Submitted</h3>
          <p className="text-gray-600 mb-4">
            Thank you for helping to make your community quieter. Your report has been sent to city officials.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Report ID: NR-
            {Math.floor(Math.random() * 10000)
              .toString()
              .padStart(4, "0")}
          </p>
          <Button onClick={handleReset} className="bg-green-600 hover:bg-green-700">
            Submit Another Report
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="noise-type">Type of Noise</Label>
        <RadioGroup id="noise-type" value={noiseType} onValueChange={setNoiseType}>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="construction" id="construction" />
              <Label htmlFor="construction" className="text-sm">
                Construction
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="traffic" id="traffic" />
              <Label htmlFor="traffic" className="text-sm">
                Traffic
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="music" id="music" />
              <Label htmlFor="music" className="text-sm">
                Music/Party
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="industrial" id="industrial" />
              <Label htmlFor="industrial" className="text-sm">
                Industrial
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="alarm" id="alarm" />
              <Label htmlFor="alarm" className="text-sm">
                Alarm/Siren
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other" className="text-sm">
                Other
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="noise-level">Estimated Noise Level: {noiseLevel[0]} dB</Label>
        </div>
        <div className="flex items-center gap-3">
          <Volume2 className="h-4 w-4 text-gray-500" />
          <Slider
            id="noise-level"
            defaultValue={[70]}
            max={100}
            min={40}
            step={5}
            value={noiseLevel}
            onValueChange={setNoiseLevel}
            className="flex-1"
          />
          <Volume2 className="h-5 w-5 text-red-500" />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Moderate (40dB)</span>
          <span>Very Loud (70dB)</span>
          <span>Extreme (100dB)</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Please describe the noise issue in detail..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="location">Location</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={handleUseCurrentLocation}
          >
            Use Current
          </Button>
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            id="location"
            placeholder="Enter the address or location of the noise"
            className="pl-9"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Evidence (Optional)</Label>
        <div className="border-2 border-dashed border-gray-200 rounded-md p-4 text-center">
          <Upload className="h-6 w-6 mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">Drag and drop audio or photo files, or click to browse</p>
          <Button type="button" variant="outline" size="sm" className="mt-2">
            Upload Files
          </Button>
        </div>
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
            Submitting Report...
          </>
        ) : (
          "Submit Noise Report"
        )}
      </Button>
    </form>
  )
}

