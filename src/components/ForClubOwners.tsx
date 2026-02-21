import { motion } from 'framer-motion'
import { TrendingUp, BarChart3, Coins, Users } from 'lucide-react'

const FEATURES = [
  { title: 'Контроль экономики клуба', Icon: Coins },
  { title: 'Аналитика по спинам (club_id)', Icon: BarChart3 },
  { title: 'Настройка призового фонда', Icon: TrendingUp },
  { title: 'Удержание аудитории', Icon: Users },
]

export default function ForClubOwners() {
  const scrollToCTA = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
  }

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
            <p className="text-[var(--color-text-muted)] text-lg">
              Проблема: игроки уходят в конкурирующие клубы. Решение: рулетка лояльности увеличивает возврат и LTV.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="px-6 py-4 rounded-xl bg-[var(--color-surface-elevated)] border border-neon-cyan/20">
                <div className="text-2xl font-heading font-bold text-neon-cyan" style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}>
                  ↑ 34%
                </div>
                <div className="text-sm text-[var(--color-text-muted)]">LTV</div>
              </div>
              <div className="px-6 py-4 rounded-xl bg-[var(--color-surface-elevated)] border border-neon-orange/20">
                <div className="text-2xl font-heading font-bold text-neon-orange" style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}>
                  ↑ 28%
                </div>
                <div className="text-sm text-[var(--color-text-muted)]">Возврат игроков</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:border-neon-cyan/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center flex-shrink-0">
                  <f.Icon className="w-5 h-5 text-neon-cyan" />
                </div>
                <span className="font-medium text-[var(--color-text)]">{f.title}</span>
              </div>
            ))}
            <motion.button
              type="button"
              onClick={scrollToCTA}
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
