import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import MainNav from "@/components/main-nav"
import SiteFooter from "@/components/site-footer"
import ScrollToTop from "@/components/scroll-to-top"
import { RealTimeDataProvider } from "@/components/real-time-data-service"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <title>SoundScape - Urban Noise Pollution Solution</title>
        <meta
          name="description"
          content="SoundScape helps you navigate urban environments with real-time noise mapping, quiet zone identification, and personalized route planning."
        />
        {/* Fix geolocation permissions */}
        <meta httpEquiv="Permissions-Policy" content="geolocation=(self), camera=(), microphone=()" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <RealTimeDataProvider>
            <MainNav />
            {children}
            <SiteFooter />
            <ScrollToTop />
            <Toaster />
          </RealTimeDataProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
