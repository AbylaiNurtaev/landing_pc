import { motion } from 'framer-motion'
import { Server, Sliders, ShieldCheck, FileText, Gauge } from 'lucide-react'

const TILES = [
  { title: 'защита от накруток', Icon: ShieldCheck },
  { title: 'лимиты на попытки', Icon: Gauge },
  { title: 'логирование каждого спина', Icon: FileText },
  { title: 'админ-панель с настройками призов и вероятностей', Icon: Sliders },
]

export default function Transparency() {
  return (
    <section id="transparency" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)] noise">
      <div className="max-w-[var(--container-max)] mx-auto relative z-10">
        <motion.h2
          className="font-heading font-bold text-3xl sm:text-4xl text-white text-center mb-8"
          style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Честность и безопасность
        </motion.h2>

        <motion.div
          className="max-w-2xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-[var(--color-text)] mb-2">
            Результат рулетки нельзя подделать.
          </p>
          <p className="text-[var(--color-text-muted)]">
            Потому что выигрыш определяется на сервере, а не на телефоне/компьютере игрока.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
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

        <motion.p
          className="text-center text-sm text-[var(--color-text-muted)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Никаких «скриптов», «подкруток» со стороны игрока.
        </motion.p>
      </div>
    </section>
  )
}
