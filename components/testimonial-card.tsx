import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  name: string
  role: string
  avatarUrl: string
}

export default function TestimonialCard({ quote, name, role, avatarUrl }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <Quote className="h-8 w-8 text-blue-200 mb-4" />
        <p className="text-gray-600 italic flex-grow mb-6">{quote}</p>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 relative rounded-full overflow-hidden">
            <Image src={avatarUrl || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{name}</h4>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

