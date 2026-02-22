import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type CTAModalContextValue = {
  isOpen: boolean
  openCTAModal: () => void
  closeCTAModal: () => void
}

const CTAModalContext = createContext<CTAModalContextValue | null>(null)

export function CTAModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const openCTAModal = useCallback(() => setIsOpen(true), [])
  const closeCTAModal = useCallback(() => setIsOpen(false), [])

  return (
    <CTAModalContext.Provider value={{ isOpen, openCTAModal, closeCTAModal }}>
      {children}
    </CTAModalContext.Provider>
  )
}

export function useCTAModal() {
  const ctx = useContext(CTAModalContext)
  if (!ctx) throw new Error('useCTAModal must be used within CTAModalProvider')
  return ctx
}
