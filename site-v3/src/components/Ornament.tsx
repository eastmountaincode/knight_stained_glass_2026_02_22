/**
 * Decorative ornament using P22 Morris Ornaments font.
 * Try different characters to get different ornaments:
 *   1-8  → small symbols (cross, flower, leaf, snowflake, etc.)
 *   A-Z  → illuminated capitals (style 1)
 *   a-z  → illuminated capitals (style 2)
 */
export function Ornament({
  char = '5',
  className = '',
}: {
  char?: string
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={`font-[family-name:var(--font-ornaments)] text-[var(--color-gold)] select-none ${className}`}
    >
      {char}
    </span>
  )
}

/** Centered ornament divider — use between sections */
export function OrnamentDivider({
  char = '5',
  className = '',
}: {
  char?: string
  className?: string
}) {
  return (
    <div className={`flex items-center justify-center py-6 ${className}`}>
      <Ornament char={char} className="text-2xl opacity-60 lg:text-3xl" />
    </div>
  )
}
