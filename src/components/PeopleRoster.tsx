import { useState } from 'react'
import { Copy, Check, Send } from 'lucide-react'

interface Partner {
  name: string
  title: string
  focus: string
  email: string
  telegram: string
}

const partnersList: Partner[] = [
  {
    name: 'Александр Некторов',
    title: 'Управляющий партнер, адвокат',
    focus: 'Сложные судебные процессы, стратегическая защита корпоративных активов, санкционный комплаенс.',
    email: 'a.nektorov@nsplaw.com',
    telegram: 'nektorov_nsp',
  },
  {
    name: 'Илья Рачков',
    title: 'Партнер, адвокат, д.ю.н.',
    focus: 'Международный коммерческий и инвестиционный арбитраж, споры в ВТО, трансграничные разбирательства.',
    email: 'i.rachkov@nsplaw.com',
    telegram: 'rachkov_nsp',
  },
  {
    name: 'Роман Макаров',
    title: 'Партнер, адвокат, руководитель судебной практики',
    focus: 'Прецедентные арбитражные процессы в Верховном Суде РФ, субсидиарная ответственность, дела о банкротстве.',
    email: 'r.makarov@nsplaw.com',
    telegram: 'makarov_nsp',
  },
  {
    name: 'Михаил Халецкий',
    title: 'Партнер, адвокат, руководитель корпоративной практики и M&A',
    focus: 'Стратегические сделки слияний и поглощений, реструктуризация холдингов, комплексный Due Diligence.',
    email: 'm.khaletsky@nsplaw.com',
    telegram: 'khaletsky_nsp',
  },
  {
    name: 'Арам Григорян',
    title: 'Партнер, адвокат',
    focus: 'Санкционное регулирование, разблокировка активов в депозитариях ЕС, трансграничные расчеты.',
    email: 'a.grigoryan@nsplaw.com',
    telegram: 'grigoryan_nsp',
  },
]

export function PeopleRoster() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email)
    setCopiedEmail(email)
    setTimeout(() => setCopiedEmail(null), 2000)
  }

  return (
    <section id="partners" className="relative w-full bg-white border-t border-black/10 py-16 sm:py-28 px-6 sm:px-10 md:px-16 text-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        
        {/* Responsive Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <h2 className="font-sans text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#0A0A0A] max-w-4xl leading-[1.12]">
            Партнеры и руководство бюро.
          </h2>
          <p className="font-mono text-xs sm:text-sm text-slate-600 max-w-xs font-normal leading-relaxed">
            Команда NSP — это адвокаты с многолетним опытом ведения резонансных дел в высших судебных инстанциях.
          </p>
        </div>

        {/* Grid of Partners */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 sm:gap-x-16 gap-y-8 sm:gap-y-10 font-mono">
          {partnersList.map((p) => (
            <div 
              key={p.email}
              className="group py-5 border-b border-black/10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 transition-colors hover:border-[#5F1358]"
              data-cursor="action"
              data-cursor-label="партнер"
            >
              <div>
                <h3 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-[#0A0A0A] group-hover:text-[#5F1358] transition-colors">
                  {p.name}
                </h3>
                <p className="text-xs font-mono text-slate-500 mt-1 font-medium">{p.title}</p>
                <p className="text-xs font-mono text-slate-600 mt-2 font-light max-w-md leading-relaxed">{p.focus}</p>
              </div>

              <div className="flex items-center gap-2.5 text-xs flex-shrink-0 mt-2 sm:mt-0">
                <button
                  onClick={() => handleCopy(p.email)}
                  className="px-3.5 py-1.5 rounded-full border border-black/15 hover:border-[#5F1358] hover:text-[#5F1358] active:scale-95 transition flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedEmail === p.email ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>скопировано</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>email</span>
                    </>
                  )}
                </button>
                <a
                  href={`https://t.me/${p.telegram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-full border border-black/15 hover:border-[#5F1358] hover:text-[#5F1358] active:scale-95 transition flex items-center gap-1"
                >
                  <span>tg</span>
                  <Send className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
