'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

const CANDIDATES = [
  'close-up-1.jpg',
  'close-up-2.jpg',
  'close-up-3.jpg',
  'close-up-4.jpg',
  'nd-one-window-restored-one-out.jpg',
  'nd-2-windows-restored.jpg',
  'nd-reflection.jpg',
  'nd-removal.jpg',
  'nd-removal-2.jpg',
  'nd-removal-3.jpg',
  'nd-removal-4.jpg',
  'nd-removal-5.jpg',
  'church-build.jpg',
  'church-cleaning-before-after.jpg',
  'church-detail-1.jpg',
  'church-restoration-build.jpg',
  'church-restoration-detail.jpg',
  'new-city--church-design.jpg',
  'on-site-repair-2.jpg',
  '20250602_163423.jpg',
  '20250619_144327.jpg',
  '20250909_113014.jpg',
  '20250916_141425.jpg',
  '20251112_120924.jpg',
  '20251215_095950.jpg',
  '20251216_104353.jpg',
  '20251219_135218.jpg',
]

export function DevImageCycler() {
  const [index, setIndex] = useState(0)
  const [yPos, setYPos] = useState(50)
  const [visible, setVisible] = useState(true)
  const [gradient, setGradient] = useState(true)

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + CANDIDATES.length) % CANDIDATES.length),
    [],
  )
  const next = useCallback(
    () => setIndex((i) => (i + 1) % CANDIDATES.length),
    [],
  )

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setYPos((y) => Math.max(0, y - 5))
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setYPos((y) => Math.min(100, y + 5))
      }
      if (e.key === 'Escape') setVisible((v) => !v)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [prev, next])

  const filename = CANDIDATES[index]

  return (
    <>
      {/* The hero background image */}
      <Image
        src={`/hero-candidates/${filename}`}
        alt={filename}
        fill
        unoptimized
        className="object-cover"
        style={{ objectPosition: `center ${yPos}%` }}
      />

      {/* Gradient overlay */}
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/30 lg:bg-gradient-to-r lg:from-[#0a0a0a] lg:via-[#0a0a0a]/70 lg:to-transparent" />
      )}

      {/* Dev controls overlay */}
      {visible && (
        <div className="absolute bottom-6 right-6 z-30 flex flex-col items-center gap-2 rounded-lg bg-black/80 px-4 py-3 font-mono text-sm text-white backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button onClick={prev} className="cursor-pointer px-2 py-1 hover:text-[var(--color-gold)]">
              &larr;
            </button>
            <span className="min-w-[260px] text-center">
              <span className="text-[var(--color-gold)]">{index + 1}/{CANDIDATES.length}</span>
              {' '}{filename}
            </span>
            <button onClick={next} className="cursor-pointer px-2 py-1 hover:text-[var(--color-gold)]">
              &rarr;
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span>Y:</span>
            <input
              type="range"
              min={0}
              max={100}
              value={yPos}
              onChange={(e) => setYPos(Number(e.target.value))}
              className="w-40 cursor-pointer accent-[var(--color-gold)]"
            />
            <span className="w-8 text-right text-[var(--color-gold)]">{yPos}%</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setGradient((g) => !g)}
              className={`cursor-pointer rounded px-2 py-0.5 ${gradient ? 'bg-[var(--color-gold)]/20 text-[var(--color-gold)]' : 'bg-neutral-700 text-neutral-400'}`}
            >
              Gradient {gradient ? 'ON' : 'OFF'}
            </button>
          </div>
          <div className="text-[10px] text-neutral-500">
            &larr;&rarr; images &nbsp; &uarr;&darr; position &nbsp; Esc toggle
          </div>
        </div>
      )}
    </>
  )
}
