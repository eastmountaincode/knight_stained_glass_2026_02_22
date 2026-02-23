import Image from 'next/image'

interface Props {
  sections: { id: string; label: string }[]
  activeSection: string
}

export function DesktopHeader({ sections, activeSection }: Props) {
  return (
    <div className="mx-auto hidden h-24 max-w-[1200px] items-center justify-between lg:flex">
      <a href="#hero" className="flex items-center gap-3">
        <Image
          src="/shield-logo.png"
          alt="Knight Stained Glass shield"
          width={34}
          height={41}
          className="h-[41px] w-[34px]"
          unoptimized
        />
        <span className="whitespace-nowrap font-[family-name:var(--font-display-troy)] text-2xl text-[var(--color-cream)] tracking-wide">
          Knight Stained Glass
        </span>
      </a>

      <ul className="flex gap-8">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`text-base font-medium uppercase tracking-[0.15em] ${
                activeSection === id
                  ? 'text-[var(--color-gold)]'
                  : 'text-[var(--color-label)] hover:text-[var(--color-text)]'
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
