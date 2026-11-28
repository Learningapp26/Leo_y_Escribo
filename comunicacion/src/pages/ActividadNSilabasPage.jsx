import BookLessonImage from '../components/lessons/BookLessonImage'
import SyllableCards from '../components/lessons/SyllableCards'
import useSyllablePractice from '../hooks/useSyllablePractice'
import ActivityFeedback from '../components/common/ActivityFeedback'
import { LetterSound } from '../components/lessons/SoundIntroduction'
import { formatLetterGroup } from '../data/lessonLabels'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import LessonAudioButton from '../components/common/LessonAudioButton'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  asAudio,
  nLetterPresentation,
  nStartSyllable,
  nStartSyllableInstructionAudio,
  nSyllableSearch,
  nSyllableWords,
  nSyllableWordsInstructionAudio,
} from '../data/nData'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/syllables.css'
import '../styles/completion.css'

// Página 51 del libro: combinaciones, buscar sílabas con n,
// leer palabras y elegir la sílaba con la que inicia cada dibujo.
const PHASES = ['letra', 'buscar', 'palabras', 'inicio']

function playIfAvailable(audio) {
  if (audio) playAudio(audio)
}

function ActividadNSilabasPage() {
  const syllablePractice = useSyllablePractice(nLetterPresentation.combinations)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]
  const themeClass = getLessonThemeClass('n')

  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

  // Fase 3: leer palabras con la sílaba resaltada
  const [wordIndex, setWordIndex] = useState(0)
  const wordItem = nSyllableWords[wordIndex]
  const isFirstWord = wordIndex === 0
  const isLastWord = wordIndex === nSyllableWords.length - 1

  // Fase 4: sílaba con la que inicia el dibujo
  const [startIndex, setStartIndex] = useState(0)
  const [startSelected, setStartSelected] = useState('')
  const [startFeedback, setStartFeedback] = useState('')
  const startItem = nStartSyllable[startIndex]
  const isLastStart = startIndex === nStartSyllable.length - 1

  const checkStart = () => {
    if (!startSelected || startFeedback) return
    const isCorrect = startSelected === startItem.answer
    setStartFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'n-silabas',
      correcto: isCorrect,
      detalle: { leccionId: 'n', fase: 'inicio', ejercicioId: startItem.id },
    })
  }

  const resetStart = () => {
    setStartSelected('')
    setStartFeedback('')
  }

  const nextStart = () => {
    resetStart()
    if (isLastStart) return
    setStartIndex((current) => current + 1)
  }

  // Fase 2: leer todas las sílabas que llevan n
  const [searchSelected, setSearchSelected] = useState([])
  const [searchResult, setSearchResult] = useState('')

  const toggleSearchSyllable = (syllable, audio) => {
    if (searchResult) return
    playIfAvailable(audio)
    setSearchSelected((current) =>
      current.includes(syllable)
        ? current.filter((item) => item !== syllable)
        : [...current, syllable],
    )
  }

  const checkSearch = () => {
    if (!searchSelected.length || searchResult) return
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

  return (
    <main className={`page selection-page ${themeClass}`} aria-labelledby="n-silabas-title">
      <BackButton label="Volver a la lección" to="/lecciones/n" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 2</span>
        <h1 id="n-silabas-title">Sílabas con N</h1>
      </header>

      <ProgressBar value={phaseIndex + 1} max={PHASES.length} label={`Parte ${phaseIndex + 1} de ${PHASES.length}`} />

      {phase === 'letra' && (
        <Card className="syllables-card">
          <div className="syllables-instructions">
            <p className="text-instruction">
              Fíjate en la N mayúscula y la n minúscula. Toca cada combinación
              para escucharla: na, ne, ni, no y nu.
            </p>
            <LessonAudioButton audio={asAudio(nLetterPresentation.instructionAudio)}>
              Escuchar instrucción
            </LessonAudioButton>
          </div>

          <LetterSound letter="n" audioSrc={nLetterPresentation.soundAudio}>
            {formatLetterGroup('n')}
          </LetterSound>

          <SyllableCards items={nLetterPresentation.combinations} {...syllablePractice} />

          <Button
            icon={ArrowRight}
            iconPosition="right"
            size="large"
            fullWidth
            disabled={!syllablePractice.allTouched}
            onClick={() => {
              if (syllablePractice.allTouched) goToNextPhase()
            }}
          >
            Continuar
          </Button>
        </Card>
      )}

      {phase === 'palabras' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Mira el dibujo y lee la palabra. Fíjate en la sílaba resaltada.
            </p>
            <LessonAudioButton audio={asAudio(nSyllableWordsInstructionAudio)}>
              Escuchar instrucción
            </LessonAudioButton>
          </div>

          <BookLessonImage
            className="selection-image selection-image--featured"
            src={wordItem.image}
            alt={wordItem.word} hideLabel key={wordItem.image} />

          <p className="text-word" aria-label={wordItem.word}>
            <span className="text-syllable">{wordItem.highlighted}</span>
            {wordItem.rest}
          </p>

          <div className="selection-options">
            <LessonAudioButton audio={asAudio(wordItem.syllableAudio)}>
              Escuchar sílaba
            </LessonAudioButton>
            <LessonAudioButton audio={asAudio(wordItem.wordAudio)}>
              Escuchar palabra completa
            </LessonAudioButton>
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
              <Button icon={ArrowRight} iconPosition="right" fullWidth onClick={goToNextPhase}>
                Siguiente parte
              </Button>
            ) : (
              <Button icon={ArrowRight} iconPosition="right" fullWidth onClick={() => setWordIndex((current) => current + 1)}>
                Siguiente
              </Button>
            )}
          </div>
        </Card>
      )}

      {phase === 'inicio' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Mira el dibujo y nombra la palabra despacio. Toca la sílaba con la
              que empieza.
            </p>
            <LessonAudioButton audio={asAudio(nStartSyllableInstructionAudio)}>
              Escuchar instrucción
            </LessonAudioButton>
          </div>

          <BookLessonImage
            className="selection-image selection-image--featured"
            src={startItem.image}
            alt={startItem.word} hideLabel key={startItem.image} />

          <LessonAudioButton audio={asAudio(startItem.audio)}>Escuchar palabra</LessonAudioButton>

          <div className="syllables-options">
            {startItem.options.map((syllable) => {
              const selected = startSelected === syllable
              const stateClass = selected && startFeedback
                ? startFeedback === 'correct' ? 'syllable-button--correct' : 'syllable-button--incorrect'
                : selected ? 'syllable-button--selected' : ''

              return (
                <button
                  className={['syllable-button', stateClass].filter(Boolean).join(' ')}
                  type="button"
                  key={syllable}
                  aria-pressed={selected}
                  disabled={Boolean(startFeedback)}
                  onClick={() => {
                    if (startFeedback) return
                    setStartSelected(syllable)
                  }}
                >
                  {syllable}
                </button>
              )
            })}
          </div>

          {startFeedback === 'correct' && (
            <ActivityFeedback correct message={<>¡Correcto! {startItem.word} empieza con {startItem.answer}.</>} />
          )}
          {startFeedback === 'retry' && (
            <ActivityFeedback correct={false} message={<>Esa no es la sílaba. Nombra el dibujo otra vez.</>} />
          )}

          {!startFeedback && (
            <Button icon={Check} size="large" fullWidth disabled={!startSelected} onClick={checkStart}>
              Comprobar
            </Button>
          )}
          {startFeedback === 'retry' && (
            <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={resetStart}>
              Volver a intentar
            </Button>
          )}
          {startFeedback === 'correct' && (
            <Button
              to={isLastStart ? '/actividad/n-completar' : undefined}
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={isLastStart ? undefined : nextStart}
            >
              {isLastStart ? 'Siguiente actividad' : 'Siguiente dibujo'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'buscar' && (
        <Card className="syllables-card">
          <div className="syllables-instructions">
            <p className="text-instruction">
              Lee las sílabas. Toca todas las que tengan la letra n.
            </p>
            <LessonAudioButton audio={asAudio(nSyllableSearch.instructionAudio)}>
              Escuchar instrucción
            </LessonAudioButton>
          </div>

          <div className="syllables-options">
            {nSyllableSearch.options.map((option) => {
              const selected = searchSelected.includes(option.syllable)
              const stateClass = selected && searchResult
                ? searchResult === 'correct' ? 'syllable-button--correct' : 'syllable-button--incorrect'
                : selected ? 'syllable-button--selected' : ''

              return (
                <button
                  className={['syllable-button', stateClass].filter(Boolean).join(' ')}
                  type="button"
                  key={option.syllable}
                  aria-pressed={selected}
                  disabled={Boolean(searchResult)}
                  onClick={() => toggleSearchSyllable(option.syllable, option.audio)}
                >
                  {option.syllable}
                </button>
              )
            })}
          </div>

          {searchResult === 'correct' && (
            <ActivityFeedback correct message={<>¡Muy bien! Encontraste las sílabas na, ne, ni, no y nu.</>} />
          )}
          {searchResult === 'retry' && (
            <ActivityFeedback correct={false} message={<>Revisa otra vez. Algunas sílabas no llevan n o falta alguna.</>} />
          )}

          {!searchResult && (
            <Button icon={Check} size="large" fullWidth disabled={searchSelected.length === 0} onClick={checkSearch}>
              Comprobar selección
            </Button>
          )}
          {searchResult === 'retry' && (
            <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={() => { setSearchSelected([]); setSearchResult('') }}>
              Volver a intentar
            </Button>
          )}
          {searchResult === 'correct' && (
            <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={goToNextPhase}>
              Siguiente parte
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadNSilabasPage
