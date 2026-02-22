import { motion } from 'framer-motion'
import { QrCode, Wallet, RotateCw } from 'lucide-react'

const STEPS = [
  {
    number: 1,
    title: 'Регистрируешься',
    description: 'Создаёшь аккаунт за 30 секунд.',
    Icon: QrCode,
  },
  {
    number: 2,
    title: 'Играешь и пополняешь баланс',
    description: 'За активность или покупки получаешь бонусы/баллы (как в любой системе лояльности).',
    Icon: Wallet,
  },
  {
    number: 3,
    title: 'Крутишь рулетку и получаешь приз',
    description: 'Выигрываешь: бонусные тенге на баланс, бесплатные часы, скидки, призы/скины (если подключены).',
    Icon: RotateCw,
  },
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
        <motion.p
          className="text-[var(--color-text-muted)] text-center text-lg mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Для игрока — 3 шага
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 mb-10"
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

        <motion.p
          className="text-[var(--color-text-muted)] text-center text-sm max-w-xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Призы используются внутри клубов. Никаких «выводов на карту».
        </motion.p>
      </div>
    </section>
  )
}
