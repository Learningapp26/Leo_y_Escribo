import { useEffect, useState } from 'react'

import { obtenerResumenProgreso } from '../lib/progreso'

// Último resumen leído: las pantallas de navegación lo muestran al instante
// mientras vuelven a pedirlo, en vez de parpadear con un estado vacío.
let lastProgress = null

function useStudentProgress(refreshKey) {
  // Con refreshKey (LessonAccessGuard) siempre se espera el dato fresco.
  const [summary, setSummary] = useState(() => (
    lastProgress && refreshKey === undefined ? { progress: lastProgress, refreshKey } : null
  ))

  useEffect(() => {
    let active = true

    obtenerResumenProgreso().then((progress) => {
      lastProgress = progress
      if (active) setSummary({ progress, refreshKey })
    })

    return () => {
      active = false
    }
  }, [refreshKey])

  return {
    completedLessons: summary?.progress.completadas ?? new Set(),
    startedLessons: summary?.progress.iniciadas ?? new Set(),
    stars: summary?.progress.estrellas ?? 0,
    streakDays: summary?.progress.diasSeguidos ?? 0,
    loadingProgress: summary === null || summary.refreshKey !== refreshKey,
  }
}

export default useStudentProgress
