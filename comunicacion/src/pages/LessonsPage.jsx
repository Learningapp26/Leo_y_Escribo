import { Link } from 'react-router-dom'
import { getLessonThemeClass, getLessonUnit } from '../data/lessonColors'

const lessons = [
  { id: 'vocales', title: 'Vocales' },
  { id: 'm', title: 'Letra M' },
  { id: 'l', title: 'Letra L' },
  { id: 's', title: 'Letra S' },
  { id: 'y-conjuncion', title: 'Y como conjunción' },
  { id: 'r', title: 'Letra R' },
  { id: 'p', title: 'Letra P' },
  { id: 't', title: 'Letra T' },
  { id: 'n', title: 'Letra N' },
]

const unit2Lessons = [
  { id: 'c', title: 'Letra C' },
  { id: 'q', title: 'Letra Q' },
  { id: 'd', title: 'Letra D' },
  { id: 'silabas-inversas', title: 'Sílabas inversas' },
  { id: 'pl', title: 'Sílabas pl' },
  { id: 'pr', title: 'Sílabas pr' },
]

function LessonsPage() {
  return (
    <main className="page">
      <section className="card">
        <h1>Lecciones</h1>
        <p>Selecciona una lección para comenzar.</p>

        <div className="lesson-list">
          {lessons.map((lesson) => {
            const unit = getLessonUnit(lesson.id)
            const themeClass = getLessonThemeClass(lesson.id)

            return (
              <Link
                key={lesson.id}
                className={`lesson-card ${themeClass}`}
                to={`/lecciones/${lesson.id}`}
              >
                <span className="lesson-card__unit">Unidad {unit}</span>
                <strong className="lesson-card__title">{lesson.title}</strong>
              </Link>
            )
          })}

          <Link
            className="lesson-card lesson-theme--unit-1"
            to="/actividad/palabras-practica"
          >
            <span className="lesson-card__unit">Unidad 1 · Repaso</span>
            <strong className="lesson-card__title">Repaso de la Unidad 1</strong>
          </Link>
        </div>

        <h2>Unidad 2</h2>
        <div className="lesson-list">
          {unit2Lessons.map((lesson) => (
            <Link
              key={lesson.id}
              className={`lesson-card ${getLessonThemeClass(lesson.id)}`}
              to={`/lecciones/${lesson.id}`}
            >
              <span className="lesson-card__unit">Unidad 2</span>
              <strong className="lesson-card__title">{lesson.title}</strong>
            </Link>
          ))}

          <Link
            className="lesson-card lesson-theme--unit-2"
            to="/unidad-2/repaso"
          >
            <span className="lesson-card__unit">Unidad 2 · Repaso</span>
            <strong className="lesson-card__title">Repaso de la Unidad 2</strong>
          </Link>
        </div>

        <Link className="text-link" to="/home">
          Volver al inicio
        </Link>
      </section>
    </main>
  )
}

export default LessonsPage
