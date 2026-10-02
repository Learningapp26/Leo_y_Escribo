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
  isLessonUnlocked,
  isUnitUnlocked,
} from '../data/units'
import useStudentProgress from '../hooks/useStudentProgress'
import '../styles/units-map.css'

function UnitLessonsPage() {
  const { unitId } = useParams()
  const unit = getUnitById(unitId)
  const { completedLessons, loadingProgress } = useStudentProgress()

  if (!unit || (!loadingProgress && !isUnitUnlocked(unit.id, completedLessons))) {
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
          const completed = completedLessons.has(lesson.id)
          const unlocked = lesson.available && !loadingProgress &&
            isLessonUnlocked(lesson.id, completedLessons)

          return (
            <Card
              className={[
                'unit-lesson-card',
                lessonThemeClass,
                unlocked ? '' : 'unit-lesson-card--locked',
              ].filter(Boolean).join(' ')}
              key={lesson.id}
              aria-disabled={!unlocked}
              icon={
                unlocked
                  ? BookOpen
                  : LockKeyhole
              }
              title={lesson.title}
              subtitle={
                completed
                  ? 'Completada'
                  : unlocked
                    ? 'Disponible'
                    : lesson.available
                      ? 'Bloqueada'
                      : 'Próximamente'
              }
              footer={
                <Button
                  to={
                    unlocked
                      ? lesson.route
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
                  {completed
                    ? 'Volver a entrar'
                    : unlocked
                      ? 'Comenzar'
                      : lesson.available
                        ? 'Completa la anterior'
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
