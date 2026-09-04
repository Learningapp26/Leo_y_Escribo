import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  brCompletionInstructionAudio,
  brLetterPresentation,
  brSyllableOptions,
  brSyllableSearch,
  brWordCompletion,
  brWordSyllableSelection,
  brWordSyllableSelectionInstructionAudio,
} from '../data/brData'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/syllables.css'
import '../styles/completion.css'

const PHASES = ['letra', 'buscar', 'completar', 'seleccionar']

function ActividadBrSilabasPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('br')

  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

  // Fase 2: buscar sílabas bra, bre, bri, bro, bru
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
    const { targetSyllables } = brSyllableSearch

    const isCorrect =
      searchSelected.length === targetSyllables.length &&
      searchSelected.every((syllable) => targetSyllables.includes(syllable))

    setSearchResult(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'br-silabas',
      correcto: isCorrect,
      detalle: { leccionId: 'br', fase: 'buscar' },
    })
  }

  const retrySearch = () => {
    setSearchSelected([])
    setSearchResult('')
  }

  // Fase 3: completar la palabra con la sílaba que falta
  const [wordIndex, setWordIndex] = useState(0)
  const [selectedSyllable, setSelectedSyllable] = useState('')
  const [completionResult, setCompletionResult] = useState('')

  const currentWord = brWordCompletion[wordIndex]
  const isLastWord = wordIndex === brWordCompletion.length - 1
  const visiblePattern = currentWord.pattern.replace(
    '___',
    selectedSyllable || '___',
  )

  const checkCompletion = () => {
    if (!selectedSyllable) return

    const isCorrect = selectedSyllable === currentWord.answer

    setCompletionResult(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'br-silabas',
      correcto: isCorrect,
      detalle: {
        leccionId: 'br',
        fase: 'completar',
        ejercicioId: currentWord.id,
      },
    })
  }

  const nextWord = () => {
    setSelectedSyllable('')
    setCompletionResult('')

    if (isLastWord) {
      goToNextPhase()
      return
    }

    setWordIndex((current) => current + 1)
  }

  // Fase 4: escuchar la palabra y elegir, entre dos sílabas, la que
  // coincide con la que está en esa palabra
  const [selectIndex, setSelectIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState('')
  const [selectResult, setSelectResult] = useState('')

  const selectItem = brWordSyllableSelection[selectIndex]
  const isLastSelect = selectIndex === brWordSyllableSelection.length - 1

  const pickOption = (option) => {
    if (selectResult === 'correct') return

    setSelectResult('')
    setSelectedOption(option)
  }

  const checkSelectOption = () => {
    if (!selectedOption) return

    const isCorrect = selectedOption === selectItem.answer

    setSelectResult(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'br-silabas',
      correcto: isCorrect,
      detalle: {
        leccionId: 'br',
        fase: 'seleccionar',
        ejercicioId: selectItem.id,
      },
    })
  }

  const retrySelectOption = () => {
    setSelectedOption('')
    setSelectResult('')
  }

  const nextSelectItem = () => {
    setSelectedOption('')
    setSelectResult('')
    setSelectIndex((current) => current + 1)
  }

  return (
    <main className={`page ${themeClass}`} aria-labelledby="br-silabas-title">
      <BackButton label="Volver a la lección" to="/lecciones/br" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 2</span>

        <h1 id="br-silabas-title">Sílabas con BR</h1>
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
              Conoce la combinación BR. Toca cada sílaba para escucharla.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(brLetterPresentation.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            <span className="text-letter">BR</span>
            <span className="text-letter">br</span>
          </div>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(brLetterPresentation.soundAudio)}
          >
            Escuchar el sonido de BR
          </Button>

          <div className="syllables-options">
            {brLetterPresentation.combinations.map((item) => (
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
              Toca las sílabas con la combinación BR y escucha cómo suenan.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(brSyllableSearch.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="syllables-options">
            {brSyllableSearch.options.map((option) => {
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
              ¡Muy bien! Encontraste las sílabas bra, bre, bri, bro y bru.
            </p>
          )}

          {searchResult === 'retry' && (
            <p
              className="syllables-feedback syllables-feedback--retry"
              role="status"
            >
              Revisa otra vez. Algunas sílabas seleccionadas no son con BR.
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

      {phase === 'completar' && (
        <Card className="completion-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Escucha la palabra y elige la sílaba que falta.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(brCompletionInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <img
            className="completion-word-image"
            src={currentWord.image}
            alt={currentWord.word}
          />

          <Button
            variant="audio"
            icon={Volume2}
            onClick={() => playAudio(currentWord.audio)}
          >
            Escuchar palabra
          </Button>

          <p className="completion-word-pattern">{visiblePattern}</p>

          <div className="completion-bank">
            {brSyllableOptions.map((syllable) => (
              <button
                className={[
                  'completion-chip',
                  'text-syllable',
                  selectedSyllable === syllable ? 'completion-active' : '',
                  completionResult === 'correct' &&
                  selectedSyllable === syllable
                    ? 'completion-correct'
                    : '',
                  completionResult === 'retry' &&
                  selectedSyllable === syllable
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
                  setCompletionResult('')
                }}
              >
                {syllable}
              </button>
            ))}
          </div>

          {completionResult === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! La palabra es {currentWord.word}.
            </p>
          )}

          {completionResult === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esa sílaba no completa la palabra. Escucha otra vez.
            </p>
          )}

          {completionResult !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!selectedSyllable}
              onClick={checkCompletion}
            >
              Comprobar
            </Button>
          )}

          {completionResult === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextWord}
            >
              {isLastWord ? 'Siguiente parte' : 'Siguiente palabra'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'seleccionar' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Escucha la palabra y toca la sílaba que está en ella.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() =>
                playAudio(brWordSyllableSelectionInstructionAudio)
              }
            >
              Escuchar instrucción
            </Button>
          </div>

          <span className="text-word">{selectItem.word}</span>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(selectItem.wordAudio)}
          >
            Escuchar palabra
          </Button>

          <div className="syllables-options">
            {selectItem.options.map((option) => {
              const isSelected = selectedOption === option

              const stateClass =
                selectResult && isSelected
                  ? selectResult === 'correct'
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
                  key={option}
                  aria-pressed={isSelected}
                  onClick={() => pickOption(option)}
                >
                  {option}
                </button>
              )
            })}
          </div>

          {selectResult === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! {selectItem.word} lleva la sílaba {selectItem.answer}
              .
            </p>
          )}

          {selectResult === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esa no es la sílaba correcta. Escucha otra vez.
            </p>
          )}

          {selectResult !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!selectedOption}
              onClick={checkSelectOption}
            >
              Comprobar
            </Button>
          )}

          {selectResult === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={retrySelectOption}
            >
              Intentar nuevamente
            </Button>
          )}

          {selectResult === 'correct' && !isLastSelect && (
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

          {selectResult === 'correct' && isLastSelect && (
            <Button
              to="/actividad/br-final"
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
            >
              Ir a la actividad final
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadBrSilabasPage