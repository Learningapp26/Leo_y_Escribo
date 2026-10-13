import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'

// Planeta de unidad o de lección. El color viene de la clase .planet--N
// del contenedor (o de `unit`). state: done | current | locked.
function Planet({ size = 110, label, state, ring = false, unit, to, children, className = '', ...props }) {
  const classes = ['planet', state ? `planet--${state}` : '', unit !== undefined ? `planet--${unit}` : '', className]
    .filter(Boolean).join(' ')
  const content = <>
    <span className="planet__body" style={{ '--planet-size': `${size}px` }}>
      {children}
      {ring && <>
        <span className="planet__ring planet__ring--back" aria-hidden="true" />
        <span className="planet__ring planet__ring--front" aria-hidden="true" />
      </>}
      {state === 'locked' && <Lock className="planet__lock" aria-hidden="true" />}
    </span>
    {label && <span className="planet__label">{label}</span>}
  </>
  if (to && state !== 'locked') return <Link className={classes} to={to} {...props}>{content}</Link>
  return <span className={classes} {...props}>{content}</span>
}

export default Planet
