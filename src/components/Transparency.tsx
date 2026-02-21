import { motion } from 'framer-motion'
import { Server, Sliders, Gift, ShieldCheck, FileText } from 'lucide-react'

const TILES = [
  { title: 'Результат определяется сервером', Icon: Server },
  { title: 'Настройка вероятностей', Icon: Sliders },
  { title: 'Лимиты призов', Icon: Gift },
  { title: 'Антифрод система', Icon: ShieldCheck },
  { title: 'Полное логирование спинов', Icon: FileText },
]

export default function Transparency() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)] noise">
      <div className="max-w-[var(--container-max)] mx-auto relative z-10">
        <motion.h2
          className="font-heading font-bold text-3xl sm:text-4xl text-white text-center mb-16"
          style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Прозрачность
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.08 }}
        >
          {TILES.map((tile) => (
            <motion.article
              key={tile.title}
              className="p-6 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-lg bg-neon-cyan/10 flex items-center justify-center mx-auto mb-4">
                <tile.Icon className="w-6 h-6 text-neon-cyan" />
              </div>
              <h3 className="font-medium text-[var(--color-text)] text-sm">{tile.title}</h3>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
