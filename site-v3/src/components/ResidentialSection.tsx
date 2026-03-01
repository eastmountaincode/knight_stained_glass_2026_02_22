import { ImageCarousel, type CarouselImage } from '@/components/ImageCarousel'
import { urlFor } from '@/lib/sanity'

interface ResidentialSectionProps {
  data: {
    title: string
    description?: string
    image?: Array<{ _key: string; asset: { _id: string; url: string }; alt?: string; caption?: string }>
  }
}

export function ResidentialSection({ data }: ResidentialSectionProps) {
  const images: CarouselImage[] = (data.image ?? []).map((img) => ({
    key: img._key,
    src: urlFor(img.asset).width(1200).url(),
    alt: img.alt ?? 'Residential stained glass',
    caption: img.caption,
  }))

  return (
    <section
      id="residential"
      className="flex min-h-screen flex-col snap-start border-b border-[var(--color-border)] px-6 py-20 sm:px-12 md:px-20"
    >
      <h2 className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-gold)]">
        {data.title}
      </h2>
      {data.description && (
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-text)]">{data.description}</p>
      )}
      {images.length > 0 && (
        <ImageCarousel images={images} className="mt-10 flex-1" />
      )}
    </section>
  )
}
