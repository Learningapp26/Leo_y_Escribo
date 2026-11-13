import { Volume2 } from 'lucide-react'
import Button from './Button'
import AudioPlaceholderButton from './AudioPlaceholderButton'
import { playLessonAudio } from '../../lib/audioPlayer'

function LessonAudioButton({ audio, children = 'Escuchar', ...props }) {
  if (audio.available === false) return <AudioPlaceholderButton {...props}>{children}</AudioPlaceholderButton>
  return (
    <Button variant="audio" icon={Volume2} data-audio-src={audio.src}
      aria-pressed={false} onClick={() => playLessonAudio(audio)} {...props}>
      {children}
    </Button>
  )
}

export default LessonAudioButton
