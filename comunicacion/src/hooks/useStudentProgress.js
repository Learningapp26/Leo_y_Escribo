import { useEffect, useState } from 'react'

import { obtenerResumenProgreso } from '../lib/progreso'

function useStudentProgress(refreshKey) {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    let active = true

    obtenerResumenProgreso().then((progress) => {
      if (active) setSummary({ progress, refreshKey })
    })

    return () => {
      active = false
    }
  }, [refreshKey])

  return {
    completedLessons: summary?.progress.completadas ?? new Set(),
    loadingProgress: summary === null || summary.refreshKey !== refreshKey,
  }
}

export default useStudentProgress
