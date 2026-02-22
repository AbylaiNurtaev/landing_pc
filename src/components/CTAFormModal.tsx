import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useCTAModal } from '../context/CTAModalContext'
import { CTAFormContent } from './CTAForm'

export default function CTAFormModal() {
  const { isOpen, closeCTAModal } = useCTAModal()

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCTAModal()
    }
    window.addEventListener('keydown', onEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onEscape)
    }
  }, [isOpen, closeCTAModal])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            role="presentation"
            aria-hidden
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCTAModal}
          />
          <div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
            aria-modal
            aria-labelledby="cta-modal-title"
          >
            <motion.div
              role="dialog"
              className="pointer-events-auto w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--color-graphite)] border border-neon-cyan/30 shadow-[0_0_60px_rgba(0,245,255,0.15)] flex flex-col"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-5 pb-2 bg-[var(--color-graphite)] border-b border-[var(--color-border)]">
                <h2
                  id="cta-modal-title"
                  className="font-heading font-bold text-xl sm:text-2xl text-white pr-2"
                  style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}
                >
                  Подключить рулетку к своему клубу
                </h2>
                <button
                  type="button"
                  onClick={closeCTAModal}
                  className="flex-shrink-0 p-2 rounded-lg text-[var(--color-text-muted)] hover:text-white hover:bg-white/10 transition-colors touch-manipulation"
                  aria-label="Закрыть"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
              <div className="p-4 sm:p-6">
                <CTAFormContent idPrefix="modal" onSuccess={closeCTAModal} />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
