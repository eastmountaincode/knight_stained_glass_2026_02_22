'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

export interface CarouselImage {
  key: string
  src: string
  alt: string
  caption?: string
}

interface ImageCarouselProps {
  images: CarouselImage[]
  className?: string
}

export function ImageCarousel({ images, className = '' }: ImageCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Track current slide via IntersectionObserver
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const slides = Array.from(container.children) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = slides.indexOf(entry.target as HTMLElement)
            if (index !== -1) setCurrentIndex(index)
          }
        })
      },
      { root: container, threshold: 0.5 }
    )

    slides.forEach((slide) => observer.observe(slide))
    return () => observer.disconnect()
  }, [images.length])

  const scrollTo = useCallback((index: number) => {
    const container = scrollRef.current
    if (!container) return
    const slide = container.children[index] as HTMLElement | undefined
    if (slide) {
      slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [])

  const goToPrev = useCallback(() => {
    scrollTo(Math.max(0, currentIndex - 1))
  }, [currentIndex, scrollTo])

  const goToNext = useCallback(() => {
    scrollTo(Math.min(images.length - 1, currentIndex + 1))
  }, [currentIndex, images.length, scrollTo])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goToPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goToNext()
      }
    },
    [goToPrev, goToNext]
  )

  // Close lightbox on Escape
  useEffect(() => {
    if (lightboxIndex === null) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [lightboxIndex])

  return (
    <div className={`relative flex flex-col ${className} `}>
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex min-h-[400px] flex-1 gap-9 snap-x snap-mandatory overflow-x-auto scrollbar-hide border-2 border-[var(--color-border-gold)] p-8"
        role="region"
        aria-label="Image gallery"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {images.map((image, index) => (
          <div
            key={image.key}
            className="w-full flex-none snap-center"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${images.length}`}
          >
            <div
              className="relative h-full w-full cursor-zoom-in overflow-hidden rounded-sm"
              onClick={() => setLightboxIndex(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                unoptimized
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 sm:px-6 sm:py-4">
                  <p className="text-xl text-[var(--color-cream)] lg:text-xl">
                    {image.caption}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Previous arrow */}
      <button
        onClick={goToPrev}
        disabled={currentIndex === 0}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[var(--color-gold)]/30 bg-[#0a0a0a] p-4 text-[var(--color-gold)] transition-all hover:bg-[#1a1a1a] disabled:border-[var(--color-gold)]/10 disabled:text-[var(--color-gold)]/20 disabled:cursor-default sm:left-4"
        aria-label="Previous image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        onClick={goToNext}
        disabled={currentIndex === images.length - 1}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[var(--color-gold)]/30 bg-[#0a0a0a] p-4 text-[var(--color-gold)] transition-all hover:bg-[#1a1a1a] disabled:border-[var(--color-gold)]/10 disabled:text-[var(--color-gold)]/20 disabled:cursor-default sm:right-4"
        aria-label="Next image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="mt-6 flex justify-center gap-1" role="tablist" aria-label="Slide indicators">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className="flex items-center justify-center p-2"
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span
              className={`block h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-6 bg-[var(--color-gold)]'
                  : 'w-2 bg-[var(--color-gold)]/30 hover:bg-[var(--color-gold)]/50'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Lightbox overlay */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 z-10 rounded-full border border-[var(--color-gold)]/30 bg-[#0a0a0a]/70 p-3 text-[var(--color-gold)] backdrop-blur-sm transition-all hover:bg-[var(--color-gold)]/20"
            aria-label="Close lightbox"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative h-[90vh] w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              fill
              unoptimized
              className="object-contain"
              sizes="90vw"
            />
          </div>
          {images[lightboxIndex].caption && (
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-sm text-[var(--color-cream)]">
              {images[lightboxIndex].caption}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
