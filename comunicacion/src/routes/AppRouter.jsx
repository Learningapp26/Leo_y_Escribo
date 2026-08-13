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
import LeccionSPage from '../pages/LeccionSPage'
import ActividadSSonidosPage from '../pages/ActividadSSonidosPage'
import ActividadSSilabasPage from '../pages/ActividadSSilabasPage'
import ActividadSCompletarPage from '../pages/ActividadSCompletarPage'
import ActividadSFinalPage from '../pages/ActividadSFinalPage'

import LeccionRPage from '../pages/LeccionRPage'
import ActividadRSilabasPage from '../pages/ActividadRSilabasPage'
import ActividadRSonidosPage from '../pages/ActividadRSonidosPage'
import ActividadRFinalPage from '../pages/ActividadRFinalPage'

import LeccionTPage from '../pages/LeccionTPage'
import ActividadTSonidosPage from '../pages/ActividadTSonidosPage'
import ActividadTSilabasPage from '../pages/ActividadTSilabasPage'
import ActividadTCompletarPage from '../pages/ActividadTCompletarPage'
import ActividadTFinalPage from '../pages/ActividadTFinalPage'

import LeccionNPage from '../pages/LeccionNPage'
import ActividadNImagenesPage from '../pages/ActividadNImagenesPage'
import ActividadNSilabasPage from '../pages/ActividadNSilabasPage'
import ActividadNCompletarPage from '../pages/ActividadNCompletarPage'
import ActividadNFinalPage from '../pages/ActividadNFinalPage'

import LeccionPPage from '../pages/LeccionPPage'
import ActividadPSonidosPage from '../pages/ActividadPSonidosPage'
import ActividadPSilabasPage from '../pages/ActividadPSilabasPage'
import ActividadPCompletarPage from '../pages/ActividadPCompletarPage'
import ActividadPFinalPage from '../pages/ActividadPFinalPage'
import PalabrasPracticaPage from '../pages/PalabrasPracticaPage'
import RepasoUnidad2Page from '../pages/RepasoUnidad2Page'



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
          path="/lecciones/s"
          element={<LeccionSPage />}
        />

        <Route
          path="/actividad/s-sonidos"
          element={<ActividadSSonidosPage />}
        />

        <Route
          path="/actividad/s-silabas"
          element={<ActividadSSilabasPage />}
        />

        <Route
          path="/actividad/s-completar"
          element={<ActividadSCompletarPage />}
        />

        <Route
          path="/actividad/s-final"
          element={<ActividadSFinalPage />}
        />

         <Route
          path="/lecciones/r"
          element={<LeccionRPage />}
        />

        <Route
          path="/actividad/r-silabas"
          element={<ActividadRSilabasPage />}
        />

        <Route
          path="/actividad/r-sonidos"
          element={<ActividadRSonidosPage />}
        />

        <Route
          path="/actividad/r-final"
          element={<ActividadRFinalPage />}
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
          path="/actividad/t-completar"
          element={<ActividadTCompletarPage />}
        />

        <Route
          path="/actividad/t-silabas"
          element={<ActividadTSilabasPage />}
        />

        <Route
          path="/actividad/t-final"
          element={<ActividadTFinalPage />}
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
          path="/lecciones/n"
          element={<LeccionNPage />}
        />

        <Route
          path="/actividad/n-imagenes"
          element={<ActividadNImagenesPage />}
        />

        <Route
          path="/actividad/n-silabas"
          element={<ActividadNSilabasPage />}
        />

        <Route
          path="/actividad/n-completar"
          element={<ActividadNCompletarPage />}
        />

        <Route
          path="/actividad/n-final"
          element={<ActividadNFinalPage />}
        />

        <Route
          path="/lecciones/p"
          element={<LeccionPPage />}
        />

        <Route
          path="/actividad/p-sonidos"
          element={<ActividadPSonidosPage />}
        />

        <Route
          path="/actividad/p-silabas"
          element={<ActividadPSilabasPage />}
        />

        <Route
          path="/actividad/p-completar"
          element={<ActividadPCompletarPage />}
        />

        <Route
          path="/actividad/p-final"
          element={<ActividadPFinalPage />}
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
          path="/actividad/palabras-practica"
          element={<PalabrasPracticaPage />}
        />

        <Route
          path="/unidad-2/repaso"
          element={<RepasoUnidad2Page />}
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
