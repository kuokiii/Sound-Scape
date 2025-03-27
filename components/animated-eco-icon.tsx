import {
  Leaf,
  RecycleIcon,
  Droplets,
  TreePine,
  Wind,
  Sprout,
  Factory,
  Truck,
  Package,
  ShoppingBag,
  BarChart,
  QrCode,
  Gift,
  Palette,
} from "lucide-react"

interface AnimatedEcoIconProps {
  icon: string
  className?: string
  size?: number
}

export default function AnimatedEcoIcon({ icon, className = "", size = 24 }: AnimatedEcoIconProps) {
  const getIcon = () => {
    switch (icon) {
      case "leaf":
        return <Leaf size={size} />
      case "recycle":
        return <RecycleIcon size={size} />
      case "droplets":
        return <Droplets size={size} />
      case "tree":
        return <TreePine size={size} />
      case "wind":
        return <Wind size={size} />
      case "sprout":
        return <Sprout size={size} />
      case "factory":
        return <Factory size={size} />
      case "truck":
        return <Truck size={size} />
      case "package":
        return <Package size={size} />
      case "shopping":
        return <ShoppingBag size={size} />
      case "barChart":
        return <BarChart size={size} />
      case "qrcode":
        return <QrCode size={size} />
      case "gift":
        return <Gift size={size} />
      case "palette":
        return <Palette size={size} />
      default:
        return <Leaf size={size} />
    }
  }

  return (
    <div className={`relative group ${className}`}>
      <div className="absolute inset-0 bg-green-400 rounded-full opacity-0 group-hover:opacity-20 transform scale-90 group-hover:scale-110 transition-all duration-300"></div>
      <div className="relative z-10 text-green-600 transition-transform duration-300 group-hover:scale-110">
        {getIcon()}
      </div>
    </div>
  )
}

