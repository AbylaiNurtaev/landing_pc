/**
 * Самодостаточный компонент рулетки для лендинга.
 * Всё в одном файле: логика, демо-призы, стили. Рулетка просто крутится (idle).
 */
import { useState, useEffect, useRef } from 'react'
import comp1 from '../assets/comp1.png'
import comp2 from '../assets/comp2.png'
import comp3 from '../assets/comp3.png'
import group2900 from '../assets/Group 2900.png'
import priz1 from '../assets/priz1.jpg'
import priz2 from '../assets/priz2.jpg'
import priz3 from '../assets/priz3.jpg'
import prize5 from '../assets/prize5.png'
import priz6 from '../assets/priz6.png'
import priz7 from '../assets/priz7.png'
import priz8 from '../assets/priz8.jpg'

// ——— Константы ———
const PRIZE_CARD_WIDTH = 400
const PRIZE_GAP = 24
const PRIZE_WIDTH = PRIZE_CARD_WIDTH + PRIZE_GAP
const IDLE_SPEED_PX = 15.5
const ROULETTE_MIN_COPIES = 50
const ROULETTE_REPLENISH_THRESHOLD = 25
const ROULETTE_REPLENISH_COUNT = 25
const SPIN_DURATION_MS = 4000
const SPIN_EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 3)

// ——— Демо-призы из assets ———
export interface DemoPrize {
  id: string
  name: string
  slotIndex: number
  probability: number
  image: string
}
// Призы, которые могут выпасть при спине (остальные только в ленте для вида)
export const WINNABLE_PRIZE_IDS = ['headphones', 'mouse', 'mat', 'keyboard'] as const

export const DEMO_PRIZES: DemoPrize[] = [
  { id: '1', name: 'Snickers Шоколад', slotIndex: 0, probability: 0.03, image: priz1 },
  { id: 'headphones', name: 'Наушники для компьютерного клуба', slotIndex: 1, probability: 0.25, image: comp1 },
  { id: '2', name: 'Lavina Энергетик', slotIndex: 2, probability: 0.05, image: priz2 },
  { id: 'mouse', name: 'Мышка для компьютерного клуба', slotIndex: 3, probability: 0.25, image: group2900 },
  { id: '3', name: 'Рукав киберспортивный', slotIndex: 4, probability: 0.08, image: priz3 },
  { id: 'mat', name: 'Коврик для компьютерного клуба', slotIndex: 5, probability: 0.25, image: comp2 },
  { id: '5', name: 'CS:GO 2 - Скин Нож', slotIndex: 6, probability: 0.12, image: prize5 },
  { id: 'keyboard', name: 'Клавиатура для компьютерного клуба', slotIndex: 7, probability: 0.25, image: comp3 },
  { id: '6', name: '10.000 Бонусов', slotIndex: 8, probability: 0.15, image: priz6 },
  { id: '7', name: '2000 Бонусов', slotIndex: 9, probability: 0.18, image: priz7 },
  { id: '8', name: 'AVA Лимонад', slotIndex: 10, probability: 0.2, image: priz8 },
]

type PrizeTier = 'red' | 'purple' | 'green' | 'blue' | 'gray'

function getPrizeTier(prize: { probability?: number }): PrizeTier {
  const pct = (prize.probability ?? 0) * 100
  if (pct < 5) return 'red'
  if (pct < 10) return 'purple'
  if (pct < 15) return 'green'
  if (pct <= 20) return 'blue'
  return 'gray'
}

