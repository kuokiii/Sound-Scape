"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

interface EnhancedCTAButtonProps {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "outline"
  icon?: ReactNode
  onClick?: () => void
  href?: string
}

export default function EnhancedCTAButton({
  children,
  className = "",
  variant = "primary",
  icon = <ArrowRight className="ml-2 h-4 w-4" />,
  onClick,
  href,
}: EnhancedCTAButtonProps) {
  const getButtonStyle = () => {
    switch (variant) {
      case "primary":
        return "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-500/20"
      case "secondary":
        return "bg-white text-green-600 hover:bg-gray-100 shadow-lg hover:shadow-gray-200/40"
      case "outline":
        return "border-2 border-white text-white hover:bg-green-700 hover:border-green-700 shadow-lg hover:shadow-green-700/20"
      default:
        return "bg-green-600 hover:bg-green-700 text-white"
    }
  }

  const buttonContent = (
    <>
      <span>{children}</span>
      {icon}
    </>
  )

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
      {href ? (
        <Button asChild size="lg" className={`${getButtonStyle()} ${className} transition-all duration-300 transform`}>
          <Link href={href}>{buttonContent}</Link>
        </Button>
      ) : (
        <Button
          onClick={onClick}
          size="lg"
          className={`${getButtonStyle()} ${className} transition-all duration-300 transform`}
        >
          {buttonContent}
        </Button>
      )}
    </motion.div>
  )
}

