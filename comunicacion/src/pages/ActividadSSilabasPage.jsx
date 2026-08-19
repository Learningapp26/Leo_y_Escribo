import { useState } from 'react'
import { ArrowRight, Check, RotateCcw } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import AudioPlaceholderButton from '../components/common/AudioPlaceholderButton'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import { sSyllableChallenges, sSyllables } from '../data/sData'
import { registrarProgreso } from '../lib/progreso'

import '../styles/syllables.css'
import '../styles/selection.css'

function ActividadSSilabasPage() {
  const [challengeIndex, setChallengeIndex] = useState(0)
  const [selectedSyllable, setSelectedSyllable] = useState('')
  const [feedback, setFeedback] = useState('')
  const themeClass = getLessonThemeClass('s')
  const challenge = sSyllableChallenges[challengeIndex]
  const isLastChallenge = challengeIndex === sSyllableChallenges.length - 1

  const chooseSyllable = (syllable) => {
    if (feedback === 'correct') return
    setSelectedSyllable(syllable)
    setFeedback('')
  }

  const check = () => {
    const isCorrect = selectedSyllable === challenge.answer

    setFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 's-silabas',
      correcto: isCorrect,
      detalle: { leccionId: 's', ejercicioId: challenge.id },
    })
  }

  const retry = () => {
    setSelectedSyllable('')
    setFeedback('')
  }

  const next = () => {
    if (isLastChallenge) return
    setChallengeIndex((current) => current + 1)
    retry()
  }

  return (
    <main className={`page syllables-page ${themeClass}`} aria-labelledby="s-silabas-title">
      <BackButton label="Volver a la lección" to="/lecciones/s" />
      <header className="text-center">
        <span className="text-ui-label">Actividad 2</span>
        <h1 id="s-silabas-title">Sílabas con S</h1>
      </header>
      <ProgressBar
        value={challengeIndex + 1}
        max={sSyllableChallenges.length}
        label={`Palabra ${challengeIndex + 1} de ${sSyllableChallenges.length}`}
      />

      <Card className="syllables-card">
        <div className="syllables-instructions">
          <p className="text-instruction">Une la S con las vocales: sa, se, si, so y su.</p>
          <p>Elige la sílaba que completa la palabra.</p>
          <AudioPlaceholderButton>Escuchar instrucción</AudioPlaceholderButton>
        </div>

        <AudioPlaceholderButton>Escuchar las sílabas</AudioPlaceholderButton>

        <p className="completion-word-pattern" aria-label={`Completa ${challenge.word}`}>
          {challenge.pattern}
        </p>

        <div className="syllables-options">
          {sSyllables.map((syllable) => {
            const selected = selectedSyllable === syllable
            const stateClass =
              feedback && selected
                ? feedback === 'correct'
                  ? 'syllable-button--correct'
                  : 'syllable-button--incorrect'
                : selected
                  ? 'syllable-button--selected'
                  : ''

            return (
              <button
                className={['syllable-button', stateClass].filter(Boolean).join(' ')}
                type="button"
                key={syllable}
                aria-pressed={selected}
                onClick={() => chooseSyllable(syllable)}
              >
                {syllable}
              </button>
            )
          })}
        </div>

        {feedback === 'correct' && (
          <p className="syllables-feedback syllables-feedback--correct" role="status">
            ¡Correcto! La palabra es {challenge.word}.
          </p>
        )}
        {feedback === 'retry' && (
          <p className="syllables-feedback syllables-feedback--retry" role="status">
            Esa sílaba no completa la palabra. Inténtalo otra vez.
          </p>
        )}

        {feedback !== 'correct' && (
          <Button icon={Check} size="large" fullWidth disabled={!selectedSyllable} onClick={check}>
            Comprobar
          </Button>
        )}
        {feedback === 'retry' && (
          <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={retry}>
            Intentar nuevamente
          </Button>
        )}
        {feedback === 'correct' && !isLastChallenge && (
          <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={next}>
            Siguiente palabra
          </Button>
        )}
        {feedback === 'correct' && isLastChallenge && (
          <Button to="/actividad/s-completar" icon={ArrowRight} iconPosition="right" size="large" fullWidth>
            Formar palabras
          </Button>
        )}
      </Card>
    </main>
  )
}

export default ActividadSSilabasPage
