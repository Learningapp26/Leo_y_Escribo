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
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  lLetterPresentation,
  lSyllableAssociationInstructionAudio,
  lSyllableAssociation,
  lSyllableCountWords,
  lSyllableSearch,
} from '../data/lSilabas'
import { playAudio } from '../lib/audioPlayer'

const PHASES = ['contar', 'buscar', 'letra', 'asociar']

function ActividadLSilabasPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('l')

  // Fase 1: contar sílabas
  const [countIndex, setCountIndex] = useState(0)
  const [countSelected, setCountSelected] = useState(null)
  const [countResult, setCountResult] = useState('')

  const countWord = lSyllableCountWords[countIndex]

  const checkCount = () => {
    if (countSelected === null) return

    const isCorrect = countSelected === countWord.syllables.length

    setCountResult(isCorrect ? 'correct' : 'retry')
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

    playAudio(audio)
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
          <p className="text-instruction">
            Escucha la palabra y cuenta sus sílabas.
          </p>

          <img
            className="completion-word-image"
            src={countWord.image}
            alt={countWord.name}
          />

          <span className="text-word">{countWord.name}</span>

          <div className="completion-content">
            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(countWord.wordAudio)}
            >
              Escuchar palabra completa
            </Button>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(countWord.syllableAudio)}
            >
              Escuchar por sílabas
            </Button>

            <div className="completion-bank">
              {countWord.syllables.map((syllable) => (
                <span className="completion-chip text-syllable" key={syllable}>
                  {syllable}
                </span>
              ))}
            </div>
          </div>

          <p className="text-instruction">¿Cuántas sílabas tiene?</p>

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
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! {countWord.name} tiene {countWord.syllables.length}{' '}
              sílabas.
            </p>
          )}

          {countResult === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Escucha otra vez y cuenta las sílabas con cuidado.
            </p>
          )}

          {countResult !== 'correct' && (
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

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(lSyllableSearch.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
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
            <p
              className="syllables-feedback syllables-feedback--correct"
              role="status"
            >
              ¡Muy bien! Encontraste las sílabas la, le, li, lo y lu.
            </p>
          )}

          {searchResult === 'retry' && (
            <p
              className="syllables-feedback syllables-feedback--retry"
              role="status"
            >
              Revisa otra vez. Algunas sílabas seleccionadas no son con L.
            </p>
          )}

          {searchResult !== 'correct' && (
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
          <p className="text-instruction">
            Conoce la letra L. Toca cada combinación para escucharla.
          </p>

          <div className="selection-options">
            <span className="text-letter">L</span>
            <span className="text-letter">l</span>
          </div>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(lLetterPresentation.soundAudio)}
          >
            Escuchar el sonido de la L
          </Button>

          <div className="syllables-options">
            {lLetterPresentation.combinations.map((item) => (
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
            onClick={() => setPhaseIndex((current) => current + 1)}
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
