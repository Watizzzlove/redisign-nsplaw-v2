import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

interface ServicesAndNewsProps {
  onOpenConsultation?: () => void
}

export function ServicesAndNewsSection({ onOpenConsultation }: ServicesAndNewsProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  // Primary services from screenshot 3
  const coreServices = [
    { id: 'deals', title: 'СДЕЛКИ', desc: 'M&A, реструктуризация холдингов, инвестиционные сделки и венчурный капитал.' },
    { id: 'disputes', title: 'СПОРЫ', desc: 'Комплексные арбитражные споры, международный коммерческий арбитраж, защита в ВС РФ.' },
    { id: 'private-wealth', title: 'ЛИЧНЫЙ КАПИТАЛ', desc: 'Семейные офисы, структурирование частных активов, трансграничное наследование.' },
  ]

  // Special directions from screenshot 3
  const specialDirections = [
    'САНКЦИИ',
    'СПОРЫ О НАЦИОНАЛИЗАЦИИ',
    'МОРСКОЕ ПРАВО',
    'ТУРЕЦКОЕ НАПРАВЛЕНИЕ',
    'РАЗБЛОКИРОВКА АКТИВОВ',
    'ЦИФРОВАЯ ЭКОНОМИКА И ИТ',
  ]

  // Actual news items from screenshots 4 & 5
  const newsItems = [
    {
      id: 1,
      date: '1 сентября 2026 г.',
      category: 'NSP | Новости',
      title: 'Партнеры NSP встретились с президентом ФПА РФ Светланой Володиной',
      variant: 'white-with-side-image',
      image: './assets/news_skyscraper.jpg',
    },
    {
      id: 2,
      date: '7 сентября 2026 г.',
      category: 'NSP | Новости',
      title: 'Разблокировка активов: главные новости с начала лета',
      variant: 'plum', // solid #5F1358
    },
    {
      id: 3,
      date: '8 сентября 2026 г.',
      category: 'NSP | Мероприятия',
      title: 'Приглашаем вас на космический процесс по инвестиционному арбитражу',
      variant: 'charcoal', // #23272A
    },
    {
      id: 4,
      date: '10 сентября 2026 г.',
      category: null,
      title: 'Национализация активов: итоги 8 месяцев 2026 года',
      variant: 'white-simple',
    },
    {
      id: 5,
      date: '14 сентября 2026 г.',
      category: 'NSP | Новости',
      title: 'Меры поддержки продавцов Wildberries, пострадавших от атак БПЛА',
      variant: 'plum',
    },
    {
      id: 6,
      date: '18 сентября 2026 г.',
      category: 'NSP | Новости',
      title: 'NSP сопровождало облачного провайдера Selectel в сделке по приобретению компании M1Cloud (ООО "Стек Групп")',
      variant: 'white-with-top-image',
      image: './assets/news_lighthouse.jpg',
    },
  ]

  return (
    <section id="practices" className="w-full bg-white text-[#0A0A0A] py-16 sm:py-24 px-6 sm:px-10 md:px-16 border-t border-black/10">
      <div className="max-w-7xl mx-auto">

        {/* 1. Услуги (Core Services) */}
        <div className="mb-14 sm:mb-18">
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-[#5F1358] tracking-tight mb-8">
            Услуги
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {coreServices.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  setSelectedService(selectedService === service.id ? null : service.id)
                  if (onOpenConsultation) onOpenConsultation()
                }}
                data-cursor="action"
                data-cursor-label="услуга"
                className="group relative bg-[#5F1358] hover:bg-[#4d0f47] text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] flex flex-col justify-between min-h-[110px] sm:min-h-[140px]"
              >
                <div className="w-full flex items-center justify-center">
                  <span className="font-sans font-bold text-lg sm:text-xl md:text-2xl uppercase tracking-wider">
                    {service.title}
                  </span>
                </div>
                <div className="mt-3 text-xs sm:text-sm text-white/80 font-normal leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                  {service.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Специальные направления (Special Directions) */}
        <div className="mb-20 sm:mb-28">
          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-black text-[#5F1358] tracking-tight mb-6 sm:mb-8">
            Специальные направления
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
            {specialDirections.map((dir, idx) => (
              <button
                key={idx}
                onClick={onOpenConsultation}
                data-cursor="explore"
                data-cursor-label="практика"
                className="bg-[#EFE5ED] hover:bg-[#E4D4E1] text-[#5F1358] font-sans font-bold text-xs sm:text-sm uppercase tracking-wider py-4 sm:py-5 px-5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 text-center flex items-center justify-center"
              >
                {dir}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Актуальное (News & Events Grid) */}
        <div>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-[#5F1358] tracking-tight mb-8 sm:mb-10">
            Актуальное
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            {newsItems.map((item) => {
              if (item.variant === 'white-with-side-image') {
                return (
                  <div
                    key={item.id}
                    onClick={onOpenConsultation}
                    data-cursor="link"
                    data-cursor-label="читать"
                    className="cursor-pointer bg-white border border-black/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between min-h-[340px] hover:shadow-xl hover:border-black/20 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between font-mono text-xs text-slate-500 mb-5">
                      <span>{item.date}</span>
                      {item.category && <span className="underline text-slate-700 font-medium">{item.category}</span>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center flex-1">
                      <div className="sm:col-span-7">
                        <h3 className="font-sans text-base sm:text-lg font-bold text-[#0A0A0A] leading-snug group-hover:text-[#5F1358] transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      <div className="sm:col-span-5 aspect-square overflow-hidden rounded-xl bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-mono text-[#5F1358] font-semibold">
                      <span>Подробнее</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                )
              }

              if (item.variant === 'plum') {
                return (
                  <div
                    key={item.id}
                    onClick={onOpenConsultation}
                    data-cursor="link"
                    data-cursor-label="читать"
                    className="cursor-pointer bg-[#5F1358] text-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between min-h-[340px] hover:shadow-xl hover:bg-[#520f4c] transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between font-mono text-xs text-white/80 mb-5">
                      <span>{item.date}</span>
                      {item.category && <span className="underline text-white font-medium">{item.category}</span>}
                    </div>

                    <div className="flex-1 flex items-center">
                      <h3 className="font-sans text-lg sm:text-xl font-bold text-white leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/90 font-semibold">
                      <span>Спецматериал</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                )
              }

              if (item.variant === 'charcoal') {
                return (
                  <div
                    key={item.id}
                    onClick={onOpenConsultation}
                    data-cursor="link"
                    data-cursor-label="регистрация"
                    className="cursor-pointer bg-[#23272A] text-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between min-h-[340px] hover:shadow-xl hover:bg-[#1a1d20] transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between font-mono text-xs text-slate-400 mb-5">
                      <span>{item.date}</span>
                      {item.category && <span className="underline text-white font-medium">{item.category}</span>}
                    </div>

                    <div className="flex-1 flex items-center">
                      <h3 className="font-sans text-lg sm:text-xl font-bold text-white leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-300 font-semibold">
                      <span>Регистрация участников</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                )
              }

              if (item.variant === 'white-simple') {
                return (
                  <div
                    key={item.id}
                    onClick={onOpenConsultation}
                    data-cursor="link"
                    data-cursor-label="читать"
                    className="cursor-pointer bg-white border border-black/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between min-h-[340px] hover:shadow-xl hover:border-black/20 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between font-mono text-xs text-slate-500 mb-5">
                      <span>{item.date}</span>
                      <span className="font-mono text-slate-400">Аналитический отчет</span>
                    </div>

                    <div className="flex-1 flex items-center">
                      <h3 className="font-sans text-lg sm:text-xl font-bold text-[#0A0A0A] leading-snug group-hover:text-[#5F1358] transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-mono text-[#5F1358] font-semibold">
                      <span>Читать исследование</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                )
              }

              if (item.variant === 'white-with-top-image') {
                return (
                  <div
                    key={item.id}
                    onClick={onOpenConsultation}
                    data-cursor="link"
                    data-cursor-label="читать"
                    className="cursor-pointer bg-white border border-black/10 rounded-2xl overflow-hidden flex flex-col justify-between min-h-[340px] hover:shadow-xl hover:border-black/20 transition-all duration-300 group"
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                      <div className="flex items-center justify-between font-mono text-xs text-slate-500 mb-3">
                        <span>{item.date}</span>
                        {item.category && <span className="underline text-slate-700 font-medium">{item.category}</span>}
                      </div>

                      <h3 className="font-sans text-base sm:text-lg font-bold text-[#0A0A0A] leading-snug group-hover:text-[#5F1358] transition-colors mb-4">
                        {item.title}
                      </h3>

                      <div className="pt-3 border-t border-black/5 flex items-center justify-between text-xs font-mono text-[#5F1358] font-semibold">
                        <span>Пресс-релиз</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                )
              }

              return null
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
