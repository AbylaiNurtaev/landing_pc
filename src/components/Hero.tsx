import { useState } from 'react'
import { motion } from 'framer-motion'
import RouletteStandalone from './RouletteStandalone'
import { DEMO_PRIZES, WINNABLE_PRIZE_IDS } from './RouletteLanding'

export default function Hero() {
  const [spinTrigger, setSpinTrigger] = useState(0)

  const startSpin = () => setSpinTrigger((t) => t + 1)

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
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

      {/* Текст сверху — увеличен отступ снизу, чтобы кнопка была ближе к рулетке */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-24 pb-10 shrink-0">
        <div className="w-full max-w-xl lg:max-w-none lg:px-4 text-center">
          <motion.h1
            className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl lg:tracking-tight text-white leading-tight mb-6 md:mt-[50px]"
            style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Рулетка бонусов для компьютерных клубов
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl lg:text-base text-[var(--color-text-muted)] max-w-lg lg:max-w-none mx-auto lg:whitespace-nowrap"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          >
            Играй в клубе — получай бонусы — крути рулетку — забирай призы
          </motion.p>
        </div>
      </div>

      {/* Рулетка под текстом (ограничена по высоте, чтобы кнопка оставалась ближе) */}
      <motion.div
        className="relative z-[1] w-full shrink-0 min-h-0 [&_.rs-wrap]:min-h-0 [&_.rs-wrap]:!py-4 [&_.rs-wrap]:!bg-transparent max-h-[320px] sm:max-h-[360px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <RouletteStandalone
          prizes={DEMO_PRIZES}
          winnablePrizeIds={[...WINNABLE_PRIZE_IDS]}
          triggerSpinCount={spinTrigger}
          onSpinComplete={() => {}}
        />
      </motion.div>

      {/* Кнопка Крутить снизу */}
      <div className="relative z-10 flex justify-center px-4 pb-10 pt-4 shrink-0">
        <motion.button
          type="button"
          onClick={startSpin}
          className="px-8 py-4 rounded-lg font-semibold text-graphite bg-neon-cyan hover:bg-[#00dde6] transition-colors neon-glow-cyan"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(0,245,255,0.6)' }}
          whileTap={{ scale: 0.98 }}
        >
          Крутить
        </motion.button>
      </div>
    </section>
  )
}
