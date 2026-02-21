import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

interface FormData {
  clubName: string
  city: string
  phone: string
  email: string
}

const phoneRegex = /^(\+7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/

export default function CTAForm() {
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
  }

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

        <motion.div
          className="rounded-2xl bg-[var(--color-surface-elevated)] border border-neon-cyan/30 p-8 shadow-[0_0_40px_rgba(0,245,255,0.08)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {isSubmitSuccessful ? (
            <motion.div
              className="flex flex-col items-center justify-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
              >
                <CheckCircle className="w-16 h-16 text-neon-cyan" />
              </motion.div>
              <p className="mt-4 text-lg font-medium text-[var(--color-text)]">Заявка отправлена</p>
              <p className="text-sm text-[var(--color-text-muted)]">Мы свяжемся с вами в ближайшее время.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label htmlFor="clubName" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                  Название клуба *
                </label>
                <input
                  id="clubName"
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
                <label htmlFor="city" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                  Город *
                </label>
                <input
                  id="city"
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
                <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                  Телефон *
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register('phone', {
                    required: 'Обязательное поле',
                    pattern: { value: phoneRegex, message: 'Введите корректный номер' },
                  })}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan"
                  placeholder="+7 (999) 123-45-67"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-neon-orange">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                  Email *
                </label>
                <input
                  id="email"
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
      </div>
    </section>
  )
}
