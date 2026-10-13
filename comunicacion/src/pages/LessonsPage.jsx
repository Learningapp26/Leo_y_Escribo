import BackButton from '../components/navigation/BackButton'
import BottomNav from '../components/navigation/BottomNav'
import Alien from '../components/space/Alien'
import Planet from '../components/space/Planet'
import StarCounter from '../components/space/StarCounter'
import { PLANETS, getLessonPlanet } from '../data/planets'
import { getCurrentLesson, isUnitUnlocked, planetHasLessons } from '../data/units'
import useStudentProgress from '../hooks/useStudentProgress'
import '../styles/solar.css'

// Camino en S de abajo a la izquierda (Vocales) a arriba a la derecha
// (Escritor), en % del lienzo de 960×640.
const PATH = [[9, 84], [33, 88], [58, 82], [84, 60], [58, 50], [32, 47], [44, 16], [78, 14]]

function LessonsPage() {
  const { completedLessons, loadingProgress, stars } = useStudentProgress()
  const current = loadingProgress ? null : getCurrentLesson(completedLessons)
  const currentPlanet = current ? getLessonPlanet(current.lesson, current.unit.id) : null

  const planets = PLANETS.map((planet) => {
    const unlocked = !loadingProgress && (planet.id === 0 || (planet.id <= 6 && isUnitUnlocked(planet.id, completedLessons)))
    const state = loadingProgress ? undefined : !unlocked || !planetHasLessons(planet.id) ? 'locked'
      : planet.id === currentPlanet ? 'current'
        : currentPlanet === null || planet.id < currentPlanet ? 'done' : undefined
    const route = planet.id === 0 ? '/lecciones/vocales' : `/lecciones/unidad/${planet.id}`
    return { ...planet, state, route }
  })
  const target = planets.find((planet) => planet.state === 'current')

  return (
    <main className="page solar-page" aria-labelledby="solar-title">
      <header className="space-header">
        <BackButton label="Volver al inicio" to="/home" />
        <h1 id="solar-title" className="space-header__title">Mi sistema solar</h1>
        <span className="space-header__end"><StarCounter value={stars} /></span>
      </header>

      <section className="solar-map" aria-label="Planetas del viaje">
        <svg className="solar-map__path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points={PATH.map(([x, y]) => `${x},${y}`).join(' ')} />
        </svg>

        <ol className="solar-map__list">
          {planets.map((planet) => {
            const [x, y] = PATH[planet.id]
            return (
              <li key={planet.id} className={`solar-map__stop planet--${planet.id}`} style={{ '--x': `${x}%`, '--y': `${y}%` }}>
                <Planet size={planet.state === 'current' ? 136 : 100} state={planet.state} ring={planet.id % 3 === 1}
                  label={`Planeta ${planet.name}`} to={planet.state === 'locked' ? undefined : planet.route}
                  aria-label={`Planeta ${planet.name}${planet.state === 'locked' ? ', bloqueado' : planet.state === 'done' ? ', completado' : ''}`}>
                  {planet.id}
                </Planet>
              </li>
            )
          })}
        </ol>

        {target && <div className="solar-map__leo">
          <span className="solar-map__bubble">¡Vamos al Planeta {target.name}!</span>
          <Alien mood="talking" scale={0.7} />
        </div>}
      </section>

      <BottomNav />
    </main>
  )
}

export default LessonsPage
