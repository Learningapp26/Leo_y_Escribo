import {
  Navigate,
  useParams,
} from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  LockKeyhole,
} from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import BottomNav from '../components/navigation/BottomNav'
import {
  getLessonThemeClass,
} from '../data/lessonColors'
import {
  getUnitById,
  getUnitThemeClass,
  isUnitUnlocked,
} from '../data/units'
import '../styles/units-map.css'

function UnitLessonsPage() {
  const { unitId } = useParams()
  const unit = getUnitById(unitId)

  if (!unit || !isUnitUnlocked(unit.id)) {
    return (
      <Navigate
        to="/lecciones"
        replace
      />
    )
  }

  const unitThemeClass =
    getUnitThemeClass(unit.id)

  return (
    <main
      className={`page unit-lessons-page ${unitThemeClass}`}
      aria-labelledby="unit-lessons-title"
    >
      <BackButton
        label="Volver al mapa"
        to="/lecciones"
      />

      <header className="unit-lessons-header">
        <BookOpen
          className="unit-lessons-header__icon"
          aria-hidden="true"
        />

        <span className="text-ui-label">
          {unit.pageRange}
        </span>

        <h1 id="unit-lessons-title">
          {unit.title}
        </h1>

        <p className="text-instruction">
          Selecciona una lección para continuar tu recorrido.
        </p>
      </header>

      <section
        className="unit-lessons-grid"
        aria-label={`Lecciones de ${unit.title}`}
      >
        {unit.lessons.map((lesson) => {
          const lessonThemeClass =
            getLessonThemeClass(lesson.id)

          return (
            <Card
              className={`unit-lesson-card ${lessonThemeClass}`}
              key={lesson.id}
              icon={
                lesson.available
                  ? BookOpen
                  : LockKeyhole
              }
              title={lesson.title}
              subtitle={
                lesson.available
                  ? 'Disponible'
                  : 'Próximamente'
              }
              footer={
                <Button
                  to={
                    lesson.available
                      ? lesson.route
                      : undefined
                  }
                  variant={
                    lesson.available
                      ? 'primary'
                      : 'secondary'
                  }
                  icon={
                    lesson.available
                      ? ArrowRight
                      : LockKeyhole
                  }
                  iconPosition="right"
                  fullWidth
                  disabled={!lesson.available}
                >
                  {lesson.available
                    ? 'Comenzar'
                    : 'No disponible'}
                </Button>
              }
            />
          )
        })}
      </section>

      <BottomNav />
    </main>
  )
}

export default UnitLessonsPage