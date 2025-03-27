"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import AnimatedCounter from "./animated-counter"

export default function CounterSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const targetPlasticWaste = 8000000
  const targetCarbonEmissions = 500000
  const targetLandfillWaste = 12000000

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container px-4 md:px-6" ref={ref}>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Environmental Cost</h2>
          <p className="text-lg text-gray-300">
            Every year, e-commerce packaging contributes significantly to global waste and emissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-xl p-8 text-center hover:shadow-lg hover:shadow-green-900/20 transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl font-bold text-green-400 mb-2">
              <AnimatedCounter value={targetPlasticWaste} suffix="+" />
            </div>
            <p className="text-xl mb-2">Tons of Plastic Waste</p>
            <p className="text-gray-400 text-sm">Generated annually from e-commerce packaging worldwide</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 text-center hover:shadow-lg hover:shadow-green-900/20 transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl font-bold text-green-400 mb-2">
              <AnimatedCounter value={targetCarbonEmissions} suffix="+" />
            </div>
            <p className="text-xl mb-2">Tons of CO₂</p>
            <p className="text-gray-400 text-sm">Emitted during production and disposal of packaging</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 text-center hover:shadow-lg hover:shadow-green-900/20 transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl font-bold text-green-400 mb-2">
              <AnimatedCounter value={targetLandfillWaste} suffix="+" />
            </div>
            <p className="text-xl mb-2">Tons of Landfill Waste</p>
            <p className="text-gray-400 text-sm">Non-recyclable packaging ending up in landfills</p>
          </div>
        </div>
      </div>
    </section>
  )
}

