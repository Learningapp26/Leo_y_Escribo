// Marca con negrita (mismo color --ink) la letra o combinación de la lección
// dentro de un texto. Reconoce los dígrafos ll, ch, rr, qu y gu: al buscar
// "l" no marca "ll", al buscar "c" no marca "ch", y "q" marca "qu" completo.
const DIGRAPHS = ['ll', 'ch', 'rr', 'qu', 'gu']

export function highlightLetter(text, letter) {
  if (!letter || typeof text !== 'string') return text
  const target = letter.toLowerCase()
  if (!/^[a-zñ]{1,3}$/.test(target)) return text

  const units = [...new Set([target, ...DIGRAPHS])].sort((a, b) => b.length - a.length)
  const pattern = new RegExp(`(${units.join('|')})`, 'gi')
  return text.split(pattern).map((part, index) => {
    const lower = part.toLowerCase()
    const marked = lower === target || (target === 'q' && lower === 'qu')
    return marked ? <b key={index} className="story-letter">{part}</b> : part
  })
}
