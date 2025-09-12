"use client"

import { cn } from "@/lib/utils"
import Loader from "./loader"
import { useAuthStore } from "@/lib/store/auth"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface PageLoaderProps {
  isLoading?: boolean
  className?: string
  isVisible?: boolean
  message?: string
}

const PageLoader = ({ isLoading, className, message }: PageLoaderProps) => {
  const { showLoader } = useAuthStore()
  const shouldShow = isLoading !== undefined ? isLoading : showLoader
  const overlayRef = useRef<HTMLDivElement>(null)

  // Animate fade-out when loader finishes
  useEffect(() => {
    if (!overlayRef.current) return

    if (!shouldShow) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: () => {
          if (overlayRef.current) {
            overlayRef.current.style.display = "none"
          }
        },
      })
    } else {
      gsap.set(overlayRef.current, { opacity: 1, scale: 1, display: "flex" })
    }
  }, [shouldShow])

  if (!shouldShow) return null

  return (
    <div
      ref={overlayRef}
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center",
        "bg-gray-900/90 backdrop-blur-sm",
        className,
      )}
    >
      <Loader size="lg" />
      {message && <p className="mt-4 text-gray-300 text-sm animate-pulse">{message}</p>}
    </div>
  )
}

export default PageLoader
