import WordPracticeTemplate from '../components/practice/WordPracticeTemplate'
import { wordPracticeGroups } from '../data/wordPracticeData'

function PalabrasPracticaPage() {
  return (
    <WordPracticeTemplate
      groups={wordPracticeGroups}
      practiceId="repaso-unidad-1"
      title="Repaso de la Unidad 1"
      unitLabel="Unidad 1 · Práctica de lectura"
      intro="Elige una letra. Lee las palabras y completa los retos."
    />
  )
}

export default PalabrasPracticaPage
