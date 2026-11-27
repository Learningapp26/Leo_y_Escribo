import { useState } from 'react'
import { playAudio, playLessonAudio } from '../lib/audioPlayer'
import { allSyllablesTouched, markSyllableTouched, syllableKey } from '../lib/syllablePractice'

function useSyllablePractice(items, exerciseId = '') {
  const scope = JSON.stringify([exerciseId, items.map(syllableKey)])
  const [progress, setProgress] = useState({ scope, touched: [] })
  const touched = progress.scope === scope ? progress.touched : []

  const onTouch = (index) => {
    const item = items[index]
    if (!item) return

    if (typeof item.audio === 'string') {
      if (item.audio) playAudio(item.audio)
    } else {
      playLessonAudio(item.audio)
    }

    setProgress((current) => ({
      scope,
      touched: markSyllableTouched(current.scope === scope ? current.touched : [], syllableKey(item, index)),
    }))
  }

  return {
    allTouched: allSyllablesTouched(items, touched),
    isTouched: (index) => touched.includes(syllableKey(items[index], index)),
    onTouch,
  }
}

export default useSyllablePractice
