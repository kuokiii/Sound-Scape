import Link from "next/link"
import { Volume2, Mail, MapPin, Phone, Github, Twitter, Linkedin } from "lucide-react"
import NewsletterForm from "./newsletter-form"

export default function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Volume2 className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">SoundScape</span>
            </div>
            <p className="text-gray-400 mb-6">
              Helping you navigate urban environments with real-time noise mapping and quiet zone identification.
            </p>
            <div className="flex gap-4">
              <Link href="https://twitter.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://github.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://linkedin.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="text-gray-400 space-y-2">
              <li>
                <Link href="/map" className="hover:text-blue-400 transition-colors">
                  Noise Map
                </Link>
              </li>
              <li>
                <Link href="/quiet-zones" className="hover:text-blue-400 transition-colors">
                  Quiet Zones
                </Link>
              </li>
              <li>
                <Link href="/routes" className="hover:text-blue-400 transition-colors">
                  Route Planner
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-blue-400 transition-colors">
                  Analytics
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="text-gray-400 space-y-2">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-blue-400 transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-blue-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="text-gray-400 space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>123 Quiet Street, Peaceful City, PC 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a href="mailto:info@soundscape.com" className="hover:text-blue-400 transition-colors">
                  info@soundscape.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-blue-400 transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-lg font-semibold mb-4">Subscribe to our Newsletter</h3>
          <p className="text-gray-400 mb-6">
            Stay up to date with the latest news and updates about urban noise management.
          </p>
          <NewsletterForm />
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} SoundScape. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

