import { Volume2 } from 'lucide-react'
import Button from '../common/Button'
import { playAudio } from '../../lib/audioPlayer'

// Burbuja blanca de diálogo; siempre con su botón de audio redondo al lado.
function SpeechBubble({ text, audioSrc, audio, children }) {
  const src = audioSrc ?? audio?.src
  return (
    <div className="speech">
      <p className="speech__bubble" aria-live="polite">{children ?? text}</p>
      {src && <Button variant="audio" className="btn--audio-round" icon={Volume2}
        aria-label="Escuchar" onClick={() => playAudio(src)} />}
    </div>
  )
}

export default SpeechBubble
