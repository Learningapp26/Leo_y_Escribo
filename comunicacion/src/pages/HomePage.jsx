import { Flame, LogOut, Orbit, Rocket, Stamp as StampIcon, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'

import Button from '../components/common/Button'
import BottomNav from '../components/navigation/BottomNav'
import Alien from '../components/space/Alien'
import Planet from '../components/space/Planet'
import StarCounter from '../components/space/StarCounter'
import { getLessonPlanet, getPlanet } from '../data/planets'
import { getCurrentLesson } from '../data/units'
import useStudentName from '../hooks/useStudentName'
import useStudentProgress from '../hooks/useStudentProgress'
import '../styles/home.css'

function HomePage() {
  const name = useStudentName()
  const { completedLessons, loadingProgress, stars, streakDays } = useStudentProgress()
  const current = loadingProgress ? null : getCurrentLesson(completedLessons)
  const planetId = current ? getLessonPlanet(current.lesson, current.unit.id) : null
  const planet = planetId === null ? null : getPlanet(planetId)

  return (
    <main className="page home-page" aria-labelledby="home-title">
      <span className="home-page__giant-planet" aria-hidden="true" />

      <header className="home-header">
        <span className="home-header__avatar" aria-hidden="true">{name ? name[0].toUpperCase() : 'L'}</span>
        <h1 id="home-title" className="home-header__title">¡Hola{name ? `, ${name}` : ''}!</h1>
        <span className="home-header__chips">
          <span className="home-chip" aria-label={`${streakDays} días seguidos`}>
            <Flame aria-hidden="true" /> {streakDays} {streakDays === 1 ? 'día' : 'días'}
          </span>
          <StarCounter value={stars} />
          {/* Para adultos: visible pero lejos de la acción principal */}
          <Link className="home-logout" to="/"><LogOut aria-hidden="true" />Salir</Link>
        </span>
      </header>

      <section className="home-window" aria-label="Leo te espera en el cohete">
        <div className="home-window__glass">
          <img src="/images/home-reading.png" alt="" draggable={false} />
        </div>
        <div className="home-window__leo">
          <Alien mood="happy" scale={0.8} />
          <span className="home-window__bubble">¡Vamos!</span>
        </div>
      </section>

      <section className={`home-mission ${planetId === null ? '' : `planet--${planetId}`}`} aria-labelledby="mission-title">
        <h2 id="mission-title" className="home-mission__label">Misión de hoy</h2>
        {current ? <>
          <div className="home-mission__body">
            <div className="home-mission__sky">
              <Planet size={130} ring />
              {[1, 2, 3, 4, 5].map((n) => <span key={n} className={`home-mission__star home-mission__star--${n}`} aria-hidden="true" />)}
            </div>
            <div>
              <p className="home-mission__planet">Planeta {planet.name}</p>
              <p className="home-mission__lesson">{current.lesson.title}</p>
              {current.lesson.bookPage && <p className="home-mission__page">Libro pág. {current.lesson.bookPage}</p>}
            </div>
          </div>
          <Button to={current.lesson.route} size="large" icon={Rocket} fullWidth>¡Despegar!</Button>
        </> : <p className="home-mission__lesson">{loadingProgress ? 'Preparando el cohete…' : '¡Terminaste todas las misiones!'}</p>}
      </section>

      <nav className="home-shortcuts" aria-label="Accesos rápidos">
        <Link className="home-shortcut home-shortcut--sky" to="/lecciones"><Orbit aria-hidden="true" />Mi galaxia</Link>
        <Link className="home-shortcut home-shortcut--pink" to="/sellos"><StampIcon aria-hidden="true" />Mis sellos</Link>
        <Link className="home-shortcut home-shortcut--lilac" to="/progreso"><TrendingUp aria-hidden="true" />Mi progreso</Link>
      </nav>

      <BottomNav />
    </main>
  )
}

export default HomePage
