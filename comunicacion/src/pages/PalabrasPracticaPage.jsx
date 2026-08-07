import { useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  Check,
  RotateCcw,
  Sparkles,
  Volume2,
} from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import { getLessonThemeClass } from '../data/lessonColors'
import { wordPracticeGroups } from '../data/wordPracticeData'
import { playAudio } from '../lib/audioPlayer'

const STEPS = ['leer', 'buscar', 'corta', 'silabas']

function PalabrasPracticaPage() {
  const [groupId, setGroupId] = useState(wordPracticeGroups[0].lessonId)
  const [stepIndex, setStepIndex] = useState(0)
  const [readWordIds, setReadWordIds] = useState([])
  const [selectedFindIds, setSelectedFindIds] = useState([])
  const [findFeedback, setFindFeedback] = useState('')
  const [shortWordId, setShortWordId] = useState('')
  const [shortFeedback, setShortFeedback] = useState('')
  const [syllableCount, setSyllableCount] = useState(null)
  const [syllableFeedback, setSyllableFeedback] = useState('')
  const [stars, setStars] = useState(0)

  const group = wordPracticeGroups.find((item) => item.lessonId === groupId)
  const step = STEPS[stepIndex]
  const themeClass = getLessonThemeClass(group.lessonId)
  const allWordsRead = readWordIds.length === group.words.length
  const findTargets = group.find.options.filter((option) => option.isTarget)

  const resetPractice = (nextGroupId) => {
    setGroupId(nextGroupId)
    setStepIndex(0)
    setReadWordIds([])
    setSelectedFindIds([])
    setFindFeedback('')
    setShortWordId('')
    setShortFeedback('')
    setSyllableCount(null)
    setSyllableFeedback('')
    setStars(0)
  }

  const markWordAsRead = (word) => {
    setReadWordIds((current) =>
      current.includes(word.id) ? current : [...current, word.id],
    )
    playAudio(word.audio)
  }

  const toggleFindWord = (id) => {
    if (findFeedback) return

    setSelectedFindIds((current) =>
      current.includes(id)
        ? current.filter((currentId) => currentId !== id)
        : [...current, id],
    )
  }

  const checkFindWords = () => {
    const isCorrect =
      selectedFindIds.length === findTargets.length &&
      findTargets.every((option) => selectedFindIds.includes(option.id))

    setFindFeedback(isCorrect ? 'correct' : 'retry')
    if (isCorrect) setStars((current) => current + 1)
  }

  const checkShortestWord = () => {
    const isCorrect = shortWordId === group.shortest.answer

    setShortFeedback(isCorrect ? 'correct' : 'retry')
    if (isCorrect) setStars((current) => current + 1)
  }

  const checkSyllableCount = () => {
    const isCorrect = syllableCount === group.syllables.parts.length

    setSyllableFeedback(isCorrect ? 'correct' : 'retry')
    if (isCorrect) setStars((current) => current + 1)
  }

  const nextStep = () => setStepIndex((current) => current + 1)

  if (stepIndex === STEPS.length) {
    return (
      <main className={`page word-practice-page ${themeClass}`}>
        <BackButton label="Volver a lecciones" to="/lecciones" />

        <Card className="word-practice-card word-practice-card--finished">
          <Sparkles className="word-practice-finish-icon" aria-hidden="true" />
          <h1>¡Muy bien!</h1>
          <p className="text-instruction">
            Leíste, buscaste y separaste palabras con la letra {group.label}.
          </p>
          <StarsCounter current={stars} total={3} label="Estrellas" />
          <Button
            icon={BookOpen}
            size="large"
            fullWidth
            onClick={() => resetPractice(groupId)}
          >
            Practicar otra vez
          </Button>
          <Button
            to="/lecciones"
            variant="secondary"
            icon={ArrowRight}
            iconPosition="right"
            size="large"
            fullWidth
          >
            Volver a lecciones
          </Button>
        </Card>
      </main>
    )
  }

  return (
    <main
      className={`page word-practice-page ${themeClass}`}
      aria-labelledby="word-practice-title"
    >
      <BackButton label="Volver a lecciones" to="/lecciones" />

      <header className="text-center word-practice-header">
        <span className="text-ui-label">Unidad 1 · Práctica de lectura</span>
        <h1 id="word-practice-title">Palabras para leer y practicar</h1>
        <p className="text-instruction">
          Elige una letra. Lee las palabras y completa los retos.
        </p>
      </header>

      <div className="word-practice-groups" aria-label="Grupos de palabras">
        {wordPracticeGroups.map((item) => {
          const isActive = item.lessonId === groupId

          return (
            <Button
              key={item.lessonId}
              variant="secondary"
              className={[
                'word-practice-group',
                isActive ? 'word-practice-group--active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-pressed={isActive}
              onClick={() => resetPractice(item.lessonId)}
            >
              {item.label}
            </Button>
          )
        })}
      </div>

      <ProgressBar
        value={stepIndex + 1}
        max={STEPS.length}
        label={`Paso ${stepIndex + 1} de ${STEPS.length}`}
      />

      <StarsCounter current={stars} total={3} label="Estrellas" />

      {step === 'leer' && (
        <Card className="word-practice-card">
          <div className="word-practice-instructions">
            <BookOpen aria-hidden="true" />
            <h2>{group.title}</h2>
            <p className="text-instruction">
              Toca cada palabra, léela en voz alta y escúchala.
            </p>
          </div>

          <div className="word-practice-word-list" aria-label={group.title}>
            {group.words.map((word) => {
              const isRead = readWordIds.includes(word.id)

              return (
                <Button
                  key={word.id}
                  variant="secondary"
                  className={[
                    'word-practice-word',
                    isRead ? 'word-practice-word--read' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={isRead}
                  onClick={() => markWordAsRead(word)}
                >
                  <Volume2 className="word-practice-word__icon" aria-hidden="true" />
                  {word.word}
                </Button>
              )
            })}
          </div>

          <p className="word-practice-status" aria-live="polite">
            {readWordIds.length} de {group.words.length} palabras leídas
          </p>

          <Button
            icon={ArrowRight}
            iconPosition="right"
            size="large"
            fullWidth
            disabled={!allWordsRead}
            onClick={nextStep}
          >
            Siguiente reto
          </Button>
        </Card>
      )}

      {step === 'buscar' && (
        <Card className="word-practice-card">
          <div className="word-practice-instructions">
            <Check aria-hidden="true" />
            <h2>Busca la letra</h2>
            <p className="text-instruction">{group.find.prompt}</p>
          </div>

          <div className="word-practice-options">
            {group.find.options.map((option) => {
              const isSelected = selectedFindIds.includes(option.id)
              const stateClass =
                findFeedback === 'correct' && option.isTarget
                  ? 'word-practice-option--correct'
                  : findFeedback === 'retry' && isSelected
                    ? 'word-practice-option--retry'
                    : isSelected
                      ? 'word-practice-option--selected'
                      : ''

              return (
                <Button
                  key={option.id}
                  variant="secondary"
                  className={['word-practice-option', stateClass]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={isSelected}
                  onClick={() => toggleFindWord(option.id)}
                >
                  {option.word}
                </Button>
              )
            })}
          </div>

          {findFeedback === 'correct' && (
            <p className="selection-feedback selection-feedback--correct" role="status">
              ¡Correcto! Encontraste todas las palabras con {group.label}.
            </p>
          )}

          {findFeedback === 'retry' && (
            <p className="selection-feedback selection-feedback--retry" role="status">
              Revisa las palabras marcadas e inténtalo otra vez.
            </p>
          )}

          {!findFeedback && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!selectedFindIds.length}
              onClick={checkFindWords}
            >
              Comprobar
            </Button>
          )}

          {findFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setSelectedFindIds([])
                setFindFeedback('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {findFeedback === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextStep}
            >
              Siguiente reto
            </Button>
          )}
        </Card>
      )}

      {step === 'corta' && (
        <Card className="word-practice-card">
          <div className="word-practice-instructions">
            <BookOpen aria-hidden="true" />
            <h2>Palabra corta</h2>
            <p className="text-instruction">{group.shortest.prompt}</p>
          </div>

          <div className="word-practice-options word-practice-options--three">
            {group.shortest.options.map((word) => {
              const isSelected = shortWordId === word
              const stateClass =
                shortFeedback === 'correct' && word === group.shortest.answer
                  ? 'word-practice-option--correct'
                  : shortFeedback === 'retry' && isSelected
                    ? 'word-practice-option--retry'
                    : isSelected
                      ? 'word-practice-option--selected'
                      : ''

              return (
                <Button
                  key={word}
                  variant="secondary"
                  className={['word-practice-option', stateClass]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={isSelected}
                  onClick={() => !shortFeedback && setShortWordId(word)}
                >
                  {word}
                </Button>
              )
            })}
          </div>

          {shortFeedback === 'correct' && (
            <p className="selection-feedback selection-feedback--correct" role="status">
              ¡Muy bien! {group.shortest.answer} es la palabra más corta.
            </p>
          )}

          {shortFeedback === 'retry' && (
            <p className="selection-feedback selection-feedback--retry" role="status">
              Mira cuántas letras tiene cada palabra y prueba otra vez.
            </p>
          )}

          {!shortFeedback && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!shortWordId}
              onClick={checkShortestWord}
            >
              Comprobar
            </Button>
          )}

          {shortFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setShortWordId('')
                setShortFeedback('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {shortFeedback === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextStep}
            >
              Último reto
            </Button>
          )}
        </Card>
      )}

      {step === 'silabas' && (
        <Card className="word-practice-card">
          <div className="word-practice-instructions">
            <Volume2 aria-hidden="true" />
            <h2>Separa en sílabas</h2>
            <p className="text-instruction">
              Da palmas y elige cuántas sílabas tiene esta palabra.
            </p>
          </div>

          <span className="text-word word-practice-syllable-word">
            {group.syllables.word}
          </span>

          <div className="word-practice-options word-practice-options--three">
            {group.syllables.options.map((count) => {
              const isSelected = syllableCount === count
              const stateClass =
                syllableFeedback === 'correct' && count === group.syllables.parts.length
                  ? 'word-practice-option--correct'
                  : syllableFeedback === 'retry' && isSelected
                    ? 'word-practice-option--retry'
                    : isSelected
                      ? 'word-practice-option--selected'
                      : ''

              return (
                <Button
                  key={count}
                  variant="secondary"
                  className={['word-practice-option', stateClass]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={isSelected}
                  onClick={() => !syllableFeedback && setSyllableCount(count)}
                >
                  {count} sílabas
                </Button>
              )
            })}
          </div>

          {syllableFeedback === 'correct' && (
            <>
              <p className="selection-feedback selection-feedback--correct" role="status">
                ¡Excelente! La palabra tiene {group.syllables.parts.length} sílabas.
              </p>
              <p className="word-practice-syllables" aria-label={`Sílabas: ${group.syllables.parts.join(', ')}`}>
                {group.syllables.parts.map((part) => (
                  <span key={part}>{part}</span>
                ))}
              </p>
            </>
          )}

          {syllableFeedback === 'retry' && (
            <p className="selection-feedback selection-feedback--retry" role="status">
              Da palmas lentamente y vuelve a contar.
            </p>
          )}

          {!syllableFeedback && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={syllableCount === null}
              onClick={checkSyllableCount}
            >
              Comprobar
            </Button>
          )}

          {syllableFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setSyllableCount(null)
                setSyllableFeedback('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {syllableFeedback === 'correct' && (
            <Button
              icon={Sparkles}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextStep}
            >
              Finalizar práctica
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default PalabrasPracticaPage
