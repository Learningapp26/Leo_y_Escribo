import { Volume2 } from 'lucide-react'
import Button from './Button'
import AudioPlaceholderButton from './AudioPlaceholderButton'
import { playAudio } from '../../lib/audioPlayer'

function LessonAudioButton({ audio, children = 'Escuchar', ...props }) {
  if (audio.available === false) return <AudioPlaceholderButton {...props}>{children}</AudioPlaceholderButton>
  return (
    <Button variant="audio" icon={Volume2} data-audio-src={audio.src}
      aria-pressed={false} onClick={() => playAudio(audio.src)} {...props}>
      {children}
    </Button>
  )
}

export default LessonAudioButton
