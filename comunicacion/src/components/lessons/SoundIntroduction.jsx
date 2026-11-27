import { Volume2 } from 'lucide-react'
import Button from '../common/Button'
import { playAudio } from '../../lib/audioPlayer'
import '../../styles/sound-intro.css'

export function LetterSound({ letter, audioSrc, audio, children }) {
  const src = audio?.available === false ? null : audioSrc ?? audio?.src

  return (
    <div className={`sound-intro__letter${letter.length > 2 ? ' sound-intro__letter--group' : ''}`}>
      <Button
        variant="audio"
        className="btn--audio-round sound-intro__audio"
        icon={Volume2}
        aria-label={`Escuchar el sonido de ${letter}`}
        disabled={!src}
        title={!src ? 'Audio próximamente disponible' : undefined}
        data-audio-src={src}
        onClick={() => playAudio(src)}
      />
      <span className="text-letter">
        {children ?? (letter.length === 1 ? `${letter.toLocaleUpperCase('es')} ${letter.toLocaleLowerCase('es')}` : letter)}
      </span>
    </div>
  )
}

export function WordSound({ word, audioSrc, audio }) {
  const src = audio?.available === false ? null : audioSrc ?? audio?.src

  return (
    <Button
      variant="audio"
      size="large"
      className="sound-intro__word"
      icon={Volume2}
      aria-label={`Escuchar ${word}`}
      disabled={!src}
      title={!src ? 'Audio próximamente disponible' : undefined}
      data-audio-src={src}
      onClick={() => playAudio(src)}
    >
      {word}
    </Button>
  )
}

function SoundIntroduction({ sounds, word }) {
  return (
    <>
      <div className="sound-intro__sounds">
        {sounds.map((sound) => <LetterSound key={sound.letter} {...sound} />)}
      </div>
      {word?.image && (
        <img
          className="selection-image selection-image--featured"
          src={word.image}
          alt={word.imageAlt ?? word.name}
        />
      )}
      {word && <WordSound word={word.name} audioSrc={word.audio} />}
    </>
  )
}

export default SoundIntroduction
