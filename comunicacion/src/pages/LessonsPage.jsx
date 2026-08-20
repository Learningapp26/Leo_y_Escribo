import {
  ArrowRight,
  LockKeyhole,
  MapPinned,
  Trees,
} from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import BottomNav from '../components/navigation/BottomNav'
import {
  getUnitThemeClass,
  isUnitUnlocked,
  units,
} from '../data/units'
import useStudentProgress from '../hooks/useStudentProgress'
import '../styles/units-map.css'

function LessonsPage() {
  const { completedLessons, loadingProgress } = useStudentProgress()

  return (
    <main className="page units-map-page">
      <BackButton
        label="Volver al inicio"
        to="/home"
      />

      <header className="units-map-header">
        <Trees
          className="units-map-header__icon"
          aria-hidden="true"
        />

        <h1>Mapa de unidades</h1>

        <p className="text-instruction">
          Recorre el bosque y completa cada unidad para abrir
          el siguiente tramo del camino.
        </p>
      </header>

      <section
        className="units-map"
        aria-label="Camino de unidades"
      >
        {units.map((unit, index) => {
          const unlocked = !loadingProgress && isUnitUnlocked(
            unit.id,
            completedLessons,
          )
          const isLeft = index % 2 === 0
          const themeClass =
            getUnitThemeClass(unit.id)

          const unitCard = (
            <Card
              className={[
                'unit-map-card',
                themeClass,
                unlocked
                  ? ''
                  : 'unit-map-card--locked',
              ]
                .filter(Boolean)
                .join(' ')}
              icon={
                unlocked
                  ? MapPinned
                  : LockKeyhole
              }
              title={unit.title}
              subtitle={
                unlocked
                  ? 'Disponible'
                  : 'Bloqueada'
              }
              footer={
                <Button
                  to={
                    unlocked
                      ? `/lecciones/unidad/${unit.id}`
                      : undefined
                  }
                  variant={
                    unlocked
                      ? 'primary'
                      : 'secondary'
                  }
                  icon={
                    unlocked
                      ? ArrowRight
                      : LockKeyhole
                  }
                  iconPosition="right"
                  fullWidth
                  disabled={!unlocked}
                >
                  {unlocked
                    ? 'Explorar unidad'
                    : 'Completa la anterior'}
                </Button>
              }
            />
          )

          return (
            <div
              className="units-map__stop"
              key={unit.id}
            >
              <div
                className={[
                  'units-map__side',
                  isLeft
                    ? 'units-map__side--card'
                    : 'units-map__side--scenery',
                ].join(' ')}
              >
                {isLeft ? (
                  unitCard
                ) : (
                  <Trees
                    className="units-map__forest-icon"
                    aria-hidden="true"
                  />
                )}
              </div>

              <span
                className={[
                  'units-map__marker',
                  unlocked
                    ? 'units-map__marker--unlocked'
                    : 'units-map__marker--locked',
                ].join(' ')}
                aria-hidden="true"
              >
                {unlocked
                  ? unit.id
                  : <LockKeyhole />}
              </span>

              <div
                className={[
                  'units-map__side',
                  isLeft
                    ? 'units-map__side--scenery'
                    : 'units-map__side--card',
                ].join(' ')}
              >
                {isLeft ? (
                  <Trees
                    className="units-map__forest-icon"
                    aria-hidden="true"
                  />
                ) : (
                  unitCard
                )}
              </div>
            </div>
          )
        })}
      </section>
      <BottomNav />
    </main>
  )
}

export default LessonsPage
