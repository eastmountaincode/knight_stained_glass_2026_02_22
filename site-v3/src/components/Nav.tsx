'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const sections = [
  { id: 'church', label: 'Church' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'residential', label: 'Residential' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export function Nav() {
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const sectionEls = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-64px 0px -40% 0px' }
    )

    sectionEls.forEach((el) => observer.observe(el))

    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      document.body.style.overflow = !prev ? 'hidden' : ''
      return !prev
    })
  }

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-[5vw] ${
          scrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-sm shadow-[0_1px_0_rgba(201,168,76,0.1)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3">
            <Image
              src="/shield-logo.png"
              alt="Knight Stained Glass shield"
              width={28}
              height={34}
              className="h-[34px] w-[28px]"
            />
            <span className="font-[family-name:var(--font-uncial)] text-lg text-[var(--color-cream)] tracking-wide">
              Knight Stained Glass
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden gap-8 md:flex">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`text-sm font-medium uppercase tracking-[0.15em] ${
                    activeSection === id
                      ? 'text-[var(--color-gold)]'
                      : 'text-[var(--color-label)] hover:text-[var(--color-text)]'
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-[2px] w-5 bg-[var(--color-cream)] ${
                menuOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-[2px] w-5 bg-[var(--color-cream)] ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-[2px] w-5 bg-[var(--color-cream)] ${
                menuOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#0a0a0a]/98 backdrop-blur-sm">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`text-2xl font-medium uppercase tracking-[0.2em] ${
                activeSection === id
                  ? 'text-[var(--color-gold)]'
                  : 'text-[var(--color-cream)]'
              }`}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
