"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface MapLegendProps {
  onClose: () => void
}

export default function MapLegend({ onClose }: MapLegendProps) {
  const noiseCategories = [
    { label: "Very Quiet", range: "< 45 dB", color: "#10b981", examples: "Library, quiet park" },
    { label: "Quiet", range: "45-55 dB", color: "#34d399", examples: "Quiet residential area" },
    { label: "Moderate", range: "55-65 dB", color: "#3b82f6", examples: "Normal conversation" },
    { label: "Loud", range: "65-75 dB", color: "#f59e0b", examples: "Busy traffic, restaurant" },
    { label: "Very Loud", range: "> 75 dB", color: "#ef4444", examples: "Construction, concert" },
  ]

  const mapSymbols = [
    { label: "Quiet Zone", color: "#3b82f6", shape: "circle", description: "Areas with consistently low noise levels" },
    { label: "Noise Complaint", color: "#ef4444", shape: "circle", description: "Reported noise disturbances" },
    { label: "Your Location", color: "#3b82f6", shape: "pulsing-circle", description: "Your current position" },
  ]

  return (
    <Card className="shadow-lg border-gray-200 overflow-hidden">
      <CardContent className="p-0">
        <div className="p-3 bg-blue-50 flex justify-between items-center">
          <h3 className="font-medium text-blue-800">Map Legend</h3>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Noise Levels</h4>
            <div className="space-y-2">
              {noiseCategories.map((category, index) => (
                <motion.div
                  key={category.label}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: category.color }}></div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{category.label}</span>
                      <span className="text-xs text-gray-500">{category.range}</span>
                    </div>
                    <p className="text-xs text-gray-600">{category.examples}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Map Symbols</h4>
            <div className="space-y-2">
              {mapSymbols.map((symbol, index) => (
                <motion.div
                  key={symbol.label}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                >
                  <div className="relative">
                    <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: symbol.color }}></div>
                    {symbol.shape === "pulsing-circle" && (
                      <div
                        className="absolute inset-0 rounded-full animate-ping opacity-75"
                        style={{ backgroundColor: symbol.color }}
                      ></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium">{symbol.label}</span>
                    <p className="text-xs text-gray-600">{symbol.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="pt-2 text-xs text-gray-500">
            <p>Data is updated every 15 minutes. Noise levels are measured in decibels (dB).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

