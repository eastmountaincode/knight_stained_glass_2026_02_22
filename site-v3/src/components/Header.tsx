'use client'

import { useEffect, useState } from 'react'
import { DesktopHeader } from './DesktopHeader'
import { MobileHeader } from './MobileHeader'

export const sections = [
  { id: 'church', label: 'Church' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'residential', label: 'Residential' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export function Header() {
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
      className={`fixed top-0 left-0 right-0 z-50 px-[5vw] ${
        scrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-sm shadow-[0_1px_0_rgba(201,168,76,0.1)]'
          : 'bg-transparent'
      }`}
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
