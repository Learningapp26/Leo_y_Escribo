import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  plCompletionInstructionAudio,
  plLetterPresentation,
  plSyllableOptions,
  plSyllableSearch,
  plWordBankInstructionAudio,
  plWordCompletion,
  plWordSyllableSelection,
} from '../data/plData'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/syllables.css'
import '../styles/completion.css'

const PHASES = ['letra', 'buscar', 'completar', 'banco']

function ActividadPlSilabasPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('pl')

  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

  // Fase 2: buscar sílabas pla, ple, pli, plo, plu
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
    const { targetSyllables } = plSyllableSearch

    const isCorrect =
      searchSelected.length === targetSyllables.length &&
      searchSelected.every((syllable) => targetSyllables.includes(syllable))

    setSearchResult(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'pl-silabas',
      correcto: isCorrect,
      detalle: { leccionId: 'pl', fase: 'buscar' },
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

  const currentWord = plWordCompletion[wordIndex]
  const isLastWord = wordIndex === plWordCompletion.length - 1

  const checkCompletion = () => {
    if (!selectedSyllable) return

    const isCorrect = selectedSyllable === currentWord.answer

    setCompletionResult(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'pl-silabas',
      correcto: isCorrect,
      detalle: { leccionId: 'pl', fase: 'completar', ejercicioId: currentWord.id },
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

  // Fase 4: banco de palabras — elegir las que contienen la sílaba mostrada
  const [bankIndex, setBankIndex] = useState(0)
  const [bankSelected, setBankSelected] = useState([])
  const [bankFeedback, setBankFeedback] = useState('')

  const bankItem = plWordSyllableSelection[bankIndex]
  const isLastBank = bankIndex === plWordSyllableSelection.length - 1

  const toggleBankWord = (word) => {
    if (bankFeedback === 'correct') return

    setBankFeedback('')

    setBankSelected((current) =>
      current.includes(word)
        ? current.filter((item) => item !== word)
        : [...current, word],
    )
  }

  const checkBankSelection = () => {
    if (bankSelected.length === 0) return

    const isCorrect =
      bankSelected.length === bankItem.answer.length &&
      bankSelected.every((word) => bankItem.answer.includes(word))

    setBankFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'pl-silabas',
      correcto: isCorrect,
      detalle: { leccionId: 'pl', fase: 'banco', ejercicioId: bankItem.id },
    })
  }

  const retryBankSelection = () => {
    setBankSelected([])
    setBankFeedback('')
  }

  const nextBankItem = () => {
    setBankSelected([])
    setBankFeedback('')
    setBankIndex((current) => current + 1)
  }

  return (
    <main className={`page ${themeClass}`} aria-labelledby="pl-silabas-title">
      <BackButton label="Volver a la lección" to="/lecciones/pl" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 2</span>

        <h1 id="pl-silabas-title">Sílabas con PL</h1>
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
              Conoce la combinación PL. Toca cada sílaba para escucharla.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(plLetterPresentation.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            <span className="text-letter">PL</span>
            <span className="text-letter">pl</span>
          </div>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(plLetterPresentation.soundAudio)}
          >
            Escuchar el sonido de PL
          </Button>

          <div className="syllables-options">
            {plLetterPresentation.combinations.map((item) => (
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
              Toca las sílabas con la combinación PL y escucha cómo suenan.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(plSyllableSearch.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="syllables-options">
            {plSyllableSearch.options.map((option) => {
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
              ¡Muy bien! Encontraste las sílabas pla, ple, pli, plo y plu.
            </p>
          )}

          {searchResult === 'retry' && (
            <p
              className="syllables-feedback syllables-feedback--retry"
              role="status"
            >
              Revisa otra vez. Algunas sílabas seleccionadas no son con PL.
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
              onClick={() => playAudio(plCompletionInstructionAudio)}
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

          <p className="completion-word-pattern">{currentWord.pattern}</p>

          <div className="completion-bank">
            {plSyllableOptions.map((syllable) => (
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

      {phase === 'banco' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Escucha la sílaba y toca en el banco todas las palabras que la
              contengan.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(plWordBankInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <span className="text-syllable">{bankItem.syllable}</span>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(bankItem.syllableAudio)}
          >
            Escuchar la sílaba {bankItem.syllable}
          </Button>

          <div className="selection-options">
            {bankItem.options.map((word) => {
              const isSelected = bankSelected.includes(word)

              return (
                <button
                  className={[
                    'selection-button',
                    selectionClass(isSelected, bankFeedback),
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={word}
                  aria-pressed={isSelected}
                  onClick={() => toggleBankWord(word)}
                >
                  <span className="selection-word">{word}</span>
                </button>
              )
            })}
          </div>

          {bankFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Muy bien! Esas palabras llevan la sílaba {bankItem.syllable}.
            </p>
          )}

          {bankFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Revisa otra vez. Alguna palabra no lleva {bankItem.syllable}, o
              falta alguna.
            </p>
          )}

          {bankFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={bankSelected.length === 0}
              onClick={checkBankSelection}
            >
              Comprobar selección
            </Button>
          )}

          {bankFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={retryBankSelection}
            >
              Intentar nuevamente
            </Button>
          )}

          {bankFeedback === 'correct' && !isLastBank && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextBankItem}
            >
              Siguiente sílaba
            </Button>
          )}

          {bankFeedback === 'correct' && isLastBank && (
            <Button
              to="/actividad/pl-final"
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

function selectionClass(isSelected, feedback) {
  if (!isSelected || !feedback) {
    return isSelected ? 'selection-button--selected' : ''
  }

  return feedback === 'correct'
    ? 'selection-button--correct'
    : 'selection-button--incorrect'
}

export default ActividadPlSilabasPage