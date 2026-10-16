import { getLessonHeading } from '../data/lessonLabels'
import { Link, useParams } from 'react-router-dom'
import { getLessonThemeClass } from '../data/lessonColors'

function LessonDetailPage() {
  const { lessonId } = useParams()
  const themeClass = getLessonThemeClass(lessonId)

  return (
    <main className={`page lesson-detail-page ${themeClass}`}>
      <section className="card">
        <h1>{getLessonHeading(lessonId, 'Lección')}</h1>
        <p>Aquí irá la información de la lección seleccionada.</p>

        <div className="card small">
          <h2>Actividades de esta lección</h2>

          <div className="button-group">
            <Link className="button primary" to={`/actividad/${lessonId}-lectura`}>
              Escucha el cuento
            </Link>

            <Link className="button secondary" to={`/actividad/${lessonId}-silabas`}>
              Practica sílabas
            </Link>

            <Link className="button secondary" to={`/actividad/${lessonId}-imagenes`}>
              Encuentra imágenes
            </Link>

            <Link className="button secondary" to={`/actividad/${lessonId}-completar`}>
              Completa palabras
            </Link>
          </div>
        </div>

        <Link className="text-link" to="/lecciones">
          Volver a lecciones
        </Link>
      </section>
    </main>
  )
}

export default LessonDetailPage
