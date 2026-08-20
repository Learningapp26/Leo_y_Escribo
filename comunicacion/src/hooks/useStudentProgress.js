import { useEffect, useState } from 'react'

import { obtenerResumenProgreso } from '../lib/progreso'

function useStudentProgress() {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    let active = true

    obtenerResumenProgreso().then((progress) => {
      if (active) setSummary(progress)
    })

    return () => {
      active = false
    }
  }, [])

  return {
    completedLessons: summary?.completadas ?? new Set(),
    loadingProgress: summary === null,
  }
}

export default useStudentProgress
