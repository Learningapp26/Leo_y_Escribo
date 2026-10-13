import { getLessonUnit } from './lessonColors.js'
import { getStampForLesson, readShinyStamps, getStamp } from './stamps.js'
import { units } from './units.js'

// Sello que entrega una lección al completarse.
export function getLessonStamp(lessonId) {
  const unit = units.find((item) => item.lessons.some((lesson) => lesson.id === lessonId))
  return getStampForLesson(lessonId, getLessonUnit(lessonId), unit?.lessons.map((lesson) => lesson.id))
}

// Sellos ganados: uno por cada lección o juego final completado (derivado del
// progreso ya guardado) más los brillantes de este navegador.
export function getEarnedStamps(completedLessonIds = new Set()) {
  const earned = new Map()
  for (const unit of units) {
    for (const lesson of unit.lessons) {
      if (!completedLessonIds.has(lesson.id)) continue
      const stamp = getLessonStamp(lesson.id)
      if (stamp) earned.set(stamp.id, stamp)
    }
  }
  for (const id of readShinyStamps()) {
    const stamp = getStamp(id)
    if (stamp) earned.set(stamp.id, stamp)
  }
  return [...earned.values()]
}
