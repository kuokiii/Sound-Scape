import {
  Map,
  Compass,
  Navigation,
  Bell,
  Calendar,
  BarChart3,
  VolumeX,
  Volume2,
  Users,
  Building,
  Brain,
  Zap,
} from "lucide-react"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "map":
        return <Map className="h-6 w-6 text-blue-600" />
      case "compass":
        return <Compass className="h-6 w-6 text-blue-600" />
      case "navigation":
        return <Navigation className="h-6 w-6 text-blue-600" />
      case "bell":
        return <Bell className="h-6 w-6 text-blue-600" />
      case "calendar":
        return <Calendar className="h-6 w-6 text-blue-600" />
      case "barChart":
        return <BarChart3 className="h-6 w-6 text-blue-600" />
      case "volumeX":
        return <VolumeX className="h-6 w-6 text-blue-600" />
      case "volume2":
        return <Volume2 className="h-6 w-6 text-blue-600" />
      case "users":
        return <Users className="h-6 w-6 text-blue-600" />
      case "building":
        return <Building className="h-6 w-6 text-blue-600" />
      case "brain":
        return <Brain className="h-6 w-6 text-blue-600" />
      case "zap":
        return <Zap className="h-6 w-6 text-blue-600" />
      default:
        return <Map className="h-6 w-6 text-blue-600" />
    }
  }

  return (
    <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-md hover:shadow-blue-100 transition-all duration-300 hover:-translate-y-1">
      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-6 overflow-hidden">
        {getIcon()}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

