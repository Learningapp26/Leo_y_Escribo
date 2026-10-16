import { getLessonTargets } from '../../data/lessonLabels'
import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react'
import AudioPlaceholderButton from '../common/AudioPlaceholderButton'
import Button from '../common/Button'
import { getLessonUnit } from '../../data/lessonColors'
import { getPlanet } from '../../data/planets'
import { getLessonById } from '../../data/units'
import { playAudio } from '../../lib/audioPlayer'
import { highlightLetter } from '../../lib/highlightLetter'
import '../../styles/story.css'

const PER_PAGE = 3

// Párrafo que suena: reparte la duración del audio según el largo de cada
// párrafo (no hay marcas de tiempo por párrafo en los audios).
function paragraphAt(progress, paragraphs) {
  const lengths = paragraphs.map((text) => text.length)
  const total = lengths.reduce((sum, length) => sum + length, 0)
  let reached = 0
  for (const [index, length] of lengths.entries()) {
    reached += length / total
    if (progress < reached) return index
  }
  return paragraphs.length - 1
}

// El cuento en UN recuadro: imagen + audio a la izquierda, texto paginado
// a la derecha con la letra de la lección en negrita y karaoke por párrafo.
function StoryCard({ lessonId, title, paragraphs = [], image, imageAlt = '', audio, children }) {
  const [page, setPage] = useState(0)
  const [speaking, setSpeaking] = useState(null)
  const [imageMissing, setImageMissing] = useState(!image)
  const audioRef = useRef(null)
  const lesson = getLessonById(lessonId)
  const planet = getPlanet(getLessonUnit(lessonId))
  const glyph = getLessonTargets(lessonId)?.join(' ') ?? null
  const pages = Math.max(1, Math.ceil(paragraphs.length / PER_PAGE))
  const visible = paragraphs.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  useEffect(() => {
    const onState = ({ detail }) => {
      if (!detail?.playing || detail.src !== audio) setSpeaking(null)
    }
    window.addEventListener('audio:state', onState)
    return () => window.removeEventListener('audio:state', onState)
  }, [audio])

  const listen = () => {
    const element = playAudio(audio)
    if (!element || element === audioRef.current) return
    audioRef.current = element
    element.addEventListener('timeupdate', () => {
      if (!element.duration || element.paused) return
      const index = paragraphAt(element.currentTime / element.duration, paragraphs)
      setSpeaking(index)
      setPage(Math.floor(index / PER_PAGE))
    })
  }

  return (
    <article className={`story-card${imageMissing ? ' story-card--text-only' : ''}`} aria-labelledby="story-title">
      <div className="story-card__media">
        {!imageMissing && <img className="story-card__image" src={image} alt={imageAlt} onError={() => setImageMissing(true)} />}
        {audio ? <Button variant="audio" icon={Volume2} data-audio-src={audio} onClick={listen} fullWidth>Escuchar cuento</Button>
          : <AudioPlaceholderButton fullWidth>Escuchar cuento</AudioPlaceholderButton>}
      </div>

      <div className="story-card__text">
        <header className="story-card__header">
          <div>
            {planet && <span className="story-card__label">Planeta {planet.name} · Cuento</span>}
            <h2 id="story-title" className="story-card__title">{title}</h2>
          </div>
          {lesson?.bookPage && <span className="story-card__page">Libro pág. {lesson.bookPage}</span>}
        </header>

        <div className="story-card__story">
          {visible.map((paragraph, offset) => {
            const index = page * PER_PAGE + offset
            return <p key={paragraph} className={`story-card__paragraph${speaking === index ? ' story-card__paragraph--speaking' : ''}`}>
              {highlightLetter(paragraph, glyph)}
            </p>
          })}
        </div>

        {children}

        {pages > 1 && <nav className="story-card__pager" aria-label="Páginas del cuento">
          <Button variant="secondary" icon={ChevronLeft} aria-label="Página anterior" disabled={page === 0}
            className="story-card__prev" onClick={() => setPage(page - 1)} />
          <span className="story-card__dots" aria-label={`Página ${page + 1} de ${pages}`}>
            {Array.from({ length: pages }, (_, index) => <span key={index} className={index === page ? 'is-current' : ''} />)}
          </span>
          {page < pages - 1 && <Button variant="dark" icon={ChevronRight} iconPosition="right" onClick={() => setPage(page + 1)}>Seguir</Button>}
        </nav>}
      </div>
    </article>
  )
}

export default StoryCard
