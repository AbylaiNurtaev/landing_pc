import { motion } from 'framer-motion'
import { RotateCw, Receipt, TrendingUp, Gift, BarChart2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useCTAModal } from '../context/CTAModalContext'

const BENEFITS: { title: string; description: string; Icon: LucideIcon }[] = [
  { title: 'Повторные визиты', description: 'Возвращаемость растёт', Icon: RotateCw },
  { title: 'Средний чек', description: 'Пакеты, апгрейды, доп. покупки', Icon: Receipt },
  { title: 'LTV игрока', description: 'Дольше остаётся с клубом', Icon: TrendingUp },
  { title: 'Готовая механика лояльности', description: 'Без ручных скидок и хаоса', Icon: Gift },
  { title: 'Аналитика', description: 'Кто крутит, когда, какие призы заходят лучше', Icon: BarChart2 },
]

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export default function Economy() {
  const { openCTAModal } = useCTAModal()
  const firstBenefit = BENEFITS[0]
  const FirstIcon = firstBenefit.Icon

  return (
    <section id="economy" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-[var(--container-max)] mx-auto">
        <motion.h2
          className="font-heading font-bold text-3xl sm:text-4xl text-white text-center mb-6"
          style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Почему это выгодно клубу
        </motion.h2>

        <motion.p
          className="text-[var(--color-text-muted)] text-center text-lg max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Рулетка делает главное, игрок возвращается чаще. Потому что ему интересно добивать прогресс, копить скидку и крутить рулетку.
        </motion.p>

        <motion.h3
          className="font-heading font-semibold text-white text-center mb-6 text-xl"
          style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Что получает клуб
        </motion.h3>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Мобилка: 1 колонка. Планшет: 2 колонки. ПК: первый ряд 3 блока, второй ряд 2 по центру */}
          <motion.div
            variants={item}
            className="flex flex-col gap-3 p-5 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:border-neon-cyan/40 transition-colors min-h-[100px] sm:col-span-2 sm:max-w-md sm:mx-auto lg:col-span-1 lg:max-w-none lg:mx-0"
          >
            <span className="shrink-0 w-9 h-9 rounded-lg bg-neon-cyan/15 flex items-center justify-center">
              <FirstIcon className="w-5 h-5 text-neon-cyan" strokeWidth={2} />
            </span>
            <h4 className="font-heading font-semibold text-white text-base" style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}>
              {firstBenefit.title}
            </h4>
            <p className="text-[var(--color-text-muted)] text-sm">{firstBenefit.description}</p>
          </motion.div>
          {BENEFITS.slice(1, 3).map((b) => {
            const Icon = b.Icon
            return (
              <motion.div
                key={b.title}
                variants={item}
                className="flex flex-col gap-3 p-5 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:border-neon-cyan/40 transition-colors min-h-[100px]"
              >
                <span className="shrink-0 w-9 h-9 rounded-lg bg-neon-cyan/15 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-neon-cyan" strokeWidth={2} />
                </span>
                <h4 className="font-heading font-semibold text-white text-base" style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}>
                  {b.title}
                </h4>
                <p className="text-[var(--color-text-muted)] text-sm">{b.description}</p>
              </motion.div>
            )
          })}
          {/* Второй ряд на ПК: flex justify-center */}
          <div className="flex flex-wrap justify-center gap-4 col-span-1 sm:col-span-2 lg:col-span-3">
            {BENEFITS.slice(3, 5).map((b) => {
              const Icon = b.Icon
              return (
                <motion.div
                  key={b.title}
                  variants={item}
                  className="flex flex-col gap-3 p-5 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:border-neon-cyan/40 transition-colors min-h-[100px] w-full sm:max-w-[calc(50%-0.5rem)] lg:w-[calc((100%-2rem)/3)]"
                >
                  <span className="shrink-0 w-9 h-9 rounded-lg bg-neon-cyan/15 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-neon-cyan" strokeWidth={2} />
                  </span>
                  <h4 className="font-heading font-semibold text-white text-base" style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}>
                    {b.title}
                  </h4>
                  <p className="text-[var(--color-text-muted)] text-sm">{b.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            type="button"
            onClick={openCTAModal}
            className="px-8 py-4 rounded-xl font-semibold text-graphite bg-neon-cyan hover:bg-[#00dde6] transition-colors shadow-[0_0_25px_rgba(0,245,255,0.4)]"
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0,245,255,0.5)' }}
            whileTap={{ scale: 0.98 }}
          >
            Подключить клуб
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
