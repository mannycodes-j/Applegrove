"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps {
  children: ReactNode
  className?: string
  speed?: "slow" | "normal" | "fast"
  direction?: "left" | "right"
  pauseOnHover?: boolean
}

export function Marquee({
  children,
  className,
  speed = "normal",
  direction = "left",
  pauseOnHover = false,
}: MarqueeProps) {
  const speedClass = {
    slow: "animate-marquee-slow",
    normal: "animate-marquee",
    fast: "animate-marquee-fast",
  }[speed]

  const directionClass = direction === "right" ? "reverse" : ""

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className={cn("flex w-max", speedClass, directionClass, pauseOnHover && "hover:pause")}
        style={{
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {children}
        {children}
        {children}
      </div>
    </div>
  )
}
