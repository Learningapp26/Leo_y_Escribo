import { ArrowRight, Wind, Waves, Flame } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import { getLessonThemeClass } from '../data/lessonColors'

function LeccionSilabasInversasPage() {
  const themeClass = getLessonThemeClass('silabas-inversas')

  return (
    <main
      className={`page ${themeClass}`}
      aria-labelledby="silabas-inversas-title"
    >
      <BackButton label="Volver a lecciones" to="/lecciones" />

      <header className="text-center">
        <span className="text-ui-label">Unidad 2</span>

        <h1 id="silabas-inversas-title">Sílabas inversas</h1>

        <p className="text-instruction">
          Ya conoces las sílabas donde primero va la consonante, como{' '}
          <strong>la</strong>, <strong>se</strong> o <strong>ni</strong>.
          Ahora vamos a aprender las sílabas inversas, donde primero va la
          vocal y después la consonante, como <strong>al</strong>,{' '}
          <strong>es</strong> o <strong>un</strong>.
        </p>
      </header>

      <section aria-labelledby="silabas-inversas-activities-title">
        <h2 id="silabas-inversas-activities-title">Practiquemos</h2>

        <div className="lesson-activity-menu">
          <Card
            className="lesson-activity-menu__card"
            icon={Wind}
            title="Sílabas inversas con L"
            description="al, el, il, ol, ul — lee sobre Elmo y su premio."
            footer={
              <Button
                to="/actividad/silabas-inversas-l"
                icon={ArrowRight}
                iconPosition="right"
                fullWidth
              >
                Comenzar
              </Button>
            }
          />

          <Card
            className="lesson-activity-menu__card"
            icon={Waves}
            title="Sílabas inversas con S"
            description="as, es, is, os, us — lee sobre Estela y su isla."
            footer={
              <Button
                to="/actividad/silabas-inversas-s"
                variant="support"
                icon={ArrowRight}
                iconPosition="right"
                fullWidth
              >
                Comenzar
              </Button>
            }
          />

          <Card
            className="lesson-activity-menu__card"
            icon={Flame}
            title="Sílabas inversas con N"
            description="an, en, in, on, un — lee sobre Antonio y el insecto."
            footer={
              <Button
                to="/actividad/silabas-inversas-n"
                variant="secondary"
                icon={ArrowRight}
                iconPosition="right"
                fullWidth
              >
                Comenzar
              </Button>
            }
          />
        </div>
      </section>
    </main>
  )
}

export default LeccionSilabasInversasPage
