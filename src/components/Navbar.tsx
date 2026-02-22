import { motion } from 'framer-motion'
import { useCTAModal } from '../context/CTAModalContext'

export default function Navbar() {
  const { openCTAModal } = useCTAModal()

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'rgba(13, 13, 15, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-[var(--container-max)] mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-1 font-heading font-bold text-xl tracking-tight">
          <span className="text-neon-cyan" style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}>
            SPIN
          </span>
          <span className="text-white" style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}>
            CLUB
          </span>
        </a>
        <motion.button
          type="button"
          onClick={openCTAModal}
          className="px-5 py-2.5 rounded-lg font-medium text-graphite bg-neon-cyan hover:bg-[#00dde6] transition-colors shadow-[0_0_20px_rgba(0,245,255,0.4)]"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Оставить заявку
        </motion.button>
      </div>
    </nav>
  )
}
