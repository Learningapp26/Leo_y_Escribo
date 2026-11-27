import WordSyllableReading from '../components/lessons/WordSyllableReading'
import SyllableCards from '../components/lessons/SyllableCards'
import useSyllablePractice from '../hooks/useSyllablePractice'
import ActivityFeedback from '../components/common/ActivityFeedback'
import { LetterSound } from '../components/lessons/SoundIntroduction'
import { formatLetterGroup } from '../data/lessonLabels'
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  RotateCcw,
  Volume2,
} from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import LessonAudioButton from '../components/common/LessonAudioButton'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  lLetterPresentation,
  lSyllableAssociationInstructionAudio,
  lSyllableAssociation,
  lSyllableCountWords,
  lSyllableCountInstructionAudio,
  lSyllableSearch,
} from '../data/lSilabas'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'

const PHASES = ['letra', 'buscar', 'contar', 'asociar']

function ActividadLSilabasPage() {
  const syllablePractice = useSyllablePractice(lLetterPresentation.combinations)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('l')

  // Fase 3: contar sílabas
  const [countIndex, setCountIndex] = useState(0)
  const [countSelected, setCountSelected] = useState(null)
  const [countResult, setCountResult] = useState('')

  const countWord = lSyllableCountWords[countIndex]

  const checkCount = () => {
    if (countSelected === null) return

    const isCorrect = countSelected === countWord.syllables.length

    setCountResult(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'l-silabas',
      correcto: isCorrect,
      detalle: { leccionId: 'l', fase: 'contar', ejercicioId: countWord.id },
    })
  }

  const nextCountWord = () => {
    const isLast = countIndex === lSyllableCountWords.length - 1

    setCountSelected(null)
    setCountResult('')

    if (isLast) {
      setPhaseIndex((current) => current + 1)
      return
    }

    setCountIndex((current) => current + 1)
  }

  // Fase 2: buscar sílabas la, le, li, lo, lu
  const [searchSelected, setSearchSelected] = useState([])
  const [searchResult, setSearchResult] = useState('')

  const toggleSearchSyllable = (syllable, audio) => {
    if (searchResult === 'correct') return

    if (audio) playAudio(audio)
    setSearchResult('')

    setSearchSelected((current) =>
      current.includes(syllable)
        ? current.filter((item) => item !== syllable)
        : [...current, syllable],
    )
  }

  const checkSearch = () => {
    const { targetSyllables } = lSyllableSearch

    const isCorrect =
      searchSelected.length === targetSyllables.length &&
      searchSelected.every((syllable) => targetSyllables.includes(syllable))

    setSearchResult(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'l-silabas',
      correcto: isCorrect,
      detalle: { leccionId: 'l', fase: 'buscar' },
    })
  }

  const retrySearch = () => {
    setSearchSelected([])
    setSearchResult('')
  }

  // Fase 4: asociar imagen, palabra y sílaba
  const [assocIndex, setAssocIndex] = useState(0)
  const assocItem = lSyllableAssociation[assocIndex]
  const isFirstAssoc = assocIndex === 0
  const isLastAssoc = assocIndex === lSyllableAssociation.length - 1

  return (
    <main
      className={`page ${themeClass}`}
      aria-labelledby="l-silabas-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/l" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 2</span>

        <h1 id="l-silabas-title">Sílabas con L</h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      {phase === 'contar' && (
        <Card className="completion-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Escucha la palabra y cuenta sus sílabas.
            </p>
            <LessonAudioButton audio={{ src: lSyllableCountInstructionAudio, available: Boolean(lSyllableCountInstructionAudio) }}>
              Escuchar instrucción
            </LessonAudioButton>
          </div>

          <img
            className="completion-word-image"
            src={countWord.image}
            alt={countWord.name}
          />

          <WordSyllableReading
            word={countWord.name}
            syllables={countWord.syllables}
            wordAudio={countWord.wordAudio}
            syllableAudio={countWord.syllableAudio}
          />

          <div className="completion-bank">
            {countWord.options.map((option) => (
              <button
                className={[
                  'completion-chip',
                  'text-word',
                  countSelected === option ? 'completion-active' : '',
                  countResult === 'correct' && countSelected === option
                    ? 'completion-correct'
                    : '',
                  countResult === 'retry' && countSelected === option
                    ? 'completion-incorrect'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                type="button"
                key={option}
                aria-pressed={countSelected === option}
                onClick={() => {
                  setCountSelected(option)
                  setCountResult('')
                }}
              >
                {option}
              </button>
            ))}
          </div>

          {countResult === 'correct' && (
            <ActivityFeedback correct message={<>
              ¡Correcto! {countWord.name} tiene {countWord.syllables.length}{' '}
              sílabas.
            </>} />
          )}

          {countResult === 'retry' && (
            <ActivityFeedback correct={false} message={<>
              Escucha otra vez y cuenta las sílabas con cuidado.
            </>} />
          )}

          {!countResult && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={countSelected === null}
              onClick={checkCount}
            >
              Comprobar
            </Button>
          )}

          {countResult === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setCountSelected(null)
                setCountResult('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {countResult === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextCountWord}
            >
              {countIndex === lSyllableCountWords.length - 1
                ? 'Siguiente parte'
                : 'Siguiente palabra'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'buscar' && (
        <Card className="syllables-card">
          <div className="syllables-instructions">
            <p className="text-instruction">
              Toca las sílabas con la letra L y escucha cómo suenan.
            </p>

            <LessonAudioButton audio={{ src: lSyllableSearch.instructionAudio, available: Boolean(lSyllableSearch.instructionAudio) }}>
              Escuchar instrucción
            </LessonAudioButton>
          </div>

          <div className="syllables-options">
            {lSyllableSearch.options.map((option) => {
              const selected = searchSelected.includes(option.syllable)

              const stateClass =
                searchResult && selected
                  ? searchResult === 'correct'
                    ? 'syllable-button--correct'
                    : 'syllable-button--incorrect'
                  : selected
                    ? 'syllable-button--selected'
                    : ''

              return (
                <button
                  className={['syllable-button', stateClass]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={option.syllable}
                  aria-pressed={selected}
                  onClick={() =>
                    toggleSearchSyllable(option.syllable, option.audio)
                  }
                >
                  {option.syllable}
                </button>
              )
            })}
          </div>

          {searchResult === 'correct' && (
            <ActivityFeedback correct message={<>
              ¡Muy bien! Encontraste las sílabas la, le, li, lo y lu.
            </>} />
          )}

          {searchResult === 'retry' && (
            <ActivityFeedback correct={false} message={<>
              Revisa otra vez. Algunas sílabas seleccionadas no son con L.
            </>} />
          )}

          {!searchResult && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={searchSelected.length === 0}
              onClick={checkSearch}
            >
              Comprobar selección
            </Button>
          )}

          {searchResult === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={retrySearch}
            >
              Intentar nuevamente
            </Button>
          )}

          {searchResult === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={() => setPhaseIndex((current) => current + 1)}
            >
              Siguiente parte
            </Button>
          )}
        </Card>
      )}

      {phase === 'letra' && (
        <Card className="syllables-card">
          <div className="syllables-instructions">
            <p className="text-instruction">
              Conoce la letra L. Toca cada combinación para escucharla.
            </p>
            <LessonAudioButton audio={{ src: lLetterPresentation.instructionAudio, available: Boolean(lLetterPresentation.instructionAudio) }}>
              Escuchar instrucción
            </LessonAudioButton>
          </div>

          <LetterSound letter="l" audioSrc={lLetterPresentation.soundAudio}>{formatLetterGroup('l')}</LetterSound>

          <SyllableCards items={lLetterPresentation.combinations} {...syllablePractice} />

          <Button
            icon={ArrowRight}
            iconPosition="right"
            size="large"
            fullWidth
            disabled={!syllablePractice.allTouched}
            onClick={() => {
              if (!syllablePractice.allTouched) return
              (() => setPhaseIndex((current) => current + 1))()
            }}
          >
            Continuar
          </Button>
        </Card>
      )}

      {phase === 'asociar' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca la sílaba resaltada o la palabra completa para
              escucharlas.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(lSyllableAssociationInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <img
            className="selection-image selection-image--featured"
            src={assocItem.image}
            alt={assocItem.word}
          />

          <p className="text-word" aria-label={assocItem.word}>
            <span className="text-syllable">{assocItem.highlighted}</span>
            {assocItem.rest}
          </p>

          <div className="selection-options">
            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(assocItem.syllableAudio)}
            >
              Escuchar sílaba
            </Button>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(assocItem.wordAudio)}
            >
              Escuchar palabra completa
            </Button>
          </div>

          <div className="activity-navigation">
            <Button
              variant="secondary"
              icon={ArrowLeft}
              fullWidth
              disabled={isFirstAssoc}
              onClick={() => setAssocIndex((current) => current - 1)}
            >
              Anterior
            </Button>

            {isLastAssoc ? (
              <Button
                to="/actividad/l-completar"
                icon={ArrowRight}
                iconPosition="right"
                fullWidth
              >
                Siguiente actividad
              </Button>
            ) : (
              <Button
                icon={ArrowRight}
                iconPosition="right"
                fullWidth
                onClick={() => setAssocIndex((current) => current + 1)}
              >
                Siguiente
              </Button>
            )}
          </div>
        </Card>
      )}
    </main>
  )
}

export default ActividadLSilabasPage
