import { Navigate, Link, useParams } from 'react-router-dom'
import { Gift, LockKeyhole, Star } from 'lucide-react'

import BackButton from '../components/navigation/BackButton'
import BottomNav from '../components/navigation/BottomNav'
import Alien from '../components/space/Alien'
import LetterChips from '../components/space/LetterChips'
import Planet from '../components/space/Planet'
import StarCounter from '../components/space/StarCounter'
import { FINAL_GAME_IDS, getLessonGlyph, getPlanet } from '../data/planets'
import {
  getUnitById,
  getUnitThemeClass,
  isLessonUnlocked,
  isUnitUnlocked,
} from '../data/units'
import useStudentProgress from '../hooks/useStudentProgress'
import '../styles/solar.css'
import '../styles/galaxy.css'

function UnitLessonsPage() {
  const { unitId } = useParams()
  const unit = getUnitById(unitId)
  const { completedLessons, loadingProgress, stars } = useStudentProgress()

  if (!unit || (!loadingProgress && !isUnitUnlocked(unit.id, completedLessons))) {
    return <Navigate to="/lecciones" replace />
  }

  const planet = getPlanet(unit.id)
  const lessons = unit.lessons.filter((lesson) => !FINAL_GAME_IDS.has(lesson.id))
  const finalGames = unit.lessons.filter((lesson) => FINAL_GAME_IDS.has(lesson.id))
  // Mientras carga el progreso, los planetas quedan neutros (sin estado).
  const states = new Map(unit.lessons.map((lesson) => {
    // Hechas: color de la unidad. La siguiente por cursar: amarillo. El resto, bloqueado.
    if (loadingProgress) return [lesson.id, 'loading']
    const completed = completedLessons.has(lesson.id)
    const unlocked = lesson.available && isLessonUnlocked(lesson.id, completedLessons)
    return [lesson.id, completed ? 'done' : unlocked ? 'current' : 'locked']
  }))
  const doneCount = unit.lessons.filter((lesson) => states.get(lesson.id) === 'done').length

  return (
    <main className={`page galaxy-page ${getUnitThemeClass(unit.id)}`} aria-labelledby="galaxy-title">
      <header className="space-header">
        <BackButton label="Volver a mi sistema solar" to="/lecciones" />
        <div>
          <span className="space-header__label">{unit.title} · {unit.pageRange}</span>
          <h1 id="galaxy-title" className="space-header__title">Planeta {planet.name}</h1>
        </div>
        <span className="space-header__end"><StarCounter value={stars} /></span>
      </header>

      <LetterChips items={planet.letters} label={`Letras del Planeta ${planet.name}`} />

      <section className="galaxy" aria-label={`Lecciones del Planeta ${planet.name}`}>
        <span className="galaxy__orbit" aria-hidden="true" />

        <ol className="galaxy__list">
          {lessons.map((lesson, index) => {
            const state = states.get(lesson.id)
            const glyph = getLessonGlyph(lesson)
            const planetState = state === 'loading' ? undefined : state
            return (
              <li key={lesson.id} className={`galaxy__stop galaxy__stop--${state}${index % 2 ? ' galaxy__stop--low' : ''}`}
                style={{ '--i': index }}>
                {state === 'current' && <span className="galaxy__tap" aria-hidden="true">¡Toca aquí!</span>}
                <Planet size={state === 'current' ? 140 : 90} state={planetState} ring={state === 'current'}
                  label={lesson.title} to={state === 'locked' || state === 'loading' ? undefined : lesson.route}
                  aria-label={`${lesson.title}${state === 'locked' ? (lesson.available ? ', bloqueada' : ', próximamente') : state === 'done' ? ', completada' : ''}`}>
                  {glyph
                    ? <span className={glyph.length > 3 ? 'galaxy__glyph galaxy__glyph--long' : 'galaxy__glyph'}>{glyph}</span>
                    : <Star aria-hidden="true" size={state === 'current' ? 48 : 34} />}
                </Planet>
              </li>
            )
          })}
        </ol>

        <div className="galaxy__neighbor">
          <span className="galaxy__bubble">Llevas {doneCount} de {unit.lessons.length}</span>
          <Alien color="var(--alien)" label={planet.alien} mood={doneCount ? 'happy' : 'normal'} scale={0.75} />
        </div>
      </section>

      {finalGames.length > 0 && <section className="galaxy-prizes" aria-label="Premio">
        {finalGames.map((game) => {
          const state = states.get(game.id)
          const content = <>
            {state === 'locked' ? <LockKeyhole aria-hidden="true" /> : <Gift aria-hidden="true" />}
            <span>
              <span className="galaxy-prize__label">Premio{state === 'done' ? ' · ganado' : ''}</span>
              <span className="galaxy-prize__title">{game.title}</span>
            </span>
          </>
          if (state === 'loading') return <span key={game.id} className="galaxy-prize">{content}</span>
          return state === 'locked'
            ? <span key={game.id} className="galaxy-prize galaxy-prize--locked">{content}</span>
            : <Link key={game.id} className="galaxy-prize" to={game.route}>{content}</Link>
        })}
      </section>}

      <BottomNav />
    </main>
  )
}

export default UnitLessonsPage
