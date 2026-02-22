import { motion } from 'framer-motion'
import { QrCode, Wallet, RotateCw, Gift } from 'lucide-react'

const STEPS = [
  {
    number: 1,
    title: 'Регистрация',
    description: 'QR-код на стойке',
    Icon: QrCode,
  },
  {
    number: 2,
    title: 'Пополнение баланса',
    description: 'Баллы за время в клубе',
    Icon: Wallet,
  },
  {
    number: 3,
    title: 'Крути рулетку',
    description: 'На экране рецепшна в реальном времени',
    Icon: RotateCw,
  },
  {
    number: 4,
    title: 'Получай приз',
    description: 'Скидки, часы, бонусы',
    Icon: Gift,
  },
]

const PRIZE_TYPES = [
  { label: 'Скидки', value: 35, color: 'bg-neon-cyan' },
  { label: 'Бонус-часы', value: 45, color: 'bg-neon-orange' },
  { label: 'Денежные бонусы', value: 20, color: 'bg-white' },
]

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[var(--container-max)] mx-auto">
        <motion.h2
          className="font-heading font-bold text-3xl sm:text-4xl text-white text-center mb-16"
          style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Как это работает
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-20"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {STEPS.map((step) => (
            <motion.article
              key={step.number}
              className="relative flex flex-col items-center text-center"
              variants={item}
            >
              <div className="relative w-16 h-16 rounded-full bg-[var(--color-surface-elevated)] border border-neon-cyan/30 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,245,255,0.2)]">
                <step.Icon className="w-7 h-7 text-neon-cyan" />
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-neon-cyan text-graphite font-heading font-bold text-sm flex items-center justify-center">{step.number}</span>
              </div>
              <h3 className="font-heading font-semibold text-xl text-white mb-2" style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}>
                {step.title}
              </h3>
              <p className="text-[var(--color-text-muted)] text-sm">{step.description}</p>
              {step.number < STEPS.length && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-neon-cyan/50 to-transparent" />
              )}
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {PRIZE_TYPES.map((prize) => (
            <div
              key={prize.label}
              className="bg-[var(--color-surface-elevated)] rounded-xl p-6 border border-[var(--color-border)]"
            >
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[var(--color-text)] font-medium">{prize.label}</span>
                <span className="text-[var(--color-text-muted)]">{prize.value}%</span>
              </div>
              <div className="h-2 bg-[var(--color-surface)] rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${prize.color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${prize.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
