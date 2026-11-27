import ActivityFeedback from '../components/common/ActivityFeedback'
import { useEffect, useState } from 'react'
import { ArrowRight, Check, RotateCcw } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import AudioPlaceholderButton from '../components/common/AudioPlaceholderButton'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  sLongestSentenceId,
  sProperNounExercise,
  sSentences,
} from '../data/sData'
import { registrarLeccionCompletada, registrarProgreso } from '../lib/progreso'

import '../styles/completion.css'
import '../styles/selection.css'
import { RewardBurst } from '../components/space/Reward'

// Página 24 del libro: reconocer el nombre propio, contar las
// palabras de cada oración y encontrar la oración más larga.
const PHASES = ['nombre', 'contar', 'larga']

const totalStars = 1 + sSentences.length + 1

function ActividadSFinalPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [stars, setStars] = useState(0)
  const [finished, setFinished] = useState(false)
  const themeClass = getLessonThemeClass('s')
  const phase = PHASES[phaseIndex]

  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

  // Fase 1: tocar el nombre propio
  const [selectedName, setSelectedName] = useState('')
  const [nameFeedback, setNameFeedback] = useState('')

  const checkName = () => {
    const isCorrect = selectedName === sProperNounExercise.answer
    setNameFeedback(isCorrect ? 'correct' : 'retry')
    if (isCorrect) setStars((current) => current + 1)

    registrarProgreso({
      actividad: 's-final',
      correcto: isCorrect,
      detalle: { leccionId: 's', fase: 'nombre', ejercicioId: sProperNounExercise.id },
    })
  }

  // Fase 2: contar las palabras de cada oración
  const [countIndex, setCountIndex] = useState(0)
  const [taggedWords, setTaggedWords] = useState([])
  const [countSelected, setCountSelected] = useState(null)
  const [countFeedback, setCountFeedback] = useState('')
  const countSentence = sSentences[countIndex]
  const isLastCount = countIndex === sSentences.length - 1
  const isCountingComplete = taggedWords.length === countSentence.words.length

  const toggleWord = (position) => {
    if (countFeedback === 'correct') return
    setCountFeedback('')
    setTaggedWords((current) =>
      current.includes(position)
        ? current.filter((item) => item !== position)
        : [...current, position],
    )
  }

  const checkCount = () => {
    if (countSelected === null || !isCountingComplete) return
    const isCorrect = countSelected === countSentence.words.length
    setCountFeedback(isCorrect ? 'correct' : 'retry')
    if (isCorrect) setStars((current) => current + 1)

    registrarProgreso({
      actividad: 's-final',
      correcto: isCorrect,
      detalle: { leccionId: 's', fase: 'contar', ejercicioId: countSentence.id },
    })
  }

  const resetCount = () => {
    setTaggedWords([])
    setCountSelected(null)
    setCountFeedback('')
  }

  const nextCount = () => {
    resetCount()
    if (isLastCount) {
      goToNextPhase()
      return
    }
    setCountIndex((current) => current + 1)
  }

  // Fase 3: elegir la oración con más palabras
  const [selectedSentence, setSelectedSentence] = useState('')
  const [longFeedback, setLongFeedback] = useState('')

  const checkLongest = () => {
    const isCorrect = selectedSentence === sLongestSentenceId
    setLongFeedback(isCorrect ? 'correct' : 'retry')
    if (isCorrect) setStars((current) => current + 1)

    registrarProgreso({
      actividad: 's-final',
      correcto: isCorrect,
      detalle: { leccionId: 's', fase: 'larga', ejercicioId: sLongestSentenceId },
    })
  }

  useEffect(() => {
    if (finished) registrarLeccionCompletada('s')
  }, [finished])

  if (finished) {
    return (
      <main className={`page ${themeClass}`}>
        <Card className="selection-card">
          <RewardBurst lessonId="s" />
          <h1>¡Terminaste la lección de la letra S!</h1>
          <p className="text-instruction">
            Practicaste el sonido /s/, las sílabas sa, se, si, so y su, nombres
            propios y oraciones.
          </p>
          <StarsCounter current={stars} total={totalStars} label="Estrellas" />
          <AudioPlaceholderButton fullWidth>
            Escuchar felicitación
          </AudioPlaceholderButton>
          <Button to="/lecciones/unidad/1" icon={ArrowRight} iconPosition="right" size="large" fullWidth>
            Volver a las lecciones
          </Button>
        </Card>
      </main>
    )
  }

  return (
    <main className={`page selection-page ${themeClass}`} aria-labelledby="s-final-title">
      <BackButton label="Volver a la lección" to="/lecciones/s" />
      <header className="text-center">
        <span className="text-ui-label">Actividad final</span>
        <h1 id="s-final-title">Practica todo lo aprendido</h1>
      </header>
      <ProgressBar value={phaseIndex + 1} max={PHASES.length} label={`Parte ${phaseIndex + 1} de ${PHASES.length}`} />
      <StarsCounter current={stars} total={totalStars} label="Estrellas" />

      {phase === 'nombre' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">{sProperNounExercise.prompt}</p>
            <AudioPlaceholderButton>Escuchar instrucción</AudioPlaceholderButton>
            <AudioPlaceholderButton>Escuchar oración</AudioPlaceholderButton>
          </div>

          <p className="text-sentence">{sProperNounExercise.sentence}</p>

          <div className="selection-options">
            {sProperNounExercise.options.map((option) => {
              const selected = selectedName === option
              const stateClass = selected && nameFeedback === 'correct'
                ? 'selection-button--correct'
                : selected && nameFeedback === 'retry'
                  ? 'selection-button--incorrect'
                  : selected
                    ? 'selection-button--selected'
                    : ''
              return (
                <button
                  className={['selection-button', stateClass].filter(Boolean).join(' ')}
                  type="button"
                  key={option}
                  aria-pressed={selected}
                  onClick={() => {
                    if (nameFeedback === 'correct') return
                    setSelectedName(option)
                    setNameFeedback('')
                  }}
                >
                  <span className="text-word">{option}</span>
                </button>
              )
            })}
          </div>

          {nameFeedback === 'correct' && (
            <ActivityFeedback correct message={<>
              ¡Correcto! Susi es un nombre propio y lleva mayúscula.
            </>} />
          )}
          {nameFeedback === 'retry' && (
            <ActivityFeedback correct={false} message={<>
              Busca la palabra que empieza con mayúscula.
            </>} />
          )}

          {!nameFeedback && (
            <Button icon={Check} size="large" fullWidth disabled={!selectedName} onClick={checkName}>
              Comprobar
            </Button>
          )}
          {nameFeedback === 'retry' && (
            <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={() => { setSelectedName(''); setNameFeedback('') }}>
              Intentar nuevamente
            </Button>
          )}
          {nameFeedback === 'correct' && (
            <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={goToNextPhase}>
              Siguiente parte
            </Button>
          )}
        </Card>
      )}

      {phase === 'contar' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Lee la oración. Toca cada palabra para contarla. Luego elige
              cuántas palabras tiene.
            </p>
            <AudioPlaceholderButton>Escuchar instrucción</AudioPlaceholderButton>
          </div>

          <AudioPlaceholderButton>Escuchar oración</AudioPlaceholderButton>

          <div className="sentence-words" aria-label={countSentence.words.join(' ')}>
            {countSentence.words.map((word, position) => (
              <button
                className={[
                  'sentence-word-button',
                  'selection-button',
                  taggedWords.includes(position) ? 'selection-button--selected' : '',
                ].filter(Boolean).join(' ')}
                type="button"
                key={`${word}-${position}`}
                aria-pressed={taggedWords.includes(position)}
                onClick={() => toggleWord(position)}
              >
                <span className="selection-word">{word}</span>
              </button>
            ))}
          </div>

          {!isCountingComplete && (
            <p className="text-instruction">Toca todas las palabras antes de comprobar.</p>
          )}

          <div className="selection-options">
            {countSentence.options.map((option) => {
              const selected = countSelected === option
              const stateClass = selected && countFeedback === 'correct'
                ? 'selection-button--correct'
                : selected && countFeedback === 'retry'
                  ? 'selection-button--incorrect'
                  : selected
                    ? 'selection-button--selected'
                    : ''
              return (
                <button
                  className={['selection-button', stateClass].filter(Boolean).join(' ')}
                  type="button"
                  key={option}
                  aria-pressed={selected}
                  onClick={() => {
                    if (countFeedback === 'correct') return
                    setCountSelected(option)
                    setCountFeedback('')
                  }}
                >
                  <span className="text-word">{option}</span>
                </button>
              )
            })}
          </div>

          {countFeedback === 'correct' && (
            <ActivityFeedback correct message={<>
              ¡Correcto! La oración tiene {countSentence.words.length} palabras.
            </>} />
          )}
          {countFeedback === 'retry' && (
            <ActivityFeedback correct={false} message={<>
              Cuenta otra vez cada palabra con cuidado.
            </>} />
          )}

          {!countFeedback && (
            <Button icon={Check} size="large" fullWidth disabled={countSelected === null || !isCountingComplete} onClick={checkCount}>
              Comprobar
            </Button>
          )}
          {countFeedback === 'retry' && (
            <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={resetCount}>
              Intentar nuevamente
            </Button>
          )}
          {countFeedback === 'correct' && (
            <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={nextCount}>
              {isLastCount ? 'Siguiente parte' : 'Siguiente oración'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'larga' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca la oración que tiene más palabras. Es la oración más larga.
            </p>
            <AudioPlaceholderButton>Escuchar instrucción</AudioPlaceholderButton>
          </div>

          <div className="selection-options">
            {sSentences.map((item) => {
              const selected = selectedSentence === item.id
              const stateClass = selected && longFeedback === 'correct'
                ? 'selection-button--correct'
                : selected && longFeedback === 'retry'
                  ? 'selection-button--incorrect'
                  : selected
                    ? 'selection-button--selected'
                    : ''
              return (
                <button
                  className={['selection-button', stateClass].filter(Boolean).join(' ')}
                  type="button"
                  key={item.id}
                  aria-pressed={selected}
                  onClick={() => {
                    if (longFeedback === 'correct') return
                    setSelectedSentence(item.id)
                    setLongFeedback('')
                  }}
                >
                  <span className="selection-word">{item.sentence}</span>
                </button>
              )
            })}
          </div>

          {longFeedback === 'correct' && (
            <ActivityFeedback correct message={<>
              ¡Muy bien! Esa oración tiene 7 palabras, es la más larga.
            </>} />
          )}
          {longFeedback === 'retry' && (
            <ActivityFeedback correct={false} message={<>
              Cuenta las palabras de cada oración y compara.
            </>} />
          )}

          {!longFeedback && (
            <Button icon={Check} size="large" fullWidth disabled={!selectedSentence} onClick={checkLongest}>
              Comprobar
            </Button>
          )}
          {longFeedback === 'retry' && (
            <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={() => { setSelectedSentence(''); setLongFeedback('') }}>
              Intentar nuevamente
            </Button>
          )}
          {longFeedback === 'correct' && (
            <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={() => setFinished(true)}>
              Finalizar lección
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadSFinalPage
