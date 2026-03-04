import Image from 'next/image'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen snap-start items-center overflow-hidden border-b-2 border-[var(--color-border)]"
    >
      {/* Mobile hero image */}
      <Image
        src="/hero-candidates/nd-one-window-restored-one-out.jpg"
        alt="Notre Dame stained glass window restoration"
        fill
        unoptimized
        className="object-cover lg:hidden opacity-90"
        style={{ objectPosition: 'center 50%', opacity: 0.9 }}
        priority
      />
      {/* Desktop hero image */}
      <Image
        src="/hero-candidates/20250619_144327.jpg"
        alt="Stained glass detail"
        fill
        unoptimized
        className="hidden object-cover lg:block opacity-90"
        style={{ objectPosition: 'center 36%' }}
        priority
      />

      {/* Gradient overlay — mobile */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background: 'linear-gradient(to right, #0a0a0a 13%, rgba(10,10,10,0.75) 56%, transparent 100%)',
        }}
      />
      {/* Gradient overlay — desktop */}
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background: 'linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.75) 50%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="section-px relative z-10 max-w-lg py-32 lg:max-w-3xl">
        <h1 className="font-[family-name:var(--font-display)] text-5xl leading-tight text-[var(--color-cream)] lg:text-7xl">
          Knight Stained Glass
        </h1>
        <p className="mt-4 text-2xl text-[var(--color-text)] lg:text-3xl">
          Church Restorations &amp; Custom Stained Glass
        </p>
        <p className="mt-1 text-lg tracking-widest text-[var(--color-text-muted)] uppercase">
          Cincinnati, OH
        </p>
        <p className="mt-4 text-lg tracking-wide text-[var(--color-gold)]">
          ★★★★★&ensp;37 Five-Star Google Reviews
        </p>
        <a
          href="#contact"
          className="mt-8 inline-block rounded-sm border border-[var(--color-gold)] bg-[var(--color-gold)]/10 px-6 py-3 font-[family-name:var(--font-display)] text-xl tracking-wide text-[var(--color-gold)] transition-colors hover:bg-[var(--color-gold)]/20 lg:text-2xl lg:px-8 lg:py-4"
        >
          Request a Free Consultation
        </a>
      </div>
    </section>
  )
}
