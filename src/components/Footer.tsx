import { ArrowRight } from 'lucide-react'

interface FooterProps {
  onOpenConsultation: () => void
}

export function Footer({ onOpenConsultation }: FooterProps) {
  return (
    <footer id="contact" className="relative w-full bg-[#07080A] text-slate-300 border-t border-white/10 pt-16 sm:pt-24 pb-12 sm:pb-16 px-6 sm:px-10 md:px-16 overflow-hidden">
      
      {/* Monumental Watermark Background Lettering N S P ’ across full width */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none select-none overflow-hidden z-0 flex items-end justify-center opacity-[0.07] sm:opacity-[0.10]">
        <div className="w-full flex items-baseline justify-between font-sans font-black tracking-tighter text-[32vw] sm:text-[27vw] leading-none text-white whitespace-nowrap px-2 sm:px-8">
          <span>N</span>
          <span>S</span>
          <span>P</span>
          <span className="text-[#5F1358] font-serif text-[22vw] -ml-2 sm:-ml-6 opacity-80">’</span>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Live Status Indicator */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-mono text-white/80 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Офис в Москве: партнерский совет на связи</span>
          </div>
        </div>

        {/* Invitation Row */}
        <div className="pb-12 sm:pb-20 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 sm:gap-10">
          <div className="max-w-3xl">
            <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Нужен результат в сложном деле?
            </h2>
            <p className="font-mono text-xs sm:text-sm text-slate-400 mt-4 max-w-xl font-light leading-relaxed">
              Обсудите стратегию напрямую с профильным партнером бюро. Первичная консультация проходит в режиме строгой адвокатской тайны.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 flex-shrink-0">
            <button 
              onClick={onOpenConsultation}
              className="relative inline-flex items-center justify-center gap-3 rounded-full bg-white text-[#0A0A0A] hover:bg-[#5F1358] hover:text-white px-6 sm:px-7 py-3.5 sm:py-4 font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-xl active:scale-95 group cursor-pointer"
              data-cursor="action"
              data-cursor-label="встреча"
            >
              <span>Назначить встречу</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="https://t.me/+79687651517" 
              target="_blank" 
              rel="noreferrer"
              className="relative inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 hover:border-[#5F1358] hover:text-[#5F1358] text-white px-5 sm:px-6 py-3.5 sm:py-4 font-mono text-xs font-medium uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer text-center"
              data-cursor="link"
              data-cursor-label="telegram"
            >
              <span>Telegram-приемная</span>
              <span className="text-[10px]">↗</span>
            </a>
          </div>
        </div>

        {/* Hubs Grid with Authentic NSP Data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 py-12 sm:py-16 border-b border-white/10 font-mono text-xs">
          <div>
            <div className="text-white font-sans font-bold uppercase tracking-wider mb-2.5 text-sm">Москва (HQ)</div>
            <p className="leading-relaxed text-slate-400 text-xs">
              Смоленская площадь, д. 3, эт. 14<br />
              БЦ «Смоленский Пассаж»<br />
              <a href="tel:+74956468176" className="text-white hover:text-[#5F1358] transition">+7 (495) 646-81-76</a><br />
              <a href="mailto:welcome@nsplaw.com" className="text-slate-400 hover:text-white transition">welcome@nsplaw.com</a>
            </p>
          </div>

          <div>
            <div className="text-white font-sans font-bold uppercase tracking-wider mb-2.5 text-sm">Москва-Сити</div>
            <p className="leading-relaxed text-slate-400 text-xs">
              Башня Федерация Восток, 45 этаж<br />
              Пресненская набережная, 12<br />
              Хаб корпоративных сделок M&A
            </p>
          </div>

          <div>
            <div className="text-white font-sans font-bold uppercase tracking-wider mb-2.5 text-sm">Yingke Global Network</div>
            <p className="leading-relaxed text-slate-400 text-xs">
              Партнерские офисы в 30+ странах мира:<br />
              Пекин, Шанхай, Дубай (DIFC), Гонконг, Лондон, Женева
            </p>
          </div>

          <div>
            <div className="text-white font-sans font-bold uppercase tracking-wider mb-2.5 text-sm">Адвокатская тайна</div>
            <p className="leading-relaxed text-slate-400 text-[11px]">
              Адвокатская палата г. Москвы, реестровый номер 77/2-337. Деятельность регулируется Федеральным законом № 63-ФЗ.
            </p>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 sm:pt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-400 text-center md:text-left">
          <div>
            © 2006—2026 Адвокатское бюро «Некторов, Савельев и Партнеры» (NSP).
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a href="https://nsplaw.com/career" target="_blank" rel="noreferrer" className="hover:text-[#5F1358] transition">Карьера в NSP</a>
            <span className="text-white/20">•</span>
            <a href="https://t.me/+79687651517" target="_blank" rel="noreferrer" className="hover:text-[#5F1358] transition">Telegram-канал</a>
            <span className="text-white/20">•</span>
            <a href="https://www.youtube.com/channel/UCuHMA6ZFJtYQpbfNAGPOKTQ" target="_blank" rel="noreferrer" className="hover:text-[#5F1358] transition">Видео-канал</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
