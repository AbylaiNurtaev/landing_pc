import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCTAModal } from '../context/CTAModalContext'
import { ChevronDown } from 'lucide-react'
import priz3 from '../assets/priz3.jpg'
import prize5 from '../assets/prize5.png'
import priz6 from '../assets/priz6.png'
import plus1hour from '../assets/+1hour.png'
import sale from '../assets/sale.png'
import group2900 from '../assets/Group 2900.png'

const PRIZES = [
  { id: 'balance', title: 'Бонусы на баланс', description: 'Можно оплатить часть игры.', image: priz6 },
  { id: 'hours', title: 'Бесплатные часы', description: '30 мин / 1 час / пакеты.', image: plus1hour },
  { id: 'discounts', title: 'Скидки', description: 'Растут от активности (чем больше играешь, тем выгоднее).', image: sale },
  { id: 'digital', title: 'Digital-призы', description: 'Промо, скины, подписки (если включено).', image: prize5 },
  { id: 'rare', title: 'Редкие призы', description: 'Лимитированные награды (редко, но приятно).', image: priz3 },
  { id: 'clubs', title: 'Для компьютерных клубов', description: 'Все виды призов в одном месте.', image: group2900 },
] as const

type PrizeId = (typeof PRIZES)[number]['id']

export default function ForClubOwners() {
  const { openCTAModal } = useCTAModal()
  const [selectedId, setSelectedId] = useState<PrizeId>('balance')
  const [openId, setOpenId] = useState<PrizeId | null>(null)
  const selected = PRIZES.find((p) => p.id === selectedId) ?? PRIZES[0]

  return (
    <section id="for-club-owners" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)]">
      <div className="max-w-[var(--container-max)] mx-auto">
        <motion.h2
          className="font-heading font-bold text-3xl sm:text-4xl text-white text-center mb-12"
          style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Какие бывают призы
        </motion.h2>

        {/* Мобильная версия: раскрывающиеся блоки как в FAQ */}
        <div className="lg:hidden space-y-3">
          {PRIZES.map((p) => (
            <motion.div
              key={p.id}
              className="rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] overflow-hidden"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <button
                type="button"
                onClick={() => setOpenId(openId === p.id ? null : p.id)}
                className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex flex-col gap-0.5 text-left min-w-0">
                  <span className="font-semibold text-[var(--color-text)]">{p.title}</span>
                  <span className="text-sm text-[var(--color-text-muted)]">{p.description}</span>
                </div>
                <motion.span
                  animate={{ rotate: openId === p.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 text-neon-cyan"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openId === p.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-0 border-t border-[var(--color-border)]">
                      <div className="rounded-lg overflow-hidden border border-[var(--color-border)] aspect-[16/10] max-h-[220px] mt-3">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          <motion.button
            type="button"
            onClick={openCTAModal}
            className="w-full mt-6 py-4 rounded-xl font-semibold text-graphite bg-neon-cyan hover:bg-[#00dde6] transition-colors shadow-[0_0_25px_rgba(0,245,255,0.4)]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Оставить заявку
          </motion.button>
        </div>

        {/* Десктоп: сетка — слева фото, справа список (без изменений) */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Слева — фото выбранного приза */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl overflow-hidden border border-[var(--color-border)] aspect-[16/10] max-h-[280px] sm:max-h-[340px]"
              >
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <p className="text-[var(--color-text-muted)] text-sm text-center lg:text-left">
              Набор призов и вероятности настраиваются админом платформы.
            </p>
          </motion.div>

          {/* Справа — блоки по названию призов */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {PRIZES.map((p) => (
              <button
                type="button"
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`w-full flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 rounded-xl bg-[var(--color-surface-elevated)] border text-left transition-colors cursor-pointer ${
                  selectedId === p.id
                    ? 'border-neon-cyan bg-neon-cyan/5'
                    : 'border-[var(--color-border)] hover:border-neon-cyan/30'
                }`}
              >
                <span className="font-semibold text-[var(--color-text)]">{p.title}</span>
                <span className="text-sm text-[var(--color-text-muted)]">{p.description}</span>
              </button>
            ))}
            <motion.button
              type="button"
              onClick={openCTAModal}
              className="w-full mt-6 py-4 rounded-xl font-semibold text-graphite bg-neon-cyan hover:bg-[#00dde6] transition-colors shadow-[0_0_25px_rgba(0,245,255,0.4)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Оставить заявку
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
