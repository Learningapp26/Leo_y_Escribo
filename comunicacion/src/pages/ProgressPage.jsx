import { CheckCircle2, Circle, Flame, PlayCircle, Stamp as StampIcon, Star } from 'lucide-react'

import BackButton from '../components/navigation/BackButton'
import BottomNav from '../components/navigation/BottomNav'
import Planet from '../components/space/Planet'
import { getLessonUnit } from '../data/lessonColors'
import { FINAL_GAME_IDS, PLANETS, getLessonGlyph, getLessonPlanet } from '../data/planets'
import { getEarnedStamps } from '../data/stampProgress'
import { getCurrentLesson, planetHasLessons, units } from '../data/units'
import useStudentProgress from '../hooks/useStudentProgress'
import '../styles/solar.css'
import '../styles/progress.css'

// Lecciones de letra (con planeta propio) en el orden del libro.
const letterLessons = units.flatMap((unit) => unit.lessons
  .filter((lesson) => lesson.available && getLessonGlyph(lesson))
  .map((lesson) => ({ ...lesson, unitId: unit.id })))

// Las letras largas ("a e i o u", "l · s · n") se achican dentro del planeta.
function Glyph({ lesson }) {
  const glyph = getLessonGlyph(lesson)
  return <span className={glyph.length > 3 ? 'journey-glyph journey-glyph--long' : 'journey-glyph'}>{glyph}</span>
}

const ESTADO = {
  completada: { label: 'Completada', icon: CheckCircle2 },
  'en-progreso': { label: 'En progreso', icon: PlayCircle },
  'no-iniciada': { label: 'No iniciada', icon: Circle },
}

function ProgressPage() {
  const { completedLessons, startedLessons, loadingProgress, stars, streakDays } = useStudentProgress()
  const known = letterLessons.filter((lesson) => completedLessons.has(lesson.id))
  const next = letterLessons.filter((lesson) => !completedLessons.has(lesson.id)).slice(0, 3)
  const current = loadingProgress ? null : getCurrentLesson(completedLessons)
  const currentPlanet = current ? getLessonPlanet(current.lesson, current.unit.id) : PLANETS.length
  // Con todo terminado, la línea llega hasta el último planeta que tiene lecciones.
  const lineEnd = current ? currentPlanet : Math.max(...PLANETS.filter((planet) => planetHasLessons(planet.id)).map((planet) => planet.id))
  const stamps = loadingProgress ? [] : getEarnedStamps(completedLessons)

  const lessonState = (id) => completedLessons.has(id) ? 'completada' : startedLessons.has(id) ? 'en-progreso' : 'no-iniciada'

  return (
    <main className="page journey-page" aria-labelledby="journey-title">
      <header className="space-header">
        <BackButton label="Volver al inicio" to="/home" />
        <h1 id="journey-title" className="space-header__title">Mi viaje</h1>
      </header>

      <section className="journey-stats" aria-label="Mis números">
        <p className="journey-stat journey-stat--sun"><Star aria-hidden="true" /><strong>{stars}</strong> estrellas</p>
        <p className="journey-stat journey-stat--pink"><StampIcon aria-hidden="true" /><strong>{stamps.length}</strong> sellos</p>
        <p className="journey-stat journey-stat--peach"><Flame aria-hidden="true" /><strong>{streakDays}</strong> {streakDays === 1 ? 'día seguido' : 'días seguidos'}</p>
      </section>

      <section className="journey-letters" aria-labelledby="letters-title">
        <h2 id="letters-title">Letras que ya conozco</h2>
        {loadingProgress ? <p>Cargando tu viaje…</p> : <ul className="journey-letters__list">
          {known.map((lesson) => (
            <li key={lesson.id} className={`planet--${getLessonUnit(lesson.id) ?? lesson.unitId}`}>
              <Planet size={62} aria-label={lesson.title}><Glyph lesson={lesson} /></Planet>
            </li>
          ))}
          {next.map((lesson) => (
            <li key={lesson.id}><Planet size={62} state="locked" aria-label={`${lesson.title}, por aprender`}><Glyph lesson={lesson} /></Planet></li>
          ))}
          {!known.length && <li className="journey-letters__empty">¡Tu primera letra te espera!</li>}
        </ul>}
      </section>

      <section className="journey-route" aria-labelledby="route-title">
        <h2 id="route-title">Mi recorrido</h2>
        <ol className="journey-route__line" style={{ '--filled': Math.min(Math.max(lineEnd - 1, 0), 6) / 6 }}>
          {PLANETS.filter((planet) => planet.id >= 1).map((planet) => {
            const state = !planetHasLessons(planet.id) ? 'locked'
              : planet.id < currentPlanet ? 'done' : planet.id === currentPlanet ? 'current' : 'locked'
            return (
              <li key={planet.id} className={`journey-route__stop planet--${planet.id}`}>
                <Planet size={state === 'current' ? 76 : 52} state={state} label={planet.name}>{planet.id}</Planet>
                {state === 'current' && <span className="journey-route__tag">en viaje</span>}
              </li>
            )
          })}
        </ol>
      </section>

      {/* Detalle para la maestra o la familia */}
      <details className="journey-detail">
        <summary>Ver todas las lecciones</summary>
        <div className="journey-detail__grid">
          {units.map((unit) => (
            <section key={unit.id} className={`journey-detail__unit planet--${unit.id}`} aria-label={unit.title}>
              <h3>{unit.title} · Planeta {PLANETS[unit.id].name}</h3>
              <ul>
                {unit.lessons.filter((lesson) => lesson.available).map((lesson) => {
                  const state = lessonState(lesson.id)
                  const Icon = ESTADO[state].icon
                  return <li key={lesson.id} className={`journey-detail__lesson journey-detail__lesson--${state}`}>
                    <Icon aria-hidden="true" size={18} />
                    <span>{lesson.title}{FINAL_GAME_IDS.has(lesson.id) ? ' (premio)' : ''}</span>
                    <span className="visually-hidden">: {ESTADO[state].label}</span>
                  </li>
                })}
                {!unit.lessons.some((lesson) => lesson.available) && <li>Próximamente</li>}
              </ul>
            </section>
          ))}
        </div>
      </details>

      <BottomNav />
    </main>
  )
}

export default ProgressPage
