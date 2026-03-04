import Image from 'next/image'

interface Props {
  sections: { id: string; label: string }[]
  activeSection: string
}

export function DesktopHeader({ sections, activeSection }: Props) {
  return (
    <div className="mx-auto hidden h-20 items-center justify-between header:flex">
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
              className={`relative text-base font-medium uppercase tracking-[0.15em] [text-shadow:_0_1px_4px_rgb(0_0_0_/_80%)] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-[var(--color-gold)] after:transition-all after:duration-300 ${
                activeSection === id
                  ? 'text-[var(--color-gold)] after:w-full'
                  : 'text-[var(--color-cream)] after:w-0 hover:text-[var(--color-gold)] hover:after:w-full'
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
