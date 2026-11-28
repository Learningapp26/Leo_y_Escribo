import BookLessonImage from '../components/lessons/BookLessonImage'
import ActivityFeedback from '../components/common/ActivityFeedback'
import { fillBlank } from '../lib/fillBlank'
import { useRef, useState } from 'react'
import { ArrowRight, Check, RotateCcw } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import LessonAudioButton from '../components/common/LessonAudioButton'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  asAudio,
  nCompletionInstructionAudio,
  nJoinInstructionAudio,
  nJoinSyllable,
  nSyllableJoin,
  nSyllableOptions,
  nWordCompletion,
} from '../data/nData'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/syllables.css'
import '../styles/completion.css'

// Página 52 del libro: elegir la sílaba que falta y combinar sílabas con «no».
const PHASES = ['completar', 'unir']

function ActividadNCompletarPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]
  const themeClass = getLessonThemeClass('n')
  const answerLock = useRef(false)

  // Fase 1: completar la palabra con la sílaba que falta
  const [wordIndex, setWordIndex] = useState(0)
  const [selectedSyllable, setSelectedSyllable] = useState('')
  const [completionResult, setCompletionResult] = useState('')
  const currentWord = nWordCompletion[wordIndex]
  const isLastWord = wordIndex === nWordCompletion.length - 1

  const checkCompletion = () => {
    if (!selectedSyllable || answerLock.current) return
    answerLock.current = true
    const isCorrect = selectedSyllable === currentWord.answer
    setCompletionResult(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'n-completar',
      correcto: isCorrect,
      detalle: { leccionId: 'n', fase: 'completar', ejercicioId: currentWord.id },
    })
  }

  const resetCompletion = () => {
    answerLock.current = false
    setSelectedSyllable('')
    setCompletionResult('')
  }

  const nextWord = () => {
    resetCompletion()
    if (isLastWord) {
      setPhaseIndex(1)
      return
    }
    setWordIndex((current) => current + 1)
  }

  // Fase 2: combinar cada sílaba con «no»
  const [selectedId, setSelectedId] = useState(null)
  const [matchedIds, setMatchedIds] = useState([])
  const [joinFeedback, setJoinFeedback] = useState('')
  const selectedItem = nSyllableJoin.find((item) => item.id === selectedId)
  const isJoinFinished = matchedIds.length === nSyllableJoin.length
  const lastMatched = nSyllableJoin.find((item) => item.id === matchedIds[matchedIds.length - 1])

  const checkJoin = () => {
    if (!selectedItem || matchedIds.includes(selectedItem.id) || answerLock.current) return
    answerLock.current = true
    // Cada sílaba del banco forma una palabra al unirse con «no».
    setMatchedIds((current) => current.includes(selectedItem.id) ? current : [...current, selectedItem.id])
    setJoinFeedback('correct')
    if (selectedItem.wordAudio) playAudio(selectedItem.wordAudio)

    registrarProgreso({
      actividad: 'n-completar',
      correcto: true,
      detalle: { leccionId: 'n', fase: 'unir', ejercicioId: selectedItem.id },
    })
  }

  const continueJoin = () => {
    answerLock.current = false
    setSelectedId(null)
    setJoinFeedback('')
  }

  return (
    <main className={`page selection-page ${themeClass}`} aria-labelledby="n-completar-title">
      <BackButton label="Volver a la lección" to="/lecciones/n" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 3</span>
        <h1 id="n-completar-title">Completamos palabras</h1>
      </header>

      <ProgressBar value={phaseIndex + 1} max={PHASES.length} label={`Parte ${phaseIndex + 1} de ${PHASES.length}`} />

      {phase === 'completar' && (
        <Card className="completion-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Nombra el dibujo despacio. Elige la sílaba que falta para
              completar la palabra.
            </p>
            <LessonAudioButton audio={asAudio(nCompletionInstructionAudio)}>
              Escuchar instrucción
            </LessonAudioButton>
          </div>

          <BookLessonImage className="completion-word-image" src={currentWord.image} alt={currentWord.word} hideLabel key={currentWord.image} />

          <LessonAudioButton audio={asAudio(currentWord.audio)}>Escuchar palabra</LessonAudioButton>

          <p className="completion-word-pattern" aria-live="polite">
            {fillBlank(currentWord.pattern, selectedSyllable)}
          </p>

          <div className="completion-bank">
            {nSyllableOptions.map((syllable) => (
              <button
                className={[
                  'completion-chip',
                  'text-syllable',
                  selectedSyllable === syllable && !completionResult ? 'completion-active' : '',
                  completionResult === 'correct' && selectedSyllable === syllable ? 'completion-correct' : '',
                  completionResult === 'retry' && selectedSyllable === syllable ? 'completion-incorrect' : '',
                ].filter(Boolean).join(' ')}
                type="button"
                key={syllable}
                aria-pressed={selectedSyllable === syllable}
                disabled={Boolean(completionResult)}
                onClick={() => {
                  if (completionResult) return
                  setSelectedSyllable(syllable)
                }}
              >
                {syllable}
              </button>
            ))}
          </div>

          {completionResult === 'correct' && (
            <ActivityFeedback correct message={<>¡Correcto! La palabra es {currentWord.word}.</>} />
          )}
          {completionResult === 'retry' && (
            <ActivityFeedback correct={false} message={<>Esa sílaba no completa la palabra. Escucha otra vez.</>} />
          )}

          {!completionResult && (
            <Button icon={Check} size="large" fullWidth disabled={!selectedSyllable} onClick={checkCompletion}>
              Comprobar
            </Button>
          )}
          {completionResult === 'retry' && (
            <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={resetCompletion}>
              Volver a intentar
            </Button>
          )}
          {completionResult === 'correct' && (
            <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={nextWord}>
              {isLastWord ? 'Siguiente parte' : 'Siguiente palabra'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'unir' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca una sílaba para unirla con <strong>{nJoinSyllable}</strong> y
              formar una palabra. Las que ya usaste desaparecen.
            </p>
            <LessonAudioButton audio={asAudio(nJoinInstructionAudio)}>
              Escuchar instrucción
            </LessonAudioButton>
          </div>

          {!isJoinFinished && (
            <>
              <p className="completion-word-pattern" aria-live="polite" aria-label="Palabra que se forma">
                {selectedItem ? selectedItem.first : '__'} {nJoinSyllable}
              </p>

              <div className="selection-options">
                {nSyllableJoin
                  .filter((item) => !matchedIds.includes(item.id))
                  .map((item) => {
                    const selected = selectedId === item.id
                    return (
                      <button
                        className={['selection-button', selected ? 'selection-button--selected' : ''].filter(Boolean).join(' ')}
                        type="button"
                        key={item.id}
                        aria-pressed={selected}
                        disabled={joinFeedback === 'correct'}
                        onClick={() => setSelectedId(item.id)}
                      >
                        <span className="text-syllable">{item.first}</span>
                      </button>
                    )
                  })}
              </div>
            </>
          )}

          {joinFeedback === 'correct' && lastMatched && !isJoinFinished && (
            <ActivityFeedback
              correct
              message={<>
                ¡Muy bien! Formaste {lastMatched.word}.
                {lastMatched.isProperNoun && ' Es un nombre propio, por eso empieza con mayúscula.'}
              </>}
            />
          )}
          {isJoinFinished && (
            <ActivityFeedback correct message={<>¡Excelente! Formaste todas las palabras con no.</>} />
          )}

          {!joinFeedback && !isJoinFinished && (
            <Button icon={Check} size="large" fullWidth disabled={!selectedItem} onClick={checkJoin}>
              Formar palabra
            </Button>
          )}
          {joinFeedback === 'correct' && !isJoinFinished && (
            <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={continueJoin}>
              Formar otra palabra
            </Button>
          )}
          {isJoinFinished && (
            <Button to="/actividad/n-final" icon={ArrowRight} iconPosition="right" size="large" fullWidth>
              Ir a la actividad final
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadNCompletarPage
