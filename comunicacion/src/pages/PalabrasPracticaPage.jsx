import WordPracticeTemplate from '../components/practice/WordPracticeTemplate'
import { unit1WordPracticeConfig } from '../data/wordPracticeData'

function PalabrasPracticaPage({ config = unit1WordPracticeConfig }) {
  return <WordPracticeTemplate key={config.practiceId} {...config} />
}

export default PalabrasPracticaPage
