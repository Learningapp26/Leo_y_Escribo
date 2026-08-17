import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  siLCombinations,
  siLExampleWords,
  siLInstructionAudio,
  siLReading,
  siLReadingWords,
  siLSentenceInstructionAudio,
  siLSentences,
  siLSoundImages,
  siLSoundInstructionAudio,
  siLTraceInstructionAudio,
  siLTraceWords,
  siLWordOptions,
} from '../data/silabasInversasData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/selection.css'
import '../styles/syllables.css'
import '../styles/completion.css'
import '../styles/reading.css'

const PHASES = ['letra', 'sonidos', 'lectura', 'trazar', 'oraciones']

const targetSoundIds = siLSoundImages
  .filter((item) => item.hasSound)
  .map((item) => item.id)

const targetReadingWords = siLReadingWords
  .filter((item) => item.hasSound)
  .map((item) => item.word)

function selectionClass(id, selectedIds, feedback) {
  const isSelected = selectedIds.includes(id)

  if (!isSelected || !feedback) {
    return isSelected ? 'selection-button--selected' : ''
  }

  return feedback === 'correct'
    ? 'selection-button--correct'
    : 'selection-button--incorrect'
}

function ActividadSilabasInversasLPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('silabas-inversas')

  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

  // Fase 2: marcar figuras con sonido al/el/il/ol/ul
  const [soundSelected, setSoundSelected] = useState([])
  const [soundFeedback, setSoundFeedback] = useState('')

  const toggleSound = (item) => {
    if (soundFeedback === 'correct') return

    playAudio(item.audio)
    setSoundFeedback('')

    setSoundSelected((current) =>
      current.includes(item.id)
        ? current.filter((id) => id !== item.id)
        : [...current, item.id],
    )
  }

  const checkSound = () => {
    const isCorrect =
      soundSelected.length === targetSoundIds.length &&
      soundSelected.every((id) => targetSoundIds.includes(id))

    setSoundFeedback(isCorrect ? 'correct' : 'retry')
  }

  // Fase 3: encontrar las palabras del texto con sonido al/el/il/ol/ul
  const [readingSelected, setReadingSelected] = useState([])
  const [readingFeedback, setReadingFeedback] = useState('')

  const toggleReadingWord = (word) => {
    if (readingFeedback === 'correct') return

    setReadingFeedback('')

    setReadingSelected((current) =>
      current.includes(word)
        ? current.filter((item) => item !== word)
        : [...current, word],
    )
  }

  const checkReading = () => {
    const isCorrect =
      readingSelected.length === targetReadingWords.length &&
      readingSelected.every((word) => targetReadingWords.includes(word))

    setReadingFeedback(isCorrect ? 'correct' : 'retry')
  }

  // Fase 4: repasar palabras
  const [traceIndex, setTraceIndex] = useState(0)
  const traceWord = siLTraceWords[traceIndex]
  const isLastTraceWord = traceIndex === siLTraceWords.length - 1

  // Fase 5: completar oraciones con Al/El/al/el
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [filledBlanks, setFilledBlanks] = useState([])
  const [sentenceFeedback, setSentenceFeedback] = useState('')

  const sentence = siLSentences[sentenceIndex]
  const isLastSentence = sentenceIndex === siLSentences.length - 1

  const pickWord = (word) => {
    if (sentenceFeedback === 'correct') return
    if (filledBlanks.length >= sentence.blanks.length) return

    setSentenceFeedback('')
    setFilledBlanks((current) => [...current, word])
  }

  const clearBlanks = () => {
    setFilledBlanks([])
    setSentenceFeedback('')
  }

  const checkSentence = () => {
    if (filledBlanks.length !== sentence.blanks.length) return

    const isCorrect = filledBlanks.every(
      (word, index) => word === sentence.blanks[index],
    )

    setSentenceFeedback(isCorrect ? 'correct' : 'retry')
  }

  const nextSentence = () => {
    setFilledBlanks([])
    setSentenceFeedback('')
    setSentenceIndex((current) => current + 1)
  }

  const renderedSentence = sentence.template
    .split('___')
    .reduce((rendered, part, index) => {
      if (index === 0) return part

      const value = filledBlanks[index - 1] ?? '___'
      return `${rendered}${value}${part}`
    }, '')

  return (
    <main
      className={`page selection-page ${themeClass}`}
      aria-labelledby="si-l-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/silabas-inversas" />

      <header className="text-center">
        <span className="text-ui-label">Sílabas inversas</span>

        <h1 id="si-l-title">al, el, il, ol, ul</h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      {phase === 'letra' && (
        <Card className="syllables-card">
          <div className="syllables-instructions">
            <p className="text-instruction">
              Ya conoces el sonido de la letra L, es /lll/. Ahora escucha
              cómo suena cuando la vocal va antes de la L.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(siLInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="syllables-options">
            {siLCombinations.map((item) => (
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

          <p className="text-instruction">
            Escucha estas palabras: {siLExampleWords.join(', ')}.
          </p>

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

      {phase === 'sonidos' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca las figuras donde escuches al, el, il, ol o ul.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(siLSoundInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {siLSoundImages.map((item) => (
              <button
                className={[
                  'selection-button',
                  selectionClass(item.id, soundSelected, soundFeedback),
                ]
                  .filter(Boolean)
                  .join(' ')}
                type="button"
                key={item.id}
                aria-pressed={soundSelected.includes(item.id)}
                onClick={() => toggleSound(item)}
              >
                <img
                  className="selection-image"
                  src={item.image}
                  alt={item.word}
                />

                <span className="selection-word">{item.word}</span>
              </button>
            ))}
          </div>

          {soundFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Muy bien!
            </p>
          )}

          {soundFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Revisa otra vez. Alguna figura no tiene ese sonido.
            </p>
          )}

          {soundFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={soundSelected.length === 0}
              onClick={checkSound}
            >
              Comprobar
            </Button>
          )}

          {soundFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setSoundSelected([])
                setSoundFeedback('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {soundFeedback === 'correct' && (
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

      {phase === 'lectura' && (
        <>
          <Card className="reading-card">
            <div className="reading-content">
              <div className="reading-story">
                {siLReading.paragraphs.map((paragraph) => (
                  <p className="text-reading" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="reading-audio">
                <Button
                  variant="audio"
                  size="large"
                  icon={Volume2}
                  onClick={() => playAudio(siLReading.audio)}
                >
                  Escuchar la historia
                </Button>
              </div>
            </div>

            <div className="reading-image">
              <img src={siLReading.image} alt={siLReading.imageAlt} />
            </div>
          </Card>

          <Card className="selection-card">
            <div className="selection-instructions">
              <p className="text-instruction">
                Toca las palabras del cuento que tienen sonido al, el, il,
                ol o ul.
              </p>
            </div>

            <div className="selection-options">
              {siLReadingWords.map((item) => (
                <button
                  className={[
                    'selection-button',
                    selectionClass(item.word, readingSelected, readingFeedback),
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={item.word}
                  aria-pressed={readingSelected.includes(item.word)}
                  onClick={() => toggleReadingWord(item.word)}
                >
                  <span className="selection-word">{item.word}</span>
                </button>
              ))}
            </div>

            {readingFeedback === 'correct' && (
              <p
                className="selection-feedback selection-feedback--correct"
                role="status"
              >
                ¡Muy bien! Encontraste las palabras con ese sonido.
              </p>
            )}

            {readingFeedback === 'retry' && (
              <p
                className="selection-feedback selection-feedback--retry"
                role="status"
              >
                Revisa otra vez. Falta alguna o sobra alguna palabra.
              </p>
            )}

            {readingFeedback !== 'correct' && (
              <Button
                icon={Check}
                size="large"
                fullWidth
                disabled={readingSelected.length === 0}
                onClick={checkReading}
              >
                Comprobar
              </Button>
            )}

            {readingFeedback === 'retry' && (
              <Button
                variant="retry"
                icon={RotateCcw}
                size="large"
                fullWidth
                onClick={() => {
                  setReadingSelected([])
                  setReadingFeedback('')
                }}
              >
                Intentar nuevamente
              </Button>
            )}

            {readingFeedback === 'correct' && (
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
        </>
      )}

      {phase === 'trazar' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca cada palabra y repítela en voz alta.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(siLTraceInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          {traceWord.isProperNoun && (
            <p className="text-instruction">
              Recuerda: los nombres propios se escriben con mayúscula.
            </p>
          )}

          <img
            className="selection-image selection-image--featured"
            src={traceWord.image}
            alt={traceWord.word}
          />

          <span className="text-word">{traceWord.word}</span>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(traceWord.audio)}
          >
            Escuchar palabra
          </Button>

          <Button
            icon={ArrowRight}
            iconPosition="right"
            size="large"
            fullWidth
            onClick={() => {
              if (isLastTraceWord) {
                goToNextPhase()
                return
              }

              setTraceIndex((current) => current + 1)
            }}
          >
            {isLastTraceWord ? 'Continuar' : 'Siguiente palabra'}
          </Button>
        </Card>
      )}

      {phase === 'oraciones' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Completa la oración con Al, El, al o el, en orden.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(siLSentenceInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <Button
            variant="audio"
            icon={Volume2}
            onClick={() => playAudio(sentence.audio)}
          >
            Escuchar oración
          </Button>

          <p className="text-sentence">{renderedSentence}</p>

          <div className="selection-options">
            {siLWordOptions.map((word) => (
              <button
                className="selection-button"
                type="button"
                key={word}
                disabled={
                  sentenceFeedback === 'correct' ||
                  filledBlanks.length >= sentence.blanks.length
                }
                onClick={() => pickWord(word)}
              >
                <span className="text-word">{word}</span>
              </button>
            ))}
          </div>

          {sentenceFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto!
            </p>
          )}

          {sentenceFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esas palabras no van ahí. Inténtalo de nuevo.
            </p>
          )}

          {sentenceFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={filledBlanks.length !== sentence.blanks.length}
              onClick={checkSentence}
            >
              Comprobar
            </Button>
          )}

          {sentenceFeedback !== 'correct' && filledBlanks.length > 0 && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={clearBlanks}
            >
              Borrar y empezar de nuevo
            </Button>
          )}

          {sentenceFeedback === 'correct' && (
            <Button
              to={isLastSentence ? '/lecciones/silabas-inversas' : undefined}
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={isLastSentence ? undefined : nextSentence}
            >
              {isLastSentence ? 'Volver a la lección' : 'Siguiente oración'}
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadSilabasInversasLPage
