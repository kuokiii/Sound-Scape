import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package2 } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <Package2 className="h-16 w-16 text-green-600 mb-6" />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
      <p className="text-lg text-gray-600 max-w-md mb-8">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
          <Link href="/">Return Home</Link>
        </Button>
        <Button asChild variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  )
}

