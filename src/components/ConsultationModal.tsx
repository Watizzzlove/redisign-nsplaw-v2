import React, { useState } from 'react'
import { X, ArrowRight, CheckCircle2, Lock } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ConsultationModal({ isOpen, onClose }: ModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    practice: 'Сложные судебные и арбитражные споры',
    message: ''
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
    }, 2500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-white border border-black/15 p-7 sm:p-10 shadow-2xl font-mono text-[#0A0A0A] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-black active:scale-90 transition p-1 cursor-pointer"
          data-cursor="action"
          data-cursor-label="закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-[#5F1358]" />
            <h3 className="font-sans text-2xl text-[#0A0A0A] font-bold">Обращение принято</h3>
            <p className="text-xs text-slate-500 max-w-xs font-light leading-relaxed">
              Ваш запрос передан профильному партнеру бюро. Мы свяжемся с вами с соблюдением режима адвокатской тайны.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-[10px] text-[#5F1358] uppercase tracking-widest mb-3 font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>Адвокатская тайна • Полная конфиденциальность</span>
            </div>

            <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight mb-2">
              Конфиденциальный бриф
            </h3>
            <p className="text-xs text-slate-500 font-light mb-8 leading-relaxed">
              Прямое обсуждение задачи с партнером бюро без промежуточных звеньев.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-600 mb-1.5 uppercase tracking-wider text-[10px] font-semibold">
                  Ваше имя или название компании
                </label>
                <input 
                  type="text"
                  required
                  placeholder="Например: ПАО / Руководитель юридического департамента"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-black/10 text-[#0A0A0A] placeholder-slate-400 focus:outline-none focus:border-[#5F1358] transition"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1.5 uppercase tracking-wider text-[10px] font-semibold">
                  Прямой контакт (Telegram / Телефон / Email)
                </label>
                <input 
                  type="text"
                  required
                  placeholder="@telegram_handle или +7 (999) 000-00-00"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-black/10 text-[#0A0A0A] placeholder-slate-400 focus:outline-none focus:border-[#5F1358] transition"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1.5 uppercase tracking-wider text-[10px] font-semibold">
                  Направление задачи
                </label>
                <select
                  value={formData.practice}
                  onChange={(e) => setFormData({ ...formData, practice: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-black/10 text-[#0A0A0A] focus:outline-none focus:border-[#5F1358] transition cursor-pointer"
                >
                  <option>Сложные судебные и арбитражные споры</option>
                  <option>Стратегический M&A и корпоративное право</option>
                  <option>Санкционный комплаенс и разблокировка активов</option>
                  <option>Защита частного капитала и личные фонды</option>
                  <option>Другой конфиденциальный корпоративный вопрос</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 mb-1.5 uppercase tracking-wider text-[10px] font-semibold">
                  Краткие параметры задачи
                </label>
                <textarea 
                  rows={3}
                  placeholder="Юрисдикция, объем спора или параметры готовящейся сделки..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-black/10 text-[#0A0A0A] placeholder-slate-400 focus:outline-none focus:border-[#5F1358] transition resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 rounded-xl bg-[#0A0A0A] text-white font-semibold uppercase tracking-wider text-xs hover:bg-[#5F1358] active:scale-95 transition duration-300 flex items-center justify-center gap-2 mt-4 cursor-pointer"
                data-cursor="action"
                data-cursor-label="отправить"
              >
                <span>Направить обращение партнеру</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
