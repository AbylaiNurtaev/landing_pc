export default function Footer() {
  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-[var(--container-max)] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <a href="#" className="font-heading font-bold text-lg tracking-tight" style={{ fontFamily: 'Orbitron, Rajdhani, sans-serif' }}>
            <span className="text-neon-cyan">SPIN</span>
            <span className="text-white">CLUB</span>
          </a>
          <span className="text-[var(--color-text-muted)] text-sm hidden sm:inline">
            — Рулетка лояльности для клубов
          </span>
        </div>
        <p className="text-[var(--color-text-muted)] text-sm">
          © 2026 SpinClub. Все права защищены.
        </p>
        <div className="flex gap-6 text-sm">
          <a href="#" className="text-[var(--color-text-muted)] hover:text-neon-cyan transition-colors">
            Политика конфиденциальности
          </a>
          <a href="#" className="text-[var(--color-text-muted)] hover:text-neon-cyan transition-colors">
            Условия использования
          </a>
        </div>
      </div>
    </footer>
  )
}
