import { useState, useEffect } from 'react'

const VH_THRESHOLD = 100 // показывать после 100vh

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const checkScroll = () => {
      const vh = window.innerHeight
      const threshold = vh * (VH_THRESHOLD / 100)
      setVisible(window.scrollY > threshold)
    }

    checkScroll()
    window.addEventListener('scroll', checkScroll, { passive: true })
    return () => window.removeEventListener('scroll', checkScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Прокрутить вверх"
        className={`
          fixed bottom-6 right-5 z-50
          md:hidden
          w-12 h-12 rounded-full
          bg-neon-cyan/90 hover:bg-neon-cyan
          text-graphite
          border border-neon-cyan/50
          shadow-[0_0_20px_rgba(0,245,255,0.4)]
          hover:shadow-[0_0_28px_rgba(0,245,255,0.55)]
          transition-all duration-300 ease-out
          flex items-center justify-center
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        `}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </>
  )
}
