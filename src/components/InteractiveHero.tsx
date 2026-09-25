import { useRef, useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

interface HeroProps {
  onOpenConsultation: () => void
}

interface LetterRevealProps {
  letter: 'N' | 'S' | 'P'
  columnImage: string
  isActive: boolean
  onClick: () => void
  subtext: string
}

function ColumnLetter({ letter, columnImage, isActive, onClick, subtext }: LetterRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [mousePos, setMousePos] = useState<{ x: number; y: number; isHovered: boolean }>({
    x: 50,
    y: 50,
    isHovered: false,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y, isHovered: true })
  }

  const handleMouseEnter = () => {
    setMousePos((prev) => ({ ...prev, isHovered: true }))
  }

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, isHovered: false }))
  }

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="explore"
      data-cursor-label={letter === 'N' ? 'некторов' : letter === 'S' ? 'споры' : 'партнеры'}
      className="relative flex-1 flex items-center justify-center cursor-pointer select-none py-2 sm:py-6 group transition-transform duration-300 active:scale-95"
    >
      {/* 1. Base Monumental Letter (Typography) */}
      <span
        className={`text-[22vw] sm:text-[24vw] md:text-[25vw] font-black tracking-tighter leading-none transition-all duration-300 ${
          isActive || mousePos.isHovered ? 'text-transparent opacity-0' : 'text-[#0A0A0A] opacity-100'
        }`}
      >
        {letter}
      </span>

      {/* 2. Antique Classical Marble Column Sculpture (Reveal Layer) */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 pointer-events-none ${
          isActive
            ? 'opacity-100 scale-105 filter drop-shadow-[0_20px_35px_rgba(95,19,88,0.25)]'
            : mousePos.isHovered
            ? 'opacity-100 scale-102 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.18)]'
            : 'opacity-0 scale-95'
        }`}
      >
        <img
          src={columnImage}
          alt={`Колонна ${letter}`}
          className="w-full h-full max-h-[85vh] object-contain select-none"
          loading="eager"
        />
      </div>

      {/* 3. Fluid Brush Mask Reveal on Cursor Movement (Screenshot 1 noth.in style) */}
      {mousePos.isHovered && !isActive && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200"
          style={{
            maskImage: `radial-gradient(circle 180px at ${mousePos.x}% ${mousePos.y}%, black 40%, transparent 85%)`,
            WebkitMaskImage: `radial-gradient(circle 180px at ${mousePos.x}% ${mousePos.y}%, black 40%, transparent 85%)`,
          }}
        >
          <img
            src={columnImage}
            alt={`Колонна ${letter} Reveal`}
            className="w-full h-full max-h-[85vh] object-contain scale-105 filter drop-shadow-[0_15px_30px_rgba(95,19,88,0.3)]"
          />
        </div>
      )}

      {/* Floating subtle indicator badge on active */}
      {isActive && (
        <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 -translate-x-1/2 bg-[#5F1358] text-white px-3 py-1 rounded-full font-mono text-[9px] sm:text-[11px] whitespace-nowrap shadow-lg">
          {subtext}
        </div>
      )}
    </div>
  )
}

export function InteractiveHero({ onOpenConsultation }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [activeLetter, setActiveLetter] = useState<string | null>(null)

  // Fluid ink/brush trail canvas (noth.in screenshot 1 style)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Fluid organic brush drops
    interface FluidDrop {
      x: number
      y: number
      radius: number
      maxRadius: number
      alpha: number
      growth: number
      color: string
    }

    const drops: FluidDrop[] = []
    let lastX = 0
    let lastY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const dist = Math.hypot(x - lastX, y - lastY)
      if (dist > 12) {
        // Draw fluid dark ink blob with subtle plum undertone
        drops.push({
          x,
          y,
          radius: 18,
          maxRadius: Math.min(220, 60 + dist * 2.8),
          alpha: 0.28,
          growth: 3.2,
          color: 'rgba(95, 19, 88, ', // #5F1358
        })

        // Also add secondary soft atmospheric drop
        if (Math.random() > 0.4) {
          drops.push({
            x: x + (Math.random() - 0.5) * 30,
            y: y + (Math.random() - 0.5) * 30,
            radius: 8,
            maxRadius: 100,
            alpha: 0.16,
            growth: 1.8,
            color: 'rgba(10, 10, 10, ',
          })
        }

        lastX = x
        lastY = y
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i]
        d.radius += d.growth
        d.alpha *= 0.93

        if (d.alpha < 0.008 || d.radius >= d.maxRadius) {
          drops.splice(i, 1)
          continue
        }

        const gradient = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.radius)
        gradient.addColorStop(0, `${d.color}${d.alpha})`)
        gradient.addColorStop(0.5, `${d.color}${d.alpha * 0.45})`)
        gradient.addColorStop(1, `${d.color}0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const toggleLetter = (key: string) => {
    setActiveLetter((prev) => (prev === key ? null : key))
  }

  return (
    <section className="relative w-full min-h-screen bg-white text-[#0A0A0A] flex flex-col justify-between p-6 sm:p-10 md:p-12 overflow-hidden select-none">
      
      {/* 1. Organic Fluid Brush Canvas (noth.in screenshot 1) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* 2. Top Header Row (Exact noth.in composition) */}
      <header className="relative z-20 flex items-start justify-between w-full">
        
        {/* Top-Left: Punchy Statement + Pill Action Button */}
        <div className="flex flex-col items-start space-y-3 sm:space-y-4 max-w-[260px] sm:max-w-sm">
          <p className="font-sans text-[13px] sm:text-[16px] md:text-[17px] font-semibold tracking-tight text-[#0A0A0A] leading-snug">
            Не просто юристы, а стратегический перевес.<br />
            Потому что результат решает всё.
          </p>

          <button
            onClick={onOpenConsultation}
            className="btn-nothin mt-1 group active:scale-95 transition-transform"
            data-cursor="action"
            data-cursor-label="обсудить"
          >
            <span>Обсудить задачу</span>
            <ArrowRight className="w-3.5 h-3.5 arrow-icon group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Top-Right: Brutalist Vertical Navigation + Dot Grid Icon */}
        <div className="flex items-start gap-4 text-right">
          <nav className="hidden sm:flex flex-col space-y-1 font-mono text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider text-[#0A0A0A]">
            <a href="#practices" className="hover:text-[#5F1358] transition py-0.5" data-cursor="link" data-cursor-label="услуги">
              Услуги и новости
            </a>
            <a href="#manifesto" className="hover:text-[#5F1358] transition py-0.5" data-cursor="link" data-cursor-label="подход">
              Подход и метрики
            </a>
            <a href="#insights" className="hover:text-[#5F1358] transition py-0.5" data-cursor="link" data-cursor-label="аналитика">
              Аналитика
            </a>
            <a href="#partners" className="hover:text-[#5F1358] transition py-0.5" data-cursor="link" data-cursor-label="команда">
              Партнеры
            </a>
            <a href="#contact" className="hover:text-[#5F1358] transition py-0.5" data-cursor="link" data-cursor-label="контакты">
              Контакты
            </a>
          </nav>

          {/* noth.in 4-dot menu icon */}
          <div
            className="pt-1 flex flex-col gap-1 cursor-pointer active:scale-90 transition-transform"
            onClick={onOpenConsultation}
            data-cursor="action"
            data-cursor-label="меню"
          >
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-[#0A0A0A] rounded-xs" />
              <span className="w-1.5 h-1.5 bg-[#0A0A0A] rounded-xs" />
            </div>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-[#0A0A0A] rounded-xs" />
              <span className="w-1.5 h-1.5 bg-[#0A0A0A] rounded-xs" />
            </div>
          </div>
        </div>

      </header>

      {/* 3. Centerpiece: Massive Screen-Spanning Monumental Lettering (N S P ’) with 3D Antique Column Sculptures */}
      <div className="relative z-10 my-auto w-full flex flex-col items-center justify-center py-4 sm:py-8">
        <div className="w-full flex items-center justify-center text-center select-none font-sans font-black tracking-tighter leading-none">
          
          {/* Letter N: Corinthian Marble Column */}
          <ColumnLetter
            letter="N"
            columnImage="./assets/letter_n_column.png"
            isActive={activeLetter === 'N'}
            onClick={() => toggleLetter('N')}
            subtext="Александр Некторов • Управляющий партнер"
          />

          {/* Letter S: Fluted Doric / Corinthian Column */}
          <ColumnLetter
            letter="S"
            columnImage="./assets/letter_s_column.png"
            isActive={activeLetter === 'S'}
            onClick={() => toggleLetter('S')}
            subtext="Споры и Сделки • Роман Макаров"
          />

          {/* Letter P: Capital Ionic / Corinthian Column */}
          <ColumnLetter
            letter="P"
            columnImage="./assets/letter_p_column.png"
            isActive={activeLetter === 'P'}
            onClick={() => toggleLetter('P')}
            subtext="Партнеры и Адвокаты • Илья Рачков, Д.Ю.Н."
          />

          {/* Apostrophe ’ in noth.in signature style */}
          <div
            onClick={() => toggleLetter('apostrophe')}
            className={`text-[15vw] sm:text-[16vw] font-serif -ml-2 sm:-ml-8 -mt-8 sm:-mt-24 text-[#5F1358] transition-transform duration-300 hover:rotate-12 cursor-pointer flex-shrink-0 active:scale-90 ${
              activeLetter === 'apostrophe' ? 'rotate-12 scale-110' : ''
            }`}
            data-cursor="action"
            data-cursor-label="с 2006"
          >
            ’
          </div>

        </div>

        {/* Dynamic Minimalist Letter Indicator on Hover / Tap */}
        <div className="min-h-6 font-mono text-[10px] sm:text-[12px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#5F1358] font-semibold text-center mt-3 transition-all duration-200">
          {activeLetter === 'N' && '[ Александр Некторов • Управляющий партнер, адвокат ]'}
          {activeLetter === 'S' && '[ Сделки & Споры • Роман Макаров • Илья Рачков, Д.Ю.Н. ]'}
          {activeLetter === 'P' && '[ Партнеры и адвокаты NSP • Практика с 2006 года ]'}
          {activeLetter === 'apostrophe' && '[ Адвокатское бюро NSP • Надежность античных колонн ]'}
          {!activeLetter && (
            <span className="text-slate-400 font-normal">
              [ НАВЕДИТЕ КУРСОРОМ ИЛИ НАЖМИТЕ НА БУКВЫ NSP ]
            </span>
          )}
        </div>
      </div>

      {/* 4. Bottom Footer Row (Exact noth.in positioning) */}
      <footer className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 font-mono text-[10px] sm:text-[12px] font-medium text-[#0A0A0A] text-center sm:text-left">
        
        {/* Bottom Left: Location */}
        <div>
          Адвокатское бюро в Москве и глобальных хабах
        </div>

        {/* Bottom Right: Links */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="https://t.me/nsplaw"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#5F1358] uppercase tracking-wider transition"
            data-cursor="link"
            data-cursor-label="telegram"
          >
            Telegram
          </a>
          <span className="text-black/30">/</span>
          <a
            href="#practices"
            className="hover:text-[#5F1358] uppercase tracking-wider transition"
            data-cursor="link"
            data-cursor-label="новости"
          >
            Новости NSP
          </a>
          <span className="text-black/30">/</span>
          <span className="text-slate-500 uppercase tracking-wider">
            Москва, Сити
          </span>
        </div>

      </footer>

    </section>
  )
}
