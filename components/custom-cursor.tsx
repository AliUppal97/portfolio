"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useMemo, useState, useCallback } from "react"

const INTERACTIVE_SELECTOR =
  'a,button,[role="button"],input,select,textarea,summary,[data-interactive="true"],.interactive'

// Returns a color that contrasts with the background by using the theme fg/bg vars.
function getContrastColor(isInteractive: boolean) {
  return isInteractive ? "color-mix(in oklab, var(--fg), white 35%)" : "color-mix(in oklab, var(--primary), white 45%)"
}

export function CustomCursor() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 })
  const [color, setColor] = useState("var(--primary)")
  const [scale, setScale] = useState(1)

  // Respect reduced motion
  const reducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  )

  // Debounced mouse move handler to prevent ResizeObserver issues
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      // Use requestAnimationFrame to prevent ResizeObserver loops
      requestAnimationFrame(() => {
        x.set(e.clientX - 6)
        y.set(e.clientY - 6)

        const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
        const isInteractive = !!el?.closest(INTERACTIVE_SELECTOR)
        setColor(getContrastColor(isInteractive))
        setScale(isInteractive ? 1.25 : 1)
      })
    },
    [x, y],
  )

  useEffect(() => {
    // Add passive listener to prevent performance issues
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  // Hide on touch devices
  const isTouch = useMemo(() => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches, [])
  if (isTouch) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: reducedMotion ? x : sx, y: reducedMotion ? y : sy }}
      className="pointer-events-none fixed left-0 top-0 z-[70]"
    >
      <div
        style={{
          width: 18,
          height: 18,
          backgroundColor: color,
          transform: `scale(${scale})`,
          boxShadow: "0 0 16px rgba(0, 0, 0, 0.15)", // neutral shadow instead of theme color
          opacity: 0.6,
        }}
        className="rounded-full mix-blend-difference transition-[transform,background-color] duration-150 ease-out"
      />
    </motion.div>
  )
}
