import { ArrowRight, BookOpen, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { playAudio } from '../lib/audioPlayer'
import '../styles/vowels.css'

const vocales = ['a', 'e', 'i', 'o', 'u']
const vowelAudioPaths = {
  a: '/audio/lecciones/vocales/A.mp3',
  e: '/audio/lecciones/vocales/E.mp3',
  i: '/audio/lecciones/vocales/I.mp3',
  o: '/audio/lecciones/vocales/O.mp3',
  u: '/audio/lecciones/vocales/U.mp3',
}

function LeccionVocalesPage() {
  return (
    <main className="page vowels-page lesson-theme--unit-1">
      <section
        className="vowels-page__content"
        aria-labelledby="titulo-vocales"
      >
        <BackButton
          label="Volver a lecciones"
          to="/lecciones"
        />

        <header className="vowels-page__header">
          <span className="vowels-page__unit">
            Unidad 1
          </span>

          <h1 id="titulo-vocales">
            Repaso de las vocales
          </h1>

          <p className="text-instruction vowels-page__instruction">
            Recordemos las  vocales antes de comenzar la actividad.
          </p>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() =>
              playAudio('/audio/lecciones/vocales/Instruccion repaso.mp3')
            }
            data-audio-src={'/audio/lecciones/vocales/instruccion-repaso.mp3'}
          >
            Escuchar instrucción
          </Button>
        </header>

        <ProgressBar
          value={1}
          max={2}
          label="Parte 1 de 2"
        />

        <Card className="vowels-review-card">
          <BookOpen
            className="vowels-review-card__icon"
            aria-hidden="true"
          />

          <h2>Estas son las vocales</h2>

          <div
            className="vowels-list"
            aria-label="a, e, i, o, u"
          >
            {vocales.map((vocal) => (
              <Button
                key={vocal}
                variant="audio"
                size="large"
                className="vowels-list__item text-letter"
                onClick={() => playAudio(vowelAudioPaths[vocal])}
              >
                {vocal}
              </Button>
            ))}
          </div>

          <p className="text-reading">
            Observa cada letra y pronuncia su sonido.
          </p>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            fullWidth
            onClick={() =>
              playAudio('/audio/lecciones/vocales/vocales.mp3')
            }
            data-audio-src={'/audio/lecciones/vocales/vocales.mp3'}
          >
            Escuchar las vocales
          </Button>
        </Card>

        <Card
          className="vowels-activity-summary"
          title="Actividad: encuentra la vocal"
          description="Lee la instrucción y selecciona la vocal correcta. Completa tres ejercicios."
          footer={
            <Button
              to="/actividad/vocales-inicial"
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
            >
              Comenzar actividad
            </Button>
          }
        />
      </section>
    </main>
  )
}

export default LeccionVocalesPage
