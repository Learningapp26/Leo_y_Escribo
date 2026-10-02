import { Volume2 } from 'lucide-react'
import Button from './Button'
import { playAudio } from '../../lib/audioPlayer'

function LessonAudioButton({ audio, children = 'Escuchar', ...props }) {
  return (
    <Button variant="audio" icon={Volume2} data-audio-src={audio.src}
      aria-pressed={false} onClick={() => playAudio(audio.src)} {...props}>
      {children}
    </Button>
  )
}

export default LessonAudioButton
