import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  chInitialSoundImages,
  chInitialSoundInstructionAudio,
  chPositionInstructionAudio,
  chPositionWords,
  chSoundExamples,
  chSoundExamplesInstructionAudio,
  chSoundIntro,
} from '../data/chData'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'

const PHASES = ['sonido', 'palabras', 'inicio', 'posicion']

const initialAnswers = chInitialSoundImages
  .filter((item) => item.startsWithCh)
  .map((item) => item.id)

function getSelectionState(isSelected, feedback) {
  if (!isSelected) return ''
  if (feedback === 'correct') return 'selection-button--correct'
  if (feedback === 'retry') return 'selection-button--incorrect'
  return 'selection-button--selected'
}

const POSITION_OPTIONS = [
  { value: 'medio', label: 'En medio' },
  { value: 'final', label: 'Al final' },
]

function ActividadChSonidosPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('ch')

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
      actividad: 'ch-sonidos',
      correcto: isCorrect,
      detalle: { leccionId: 'ch', fase: 'inicio' },
    })
  }

  const retryInitial = () => {
    setSelectedInitialIds([])
    setInitialFeedback('')
  }

  const [positionIndex, setPositionIndex] = useState(0)
  const [selectedPosition, setSelectedPosition] = useState('')
  const [positionFeedback, setPositionFeedback] = useState('')

  const positionWord = chPositionWords[positionIndex]
  const isLastPosition = positionIndex === chPositionWords.length - 1

  const checkPosition = () => {
    if (!selectedPosition) return

    const isCorrect = selectedPosition === positionWord.answer

    setPositionFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'ch-sonidos',
      correcto: isCorrect,
      detalle: { leccionId: 'ch', fase: 'posicion', ejercicioId: positionWord.id },
    })
  }

  const nextPositionWord = () => {
    setSelectedPosition('')
    setPositionFeedback('')
    setPositionIndex((current) => current + 1)
  }

  return (
    <main
      className={`page selection-page ${themeClass}`}
      aria-labelledby="ch-sonidos-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/ch" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 1</span>

        <h1 id="ch-sonidos-title">Reconozcamos el sonido de CH</h1>
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
              La c y la h juntas forman el sonido /ch/. Escucha y repite.
            </p>

            <Button variant="audio" icon={Volume2} onClick={() => playAudio(chSoundIntro.instructionAudio)}>
              Escuchar instrucción
            </Button>
          </div>

          <Button variant="audio" size="large" icon={Volume2} onClick={() => playAudio(chSoundIntro.soundAudio)}>
            Escuchar el sonido /ch/
          </Button>

          <img
            className="selection-image selection-image--featured"
            src={chSoundIntro.mainWord.image}
            alt={chSoundIntro.mainWord.name}
          />

          <span className="text-word">{chSoundIntro.mainWord.name}</span>

          <Button variant="audio" size="large" icon={Volume2} onClick={() => playAudio(chSoundIntro.mainWord.audio)}>
            Escuchar la palabra chocolate
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
              Escucha y repite: chorro, chiva y chula.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(chSoundExamplesInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {chSoundExamples.map((example) => (
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
              palabra chocolate.
            </p>

            <Button variant="audio" icon={Volume2} onClick={() => playAudio(chInitialSoundInstructionAudio)}>
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {chInitialSoundImages.map((item) => {
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
              ¡Muy bien! Chumpa, chaleco y chorizos comienzan con el sonido /ch/.
            </p>
          )}

          {initialFeedback === 'retry' && (
            <p className="selection-feedback selection-feedback--retry" role="status">
              Revisa otra vez. Escucha cada palabra y busca las que comienzan como chocolate.
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
              El sonido /ch/ también puede estar en medio o al final de una
              palabra. Escucha y elige dónde está.
            </p>

            <Button variant="audio" icon={Volume2} onClick={() => playAudio(chPositionInstructionAudio)}>
              Escuchar instrucción
            </Button>
          </div>

          <img
            className="selection-image selection-image--featured"
            src={positionWord.image}
            alt={positionWord.word}
          />

          <span className="text-word">{positionWord.word}</span>

          <Button variant="audio" size="large" icon={Volume2} onClick={() => playAudio(positionWord.audio)}>
            Escuchar palabra
          </Button>

          <div className="selection-options">
            {POSITION_OPTIONS.map((option) => {
              const selected = selectedPosition === option.value

              const stateClass =
                selected && positionFeedback === 'correct'
                  ? 'selection-button--correct'
                  : selected && positionFeedback === 'retry'
                    ? 'selection-button--incorrect'
                    : selected
                      ? 'selection-button--selected'
                      : ''

              return (
                <Button
                  key={option.value}
                  variant="secondary"
                  className={['selection-button', stateClass].filter(Boolean).join(' ')}
                  aria-pressed={selected}
                  onClick={() => {
                    setSelectedPosition(option.value)
                    setPositionFeedback('')
                  }}
                >
                  <span className="selection-word">{option.label}</span>
                </Button>
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
              Escucha otra vez con cuidado.
            </p>
          )}

          {positionFeedback !== 'correct' && (
            <Button icon={Check} size="large" fullWidth disabled={!selectedPosition} onClick={checkPosition}>
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
                setSelectedPosition('')
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
            <Button to="/actividad/ch-silabas" icon={ArrowRight} iconPosition="right" size="large" fullWidth>
              Ir a la siguiente actividad
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadChSonidosPage
