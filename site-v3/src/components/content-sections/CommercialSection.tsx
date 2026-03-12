import Image from 'next/image'
import { ImageCarousel, type CarouselImage } from '@/components/ImageCarousel'
import { SectionHeading } from '@/components/SectionHeading'
import { StraightHyphenText } from '@/components/StraightHyphenText'
import { urlFor } from '@/lib/sanity'

interface CommercialSectionProps {
  data: {
    title: string
    description?: string
    ornament?: string
    image?: Array<{ _key: string; asset: { _id: string; url: string }; alt?: string; caption?: string }>
  }
}

export function CommercialSection({ data }: CommercialSectionProps) {
  const images: CarouselImage[] = (data.image ?? [])
    .filter((img) => img.asset != null)
    .map((img) => ({
      key: img._key,
      src: urlFor(img.asset).width(1200).url(),
      alt: img.alt ?? 'Commercial stained glass',
      caption: img.caption,
    }))

  return (
    <section
      id="commercial"
      className="relative section-px flex flex-col scroll-mt-16 border-b-2 border-[var(--color-border)] py-20 lg:min-h-[calc(100vh-5rem)] lg:scroll-mt-20 overflow-hidden"
    >
      {/* Decorative schematic — mobile */}
      <Image
        src="/images/bg_3.png"
        alt=""
        width={800}
        height={800}
        className="pointer-events-none absolute invert select-none lg:hidden"
        style={{ right: '25%', top: '-2%', width: '100%', opacity: 0.07, transform: 'rotate(18deg) scale(1.5)' }}
        aria-hidden="true"
        unoptimized
      />
      {/* Decorative schematic — desktop */}
      <Image
        src="/images/bg_3.png"
        alt=""
        width={1000}
        height={1000}
        className="pointer-events-none absolute right-[24%] top-[25%] rotate-18 -translate-y-1/2 w-[75%] max-w-[900px] opacity-[0.06] invert select-none hidden lg:block"
        aria-hidden="true"
        unoptimized
      />
      <div className="flex flex-1 flex-col lg:grid lg:grid-cols-[2fr_3fr] lg:gap-16">
        <div className="flex flex-col min-[730px]:items-center lg:items-start lg:justify-center">
          <SectionHeading ornament={data.ornament ?? '5'}>{data.title}</SectionHeading>
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
