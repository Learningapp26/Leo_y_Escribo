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
  const [currentIndex, setCurrentIndex] =
    useState(0)

  const themeClass =
    getLessonThemeClass('y-conjuncion')

  const currentPair = page26Pairs[currentIndex]
  const isFirst = currentIndex === 0
  const isLast =
    currentIndex === page26Pairs.length - 1

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
      className={`page y-page ${themeClass}`}
      aria-labelledby="y-pairs-title"
    >
      <section className="y-page__content">
        <BackButton
          label="Volver a la lección"
          to="/lecciones/y-conjuncion"
        />

        <header className="y-page__header">
          <span className="y-page__unit">
            Actividad 1
          </span>

          <h1
            className="y-page__title"
            id="y-pairs-title"
          >
            Formamos parejas
          </h1>

          <p className="text-instruction y-page__instruction">
            Observa las dos imágenes. Escucha cada palabra y
            luego escucha la pareja completa.
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
        </header>

        <ProgressBar
          value={currentIndex + 1}
          max={page26Pairs.length}
          label={`Pareja ${currentIndex + 1} de ${page26Pairs.length}`}
        />

        <Card>
          <div className="y-pair">
            <article className="y-pair__item">
              <img
                className="y-pair__image"
                src={currentPair.first.image}
                alt={currentPair.first.name}
              />

              <span className="y-pair__word">
                {currentPair.first.name}
              </span>

              <Button
                variant="audio"
                icon={Volume2}
                onClick={() =>
                  playAudio(currentPair.first.audio)
                }
                aria-label={`Escuchar la palabra ${currentPair.first.name}`}
              >
                Escuchar
              </Button>
            </article>

            <span
              className="y-connector"
              aria-label="y"
            >
              y
            </span>

            <article className="y-pair__item">
              <img
                className="y-pair__image"
                src={currentPair.second.image}
                alt={currentPair.second.name}
              />

              <span className="y-pair__word">
                {currentPair.second.name}
              </span>

              <Button
                variant="audio"
                icon={Volume2}
                onClick={() =>
                  playAudio(currentPair.second.audio)
                }
                aria-label={`Escuchar la palabra ${currentPair.second.name}`}
              >
                Escuchar
              </Button>
            </article>
          </div>

          <p
            className="y-pair__phrase"
            aria-live="polite"
          >
            <span>{currentPair.first.name}</span>

            <span className="y-connector">
              y
            </span>

            <span>{currentPair.second.name}</span>
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

          <div className="y-pair-navigation">
            <Button
              variant="secondary"
              icon={ArrowLeft}
              fullWidth
              disabled={isFirst}
              onClick={previousPair}
            >
              Anterior
            </Button>

            {isLast ? (
              <Button
                to="/actividad/y-unir-imagenes"
                icon={ArrowRight}
                iconPosition="right"
                fullWidth
              >
                Siguiente actividad
              </Button>
            ) : (
              <Button
                icon={ArrowRight}
                iconPosition="right"
                fullWidth
                onClick={nextPair}
              >
                Siguiente pareja
              </Button>
            )}
          </div>
        </Card>
      </section>
    </main>
  )
}

export default ActividadYParejasPage