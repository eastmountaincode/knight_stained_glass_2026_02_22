'use client'

import { useEffect, useState } from 'react'

export function DevMode() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'b' || e.key === 'B') {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
        setActive((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('dev-mode', active)
  }, [active])

  if (!active) return null

  return (
    <div className="fixed bottom-4 right-4 z-[9999] rounded bg-blue-600 px-3 py-1 text-xs font-bold text-white opacity-80">
      DEV MODE — press B to toggle
    </div>
  )
}
