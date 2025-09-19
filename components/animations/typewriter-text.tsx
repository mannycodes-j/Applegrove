'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface TypewriterTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
  cursorBlinkDuration?: number // how long the cursor keeps blinking after typing
}

export function TypewriterText({
  text,
  className = '',
  speed = 100,
  delay = 0,
  cursorBlinkDuration = 1500, // default: blink 1.5s after typing
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [cursorFade, setCursorFade] = useState(false)

  // typing effect
  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(
        () => {
          setDisplayedText(text.slice(0, currentIndex + 1))
          setCurrentIndex((prev) => prev + 1)
        },
        currentIndex === 0 ? delay : speed
      )

      return () => clearTimeout(timer)
    } else if (text.length > 0) {
      // let cursor blink for a while, then fade
      const fadeTimer = setTimeout(() => {
        setCursorFade(true)
      }, cursorBlinkDuration)

      return () => clearTimeout(fadeTimer)
    }
  }, [currentIndex, text, speed, delay, cursorBlinkDuration])

  // blinking cursor effect (only while not fading)
  useEffect(() => {
    if (cursorFade) return
    const blink = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(blink)
  }, [cursorFade])

  return (
    <motion.h1
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      {displayedText}
      {!cursorFade && (
        <motion.span
          key="cursor"
          initial={{ opacity: 1 }}
          animate={{ opacity: showCursor ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block w-1 bg-white ml-1"
          style={{ height: '1em' }}
        />
      )}
      {cursorFade && (
        <motion.span
          key="cursor-fade"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block w-1 bg-white ml-1"
          style={{ height: '1em' }}
        />
      )}
    </motion.h1>
  )
}
