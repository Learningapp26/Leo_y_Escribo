import { Heart, Sparkles } from 'lucide-react'
import Alien from '../space/Alien'
import '../../styles/activity-feedback.css'

function ActivityFeedback({ correct, message, children }) {
  const Symbol = correct ? Heart : Sparkles

  return (
    <div className={`activity-feedback activity-feedback--${correct ? 'correct' : 'retry'}`}>
      <div className="activity-feedback__message" role="status">
        <div className="activity-feedback__character" aria-hidden="true">
          <Alien color={correct ? 'var(--lilac)' : 'var(--peach)'} mood="happy" scale={0.85} />
          <Symbol className="activity-feedback__symbol" />
        </div>
        <p className="activity-feedback__text">
          {correct ? '¡Correcto!' : '¡Casi! Prueba otra vez'}
        </p>
        {message && <p className="activity-feedback__detail">{message}</p>}
      </div>
      {children}
    </div>
  )
}

export default ActivityFeedback
