// Display the book's crossing letters as the existing word-choice groups are answered.
export default function BookLessonCrossword({ crossword, choices }) {
  const cells = new Map()
  for (const entry of crossword.entries) {
    const chosen = choices[entry.id] ?? crossword.prefilled?.[entry.id] ?? ''
    for (let i = 0; i < entry.answer.length; i++) {
      const row = entry.row + (entry.direction === 'down' ? i : 0)
      const col = entry.col + (entry.direction === 'across' ? i : 0)
      const key = `${row}-${col}`
      const cell = cells.get(key) ?? { letters: [], labels: [] }
      if (chosen[i]) cell.letters.push(chosen[i])
      if (i === 0) cell.labels.push(`${entry.number}${entry.direction === 'down' ? '↓' : '→'}`)
      cells.set(key, cell)
    }
  }
  return <figure className="book-crossword">
    <figcaption className="text-instruction">Las palabras comparten letras. Elige las respuestas debajo del crucigrama.</figcaption>
    <div className="book-crossword__grid" style={{ '--crossword-columns': crossword.columns }} role="img" aria-label="Crucigrama: las respuestas elegidas se muestran en las casillas y comparten letras en los cruces.">
      {Array.from({ length: crossword.rows * crossword.columns }, (_, i) => {
        const cell = cells.get(`${Math.floor(i / crossword.columns)}-${i % crossword.columns}`)
        const letters = [...new Set(cell?.letters)]
        return <span key={i} className={cell ? 'book-crossword__cell' : ''}>
          {cell && <><small>{cell.labels.join(' ')}</small><strong>{letters.length > 1 ? '?' : letters[0] ?? ''}</strong></>}
        </span>
      })}
    </div>
    <p className="visually-hidden" aria-live="polite">{crossword.entries.map((entry) => `${entry.number} ${entry.direction === 'down' ? 'vertical' : 'horizontal'}: ${choices[entry.id] ?? crossword.prefilled?.[entry.id] ?? 'sin completar'}`).join(' · ')}</p>
  </figure>
}
