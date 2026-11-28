import BookLessonImage from '../components/lessons/BookLessonImage'
import ActivityFeedback from '../components/common/ActivityFeedback'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, RotateCcw } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import LessonAudioButton from '../components/common/LessonAudioButton'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  asAudio,
  nFinalCongratulationsAudio,
  nPracticeInstructionAudio,
  nPracticeWords,
  nSentenceChoice,
  nSentenceChoiceInstructionAudio,
  nSentenceImageMatch,
  nSentenceImageMatchInstructionAudio,
} from '../data/nData'
import { registrarLeccionCompletada, registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/completion.css'
import { RewardBurst } from '../components/space/Reward'

const PHASES = ['palabras', 'oraciones', 'relacionar']

const totalExercises = nSentenceChoice.length + nSentenceImageMatch.length

function ActividadNFinalPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]
  const themeClass = getLessonThemeClass('n')

  // Las estrellas se cuentan por ejercicio acertado (sin duplicados), así un
  // doble clic en «Comprobar» no puede sumar dos veces.
  const [correctIds, setCorrectIds] = useState([])
  const stars = correctIds.length
  const [finished, setFinished] = useState(false)
  const lock = useRef(false)

  const earnStar = (id) =>
    setCorrectIds((current) => (current.includes(id) ? current : [...current, id]))

  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

  // Fase 1: leer palabras
  const [practiceIndex, setPracticeIndex] = useState(0)
  const practiceWord = nPracticeWords[practiceIndex]
  const isLastPracticeWord = practiceIndex === nPracticeWords.length - 1

  // Fase 2: elegir la oración que corresponde a la imagen
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [selectedSentence, setSelectedSentence] = useState('')
  const [sentenceResult, setSentenceResult] = useState('')
  const sentenceChoice = nSentenceChoice[sentenceIndex]

  const checkSentence = () => {
    if (!selectedSentence || lock.current) return
    lock.current = true
    const isCorrect = selectedSentence === sentenceChoice.answer
    setSentenceResult(isCorrect ? 'correct' : 'retry')
    if (isCorrect) earnStar(`oraciones:${sentenceChoice.id}`)

    registrarProgreso({
      actividad: 'n-final',
      correcto: isCorrect,
      detalle: { leccionId: 'n', fase: 'oraciones', ejercicioId: sentenceChoice.id },
    })
  }

  const resetSentence = () => {
    lock.current = false
    setSelectedSentence('')
    setSentenceResult('')
  }

  const nextSentence = () => {
    const isLast = sentenceIndex === nSentenceChoice.length - 1
    resetSentence()
    if (isLast) {
      goToNextPhase()
      return
    }
    setSentenceIndex((current) => current + 1)
  }

  // Fase 3: leer la oración y elegir la imagen
  const [matchIndex, setMatchIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState('')
  const [matchResult, setMatchResult] = useState('')
  const matchItem = nSentenceImageMatch[matchIndex]

  const checkMatch = () => {
    if (!selectedImage || lock.current) return
    lock.current = true
    const isCorrect = selectedImage === matchItem.answerImage
    setMatchResult(isCorrect ? 'correct' : 'retry')
    if (isCorrect) earnStar(`relacionar:${matchItem.id}`)

    registrarProgreso({
      actividad: 'n-final',
      correcto: isCorrect,
      detalle: { leccionId: 'n', fase: 'relacionar', ejercicioId: matchItem.id },
    })
  }

  const resetMatch = () => {
    lock.current = false
    setSelectedImage('')
    setMatchResult('')
  }

  const nextMatch = () => {
    const isLast = matchIndex === nSentenceImageMatch.length - 1
    resetMatch()
    if (isLast) {
      setFinished(true)
      return
    }
    setMatchIndex((current) => current + 1)
  }

  useEffect(() => {
    if (finished) registrarLeccionCompletada('n')
  }, [finished])

  if (finished) {
    return (
      <main className={`page ${themeClass}`}>
        <Card className="selection-card">
          <RewardBurst lessonId="n" />

          <h1>¡Terminaste la lección de la letra N!</h1>

          <p className="text-instruction">
            Aprendiste el sonido /n/, sus sílabas na, ne, ni, no, nu y palabras
            nuevas.
          </p>

          <StarsCounter current={Math.min(stars, totalExercises)} total={totalExercises} label="Estrellas" />

          <LessonAudioButton audio={asAudio(nFinalCongratulationsAudio)} fullWidth>
            Escuchar felicitación
          </LessonAudioButton>

          <Button to="/lecciones/unidad/1" icon={ArrowRight} iconPosition="right" size="large" fullWidth>
            Volver a las lecciones
          </Button>
        </Card>
      </main>
    )
  }

  return (
    <main className={`page selection-page ${themeClass}`} aria-labelledby="n-final-title">
      <BackButton label="Volver a la lección" to="/lecciones/n" />

      <header className="text-center">
        <span className="text-ui-label">Actividad final</span>
        <h1 id="n-final-title">Practica todo lo aprendido</h1>
      </header>

      <ProgressBar value={phaseIndex + 1} max={PHASES.length} label={`Parte ${phaseIndex + 1} de ${PHASES.length}`} />

      <StarsCounter current={stars} total={totalExercises} label="Estrellas" />

      {phase === 'palabras' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">Toca cada palabra y repítela en voz alta.</p>
            <LessonAudioButton audio={asAudio(nPracticeInstructionAudio)}>
              Escuchar instrucción
            </LessonAudioButton>
          </div>

          <BookLessonImage
            className="selection-image selection-image--featured"
            src={practiceWord.image}
            alt={practiceWord.word} hideLabel key={practiceWord.image} />

          <span className="text-word">{practiceWord.word}</span>

          <LessonAudioButton audio={asAudio(practiceWord.audio)} size="large">
            Escuchar palabra
          </LessonAudioButton>

          <Button
            icon={ArrowRight}
            iconPosition="right"
            size="large"
            fullWidth
            onClick={() => {
              if (isLastPracticeWord) {
                goToNextPhase()
                return
              }
              setPracticeIndex((current) => current + 1)
            }}
          >
            {isLastPracticeWord ? 'Continuar' : 'Siguiente palabra'}
          </Button>
        </Card>
      )}

      {phase === 'oraciones' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">Mira la imagen y elige la oración que corresponde.</p>
            <LessonAudioButton audio={asAudio(nSentenceChoiceInstructionAudio)}>
              Escuchar instrucción
            </LessonAudioButton>
          </div>

          <BookLessonImage
            className="selection-image selection-image--featured"
            src={sentenceChoice.image}
            alt={sentenceChoice.imageAlt} hideLabel key={sentenceChoice.image} />

          <div className="selection-options">
            {sentenceChoice.options.map((option) => {
              const selected = selectedSentence === option
              const stateClass = selected && sentenceResult
                ? sentenceResult === 'correct' ? 'selection-button--correct' : 'selection-button--incorrect'
                : selected ? 'selection-button--selected' : ''

              return (
                <button
                  className={['selection-button', stateClass].filter(Boolean).join(' ')}
                  type="button"
                  key={option}
                  aria-pressed={selected}
                  disabled={Boolean(sentenceResult)}
                  onClick={() => {
                    if (sentenceResult) return
                    setSelectedSentence(option)
                  }}
                >
                  <span className="selection-word">{option}</span>
                </button>
              )
            })}
          </div>

          {sentenceResult === 'correct' && (
            <ActivityFeedback correct message={<>¡Correcto! {sentenceChoice.answer}</>} />
          )}
          {sentenceResult === 'retry' && (
            <ActivityFeedback correct={false} message={<>Esa oración no corresponde a la imagen. Mira otra vez.</>} />
          )}

          {!sentenceResult && (
            <Button icon={Check} size="large" fullWidth disabled={!selectedSentence} onClick={checkSentence}>
              Comprobar
            </Button>
          )}
          {sentenceResult === 'retry' && (
            <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={resetSentence}>
              Volver a intentar
            </Button>
          )}
          {sentenceResult === 'correct' && (
            <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={nextSentence}>
              {sentenceIndex === nSentenceChoice.length - 1 ? 'Siguiente parte' : 'Siguiente oración'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'relacionar' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">Lee la oración y toca la imagen que corresponde.</p>
            <LessonAudioButton audio={asAudio(nSentenceImageMatchInstructionAudio)}>
              Escuchar instrucción
            </LessonAudioButton>
          </div>

          <p className="text-sentence">{matchItem.sentence}</p>

          <LessonAudioButton audio={asAudio(matchItem.audio)}>Escuchar oración</LessonAudioButton>

          <div className="selection-options">
            {matchItem.options.map((option) => {
              const selected = selectedImage === option.image
              const stateClass = selected && matchResult
                ? matchResult === 'correct' ? 'selection-button--correct' : 'selection-button--incorrect'
                : selected ? 'selection-button--selected' : ''

              return (
                <button
                  className={['selection-button', stateClass].filter(Boolean).join(' ')}
                  type="button"
                  key={option.image}
                  aria-pressed={selected}
                  disabled={Boolean(matchResult)}
                  onClick={() => {
                    if (matchResult) return
                    setSelectedImage(option.image)
                  }}
                >
                  {/* Solo la imagen: el niño no debe ver el texto de la respuesta. */}
                  <BookLessonImage className="selection-image" src={option.image} alt={option.name} hideLabel key={option.image} />
                </button>
              )
            })}
          </div>

          {matchResult === 'correct' && (
            <ActivityFeedback correct message={<>¡Correcto! Esa imagen corresponde a la oración.</>} />
          )}
          {matchResult === 'retry' && (
            <ActivityFeedback correct={false} message={<>Esa no es la imagen correcta. Lee otra vez.</>} />
          )}

          {!matchResult && (
            <Button icon={Check} size="large" fullWidth disabled={!selectedImage} onClick={checkMatch}>
              Comprobar
            </Button>
          )}
          {matchResult === 'retry' && (
            <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={resetMatch}>
              Volver a intentar
            </Button>
          )}
          {matchResult === 'correct' && (
            <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={nextMatch}>
              {matchIndex === nSentenceImageMatch.length - 1 ? 'Finalizar lección' : 'Siguiente oración'}
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadNFinalPage
