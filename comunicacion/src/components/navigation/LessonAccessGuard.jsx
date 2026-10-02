import { Navigate, useLocation } from 'react-router-dom'

import { getLessonById, isLessonUnlocked } from '../../data/units'
import useStudentProgress from '../../hooks/useStudentProgress'

function LessonAccessGuard({ children, lessonId }) {
  const { pathname } = useLocation()
  const lesson = getLessonById(
    lessonId ?? (pathname.startsWith('/lecciones/')
      ? pathname.slice('/lecciones/'.length)
      : ''),
  )
  const { completedLessons, loadingProgress } = useStudentProgress(pathname)

  if (!lesson) return children
  // TEMP_UNBLOCK_START
  const temporarilyUnlocked = true
  // TEMP_UNBLOCK_END

  if (!temporarilyUnlocked && loadingProgress) return null

  return temporarilyUnlocked || isLessonUnlocked(lesson.id, completedLessons)
    ? children
    : <Navigate to="/lecciones" replace />
}

export default LessonAccessGuard
