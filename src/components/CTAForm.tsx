import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export interface FormData {
  clubName: string
  city: string
  phone: string
  email: string
}

// Казахстан: +7 7XX XXX-XX-XX (мобильные коды 700, 701, 705, 707, 747, 771 и т.д.)
const phoneRegex = /^(\+7|8)?[\s-]?\(?7[0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/

type CTAFormContentProps = {
  onSuccess?: () => void
  idPrefix?: string
  className?: string
}

export function CTAFormContent({ onSuccess, idPrefix = '', className = '' }: CTAFormContentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormData>({
    defaultValues: { clubName: '', city: '', phone: '', email: '' },
  })

  const onSubmit = () => {
    reset()
    onSuccess?.()
  }

  const id = (name: string) => (idPrefix ? `${idPrefix}-${name}` : name)

  return (
    <motion.div
      className={`rounded-2xl bg-[var(--color-surface-elevated)] border border-neon-cyan/30 p-6 sm:p-8 shadow-[0_0_40px_rgba(0,245,255,0.08)] ${className}`}
      initial={idPrefix ? undefined : { opacity: 0, y: 24 }}
      whileInView={idPrefix ? undefined : { opacity: 1, y: 0 }}
      viewport={idPrefix ? undefined : { once: true }}
    >
      {isSubmitSuccessful ? (
        <motion.div
          className="flex flex-col items-center justify-center py-8 sm:py-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          >
            <CheckCircle className="w-14 h-14 sm:w-16 sm:h-16 text-neon-cyan" />
          </motion.div>
          <p className="mt-4 text-base sm:text-lg font-medium text-[var(--color-text)]">Заявка отправлена</p>
          <p className="text-sm text-[var(--color-text-muted)]">Мы свяжемся с вами в ближайшее время.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
          <div>
            <label htmlFor={id('clubName')} className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
              Название клуба *
            </label>
            <input
              id={id('clubName')}
              type="text"
              {...register('clubName', { required: 'Обязательное поле' })}
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan"
              placeholder="Название клуба"
            />
            {errors.clubName && (
              <p className="mt-1 text-sm text-neon-orange">{errors.clubName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor={id('city')} className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
              Город *
            </label>
            <input
              id={id('city')}
              type="text"
              {...register('city', { required: 'Обязательное поле' })}
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan"
              placeholder="Город"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-neon-orange">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label htmlFor={id('phone')} className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
              Телефон *
            </label>
            <input
              id={id('phone')}
              type="tel"
              {...register('phone', {
                required: 'Обязательное поле',
                pattern: { value: phoneRegex, message: 'Введите корректный номер' },
              })}
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan"
              placeholder="+7 (701) 123-45-67"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-neon-orange">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor={id('email')} className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
              Email *
            </label>
            <input
              id={id('email')}
              type="email"
              {...register('email', {
                required: 'Обязательное поле',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Введите корректный email',
                },
              })}
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan"
              placeholder="email@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-neon-orange">{errors.email.message}</p>
            )}
          </div>

          <motion.button
            type="submit"
            className="w-full py-4 rounded-xl font-semibold text-graphite bg-gradient-to-r from-neon-cyan to-[#00dde6] hover:opacity-95 transition-opacity shadow-[0_0_25px_rgba(0,245,255,0.4)]"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            Отправить заявку
          </motion.button>
        </form>
      )}
    </motion.div>
  )
}

export default function CTAForm() {
  return (
    <section id="cta" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <motion.h2
          className="font-heading font-bold text-3xl sm:text-4xl text-white text-center mb-10"
          style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Подключить рулетку к своему клубу
        </motion.h2>
        <CTAFormContent />
      </div>
    </section>
  )
}