// ——— Стили (цвета лендинга: graphite, neon-cyan, neon-orange, без фона) ———
const LANDING_ROULETTE_CSS = `
.landing-roulette-wrap {
  width: 100%;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  box-sizing: border-box;
  background: transparent;
}
.landing-roulette-wrap .landing-spin-container {
  width: 100%;
  max-width: 100%;
  background: transparent;
  border-radius: 0;
  padding: 20px 0;
  border: none;
}
.landing-roulette-wrap .landing-roulette-section {
  margin: 0;
  width: 100%;
  height: 320px;
  min-height: 280px;
  position: relative;
  overflow: hidden;
}
.landing-roulette-wrap .landing-cs-roulette-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: transparent;
  border-radius: 0;
  padding: 20px 0;
}
.landing-roulette-wrap .landing-cs-roulette-pointer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 100%;
  z-index: 10;
  pointer-events: none;
}
.landing-roulette-wrap .landing-cs-roulette-pointer::before,
.landing-roulette-wrap .landing-cs-roulette-pointer::after {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
.landing-roulette-wrap .landing-cs-roulette-pointer::before {
  top: calc(50% - 120px - 30px);
  border-bottom: none;
  border-top: 22px solid var(--color-neon-cyan);
  filter: drop-shadow(0 2px 8px rgba(0, 245, 255, 0.5));
}
.landing-roulette-wrap .landing-cs-roulette-pointer::after {
  top: calc(50% + 120px + 6px);
  border-top: none;
  border-bottom: 22px solid var(--color-neon-cyan);
  filter: drop-shadow(0 -2px 8px rgba(0, 245, 255, 0.5));
}
@media (max-width: 768px) {
  .landing-roulette-wrap .landing-cs-roulette-pointer::before {
    top: calc(50% - 84px - 24px);
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    border-top: 16px solid var(--color-neon-cyan);
  }
  .landing-roulette-wrap .landing-cs-roulette-pointer::after {
    top: calc(50% + 84px + 10px);
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    border-bottom: 16px solid var(--color-neon-cyan);
  }
}
.landing-roulette-wrap .landing-cs-roulette-track {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.landing-roulette-wrap .landing-cs-roulette-items {
  display: flex;
  align-items: center;
  gap: 24px;
  height: 100%;
  will-change: transform;
  padding: 0 20px;
}
.landing-roulette-wrap .landing-cs-prize-item {
  flex-shrink: 0;
  width: 400px;
  height: 240px;
  padding: 12px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(0, 245, 255, 0.25);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.landing-roulette-wrap .landing-cs-prize-item[data-prize-tier="red"] { border-color: rgba(255, 107, 53, 0.6); box-shadow: 0 0 16px rgba(255, 107, 53, 0.2); }
.landing-roulette-wrap .landing-cs-prize-item[data-prize-tier="purple"] { border-color: rgba(168, 85, 247, 0.5); }
.landing-roulette-wrap .landing-cs-prize-item[data-prize-tier="green"] { border-color: rgba(0, 245, 255, 0.5); }
.landing-roulette-wrap .landing-cs-prize-item[data-prize-tier="blue"] { border-color: rgba(0, 245, 255, 0.5); }
.landing-roulette-wrap .landing-cs-prize-item[data-prize-tier="gray"] { border-color: rgba(255, 255, 255, 0.12); }
.landing-roulette-wrap .landing-cs-prize-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
}
.landing-roulette-wrap .landing-cs-prize-placeholder {
  width: 100%;
  height: 100%;
  min-height: 0;
  font-size: 48px;
  font-weight: 700;
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface);
  border-radius: 8px;
}
.landing-roulette-wrap .landing-cs-prize-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
@media (max-width: 768px) {
  .landing-roulette-wrap .landing-roulette-section { height: 260px; min-height: 220px; }
  .landing-roulette-wrap .landing-cs-roulette-container { padding: 12px 0; }
  .landing-roulette-wrap .landing-cs-prize-item { width: 280px; height: 168px; }
  .landing-roulette-wrap .landing-cs-prize-placeholder { font-size: 36px; }
}
`

interface RouletteLandingProps {
  triggerSpinCount?: number
  onSpinComplete?: (prize: DemoPrize) => void
}

