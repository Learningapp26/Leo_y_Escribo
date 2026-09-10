import {
  BarChart3,
  BookOpen,
  LogOut,
} from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BottomNav from '../components/navigation/BottomNav'
import '../styles/home.css'

function HomePage() {
  return (
    <main className="page home-page">
      <section className="home-page__content">
        <Card className="home-card">
          <div className="home-card__visual">
            <img
              className="home-card__image"
              src="/images/home-reading.png"
              alt=""
              aria-hidden="true"
              draggable={false}
            />
          </div>

          <div className="home-card__content text-center">

            <h1>¡Hola!</h1>

            <p className="text-instruction">
              ¿Continuamos nuestra aventura de aprendizaje?
            </p>

            <div className="button-group">
              <Button
                to="/lecciones"
                icon={BookOpen}
                size="large"
                fullWidth
              >
                Continuar aprendiendo
              </Button>

              <Button
                to="/progreso"
                variant="secondary"
                className="home-card__progress"
                icon={BarChart3}
                size="large"
                fullWidth
              >
                Ver mi progreso
              </Button>

              <Button
                to="/"
                variant="secondary"
                className="home-card__logout"
                icon={LogOut}
                size="large"
                fullWidth
              >
                Cerrar sesión
              </Button>
            </div>
          </div>
        </Card>
      </section>

      <BottomNav />
    </main>
  )
}

export default HomePage