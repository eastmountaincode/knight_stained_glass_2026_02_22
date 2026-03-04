import { Ornament } from '@/components/Ornament'

export function SectionHeading({ children, ornament }: { children: React.ReactNode; ornament?: string }) {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-gold)]">
        {ornament && <Ornament char={ornament} className="" />} {children}
      </h2>
    </div>
  )
}
