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
    answer:
      'Нет. SpinClub — это программа лояльности, встроенная в экосистему компьютерного клуба. Игроки не вносят деньги ради выигрыша — они получают баллы за время, проведённое в клубе, и тратят их на кручение рулетки. Все призы действуют исключительно внутри заведения. Это ближе к «счастливому часу» в кафе, чем к азартной игре.',
  },
  {
    id: '2',
    question: 'Можно ли вывести деньги?',
    answer:
      'Нет. Призы не конвертируются в реальные деньги и не переводятся на карту. Выигрыш — это скидка на следующий сеанс, бонусные часы или внутриклубные бонусы. Всё остаётся внутри клуба, что исключает финансовые риски для обеих сторон.',
  },
  {
    id: '3',
    question: 'Законно ли это?',
    answer:
      'Да. Механика полностью соответствует российскому законодательству: призы носят маркетинговый характер, денежный эквивалент не выплачивается, участие бесплатно для игрока (баллы — это не ставка). Платформа работает как инструмент удержания клиентов, а не как организатор азартных игр.',
  },
  {
    id: '4',
    question: 'Как формируется призовой фонд?',
    answer:
      'Каждый клуб самостоятельно настраивает состав призов, их вероятности и суточные лимиты через административную панель. Владелец видит, сколько призов выдано, на какую сумму, и в любой момент может скорректировать экономику. Система не позволяет клубу уйти в минус — суммирование скидок ограничено, а крупные призы имеют жёсткий дневной лимит.',
  },
]

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="faq" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)]">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          className="font-heading font-bold text-3xl sm:text-4xl text-white text-center mb-12"
          style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Частые вопросы
        </motion.h2>

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
                    <div className="px-5 pb-5 pt-0 text-[var(--color-text-muted)] text-sm border-t border-[var(--color-border)] pt-4 -mt-1">
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
