import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  vInitialSoundImages,
  vInitialSoundInstructionAudio,
  vPositionExample,
  vPositionInstructionAudio,
  vPositionWords,
  vSoundExamples,
  vSoundExamplesInstructionAudio,
  vSoundIntro,
} from '../data/vData'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/lesson-v.css'

const PHASES = ['sonido', 'palabras', 'inicio', 'posicion']

const initialAnswers = vInitialSoundImages
  .filter((item) => item.startsWithV)
  .map((item) => item.id)

function getSelectionState(isSelected, feedback) {
  if (!isSelected) return ''
  if (feedback === 'correct') return 'selection-button--correct'
  if (feedback === 'retry') return 'selection-button--incorrect'
  return 'selection-button--selected'
}

function ActividadVSonidosPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('v')

  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

  const [selectedInitialIds, setSelectedInitialIds] = useState([])
  const [initialFeedback, setInitialFeedback] = useState('')

  const toggleInitialImage = (item) => {
    if (initialFeedback === 'correct') return

    playAudio(item.audio)
    setInitialFeedback('')

    setSelectedInitialIds((current) =>
      current.includes(item.id)
        ? current.filter((id) => id !== item.id)
        : [...current, item.id],
    )
  }

  const checkInitial = () => {
    const isCorrect =
      selectedInitialIds.length === initialAnswers.length &&
      selectedInitialIds.every((id) => initialAnswers.includes(id))

    setInitialFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'v-sonidos',
      correcto: isCorrect,
      detalle: { leccionId: 'v', fase: 'inicio' },
    })
  }

  const retryInitial = () => {
    setSelectedInitialIds([])
    setInitialFeedback('')
  }

  const [positionIndex, setPositionIndex] = useState(0)
  const [selectedBoxIndex, setSelectedBoxIndex] = useState(null)
  const [positionFeedback, setPositionFeedback] = useState('')

  const positionWord = vPositionWords[positionIndex]
  const isLastPosition = positionIndex === vPositionWords.length - 1

  const checkPosition = () => {
    if (selectedBoxIndex === null) return

    const isCorrect = selectedBoxIndex === positionWord.targetIndex

    setPositionFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'v-sonidos',
      correcto: isCorrect,
      detalle: { leccionId: 'v', fase: 'posicion', ejercicioId: positionWord.id },
    })
  }

  const nextPositionWord = () => {
    setSelectedBoxIndex(null)
    setPositionFeedback('')
    setPositionIndex((current) => current + 1)
  }

  return (
    <main
      className={`page selection-page ${themeClass}`}
      aria-labelledby="v-sonidos-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/v" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 1</span>

        <h1 id="v-sonidos-title">Reconozcamos el sonido de V</h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      {phase === 'sonido' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              La v forma el sonido /v/. Escucha y repite.
            </p>

            <Button variant="audio" icon={Volume2} onClick={() => playAudio(vSoundIntro.instructionAudio)}>
              Escuchar instrucción
            </Button>
          </div>

          <Button variant="audio" size="large" icon={Volume2} onClick={() => playAudio(vSoundIntro.soundAudio)}>
            Escuchar el sonido /v/
          </Button>

          <img
            className="selection-image selection-image--featured"
            src={vSoundIntro.mainWord.image}
            alt={vSoundIntro.mainWord.name}
          />

          <span className="text-word">{vSoundIntro.mainWord.name}</span>

          <Button variant="audio" size="large" icon={Volume2} onClick={() => playAudio(vSoundIntro.mainWord.audio)}>
            Escuchar la palabra vaca
          </Button>

          <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={goToNextPhase}>
            Continuar
          </Button>
        </Card>
      )}

      {phase === 'palabras' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Escucha y repite: vino, vamos y viaje.
            </p>

            <Button variant="audio" icon={Volume2} onClick={() => playAudio(vSoundExamplesInstructionAudio)}>
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {vSoundExamples.map((example) => (
              <Card
                key={example.word}
                imageSrc={example.image}
                imageAlt={example.word}
                title={example.word}
                footer={
                  <Button variant="audio" icon={Volume2} fullWidth onClick={() => playAudio(example.audio)}>
                    Escuchar
                  </Button>
                }
              />
            ))}
          </div>

          <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={goToNextPhase}>
            Continuar
          </Button>
        </Card>
      )}

      {phase === 'inicio' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca los dibujos cuyo nombre inicia con el mismo sonido que la
              palabra vaca.
            </p>

            <Button variant="audio" icon={Volume2} onClick={() => playAudio(vInitialSoundInstructionAudio)}>
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {vInitialSoundImages.map((item) => {
              const selected = selectedInitialIds.includes(item.id)
              const stateClass = getSelectionState(selected, initialFeedback)

              return (
                <Button
                  key={item.id}
                  variant="secondary"
                  className={['selection-button', stateClass].filter(Boolean).join(' ')}
                  aria-pressed={selected}
                  onClick={() => toggleInitialImage(item)}
                >
                  <span className="app-card__content">
                    <img className="selection-image" src={item.image} alt={item.name} />
                    <span className="selection-word">{item.name}</span>
                  </span>
                </Button>
              )
            })}
          </div>

          {initialFeedback === 'correct' && (
            <p className="selection-feedback selection-feedback--correct" role="status">
              ¡Muy bien! Vela, vaso y volcán comienzan con el sonido /v/.
            </p>
          )}

          {initialFeedback === 'retry' && (
            <p className="selection-feedback selection-feedback--retry" role="status">
              Revisa otra vez. Escucha cada palabra y busca las que comienzan como vaca.
            </p>
          )}

          {initialFeedback !== 'correct' && (
            <Button icon={Check} size="large" fullWidth disabled={selectedInitialIds.length === 0} onClick={checkInitial}>
              Comprobar selección
            </Button>
          )}

          {initialFeedback === 'retry' && (
            <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={retryInitial}>
              Intentar nuevamente
            </Button>
          )}

          {initialFeedback === 'correct' && (
            <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={goToNextPhase}>
              Siguiente parte
            </Button>
          )}
        </Card>
      )}

      {phase === 'posicion' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Pronuncia despacio cada sonido de la palabra. Cada cuadrito
              es un sonido. Toca el cuadrito donde suena la v.
            </p>

            <Button variant="audio" icon={Volume2} onClick={() => playAudio(vPositionInstructionAudio)}>
              Escuchar instrucción
            </Button>
          </div>

          <p className="text-instruction">
            Mira el ejemplo: <strong>{vPositionExample.word}</strong>
          </p>

          <img
            className="selection-image"
            src={vPositionExample.image}
            alt={vPositionExample.word}
          />

          <div className="v-sound-boxes" aria-hidden="true">
            {Array.from({ length: vPositionExample.totalSounds }).map((_, index) => (
              <span
                key={index}
                className={[
                  'v-sound-box',
                  index === vPositionExample.targetIndex ? 'v-sound-box--example' : '',
                ].filter(Boolean).join(' ')}
              />
            ))}
          </div>

          {positionWord.color ? (
            <span
              className="practice-color-swatch"
              style={{ backgroundColor: positionWord.color }}
              aria-hidden="true"
            />
          ) : (
            <img className="selection-image selection-image--featured" src={positionWord.image} alt={positionWord.word} />
          )}

          <span className="text-word">{positionWord.word}</span>

          <Button variant="audio" size="large" icon={Volume2} onClick={() => playAudio(positionWord.audio)}>
            Escuchar palabra
          </Button>

          <div className="v-sound-boxes">
            {Array.from({ length: positionWord.totalSounds }).map((_, index) => {
              const selected = selectedBoxIndex === index

              const stateClass =
                selected && positionFeedback === 'correct'
                  ? 'v-sound-box--correct'
                  : selected && positionFeedback === 'retry'
                    ? 'v-sound-box--incorrect'
                    : selected
                      ? 'v-sound-box--selected'
                      : ''

              return (
                <button
                  key={index}
                  type="button"
                  className={['v-sound-box', stateClass].filter(Boolean).join(' ')}
                  aria-pressed={selected}
                  aria-label={`Sonido ${index + 1} de ${positionWord.word}`}
                  disabled={positionFeedback === 'correct'}
                  onClick={() => {
                    setSelectedBoxIndex(index)
                    setPositionFeedback('')
                  }}
                />
              )
            })}
          </div>

          {positionFeedback === 'correct' && (
            <p className="selection-feedback selection-feedback--correct" role="status">
              ¡Correcto!
            </p>
          )}

          {positionFeedback === 'retry' && (
            <p className="selection-feedback selection-feedback--retry" role="status">
              Pronuncia la palabra otra vez, sonido por sonido, y prueba con otro cuadrito.
            </p>
          )}

          {positionFeedback !== 'correct' && (
            <Button icon={Check} size="large" fullWidth disabled={selectedBoxIndex === null} onClick={checkPosition}>
              Comprobar
            </Button>
          )}

          {positionFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setSelectedBoxIndex(null)
                setPositionFeedback('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {positionFeedback === 'correct' && !isLastPosition && (
            <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={nextPositionWord}>
              Siguiente palabra
            </Button>
          )}

          {positionFeedback === 'correct' && isLastPosition && (
            <Button to="/actividad/v-silabas" icon={ArrowRight} iconPosition="right" size="large" fullWidth>
              Ir a la siguiente actividad
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadVSonidosPage
