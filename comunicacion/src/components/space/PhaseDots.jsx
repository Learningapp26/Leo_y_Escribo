import { Check } from 'lucide-react'

// Reemplaza a ProgressBar en las actividades: hecho (✓), actual (número), pendiente.
function PhaseDots({ current = 0, total = 0 }) {
  return (
    <ol className="phase-dots" aria-label={`Ejercicio ${Math.min(current + 1, total)} de ${total}`}>
      {Array.from({ length: total }, (_, index) => {
        const state = index < current ? 'done' : index === current ? 'current' : 'pending'
        return <li key={index} className={`phase-dots__dot phase-dots__dot--${state}`}
          aria-current={state === 'current' ? 'step' : undefined}>
          {state === 'done' ? <Check size={20} aria-label="hecho" /> : state === 'current' ? index + 1 : null}
        </li>
      })}
    </ol>
  )
}

export default PhaseDots
