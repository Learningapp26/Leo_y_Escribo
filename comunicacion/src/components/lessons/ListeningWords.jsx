import { useState } from 'react'
import { Volume2 } from 'lucide-react'
import LessonAudioButton from '../common/LessonAudioButton'
import BookLessonImage from './BookLessonImage'
import { playAudio } from '../../lib/audioPlayer'
import '../../styles/listening-words.css'

function ListeningWords({ items, letter, instruction, instructionAudio, showInstruction = true }) {
  const [selected, setSelected] = useState(null)
  const audio = typeof instructionAudio === 'string'
    ? { src: instructionAudio }
    : instructionAudio ?? { available: false }

  return (
    <section className="listening-words" aria-label="Palabras para escuchar">
      {showInstruction && (
        <div className="selection-instructions">
          <p className="text-instruction">
            {instruction ?? `Ahora escucha estas palabras con la letra ${letter}.`}
          </p>
          <LessonAudioButton audio={audio}>Escuchar instrucción</LessonAudioButton>
        </div>
      )}
      <div className="listening-words__list">
        {items.map((item, index) => {
          const word = item.name ?? item.word ?? item.label
          const key = item.id ?? `${word}-${index}`
          const src = typeof item.audio === 'string'
            ? item.audio
            : item.audio?.available === false ? null : item.audio?.src

          return (
            <button
              className={`listening-words__card${selected === key ? ' listening-words__card--selected' : ''}`}
              key={key}
              type="button"
              aria-label={`Escuchar ${word}`}
              aria-pressed={selected === key}
              disabled={!src}
              title={!src ? 'Audio próximamente disponible' : undefined}
              onClick={() => {
                setSelected(key)
                playAudio(src)
              }}
            >
              {item.image && <BookLessonImage key={item.image} src={item.image} alt={item.imageAlt ?? word} />}
              <span className="listening-words__label">
                <Volume2 className="listening-words__icon" aria-hidden="true" />
                <span>{word}</span>
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default ListeningWords
