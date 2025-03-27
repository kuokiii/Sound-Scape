"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Filter, VolumeX, Clock, Users } from "lucide-react"
import QuietZonesList from "@/components/quiet-zones-list"
import CitySelector from "@/components/city-selector"
import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function QuietZonesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container px-4 md:px-6 py-10 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quiet Zones</h1>
          <p className="text-muted-foreground mt-1">Discover peaceful areas in the city to relax, work, or study</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search quiet zones..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="flex-shrink-0" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Noise Level</label>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className="bg-green-100 text-green-800 cursor-pointer hover:bg-green-200">
                      <VolumeX className="h-3 w-3 mr-1" />
                      Very Quiet
                    </Badge>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200">
                      <VolumeX className="h-3 w-3 mr-1" />
                      Quiet
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Best Time</label>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                      <Clock className="h-3 w-3 mr-1" />
                      Morning
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                      <Clock className="h-3 w-3 mr-1" />
                      Afternoon
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                      <Clock className="h-3 w-3 mr-1" />
                      Evening
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Crowd Level</label>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                      <Users className="h-3 w-3 mr-1" />
                      Low
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                      <Users className="h-3 w-3 mr-1" />
                      Medium
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <Tabs defaultValue="list" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="city">City View</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <motion.div variants={container} initial="hidden" animate="show">
            <QuietZonesList />
          </motion.div>
        </TabsContent>
        <TabsContent value="city">
          <motion.div variants={container} initial="hidden" animate="show">
            <CitySelector />
          </motion.div>
        </TabsContent>
      </Tabs>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle>About Quiet Zones</CardTitle>
            <CardDescription>How we identify and maintain peaceful areas in the city</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                Quiet zones are identified through a combination of noise monitoring data, user reports, and
                environmental analysis. These areas typically maintain noise levels below 55 dB during most hours of the
                day.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2 flex items-center">
                    <VolumeX className="h-4 w-4 mr-2" />
                    Natural Barriers
                  </h3>
                  <p className="text-sm text-green-700">
                    Many quiet zones benefit from natural sound barriers like trees, hills, or water features that
                    absorb or block urban noise.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Strategic Location
                  </h3>
                  <p className="text-sm text-blue-700">
                    Quiet zones are often located away from major traffic routes, construction zones, and commercial
                    districts.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-purple-800 mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Community Maintained
                  </h3>
                  <p className="text-sm text-purple-700">
                    Local communities help maintain these spaces by reporting disturbances and participating in noise
                    awareness programs.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

