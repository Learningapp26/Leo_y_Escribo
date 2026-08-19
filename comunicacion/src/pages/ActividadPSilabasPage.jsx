import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  pFindSyllableInstructionAudio,
  pFindSyllableWords,
  pLetterPresentation,
  pSyllableOptions,
  pTraceInstructionAudio,
  pTraceWords,
} from '../data/pData'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/syllables.css'
import '../styles/completion.css'

const PHASES = ['letra', 'trazar', 'encontrar']

function ActividadPSilabasPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('p')

  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

  // Fase 2: repasar palabras con po, pa, pi, pu
  const [traceIndex, setTraceIndex] = useState(0)
  const traceItem = pTraceWords[traceIndex]
  const isFirstTrace = traceIndex === 0
  const isLastTrace = traceIndex === pTraceWords.length - 1

  // Fase 3: encontrar la sílaba con P dentro de la palabra
  const [findIndex, setFindIndex] = useState(0)
  const [selectedSyllable, setSelectedSyllable] = useState('')
  const [findResult, setFindResult] = useState('')

  const findItem = pFindSyllableWords[findIndex]
  const isLastFindItem = findIndex === pFindSyllableWords.length - 1

  const checkFind = () => {
    if (!selectedSyllable) return

    const isCorrect = selectedSyllable === findItem.answer

    setFindResult(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'p-silabas',
      correcto: isCorrect,
      detalle: { leccionId: 'p', fase: 'encontrar', ejercicioId: findItem.id },
    })
  }

  const nextFindItem = () => {
    setSelectedSyllable('')
    setFindResult('')
    setFindIndex((current) => current + 1)
  }

  return (
    <main className={`page ${themeClass}`} aria-labelledby="p-silabas-title">
      <BackButton label="Volver a la lección" to="/lecciones/p" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 2</span>

        <h1 id="p-silabas-title">Sílabas con P</h1>
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
              Conoce la letra P. Toca cada combinación para escucharla.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(pLetterPresentation.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            <span className="text-letter">P</span>
            <span className="text-letter">p</span>
          </div>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(pLetterPresentation.soundAudio)}
          >
            Escuchar el sonido de la P
          </Button>

          <div className="syllables-options">
            {pLetterPresentation.combinations.map((item) => (
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

      {phase === 'trazar' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca la sílaba resaltada o la palabra completa para
              escucharlas.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(pTraceInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <img
            className="selection-image selection-image--featured"
            src={traceItem.image}
            alt={traceItem.word}
          />

          <p className="text-word" aria-label={traceItem.word}>
            <span className="text-syllable">{traceItem.highlighted}</span>
            {traceItem.rest}
          </p>

          {traceItem.isProperNoun && (
            <p className="text-instruction">
              Recuerda: los nombres propios se escriben con mayúscula.
            </p>
          )}

          <Button
            variant="audio"
            icon={Volume2}
            onClick={() => playAudio(traceItem.audio)}
          >
            Escuchar palabra
          </Button>

          <div className="activity-navigation">
            <Button
              variant="secondary"
              icon={ArrowLeft}
              fullWidth
              disabled={isFirstTrace}
              onClick={() => setTraceIndex((current) => current - 1)}
            >
              Anterior
            </Button>

            {isLastTrace ? (
              <Button
                icon={ArrowRight}
                iconPosition="right"
                fullWidth
                onClick={goToNextPhase}
              >
                Siguiente parte
              </Button>
            ) : (
              <Button
                icon={ArrowRight}
                iconPosition="right"
                fullWidth
                onClick={() => setTraceIndex((current) => current + 1)}
              >
                Siguiente
              </Button>
            )}
          </div>
        </Card>
      )}

      {phase === 'encontrar' && (
        <Card className="completion-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Escucha la palabra y toca la sílaba con P que encuentres.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(pFindSyllableInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <span className="text-word">{findItem.word}</span>

          <Button
            variant="audio"
            icon={Volume2}
            onClick={() => playAudio(findItem.audio)}
          >
            Escuchar palabra
          </Button>

          <div className="completion-bank">
            {pSyllableOptions.map((syllable) => (
              <button
                className={[
                  'completion-chip',
                  'text-syllable',
                  selectedSyllable === syllable ? 'completion-active' : '',
                  findResult === 'correct' && selectedSyllable === syllable
                    ? 'completion-correct'
                    : '',
                  findResult === 'retry' && selectedSyllable === syllable
                    ? 'completion-incorrect'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                type="button"
                key={syllable}
                aria-pressed={selectedSyllable === syllable}
                onClick={() => {
                  setSelectedSyllable(syllable)
                  setFindResult('')
                }}
              >
                {syllable}
              </button>
            ))}
          </div>

          {findResult === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! "{findItem.word}" tiene la sílaba "{findItem.answer}".
            </p>
          )}

          {findResult === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esa no es la sílaba correcta. Escucha otra vez.
            </p>
          )}

          {findResult !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!selectedSyllable}
              onClick={checkFind}
            >
              Comprobar
            </Button>
          )}

          {findResult === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setSelectedSyllable('')
                setFindResult('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {findResult === 'correct' && !isLastFindItem && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextFindItem}
            >
              Siguiente palabra
            </Button>
          )}

          {findResult === 'correct' && isLastFindItem && (
            <Button
              to="/actividad/p-completar"
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
            >
              Siguiente actividad
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadPSilabasPage
