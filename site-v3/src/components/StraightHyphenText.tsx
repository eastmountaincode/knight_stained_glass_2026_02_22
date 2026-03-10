import React from 'react'

/**
 * Renders text with hyphens displayed in sans-serif so they appear
 * straight rather than slanted (the display font has a slanted hyphen).
 */
export function StraightHyphenText({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  if (typeof children !== 'string') return <p {...props}>{children}</p>

  const parts = children.split(/(-|‑)/)
  return (
    <p {...props}>
      {parts.map((part, i) =>
        part === '-' || part === '‑' ? (
          <span key={i} style={{ fontFamily: 'sans-serif' }}>
            -
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </p>
  )
}
