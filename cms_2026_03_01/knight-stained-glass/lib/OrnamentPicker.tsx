import { useEffect } from 'react'
import { set, unset } from 'sanity'
import type { StringInputProps } from 'sanity'

const ORNAMENTS = [
  { char: '1', label: 'Cross' },
  { char: '2', label: 'Flower' },
  { char: '3', label: 'Leaf' },
  { char: '4', label: 'Snowflake' },
  { char: '5', label: 'Diamond' },
  { char: '6', label: 'Star' },
  { char: '7', label: 'Fleur' },
  { char: '8', label: 'Vine' },
]

const FONT_URL = 'https://use.typekit.net/ghg2orb.css'
const FONT_FAMILY = 'p22-morris-ornaments'

export function OrnamentPicker(props: StringInputProps) {
  const { value, onChange } = props

  useEffect(() => {
    if (document.querySelector(`link[href="${FONT_URL}"]`)) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FONT_URL
    document.head.appendChild(link)
  }, [])

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {ORNAMENTS.map(({ char, label }) => {
        const selected = value === char
        return (
          <button
            key={char}
            type="button"
            title={label}
            onClick={() => onChange(selected ? unset() : set(char))}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '10px 14px',
              border: `2px solid ${selected ? '#c9a84c' : '#444'}`,
              borderRadius: 6,
              background: selected ? 'rgba(201,168,76,0.15)' : 'transparent',
              cursor: 'pointer',
              minWidth: 60,
              outline: selected ? '2px solid rgba(201,168,76,0.4)' : 'none',
              outlineOffset: 2,
            }}
          >
            {selected && (
              <span style={{
                position: 'absolute',
                top: 3,
                right: 5,
                fontSize: 10,
                color: '#c9a84c',
                fontFamily: 'sans-serif',
                lineHeight: 1,
              }}>✓</span>
            )}
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 28,
                color: selected ? '#e0c06a' : '#c9a84c',
                lineHeight: 1,
              }}
            >
              {char}
            </span>
            <span style={{ fontSize: 10, color: selected ? '#c9a84c' : '#999', fontFamily: 'sans-serif', fontWeight: selected ? 600 : 400 }}>
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
