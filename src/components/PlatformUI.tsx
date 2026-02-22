import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ruletImg from '../assets/rulet.png'
import clubImg from '../assets/club.png'
import adminImg from '../assets/admin.png'

const SCREENSHOT_CARDS = [
  { id: 'rulet', title: 'Экран рулетки', description: 'Интерактивная рулетка для игроков с реальным временем и ставками', image: ruletImg },
  { id: 'club', title: 'Кабинет клуба', description: 'Управление клубом, статистика и настройки для владельцев', image: clubImg },
  { id: 'admin', title: 'Админ-панель', description: 'Полный контроль системы: пользователи, клубы и модерация', image: adminImg },
]

const AUTOPLAY_MS = 3000

export default function PlatformUI() {
  const [index, setIndex] = useState(0)
  const card = SCREENSHOT_CARDS[index]

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i === SCREENSHOT_CARDS.length - 1 ? 0 : i + 1))
    }, AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="platform" className="relative py-24 overflow-hidden">
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 mb-12 min-h-[4.5rem] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={card.id}
            className="font-heading font-bold text-3xl sm:text-4xl text-white text-center"
            style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {card.description}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Слайдер скриншотов — высота адаптивная: мобилка компактно, ПК больше */}
      <div className="w-full max-w-5xl mx-auto h-[200px] md:h-[340px] lg:h-[520px] xl:h-[600px] relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={card.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full overflow-hidden md:rounded-xl md:border md:border-[var(--color-border)] md:shadow-xl"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-contain object-center bg-transparent md:bg-[var(--color-surface)]"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
