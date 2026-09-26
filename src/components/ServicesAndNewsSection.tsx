import { useState } from 'react'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { HermesIcon, SocratesIcon, TycheIcon } from './StatueIcons'

interface ServicesAndNewsProps {
  onOpenConsultation?: () => void
}

export function ServicesAndNewsSection({ onOpenConsultation }: ServicesAndNewsProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  // 1. Primary services with custom Greek statue contour icons
  const coreServices = [
    {
      id: 'deals',
      num: '01',
      title: 'СДЕЛКИ',
      desc: 'M&A, реструктуризация холдингов, инвестиционные сделки и венчурный капитал.',
      icon: HermesIcon,
      statueLabel: 'Гермес • Покровитель союзов и соглашений',
    },
    {
      id: 'disputes',
      num: '02',
      title: 'СПОРЫ',
      desc: 'Комплексные арбитражные споры, международный коммерческий арбитраж, защита в ВС РФ.',
      icon: SocratesIcon,
      statueLabel: 'Сократ Мыслящий • Философия судебной защиты',
    },
    {
      id: 'private-wealth',
      num: '03',
      title: 'ЛИЧНЫЙ КАПИТАЛ',
      desc: 'Семейные офисы, структурирование частных активов, трансграничное наследование.',
      icon: TycheIcon,
      statueLabel: 'Тихе / Фортуна • Хранительница наследия',
    },
  ]

  // 2. Special directions (exact content preserved)
  const specialDirections = [
    { num: '01', title: 'САНКЦИИ' },
    { num: '02', title: 'СПОРЫ О НАЦИОНАЛИЗАЦИИ' },
    { num: '03', title: 'МОРСКОЕ ПРАВО' },
    { num: '04', title: 'ТУРЕЦКОЕ НАПРАВЛЕНИЕ' },
    { num: '05', title: 'РАЗБЛОКИРОВКА АКТИВОВ' },
    { num: '06', title: 'ЦИФРОВАЯ ЭКОНОМИКА И ИТ' },
  ]

  // 3. Actual news items & events with original website colors + mobile Bento grid
  const newsItems = [
    {
      id: 1,
      date: '1 сентября 2026 г.',
      category: 'NSP | Новости',
      title: 'Партнеры NSP встретились с президентом ФПА РФ Светланой Володиной',
      image: './assets/news_skyscraper.jpg',
      actionLabel: 'Читать материал',
      theme: 'white',
      isHeroOnMobile: true,
    },
    {
      id: 2,
      date: '7 сентября 2026 г.',
      category: 'NSP | Новости',
      title: 'Разблокировка активов: главные новости с начала лета',
      actionLabel: 'Спецматериал',
      theme: 'plum', // Solid #5F1358
      isHeroOnMobile: false,
    },
    {
      id: 3,
      date: '8 сентября 2026 г.',
      category: 'NSP | Мероприятия',
      title: 'Приглашаем вас на космический процесс по инвестиционному арбитражу',
      actionLabel: 'Регистрация участников',
      theme: 'charcoal', // Solid #23272A
      isHeroOnMobile: false,
    },
    {
      id: 4,
      date: '10 сентября 2026 г.',
      category: 'Аналитический отчет',
      title: 'Национализация активов: итоги 8 месяцев 2026 года',
      actionLabel: 'Читать исследование',
      theme: 'white',
      isHeroOnMobile: false,
    },
    {
      id: 5,
      date: '14 сентября 2026 г.',
      category: 'NSP | Новости',
      title: 'Меры поддержки продавцов Wildberries, пострадавших от атак БПЛА',
      actionLabel: 'Читать материал',
      theme: 'plum', // Solid #5F1358
      isHeroOnMobile: false,
    },
    {
      id: 6,
      date: '18 сентября 2026 г.',
      category: 'NSP | Новости',
      title: 'NSP сопровождало облачного провайдера Selectel в сделке по приобретению компании M1Cloud (ООО "Стек Групп")',
      image: './assets/news_lighthouse.jpg',
      actionLabel: 'Пресс-релиз',
      theme: 'white',
      isHeroOnMobile: true,
    },
  ]

  return (
    <section id="practices" className="w-full bg-white text-[#0A0A0A] py-20 sm:py-28 md:py-36 px-6 sm:px-10 md:px-16 border-t border-black/10">
      <div className="max-w-7xl mx-auto space-y-24 sm:space-y-32 md:space-y-40">

        {/* ========================================================= */}
        {/* 1. БЛОК УСЛУГИ (Airy Brutalism with Greek Statue Contours) */}
        {/* ========================================================= */}
        <div>
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-14">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[#5F1358] font-semibold mb-3">
                [ 01 // УСЛУГИ И ПРАКТИКИ ]
              </div>
              <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl font-black text-[#0A0A0A] tracking-tight leading-none">
                Услуги
              </h2>
            </div>
            <p className="font-mono text-xs sm:text-sm text-slate-500 uppercase tracking-wider max-w-md leading-relaxed">
              Архитектура правовых решений для лидеров рейтинга Forbes и стратегических отраслей экономики
            </p>
          </div>

          {/* 3-Column Architectural Cards with Classical Greek Contour Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {coreServices.map((service) => (
              <div
                key={service.id}
                onClick={() => {
                  setSelectedService(selectedService === service.id ? null : service.id)
                  if (onOpenConsultation) onOpenConsultation()
                }}
                data-cursor="action"
                data-cursor-label="практика"
                className="group relative bg-white border border-black/10 hover:border-black/30 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-[#FAFAF9] flex flex-col justify-between min-h-[360px] sm:min-h-[420px] text-left cursor-pointer"
              >
                {/* Card Top: Number Index + Circular Action Icon */}
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono text-xs sm:text-sm font-semibold text-slate-400 group-hover:text-[#5F1358] tracking-widest transition-colors">
                    {service.num} //
                  </span>
                  <div className="w-9 h-9 rounded-full border border-black/10 group-hover:border-[#5F1358] group-hover:bg-[#5F1358] flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </div>

                {/* Greek Statue Vector Contour Illustration */}
                <div className="my-6 flex items-center justify-between gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#FAFAF9] border border-black/5 group-hover:border-[#5F1358]/20 group-hover:bg-[#5F1358]/5 flex items-center justify-center text-slate-500 group-hover:text-[#5F1358] transition-all duration-300">
                    <service.icon className="w-10 h-10 sm:w-12 sm:h-12" />
                  </div>
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 group-hover:text-slate-600 transition-colors text-right max-w-[140px] leading-tight">
                    {service.statueLabel}
                  </span>
                </div>

                {/* Card Center: Title + Description */}
                <div>
                  <h3 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl text-[#0A0A0A] group-hover:text-[#5F1358] tracking-tight transition-colors mb-4 uppercase">
                    {service.title}
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-slate-600 group-hover:text-slate-900 leading-relaxed font-normal transition-colors">
                    {service.desc}
                  </p>
                </div>

                {/* Card Bottom: Editorial Action */}
                <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-400 group-hover:text-[#5F1358] transition-colors">
                  <span>Обсудить кейс</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. БЛОК СПЕЦИАЛЬНЫЕ НАПРАВЛЕНИЯ (Airy Brutalist Matrix)   */}
        {/* ========================================================= */}
        <div>
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-14">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[#5F1358] font-semibold mb-3">
                [ 02 // СПЕЦИАЛЬНЫЕ НАПРАВЛЕНИЯ ]
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-[#0A0A0A] tracking-tight leading-none">
                Специальные направления
              </h2>
            </div>
            <p className="font-mono text-xs sm:text-sm text-slate-500 uppercase tracking-wider max-w-md leading-relaxed">
              Высокотехнологичные практики быстрого реагирования на санкционные и регуляторные вызовы
            </p>
          </div>

          {/* 3x2 Matrix of Clean Brutalist Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {specialDirections.map((dir) => (
              <div
                key={dir.num}
                onClick={onOpenConsultation}
                data-cursor="explore"
                data-cursor-label="направление"
                className="group bg-white border border-black/10 hover:border-black/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:bg-[#FAFAF9] flex flex-col justify-between min-h-[160px] sm:min-h-[180px] cursor-pointer"
              >
                {/* Top Row: Index + Icon */}
                <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                  <span className="font-semibold text-slate-400 group-hover:text-[#5F1358] tracking-wider transition-colors">
                    [ {dir.num} ]
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-[#5F1358] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                {/* Title */}
                <h4 className="font-sans text-base sm:text-lg md:text-xl font-bold tracking-tight text-[#0A0A0A] group-hover:text-[#5F1358] transition-colors uppercase leading-snug my-3">
                  {dir.title}
                </h4>

                {/* Bottom Row */}
                <div className="flex items-center justify-between pt-3 border-t border-black/5 text-[11px] font-mono text-slate-400 group-hover:text-slate-600 transition-colors uppercase tracking-wider">
                  <span>Специальная практика</span>
                  <span className="text-[#5F1358] opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                    Консультация →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. БЛОК АКТУАЛЬНОЕ (Original Colors + Mobile Bento Grid)   */}
        {/* ========================================================= */}
        <div>
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-14">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[#5F1358] font-semibold mb-3">
                [ 03 // АКТУАЛЬНОЕ И АНАЛИТИКА ]
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0A0A0A] tracking-tight leading-none">
                Актуальное
              </h2>
            </div>
            <p className="font-mono text-xs sm:text-sm text-slate-500 uppercase tracking-wider max-w-md leading-relaxed">
              Новости законодательства, судебные прецеденты, отраслевая аналитика и события бюро
            </p>
          </div>

          {/* Responsive Bento Grid: 2-column compact Bento on mobile, 3-column on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 md:gap-8 items-stretch">
            {newsItems.map((item) => {
              // Styling presets based on original website colors
              const isPlum = item.theme === 'plum'
              const isCharcoal = item.theme === 'charcoal'

              let cardBgClasses = 'bg-white border border-black/10 hover:border-black/30 hover:bg-[#FAFAF9] text-[#0A0A0A]'
              let dateClasses = 'text-slate-400 font-medium'
              let badgeClasses = 'text-[#5F1358] bg-[#5F1358]/5 border border-[#5F1358]/15'
              let titleClasses = 'text-[#0A0A0A] group-hover:text-[#5F1358]'
              let actionClasses = 'text-slate-400 group-hover:text-[#5F1358] border-black/5'

              if (isPlum) {
                cardBgClasses = 'bg-[#5F1358] text-white hover:bg-[#520f4c] border border-[#5F1358] shadow-md'
                dateClasses = 'text-white/70 font-medium'
                badgeClasses = 'text-white bg-white/20 border border-white/30'
                titleClasses = 'text-white'
                actionClasses = 'text-white/80 group-hover:text-white border-white/20'
              } else if (isCharcoal) {
                cardBgClasses = 'bg-[#23272A] text-white hover:bg-[#1a1d20] border border-[#23272A] shadow-md'
                dateClasses = 'text-slate-400 font-medium'
                badgeClasses = 'text-white bg-white/10 border border-white/20'
                titleClasses = 'text-white'
                actionClasses = 'text-slate-300 group-hover:text-white border-white/15'
              }

              // Bento Grid layout: photo cards span 2 columns on mobile, text cards span 1 column
              const bentoColSpan = item.isHeroOnMobile ? 'col-span-2 md:col-span-1' : 'col-span-1 md:col-span-1'
              const bentoPadding = item.isHeroOnMobile
                ? 'p-5 sm:p-7 md:p-8 min-h-[300px] sm:min-h-[340px] md:min-h-[420px]'
                : 'p-4 sm:p-5 md:p-8 min-h-[175px] sm:min-h-[200px] md:min-h-[420px]'

              return (
                <div
                  key={item.id}
                  onClick={onOpenConsultation}
                  data-cursor="link"
                  data-cursor-label="читать"
                  className={`group cursor-pointer rounded-2xl sm:rounded-3xl ${bentoColSpan} ${bentoPadding} ${cardBgClasses} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
                >
                  {/* Meta Top: Date + Category Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 mb-3 sm:mb-5 font-mono text-[10px] sm:text-xs">
                    <span className={`${dateClasses} whitespace-nowrap`}>
                      {item.date}
                    </span>
                    <span className={`font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider px-2 sm:px-2.5 py-0.5 rounded-full shrink-0 w-fit ${badgeClasses}`}>
                      {item.category || 'Аналитический отчет'}
                    </span>
                  </div>

                  {/* Natural Full-Color Architectural Image (NO Grayscale) */}
                  {item.image && (
                    <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100 mb-4 sm:mb-5 border border-black/5">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Headline Title */}
                  <div className="mt-1 mb-auto py-1">
                    <h3 className={`font-sans font-bold leading-snug transition-colors ${titleClasses} ${
                      item.isHeroOnMobile
                        ? 'text-sm sm:text-base md:text-xl'
                        : 'text-xs sm:text-sm md:text-xl line-clamp-3 md:line-clamp-none'
                    }`}>
                      {item.title}
                    </h3>
                  </div>

                  {/* Card Bottom: Action Link */}
                  <div className={`mt-auto pt-3 sm:pt-4 border-t flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-colors ${actionClasses}`}>
                    <span className="truncate mr-2">{item.actionLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom Archive Action Bar */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
              [ АРХИВ ПУБЛИКАЦИЙ И ПРЕЦЕДЕНТОВ С 2006 ГОДА ]
            </span>
            <button
              onClick={onOpenConsultation}
              className="btn-nothin-outline group"
              data-cursor="action"
              data-cursor-label="архив"
            >
              <span>Все новости и аналитика</span>
              <ArrowRight className="w-3.5 h-3.5 arrow-icon" />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
