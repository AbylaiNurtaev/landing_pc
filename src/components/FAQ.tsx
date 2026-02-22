import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  id: string
  question: string
  answer: string
}

const FAQ_DATA: FAQItem[] = [
  {
    id: '1',
    question: 'Это казино?',
    answer: 'Нет. Это программа лояльности. Деньги не выводятся, только бонусы и призы внутри клубов.',
  },
  {
    id: '2',
    question: 'Можно вывести деньги?',
    answer: 'Нет. Можно только тратить бонусы/призы по правилам системы.',
  },
  {
    id: '3',
    question: 'Как я получаю баллы?',
    answer: 'За активность: посещения, пополнения, покупки — зависит от настроек акции.',
  },
  {
    id: '4',
    question: 'Клуб может настроить правила?',
    answer:
      'Да. Лимиты, призы, вероятности и правила оплаты бонусами настраиваются.',
  },
]

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="faq" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)]">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          className="font-heading font-bold text-3xl sm:text-4xl text-white text-center mb-2"
          style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          FAQ
        </motion.h2>
        <motion.p
          className="text-center text-[var(--color-text-muted)] text-sm mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Простыми словами
        </motion.p>

        <div className="space-y-3">
          {FAQ_DATA.map((item) => (
            <motion.div
              key={item.id}
              className="rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] overflow-hidden"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <button
                type="button"
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-medium text-[var(--color-text)] pr-4">{item.question}</span>
                <motion.span
                  animate={{ rotate: openId === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 text-neon-cyan"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-4 text-[var(--color-text-muted)] text-sm border-t border-[var(--color-border)] -mt-1">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
