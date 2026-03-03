import { ImageCarousel, type CarouselImage } from '@/components/ImageCarousel'
import { urlFor } from '@/lib/sanity'

interface CommercialSectionProps {
  data: {
    title: string
    description?: string
    image?: Array<{ _key: string; asset: { _id: string; url: string }; alt?: string; caption?: string }>
  }
}

export function CommercialSection({ data }: CommercialSectionProps) {
  const images: CarouselImage[] = (data.image ?? []).map((img) => ({
    key: img._key,
    src: urlFor(img.asset).width(1200).url(),
    alt: img.alt ?? 'Commercial stained glass',
    caption: img.caption,
  }))

  return (
    <section
      id="commercial"
      className="section-px flex min-h-[calc(100vh-3.5rem)] flex-col snap-start scroll-mt-14 border-b border-[var(--color-border)] py-20 lg:min-h-[calc(100vh-5rem)] lg:scroll-mt-20"
    >
      <div className="flex flex-1 flex-col lg:grid lg:grid-cols-[2fr_3fr] lg:gap-16">
        <div className="lg:flex lg:flex-col lg:justify-center">
          <h2 className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-gold)]">
            {data.title}
          </h2>
          {data.description && (
            <p className="mt-4 max-w-2xl text-lg text-[var(--color-text)]">{data.description}</p>
          )}
        </div>
        {images.length > 0 && (
          <ImageCarousel images={images} className="mt-10 flex-1 lg:mt-0" />
        )}
      </div>
    </section>
  )
}
