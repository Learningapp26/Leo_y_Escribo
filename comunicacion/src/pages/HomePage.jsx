import {
  BarChart3,
  BookOpen,
  LogOut,
} from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BottomNav from '../components/navigation/BottomNav'

function HomePage() {
  return (
    <main className="page">
      <section className="container">
        <Card className="text-center">
          <h1>Inicio</h1>

          <p className="text-instruction">
            ¿Qué quieres hacer hoy?
          </p>

          <div className="button-group">
            <Button
              to="/lecciones"
              icon={BookOpen}
              size="large"
              fullWidth
            >
              Ver unidades
            </Button>

            <Button
              to="/progreso"
              variant="secondary"
              icon={BarChart3}
              size="large"
              fullWidth
            >
              Ver progreso
            </Button>

            <Button
              to="/"
              variant="secondary"
              icon={LogOut}
              size="large"
              fullWidth
            >
              Cerrar sesión
            </Button>
          </div>
        </Card>
      </section>

      <BottomNav />
    </main>
  )
}

export default HomePage