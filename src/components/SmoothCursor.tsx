import { useEffect, useRef, useState } from 'react'
import { motion, useSpring } from 'motion/react'

export interface CursorState {
  label?: string
  variant?: 'default' | 'link' | 'explore' | 'action'
}

export function SmoothCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [cursorState, setCursorState] = useState<CursorState>({ variant: 'default' })
  
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const lastX = useRef(0)
  const lastY = useRef(0)

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)
  const rotate = useSpring(0, { damping: 40, stiffness: 200 })
  const scale = useSpring(1, { damping: 30, stiffness: 400 })

  useEffect(() => {
    const isPointerFine = window.matchMedia('(pointer: fine)').matches
    if (!isPointerFine) return

    const handlePointerMove = (e: PointerEvent) => {
      setIsVisible(true)
      mouseX.current = e.clientX
      mouseY.current = e.clientY

      x.set(e.clientX)
      y.set(e.clientY)

      const dx = e.clientX - lastX.current
      const dy = e.clientY - lastY.current
      const speed = Math.sqrt(dx * dx + dy * dy)

      if (speed > 1) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI)
        rotate.set(angle)
      }

      lastX.current = e.clientX
      lastY.current = e.clientY
    }

    const handlePointerLeave = () => setIsVisible(false)

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.body.addEventListener('mouseleave', handlePointerLeave)

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]') as HTMLElement | null
      if (target) {
        const label = target.getAttribute('data-cursor-label') || ''
        const variant = (target.getAttribute('data-cursor') || 'link') as CursorState['variant']
        setCursorState({ label, variant })
        scale.set(1.3)
      } else {
        const isInteractive = (e.target as HTMLElement).closest('a, button, input, select')
        if (isInteractive) {
          setCursorState({ variant: 'link' })
          scale.set(1.2)
        } else {
          setCursorState({ variant: 'default' })
          scale.set(1)
        }
      }
    }

    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      document.body.removeEventListener('mouseleave', handlePointerLeave)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [x, y, rotate, scale])

  if (!isVisible) return null

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        translateX: '-50%',
        translateY: '-50%',
        pointerEvents: 'none',
        zIndex: 99999,
        willChange: 'transform',
      }}
    >
      {/* Default minimal dark dot + subtle hairline ring for light theme */}
      {cursorState.variant === 'default' && (
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="relative flex items-center justify-center"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#0A0A0A] shadow-sm" />
          <div className="absolute w-7 h-7 rounded-full border border-black/20" />
        </motion.div>
      )}

      {/* Expanded Pill with context label (Signature noth.in interaction) */}
      {(cursorState.variant === 'link' || cursorState.variant === 'explore' || cursorState.variant === 'action') && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          className="px-3 py-1.5 rounded-full bg-[#5F1358] text-white font-mono text-[10px] font-semibold tracking-wider uppercase flex items-center gap-1.5 shadow-xl"
        >
          <span>{cursorState.label || 'view'}</span>
          <span className="text-[9px]">↗</span>
        </motion.div>
      )}
    </motion.div>
  )
}
