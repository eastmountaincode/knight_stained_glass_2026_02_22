import Image from 'next/image'
import { Phone, Mail, MapPin, Instagram } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { StraightHyphenText } from '@/components/StraightHyphenText'
import { urlFor } from '@/lib/sanity'

interface ContactSectionProps {
  data: {
    heading?: string
    ornament?: string
    phone?: string
    email?: string
    address?: string
    body?: string
    image?: { asset: { _id: string; url: string }; alt?: string }
  } | null
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  if (digits.length === 11 && digits[0] === '1') {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  }
  return raw
}

export function ContactSection({ data }: ContactSectionProps) {
  if (!data) return null

  const imageSrc = data.image?.asset
    ? urlFor(data.image.asset).width(800).url()
    : null

  return (
    <section
      id="contact"
      className="section-px flex min-h-[calc(100vh-4rem)] flex-col snap-start scroll-mt-16 py-20 lg:min-h-[calc(100vh-5rem)] lg:scroll-mt-20"
    >
      <div className="flex flex-1 flex-col lg:grid lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-16">
        <div className="flex flex-col min-[730px]:items-center lg:items-start lg:justify-center">
          <SectionHeading ornament={data.ornament ?? '5'}>{data.heading ?? 'Contact'}</SectionHeading>

          <dl className="mt-8 space-y-6 text-[var(--color-text)]">
            {data.phone && (
              <div className="flex items-start gap-4">
                <Phone className="mt-1 h-6 w-6 shrink-0 text-[var(--color-gold)]" />
                <div>
                  <dt className="text-sm uppercase tracking-widest text-[var(--color-text-muted)]">Phone</dt>
                  <dd className="mt-1 font-[family-name:var(--font-inter)] text-lg sm:text-2xl">
                    <a href={`tel:${data.phone.replace(/\D/g, '')}`} className="hover:text-[var(--color-gold)] transition-colors">
                      {formatPhone(data.phone)}
                    </a>
                  </dd>
                </div>
              </div>
            )}
            {data.email && (
              <div className="flex items-start gap-4">
                <Mail className="mt-1 h-6 w-6 shrink-0 text-[var(--color-gold)]" />
                <div>
                  <dt className="text-sm uppercase tracking-widest text-[var(--color-text-muted)]">Email</dt>
                  <dd className="mt-1 font-[family-name:var(--font-inter)] text-lg sm:text-2xl">
                    <a href={`mailto:${data.email}`} className="hover:text-[var(--color-gold)] transition-colors">
                      {data.email}
                    </a>
                  </dd>
                </div>
              </div>
            )}
            {data.address && (
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-6 w-6 shrink-0 text-[var(--color-gold)]" />
                <div>
                  <dt className="text-sm uppercase tracking-widest text-[var(--color-text-muted)]">Address</dt>
                  <dd className="mt-1 whitespace-pre-line font-[family-name:var(--font-inter)] text-lg sm:text-2xl">{data.address}</dd>
                </div>
              </div>
            )}
          </dl>
          {data.body && (
            <StraightHyphenText className="mt-8 max-w-2xl whitespace-pre-line text-2xl text-[var(--color-text)]">{data.body}</StraightHyphenText>
          )}
          <div className="mt-8 flex items-center gap-6">
            <a href="https://www.instagram.com/knightstainedglass/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors">
              <Instagram className="h-7 w-7" />
            </a>
            <a href="https://share.google/RYFmGNtQY24oKK84p" target="_blank" rel="noopener noreferrer" aria-label="Google Reviews" className="text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors">
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </a>
          </div>
        </div>
        {imageSrc && (
          <div className="relative mt-10 aspect-[3/4] w-full overflow-hidden lg:mt-0 max-w-md lg:max-w-none mx-auto lg:mx-0">
            <Image
              src={imageSrc}
              alt={data.image?.alt ?? 'Contact Knight Stained Glass'}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        )}
      </div>
    </section>
  )
}
