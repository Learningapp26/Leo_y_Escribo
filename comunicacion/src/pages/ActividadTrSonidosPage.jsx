import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  trAnywhereSoundImages,
  trAnywhereSoundInstructionAudio,
  trInitialSoundImages,
  trInitialSoundInstructionAudio,
  trSoundExamples,
  trSoundIntro,
  trTongueTwisters,
} from '../data/trData'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/lesson-tr.css'

const PHASES = ['sonido', 'palabras', 'trabalenguas', 'inicio', 'en-palabra']

const initialAnswers = trInitialSoundImages
  .filter((item) => item.startsWithTr)
  .map((item) => item.id)

const anywhereAnswers = trAnywhereSoundImages
  .filter((item) => item.hasSound)
  .map((item) => item.id)

function getSelectionState(isSelected, feedback) {
  if (!isSelected) return ''
  if (feedback === 'correct') return 'selection-button--correct'
  if (feedback === 'retry') return 'selection-button--incorrect'
  return 'selection-button--selected'
}

function ActividadTrSonidosPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('tr')

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
      actividad: 'tr-sonidos',
      correcto: isCorrect,
      detalle: { leccionId: 'tr', fase: 'inicio' },
    })
  }

  const retryInitial = () => {
    setSelectedInitialIds([])
    setInitialFeedback('')
  }

  const [selectedAnywhereIds, setSelectedAnywhereIds] = useState([])
  const [anywhereFeedback, setAnywhereFeedback] = useState('')

  const toggleAnywhereImage = (item) => {
    if (anywhereFeedback === 'correct') return

    playAudio(item.audio)
    setAnywhereFeedback('')

    setSelectedAnywhereIds((current) =>
      current.includes(item.id)
        ? current.filter((id) => id !== item.id)
        : [...current, item.id],
    )
  }

  const checkAnywhere = () => {
    const isCorrect =
      selectedAnywhereIds.length === anywhereAnswers.length &&
      selectedAnywhereIds.every((id) => anywhereAnswers.includes(id))

    setAnywhereFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'tr-sonidos',
      correcto: isCorrect,
      detalle: { leccionId: 'tr', fase: 'en-palabra' },
    })
  }

  const retryAnywhere = () => {
    setSelectedAnywhereIds([])
    setAnywhereFeedback('')
  }

  return (
    <main
      className={`page selection-page lesson-tr ${themeClass}`}
      aria-labelledby="tr-sonidos-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/tr" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 1</span>

        <h1 id="tr-sonidos-title">Reconozcamos el sonido de TR</h1>
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
              La te y la erre juntas forman el sonido /tr/. Escucha y repite.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(trSoundIntro.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(trSoundIntro.soundAudio)}
          >
            Escuchar el sonido /tr/
          </Button>

          <img
            className="selection-image selection-image--featured"
            src={trSoundIntro.mainWord.image}
            alt={trSoundIntro.mainWord.name}
          />

          <span className="text-word">{trSoundIntro.mainWord.name}</span>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(trSoundIntro.mainWord.audio)}
          >
            Escuchar la palabra tren
          </Button>

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

      {phase === 'palabras' && (
        <Card className="selection-card">
          <p className="text-instruction">
            Escucha y repite: trabajo, trenza y tripa.
          </p>

          <div className="selection-options">
            {trSoundExamples.map((example) => (
              <Card
                key={example.word}
                imageSrc={example.image}
                imageAlt={example.word}
                title={example.word}
                footer={
                  <Button
                    variant="audio"
                    icon={Volume2}
                    fullWidth
                    onClick={() => playAudio(example.audio)}
                  >
                    Escuchar
                  </Button>
                }
              />
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

      {phase === 'trabalenguas' && (
        <Card className="selection-card">
          <p className="text-instruction">
            Ahora escucha estos trabalenguas con tu maestra o maestro.
          </p>

          <div className="selection-options">
            {trTongueTwisters.map((item) => (
              <Card
                key={item.id}
                imageSrc={item.image}
                imageAlt={item.text}
                description={item.text}
                footer={
                  <Button
                    variant="audio"
                    icon={Volume2}
                    fullWidth
                    onClick={() => playAudio(item.audio)}
                  >
                    Escuchar
                  </Button>
                }
              />
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

      {phase === 'inicio' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca los dibujos cuyo nombre inicia con el mismo sonido que la
              palabra tren.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(trInitialSoundInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {trInitialSoundImages.map((item) => {
              const selected = selectedInitialIds.includes(item.id)
              const stateClass = getSelectionState(selected, initialFeedback)

              return (
                <Button
                  key={item.id}
                  variant="secondary"
                  className={['selection-button', stateClass]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={selected}
                  onClick={() => toggleInitialImage(item)}
                >
                  <span className="app-card__content">
                    <img
                      className="selection-image"
                      src={item.image}
                      alt={item.name}
                    />

                    <span className="selection-word">{item.name}</span>
                  </span>
                </Button>
              )
            })}
          </div>

          {initialFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Muy bien! Tractor, trece y tronco comienzan con el sonido
              /tr/.
            </p>
          )}

          {initialFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Revisa otra vez. Escucha cada palabra y busca las que
              comienzan como tren.
            </p>
          )}

          {initialFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={selectedInitialIds.length === 0}
              onClick={checkInitial}
            >
              Comprobar selección
            </Button>
          )}

          {initialFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={retryInitial}
            >
              Intentar nuevamente
            </Button>
          )}

          {initialFeedback === 'correct' && (
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

      {phase === 'en-palabra' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              El sonido /tr/ también puede estar en medio de una palabra.
              Toca los dibujos cuyo nombre tiene el sonido /tr/.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(trAnywhereSoundInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {trAnywhereSoundImages.map((item) => {
              const selected = selectedAnywhereIds.includes(item.id)
              const stateClass = getSelectionState(selected, anywhereFeedback)

              return (
                <Button
                  key={item.id}
                  variant="secondary"
                  className={['selection-button', stateClass]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={selected}
                  onClick={() => toggleAnywhereImage(item)}
                >
                  <span className="app-card__content">
                    <img
                      className="selection-image"
                      src={item.image}
                      alt={item.name}
                    />

                    <span className="selection-word">{item.name}</span>
                  </span>
                </Button>
              )
            })}
          </div>

          {anywhereFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Muy bien! Electricista, estrella y astronauta tienen el
              sonido /tr/.
            </p>
          )}

          {anywhereFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Escucha cada palabra despacio y busca dónde suena /tr/.
            </p>
          )}

          {anywhereFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={selectedAnywhereIds.length === 0}
              onClick={checkAnywhere}
            >
              Comprobar selección
            </Button>
          )}

          {anywhereFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={retryAnywhere}
            >
              Intentar nuevamente
            </Button>
          )}

          {anywhereFeedback === 'correct' && (
            <Button
              to="/actividad/tr-silabas"
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

export default ActividadTrSonidosPage
