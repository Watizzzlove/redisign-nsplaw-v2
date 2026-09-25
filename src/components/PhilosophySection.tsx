import { useEffect, useRef, useState } from 'react'

function AnimatedNumber({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 1800 // ms
          const startTime = performance.now()

          const updateCount = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(easeOut * target))

            if (progress < 1) {
              requestAnimationFrame(updateCount)
            } else {
              setCount(target)
            }
          }

          requestAnimationFrame(updateCount)
        }
      },
      { threshold: 0.25 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [target, hasAnimated])

  return (
    <div ref={ref} className="font-sans text-4xl sm:text-5xl lg:text-6xl font-black text-[#0A0A0A] tracking-tight">
      {prefix}{count}{suffix}
    </div>
  )
}

export function PhilosophySection() {
  return (
    <section id="manifesto" className="relative w-full bg-[#FAFAF9] border-t border-black/10 py-16 sm:py-28 px-6 sm:px-10 md:px-16 text-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        
        {/* Shortened, punchy headline that does NOT break into 7 lines on mobile */}
        <h2 className="font-sans text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#0A0A0A] leading-[1.12] max-w-4xl mb-12 sm:mb-16">
          В сложнейших спорах побеждает нестандартная стратегия.
        </h2>

        {/* 1. Unified Single Plate: Subtitle + Body Text */}
        <div className="bg-white border border-black/10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm mb-16 sm:mb-20">
          <div className="max-w-4xl">
            {/* Subtitle */}
            <h3 className="font-sans text-xl sm:text-2xl md:text-3xl text-[#5F1358] font-bold leading-snug mb-6">
              Принцип «We Do More»: мы вникаем в устройство бизнеса, технологию добычи, логистику и рынки капитала так же глубоко, как в букву закона.
            </h3>

            {/* Body text in single unified plate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 text-slate-700 font-normal text-sm sm:text-base leading-relaxed pt-6 border-t border-black/5">
              <p>
                Основанное в 2006 году, адвокатское бюро NSP зарекомендовало себя как бескомпромиссная независимая юридическая сила. Когда международные санкции и передел активов трансформировали рынок, наша команда возглавила защиту ключевых предприятий перед Верховным Судом РФ и иностранными регуляторами.
              </p>
              <p>
                Благодаря участию в крупнейшей международной юридической сети Yingke, юристы NSP не ограничены государственными границами и располагают партнерскими офисами в более чем 30 странах мира — включая Китай, ОАЭ, Швейцарию и Великобританию.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Full-Width Metrics Bar with Animated Counters */}
        <div className="w-full mb-16 sm:mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 p-8 sm:p-10 bg-white border border-black/10 rounded-2xl sm:rounded-3xl shadow-sm">
            
            <div className="flex flex-col justify-between py-2 border-b sm:border-b-0 sm:border-r border-black/5 last:border-0 pr-4">
              <AnimatedNumber prefix="₽" target={450} suffix="+ млрд" />
              <div className="font-mono text-xs sm:text-sm text-slate-500 mt-2 uppercase tracking-wider font-medium">
                Защищено и оспорено в судах
              </div>
            </div>

            <div className="flex flex-col justify-between py-2 border-b sm:border-b-0 lg:border-r border-black/5 pr-4">
              <AnimatedNumber target={30} suffix="+ стран" />
              <div className="font-mono text-xs sm:text-sm text-slate-500 mt-2 uppercase tracking-wider font-medium">
                Международная сеть Yingke
              </div>
            </div>

            <div className="flex flex-col justify-between py-2 border-b sm:border-b-0 sm:border-r border-black/5 pr-4">
              <div className="font-sans text-4xl sm:text-5xl lg:text-6xl font-black text-[#5F1358] tracking-tight">
                Band 1
              </div>
              <div className="font-mono text-xs sm:text-sm text-slate-500 mt-2 uppercase tracking-wider font-medium">
                Право-300 / Коммерсантъ
              </div>
            </div>

            <div className="flex flex-col justify-between py-2">
              <AnimatedNumber target={20} suffix="+ лет" />
              <div className="font-mono text-xs sm:text-sm text-slate-500 mt-2 uppercase tracking-wider font-medium">
                Практики в РФ и за рубежом
              </div>
            </div>

          </div>
        </div>

        {/* 3. Two Full-Width Review Cards with Highlighted Company Names */}
        <div className="w-full flex flex-col space-y-6 sm:space-y-8">
          
          {/* Review 1: The Legal 500 */}
          <div className="w-full p-8 sm:p-12 rounded-2xl sm:rounded-3xl bg-white border border-black/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#5F1358]/30 transition-all duration-300">
            <div className="md:w-1/3">
              <div className="font-sans text-3xl sm:text-4xl font-black uppercase tracking-wider text-[#5F1358]">
                The Legal 500
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-slate-400 mt-1">
                Международный юридический справочник
              </div>
            </div>

            <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-black/5 pt-4 md:pt-0 md:pl-8">
              <p className="font-sans text-lg sm:text-xl font-medium text-[#0A0A0A] leading-relaxed italic">
                «Юристы NSP максимально чётко понимают наши цели в каждом проекте. Уже с самых первых встреч они просчитывают заключительные шаги.»
              </p>
            </div>
          </div>

          {/* Review 2: Chambers Europe */}
          <div className="w-full p-8 sm:p-12 rounded-2xl sm:rounded-3xl bg-white border border-black/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#5F1358]/30 transition-all duration-300">
            <div className="md:w-1/3">
              <div className="font-sans text-3xl sm:text-4xl font-black uppercase tracking-wider text-[#5F1358]">
                Chambers Europe
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-slate-400 mt-1">
                Ведущее европейское рейтинговое агентство
              </div>
            </div>

            <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-black/5 pt-4 md:pt-0 md:pl-8">
              <p className="font-sans text-lg sm:text-xl font-medium text-[#0A0A0A] leading-relaxed italic">
                «Их отличает глубокий практический подход к решению проблем бизнеса и мгновенная реакция в критических обстоятельствах.»
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
