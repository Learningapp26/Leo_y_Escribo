import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import {
  dLetterPresentation,
  dSyllableAssociation,
  dSyllableCountWords,
  dSyllableSearch,
} from '../data/dActivities'
import { getLessonThemeClass } from '../data/lessonColors'
import { playAudio } from '../lib/audioPlayer'
import '../styles/selection.css'
import '../styles/syllables.css'
import '../styles/completion.css'

const PHASES = ['contar', 'buscar', 'letra', 'asociar']

function playIfAvailable(audio) {
  if (audio) playAudio(audio)
}

function ActividadDSilabasPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [countIndex, setCountIndex] = useState(0)
  const [countSelected, setCountSelected] = useState(null)
  const [countResult, setCountResult] = useState('')
  const [searchSelected, setSearchSelected] = useState([])
  const [searchResult, setSearchResult] = useState('')
  const [assocIndex, setAssocIndex] = useState(0)
  const [selectedVowels, setSelectedVowels] = useState([])
  const [vowelResult, setVowelResult] = useState('')

  const phase = PHASES[phaseIndex]
  const themeClass = getLessonThemeClass('d')
  const countWord = dSyllableCountWords[countIndex]
  const assocItem = dSyllableAssociation[assocIndex]

  const checkCount = () => {
    if (countSelected === null) return
    setCountResult(countSelected === countWord.syllables.length ? 'correct' : 'retry')
  }

  const nextCountWord = () => {
    setCountSelected(null)
    setCountResult('')
    if (countIndex === dSyllableCountWords.length - 1) {
      setPhaseIndex(1)
      return
    }
    setCountIndex((current) => current + 1)
  }

  const toggleSearch = (option) => {
    if (searchResult === 'correct') return
    playIfAvailable(option.audio)
    setSearchResult('')
    setSearchSelected((current) =>
      current.includes(option.id)
        ? current.filter((id) => id !== option.id)
        : [...current, option.id],
    )
  }

  const checkSearch = () => {
    const targetIds = dSyllableSearch.options.filter((item) => item.isTarget).map((item) => item.id)
    const isCorrect =
      searchSelected.length === targetIds.length &&
      searchSelected.every((id) => targetIds.includes(id))
    setSearchResult(isCorrect ? 'correct' : 'retry')
  }

  const toggleVowel = (vowel) => {
    if (vowelResult === 'correct') return
    setVowelResult('')
    setSelectedVowels((current) =>
      current.includes(vowel)
        ? current.filter((item) => item !== vowel)
        : [...current, vowel],
    )
  }

  const checkVowels = () => {
    const targetVowels = ['a', 'e', 'i', 'o', 'u']
    const isCorrect =
      selectedVowels.length === targetVowels.length &&
      targetVowels.every((vowel) => selectedVowels.includes(vowel))

    setVowelResult(isCorrect ? 'correct' : 'retry')
  }

  return (
    <main className={`page ${themeClass}`} aria-labelledby="d-silabas-title">
      <BackButton label="Volver a la lección" to="/lecciones/d" />
      <header className="text-center">
        <span className="text-ui-label">Actividad 2</span>
        <h1 id="d-silabas-title">Sílabas con D</h1>
      </header>

      <ProgressBar value={phaseIndex + 1} max={PHASES.length} label={`Parte ${phaseIndex + 1} de ${PHASES.length}`} />

      {phase === 'contar' && (
        <Card className="completion-card">
          <p className="text-instruction">Escucha la palabra y cuenta sus sílabas.</p>
          <img className="completion-word-image" src={countWord.image} alt={countWord.name} />
          <span className="text-word">{countWord.name}</span>
          <Button variant="audio" icon={Volume2} onClick={() => playIfAvailable(countWord.audio)}>Escuchar {countWord.name}</Button>
          <div className="completion-bank">
            {countWord.syllables.map((syllable) => <span className="completion-chip text-syllable" key={syllable}>{syllable}</span>)}
          </div>
          <p className="text-instruction">¿Cuántas sílabas tiene?</p>
          <div className="completion-bank">
            {countWord.options.map((option) => (
              <button className={['completion-chip', 'text-word', countSelected === option ? 'completion-active' : '', countResult === 'correct' && countSelected === option ? 'completion-correct' : '', countResult === 'retry' && countSelected === option ? 'completion-incorrect' : ''].filter(Boolean).join(' ')} type="button" key={option} aria-pressed={countSelected === option} onClick={() => { setCountSelected(option); setCountResult('') }}>
                {option}
              </button>
            ))}
          </div>
          {countResult === 'correct' && <p className="selection-feedback selection-feedback--correct" role="status">¡Correcto! {countWord.name} tiene {countWord.syllables.length} sílabas.</p>}
          {countResult === 'retry' && <p className="selection-feedback selection-feedback--retry" role="status">Escucha otra vez y cuenta con cuidado.</p>}
          {countResult !== 'correct' && <Button icon={Check} size="large" fullWidth disabled={countSelected === null} onClick={checkCount}>Comprobar</Button>}
          {countResult === 'correct' && <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={nextCountWord}>{countIndex === dSyllableCountWords.length - 1 ? 'Siguiente parte' : 'Siguiente palabra'}</Button>}
        </Card>
      )}

      {phase === 'buscar' && (
        <Card className="syllables-card">
          <p className="text-instruction">Toca las sílabas da, de, di, do y du.</p>
          <div className="syllables-options">
            {dSyllableSearch.options.map((option) => {
              const selected = searchSelected.includes(option.id)
              const stateClass = searchResult && selected ? (searchResult === 'correct' ? 'syllable-button--correct' : 'syllable-button--incorrect') : selected ? 'syllable-button--selected' : ''
              return <button className={['syllable-button', stateClass].filter(Boolean).join(' ')} type="button" key={option.id} aria-pressed={selected} onClick={() => toggleSearch(option)}>{option.syllable}</button>
            })}
          </div>
          {searchResult === 'correct' && <p className="syllables-feedback syllables-feedback--correct" role="status">¡Muy bien! Encontraste todas las sílabas con D.</p>}
          {searchResult === 'retry' && <p className="syllables-feedback syllables-feedback--retry" role="status">Revisa otra vez: debes tocar da, de, di, do y du.</p>}
          {searchResult !== 'correct' && <Button icon={Check} size="large" fullWidth disabled={searchSelected.length === 0} onClick={checkSearch}>Comprobar selección</Button>}
          {searchResult === 'retry' && <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={() => { setSearchSelected([]); setSearchResult('') }}>Intentar nuevamente</Button>}
          {searchResult === 'correct' && <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={() => setPhaseIndex(2)}>Siguiente parte</Button>}
        </Card>
      )}

      {phase === 'letra' && (
        <Card className="syllables-card">
          <p className="text-instruction">Toca las vocales para unirlas con la D y formar sílabas.</p>
          <div className="selection-options">
            <span className="text-letter">D</span>
            <span className="text-letter">d</span>
          </div>
          <Button variant="audio" size="large" icon={Volume2} onClick={() => playIfAvailable(dLetterPresentation.soundAudio)}>Escuchar el sonido de la D</Button>

          <div className="syllables-options">
            {dLetterPresentation.combinations.map((item) => {
              const vowel = item.syllable.slice(1)
              const selected = selectedVowels.includes(vowel)
              const stateClass =
                vowelResult && selected
                  ? vowelResult === 'correct'
                    ? 'syllable-button--correct'
                    : 'syllable-button--incorrect'
                  : selected
                    ? 'syllable-button--selected'
                    : ''

              return (
              <button className={['syllable-button', stateClass].filter(Boolean).join(' ')} type="button" key={item.syllable} aria-pressed={selected} onClick={() => { toggleVowel(vowel); playIfAvailable(item.audio) }}>
                {vowel}
              </button>
              )
            })}
          </div>

          <div className="completion-bank" aria-live="polite">
            {selectedVowels.length === 0 ? (
              <span className="completion-chip text-syllable">D + vocal</span>
            ) : (
              selectedVowels.map((vowel) => (
                <span className="completion-chip text-syllable" key={vowel}>
                  D + {vowel} = d{vowel}
                </span>
              ))
            )}
          </div>

          {vowelResult === 'correct' && <p className="syllables-feedback syllables-feedback--correct" role="status">¡Muy bien! Formaste da, de, di, do y du.</p>}
          {vowelResult === 'retry' && <p className="syllables-feedback syllables-feedback--retry" role="status">Toca todas las vocales: a, e, i, o, u.</p>}
          {vowelResult !== 'correct' && <Button icon={Check} size="large" fullWidth disabled={selectedVowels.length === 0} onClick={checkVowels}>Comprobar</Button>}
          {vowelResult === 'retry' && <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={() => { setSelectedVowels([]); setVowelResult('') }}>Intentar nuevamente</Button>}
          {vowelResult === 'correct' && <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={() => setPhaseIndex(3)}>Continuar</Button>}
        </Card>
      )}

      {phase === 'asociar' && (
        <Card className="selection-card">
          <p className="text-instruction">Observa la imagen, lee la palabra y escucha la sílaba con D.</p>
          <img className="selection-image selection-image--featured" src={assocItem.image} alt={assocItem.word} />
          <p className="text-word" aria-label={assocItem.word}><span className="text-syllable">{assocItem.highlighted}</span>{assocItem.rest}</p>
          <div className="selection-options">
            <Button variant="audio" icon={Volume2} onClick={() => playIfAvailable(assocItem.syllableAudio)}>Escuchar {assocItem.highlighted}</Button>
            <Button variant="audio" icon={Volume2} onClick={() => playIfAvailable(assocItem.wordAudio)}>Escuchar {assocItem.word}</Button>
          </div>
          <div className="activity-navigation">
            <Button variant="secondary" icon={ArrowLeft} fullWidth disabled={assocIndex === 0} onClick={() => setAssocIndex((current) => current - 1)}>Anterior</Button>
            {assocIndex === dSyllableAssociation.length - 1 ? (
              <Button to="/actividad/d-completar" icon={ArrowRight} iconPosition="right" fullWidth>Siguiente actividad</Button>
            ) : (
              <Button icon={ArrowRight} iconPosition="right" fullWidth onClick={() => setAssocIndex((current) => current + 1)}>Siguiente</Button>
            )}
          </div>
        </Card>
      )}
    </main>
  )
}

export default ActividadDSilabasPage
