import { useState } from 'react'
import { ArrowRight, Star } from 'lucide-react'
import Button from '../common/Button'
import Alien from './Alien'
import Stamp from './Stamp'
import { getLessonStamp } from '../../data/stampProgress'
import { maybeAwardShinyStamp } from '../../data/stamps'

// Tres estrellas, "¡Misión cumplida!", Leo feliz y el sello ganado. Se usa
// sola dentro de las tarjetas finales o dentro de <RewardScreen>.
export function RewardBurst({ lessonId, title = '¡Misión cumplida!' }) {
  const stamp = lessonId ? getLessonStamp(lessonId) : null
  // El sello brillante se sortea una sola vez al mostrar el premio.
  const [shiny] = useState(() => (lessonId ? maybeAwardShinyStamp() : null))

  return (
    <div className="reward-burst">
      <div className="reward-burst__stars" aria-hidden="true">
        <Star className="reward-burst__star reward-burst__star--left" />
        <Star className="reward-burst__star reward-burst__star--center" />
        <Star className="reward-burst__star reward-burst__star--right" />
      </div>
      <h2 className="reward-burst__title">{title}</h2>
      <div className="reward-burst__row">
        <Alien mood="happy" scale={0.9} />
        {stamp && <figure className="reward-burst__stamp">
          <Stamp id={stamp.id} size={128} pressed />
          <figcaption>¡Ganaste el sello {stamp.name}!</figcaption>
        </figure>}
        {shiny && <figure className="reward-burst__stamp">
          <Stamp id={shiny.id} size={104} pressed />
          <figcaption>¡Y uno brillante: {shiny.name}!</figcaption>
        </figure>}
      </div>
    </div>
  )
}

// Pantalla completa de premio sobre la noche con brillo central.
export function RewardScreen({ lessonId, title, continueTo, continueLabel = 'Seguir el viaje', continueDisabled = false, children }) {
  return (
    <section className="reward-screen" aria-live="polite">
      <span className="reward-screen__planet reward-screen__planet--lilac" aria-hidden="true" />
      <span className="reward-screen__planet reward-screen__planet--sky" aria-hidden="true" />
      <RewardBurst lessonId={lessonId} title={title} />
      {children}
      <div className="reward-screen__actions">
        {continueTo && <Button to={continueTo} size="large" icon={ArrowRight} iconPosition="right" disabled={continueDisabled}>{continueLabel}</Button>}
        <Button to="/sellos" variant="ghost" size="large">Mis sellos</Button>
      </div>
    </section>
  )
}
