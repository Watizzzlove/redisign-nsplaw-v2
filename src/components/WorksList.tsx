import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

interface Practice {
  num: string
  title: string
  summary: string
  metric: string
  previewImage: string
}

const practices: Practice[] = [
  {
    num: '01',
    title: 'Сложные судебные и арбитражные споры',
    summary: 'Прецедентные процессы в Верховном Суде РФ и ведущих международных арбитражах (HKIAC, DIAC, МКАС). Комплексная защита при субсидиарной ответственности и трансграничных спорах.',
    metric: '₽280+ млрд защищено',
    previewImage: './assets/nsp_hero_femida_concept_1790014641994.jpg',
  },
  {
    num: '02',
    title: 'Сделки, M&A и корпоративное право',
    summary: 'Консолидация стратегических активов, структурирование трансграничных сделок M&A, комплексный Due Diligence и согласование в Правительственной комиссии по иностранным инвестициям.',
    metric: '120+ сделок',
    previewImage: './assets/nsp_ui_homepage_concept_1790014661753.jpg',
  },
  {
    num: '03',
    title: 'Разблокировка активов и санкции',
    summary: 'Практика разблокировки активов в Euroclear и Clearstream: получение индивидуальных лицензий Казначейства Бельгии и Минфина Люксембурга, перевод ценных бумаг в РФ.',
    metric: '98% разблокировано',
    previewImage: './assets/nsp_hero_femida_concept_1790014641994.jpg',
  },
  {
    num: '04',
    title: 'Споры о деприватизации и национализации',
    summary: 'Правовая защита добросовестных собственников и акционеров бизнеса от исков Генеральной прокуратуры об обращении имущества и акций предприятий в доход государства.',
    metric: 'Ключевой фокус',
    previewImage: './assets/nsp_ui_homepage_concept_1790014661753.jpg',
  },
  {
    num: '05',
    title: 'Защита частного капитала и личные фонды',
    summary: 'Индивидуальная архитектура преемственности, структурирование российских личных фондов, защита семейных состояний и активов от недружественных поглощений.',
    metric: 'Конфиденциально',
    previewImage: './assets/nsp_hero_femida_concept_1790014641994.jpg',
  },
  {
    num: '06',
    title: 'Цифровая экономика, IT и ЦФА',
    summary: 'Юридическое структурирование выпусков цифровых финансовых активов (ЦФА), финтех-платформ, блокчейн-решений и трансграничных платежных архитектур.',
    metric: 'Финтех-лидер',
    previewImage: './assets/nsp_ui_homepage_concept_1790014661753.jpg',
  },
]

export function WorksList() {
  const [hoveredPractice, setHoveredPractice] = useState<Practice | null>(null)
  const [activePracticeMobile, setActivePracticeMobile] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleRowClick = (num: string) => {
    setActivePracticeMobile((prev) => (prev === num ? null : num))
  }

  return (
    <section 
      id="practices" 
      onMouseMove={handleMouseMove}
      className="relative w-full bg-white border-t border-hairline py-24 sm:py-32 px-6 sm:px-12 md:px-16"
    >
      {/* Floating Hover Vignette (Desktop) */}
      <AnimatePresence>
        {hoveredPractice && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              left: mousePos.x + 30,
              top: mousePos.y - 100,
              pointerEvents: 'none',
              zIndex: 50,
            }}
            className="hidden lg:block w-80 h-48 rounded-lg overflow-hidden border border-black/10 bg-white shadow-2xl p-1"
          >
            <img 
              src={hoveredPractice.previewImage} 
              alt={hoveredPractice.title} 
              className="w-full h-full object-cover rounded"
            />
            <div className="absolute bottom-2.5 left-2.5 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-white">
              {hoveredPractice.metric}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        
        {/* Unified, Bold Headline: Single font, single weight, increased size, no italics */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-8">
          <h2 className="font-sans text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0A0A0A] max-w-4xl leading-[1.04]">
            Обычные фирмы цитируют законы.<br />
            Сильные — создают прецеденты.
          </h2>
          <p className="font-mono text-xs sm:text-sm text-slate-600 max-w-xs font-normal leading-relaxed">
            Флагманские практики адвокатского бюро NSP. Решаем сложнейшие споры и задачи бизнеса в России и за рубежом.
          </p>
        </div>

        {/* Minimalist Brutalist Table Rows */}
        <div className="border-t border-hairline divide-y divide-hairline">
          {practices.map((item) => {
            const isSelected = activePracticeMobile === item.num
            return (
              <div
                key={item.num}
                onClick={() => handleRowClick(item.num)}
                onMouseEnter={() => setHoveredPractice(item)}
                onMouseLeave={() => setHoveredPractice(null)}
                className={`py-8 sm:py-12 group transition-all duration-300 px-4 -mx-4 rounded-xl cursor-pointer ${
                  isSelected ? 'bg-slate-50' : 'hover:bg-slate-50/70 active:bg-slate-100'
                }`}
                data-cursor="explore"
                data-cursor-label={`кейс ${item.num}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-baseline gap-6 sm:gap-14">
                    <span className="font-mono text-xs sm:text-sm text-slate-400 group-hover:text-[#5F1358] transition-colors font-medium">
                      {item.num}
                    </span>
                    <div>
                      <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0A0A0A] group-hover:text-[#5F1358] transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-mono text-xs text-slate-500 mt-2 max-w-2xl font-light leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 self-start lg:self-center font-mono text-xs">
                    <span className="text-[#0A0A0A] font-semibold tracking-wide">
                      {item.metric}
                    </span>
                    <div className={`w-9 h-9 rounded-full border border-black/15 flex items-center justify-center transition duration-300 ${
                      isSelected 
                        ? 'border-[#5F1358] bg-[#5F1358] text-white rotate-45' 
                        : 'text-slate-700 group-hover:border-[#5F1358] group-hover:bg-[#5F1358] group-hover:text-white'
                    }`}>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Mobile Tap Interactive Preview */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="lg:hidden mt-5 pt-4 border-t border-black/10 overflow-hidden"
                    >
                      <div className="relative h-48 rounded-lg overflow-hidden">
                        <img 
                          src={item.previewImage} 
                          alt={item.title} 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute bottom-2.5 left-2.5 bg-[#5F1358] text-white px-3 py-1 rounded-md text-[11px] font-mono font-bold tracking-wider">
                          {item.metric}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
