'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

interface Props {
  sections: { id: string; label: string }[]
  activeSection: string
  menuOpen: boolean
  onToggleMenu: () => void
  onCloseMenu: () => void
}

export function MobileHeader({ sections, activeSection, menuOpen, onToggleMenu, onCloseMenu }: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <>
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between header:hidden">
        <a href="#hero" className="flex min-w-0 items-center gap-2">
          <Image
            src="/shield-logo.png"
            alt="Knight Stained Glass shield"
            width={24}
            height={29}
            className="h-[29px] w-[24px] shrink-0"
            unoptimized
          />
          <span className="whitespace-nowrap font-[family-name:var(--font-display-troy)] text-xl text-[var(--color-cream)] tracking-wide">
            Knight Stained Glass
          </span>
        </a>

        <button
          className="relative z-50 h-10 w-10 shrink-0 cursor-pointer"
          onClick={onToggleMenu}
          aria-label="Toggle menu"
        >
          <span
            className={`absolute left-2 block h-[2px] w-6 bg-[var(--color-cream)] transition-all duration-300 ${
              menuOpen ? 'top-[19px] rotate-45' : 'top-[12px]'
            }`}
          />
          <span
            className={`absolute left-2 top-[19px] block h-[2px] bg-[var(--color-cream)] transition-all duration-300 ${
              menuOpen ? 'w-0 opacity-0' : 'w-6'
            }`}
          />
          <span
            className={`absolute left-2 block h-[2px] w-6 bg-[var(--color-cream)] transition-all duration-300 ${
              menuOpen ? 'top-[19px] -rotate-45' : 'top-[26px]'
            }`}
          />
        </button>
      </div>

      {/* Portal overlay so it's not constrained by <header> */}
      {mounted && createPortal(
        <div
          className={`fixed inset-0 z-[49] flex flex-col items-center justify-center gap-8 bg-[#0a0a0a]/98 backdrop-blur-sm transition-all duration-300 ease-in-out header:hidden ${
            menuOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`relative text-2xl font-medium uppercase tracking-[0.2em] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-[var(--color-gold)] after:transition-all after:duration-300 ${
                activeSection === id
                  ? 'text-[var(--color-gold)] after:w-full'
                  : 'text-[var(--color-cream)] after:w-0'
              }`}
              onClick={onCloseMenu}
            >
              {label}
            </a>
          ))}
        </div>,
        document.body
      )}
    </>
  )
}
