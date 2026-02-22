import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, BarChart3, Coins, Users } from 'lucide-react'
import { useCTAModal } from '../context/CTAModalContext'

const FEATURES = [
  { id: 'economy', title: 'Контроль экономики клуба', Icon: Coins },
  { id: 'analytics', title: 'Аналитика по спинам (club_id)', Icon: BarChart3 },
  { id: 'prizes', title: 'Настройка призового фонда', Icon: TrendingUp },
  { id: 'retention', title: 'Удержание аудитории', Icon: Users },
] as const

type FeatureId = (typeof FEATURES)[number]['id']

// Временный контент — замените на нужный текст
const FEATURE_CONTENT: Record<FeatureId, { paragraph: string; extra?: React.ReactNode }> = {
  economy: {
    paragraph: 'Проблема: игроки уходят в конкурирующие клубы. Решение: рулетка лояльности увеличивает возврат и LTV.',
    extra: (
      <div className="flex flex-wrap gap-6">
        <div className="px-6 py-4 rounded-xl bg-[var(--color-surface-elevated)] border border-neon-cyan/20">
          <div className="text-2xl font-heading font-bold text-neon-cyan" style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}>↑ 34%</div>
          <div className="text-sm text-[var(--color-text-muted)]">LTV</div>
        </div>
        <div className="px-6 py-4 rounded-xl bg-[var(--color-surface-elevated)] border border-neon-orange/20">
          <div className="text-2xl font-heading font-bold text-neon-orange" style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}>↑ 28%</div>
          <div className="text-sm text-[var(--color-text-muted)]">Возврат игроков</div>
        </div>
      </div>
    ),
  },
  analytics: {
    paragraph: 'Здесь будет текст для блока «Аналитика по спинам (club_id)». Отслеживайте спины по клубу, конверсии и активность игроков в одном месте.',
  },
  prizes: {
    paragraph: 'Здесь будет текст для блока «Настройка призового фонда». Гибко настраивайте призы, веса и лимиты под экономику вашего клуба.',
  },
  retention: {
    paragraph: 'Здесь будет текст для блока «Удержание аудитории». Сегментируйте игроков, стройте воронки и повышайте возвращаемость.',
  },
}

export default function ForClubOwners() {
  const { openCTAModal } = useCTAModal()
  const [selectedId, setSelectedId] = useState<FeatureId>('economy')
  const content = FEATURE_CONTENT[selectedId]

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)]">
      <div className="max-w-[var(--container-max)] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white" style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}>
              Для владельцев
            </h2>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <p className="text-[var(--color-text-muted)] text-lg">
                  {content.paragraph}
                </p>
                {content.extra}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {FEATURES.map((f) => (
              <button
                type="button"
                key={f.id}
                onClick={() => setSelectedId(f.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl bg-[var(--color-surface-elevated)] border text-left transition-colors cursor-pointer ${
                  selectedId === f.id
                    ? 'border-neon-cyan bg-neon-cyan/5'
                    : 'border-[var(--color-border)] hover:border-neon-cyan/30'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center flex-shrink-0">
                  <f.Icon className="w-5 h-5 text-neon-cyan" />
                </div>
                <span className="font-medium text-[var(--color-text)]">{f.title}</span>
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
