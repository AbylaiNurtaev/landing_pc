import { useState } from 'react'
import { motion } from 'framer-motion'
import RouletteStandalone from './RouletteStandalone'
import { DEMO_PRIZES } from './RouletteLanding'

export default function Hero() {
  const [spinTrigger, setSpinTrigger] = useState(0)

  const startSpin = () => setSpinTrigger((t) => t + 1)

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Верхняя зона: заголовок и кнопка по центру */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-8 min-h-0">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="scanline absolute inset-0 pointer-events-none" />

        <div className="relative z-10 w-full max-w-xl lg:max-w-none lg:px-4 text-center">
          <motion.h1
            className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl lg:tracking-tight text-white leading-tight mb-6"
            style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Лояльность, которая крутится
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-[var(--color-text-muted)] mb-10 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          >
            Рулетка для компьютерных клубов — награждай игроков, управляй экономикой
          </motion.p>
          <motion.button
            type="button"
            onClick={startSpin}
            className="px-8 py-4 rounded-lg font-semibold text-graphite bg-neon-cyan hover:bg-[#00dde6] transition-colors neon-glow-cyan"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(0,245,255,0.6)' }}
            whileTap={{ scale: 0.98 }}
          >
            Крутить
          </motion.button>
        </div>
      </div>

      {/* Лента рулетки — отдельный блок внизу, в потоке документа */}
      <motion.div
        className="relative z-[1] w-full shrink-0 [&_.rs-wrap]:min-h-0 [&_.rs-wrap]:!py-4 [&_.rs-wrap]:!bg-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <RouletteStandalone
          prizes={DEMO_PRIZES}
          triggerSpinCount={spinTrigger}
          onSpinComplete={() => {}}
        />
      </motion.div>
    </section>
  )
}
