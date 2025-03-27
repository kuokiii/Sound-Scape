"use client"

import { useTheme } from "next-themes"

interface SoundscapeLogoProps {
  className?: string
}

export default function SoundscapeLogo({ className = "h-6 w-6" }: SoundscapeLogoProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="24" cy="24" r="22" fill="#2563EB" />
      <circle cx="24" cy="24" r="18" fill="#1E40AF" />
      <path
        d="M24 6C14.059 6 6 14.059 6 24C6 33.941 14.059 42 24 42C33.941 42 42 33.941 42 24C42 14.059 33.941 6 24 6ZM24 38C16.268 38 10 31.732 10 24C10 16.268 16.268 10 24 10C31.732 10 38 16.268 38 24C38 31.732 31.732 38 24 38Z"
        fill="#3B82F6"
        fillOpacity="0.6"
      />
      <path
        d="M24 14C24 14 24 24 24 24M24 24C24 24 24 34 24 34M24 24C24 24 14 24 14 24M24 24C24 24 34 24 34 24"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M17 17L31 31M17 31L31 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
      <path
        d="M14 19C14.8889 19 15.7778 19.6667 16.6667 21C17.5556 22.3333 18.4444 23 19.3333 23"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M28.6667 23C29.5556 23 30.4444 22.3333 31.3333 21C32.2222 19.6667 33.1111 19 34 19"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 29C14.8889 29 15.7778 28.3333 16.6667 27C17.5556 25.6667 18.4444 25 19.3333 25"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M28.6667 25C29.5556 25 30.4444 25.6667 31.3333 27C32.2222 28.3333 33.1111 29 34 29"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

