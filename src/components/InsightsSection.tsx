import { ArrowUpRight, BookOpen } from 'lucide-react'

interface InsightItem {
  id: string
  tag: string
  title: string
  summary: string
  url: string
  linkText: string
}

const insights: InsightItem[] = [
  {
    id: 'nationalization',
    tag: 'Флагманское исследование',
    title: 'Национализация и деприватизация активов в России: анализ прецедентов',
    summary: 'Юристы NSP систематизировали все резонансные процессы 2022–2026 гг. по изъятию частного бизнеса в доход государства и сформировали практические рекомендации по защите прав собственников.',
    url: 'https://nationalization.nsplaw.com',
    linkText: 'Изучить карту рисков',
  },
  {
    id: 'euroclear',
    tag: 'Специальная практика',
    title: 'Разблокировка активов частных и институциональных инвесторов в Euroclear',
    summary: 'Комплексный алгоритм работы с европейскими регуляторами (Казначейство Бельгии, Минфин Люксембурга): получение лицензий на перевод ценных бумаг и восстановление доступа к капиталу.',
    url: 'https://assets-unlocking.nsplaw.com',
    linkText: 'Открыть алгоритм разблокировки',
  },
  {
    id: 'turkey',
    tag: 'Аналитический отчет',
    title: 'Российско-турецкий бизнес и трансграничные инвестиции',
    summary: 'Аналитическое исследование NSP по вопросам структурирования трансграничных платежей, учреждения совместных производств в Турции и комплаенс-контроля.',
    url: 'https://nsplaw.com/services/15/75',
    linkText: 'Получить результаты исследования',
  },
  {
    id: 'krt',
    tag: 'Недвижимость & Девелопмент',
    title: 'Споры из комплексного развития территорий (КРТ)',
    summary: 'Практика защиты собственников земельных участков и коммерческих объектов недвижимости при принудительном изъятии под градостроительные проекты.',
    url: 'https://krt.nsplaw.com',
    linkText: 'Правовая позиция по КРТ',
  },
]

export function InsightsSection() {
  return (
    <section id="insights" className="relative w-full bg-white border-t border-black/10 py-16 sm:py-28 px-6 sm:px-10 md:px-16 text-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        
        {/* Unified, Responsive Heading: Compact on mobile */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <h2 className="font-sans text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#0A0A0A] max-w-4xl leading-[1.12]">
            Стратегическая аналитика бюро.
          </h2>
          <p className="font-mono text-xs sm:text-sm text-slate-600 max-w-xs font-normal leading-relaxed">
            Мы не просто ведем процессы, мы формируем аналитическую повестку и открыто делимся экспертизой с бизнесом.
          </p>
        </div>

        {/* 2-Column Grid of Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 font-mono">
          {insights.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="group p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-black/10 bg-[#FAFAF9] hover:bg-white hover:border-[#5F1358] transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl active:scale-[0.98] cursor-pointer"
              data-cursor="link"
              data-cursor-label="отчет"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-5 text-slate-500">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#5F1358] font-bold">
                    {item.tag}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center text-slate-700 group-hover:border-[#5F1358] group-hover:bg-[#5F1358] group-hover:text-white transition duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-[#0A0A0A] group-hover:text-[#5F1358] transition-colors leading-snug mb-3">
                  {item.title}
                </h3>

                <p className="font-mono text-xs text-slate-600 font-light leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-black/10 flex items-center gap-2 text-xs font-semibold text-[#0A0A0A] group-hover:text-[#5F1358] transition-colors">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{item.linkText}</span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
