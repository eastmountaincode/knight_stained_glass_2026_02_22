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

  return (
    <div className={`relative flex flex-col ${className}`}>
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex flex-1 snap-x snap-mandatory overflow-x-auto scrollbar-hide"
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
            <div className="relative h-full w-full overflow-hidden rounded-sm">
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
                  <p className="text-sm text-[var(--color-cream)] sm:text-base">
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
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[var(--color-gold)]/30 bg-[#0a0a0a]/70 p-3 text-[var(--color-gold)] backdrop-blur-sm transition-all hover:bg-[var(--color-gold)]/20 disabled:pointer-events-none disabled:opacity-0 sm:left-4 sm:p-4"
        aria-label="Previous image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5 sm:h-6 sm:w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        onClick={goToNext}
        disabled={currentIndex === images.length - 1}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[var(--color-gold)]/30 bg-[#0a0a0a]/70 p-3 text-[var(--color-gold)] backdrop-blur-sm transition-all hover:bg-[var(--color-gold)]/20 disabled:pointer-events-none disabled:opacity-0 sm:right-4 sm:p-4"
        aria-label="Next image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5 sm:h-6 sm:w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="mt-4 flex justify-center gap-1" role="tablist" aria-label="Slide indicators">
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
    </div>
  )
}
