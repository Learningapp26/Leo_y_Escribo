import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  nLetterPresentation,
  nSyllableSearch,
  nSyllableWords,
} from '../data/nSilabas'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/syllables.css'

const PHASES = ['letra', 'palabras', 'buscar']

function getAudioLabel(label, audio) {
  return audio ? label : `${label} pendiente`
}

function playIfAvailable(audio) {
  if (audio) playAudio(audio)
}

function ActividadNSilabasPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('n')

  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

  const [wordIndex, setWordIndex] = useState(0)
  const wordItem = nSyllableWords[wordIndex]
  const isFirstWord = wordIndex === 0
  const isLastWord = wordIndex === nSyllableWords.length - 1

  const [searchSelected, setSearchSelected] = useState([])
  const [searchResult, setSearchResult] = useState('')

  const toggleSearchSyllable = (syllable, audio) => {
    if (searchResult === 'correct') return

    playIfAvailable(audio)
    setSearchResult('')

    setSearchSelected((current) =>
      current.includes(syllable)
        ? current.filter((item) => item !== syllable)
        : [...current, syllable],
    )
  }

  const checkSearch = () => {
    const { targetSyllables } = nSyllableSearch

    const isCorrect =
      searchSelected.length === targetSyllables.length &&
      searchSelected.every((syllable) => targetSyllables.includes(syllable))

    setSearchResult(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'n-silabas',
      correcto: isCorrect,
      detalle: { leccionId: 'n', fase: 'buscar' },
    })
  }

  const retrySearch = () => {
    setSearchSelected([])
    setSearchResult('')
  }

  return (
    <main className={`page ${themeClass}`} aria-labelledby="n-silabas-title">
      <BackButton label="Volver a la lección" to="/lecciones/n" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 2</span>

        <h1 id="n-silabas-title">Sílabas con N</h1>
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
              Conoce la letra N. Toca cada combinación para escucharla.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              disabled={!nLetterPresentation.instructionAudio}
              onClick={() => playAudio(nLetterPresentation.instructionAudio)}
            >
              {getAudioLabel('Escuchar instrucción', nLetterPresentation.instructionAudio)}
            </Button>
          </div>

          <div className="selection-options">
            <span className="text-letter">N</span>
            <span className="text-letter">n</span>
          </div>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            disabled={!nLetterPresentation.soundAudio}
            onClick={() => playAudio(nLetterPresentation.soundAudio)}
          >
            {getAudioLabel('Escuchar el sonido de la N', nLetterPresentation.soundAudio)}
          </Button>

          <div className="syllables-options">
            {nLetterPresentation.combinations.map((item) => (
              <button
                className="syllable-button"
                type="button"
                key={item.syllable}
                disabled={!item.audio}
                onClick={() => playIfAvailable(item.audio)}
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

      {phase === 'palabras' && (
        <Card className="selection-card">
          <p className="text-instruction">
            Lee la palabra con imagen. Observa la sílaba resaltada y la
            palabra completa.
          </p>

          <img
            className="selection-image selection-image--featured"
            src={wordItem.image}
            alt={wordItem.word}
          />

          <p className="text-word" aria-label={wordItem.word}>
            <span className="text-syllable">{wordItem.highlighted}</span>
            {wordItem.rest}
          </p>

          <div className="selection-options">
            <Button
              variant="audio"
              icon={Volume2}
              disabled={!wordItem.syllableAudio}
              onClick={() => playAudio(wordItem.syllableAudio)}
            >
              {getAudioLabel(wordItem.highlighted, wordItem.syllableAudio)}
            </Button>

            <Button
              variant="audio"
              icon={Volume2}
              disabled={!wordItem.wordAudio}
              onClick={() => playAudio(wordItem.wordAudio)}
            >
              {getAudioLabel(wordItem.word, wordItem.wordAudio)}
            </Button>
          </div>

          <div className="activity-navigation">
            <Button
              variant="secondary"
              icon={ArrowLeft}
              fullWidth
              disabled={isFirstWord}
              onClick={() => setWordIndex((current) => current - 1)}
            >
              Anterior
            </Button>

            {isLastWord ? (
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
                onClick={() => setWordIndex((current) => current + 1)}
              >
                Siguiente
              </Button>
            )}
          </div>
        </Card>
      )}

      {phase === 'buscar' && (
        <Card className="syllables-card">
          <div className="syllables-instructions">
            <p className="text-instruction">
              Toca las sílabas na, ne, ni, no y nu.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              disabled={!nSyllableSearch.instructionAudio}
              onClick={() => playAudio(nSyllableSearch.instructionAudio)}
            >
              {getAudioLabel('Escuchar instrucción', nSyllableSearch.instructionAudio)}
            </Button>
          </div>

          <div className="syllables-options">
            {nSyllableSearch.options.map((option) => {
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
              ¡Muy bien! Encontraste las sílabas na, ne, ni, no y nu.
            </p>
          )}

          {searchResult === 'retry' && (
            <p
              className="syllables-feedback syllables-feedback--retry"
              role="status"
            >
              Revisa otra vez. Algunas sílabas seleccionadas no son con N.
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
              to="/actividad/n-completar"
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

export default ActividadNSilabasPage
