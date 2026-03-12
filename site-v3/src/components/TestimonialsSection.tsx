import { SectionHeading } from '@/components/SectionHeading'

interface TestimonialItem {
  author: string
  quote: string
  context?: string
}

interface TestimonialsSectionProps {
  data: {
    ornament?: string
    testimonial1?: TestimonialItem
    testimonial2?: TestimonialItem
    testimonial3?: TestimonialItem
  } | null
}

export function TestimonialsSection({ data }: TestimonialsSectionProps) {
  if (!data) return null
  const items = [data.testimonial1, data.testimonial2, data.testimonial3].filter(Boolean) as TestimonialItem[]
  if (!items.length) return null

  return (
    <section id="testimonials" className="section-px border-b-2 border-[var(--color-border)] py-20 scroll-mt-16 lg:scroll-mt-20">
      <div>
        <SectionHeading ornament={data.ornament ?? '8'}>Testimonials</SectionHeading>
        <div className="mt-12 grid gap-8 min-[1297px]:grid-cols-3">
          {items.map((t, i) => (
            <div
              key={i}
              className="flex flex-col gap-6  border border-[var(--color-gold)]/20 bg-white/[0.02] p-8"
            >
              <p className="flex-1 font-[family-name:var(--font-serif)] text-lg leading-relaxed text-[var(--color-text)] opacity-90">
                &ldquo;{t.quote.trim()}&rdquo;
              </p>
              <div>
                <div className="font-[family-name:var(--font-inter)] text-sm font-semibold text-[var(--color-gold)]">
                  {t.author}
                </div>
                {t.context && (
                  <div className="mt-0.5 font-[family-name:var(--font-inter)] text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                    {t.context}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
