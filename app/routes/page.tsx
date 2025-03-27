import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation, VolumeX, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import RoutePlanner from "@/components/route-planner"

export default function RoutesPage() {
  return (
    <main className="flex min-h-screen flex-col pt-16">
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Quiet Route Planner</h1>
            <p className="text-gray-600 max-w-2xl">
              Find the most peaceful path to your destination. Our route planner prioritizes quieter streets and paths
              for a more pleasant journey.
            </p>
          </div>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/map">View on Map</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Navigation className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Average Noise Reduction</h3>
                  <p className="text-2xl font-bold text-blue-600">18%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <VolumeX className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Quiet Routes Found</h3>
                  <p className="text-2xl font-bold text-blue-600">1,240+</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Best Time to Travel</h3>
                  <p className="text-2xl font-bold text-blue-600">10AM - 2PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Plan Your Quiet Route</CardTitle>
              </CardHeader>
              <CardContent>
                <RoutePlanner />
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Featured Quiet Route</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="aspect-video relative rounded-md overflow-hidden">
                    <Image
                      src="/images/quiet-route.jpg"
                      alt="Central Park to Museum Mile"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">Central Park to Museum Mile</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>Upper East Side, New York, NY</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">58 dB avg</div>
                    <div className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">1.8 mi</div>
                  </div>
                  <p className="text-gray-600">
                    A peaceful walking route that avoids major traffic arteries and passes through tree-lined streets.
                  </p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Use This Route</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Route Planning Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Avoid Rush Hours</p>
                      <p className="text-sm text-gray-600">
                        Plan your journey outside of 7-9AM and 4-6PM when possible.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Consider Side Streets</p>
                      <p className="text-sm text-gray-600">
                        Residential streets are often 10-15dB quieter than main roads.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Use Parks When Available</p>
                      <p className="text-sm text-gray-600">Parks and green spaces provide natural sound barriers.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      4
                    </div>
                    <div>
                      <p className="font-medium">Check Construction Updates</p>
                      <p className="text-sm text-gray-600">Our app updates routes based on temporary noise sources.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

