import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, VolumeX, Brain, Users, Building, ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image src="/images/city-background.jpg" alt="City background" fill className="object-cover" />
        </div>
        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
              About SoundScape
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              Our Mission for <span className="text-blue-600">Quieter Cities</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              SoundScape is dedicated to addressing urban noise pollution through innovative technology, creating more
              livable and peaceful urban environments.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">The Challenge of Urban Noise</h2>
              <p className="text-lg text-gray-600">
                Noise pollution is a pervasive issue in urban areas, caused by traffic, construction, commercial
                activities, and public events. This constant exposure to noise has significant impacts:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Health Consequences</h4>
                    <p className="text-gray-600">
                      Chronic exposure to noise can lead to stress, sleep disturbances, hearing damage, and
                      cardiovascular issues.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Reduced Quality of Life</h4>
                    <p className="text-gray-600">
                      Noise interferes with concentration, relaxation, and communication, diminishing overall
                      well-being.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Limited Awareness</h4>
                    <p className="text-gray-600">
                      Unlike other forms of pollution, noise is often overlooked despite its significant impact on urban
                      residents.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image src="/images/noise-problem.jpg" alt="Urban noise pollution" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section className="py-20 bg-blue-50">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Solution</h2>
            <p className="text-lg text-gray-600">
              SoundScape leverages advanced technology to monitor, visualize, and manage urban noise, empowering both
              residents and city planners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <VolumeX className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Monitoring</h3>
              <p className="text-gray-600">
                Our network of sensors and crowdsourced data provides up-to-the-minute information on noise levels
                throughout the city, creating comprehensive noise maps.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Analysis</h3>
              <p className="text-gray-600">
                Advanced algorithms process noise data to identify patterns, predict future noise levels, and recommend
                optimal routes and locations for various activities.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Engagement</h3>
              <p className="text-gray-600">
                SoundScape enables residents to report noise disturbances, access quiet zones, and contribute to a
                collaborative approach to urban noise management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image src="/images/benefits.jpg" alt="Benefits of SoundScape" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Benefits for Everyone</h2>
              <p className="text-lg text-gray-600">
                SoundScape creates value for all stakeholders in the urban ecosystem:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">For Residents</h4>
                    <p className="text-gray-600">
                      Find quiet spaces, plan peaceful routes, and report noise disturbances to improve quality of life.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">For City Planners</h4>
                    <p className="text-gray-600">
                      Access comprehensive data to inform urban design, zoning decisions, and noise reduction
                      initiatives.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">For Businesses</h4>
                    <p className="text-gray-600">
                      Identify optimal locations for noise-sensitive operations and demonstrate environmental
                      responsibility.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">For Public Health</h4>
                    <p className="text-gray-600">
                      Reduce noise-related health issues through better awareness and management of urban soundscapes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Implementation Approach</h2>
            <p className="text-lg text-gray-600">
              SoundScape is designed for practical deployment in urban environments:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Building className="h-5 w-5 text-blue-600 mr-2" />
                Technical Infrastructure
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">
                    Strategic placement of noise sensors in high-traffic and residential areas
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">
                    Integration with existing smart city infrastructure and data sources
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Cloud-based processing for real-time analysis and visualization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Open APIs for integration with other urban management systems</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                Community Adoption
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">User-friendly mobile and web applications for public access</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Educational campaigns about noise pollution and its impacts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">
                    Partnerships with local businesses, schools, and community organizations
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">
                    Gamification elements to encourage participation and data contribution
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Vision for the Future</h2>
            <p className="text-xl mb-8">
              We envision cities where noise is managed as thoughtfully as other environmental factors. Through
              SoundScape, we're working toward urban environments where residents can enjoy the vibrancy of city life
              without sacrificing their health and wellbeing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/map">Explore Our Solution</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Join the Movement for Quieter Cities</h2>
            <p className="text-lg text-gray-600 mb-8">
              Whether you're a city resident, urban planner, or potential partner, there are many ways to get involved
              with SoundScape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/map">
                  Try SoundScape Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

