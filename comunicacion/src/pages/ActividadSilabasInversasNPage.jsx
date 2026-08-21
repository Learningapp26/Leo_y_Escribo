import { useEffect, useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  siNCombinations,
  siNExampleWords,
  siNInstructionAudio,
  siNNamePicture,
  siNReading,
  siNReadingWords,
  siNSentenceCompletion,
  siNSentenceInstructionAudio,
  siNSoundImages,
  siNSoundInstructionAudio,
  siNTraceInstructionAudio,
  siNTraceWords,
} from '../data/silabasInversasData'
import { playAudio } from '../lib/audioPlayer'
import { registrarLeccionCompletada, registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/syllables.css'
import '../styles/reading.css'

const PHASES = ['letra', 'sonidos', 'lectura', 'trazar', 'oraciones', 'nombrar']

const targetSoundIds = siNSoundImages
  .filter((item) => item.hasSound)
  .map((item) => item.id)

const targetReadingWords = siNReadingWords
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

function ActividadSilabasInversasNPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('silabas-inversas')

  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

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

    registrarProgreso({
      actividad: 'silabas-inversas-n',
      correcto: isCorrect,
      detalle: { leccionId: 'silabas-inversas', fase: 'sonidos' },
    })
  }

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

    registrarProgreso({
      actividad: 'silabas-inversas-n',
      correcto: isCorrect,
      detalle: { leccionId: 'silabas-inversas', fase: 'lectura' },
    })
  }

  const [traceIndex, setTraceIndex] = useState(0)
  const traceWord = siNTraceWords[traceIndex]
  const isLastTraceWord = traceIndex === siNTraceWords.length - 1

  // Fase 5: completar oraciones con la imagen que corresponde
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState('')
  const [sentenceFeedback, setSentenceFeedback] = useState('')

  const sentenceItem = siNSentenceCompletion[sentenceIndex]
  const isLastSentence = sentenceIndex === siNSentenceCompletion.length - 1

  const checkSentence = () => {
    if (!selectedOption) return

    const isCorrect = selectedOption === sentenceItem.answer

    setSentenceFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'silabas-inversas-n',
      correcto: isCorrect,
      detalle: {
        leccionId: 'silabas-inversas',
        fase: 'oraciones',
        ejercicioId: sentenceItem.id,
      },
    })
  }

  const nextSentence = () => {
    setSelectedOption('')
    setSentenceFeedback('')

    if (isLastSentence) {
      goToNextPhase()
      return
    }

    setSentenceIndex((current) => current + 1)
  }

  // Fase 6: nombrar el dibujo (en el libro es de respuesta libre)
  const [pictureIndex, setPictureIndex] = useState(0)
  const [selectedWord, setSelectedWord] = useState('')
  const [pictureFeedback, setPictureFeedback] = useState('')

  const pictureItem = siNNamePicture[pictureIndex]
  const isLastPicture = pictureIndex === siNNamePicture.length - 1

  const checkPicture = () => {
    if (!selectedWord) return

    const isCorrect = selectedWord === pictureItem.answer

    setPictureFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'silabas-inversas-n',
      correcto: isCorrect,
      detalle: {
        leccionId: 'silabas-inversas',
        fase: 'nombrar',
        ejercicioId: pictureItem.id,
      },
    })
  }

  const nextPicture = () => {
    setSelectedWord('')
    setPictureFeedback('')
    setPictureIndex((current) => current + 1)
  }

  useEffect(() => {
    if (isLastPicture && pictureFeedback === 'correct') {
      registrarLeccionCompletada('silabas-inversas', 'n')
    }
  }, [isLastPicture, pictureFeedback])

  return (
    <main
      className={`page selection-page ${themeClass}`}
      aria-labelledby="si-n-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/silabas-inversas" />

      <header className="text-center">
        <span className="text-ui-label">Sílabas inversas</span>

        <h1 id="si-n-title">an, en, in, on, un</h1>
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
              Ya conoces el sonido de la letra N, es /nnn/. Ahora escucha
              cómo suena cuando la vocal va antes de la N.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(siNInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="syllables-options">
            {siNCombinations.map((item) => (
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
            Escucha estas palabras: {siNExampleWords.join(', ')}.
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
              Toca las figuras donde escuches an, en, in, on o un.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(siNSoundInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {siNSoundImages.map((item) => (
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
                {siNReading.paragraphs.map((paragraph) => (
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
                  onClick={() => playAudio(siNReading.audio)}
                >
                  Escuchar la historia
                </Button>
              </div>
            </div>

            <div className="reading-image">
              <img src={siNReading.image} alt={siNReading.imageAlt} />
            </div>
          </Card>

          <Card className="selection-card">
            <div className="selection-instructions">
              <p className="text-instruction">
                Toca las palabras del cuento que tienen sonido an, en, in,
                on o un.
              </p>
            </div>

            <div className="selection-options">
              {siNReadingWords.map((item) => (
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
              onClick={() => playAudio(siNTraceInstructionAudio)}
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
              Escucha la oración y elige la imagen que la completa.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(siNSentenceInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <Button
            variant="audio"
            icon={Volume2}
            onClick={() => playAudio(sentenceItem.audio)}
          >
            Escuchar oración
          </Button>

          <p className="text-sentence">
            {sentenceItem.template.replace(
              '___',
              selectedOption || '________',
            )}
          </p>

          <div className="selection-options">
            {sentenceItem.options.map((option) => {
              const selected = selectedOption === option.name

              const stateClass =
                sentenceFeedback && selected
                  ? sentenceFeedback === 'correct'
                    ? 'selection-button--correct'
                    : 'selection-button--incorrect'
                  : selected
                    ? 'selection-button--selected'
                    : ''

              return (
                <button
                  className={['selection-button', stateClass]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={option.name}
                  aria-pressed={selected}
                  onClick={() => {
                    setSelectedOption(option.name)
                    setSentenceFeedback('')
                  }}
                >
                  <img
                    className="selection-image"
                    src={option.image}
                    alt={option.name}
                  />

                  <span className="selection-word">{option.name}</span>
                </button>
              )
            })}
          </div>

          {sentenceFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto!{' '}
              {sentenceItem.template.replace('___', sentenceItem.answer)}
            </p>
          )}

          {sentenceFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esa imagen no completa la oración. Escucha otra vez.
            </p>
          )}

          {sentenceFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!selectedOption}
              onClick={checkSentence}
            >
              Comprobar
            </Button>
          )}

          {sentenceFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setSelectedOption('')
                setSentenceFeedback('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {sentenceFeedback === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextSentence}
            >
              {isLastSentence ? 'Siguiente parte' : 'Siguiente oración'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'nombrar' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Observa el dibujo y elige la palabra que lo nombra.
            </p>
          </div>

          <img
            className="selection-image selection-image--featured"
            src={pictureItem.image}
            alt="Dibujo para adivinar y nombrar"
          />

          <Button
            variant="audio"
            icon={Volume2}
            onClick={() => playAudio(pictureItem.audio)}
          >
            Escuchar pista
          </Button>

          <div className="selection-options">
            {pictureItem.options.map((word) => {
              const selected = selectedWord === word

              const stateClass =
                pictureFeedback && selected
                  ? pictureFeedback === 'correct'
                    ? 'selection-button--correct'
                    : 'selection-button--incorrect'
                  : selected
                    ? 'selection-button--selected'
                    : ''

              return (
                <button
                  className={['selection-button', stateClass]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={word}
                  aria-pressed={selected}
                  onClick={() => {
                    setSelectedWord(word)
                    setPictureFeedback('')
                  }}
                >
                  <span className="text-word">{word}</span>
                </button>
              )
            })}
          </div>

          {pictureFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto!
            </p>
          )}

          {pictureFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esa no es la palabra correcta.
            </p>
          )}

          {pictureFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!selectedWord}
              onClick={checkPicture}
            >
              Comprobar
            </Button>
          )}

          {pictureFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setSelectedWord('')
                setPictureFeedback('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {pictureFeedback === 'correct' && !isLastPicture && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextPicture}
            >
              Siguiente
            </Button>
          )}

          {pictureFeedback === 'correct' && isLastPicture && (
            <Button
              to="/lecciones/silabas-inversas"
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
            >
              Volver a la lección
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadSilabasInversasNPage
