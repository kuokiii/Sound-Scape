import Image from "next/image"

interface EcoFriendlyImageProps {
  alt: string
  className?: string
  width: number
  height: number
}

export default function EcoFriendlyImage({ alt, className, width, height }: EcoFriendlyImageProps) {
  // This component simulates eco-friendly packaging images
  // In a real implementation, you would use actual image files

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      <Image src="/placeholder.svg" alt={alt} fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent mix-blend-overlay" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-green-800 font-medium text-sm bg-white/80 px-3 py-1 rounded-full">{alt}</div>
      </div>
    </div>
  )
}

