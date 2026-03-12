import Image from 'next/image'
import { ImageCarousel, type CarouselImage } from '@/components/ImageCarousel'
import { SectionHeading } from '@/components/SectionHeading'
import { StraightHyphenText } from '@/components/StraightHyphenText'
import { urlFor } from '@/lib/sanity'

interface ReligiousSectionProps {
  data: {
    title: string
    description?: string
    image?: Array<{ _key: string; asset: { _id: string; url: string }; alt?: string; caption?: string }>
  }
}

export function ReligiousSection({ data }: ReligiousSectionProps) {
  const images: CarouselImage[] = (data.image ?? [])
    .filter((img) => img.asset != null)
    .map((img) => ({
      key: img._key,
      src: urlFor(img.asset).width(1200).url(),
      alt: img.alt ?? 'Church restoration stained glass',
      caption: img.caption,
    }))

  return (
    <section
      id="religious"
      className="relative section-px flex flex-col scroll-mt-16 border-b-2 border-[var(--color-border)] py-20 lg:min-h-[calc(100vh-5rem)] lg:scroll-mt-20 overflow-hidden"
    >
      {/* Decorative schematic — mobile */}
      <Image
        src="/images/bg_2.png"
        alt=""
        width={800}
        height={800}
        className="pointer-events-none absolute invert select-none lg:hidden"
        style={{ right: '-18%', top: '-8%', width: '95%', opacity: 0.07, transform: 'scale(1.5)' }}
        aria-hidden="true"
        unoptimized
      />
      {/* Decorative schematic — desktop */}
      <Image
        src="/images/bg_2.png"
        alt=""
        width={800}
        height={800}
        className="pointer-events-none absolute right-[70%] top-[-20%] w-[60%] max-w-[800px] opacity-[0.05] invert select-none hidden lg:block"
        aria-hidden="true"
        unoptimized
      />
      <div className="flex flex-1 flex-col lg:grid lg:grid-cols-[2fr_3fr] lg:gap-16">
        <div className="flex flex-col min-[730px]:items-center lg:items-start lg:justify-center">
          <SectionHeading ornament="1">{data.title}</SectionHeading>
          {data.description && (
            <StraightHyphenText className="mt-4 max-w-2xl whitespace-pre-line text-2xl text-[var(--color-text)]">{data.description}</StraightHyphenText>
          )}
        </div>
        {images.length > 0 && (
          <ImageCarousel images={images} className="mt-10 flex-1 lg:mt-0" />
        )}
      </div>
    </section>
  )
}
