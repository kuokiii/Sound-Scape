import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, VolumeX } from "lucide-react"
import FeatureCard from "@/components/feature-card"
import NoiseStats from "@/components/noise-stats"
import TestimonialCard from "@/components/testimonial-card"
import CitySelector from "@/components/city-selector"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image src="/images/city-background.jpg" alt="City background" fill className="object-cover" />
        </div>
        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                Smart City Solution
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                A Quieter <span className="text-blue-600">City</span> Experience
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                SoundScape helps you navigate urban environments with real-time noise mapping, quiet zone
                identification, and personalized route planning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/map">
                    Explore Noise Map <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative h-[400px] w-full lg:h-[500px] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/noise-map-preview.jpg"
                  alt="SoundScape noise map preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              {/* Feature Badges */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <VolumeX className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Real-time Monitoring</p>
                    <p className="text-xs text-gray-500">Live noise level data</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Quiet Zones</p>
                    <p className="text-xs text-gray-500">Find peaceful areas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* City Selector Section */}
      <section className="py-12 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Select Your City</h2>
            <p className="text-lg text-gray-600">
              Choose your location to see real-time noise data and quiet zones in your area.
            </p>
          </div>
          <CitySelector />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-lg text-gray-600">
              SoundScape offers a comprehensive suite of tools to help you navigate and enjoy a quieter urban
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon="map"
              title="Real-Time Noise Mapping"
              description="View live noise levels across the city with our color-coded map, helping you identify quiet and noisy areas at a glance."
            />

            <FeatureCard
              icon="compass"
              title="Quiet Zone Identification"
              description="Discover peaceful spots for relaxation, work, or study, updated in real-time as noise conditions change throughout the day."
            />

            <FeatureCard
              icon="navigation"
              title="Quiet Route Planner"
              description="Get directions that prioritize quieter streets and paths, perfect for a more peaceful journey through the city."
            />

            <FeatureCard
              icon="bell"
              title="Noise Complaint Tracker"
              description="Report noise disturbances directly through the app, allowing city officials to respond more quickly to issues."
            />

            <FeatureCard
              icon="calendar"
              title="Noise Forecasts"
              description="Plan ahead with predictions of noise levels based on historical data, scheduled events, and construction work."
            />

            <FeatureCard
              icon="barChart"
              title="Personalized Insights"
              description="Receive tailored recommendations and statistics about noise exposure in your frequently visited locations."
            />
          </div>
        </div>
      </section>

      {/* Noise Stats Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Impact of Noise Pollution</h2>
            <p className="text-lg text-gray-600">
              Urban noise is more than just an annoyance—it has significant effects on health, productivity, and quality
              of life.
            </p>
          </div>

          <NoiseStats />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-blue-50">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How SoundScape Works</h2>
            <p className="text-lg text-gray-600">
              Our platform combines advanced technology with user-friendly design to create a comprehensive noise
              management solution.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Data Collection</h3>
                    <p className="text-gray-600">
                      Noise data is gathered from a network of sensors placed throughout the city, as well as from user
                      reports and historical records.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                    <p className="text-gray-600">
                      Our artificial intelligence algorithms process the data to create accurate noise maps, identify
                      patterns, and make predictions.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">User Interface</h3>
                    <p className="text-gray-600">
                      The processed information is presented through an intuitive interface, allowing users to easily
                      access and interact with the data.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Continuous Improvement</h3>
                    <p className="text-gray-600">
                      The system learns and improves over time, incorporating user feedback and new data to enhance
                      accuracy and functionality.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
                <Image src="/images/how-it-works.jpg" alt="How SoundScape works" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Users Say</h2>
            <p className="text-lg text-gray-600">
              Hear from people who have experienced the benefits of SoundScape in their daily lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="As someone who works from home, finding quiet cafés was always a challenge. SoundScape has completely changed that for me. I can now find peaceful spots to work without the guesswork."
              name="Sarah Johnson"
              role="Freelance Designer"
              avatarUrl="/images/avatar-1.jpg"
            />

            <TestimonialCard
              quote="The quiet route planner is a game-changer for my daily commute. I used to arrive at work stressed from all the noise, but now my walk is actually relaxing."
              name="Michael Chen"
              role="Marketing Manager"
              avatarUrl="/images/avatar-2.jpg"
            />

            <TestimonialCard
              quote="As a city planner, the data from SoundScape has been invaluable in identifying noise hotspots and implementing targeted solutions. It's making our city more livable."
              name="Elena Rodriguez"
              role="Urban Planner"
              avatarUrl="/images/avatar-3.jpg"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience a Quieter City?</h2>
            <p className="text-xl mb-8">
              Join thousands of users who are discovering peaceful spaces and improving their urban experience with
              SoundScape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/map">Explore the Noise Map</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                <Link href="/register">Create an Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

