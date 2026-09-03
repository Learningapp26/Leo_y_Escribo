import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  trLetterPresentation,
  trPositionExamples,
  trPositionInstructionAudio,
  trPositionWords,
  trSyllableImageExercises,
  trSyllableInstructionAudio,
} from '../data/trData'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/syllables.css'
import '../styles/lesson-tr.css'

const PHASES = ['letra', 'palabra', 'reconocer', 'posicion']

function ActividadTrSilabasPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('tr')

  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

  const [imageIndex, setImageIndex] = useState(0)
  const [selectedSyllable, setSelectedSyllable] = useState('')
  const [imageFeedback, setImageFeedback] = useState('')

  const imageExercise = trSyllableImageExercises[imageIndex]
  const isLastImage = imageIndex === trSyllableImageExercises.length - 1

  const checkImageSyllable = () => {
    if (!selectedSyllable) return

    const isCorrect = selectedSyllable === imageExercise.syllable

    setImageFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'tr-silabas',
      correcto: isCorrect,
      detalle: {
        leccionId: 'tr',
        fase: 'reconocer',
        ejercicioId: imageExercise.id,
      },
    })
  }

  const nextImageExercise = () => {
    setSelectedSyllable('')
    setImageFeedback('')

    if (isLastImage) {
      goToNextPhase()
      return
    }

    setImageIndex((current) => current + 1)
  }

  const [positionAnswers, setPositionAnswers] = useState({})
  const [positionFeedback, setPositionFeedback] = useState('')

  const allPositionsAnswered = trPositionWords.every(
    (item) => positionAnswers[item.id],
  )

  const pickPosition = (wordId, value) => {
    if (positionFeedback === 'correct') return

    setPositionFeedback('')
    setPositionAnswers((current) => ({ ...current, [wordId]: value }))
  }

  const checkPositions = () => {
    if (!allPositionsAnswered) return

    const isCorrect = trPositionWords.every(
      (item) => positionAnswers[item.id] === item.answer,
    )

    setPositionFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'tr-silabas',
      correcto: isCorrect,
      detalle: { leccionId: 'tr', fase: 'posicion' },
    })
  }

  const retryPositions = () => {
    setPositionAnswers({})
    setPositionFeedback('')
  }

  return (
    <main
      className={`page selection-page lesson-tr ${themeClass}`}
      aria-labelledby="tr-silabas-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/tr" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 2</span>

        <h1 id="tr-silabas-title">Sílabas tra, tre, tri, tro y tru</h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      {phase === 'letra' && (
        <Card className="syllables-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Conoce las letras t y r juntas. Toca cada combinación para
              escucharla.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(trLetterPresentation.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            <span className="text-letter">Tr</span>
            <span className="text-letter">tr</span>
          </div>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(trLetterPresentation.soundAudio)}
          >
            Escuchar el sonido de tr
          </Button>

          <div className="syllables-options">
            {trLetterPresentation.combinations.map((item) => (
              <button
                className="syllable-button"
                type="button"
                key={item.syllable}
                onClick={() => playAudio(item.audio)}
              >
                {item.syllable}
              </button>
            ))}
          </div>

          <Button
            icon={ArrowRight}
            iconPosition="right"
            size="large"
            fullWidth
            onClick={goToNextPhase}
          >
            Continuar
          </Button>
        </Card>
      )}

      {phase === 'palabra' && (
        <Card className="syllables-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Ahora escucha esta palabra con tr.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(trLetterPresentation.word.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <img
            className="selection-image selection-image--featured"
            src={trLetterPresentation.word.image}
            alt={trLetterPresentation.word.name}
          />

          <span className="text-word">{trLetterPresentation.word.name}</span>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(trLetterPresentation.word.audio)}
          >
            Escuchar palabra
          </Button>

          <Button
            icon={ArrowRight}
            iconPosition="right"
            size="large"
            fullWidth
            onClick={goToNextPhase}
          >
            Continuar
          </Button>
        </Card>
      )}

      {phase === 'reconocer' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Observa la imagen, escucha la palabra y selecciona la sílaba
              con la que comienza.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(trSyllableInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <img
            className="selection-image selection-image--featured"
            src={imageExercise.image}
            alt={imageExercise.word}
          />

          <span className="text-word">{imageExercise.word}</span>

          <Button
            variant="audio"
            icon={Volume2}
            onClick={() => playAudio(imageExercise.audio)}
          >
            Escuchar palabra
          </Button>

          <div className="selection-options">
            {imageExercise.options.map((syllable) => {
              const selected = selectedSyllable === syllable

              const stateClass =
                selected && imageFeedback === 'correct'
                  ? 'selection-button--correct'
                  : selected && imageFeedback === 'retry'
                    ? 'selection-button--incorrect'
                    : selected
                      ? 'selection-button--selected'
                      : ''

              return (
                <Button
                  key={syllable}
                  variant="secondary"
                  className={['selection-button', stateClass]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={selected}
                  onClick={() => {
                    setSelectedSyllable(syllable)
                    setImageFeedback('')
                  }}
                >
                  <span className="selection-word">{syllable}</span>
                </Button>
              )
            })}
          </div>

          {imageFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! {imageExercise.word} comienza con{' '}
              {imageExercise.syllable}.
            </p>
          )}

          {imageFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Escucha la palabra otra vez y prueba con otra sílaba.
            </p>
          )}

          {imageFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!selectedSyllable}
              onClick={checkImageSyllable}
            >
              Comprobar
            </Button>
          )}

          {imageFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setSelectedSyllable('')
                setImageFeedback('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {imageFeedback === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextImageExercise}
            >
              {isLastImage ? 'Continuar' : 'Siguiente palabra'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'posicion' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Lee la palabra. ¿Empieza con <strong>tr</strong>? Toca
              naranja. ¿Está en <strong>medio o al final</strong>? Toca
              celeste.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(trPositionInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="tr-position-key">
            <span className="tr-position-key__item">
              <span
                className="tr-position-dot tr-position-dot--selected tr-position-dot--inicio"
                aria-hidden="true"
              />
              Naranja = la palabra empieza con tr
            </span>

            <span className="tr-position-key__item">
              <span
                className="tr-position-dot tr-position-dot--selected tr-position-dot--despues"
                aria-hidden="true"
              />
              Celeste = tr está en medio o al final
            </span>
          </div>

          <div className="tr-position-examples">
            <p className="tr-position-examples__title">
              Mira estos dos ejemplos ya resueltos:
            </p>

            {trPositionExamples.map((example) => (
              <p className="tr-position-example-row" key={example.word}>
                <span
                  className={[
                    'tr-position-dot',
                    'tr-position-dot--selected',
                    `tr-position-dot--${example.answer}`,
                  ].join(' ')}
                  aria-hidden="true"
                />

                <strong>{example.word}</strong>

                <span className="tr-position-example-row__explanation">
                  {example.answer === 'inicio'
                    ? '— la palabra empieza con tr, por eso es naranja'
                    : '— tr está en medio de la palabra, no al principio, por eso es celeste'}
                </span>

                <Button
                  variant="audio"
                  icon={Volume2}
                  onClick={() => playAudio(example.explanationAudio)}
                >
                  Escuchar
                </Button>
              </p>
            ))}
          </div>

          <div className="tr-position-grid">
            <div className="tr-position-grid__header" aria-hidden="true">
              <span>Palabra</span>
              <span>Inicio · Después</span>
            </div>

            {trPositionWords.map((item) => {
              const picked = positionAnswers[item.id]

              const rowStateClass =
                positionFeedback && picked
                  ? picked === item.answer
                    ? 'tr-position-row--correct'
                    : 'tr-position-row--incorrect'
                  : ''

              return (
                <div
                  className={['tr-position-row', rowStateClass]
                    .filter(Boolean)
                    .join(' ')}
                  key={item.id}
                >
                  <span className="tr-position-row__word">{item.word}</span>

                  <div className="tr-position-dots">
                    <button
                      type="button"
                      className={[
                        'tr-position-dot',
                        'tr-position-dot--inicio',
                        picked === 'inicio' ? 'tr-position-dot--selected' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      aria-pressed={picked === 'inicio'}
                      aria-label={`${item.word}: tr al inicio`}
                      onClick={() => pickPosition(item.id, 'inicio')}
                    />

                    <button
                      type="button"
                      className={[
                        'tr-position-dot',
                        'tr-position-dot--despues',
                        picked === 'despues' ? 'tr-position-dot--selected' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      aria-pressed={picked === 'despues'}
                      aria-label={`${item.word}: tr después`}
                      onClick={() => pickPosition(item.id, 'despues')}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {positionFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Excelente! Todas las palabras están bien marcadas.
            </p>
          )}

          {positionFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Algunas palabras no están bien marcadas. Revisa las que se
              movieron un poco.
            </p>
          )}

          {positionFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!allPositionsAnswered}
              onClick={checkPositions}
            >
              Comprobar
            </Button>
          )}

          {positionFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={retryPositions}
            >
              Intentar nuevamente
            </Button>
          )}

          {positionFeedback === 'correct' && (
            <Button
              to="/actividad/tr-completar"
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
            >
              Ir a la siguiente actividad
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadTrSilabasPage
