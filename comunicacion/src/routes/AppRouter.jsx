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
import LeccionYPage from '../pages/LeccionYPage'
import ActividadYParejasPage from '../pages/ActividadYParejasPage'
import ActividadYUnirImagenesPage from '../pages/ActividadYUnirImagenesPage'
import ActividadYFinalPage from '../pages/ActividadYFinalPage'
import LeccionLPage from '../pages/LeccionLPage'
import ActividadLImagenesPage from '../pages/ActividadLImagenesPage'
import ActividadLSilabasPage from '../pages/ActividadLSilabasPage'
import ActividadLCompletarPage from '../pages/ActividadLCompletarPage'
import ActividadLFinalPage from '../pages/ActividadLFinalPage'
import LeccionMPage from '../pages/LeccionMPage'
import ActividadMSonidosPage from '../pages/ActividadMSonidosPage'
import ActividadMSilabasPage from '../pages/ActividadMSilabasPage'
import ActividadMCompletarPage from '../pages/ActividadMCompletarPage'
import ActividadMFinalPage from '../pages/ActividadMFinalPage'
import LeccionTPage from '../pages/LeccionTPage'
import ActividadTSonidosPage from '../pages/ActividadTSonidosPage'

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
          path="/lecciones/m"
          element={<LeccionMPage />}
        />

        <Route
          path="/actividad/m-sonidos"
          element={<ActividadMSonidosPage />}
        />

        <Route
          path="/actividad/m-silabas"
          element={<ActividadMSilabasPage />}
        />

        <Route
          path="/actividad/m-completar"
          element={<ActividadMCompletarPage />}
        />

        <Route
          path="/actividad/m-final"
          element={<ActividadMFinalPage />}
        />

        <Route
          path="/lecciones/t"
          element={<LeccionTPage />}
        />

        <Route
          path="/actividad/t-sonidos"
          element={<ActividadTSonidosPage />}
        />



        <Route
          path="/lecciones/y-conjuncion"
          element={<LeccionYPage />}
        />

        <Route
          path="/lecciones/l"
          element={<LeccionLPage />}
        />

        <Route
          path="/actividad/l-imagenes"
          element={<ActividadLImagenesPage />}
        />

        <Route
          path="/actividad/l-silabas"
          element={<ActividadLSilabasPage />}
        />

        <Route
          path="/actividad/l-completar"
          element={<ActividadLCompletarPage />}
        />

        <Route
          path="/actividad/l-final"
          element={<ActividadLFinalPage />}
        />

        <Route
          path="/actividad/y-formar-parejas"
          element={<ActividadYParejasPage />}
        />

        <Route
          path="/actividad/y-unir-imagenes"
          element={<ActividadYUnirImagenesPage />}
        />

        <Route
          path="/actividad/y-final"
          element={<ActividadYFinalPage />}
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