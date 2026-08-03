import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {mLetterPresentation, mSyllableAssociation, mSyllableSearch, mSyllableSelection, } from '../data/mData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/selection.css'
import '../styles/syllables.css'

const PHASES = ['letra', 'buscar', 'asociar', 'seleccionar']

function ActividadMSilabasPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('m')

  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

  // Fase 2: buscar sílabas ma, me, mi, mo, mu
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
    const { targetSyllables } = mSyllableSearch

    const isCorrect =
      searchSelected.length === targetSyllables.length &&
      searchSelected.every((syllable) => targetSyllables.includes(syllable))

    setSearchResult(isCorrect ? 'correct' : 'retry')
  }

  const retrySearch = () => {
    setSearchSelected([])
    setSearchResult('')
  }

  // Fase 3: asociar imagen, palabra y sílaba
  const [assocIndex, setAssocIndex] = useState(0)
  const assocItem = mSyllableAssociation[assocIndex]
  const isFirstAssoc = assocIndex === 0
  const isLastAssoc = assocIndex === mSyllableAssociation.length - 1

  // Fase 4: elegir la sílaba con la que empieza la palabra, imagen por imagen
  const [selectIndex, setSelectIndex] = useState(0)
  const [selectedSyllable, setSelectedSyllable] = useState(null)
  const [selectFeedback, setSelectFeedback] = useState('')

  const selectItem = mSyllableSelection[selectIndex]
  const isLastSelect = selectIndex === mSyllableSelection.length - 1

  const pickSyllable = (option) => {
    if (selectFeedback === 'correct') return

    playAudio(option.audio)
    setSelectFeedback('')
    setSelectedSyllable(option.syllable)
  }

  const checkSelect = () => {
    if (!selectedSyllable) return

    const option = selectItem.options.find(
      (item) => item.syllable === selectedSyllable,
    )

    setSelectFeedback(option?.isCorrect ? 'correct' : 'retry')
  }

  const retrySelect = () => {
    setSelectedSyllable(null)
    setSelectFeedback('')
  }

  const nextSelectItem = () => {
    setSelectedSyllable(null)
    setSelectFeedback('')
    setSelectIndex((current) => current + 1)
  }

  return (
    <main className={`page ${themeClass}`} aria-labelledby="m-silabas-title">
      <BackButton label="Volver a la lección" to="/lecciones/m" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 2</span>

        <h1 id="m-silabas-title">Sílabas con M</h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      {phase === 'letra' && (
        <Card className="syllables-card">
          <p className="text-instruction">
            Conoce la letra M. Toca cada combinación para escucharla.
          </p>

          <div className="selection-options">
            <span className="text-letter">M</span>
            <span className="text-letter">m</span>
          </div>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(mLetterPresentation.soundAudio)}
          >
            Escuchar el sonido de la M
          </Button>

          <div className="syllables-options">
            {mLetterPresentation.combinations.map((item) => (
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

      {phase === 'buscar' && (
        <Card className="syllables-card">
          <div className="syllables-instructions">
            <p className="text-instruction">
              Toca las sílabas con la letra M y escucha cómo suenan.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(mSyllableSearch.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="syllables-options">
            {mSyllableSearch.options.map((option) => {
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
              ¡Muy bien! Encontraste las sílabas ma, me, mi, mo y mu.
            </p>
          )}

          {searchResult === 'retry' && (
            <p
              className="syllables-feedback syllables-feedback--retry"
              role="status"
            >
              Revisa otra vez. Algunas sílabas seleccionadas no son con M.
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
              onClick={goToNextPhase}
            >
              Siguiente parte
            </Button>
          )}
        </Card>
      )}

      {phase === 'asociar' && (
        <Card className="selection-card">
          <p className="text-instruction">
            Toca la sílaba resaltada o la palabra completa para escucharlas.
          </p>

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
                onClick={() => setAssocIndex((current) => current + 1)}
              >
                Siguiente
              </Button>
            )}
          </div>
        </Card>
      )}

      {phase === 'seleccionar' && (
        <Card className="selection-card">
          <p className="text-instruction">
            Mira la imagen y toca la sílaba con la que empieza su nombre.
          </p>

          <img
            className="selection-image selection-image--featured"
            src={selectItem.image}
            alt={selectItem.name}
          />

          <span className="text-audio" aria-label="Escuchar palabra">
            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(selectItem.wordAudio)}
            >
              Escuchar palabra
            </Button>
          </span>

          <div className="syllables-options">
            {selectItem.options.map((option) => {
              const isSelected = selectedSyllable === option.syllable

              const stateClass =
                selectFeedback && isSelected
                  ? selectFeedback === 'correct'
                    ? 'syllable-button--correct'
                    : 'syllable-button--incorrect'
                  : isSelected
                    ? 'syllable-button--selected'
                    : ''

              return (
                <button
                  className={['syllable-button', stateClass]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={option.syllable}
                  aria-pressed={isSelected}
                  onClick={() => pickSyllable(option)}
                >
                  {option.syllable}
                </button>
              )
            })}
          </div>

          {selectFeedback === 'correct' && (
            <p
              className="syllables-feedback syllables-feedback--correct"
              role="status"
            >
              ¡Correcto! {selectItem.name} empieza con {selectedSyllable}.
            </p>
          )}

          {selectFeedback === 'retry' && (
            <p
              className="syllables-feedback syllables-feedback--retry"
              role="status"
            >
              Esa no es la sílaba correcta. Escucha de nuevo e inténtalo.
            </p>
          )}

          {selectFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!selectedSyllable}
              onClick={checkSelect}
            >
              Comprobar
            </Button>
          )}

          {selectFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={retrySelect}
            >
              Intentar nuevamente
            </Button>
          )}

          {selectFeedback === 'correct' && !isLastSelect && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextSelectItem}
            >
              Siguiente palabra
            </Button>
          )}

          {selectFeedback === 'correct' && isLastSelect && (
            <Button
              to="/actividad/m-completar"
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

export default ActividadMSilabasPage