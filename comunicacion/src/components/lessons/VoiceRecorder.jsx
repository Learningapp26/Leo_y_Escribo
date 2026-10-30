import { useEffect, useRef, useState } from 'react'
import { Mic, Play, RotateCcw, Square } from 'lucide-react'
import Button from '../common/Button'
import { stopAudio } from '../../lib/audioPlayer'

const MAX_SECONDS = 30

// Graba la voz del niño para que se escuche a sí mismo. La grabación solo
// vive en la memoria del navegador: nunca se sube ni se guarda.
function VoiceRecorder({ onRecorded }) {
  const [state, setState] = useState('idle') // idle | recording | ready | denied
  const [seconds, setSeconds] = useState(0)
  const [url, setUrl] = useState(null)
  const recorder = useRef(null)
  const timer = useRef(null)
  const player = useRef(null)
  const supported = typeof window !== 'undefined' && 'MediaRecorder' in window && !!navigator.mediaDevices?.getUserMedia

  // Al salir del ejercicio se apaga el micrófono y se borra la grabación.
  useEffect(() => () => {
    clearInterval(timer.current)
    if (recorder.current?.state === 'recording') recorder.current.stop()
    recorder.current?.stream.getTracks().forEach((track) => track.stop())
  }, [])
  useEffect(() => () => { if (url) URL.revokeObjectURL(url) }, [url])

  const stop = () => {
    clearInterval(timer.current)
    if (recorder.current?.state === 'recording') recorder.current.stop()
  }

  const start = async () => {
    stopAudio()
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const chunks = []
      const media = new MediaRecorder(stream)
      media.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data) }
      media.onstop = () => {
        stream.getTracks().forEach((track) => track.stop())
        setUrl(URL.createObjectURL(new Blob(chunks, { type: media.mimeType })))
        setState('ready')
        onRecorded?.()
      }
      recorder.current = media
      media.start()
      setSeconds(0)
      setState('recording')
      timer.current = setInterval(() => {
        setSeconds((value) => {
          if (value + 1 >= MAX_SECONDS) stop()
          return value + 1
        })
      }, 1000)
    } catch {
      setState('denied')
    }
  }

  if (!supported || state === 'denied') {
    return <p className="voice-recorder__note" role="status">
      {supported ? 'No se pudo usar el micrófono. Pide ayuda para activarlo, o di tus palabras en voz alta.' : 'Este dispositivo no puede grabar. Di tus palabras en voz alta.'}
    </p>
  }

  return (
    <div className="voice-recorder">
      {state === 'recording' ? <>
        <p className="voice-recorder__live" role="status"><span aria-hidden="true" />Grabando… {seconds} s</p>
        <Button variant="retry" size="large" icon={Square} onClick={stop}>Ya terminé</Button>
      </> : state === 'ready' ? <>
        <audio ref={player} src={url} />
        <Button size="large" icon={Play} onClick={() => { stopAudio(); player.current.currentTime = 0; player.current.play() }}>Escuchar mi grabación</Button>
        <Button variant="secondary" icon={RotateCcw} onClick={start}>Grabar otra vez</Button>
      </> : <Button size="large" icon={Mic} onClick={start}>Grabar mis palabras</Button>}
    </div>
  )
}

export default VoiceRecorder
