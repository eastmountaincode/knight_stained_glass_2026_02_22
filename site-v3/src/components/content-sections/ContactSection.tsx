import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { StraightHyphenText } from '@/components/StraightHyphenText'
import { urlFor } from '@/lib/sanity'

interface ContactSectionProps {
  data: {
    heading?: string
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
          <SectionHeading ornament="5">{data.heading ?? 'Contact'}</SectionHeading>

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
