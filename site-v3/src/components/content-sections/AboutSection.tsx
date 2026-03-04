import Image from 'next/image'
import { SectionHeading } from '@/components/SectionHeading'
import { urlFor } from '@/lib/sanity'

interface AboutSectionProps {
  data: {
    heading?: string
    body?: string
    image?: { asset: { _id: string; url: string }; alt?: string }
  } | null
}

export function AboutSection({ data }: AboutSectionProps) {
  if (!data) return null

  const imageSrc = data.image?.asset
    ? urlFor(data.image.asset).width(800).url()
    : null

  return (
    <section
      id="about"
      className="section-px flex min-h-[calc(100vh-4rem)] flex-col snap-start scroll-mt-16 border-b-2 border-[var(--color-border)] py-20 lg:min-h-[calc(100vh-5rem)] lg:scroll-mt-20"
    >
      <div className="flex flex-1 flex-col lg:grid lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-16">
        <div className="flex flex-col min-[730px]:items-center lg:items-start lg:justify-center">
          <SectionHeading ornament="4">{data.heading ?? 'About'}</SectionHeading>
          {data.body && (
            <p className="mt-4 max-w-2xl whitespace-pre-line text-2xl text-[var(--color-text)]">
              {data.body}
            </p>
          )}
        </div>
        {imageSrc && (
          <div className="relative mt-10 aspect-[3/4] w-full overflow-hidden lg:mt-0 max-w-md lg:max-w-none mx-auto lg:mx-0">
            <Image
              src={imageSrc}
              alt={data.image?.alt ?? 'About Knight Stained Glass'}
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
