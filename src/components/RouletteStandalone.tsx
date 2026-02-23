/**
 * Самодостаточный компонент рулетки — всё в одном файле.
 * Логика: лента с idle-движением, спин с фазовой скоростью (как на QR-странице клуба).
 * Попап выигрыша: как в SpinPage (result-overlay, картинка + название + описание).
 *
 * Скопируй этот файл к себе на сайт — больше ничего не нужно (кроме React).
 * Зависимости: только react и react-dom.
 */
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// ——— Типы (скопируй к себе или замени на свои) ———
export interface StandalonePrize {
  id: string;
  name: string;
  description?: string;
  image?: string;
  slotIndex?: number;
  probability?: number;
  value?: string | number;
}

type PrizeTier = 'red' | 'purple' | 'green' | 'blue' | 'gray';

function getPrizeTier(prize: { probability?: number }): PrizeTier {
  const pct = (prize.probability ?? 0) * 100;
  if (pct < 5) return 'red';
  if (pct < 10) return 'purple';
  if (pct < 15) return 'green';
  if (pct <= 20) return 'blue';
  return 'gray';
}

// ——— Константы ———
const PRIZE_CARD_WIDTH = 400;
const PRIZE_GAP = 24;
const ROULETTE_ITEMS_PADDING_LEFT = 20;
const IDLE_SPEED_PX = 15.5;
const ROULETTE_MIN_COPIES = 50;
const ROULETTE_REPLENISH_THRESHOLD = 25;
const ROULETTE_REPLENISH_COUNT = 25;
const FIXED_TRAVEL_PX = 30_000;
const DURATION_S = 28;

// ——— Стили (всё в одном блоке, префикс .rs- чтобы не конфликтовать с твоим сайтом) ———
const ROULETTE_STANDALONE_CSS = `
.rs-wrap {
  width: 100%;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  box-sizing: border-box;
  background: transparent;
}
.rs-section {
  width: 100%;
  height: 320px;
  min-height: 280px;
  position: relative;
  overflow: hidden;
}
.rs-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: transparent;
  border-radius: 0;
  padding: 20px 0;
}
.rs-pointer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 100%;
  z-index: 10;
  pointer-events: none;
  background: transparent;
}
.rs-pointer::before,
.rs-pointer::after {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
.rs-pointer::before {
  top: calc(50% - 120px - 30px);
  border-bottom: none;
  border-top: 22px solid #00F6FF;
  filter: drop-shadow(0 2px 8px rgba(0, 246, 255, 0.5));
}
.rs-pointer::after {
  top: calc(50% + 120px + 6px);
  border-top: none;
  border-bottom: 22px solid #00F6FF;
  filter: drop-shadow(0 -2px 8px rgba(0, 246, 255, 0.5));
}
.rs-track {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rs-items {
  display: flex;
  align-items: center;
  gap: 24px;
  height: 100%;
  will-change: transform;
  padding: 0 20px;
}
.rs-prize-item {
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
  border: 2px solid rgba(15, 36, 85, 0.25);
  transition: border-color 0.2s, box-shadow 0.2s;
  background: rgba(26, 26, 46, 0.95);
}
.rs-prize-item[data-prize-tier="red"] { border-color: rgba(255, 107, 53, 0.6); box-shadow: 0 0 16px rgba(255, 107, 53, 0.2); }
.rs-prize-item[data-prize-tier="purple"] { border-color: rgba(168, 85, 247, 0.5); }
.rs-prize-item[data-prize-tier="green"] { border-color: rgba(34, 197, 94, 0.5); }
.rs-prize-item[data-prize-tier="blue"] { border-color: rgba(59, 130, 246, 0.5); }
.rs-prize-item[data-prize-tier="gray"] { border-color: rgba(255, 255, 255, 0.12); }
.rs-prize-item.selected {
  border-color: #0f2455;
  border-width: 3px;
  box-shadow: 0 0 28px rgba(15, 36, 85, 0.5);
  z-index: 5;
}
.rs-prize-inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
}
.rs-prize-placeholder {
  width: 100%;
  height: 100%;
  min-height: 0;
  font-size: 48px;
  font-weight: 700;
  color: #b8b8d4;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 10, 15, 0.6);
  border-radius: 8px;
}
.rs-prize-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
.rs-prize-name {
  display: none;
}
@media (max-width: 768px) {
  .rs-section { height: 260px; min-height: 220px; }
  .rs-container { padding: 12px 0; }
  .rs-prize-item { width: 280px; height: 168px; }
  .rs-prize-placeholder { font-size: 36px; }
  .rs-pointer::before {
    top: calc(50% - 84px - 24px);
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    border-top: 16px solid #00F6FF;
  }
  .rs-pointer::after {
    top: calc(50% + 84px + 10px);
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    border-bottom: 16px solid #00F6FF;
  }
}

/* Попап выигрыша — как в SpinPage: оверлей, картинка, название, описание, закрытие */
.rs-result-overlay {
  position: fixed;
  inset: 0;
  top: 0; left: 0; right: 0; bottom: 0;
  height: 100vh;
  height: 100dvh;
  margin: 0; padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2147483647;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  cursor: pointer;
  animation: rs-overlay-fade 0.35s ease-out;
}
.rs-result-overlay::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 60% at 50% 50%,
    rgba(0, 246, 255, 0.35) 0%,
    rgba(0, 246, 255, 0.12) 40%,
    transparent 70%
  );
  pointer-events: none;
  animation: rs-glow-blink 2s ease-in-out infinite;
}
@keyframes rs-overlay-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes rs-glow-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
.rs-result-content {
  margin: auto;
  max-height: 95vh;
  max-width: min(900px, 95vw);
  min-width: min(360px, 90vw);
  overflow-y: auto;
  flex-shrink: 0;
  position: relative;
  cursor: default;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(26, 26, 46, 0.98);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  padding: 44px 52px 52px;
  border-radius: 28px;
  text-align: center;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(0, 246, 255, 0.2),
    0 0 60px rgba(0, 246, 255, 0.25);
  border: 2px solid rgba(0, 246, 255, 0.4);
  animation: rs-content-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes rs-content-pop {
  from { opacity: 0; transform: scale(0.88); }
  to { opacity: 1; transform: scale(1); }
}
.rs-result-title {
  color: #fff;
  margin: 0 0 28px 0;
  font-size: 38px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}
.rs-result-prize {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.rs-result-prize-image {
  object-fit: contain;
  max-height: 78vh;
  width: auto;
  max-width: 100%;
  display: block;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
}
.rs-result-prize-name {
  font-size: 24px;
  margin-top: 20px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.rs-result-prize-desc {
  font-size: 16px;
  margin-top: 12px;
  color: #fff;
  line-height: 1.45;
}
.rs-result-close-btn {
  margin-top: 28px;
  padding: 14px 36px;
  background: #00F6FF;
  color: #000;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 20px rgba(0, 246, 255, 0.5);
  transition: transform 0.2s, box-shadow 0.2s;
}
.rs-result-close-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 28px rgba(0, 246, 255, 0.6);
}
@media (max-width: 768px) {
  .rs-result-content { padding: 36px 24px 40px; margin: 20px; }
  .rs-result-title { font-size: 28px; margin-bottom: 20px; }
  .rs-result-prize-name { font-size: 20px; margin-top: 16px; }
  .rs-result-close-btn { margin-top: 22px; padding: 12px 28px; font-size: 14px; }
}
`;

