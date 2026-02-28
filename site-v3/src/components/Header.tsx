'use client'

import { useEffect, useState } from 'react'
import { DesktopHeader } from './DesktopHeader'
import { MobileHeader } from './MobileHeader'

export const sections = [
  { id: 'religious', label: 'Religious' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'residential', label: 'Residential' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export function Header() {
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollOpacity, setScrollOpacity] = useState(0)

  useEffect(() => {
    const heroEl = document.getElementById('hero')
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
      { threshold: 0.3, rootMargin: '0px 0px -40% 0px' }
    )

    if (heroEl) observer.observe(heroEl)
    sectionEls.forEach((el) => observer.observe(el))

    const handleScroll = () => {
      setScrollOpacity(Math.min(window.scrollY / 200, 1))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      const next = !prev
      document.documentElement.style.overflow = next ? 'hidden' : ''
      document.body.style.overflow = next ? 'hidden' : ''
      return next
    })
  }

  const closeMenu = () => {
    setMenuOpen(false)
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
  }

  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 px-[5vw]"
      style={{
        backgroundColor: `rgba(10, 10, 10, ${0.9 + scrollOpacity * 0.1})`,
        backdropFilter: scrollOpacity > 0 ? `blur(${scrollOpacity * 8}px)` : 'none',
      }}
    >
      <MobileHeader
        sections={sections}
        activeSection={activeSection}
        menuOpen={menuOpen}
        onToggleMenu={toggleMenu}
        onCloseMenu={closeMenu}
      />
      <DesktopHeader sections={sections} activeSection={activeSection} />
    </header>
  )
}
