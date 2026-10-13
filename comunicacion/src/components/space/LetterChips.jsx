// Letras de una unidad como píldoras --planet-soft. Un grupo ("l · s · n")
// va completo dentro de una sola píldora.
function LetterChips({ items = [], label = 'Letras' }) {
  return (
    <ul className="letter-chips" aria-label={label}>
      {items.map((item) => <li key={item} className="letter-chips__chip">{item}</li>)}
    </ul>
  )
}

export default LetterChips
