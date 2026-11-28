import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Volume2,
} from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import { page26Pairs } from '../data/yConjunctionData'
import { playAudio } from '../lib/audioPlayer'

import '../styles/y-conjunction.css'

function ActividadYParejasPage() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const themeClass = getLessonThemeClass('y-conjuncion')
  const currentPair = page26Pairs[currentIndex]

  const isFirst = currentIndex === 0
  const isLast = currentIndex === page26Pairs.length - 1

  const previousPair = () => {
    if (isFirst) return

    setCurrentIndex((current) => current - 1)
  }

  const nextPair = () => {
    if (isLast) return

    setCurrentIndex((current) => current + 1)
  }

  return (
    <main
      className={`page selection-page ${themeClass}`}
      aria-labelledby="y-pairs-title"
    >
      <BackButton
        label="Volver a la lección"
        to="/lecciones/y-conjuncion"
      />

      <header className="text-center">
        <span className="text-ui-label">
          Actividad 1
        </span>

        <h1 id="y-pairs-title">
          Formamos parejas
        </h1>
      </header>

      <ProgressBar
        value={currentIndex + 1}
        max={page26Pairs.length}
        label={`Pareja ${currentIndex + 1} de ${page26Pairs.length}`}
      />

      <Card className="selection-card">
        <div className="selection-instructions">
          <p className="text-instruction">
            Observa las imágenes. Escucha cada palabra y
            después escucha la pareja completa.
          </p>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() =>
              playAudio(
                '/audio/lecciones/y/instruccion-formar-parejas.mp3',
              )
            }
          >
            Escuchar instrucción
          </Button>
        </div>

        <div className="selection-options" aria-label="Elementos de la pareja">
          {[currentPair.first, currentPair.second].map((item) => (
            <Card className="y-listening-card" key={item.id}>
              <img className="selection-image" src={item.image} alt={item.name} />
              <span className="selection-word">{item.name}</span>
              <Button
                variant="audio"
                icon={Volume2}
                aria-label={`Escuchar ${item.name}`}
                onClick={() => playAudio(item.audio)}
              >
                Escuchar
              </Button>
            </Card>
          ))}
        </div>

        <p className="text-sentence" aria-live="polite">
          {currentPair.first.name} <strong>y</strong> {currentPair.second.name}
        </p>

        <Button
          variant="audio"
          size="large"
          icon={Volume2}
          fullWidth
          onClick={() =>
            playAudio(currentPair.phraseAudio)
          }
        >
          Escuchar la pareja completa
        </Button>

        <footer className="reading-footer">
          <div className="reading-navigation">
            <Button
              variant="secondary"
              icon={ArrowLeft}
              disabled={isFirst}
              onClick={previousPair}
            >
              Anterior
            </Button>
          </div>

          <div
            className="reading-pagination"
            aria-label="Progreso de las parejas"
          >
            {page26Pairs.map((pair, index) => (
              <span
                key={pair.id}
                className={[
                  'reading-pagination__dot',
                  index === currentIndex
                    ? 'reading-pagination__dot--active'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-hidden="true"
              />
            ))}
          </div>

          <div className="reading-navigation">
            {isLast ? (
              <Button
                to="/actividad/y-unir-imagenes"
                icon={ArrowRight}
                iconPosition="right"
              >
                Siguiente actividad
              </Button>
            ) : (
              <Button
                icon={ArrowRight}
                iconPosition="right"
                onClick={nextPair}
              >
                Siguiente
              </Button>
            )}
          </div>
        </footer>
      </Card>
    </main>
  )
}

export default ActividadYParejasPage