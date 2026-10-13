import { useId } from 'react'
import { getStamp, getStampRotation } from '../../data/stamps'

// Sello de goma de un solo color sobre un círculo blanco. El color es el
// --planet-ink de la unidad (o --sun-shadow si es brillante); `color` lo
// reemplaza. Los recortes se pintan con el color de la base.
function Stamp({ id, color, size = 120, locked = false, pressed = false, className = '' }) {
  const filterId = useId()
  const stamp = getStamp(id)
  if (!stamp) return null
  const style = { '--stamp-size': `${size}px` }

  if (locked) {
    return <span className={`stamp stamp--locked ${className}`.trim()} style={style}
      role="img" aria-label="Sello por ganar">?</span>
  }

  const ink = color ?? (stamp.shiny ? 'var(--sun-shadow)' : `var(--stamp-ink-${stamp.unit})`)
  const rotation = getStampRotation(stamp.id)
  return (
    <span className={`stamp${pressed ? ' stamp--pressed' : ''} ${className}`.trim()}
      style={{ ...style, '--stamp-rotate': `${rotation}deg` }} role="img" aria-label={`Sello: ${stamp.name}`}>
      <svg className="stamp__art" viewBox="0 0 100 100" aria-hidden="true"
        style={{ color: ink, transform: `rotate(${rotation}deg)`, filter: `url(#${CSS.escape(filterId)})` }}>
        <defs>
          {/* Borde de tinta apenas irregular */}
          <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={stamp.number} />
            <feDisplacementMap in="SourceGraphic" scale="1.5" />
          </filter>
        </defs>
        {stamp.parts.map((part, index) => {
          const paint = part.cut ? 'var(--stamp-base, #fff)' : 'currentColor'
          if (part.stroke) {
            return <path key={index} d={part.d} transform={part.transform} fill="none" stroke={paint}
              strokeWidth={part.stroke} strokeLinecap="round" strokeLinejoin="round" />
          }
          return <path key={index} d={part.d} transform={part.transform} fill={paint}
            {...(part.round ? { stroke: paint, strokeWidth: part.round, strokeLinejoin: 'round' } : {})} />
        })}
      </svg>
    </span>
  )
}

export default Stamp
