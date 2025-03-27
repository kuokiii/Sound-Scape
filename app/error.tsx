"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <AlertTriangle className="h-16 w-16 text-red-600 mb-6" />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Something went wrong</h1>
      <p className="text-lg text-gray-600 max-w-md mb-8">
        We apologize for the inconvenience. Please try again or contact support if the problem persists.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={reset} className="bg-green-600 hover:bg-green-700 text-white">
          Try Again
        </Button>
        <Button asChild variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  )
}

