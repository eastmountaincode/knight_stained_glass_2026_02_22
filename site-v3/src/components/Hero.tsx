import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface HeroImage {
  asset: { _id: string; url: string }
  alt?: string
  hotspot?: { x: number; y: number }
}

interface HeroProps {
  data: {
    desktopImage: HeroImage
    mobileImage: HeroImage
  }
}

export function Hero({ data }: HeroProps) {
  if (!data?.mobileImage?.asset || !data?.desktopImage?.asset) return null

  const mobile = {
    src: urlFor(data.mobileImage.asset).width(1200).url(),
    alt: data.mobileImage.alt ?? 'Knight Stained Glass',
  }
  const desktop = {
    src: urlFor(data.desktopImage.asset).width(2400).url(),
    alt: data.desktopImage.alt ?? 'Knight Stained Glass',
  }

  const mobilePosition = data.mobileImage.hotspot
    ? `${data.mobileImage.hotspot.x * 100}% ${data.mobileImage.hotspot.y * 100}%`
    : '38% 40%'
  const desktopPosition = data.desktopImage.hotspot
    ? `${data.desktopImage.hotspot.x * 100}% ${data.desktopImage.hotspot.y * 100}%`
    : 'center 36%'

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden border-b-2 border-[var(--color-border)]"
    >
      {/* Mobile hero image */}
      <Image
        src={mobile.src}
        alt={mobile.alt}
        fill
        className="absolute object-cover lg:hidden"
        style={{ objectPosition: mobilePosition, opacity: 0.9, transform: 'scale(1.1)', transformOrigin: '50% 40%' }}
        priority
        unoptimized
      />
      {/* Desktop hero image */}
      <Image
        src={desktop.src}
        alt={desktop.alt}
        fill
        className="hidden object-cover lg:block opacity-90"
        style={{ objectPosition: desktopPosition }}
        priority
        unoptimized
      />

      {/* Gradient overlay — mobile */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background: 'linear-gradient(to right, #0a0a0a 3%, rgba(10,10,10,0.75) 56%, transparent 100%)',
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
          Knight<br className="lg:hidden" /> Stained Glass
        </h1>
        <p className="mt-4 text-2xl text-[var(--color-text)] lg:text-3xl">
          Church Restorations &amp;<br className="lg:hidden" /> Custom Stained Glass
        </p>
        <p className="mt-1 text-lg tracking-widest text-[var(--color-text-muted)] uppercase">
          Cincinnati, OH
        </p>
        <p className="mt-4 text-lg tracking-wide text-[var(--color-gold)]">
          ★★★★★&ensp;<br></br>37 Five<span style={{ fontFamily: 'sans-serif' }}>-</span>Star Google Reviews
        </p>
        <a
          href="#contact"
          className="mt-8 inline-block rounded-sm border border-[var(--color-gold)] bg-[var(--color-gold)]/10 px-6 py-3 font-[family-name:var(--font-display)] text-lg tracking-wide text-[var(--color-gold)] transition-colors hover:bg-[var(--color-gold)]/20 lg:text-2xl lg:px-8 lg:py-4"
        >
          Request a Free Consultation
        </a>
      </div>
    </section>
  )
}