export default function RouletteLanding({ triggerSpinCount = 0, onSpinComplete }: RouletteLandingProps) {
  const [roulettePrizes] = useState(DEMO_PRIZES)
  const [rouletteCopies, setRouletteCopies] = useState(ROULETTE_MIN_COPIES)
  const [scrollPosition, setScrollPosition] = useState(0)

  const rouletteRef = useRef<HTMLDivElement>(null)
  const idlePositionRef = useRef(0)
  const idleRafRef = useRef<number | null>(null)
  const rouletteCopiesRef = useRef(ROULETTE_MIN_COPIES)
  const roulettePrizesRef = useRef(roulettePrizes)
  const isSpinningRef = useRef(false)
  const scrollPositionRef = useRef(0)
  const lastTriggerRef = useRef(0)

  rouletteCopiesRef.current = rouletteCopies
  roulettePrizesRef.current = roulettePrizes
  scrollPositionRef.current = scrollPosition

  // Бесконечное медленное движение ленты (idle), пауза во время спина
  useEffect(() => {
    const prizes = roulettePrizesRef.current
    if (prizes.length === 0) return

    const oneSetWidth = prizes.length * PRIZE_WIDTH
    let lastTime = performance.now()

    const tick = () => {
      if (isSpinningRef.current) {
        idleRafRef.current = requestAnimationFrame(tick)
        return
      }
      const now = performance.now()
      const dt = Math.min((now - lastTime) / 16, 50)
      lastTime = now
      idlePositionRef.current -= IDLE_SPEED_PX * (dt / 16)
      if (idlePositionRef.current < -oneSetWidth) {
        idlePositionRef.current += oneSetWidth
      }
      const containerWidth = rouletteRef.current?.offsetWidth ?? 0
      const rightEdge = idlePositionRef.current + containerWidth
      const copies = rouletteCopiesRef.current
      if (rightEdge >= (copies - ROULETTE_REPLENISH_THRESHOLD) * oneSetWidth) {
        rouletteCopiesRef.current = copies + ROULETTE_REPLENISH_COUNT
        setRouletteCopies(rouletteCopiesRef.current)
      }
      scrollPositionRef.current = idlePositionRef.current
      setScrollPosition(idlePositionRef.current)
      idleRafRef.current = requestAnimationFrame(tick)
    }
    idleRafRef.current = requestAnimationFrame(tick)
    return () => {
      if (idleRafRef.current != null) cancelAnimationFrame(idleRafRef.current)
    }
  }, [roulettePrizes.length])

  // Спин по триггеру: разгон ленты и остановка на одном из призов (выпадать могут только призы из WINNABLE_PRIZE_IDS)
  useEffect(() => {
    if (triggerSpinCount <= 0 || triggerSpinCount === lastTriggerRef.current || !onSpinComplete) return
    lastTriggerRef.current = triggerSpinCount
    const prizes = roulettePrizesRef.current
    if (prizes.length === 0) return

    const winnableIndices = prizes
      .map((p, i) => (WINNABLE_PRIZE_IDS.includes(p.id as (typeof WINNABLE_PRIZE_IDS)[number]) ? i : -1))
      .filter((i) => i >= 0)
    const randomIndex = winnableIndices[Math.floor(Math.random() * winnableIndices.length)]

    const container = rouletteRef.current
    const containerWidth = container?.offsetWidth ?? 800
    const oneSetWidth = prizes.length * PRIZE_WIDTH
    const paddingLeft = 20
    const targetScroll =
      containerWidth / 2 -
      paddingLeft -
      PRIZE_WIDTH / 2 -
      randomIndex * PRIZE_WIDTH -
      oneSetWidth

    isSpinningRef.current = true
    const startScroll = scrollPositionRef.current
    const startTime = performance.now()
    let spinRaf: number

    const animate = () => {
      const elapsed = performance.now() - startTime
      const t = Math.min(1, elapsed / SPIN_DURATION_MS)
      const eased = SPIN_EASE_OUT(t)
      const current = startScroll + (targetScroll - startScroll) * eased
      scrollPositionRef.current = current
      setScrollPosition(current)

      if (t < 1) {
        spinRaf = requestAnimationFrame(animate)
      } else {
        isSpinningRef.current = false
        idlePositionRef.current = targetScroll
        onSpinComplete(prizes[randomIndex])
      }
    }
    spinRaf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(spinRaf)
  }, [triggerSpinCount, onSpinComplete])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: LANDING_ROULETTE_CSS }} />
      <div className="landing-roulette-wrap">
        <div className="landing-spin-container">
          <div className="landing-roulette-section">
            <div className="landing-cs-roulette-container">
              <div className="landing-cs-roulette-pointer" aria-hidden />
              <div ref={rouletteRef} className="landing-cs-roulette-track">
                <div
                  className="landing-cs-roulette-items"
                  style={{
                    transform: `translateX(${scrollPosition}px)`,
                    transition: 'none',
                  }}
                >
                  {Array.from({ length: rouletteCopies }, () => roulettePrizes)
                    .flat()
                    .map((prize, index) => (
                      <div
                        key={`${prize.id}-${index}`}
                        className="landing-cs-prize-item"
                        data-prize-tier={getPrizeTier(prize)}
                      >
                        <div className="landing-cs-prize-inner">
                          <img
                            src={prize.image}
                            alt={prize.name}
                            className="landing-cs-prize-image"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
