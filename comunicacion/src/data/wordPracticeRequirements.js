import { unit1WordPracticeConfig, unit3WordPracticeConfig, unit4WordPracticeConfig } from './wordPracticeData.js'
import { unit2WordPracticeConfig } from './unit2WordPracticeData.js'
import { unit5WordPracticeConfig } from './Unit5WordPracticeData.js'

export const WORD_PRACTICE_REQUIREMENTS = Object.fromEntries([
  unit1WordPracticeConfig,
  unit2WordPracticeConfig,
  unit3WordPracticeConfig,
  unit4WordPracticeConfig,
  unit5WordPracticeConfig,
].map((config) => [config.practiceId, config.groups.map((group) => group.lessonId)]))
