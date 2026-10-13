import { useState } from 'react'

import BackButton from '../components/navigation/BackButton'
import BottomNav from '../components/navigation/BottomNav'
import Stamp from '../components/space/Stamp'
import { PLANETS } from '../data/planets'
import { getEarnedStamps } from '../data/stampProgress'
import { STAMPS, getUnitStamps } from '../data/stamps'
import useStudentProgress from '../hooks/useStudentProgress'
import '../styles/solar.css'
import '../styles/album.css'

// Álbum de sellos (sección 4.8): una pestaña por planeta.
function StampAlbumPage() {
  const { completedLessons, loadingProgress } = useStudentProgress()
  const [unit, setUnit] = useState(1)
  const earned = new Set(loadingProgress ? [] : getEarnedStamps(completedLessons).map((stamp) => stamp.id))
  const shiny = STAMPS.filter((stamp) => stamp.shiny)

  return (
    <main className="page album-page" aria-labelledby="album-title">
      <header className="space-header">
        <BackButton label="Volver al inicio" to="/home" />
        <h1 id="album-title" className="space-header__title">Mis sellos</h1>
        <span className="space-header__end album-count">{earned.size} de {STAMPS.length}</span>
      </header>

      <div className="album-tabs" role="tablist" aria-label="Planetas">
        {PLANETS.map((planet) => (
          <button key={planet.id} type="button" role="tab" id={`album-tab-${planet.id}`}
            aria-selected={unit === planet.id} aria-controls="album-panel"
            className={`album-tab planet--${planet.id}${unit === planet.id ? ' album-tab--active' : ''}`}
            onClick={() => setUnit(planet.id)}>
            <span className="album-tab__dot" aria-hidden="true" />
            {planet.name}
          </button>
        ))}
      </div>

      <section id="album-panel" role="tabpanel" aria-labelledby={`album-tab-${unit}`} className="album-panel">
        <ul className="album-grid">
          {getUnitStamps(unit).map((stamp) => (
            <li key={stamp.id} className="album-grid__cell">
              <Stamp id={stamp.id} size={120} locked={!earned.has(stamp.id)} />
              <span className="album-grid__name">{earned.has(stamp.id) ? stamp.name : 'Por ganar'}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="album-panel" aria-labelledby="shiny-title">
        <h2 id="shiny-title" className="album-panel__title">Sellos brillantes</h2>
        <ul className="album-grid">
          {shiny.map((stamp) => (
            <li key={stamp.id} className="album-grid__cell">
              <Stamp id={stamp.id} size={120} locked={!earned.has(stamp.id)} />
              <span className="album-grid__name">{earned.has(stamp.id) ? stamp.name : 'Por ganar'}</span>
            </li>
          ))}
        </ul>
      </section>

      <BottomNav />
    </main>
  )
}

export default StampAlbumPage
