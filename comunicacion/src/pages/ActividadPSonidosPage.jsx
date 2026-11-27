import { ReadOnlySyllables } from '../components/lessons/WordSyllableReading'
import ActivityFeedback from '../components/common/ActivityFeedback'
import SoundIntroduction from '../components/lessons/SoundIntroduction'
import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  pImagePool,
  pPositionInstructionAudio,
  pSelectionInstructionAudio,
  pSoundIntro,
  pSyllablePosition,
  pSyllablePositionExample,
} from '../data/pData'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/completion.css'

const PHASES = ['sonido', 'seleccion', 'posicion']

const targetIds = pImagePool
  .filter((item) => item.startsWithP)
  .map((item) => item.id)

function selectionClass(id, selectedIds, feedback) {
  const isSelected = selectedIds.includes(id)

  if (!isSelected || !feedback) {
    return isSelected ? 'selection-button--selected' : ''
  }

  return feedback === 'correct'
    ? 'selection-button--correct'
    : 'selection-button--incorrect'
}

function ActividadPSonidosPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('p')

  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

  // Fase 2: seleccionar las que empiezan con /p/
  const [selectedIds, setSelectedIds] = useState([])
  const [selectionFeedback, setSelectionFeedback] = useState('')

  const toggleSelected = (item) => {
    if (selectionFeedback === 'correct') return

    playAudio(item.audio)
    setSelectionFeedback('')

    setSelectedIds((current) =>
      current.includes(item.id)
        ? current.filter((id) => id !== item.id)
        : [...current, item.id],
    )
  }

  const checkSelection = () => {
    const isCorrect =
      selectedIds.length === targetIds.length &&
      selectedIds.every((id) => targetIds.includes(id))

    setSelectionFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'p-sonidos',
      correcto: isCorrect,
      detalle: { leccionId: 'p', fase: 'seleccion' },
    })
  }

  const retrySelection = () => {
    setSelectedIds([])
    setSelectionFeedback('')
  }

  // Fase 3: el sonido /p/ no siempre está al inicio de la palabra
  const [positionIndex, setPositionIndex] = useState(0)
  const [selectedSyllableIndex, setSelectedSyllableIndex] = useState(null)
  const [positionResult, setPositionResult] = useState('')

  const positionItem = pSyllablePosition[positionIndex]
  const isLastPositionItem = positionIndex === pSyllablePosition.length - 1

  const checkPosition = () => {
    if (selectedSyllableIndex === null) return

    const isCorrect = selectedSyllableIndex === positionItem.answerIndex

    setPositionResult(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'p-sonidos',
      correcto: isCorrect,
      detalle: { leccionId: 'p', fase: 'posicion', ejercicioId: positionItem.id },
    })
  }

  const nextPositionItem = () => {
    setSelectedSyllableIndex(null)
    setPositionResult('')
    setPositionIndex((current) => current + 1)
  }

  return (
    <main
      className={`page selection-page ${themeClass}`}
      aria-labelledby="p-sonidos-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/p" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 1</span>

        <h1 id="p-sonidos-title">Reconozcamos el sonido de la letra p</h1>
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
              Escucha el sonido de la letra p y la palabra papá.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(pSoundIntro.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <SoundIntroduction
            sounds={[{ letter: 'p', audioSrc: pSoundIntro.soundAudio }]}
            word={pSoundIntro.mainWord}
          />

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

      {phase === 'seleccion' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca las imágenes cuyo nombre empieza con el sonido de papá.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(pSelectionInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {pImagePool.map((item) => (
              <button
                className={[
                  'selection-button',
                  selectionClass(item.id, selectedIds, selectionFeedback),
                ]
                  .filter(Boolean)
                  .join(' ')}
                type="button"
                key={item.id}
                aria-pressed={selectedIds.includes(item.id)}
                onClick={() => toggleSelected(item)}
              >
                <img
                  className="selection-image"
                  src={item.image}
                  alt={item.name}
                />

                <span className="selection-word">{item.name}</span>
              </button>
            ))}
          </div>

          {selectionFeedback === 'correct' && (
            <ActivityFeedback correct message={<>
              ¡Muy bien! Todas empiezan con el sonido /p/.
            </>} />
          )}

          {selectionFeedback === 'retry' && (
            <ActivityFeedback correct={false} message={<>
              Revisa otra vez. Alguna imagen no empieza con /p/.
            </>} />
          )}

          {!selectionFeedback && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={selectedIds.length === 0}
              onClick={checkSelection}
            >
              Comprobar selección
            </Button>
          )}

          {selectionFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={retrySelection}
            >
              Intentar nuevamente
            </Button>
          )}

          {selectionFeedback === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={goToNextPhase}
            >
              Siguiente parte
            </Button>
          )}
        </Card>
      )}

      {phase === 'posicion' && (
        <Card className="completion-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              El sonido /p/ no siempre está al inicio. Escucha la palabra
              separada en sílabas y toca la sílaba donde suena /p/.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(pPositionInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="completion-content">
            <p className="text-instruction">
              Mira el ejemplo: en <strong>puma</strong> el sonido /p/ está en
              la primera sílaba.
            </p>

            <img
              className="completion-word-image"
              src={pSyllablePositionExample.image}
              alt={pSyllablePositionExample.word}
            />

            <ReadOnlySyllables syllables={pSyllablePositionExample.syllables} highlightIndex={pSyllablePositionExample.answerIndex} />
          </div>

          <img
            className="completion-word-image"
            src={positionItem.image}
            alt={positionItem.word}
          />

          <div className="completion-content">
            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(positionItem.wordAudio)}
            >
              Escuchar palabra completa
            </Button>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(positionItem.syllableAudio)}
            >
              Escuchar por sílabas
            </Button>
          </div>

          <div className="completion-bank">
            {positionItem.syllables.map((syllable, index) => (
              <button
                className={[
                  'completion-chip',
                  'text-syllable',
                  selectedSyllableIndex === index ? 'completion-active' : '',
                  positionResult === 'correct' && selectedSyllableIndex === index
                    ? 'completion-correct'
                    : '',
                  positionResult === 'retry' && selectedSyllableIndex === index
                    ? 'completion-incorrect'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                type="button"
                key={`${syllable}-${index}`}
                aria-pressed={selectedSyllableIndex === index}
                onClick={() => {
                  setSelectedSyllableIndex(index)
                  setPositionResult('')
                }}
              >
                {syllable}
              </button>
            ))}
          </div>

          {positionResult === 'correct' && (
            <ActivityFeedback correct message={<>
              ¡Correcto! El sonido /p/ está en "{positionItem.syllables[positionItem.answerIndex]}".
            </>} />
          )}

          {positionResult === 'retry' && (
            <ActivityFeedback correct={false} message={<>
              Escucha otra vez con cuidado.
            </>} />
          )}

          {!positionResult && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={selectedSyllableIndex === null}
              onClick={checkPosition}
            >
              Comprobar
            </Button>
          )}

          {positionResult === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setSelectedSyllableIndex(null)
                setPositionResult('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {positionResult === 'correct' && !isLastPositionItem && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextPositionItem}
            >
              Siguiente palabra
            </Button>
          )}

          {positionResult === 'correct' && isLastPositionItem && (
            <Button
              to="/actividad/p-silabas"
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

export default ActividadPSonidosPage
