"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileMenu from "./mobile-menu"
import { useState, useEffect } from "react"
import SoundscapeLogo from "./soundscape-logo"

export default function MainNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update the navigation items - remove community and contact links
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/map", label: "Noise Map" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/analytics", label: "Analytics" },
    { href: "/quiet-zones", label: "Quiet Zones" },
    { href: "/routes", label: "Route Planner" },
    { href: "/about", label: "About" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container px-4 md:px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <SoundscapeLogo className="h-8 w-8" />
            <span className="text-xl font-bold text-blue-600">SoundScape</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                className={`text-sm font-medium transition-colors relative ${
                  pathname === item.href
                    ? "text-blue-600"
                    : scrolled
                      ? "text-gray-600 hover:text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.label}
                {pathname === item.href && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600" />}
              </Link>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button asChild size="sm" variant="ghost" className="text-gray-700 hover:text-blue-600">
            <Link href="/login">
              <User className="h-4 w-4 mr-2" />
              Login
            </Link>
          </Button>

          <div className="hidden md:block">
            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>

          <MobileMenu items={navItems} />
        </div>
      </div>
    </header>
  )
}

