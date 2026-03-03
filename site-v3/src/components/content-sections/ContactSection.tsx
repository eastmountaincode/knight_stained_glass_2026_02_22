import Image from 'next/image'
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

export function ContactSection({ data }: ContactSectionProps) {
  if (!data) return null

  const imageSrc = data.image?.asset
    ? urlFor(data.image.asset).width(800).url()
    : null

  return (
    <section
      id="contact"
      className="section-px flex min-h-[calc(100vh-3.5rem)] flex-col snap-start scroll-mt-14 py-20 lg:min-h-[calc(100vh-5rem)] lg:scroll-mt-20"
    >
      <div className="flex flex-1 flex-col lg:grid lg:grid-cols-[3fr_2fr] lg:gap-16">
        <div className="lg:flex lg:flex-col lg:justify-center">
          <h2 className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-gold)]">
            {data.heading ?? 'Contact'}
          </h2>

          <div className="mt-6 space-y-4 text-lg text-[var(--color-text)]">
            {data.phone && (
              <p>
                <a href={`tel:${data.phone.replace(/\D/g, '')}`} className="hover:text-[var(--color-gold)] transition-colors">
                  {data.phone}
                </a>
              </p>
            )}
            {data.email && (
              <p>
                <a href={`mailto:${data.email}`} className="hover:text-[var(--color-gold)] transition-colors">
                  {data.email}
                </a>
              </p>
            )}
            {data.address && (
              <p className="whitespace-pre-line">{data.address}</p>
            )}
            {data.body && (
              <p className="whitespace-pre-line mt-4">{data.body}</p>
            )}
          </div>
        </div>
        {imageSrc && (
          <div className="relative mt-10 aspect-[3/4] w-full overflow-hidden rounded lg:mt-0 max-w-md lg:max-w-none mx-auto lg:mx-0">
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
