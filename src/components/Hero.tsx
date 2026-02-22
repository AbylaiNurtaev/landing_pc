import { motion } from 'framer-motion'
import RouletteLanding from './RouletteLanding'
import { useCTAModal } from '../context/CTAModalContext'

const SEGMENTS = [
  'Скидка 10%',
  '+1 час',
  'Бонус 500₽',
  'Фри-плей',
  'Скидка 20%',
  '+2 часа',
  'Бонус 200₽',
  'Баллы',
]

export default function Hero() {
  const { openCTAModal } = useCTAModal()

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Верхняя зона: заголовок и колесо — в потоке, не наезжают на ленту */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 px-4 sm:px-6 lg:px-8 pt-24 pb-8 min-h-0">
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
        {/* Radial glow behind wheel */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[80vw] max-w-[600px] h-[80vw] max-h-[600px] rounded-full opacity-40 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div className="scanline absolute inset-0 pointer-events-none" />

        <div className="relative z-10 max-w-xl">
          <motion.h1
            className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6"
            style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Лояльность, которая крутится
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-[var(--color-text-muted)] mb-10 max-w-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          >
            Рулетка для компьютерных клубов — награждай игроков, управляй экономикой
          </motion.p>
          <motion.button
            type="button"
            onClick={openCTAModal}
            className="px-8 py-4 rounded-lg font-semibold text-graphite bg-neon-cyan hover:bg-[#00dde6] transition-colors neon-glow-cyan"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(0,245,255,0.6)' }}
            whileTap={{ scale: 0.98 }}
          >
            Я владелец клуба
          </motion.button>
        </div>

        <motion.div
          className="relative z-10 flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <RouletteWheel />
        </motion.div>
      </div>

      {/* Лента рулетки — отдельный блок внизу, в потоке документа */}
      <motion.div
        className="relative z-[1] w-full shrink-0 [&_.landing-roulette-wrap]:min-h-0 [&_.landing-roulette-wrap]:!py-4 [&_.landing-roulette-wrap]:!bg-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <RouletteLanding />
      </motion.div>
    </section>
  )
}

function RouletteWheel() {
  const segmentAngle = 360 / SEGMENTS.length

  return (
    <motion.div
      className="relative w-64 h-64 sm:w-80 sm:h-80"
      initial={{ rotate: 0 }}
      animate={{
        rotate: 360 * 4 + 45,
      }}
      transition={{
        duration: 6,
        ease: [0.22, 0.61, 0.36, 1],
      }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-[0_0_30px_rgba(0,245,255,0.4)]"
      >
        <defs>
          <linearGradient id="wheelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1d" />
            <stop offset="100%" stopColor="#0D0D0F" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="100" cy="100" r="95" fill="url(#wheelGrad)" stroke="rgba(0,245,255,0.4)" strokeWidth="2" />
        {SEGMENTS.map((label, i) => {
          const startAngle = (i * segmentAngle - 90) * (Math.PI / 180)
          const endAngle = ((i + 1) * segmentAngle - 90) * (Math.PI / 180)
          const x1 = 100 + 95 * Math.cos(startAngle)
          const y1 = 100 + 95 * Math.sin(startAngle)
          const x2 = 100 + 95 * Math.cos(endAngle)
          const y2 = 100 + 95 * Math.sin(endAngle)
          const midAngle = (startAngle + endAngle) / 2
          const tx = 100 + 65 * Math.cos(midAngle)
          const ty = 100 + 65 * Math.sin(midAngle)
          const isAlt = i % 2 === 0
          return (
            <g key={i}>
              <path
                d={`M 100 100 L ${x1} ${y1} A 95 95 0 0 1 ${x2} ${y2} Z`}
                fill={isAlt ? 'rgba(0,245,255,0.12)' : 'rgba(255,107,53,0.12)'}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.5"
              />
              <text
                x={tx}
                y={ty}
                fill="#e8e8ea"
                fontSize="8"
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${(i * segmentAngle + segmentAngle / 2)} ${tx} ${ty})`}
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {label}
              </text>
            </g>
          )
        })}
        <circle cx="100" cy="100" r="18" fill="#0D0D0F" stroke="#00F5FF" strokeWidth="2" filter="url(#glow)" />
        <circle cx="100" cy="100" r="12" fill="#141416" />
      </svg>
    </motion.div>
  )
}
