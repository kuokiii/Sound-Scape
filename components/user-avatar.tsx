import Image from "next/image"

interface UserAvatarProps {
  src?: string
  alt: string
  fallback: string
  size?: number
}

export default function UserAvatar({ src, alt, fallback, size = 32 }: UserAvatarProps) {
  const initials = fallback
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()

  return (
    <div
      className="relative rounded-full overflow-hidden bg-green-100 flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image src={src || "/placeholder.svg"} alt={alt} width={size} height={size} className="object-cover" />
      ) : (
        <span className="text-green-600 font-medium text-sm">{initials}</span>
      )}
    </div>
  )
}

