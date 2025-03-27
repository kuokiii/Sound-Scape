"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Volume2, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

interface MobileMenuProps {
  items: { href: string; label: string }[]
  children?: React.ReactNode
}

export default function MobileMenu({ items, children }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close the menu when the path changes
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Volume2 className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-blue-600">SoundScape</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-4">
            <motion.nav className="flex flex-col space-y-1 px-2" variants={container} initial="hidden" animate="show">
              {items.map((item) => (
                <motion.div key={item.href} variants={item}>
                  <Link
                    href={item.href}
                    className={`flex items-center py-3 px-4 text-base font-medium rounded-md transition-colors ${
                      pathname === item.href
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            {children && <div className="px-6 py-4 border-t mt-4">{children}</div>}
            <div className="px-6 py-4 mt-auto border-t">
              <div className="flex flex-col gap-3">
                <Button asChild variant="outline" className="w-full justify-center">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button asChild className="w-full justify-center bg-blue-600 hover:bg-blue-700">
                  <Link href="/register" onClick={() => setOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

