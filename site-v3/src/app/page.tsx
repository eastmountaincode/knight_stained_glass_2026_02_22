import { Header } from '@/components/Header'
import { DevImageCycler } from '@/components/DevImageCycler'

const placeholderSections = [
  { id: 'religious', label: 'Church Restorations' },
  { id: 'commercial', label: 'Commercial Work' },
  { id: 'residential', label: 'Residential' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section
        id="hero"
        className="relative flex min-h-screen snap-start items-center overflow-hidden border-b border-[var(--color-border)]"
      >
        {/* DEV: image cycler — replace with final hero images when done */}
        <DevImageCycler />

        {/* Content */}
        <div className="relative z-10 w-full px-6 py-32 sm:px-12 md:px-20 lg:max-w-2xl">
          <h1 className="font-[family-name:var(--font-display)] text-5xl leading-tight text-[var(--color-cream)] sm:text-6xl md:text-7xl">
            Knight
            <br />
            Stained Glass
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text)] sm:text-xl md:text-2xl">
            Church restorations &amp; custom stained glass
            <br className="hidden sm:block" />
            <span className="text-[var(--color-text-muted)]"> — Cincinnati, OH</span>
          </p>
          <p className="mt-3 text-sm tracking-wide text-[var(--color-gold)]">
            37 Five-Star Google Reviews
          </p>
          <a
            href="#contact"
            className="mt-8 inline-block rounded-sm border border-[var(--color-gold)] bg-[var(--color-gold)]/10 px-8 py-3 font-[family-name:var(--font-display)] text-lg tracking-wide text-[var(--color-gold)] transition-colors hover:bg-[var(--color-gold)]/20"
          >
            Request a Consultation
          </a>
        </div>
      </section>

      {/* Remaining sections */}
      {placeholderSections.map(({ id, label }) => (
        <section
          key={id}
          id={id}
          className="flex min-h-screen snap-start items-center justify-center border-b border-[var(--color-border)]"
        >
          <h2 className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-gold)]">
            {label}
          </h2>
        </section>
      ))}
    </>
  )
}
