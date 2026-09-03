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
import SubidasResbalonesPage from '../pages/SubidasResbalonesPage'
import DominoPalabrasPage from '../pages/DominoPalabrasPage'

import LeccionCPage from '../pages/LeccionCPage'
import ActividadCSonidosPage from '../pages/ActividadCSonidosPage'
import ActividadCSilabasPage from '../pages/ActividadCSilabasPage'
import ActividadCCompletarPage from '../pages/ActividadCCompletarPage'
import ActividadCFinalPage from '../pages/ActividadCFinalPage'

import LeccionQPage from '../pages/LeccionQPage'
import ActividadQSonidosPage from '../pages/ActividadQSonidosPage'
import ActividadQSilabasPage from '../pages/ActividadQSilabasPage'
import ActividadQCompletarPage from '../pages/ActividadQCompletarPage'
import ActividadQFinalPage from '../pages/ActividadQFinalPage'

import LeccionBPage from '../pages/LeccionBPage'
import ActividadBSonidosPage from '../pages/ActividadBSonidosPage'
import ActividadBSilabasPage from '../pages/ActividadBSilabasPage'
import ActividadBCompletarPage from '../pages/ActividadBCompletarPage'
import ActividadBFinalPage from '../pages/ActividadBFinalPage'

import LeccionTrPage from '../pages/LeccionTrPage'
import ActividadTrSonidosPage from '../pages/ActividadTrSonidosPage'
import ActividadTrSilabasPage from '../pages/ActividadTrSilabasPage'
import ActividadTrCompletarPage from '../pages/ActividadTrCompletarPage'

import LeccionDPage from '../pages/LeccionDPage'
import ActividadDImagenesPage from '../pages/ActividadDImagenesPage'
import ActividadDSilabasPage from '../pages/ActividadDSilabasPage'
import ActividadDCompletarPage from '../pages/ActividadDCompletarPage'
import ActividadDFinalPage from '../pages/ActividadDFinalPage'

import LeccionPlPage from '../pages/LeccionPlPage'
import ActividadPlSonidosPage from '../pages/ActividadPlSonidosPage'
import ActividadPlSilabasPage from '../pages/ActividadPlSilabasPage'
import ActividadPlFinalPage from '../pages/ActividadPlFinalPage'

import LeccionSilabasInversasPage from '../pages/LeccionSilabasInversasPage'
import ActividadSilabasInversasLPage from '../pages/ActividadSilabasInversasLPage'
import ActividadSilabasInversasSPage from '../pages/ActividadSilabasInversasSPage'
import ActividadSilabasInversasNPage from '../pages/ActividadSilabasInversasNPage'

import LeccionPrPage from '../pages/LeccionPrPage'
import ActividadPrSonidosPage from '../pages/ActividadPrSonidosPage'
import ActividadPrSilabasPage from '../pages/ActividadPrSilabasPage'
import ActividadPrFinalPage from '../pages/ActividadPrFinalPage'

import UnitLessonsPage from '../pages/UnitLessonsPage'
import LessonAccessGuard from '../components/navigation/LessonAccessGuard'


import LeccionBlPage from '../pages/LeccionBlPage'
import ActividadBlSonidosPage from '../pages/ActividadBlSonidosPage'
import ActividadBlSilabasPage from '../pages/ActividadBlSilabasPage'
import ActividadBlFinalPage from '../pages/ActividadBlFinalPage'

import LeccionJPage from '../pages/LeccionJPage'
import ActividadJImagenesPage from '../pages/ActividadJImagenesPage'
import ActividadJSilabasPage from '../pages/ActividadJSilabasPage'
import ActividadJCompletarPage from '../pages/ActividadJCompletarPage'
import ActividadJFinalPage from '../pages/ActividadJFinalPage'

