import { Volume2 } from 'lucide-react'
import Button from '../common/Button'
import { playAudio } from '../../lib/audioPlayer'
import '../../styles/syllable-reading.css'

const audioSource = (audio) => typeof audio === 'string'
  ? audio
  : audio?.available === false ? null : audio?.src

export function ReadOnlySyllables({ syllables, highlightIndex }) {
  return (
    <p className="syllable-reading__text" aria-live="polite">
      {syllables.map((syllable, index) => (
        <span key={index}>
          {index > 0 && ' - '}
          {index === highlightIndex
            ? <strong className="syllable-reading__highlight">{syllable}</strong>
            : syllable}
        </span>
      ))}
    </p>
  )
}

function WordSyllableReading({ word, syllables, wordAudio, syllableAudio }) {
  const completeSrc = audioSource(wordAudio)
  const syllableSrc = audioSource(syllableAudio)

  return (
    <div className="syllable-reading">
      <div className="syllable-reading__row">
        <Button
          variant="audio"
          icon={Volume2}
          className="syllable-reading__audio"
          aria-label={`Escuchar palabra completa: ${word}`}
          disabled={!completeSrc}
          title={!completeSrc ? 'Audio próximamente disponible' : undefined}
          data-audio-src={completeSrc}
          onClick={() => playAudio(completeSrc)}
        >
          Palabra completa
        </Button>
        <p className="syllable-reading__text">{word}</p>
      </div>
      <div className="syllable-reading__row">
        <Button
          variant="audio"
          icon={Volume2}
          className="syllable-reading__audio"
          aria-label={`Escuchar por sílabas: ${word}`}
          disabled={!syllableSrc}
          title={!syllableSrc ? 'Audio próximamente disponible' : undefined}
          data-audio-src={syllableSrc}
          onClick={() => playAudio(syllableSrc)}
        >
          Por sílabas
        </Button>
        <ReadOnlySyllables syllables={syllables} />
      </div>
    </div>
  )
}

export default WordSyllableReading
