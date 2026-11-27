import { syllableKey } from '../../lib/syllablePractice'
import '../../styles/syllables.css'

function SyllableCards({ items, isTouched, onTouch }) {
  return (
    <div className="syllables-options" role="group" aria-label="Combinaciones para escuchar">
      {items.map((item, index) => (
        <button
          className={`syllable-button${isTouched(index) ? ' syllable-button--selected' : ''}`}
          type="button"
          key={syllableKey(item, index)}
          aria-pressed={isTouched(index)}
          onClick={() => onTouch(index)}
        >
          {item.syllable ?? item.label}
        </button>
      ))}
    </div>
  )
}

export default SyllableCards
