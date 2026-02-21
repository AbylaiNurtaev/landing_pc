import { motion } from 'framer-motion'
import { Shield, Layers, Percent, Clock } from 'lucide-react'

const PROTECTIONS = [
  { title: 'Ограничение бонусов', description: 'Лимиты на максимальный бонус за период', Icon: Shield },
  { title: 'Приоритет механик', description: 'Сначала списываются бонусы, потом оплата', Icon: Layers },
  { title: 'Скидки не суммируются', description: 'Одна скидка за визит', Icon: Percent },
  { title: 'Лимит призов в сутки', description: 'Защита от злоупотреблений', Icon: Clock },
]

export default function Economy() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[var(--container-max)] mx-auto">
        <motion.h2
          className="font-heading font-bold text-3xl sm:text-4xl text-white text-center mb-12"
          style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Клуб никогда не уходит в минус
        </motion.h2>

        <motion.div
          className="max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-2 rounded-2xl overflow-hidden border border-neon-cyan/30 shadow-[0_0_30px_rgba(0,245,255,0.15)]">
            <div className="bg-[var(--color-surface-elevated)] p-8 text-center border-r border-[var(--color-border)]">
              <div className="font-heading font-bold text-4xl text-neon-cyan mb-1" style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}>
                5000
              </div>
              <div className="text-sm text-[var(--color-text-muted)]">Базовый фонд</div>
            </div>
            <div className="bg-[var(--color-surface-elevated)] p-8 text-center">
              <div className="font-heading font-bold text-4xl text-neon-orange mb-1" style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}>
                5000
              </div>
              <div className="text-sm text-[var(--color-text-muted)]">Бонусный фонд</div>
            </div>
          </div>
          <p className="text-center text-[var(--color-text-muted)] mt-4 text-sm">
            Модель 5000 + 5000 — разделение призового фонда для контроля экономики
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {PROTECTIONS.map((p) => (
            <motion.div
              key={p.title}
              className="p-6 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:border-neon-cyan/40 transition-colors"
              whileHover={{ y: -4 }}
            >
              <div className="w-12 h-12 rounded-lg bg-neon-cyan/10 flex items-center justify-center mb-4">
                <p.Icon className="w-6 h-6 text-neon-cyan" />
              </div>
              <h3 className="font-heading font-semibold text-white mb-2" style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}>
                {p.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">{p.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
