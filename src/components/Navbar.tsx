import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCTAModal } from '../context/CTAModalContext'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '#hero', label: 'Главная' },
  { href: '#how-it-works', label: 'Как это работает' },
  { href: '#for-club-owners', label: 'Владельцам' },
  { href: '#economy', label: 'Экономика' },
  { href: '#transparency', label: 'Честность' },
  { href: '#platform', label: 'Платформа' },
  { href: '#faq', label: 'Вопросы' },
] as const

function scrollToSection(e: React.MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute('href')
  if (href?.startsWith('#')) {
    e.preventDefault()
    const el = document.getElementById(href.slice(1))
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export default function Navbar() {
  const { openCTAModal } = useCTAModal()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    scrollToSection(e)
    setMenuOpen(false)
  }

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
      <div className="max-w-[var(--container-max)] mx-auto flex items-center justify-between gap-4">
        <a href="#hero" onClick={scrollToSection} className="flex items-center gap-1 font-heading font-bold text-xl tracking-tight shrink-0">
          <span className="text-neon-cyan" style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}>
            SPIN
          </span>
          <span className="text-white" style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}>
            CLUB
          </span>
        </a>

        {/* Десктоп: навигация по блокам */}
        <ul className="hidden md:flex items-center gap-1 lg:gap-2 flex-wrap justify-center">
          {NAV_LINKS.filter((l) => l.href !== '#hero').map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={scrollToSection}
                className="px-3 py-2 rounded-lg text-sm text-[var(--color-text-muted)] hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Мобилка: кнопка меню + заявка */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <motion.button
            type="button"
            onClick={openCTAModal}
            className="px-5 py-2.5 rounded-lg font-medium text-graphite bg-neon-cyan hover:bg-[#00dde6] transition-colors shadow-[0_0_20px_rgba(0,245,255,0.4)] shrink-0"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Оставить заявку
          </motion.button>
        </div>
      </div>

      {/* Мобильное выпадающее меню */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden overflow-hidden border-t border-white/10 mt-3 pt-3"
        >
          <ul className="flex flex-col gap-1 pb-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleNavClick}
                  className="block px-4 py-2 rounded-lg text-[var(--color-text-muted)] hover:text-white hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </nav>
  )
}
