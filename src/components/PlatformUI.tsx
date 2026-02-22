import { motion } from 'framer-motion'

const YOUTUBE_VIDEO_ID = 'saDgG7Piurk'

export default function PlatformUI() {
  return (
    <section id="platform" className="relative py-24 overflow-hidden">
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 mb-12 min-h-[4.5rem] flex items-center justify-center">
        <motion.p
          className="font-heading font-bold text-3xl sm:text-4xl text-white text-center"
          style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          Видео обзор
        </motion.p>
      </div>

      <motion.div
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[var(--color-border)] shadow-xl bg-[var(--color-surface)]">
          <iframe
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0`}
            title="Видео обзор платформы"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
