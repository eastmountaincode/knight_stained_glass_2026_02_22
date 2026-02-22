import { Nav } from '@/components/Nav'

const placeholderSections = [
  { id: 'hero', label: 'Hero' },
  { id: 'church', label: 'Church Restorations' },
  { id: 'commercial', label: 'Commercial Work' },
  { id: 'residential', label: 'Residential' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export default function Home() {
  return (
    <>
      <Nav />
      {placeholderSections.map(({ id, label }) => (
        <section
          key={id}
          id={id}
          className="flex min-h-screen snap-start items-center justify-center border-b border-[var(--color-border)]"
        >
          <h2 className="font-[family-name:var(--font-uncial)] text-4xl text-[var(--color-gold)]">
            {label}
          </h2>
        </section>
      ))}
    </>
  )
}
