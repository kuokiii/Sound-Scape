"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, Package, RecycleIcon, Truck, User } from "lucide-react"
import { motion } from "framer-motion"
import EnhancedCTAButton from "./enhanced-cta-button"

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1)

  const steps = [
    {
      id: 1,
      title: "Sustainable Packaging",
      description: "E-commerce businesses order GreenBox packaging made from biodegradable materials.",
      icon: <Package className="h-6 w-6" />,
      details:
        "Our packaging is made from cornstarch, sugarcane fiber, and recycled paper, ensuring complete biodegradability while maintaining durability for shipping.",
      image:
        "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Customer Receives Order",
      description: "Customers receive their products in GreenBox packaging with a unique QR code.",
      icon: <User className="h-6 w-6" />,
      details:
        "Each GreenBox has a unique QR code that links to our platform, allowing customers to track the package's environmental impact and return options.",
      image:
        "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "Easy Return Process",
      description: "Customers scan the QR code to find return locations or schedule a pickup.",
      icon: <Truck className="h-6 w-6" />,
      details:
        "Our app shows nearby drop-off locations or allows customers to schedule a convenient pickup time for their used packaging.",
      image:
        "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      title: "Circular Economy",
      description: "Returned packaging is cleaned, reused, or properly recycled, completing the loop.",
      icon: <RecycleIcon className="h-6 w-6" />,
      details:
        "Packages are inspected, sanitized, and prepared for reuse. After multiple cycles, they're broken down into raw materials for new packaging.",
      image:
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]

  return (
    <section className="py-20 bg-green-50">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How GreenBox Works</h2>
          <p className="text-lg text-gray-600">Our circular economy model creates a sustainable packaging ecosystem.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl order-2 lg:order-1">
            <Image
              src={steps[activeStep - 1].image || "/placeholder.svg"}
              alt={`Step ${activeStep}: ${steps[activeStep - 1].title}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">
                  Step {activeStep}: {steps[activeStep - 1].title}
                </h3>
                <p>{steps[activeStep - 1].description}</p>
              </div>
            </div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">The Circular Packaging Journey</h3>
              <p className="text-gray-600">
                GreenBox creates a closed-loop system where packaging is reused multiple times before being properly
                recycled, significantly reducing waste and environmental impact.
              </p>
            </div>

            <div className="space-y-4">
              {steps.map((step) => (
                <motion.div
                  key={step.id}
                  className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-colors ${
                    activeStep === step.id ? "bg-green-100" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveStep(step.id)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      activeStep === step.id ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Step {step.id}: {step.title}
                    </h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  {activeStep === step.id && <ArrowRight className="h-5 w-5 text-green-600 ml-auto self-center" />}
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
              <h4 className="font-medium text-green-800 mb-2">More About Step {activeStep}</h4>
              <p className="text-green-700">{steps[activeStep - 1].details}</p>
            </div>

            <EnhancedCTAButton>Learn More About Our Process</EnhancedCTAButton>
          </div>
        </div>
      </div>
    </section>
  )
}