// ——— Props ———
export interface RouletteStandaloneProps {
  /** Список призов. Если не передан — используются demoPrizeIds/urls или пустой массив */
  prizes?: StandalonePrize[];
  /** Вызвать спин при изменении (например счётчик). После остановки вызывается onSpinComplete */
  triggerSpinCount?: number;
  /** Колбэк по окончании спина — передаётся выпавший приз */
  onSpinComplete?: (prize: StandalonePrize) => void;
  /** Если задан — выпадать может только приз с id из этого списка (остальные только в ленте) */
  winnablePrizeIds?: string[];
  /** Демо-призы по id (если нужны картинки по умолчанию без внешних импортов) */
  demoPrizeIds?: string[];
  /** URL картинок для демо по порядку (длина = demoPrizeIds или 7) */
  demoPrizeImageUrls?: string[];
}

const DEFAULT_DEMO_IDS = ['1', '2', '3', '4', '5', '6', '7'];
const DEFAULT_DEMO_NAMES = ['Приз 1', 'Приз 2', 'Приз 3', 'Приз 4', 'Приз 5', 'Приз 6', 'Приз 7'];

/**
 * Самодостаточная рулетка: лента с idle, спин с фазовой скоростью, попап как в SpinPage.
 * Один файл — скопируй и вставь к себе на сайт.
 */
