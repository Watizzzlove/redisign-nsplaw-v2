import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface PreloaderProps {
  onComplete?: () => void
}

export function FemidaPreloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    const duration = 2000 // 2 seconds smooth reveal
    const startTime = performance.now()

    const step = (now: number) => {
      const elapsed = now - startTime
      const p = Math.min(elapsed / duration, 1)
      // Ease in-out
      const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
      const percent = Math.floor(ease * 100)
      setProgress(percent)

      if (p < 1) {
        requestAnimationFrame(step)
      } else {
        setProgress(100)
        setTimeout(() => {
          setIsDone(true)
          if (onComplete) onComplete()
        }, 300)
      }
    }

    requestAnimationFrame(step)
  }, [onComplete])

  const handleSkip = () => {
    setProgress(100)
    setIsDone(true)
    sessionStorage.setItem('nsp_preloader_seen', 'true')
    if (onComplete) onComplete()
  }

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100000] bg-white text-[#0A0A0A] flex flex-col items-center justify-between p-6 sm:p-12 select-none overflow-hidden"
        >
          {/* Top subtle bar */}
          <div className="w-full flex items-center justify-between text-xs font-mono uppercase tracking-widest text-slate-400">
            <span>АДВОКАТСКОЕ БЮРО NSP</span>
            <button
              onClick={handleSkip}
              className="text-[#5F1358] hover:underline font-bold active:scale-95 transition"
            >
              Пропустить [ESC] ↗
            </button>
          </div>

          {/* Central Femida Silhouette & Contour Fill Area */}
          <div className="relative flex flex-col items-center justify-center my-auto">
            {/* Statue container */}
            <div className="relative w-56 sm:w-72 md:w-80 h-72 sm:h-96 md:h-[420px] flex items-center justify-center">
              
              {/* Layer 1: Femida Contour outline (ambient silhouette guide) */}
              <img
                src="./assets/femida_contour.png"
                alt="Контур Фемиды"
                className="absolute inset-0 w-full h-full object-contain opacity-25 filter grayscale"
              />

              {/* Layer 2: Filling Silhouette (Animated rising fill from 0% to 100%) */}
              <div
                className="absolute inset-0 w-full h-full transition-all duration-75 overflow-hidden"
                style={{
                  clipPath: `inset(${100 - progress}% 0 0 0)`,
                  WebkitClipPath: `inset(${100 - progress}% 0 0 0)`,
                }}
              >
                {/* Silhouette or high-fidelity Femida image */}
                <img
                  src="./assets/femida_statue.png"
                  alt="Фемида Правосудия"
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(95,19,88,0.25)]"
                />

                {/* Laser/Liquid filling edge line */}
                <div
                  className="absolute left-0 right-0 h-[2px] bg-[#5F1358] shadow-[0_0_12px_#5F1358]"
                  style={{
                    top: `${100 - progress}%`,
                  }}
                />
              </div>

              {/* Ambient radial glow behind the statue */}
              <div className="absolute w-64 h-64 rounded-full bg-[#5F1358]/5 blur-3xl -z-10 pointer-events-none" />
            </div>

            {/* Numeric Progress Counter */}
            <div className="flex flex-col items-center mt-6">
              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#5F1358] tracking-tight">
                {progress}%
              </div>
              <div className="w-48 sm:w-64 h-1 bg-black/5 rounded-full overflow-hidden mt-3">
                <div
                  className="h-full bg-[#5F1358] rounded-full transition-all duration-75 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bottom tag line */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-slate-500 gap-2">
            <span>[ WE DO MORE • EST. 2006 ]</span>
            <span>НАДЕЖНОСТЬ И НЕЗЫБЛЕМОСТЬ ПРАВА</span>
            <span>МОСКВА • СИТИ</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
