import { Star } from 'lucide-react'

function StarCounter({ value = 0, label = 'estrellas' }) {
  return (
    <span className="star-counter" aria-label={`${value} ${label}`}>
      <Star className="star-counter__icon" aria-hidden="true" />
      {value}
    </span>
  )
}

export default StarCounter