function AppRouter() {
  return (
    <BrowserRouter>
      <LessonAccessGuard>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/home" element={<HomePage />} />

          <Route path="/lecciones" element={<LessonsPage />} />

          <Route
            path="/lecciones/unidad/:unitId"
            element={<UnitLessonsPage />}
          />

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
            path="/unidad-2/subidas-resbalones"
            element={<SubidasResbalonesPage />}
          />
          <Route
            path="/unidad-3/domino-palabras"
            element={<DominoPalabrasPage />}
          />
          <Route
            path="/lecciones/d"
            element={<LeccionDPage />}
          />

          <Route
            path="/actividad/d-imagenes"
            element={<ActividadDImagenesPage />}
          />

          <Route
            path="/actividad/d-silabas"
            element={<ActividadDSilabasPage />}
          />

          <Route
            path="/actividad/d-completar"
            element={<ActividadDCompletarPage />}
          />

          <Route
            path="/actividad/d-final"
            element={<ActividadDFinalPage />}
          />

          <Route
            path="/lecciones/c"
            element={<LeccionCPage />}
          />

          <Route
            path="/actividad/c-sonidos"
            element={<ActividadCSonidosPage />}
          />

          <Route
            path="/actividad/c-silabas"
            element={<ActividadCSilabasPage />}
          />

          <Route
            path="/actividad/c-completar"
            element={<ActividadCCompletarPage />}
          />

          <Route
            path="/actividad/c-final"
            element={<ActividadCFinalPage />}
          />

          <Route
            path="/lecciones/q"
            element={<LeccionQPage />}
          />

          <Route
            path="/actividad/q-sonidos"
            element={<ActividadQSonidosPage />}
          />

          <Route
            path="/actividad/q-silabas"
            element={<ActividadQSilabasPage />}
          />

          <Route
            path="/actividad/q-completar"
            element={<ActividadQCompletarPage />}
          />

          <Route
            path="/actividad/q-final"
            element={<ActividadQFinalPage />}
          />

          <Route
            path="/lecciones/b"
            element={<LeccionBPage />}
          />

          <Route
            path="/actividad/b-sonidos"
            element={<ActividadBSonidosPage />}
          />

          <Route
            path="/actividad/b-silabas"
            element={<ActividadBSilabasPage />}
          />

          <Route
            path="/actividad/b-completar"
            element={<ActividadBCompletarPage />}
          />

          <Route
            path="/actividad/b-final"
            element={<ActividadBFinalPage />}
          />

          <Route
            path="/lecciones/tr"
            element={<LeccionTrPage />}
          />

          <Route
            path="/actividad/tr-sonidos"
            element={<ActividadTrSonidosPage />}
          />

          <Route
            path="/actividad/tr-silabas"
            element={<ActividadTrSilabasPage />}
          />

          <Route
            path="/actividad/tr-completar"
            element={<ActividadTrCompletarPage />}
          />

          <Route
            path="/lecciones/pl"
            element={<LeccionPlPage />}
          />

          <Route
            path="/actividad/pl-sonidos"
            element={<ActividadPlSonidosPage />}
          />

          <Route
            path="/actividad/pl-silabas"
            element={<ActividadPlSilabasPage />}
          />

          <Route
            path="/actividad/pl-final"
            element={<ActividadPlFinalPage />}
          />

          <Route
            path="/lecciones/silabas-inversas"
            element={<LeccionSilabasInversasPage />}
          />

          <Route
            path="/actividad/silabas-inversas-l"
            element={<ActividadSilabasInversasLPage />}
          />

          <Route
            path="/actividad/silabas-inversas-s"
            element={<ActividadSilabasInversasSPage />}
          />

          <Route
            path="/actividad/silabas-inversas-n"
            element={<ActividadSilabasInversasNPage />}
          />


          <Route
            path="/lecciones/pr"
            element={<LeccionPrPage />}
          />
          <Route
            path="/actividad/pr-sonidos"
            element={<ActividadPrSonidosPage />}
          />
          <Route
            path="/actividad/pr-silabas"
            element={<ActividadPrSilabasPage />}
          />
          <Route
            path="/actividad/pr-final"
            element={<ActividadPrFinalPage />}
          />


          <Route
            path="/lecciones/bl"
            element={<LeccionBlPage />}
          />

          <Route
            path="/actividad/bl-sonidos"
            element={<ActividadBlSonidosPage />}
          />
          <Route
            path="/actividad/bl-silabas"
            element={<ActividadBlSilabasPage />}
          />

          <Route
            path="/actividad/bl-final"
            element={<ActividadBlFinalPage />}
          />

          <Route
            path="/lecciones/j"
            element={<LeccionJPage />}
          />

          <Route
            path="/actividad/j-imagenes"
            element={<ActividadJImagenesPage />}
          />

          <Route
            path="/actividad/j-silabas"
            element={<ActividadJSilabasPage />}
          />

          <Route
            path="/actividad/j-completar"
            element={<ActividadJCompletarPage />}
          />

          <Route
            path="/actividad/j-final"
            element={<ActividadJFinalPage />}
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
      </LessonAccessGuard>
    </BrowserRouter>
  )
}

export default AppRouter
