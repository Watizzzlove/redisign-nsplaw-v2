import { useRef, useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

interface HeroProps {
  onOpenConsultation: () => void
}

interface InkParticle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  life: number
  decay: number
}

export function InteractiveHero({ onOpenConsultation }: HeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [activePartner, setActivePartner] = useState<string | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d', { willReadFrequently: false })
    if (!ctx) return

    // Offscreen canvases for compositing
    const inkCanvas = document.createElement('canvas')
    const inkCtx = inkCanvas.getContext('2d')
    const baseCanvas = document.createElement('canvas')
    const baseCtx = baseCanvas.getContext('2d')
    const revealCanvas = document.createElement('canvas')
    const revealCtx = revealCanvas.getContext('2d')
    const tempCanvas = document.createElement('canvas')
    const tempCtx = tempCanvas.getContext('2d')
    if (!inkCtx || !baseCtx || !revealCtx || !tempCtx) return

    // Preload authentic antique column letter images in direct frontal view (N, S, P)
    const imgN = new Image()
    imgN.src = './assets/letter_n_frontal.png'
    const imgS = new Image()
    imgS.src = './assets/letter_s_frontal.png'
    const imgP = new Image()
    imgP.src = './assets/letter_p_frontal.png'

    const onLetterImgLoad = () => {
      renderStaticLayers()
    }
    imgN.onload = onLetterImgLoad
    imgS.onload = onLetterImgLoad
    imgP.onload = onLetterImgLoad
    if (imgN.complete && imgS.complete && imgP.complete) {
      renderStaticLayers()
    }

    let width = 0
    let height = 0
    let dpr = 1

    // Letter layout positions for hover hit-testing
    let letterBounds: { letter: string; x: number; y: number; width: number; height: number; info: string }[] = []

    function renderStaticLayers() {
      if (width === 0 || height === 0 || !baseCtx || !revealCtx) return

      baseCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
      revealCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
      baseCtx.clearRect(0, 0, width, height)
      revealCtx.clearRect(0, 0, width, height)

      // Calculate typography dimensions
      const fontSize = Math.min(width * 0.23, height * 0.44, 280)
      const font = `900 ${fontSize}px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
      const fontApos = `900 ${fontSize * 0.95}px "Cinzel", "Times New Roman", serif`

      baseCtx.font = font
      baseCtx.textBaseline = 'middle'
      baseCtx.textAlign = 'left'

      // Measure letters
      const mN = baseCtx.measureText('N')
      const mS = baseCtx.measureText('S')
      const mP = baseCtx.measureText('P')
      baseCtx.font = fontApos
      const mA = baseCtx.measureText('’')

      const gap = fontSize * 0.08
      const totalWidth = mN.width + mS.width + mP.width + mA.width + gap * 3
      const startX = (width - totalWidth) / 2
      const centerY = height * 0.52

      const xN = startX
      const xS = xN + mN.width + gap
      const xP = xS + mS.width + gap
      const xA = xP + mP.width + gap * 0.6

      // Precise glyph bounding box calculation
      const getGlyphBox = (m: TextMetrics, x: number, defaultH: number) => {
        const ascent = m.actualBoundingBoxAscent ?? (defaultH * 0.36)
        const descent = m.actualBoundingBoxDescent ?? (defaultH * 0.36)
        const left = m.actualBoundingBoxLeft ?? 0
        const right = m.actualBoundingBoxRight ?? m.width
        const glyphX = x - left
        const glyphY = centerY - ascent
        const glyphW = right + left
        const glyphH = ascent + descent
        return {
          x: glyphX,
          y: glyphY,
          width: glyphW > 0 ? glyphW : m.width,
          height: glyphH > 0 ? glyphH : defaultH * 0.72
        }
      }

      baseCtx.font = font
      const boundsN = getGlyphBox(mN, xN, fontSize)
      const boundsS = getGlyphBox(mS, xS, fontSize)
      const boundsP = getGlyphBox(mP, xP, fontSize)

      letterBounds = [
        { letter: 'N', x: boundsN.x, y: boundsN.y, width: boundsN.width, height: boundsN.height, info: 'Александр Некторов • Управляющий партнер' },
        { letter: 'S', x: boundsS.x, y: boundsS.y, width: boundsS.width, height: boundsS.height, info: 'Споры и Сделки • Роман Макаров' },
        { letter: 'P', x: boundsP.x, y: boundsP.y, width: boundsP.width, height: boundsP.height, info: 'Партнеры и Адвокаты • Илья Рачков, Д.Ю.Н.' },
        { letter: '’', x: xA, y: centerY - fontSize * 0.5, width: mA.width, height: fontSize * 0.7, info: 'Адвокатское бюро NSP • Практика с 2006 года' },
      ]

      // 1. Draw Base Black Letters
      baseCtx.fillStyle = '#0A0A0A'
      baseCtx.font = font
      baseCtx.fillText('N', xN, centerY)
      baseCtx.fillText('S', xS, centerY)
      baseCtx.fillText('P', xP, centerY)
      baseCtx.font = fontApos
      baseCtx.fillStyle = '#5F1358' // Brand plum accent apostrophe
      baseCtx.fillText('’', xA, centerY - fontSize * 0.12)

      // 2. Draw Reveal Layer: Authentic Antique Marble Column Sculptures
      // Scaled and positioned proportionally to match the printed letter dimensions and stem positions,
      // preserving all sculptural elements, capital carvings, and architectural reliefs in full.

      // N: Direct frontal vertical columns aligning with printed stems
      // Slightly enlarged to match the weight of letter S and printed font while keeping exact centering
      if (imgN.complete && imgN.naturalWidth > 0) {
        const nScaleW = 1.14
        const nScaleH = 1.08
        const nW = boundsN.width * nScaleW
        const nH = boundsN.height * nScaleH
        const nX = boundsN.x - (nW - boundsN.width) / 2
        const nY = boundsN.y - (nH - boundsN.height) / 2
        revealCtx.drawImage(imgN, 115, 57, 797, 918, nX, nY, nW, nH)
      }

      // S: Direct frontal S-curve column matching the printed S geometry
      if (imgS.complete && imgS.naturalWidth > 0) {
        const sScaleW = 1.04
        const sScaleH = 1.02
        const sW = boundsS.width * sScaleW
        const sH = boundsS.height * sScaleH
        const sX = boundsS.x - (sW - boundsS.width) / 2
        const sY = boundsS.y - (sH - boundsS.height) / 2
        revealCtx.drawImage(imgS, 109, 49, 753, 912, sX, sY, sW, sH)
      }

      // P: Direct frontal Corinthian column + classical Roman arch loop
      // Enlarged and shifted left to align the inner counter hole and column stem with printed P
      if (imgP.complete && imgP.naturalWidth > 0) {
        const pScaleW = 1.12
        const pScaleH = 1.06
        const pW = boundsP.width * pScaleW
        const pH = boundsP.height * pScaleH
        const pShiftLeft = boundsP.width * 0.05
        const pX = boundsP.x - (pW - boundsP.width) * 0.5 - pShiftLeft
        const pY = boundsP.y - (pH - boundsP.height) / 2
        revealCtx.drawImage(imgP, 160, 77, 698, 895, pX, pY, pW, pH)
      }

      // Draw brand plum apostrophe
      revealCtx.font = fontApos
      revealCtx.textBaseline = 'middle'
      revealCtx.textAlign = 'left'
      revealCtx.fillStyle = '#5F1358'
      revealCtx.fillText('’', xA, centerY - fontSize * 0.12)
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = container.clientWidth
      height = container.clientHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const offcanvases = [inkCanvas, baseCanvas, revealCanvas, tempCanvas]
      offcanvases.forEach((c) => {
        c.width = width * dpr
        c.height = height * dpr
        const cCtx = c.getContext('2d')
        if (cCtx) cCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
      })

      renderStaticLayers()
    }

    resize()
    window.addEventListener('resize', resize)

    // Octopus Ink Particle Physics
    const particles: InkParticle[] = []
    let lastX = 0
    let lastY = 0
    let hasMoved = false

    const addInkPoint = (x: number, y: number, vx: number, vy: number, speed: number) => {
      // Dynamic radius based on speed (solid organic blob, expanded for broader reveal)
      const baseRadius = Math.min(95, Math.max(40, 36 + speed * 0.75))

      // Main blob with longer lifespan (~2.4s)
      particles.push({
        x,
        y,
        vx: vx * 0.06,
        vy: vy * 0.06,
        radius: baseRadius,
        life: 1.0,
        decay: 0.007,
      })

      // Organic satellite droplets (ink splatter tentacles)
      if (Math.random() > 0.35) {
        const angle = Math.random() * Math.PI * 2
        const dist = Math.random() * baseRadius * 0.85
        particles.push({
          x: x + Math.cos(angle) * dist,
          y: y + Math.sin(angle) * dist,
          vx: vx * 0.08 + (Math.random() - 0.5) * 1.8,
          vy: vy * 0.08 + (Math.random() - 0.5) * 1.8,
          radius: Math.random() * 22 + 10,
          life: 0.95,
          decay: 0.009,
        })
      }
    }

    let lastMoveTime = 0

    const handlePointerMove = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top

      const now = performance.now()
      const timeSinceLast = now - lastMoveTime
      lastMoveTime = now

      if (!hasMoved || timeSinceLast > 300) {
        lastX = x
        lastY = y
        hasMoved = true
        addInkPoint(x, y, 0, 0, 10)
        return
      }

      const dx = x - lastX
      const dy = y - lastY
      const dist = Math.hypot(dx, dy)

      // Prevent long streaks across the screen on rapid mouse re-entry
      if (dist > 140) {
        lastX = x
        lastY = y
        addInkPoint(x, y, 0, 0, 15)
        return
      }

      const speed = dist

      // Hit-test letters for partner text banner
      let matchedInfo: string | null = null
      for (const b of letterBounds) {
        if (x >= b.x && x <= b.x + b.width && y >= b.y && y <= b.y + b.height) {
          matchedInfo = b.info
          break
        }
      }
      if (matchedInfo) {
        setActivePartner(matchedInfo)
      }

      // Interpolate points so there are zero gaps even on rapid movement
      const step = 8 // pixels per step
      const steps = Math.max(1, Math.floor(dist / step))
      for (let i = 1; i <= steps; i++) {
        const ix = lastX + (dx * i) / steps
        const iy = lastY + (dy * i) / steps
        addInkPoint(ix, iy, dx, dy, speed)
      }

      // Project forward ink stream in the direction of motion
      if (speed > 2.5) {
        const nx = dx / speed
        const ny = dy / speed
        const perpX = -ny
        const perpY = nx

        const forwardCount = speed > 10 ? 2 : 1
        for (let f = 1; f <= forwardCount; f++) {
          const forwardDist = (18 + speed * 0.85) * (f * 0.7)
          const lateralSpread = (Math.random() - 0.5) * (12 + speed * 0.25)
          const fx = x + nx * forwardDist + perpX * lateralSpread
          const fy = y + ny * forwardDist + perpY * lateralSpread
          particles.push({
            x: fx,
            y: fy,
            vx: nx * (speed * 0.12 + 1.2) + (Math.random() - 0.5) * 0.8,
            vy: ny * (speed * 0.12 + 1.2) + (Math.random() - 0.5) * 0.8,
            radius: Math.min(48, Math.max(18, 16 + speed * 0.4)),
            life: 0.9,
            decay: 0.008,
          })
        }
      }

      // Limit particle pool to maintain buttery-smooth 60fps
      if (particles.length > 700) {
        particles.splice(0, particles.length - 700)
      }

      lastX = x
      lastY = y
    }

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY)
    }

    const onPointerDown = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      for (let i = 0; i < 8; i++) {
        addInkPoint(
          x + (Math.random() - 0.5) * 45,
          y + (Math.random() - 0.5) * 45,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6,
          45
        )
      }
    }

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        hasMoved = false
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)
        const rect = container.getBoundingClientRect()
        const x = e.touches[0].clientX - rect.left
        const y = e.touches[0].clientY - rect.top
        for (let i = 0; i < 8; i++) {
          addInkPoint(
            x + (Math.random() - 0.5) * 45,
            y + (Math.random() - 0.5) * 45,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6,
            45
          )
        }
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onPointerDown)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    // Animation & Compositing Loop
    let animationId: number
    const animate = () => {
      // 1. Render Ink Canvas
      inkCtx.clearRect(0, 0, width, height)

      if (particles.length > 0) {
        inkCtx.fillStyle = '#0A0A0A'
        inkCtx.strokeStyle = '#0A0A0A'

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i]
          p.x += p.vx
          p.y += p.vy
          p.vx *= 0.95
          p.vy *= 0.95
          p.life -= p.decay

          if (p.life <= 0) {
            particles.splice(i, 1)
            continue
          }

          // Draw organic blob
          const currentRadius = p.radius * Math.min(p.life * 1.3, 1)
          inkCtx.beginPath()
          inkCtx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2)
          inkCtx.fill()
        }

        // Connect adjacent ink drops for fluid, unbroken octopus tentacles
        inkCtx.lineCap = 'round'
        inkCtx.lineJoin = 'round'
        for (let i = 0; i < particles.length - 1; i++) {
          const p1 = particles[i]
          const p2 = particles[i + 1]
          const d = Math.hypot(p1.x - p2.x, p1.y - p2.y)
          if (d < 85) {
            inkCtx.lineWidth = Math.min(p1.radius, p2.radius) * 1.7 * Math.min(p1.life, p2.life)
            inkCtx.beginPath()
            inkCtx.moveTo(p1.x, p1.y)
            inkCtx.lineTo(p2.x, p2.y)
            inkCtx.stroke()
          }
        }
      }

      // 2. Clear Screen in 1:1 buffer coordinates
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 3. Draw Base Black Letters
      ctx.drawImage(baseCanvas, 0, 0)

      // 4. Draw Black Ink on the Background (organic ink following cursor)
      ctx.drawImage(inkCanvas, 0, 0)

      // 5. Draw Reveal Layer ONLY in the Intersection of Ink + Letters
      if (particles.length > 0) {
        tempCtx.setTransform(1, 0, 0, 1, 0, 0)
        tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height)
        // Step a: Draw column letters
        tempCtx.drawImage(revealCanvas, 0, 0)
        // Step b: Keep ONLY the area covered by the ink trail
        tempCtx.globalCompositeOperation = 'destination-in'
        tempCtx.drawImage(inkCanvas, 0, 0)
        tempCtx.globalCompositeOperation = 'source-over'

        // Step c: Composite onto screen over the base letters
        ctx.drawImage(tempCanvas, 0, 0)
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onPointerDown)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-white text-[#0A0A0A] flex flex-col justify-between p-6 sm:p-10 md:p-12 overflow-hidden select-none"
    >
      {/* 1. Full-Screen Canvas handling Octopus Ink + Exact Column Letter Reveal */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* 2. Top Header Row (Exact noth.in composition) */}
      <header className="relative z-20 flex items-start justify-between w-full">
        {/* Top-Left: Statement + Action Button */}
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

        {/* Top-Right: Navigation + 4-Dot Menu */}
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

      {/* 3. Center Spacer Area (Canvas renders the centered monumental letters N S P ’) */}
      <div className="relative z-0 my-auto w-full flex flex-col items-center justify-center min-h-[35vh]">
        {/* Invisible layout placeholder for accessibility */}
        <h1 className="sr-only">NSP — Адвокатское бюро «Некторов, Савельев и Партнеры»</h1>
      </div>

      {/* 4. Dynamic Minimalist Partner Indicator */}
      <div className="relative z-20 w-full flex items-center justify-center mb-2">
        <div className="min-h-6 font-mono text-[10px] sm:text-[12px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#5F1358] font-semibold text-center transition-all duration-200">
          {activePartner ? (
            `[ ${activePartner} ]`
          ) : (
            <span className="text-slate-400 font-normal">
              [ ПРОВЕДИТЕ КУРСОРОМ ПО ЭКРАНУ И БУКВАМ NSP ]
            </span>
          )}
        </div>
      </div>

      {/* 5. Bottom Footer Row (Exact noth.in positioning) */}
      <footer className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 font-mono text-[10px] sm:text-[12px] font-medium text-[#0A0A0A] text-center sm:text-left">
        <div>
          Адвокатское бюро в Москве и глобальных хабах
        </div>

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
