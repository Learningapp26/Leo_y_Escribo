import PhaseDots from '../space/PhaseDots'

// Con pocas partes (actividades), el avance se muestra con PhaseDots;
// con muchas, como barra. `value` es lo ya completado o la parte actual,
// según la página; PhaseDots marca hechas las anteriores a la actual.
function ProgressBar({ value = 0, max = 100, label = 'Progreso', dots = max <= 12 }) {
  const safeMax = max <= 0 ? 100 : max
  const percentage = Math.min(Math.max((value / safeMax) * 100, 0), 100)

  if (dots && max > 0) {
    // Las páginas pasan la parte actual ("Parte 2 de 4", 1..max) o cuántas
    // van ("3 de 8 fichas", 0..max).
    const isCurrentStep = /^(Parte|Palabra|Ejercicio|Paso|Pareja) \d/.test(label)
    const current = Math.min(Math.max(Math.round(value) - (isCurrentStep ? 1 : 0), 0), max)
    return (
      <div className="progress-dots" role="group" aria-label={label}>
        <PhaseDots current={current} total={max} />
      </div>
    )
  }

  return (
    <div className="progress-bar-wrapper">
      <div className="progress-bar-wrapper__header">
        <span>{label}</span>
        <span>{Math.round(percentage)}%</span>
      </div>

      <div className="progress-bar" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">
        <div
          className="progress-bar__fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
