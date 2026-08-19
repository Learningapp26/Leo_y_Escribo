import { useEffect, useState } from 'react'
import { CheckCircle2, Circle, PlayCircle, Trees } from 'lucide-react'

import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import BottomNav from '../components/navigation/BottomNav'
import ProgressBar from '../components/progress/ProgressBar'
import { getUnitThemeClass, units } from '../data/units'
import { obtenerResumenProgreso } from '../lib/progreso'
import '../styles/units-map.css'

// Todas las lecciones disponibles hoy en la app, sin importar la unidad.
// Cuando se agreguen más (available: true en units.js), entran solas aquí.
const leccionesDisponiblesGlobal = units.flatMap((unit) =>
  unit.lessons.filter((leccion) => leccion.available),
)

// Estado de una lección a partir de los sets de completadas/iniciadas.
function getLeccionEstado(leccionId, completadas, iniciadas) {
  if (completadas.has(leccionId)) return 'completada'
  if (iniciadas.has(leccionId)) return 'en-progreso'
  return 'no-iniciada'
}

// Estado de la unidad completa: solo cuenta lo disponible hoy en la app.
function getUnidadEstado(lecciones, completadas, iniciadas) {
  const disponibles = lecciones.filter((leccion) => leccion.available)

  if (disponibles.length === 0) return 'no-iniciada'
  if (disponibles.every((leccion) => completadas.has(leccion.id))) return 'completada'
  if (disponibles.some((leccion) => iniciadas.has(leccion.id) || completadas.has(leccion.id))) {
    return 'en-progreso'
  }
  return 'no-iniciada'
}

const ESTADO_LABEL = {
  completada: 'Completada',
  'en-progreso': 'En progreso',
  'no-iniciada': 'No iniciada',
}

const ESTADO_ICON = {
  completada: CheckCircle2,
  'en-progreso': PlayCircle,
  'no-iniciada': Circle,
}

function ProgressPage() {
  const [resumen, setResumen] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    let activo = true

    obtenerResumenProgreso().then((datos) => {
      if (activo) {
        setResumen(datos)
        setCargando(false)
      }
    })

    return () => {
      activo = false
    }
  }, [])

  const completadas = resumen?.completadas ?? new Set()
  const iniciadas = resumen?.iniciadas ?? new Set()
  const sinProgreso = !cargando && completadas.size === 0 && iniciadas.size === 0

  const totalLecciones = leccionesDisponiblesGlobal.length
  const totalCompletadas = leccionesDisponiblesGlobal.filter((leccion) =>
    completadas.has(leccion.id),
  ).length

  return (
    <main className="page units-map-page">
      <BackButton label="Volver al inicio" to="/home" />

      <header className="units-map-header">
        <Trees className="units-map-header__icon" aria-hidden="true" />

        <h1>Mi progreso</h1>

        <p className="text-instruction">
          ¡Mira todo lo que has aprendido en tu aventura por el libro de Leo y Escribo!
        </p>

        <div className="card small">
          <h2>Estrellas ganadas</h2>
          <p>⭐ {resumen?.estrellas ?? 0}</p>
        </div>

        {!cargando && totalLecciones > 0 && (
          <ProgressBar
            value={totalCompletadas}
            max={totalLecciones}
            label={`${totalCompletadas} de ${totalLecciones} lecciones completadas`}
          />
        )}
      </header>

      {cargando && <p className="text-instruction">Cargando tu progreso...</p>}

      {sinProgreso && (
        <p className="text-instruction">
          Todavía no hay progreso guardado. Completa una actividad para
          empezar a ver tus avances aquí.
        </p>
      )}

      {!cargando && (
        <section className="unit-lessons-grid" aria-label="Progreso por unidad">
          {units.map((unit) => {
            const unidadEstado = getUnidadEstado(unit.lessons, completadas, iniciadas)
            const UnidadIcon = ESTADO_ICON[unidadEstado]
            const themeClass = getUnitThemeClass(unit.id)
            const leccionesDisponibles = unit.lessons.filter((leccion) => leccion.available)

            return (
              <Card
                className={`unit-lesson-card ${themeClass}`}
                key={unit.id}
                icon={UnidadIcon}
                title={unit.title}
                subtitle={ESTADO_LABEL[unidadEstado]}
              >
                {leccionesDisponibles.length === 0 ? (
                  <p className="text-instruction">Próximamente</p>
                ) : (
                  <ul className="progress-lesson-list">
                    {leccionesDisponibles.map((leccion) => {
                      const leccionEstado = getLeccionEstado(leccion.id, completadas, iniciadas)
                      const LeccionIcon = ESTADO_ICON[leccionEstado]

                      return (
                        <li className={`progress-lesson-list__item progress-lesson-list__item--${leccionEstado}`} key={leccion.id}>
                          <LeccionIcon aria-hidden="true" size={18} />
                          <span>{leccion.title}</span>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </Card>
            )
          })}
        </section>
      )}

      <BottomNav />
    </main>
  )
}

export default ProgressPage
