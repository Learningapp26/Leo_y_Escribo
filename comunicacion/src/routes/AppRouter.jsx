import { BrowserRouter, Routes, Route } from 'react-router-dom'

import WelcomePage from '../pages/WelcomePage'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import LessonsPage from '../pages/LessonsPage'
import LessonDetailPage from '../pages/LessonDetailPage'
import ActivityPage from '../pages/ActivityPage'
import ProgressPage from '../pages/ProgressPage'
import NotFoundPage from '../pages/NotFoundPage'
import LeccionVocalesPage from '../pages/LeccionVocalesPage'
import ActividadVocalesPage from '../pages/ActividadVocalesPage'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="/lecciones" element={<LessonsPage />} />

        <Route
          path="/lecciones/vocales"
          element={<LeccionVocalesPage />}
        />

        <Route
          path="/lecciones/:lessonId"
          element={<LessonDetailPage />}
        />

        <Route
          path="/actividad/vocales-inicial"
          element={<ActividadVocalesPage />}
        />

        <Route
          path="/actividad/:activityId"
          element={<ActivityPage />}
        />

        <Route path="/progreso" element={<ProgressPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter