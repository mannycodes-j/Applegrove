"use client"

import { cn } from "@/lib/utils"
import type { LoaderProps } from "@/lib/types/loader"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const Loader = ({ size = "md", className }: LoaderProps) => {
  const loaderRef = useRef<SVGSVGElement>(null)

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-28 h-28",
  }

  useEffect(() => {
    if (!loaderRef.current) return

    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power2.inOut" },
      })

      // Enhanced swoosh rotation with elastic easing
      masterTl.to(".logo-swoosh", {
        rotation: 360,
        transformOrigin: "50% 50%",
        duration: 3,
        ease: "power1.inOut",
      })

      // Advanced stripe animations with morphing and stagger
      masterTl.to(
        ".logo-stripe",
        {
          scaleX: 1.2,
          x: 8,
          duration: 0.8,
          stagger: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "elastic.out(1, 0.5)",
        },
        "-=2.5",
      )

      // Breathing circle with glow effect
      masterTl.to(
        ".logo-circle",
        {
          scale: 1.05,
          opacity: 0.7,
          duration: 1.5,
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut",
        },
        "-=2.8",
      )

      // Particle orbit animation
      masterTl.to(
        ".particle",
        {
          rotation: 360,
          transformOrigin: "100px 100px",
          duration: 4,
          ease: "none",
        },
        0,
      )

      // Pulse rings
      masterTl.to(
        ".pulse-ring",
        {
          scale: 1.3,
          opacity: 0,
          duration: 2,
          stagger: 0.3,
          repeat: -1,
          ease: "power2.out",
        },
        0,
      )

      // Morphing stripes with wave effect (fixed morphSVG usage)
      masterTl.to(
        ".logo-stripe",
        {
          // Remove invalid morphSVG usage; fallback to simple y movement and scale for wave effect
          y: -4,
          scaleY: 1.1,
          duration: 0.6,
          stagger: 0.15,
          yoyo: true,
          repeat: 1,
          ease: "back.out(1.7)",
        },
        "-=1.5",
      )
    }, loaderRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg
        ref={loaderRef}
        className={cn(sizeClasses[size], "text-white drop-shadow-2xl")}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="50%" stopColor="#e2e8f0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle
          className="pulse-ring"
          cx="100"
          cy="100"
          r="95"
          fill="none"
          stroke="url(#logoGradient)"
          strokeWidth="2"
          opacity="0.3"
        />
        <circle
          className="pulse-ring"
          cx="100"
          cy="100"
          r="95"
          fill="none"
          stroke="url(#logoGradient)"
          strokeWidth="2"
          opacity="0.3"
        />

        {/* Enhanced main circle with glow */}
        <circle
          className="logo-circle"
          cx="100"
          cy="100"
          r="90"
          opacity="0.9"
          stroke="url(#logoGradient)"
          filter="url(#glow)"
        />

        <rect
          className="logo-stripe"
          x="45"
          y="58"
          width="110"
          height="14"
          rx="7"
          fill="url(#logoGradient)"
          filter="url(#glow)"
        />
        <rect
          className="logo-stripe"
          x="45"
          y="88"
          width="110"
          height="14"
          rx="7"
          fill="url(#logoGradient)"
          filter="url(#glow)"
        />
        <rect
          className="logo-stripe"
          x="45"
          y="118"
          width="110"
          height="14"
          rx="7"
          fill="url(#logoGradient)"
          filter="url(#glow)"
        />

        {/* Enhanced swoosh with gradient */}
        <path
          className="logo-swoosh"
          d="M155 25 C185 55, 185 145, 155 175"
          stroke="url(#logoGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          filter="url(#glow)"
        />

        <circle className="particle" cx="170" cy="100" r="3" fill="url(#logoGradient)" opacity="0.8" />
        <circle className="particle" cx="30" cy="100" r="2" fill="url(#logoGradient)" opacity="0.6" />
        <circle className="particle" cx="100" cy="30" r="2.5" fill="url(#logoGradient)" opacity="0.7" />
        <circle className="particle" cx="100" cy="170" r="2" fill="url(#logoGradient)" opacity="0.5" />
      </svg>
    </div>
  )
}

export default Loader