export default function RouletteStandalone({
  prizes: propsPrizes,
  triggerSpinCount = 0,
  onSpinComplete,
  winnablePrizeIds,
  demoPrizeIds = DEFAULT_DEMO_IDS,
  demoPrizeImageUrls = [],
}: RouletteStandaloneProps) {
  const ids = demoPrizeIds.length > 0 ? demoPrizeIds : DEFAULT_DEMO_IDS;
  const urls = demoPrizeImageUrls.length > 0 ? demoPrizeImageUrls : [];

  const buildPrizes = (): StandalonePrize[] => {
    if (propsPrizes && propsPrizes.length > 0) return propsPrizes;
    return ids.map((id, i) => ({
      id,
      name: DEFAULT_DEMO_NAMES[i] ?? `Приз ${i + 1}`,
      slotIndex: i,
      probability: 0.1 + i * 0.02,
      image: urls[i],
    }));
  };

  const [prizes] = useState(buildPrizes);
  const [rouletteCopies, setRouletteCopies] = useState(ROULETTE_MIN_COPIES);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState<StandalonePrize | null>(null);
  const [result, setResult] = useState<StandalonePrize | null>(null);

  const rouletteRef = useRef<HTMLDivElement>(null);
  const idlePositionRef = useRef(0);
  const idleRafRef = useRef<number | null>(null);
  const rouletteCopiesRef = useRef(ROULETTE_MIN_COPIES);
  const prizesRef = useRef(prizes);
  const isSpinningRef = useRef(false);
  const lastTriggerRef = useRef(0);

  rouletteCopiesRef.current = rouletteCopies;
  prizesRef.current = prizes;

  // Читаем реальную ширину карточки из DOM (на мобильных 280px, на десктопе 400px)
  const getActualPrizeWidths = (): { cardWidth: number; prizeWidth: number } => {
    const firstItem = rouletteRef.current?.querySelector('.rs-prize-item') as HTMLElement | null;
    const cardWidth = firstItem ? firstItem.getBoundingClientRect().width : PRIZE_CARD_WIDTH;
    const prizeWidth = cardWidth + PRIZE_GAP;
    return { cardWidth, prizeWidth };
  };

  // Idle: бесконечное движение ленты, пауза во время спина (используем реальные размеры из DOM)
  useEffect(() => {
    if (prizes.length === 0) return;
    let lastTime = performance.now();

    const tick = () => {
      if (isSpinningRef.current) {
        idleRafRef.current = requestAnimationFrame(tick);
        return;
      }
      const { prizeWidth } = getActualPrizeWidths();
      const oneSetWidth = prizes.length * prizeWidth;
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 16, 50);
      lastTime = now;
      idlePositionRef.current -= IDLE_SPEED_PX * (dt / 16);
      if (idlePositionRef.current < -oneSetWidth) {
        idlePositionRef.current += oneSetWidth;
      }
      const containerWidth = rouletteRef.current?.offsetWidth ?? 0;
      const rightEdge = idlePositionRef.current + containerWidth;
      const copies = rouletteCopiesRef.current;
      if (rightEdge >= (copies - ROULETTE_REPLENISH_THRESHOLD) * oneSetWidth) {
        rouletteCopiesRef.current = copies + ROULETTE_REPLENISH_COUNT;
        setRouletteCopies(rouletteCopiesRef.current);
      }
      setScrollPosition(idlePositionRef.current);
      idleRafRef.current = requestAnimationFrame(tick);
    };
    idleRafRef.current = requestAnimationFrame(tick);
    return () => {
      if (idleRafRef.current != null) cancelAnimationFrame(idleRafRef.current);
    };
  }, [prizes.length]);

  // Блокировка скролла при открытом попапе
  useEffect(() => {
    if (!result) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevScrollY = window.scrollY;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${prevScrollY}px`;
    body.style.width = '100%';
    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      window.scrollTo(0, prevScrollY);
    };
  }, [result]);

  useEffect(() => {
    if (!result) return;
    const t = setTimeout(() => setResult(null), 7000);
    return () => clearTimeout(t);
  }, [result]);

  // Спин по триггеру
  useEffect(() => {
    if (triggerSpinCount <= 0 || triggerSpinCount === lastTriggerRef.current || !onSpinComplete) return;
    lastTriggerRef.current = triggerSpinCount;
    const list = prizesRef.current;
    if (list.length === 0) return;

    const winnableIds = winnablePrizeIds && winnablePrizeIds.length > 0 ? new Set(winnablePrizeIds) : null;
    const pool = winnableIds
      ? list.filter((p) => winnableIds.has(p.id))
      : list;
    if (pool.length === 0) return;

    const prize = pool[Math.floor(Math.random() * pool.length)];
    startSpin(prize, () => onSpinComplete(prize));
  }, [triggerSpinCount, onSpinComplete, winnablePrizeIds]);

  const startSpin = (prize: StandalonePrize, onComplete?: () => void) => {
    if (isSpinningRef.current || !rouletteRef.current) return;
    const list = prizesRef.current;
    if (list.length === 0) return;

    isSpinningRef.current = true;
    setSelectedPrize(null);
    setResult(null);

    const { cardWidth: prizeCardWidth, prizeWidth } = getActualPrizeWidths();

    const targetIndex = list.findIndex(
      (p) => p.id === prize.id || (prize.slotIndex !== undefined && p.slotIndex === prize.slotIndex)
    );
    const finalIndex = targetIndex >= 0 ? targetIndex : 0;

    const containerWidth = rouletteRef.current.offsetWidth;
    const centerOffset = containerWidth / 2 - prizeWidth / 2;
    const contentStart = centerOffset - ROULETTE_ITEMS_PADDING_LEFT;
    const startPosition = idlePositionRef.current;
    const oneSetWidth = list.length * prizeWidth;
    const prizeOffsetInSet = contentStart - finalIndex * prizeWidth;
    const idealEnd = startPosition - FIXED_TRAVEL_PX;
    const EDGE_MARGIN = Math.round(prizeCardWidth * 0.15);
    const randomOffset =
      EDGE_MARGIN + Math.floor(Math.random() * Math.max(0, prizeCardWidth - EDGE_MARGIN * 2));
    const adjustedPrizeOffset = prizeOffsetInSet + prizeCardWidth / 2 - randomOffset;
    const n = Math.round((adjustedPrizeOffset - idealEnd) / oneSetWidth);
    const endPosition = adjustedPrizeOffset - n * oneSetWidth;
    const travel = endPosition - startPosition;

    const phases = [
      { tStart: 0, tEnd: 3, vStart: 1.0, vEnd: 0.65 },
      { tStart: 3, tEnd: 7, vStart: 0.65, vEnd: 0.2 },
      { tStart: 7, tEnd: 12, vStart: 0.2, vEnd: 0.05 },
      { tStart: 12, tEnd: 18, vStart: 0.05, vEnd: 0.01 },
      { tStart: 18, tEnd: 28, vStart: 0.01, vEnd: 0.0 },
    ];
    const totalArea = phases.reduce(
      (sum, p) => sum + ((p.vStart + p.vEnd) / 2) * (p.tEnd - p.tStart),
      0
    );
    const getProgress = (tSec: number): number => {
      if (tSec <= 0) return 0;
      if (tSec >= DURATION_S) return 1;
      let area = 0;
      for (const p of phases) {
        if (tSec <= p.tStart) break;
        const dt = Math.min(tSec, p.tEnd) - p.tStart;
        const ratio = dt / (p.tEnd - p.tStart);
        const vAtT = p.vStart + (p.vEnd - p.vStart) * ratio;
        area += ((p.vStart + vAtT) / 2) * dt;
      }
      return area / totalArea;
    };

    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = getProgress(elapsed);
      const currentPosition = startPosition + travel * progress;
      setScrollPosition(currentPosition);
      idlePositionRef.current = currentPosition;

      if (elapsed >= DURATION_S) {
        setScrollPosition(endPosition);
        idlePositionRef.current = endPosition;
        setSelectedPrize(prize);
        setResult(prize);
        isSpinningRef.current = false;
        onComplete?.();
        return;
      }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ROULETTE_STANDALONE_CSS }} />
      <div className="rs-wrap">
        <div className="rs-section">
          <div className="rs-container">
            <div className="rs-pointer" aria-hidden />
            <div ref={rouletteRef} className="rs-track">
              <div
                className="rs-items"
                style={{ transform: `translateX(${scrollPosition}px)`, transition: 'none' }}
              >
                {Array.from({ length: rouletteCopies }, () => prizes)
                  .flat()
                  .map((p, index) => {
                    const isSelected =
                      selectedPrize != null &&
                      (selectedPrize.id === p.id ||
                        (selectedPrize.slotIndex !== undefined && p.slotIndex === selectedPrize.slotIndex));
                    return (
                      <div
                        key={`${p.id}-${index}`}
                        className={`rs-prize-item ${isSelected ? 'selected' : ''}`}
                        data-prize-tier={getPrizeTier(p)}
                      >
                        <div className="rs-prize-inner">
                          {p.image ? (
                            <img src={p.image} alt={p.name} className="rs-prize-image" />
                          ) : (
                            <div className="rs-prize-placeholder">{p.name.charAt(0)}</div>
                          )}
                          <div className="rs-prize-name">{p.name}</div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {result &&
        createPortal(
          <div
            className="rs-result-overlay"
            onClick={() => setResult(null)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Escape' && setResult(null)}
            aria-label="Закрыть (клик или Escape)"
          >
            <div className="rs-result-content" onClick={(e) => e.stopPropagation()}>
              <h2 className="rs-result-title">Выигрыш!</h2>
              <div className="rs-result-prize">
                {result.image && (
                  <img
                    src={result.image}
                    alt={result.name}
                    className="rs-result-prize-image"
                  />
                )}
                <div className="rs-result-prize-name">{result.name}</div>
                {result.description && (
                  <div className="rs-result-prize-desc">{result.description}</div>
                )}
              </div>
              <button
                type="button"
                className="rs-result-close-btn"
                onClick={() => setResult(null)}
              >
                Закрыть
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
