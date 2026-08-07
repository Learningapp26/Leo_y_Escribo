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

function LessonsPage() {
  return (
    <main className="page">
      <section className="card">
        <h1>Lecciones</h1>
        <p>Selecciona una lección para comenzar.</p>

        <Link
          className="lesson-card lesson-theme--unit-1"
          to="/actividad/palabras-practica"
        >
          <span className="lesson-card__unit">Práctica</span>
          <strong className="lesson-card__title">Palabras para leer y practicar</strong>
        </Link>

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
        </div>

        <Link className="text-link" to="/home">
          Volver al inicio
        </Link>
      </section>
    </main>
  )
}

export default LessonsPage
