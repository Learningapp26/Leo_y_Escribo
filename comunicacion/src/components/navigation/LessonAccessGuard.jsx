import { Navigate, useLocation } from 'react-router-dom'

import { getLessonById, isLessonUnlocked } from '../../data/units'
import useStudentProgress from '../../hooks/useStudentProgress'

function LessonAccessGuard({ children }) {
  const { pathname } = useLocation()
  const lesson = getLessonById(
    pathname.startsWith('/lecciones/')
      ? pathname.slice('/lecciones/'.length)
      : '',
  )
  const { completedLessons, loadingProgress } = useStudentProgress()

  if (!lesson) return children
  if (loadingProgress) return null

  return isLessonUnlocked(lesson.id, completedLessons)
    ? children
    : <Navigate to="/lecciones" replace />
}

export default LessonAccessGuard
