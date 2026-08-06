import Button from '../components/common/Button'
import Card from '../components/common/Card'
import '../styles/landing.css'

function WelcomePage() {
  return (
    <main className="page landing-page">
      <section
        className="landing-page__content"
        aria-labelledby="landing-title"
      >
        <header className="landing-page__header">
          <h1 id="landing-title">¡Bienvenido!</h1>
          <p>Elige el proyecto al que deseas ingresar.</p>
        </header>

        <div className="landing-page__projects">
          <Card
            variant = "project"
            className="project-card project-card--language"
            imageSrc="/images/lenguaje.png"
            imageAlt="Niños aprendiendo lenguaje y leyendo"
            title="Leo y Aprendo"
            description="Practica la lectura y la escritura con lecciones y actividades."
            footer={
              <Button to="/login" fullWidth>
                Ingresar
              </Button>
            }
          />

          <Card
            variant = "project"
            className="project-card project-card--math project-card--upcoming"
            imageSrc="/images/mate.png"
            imageAlt="Niños aprendiendo matemáticas"
            title="Matemáticas"
            description="Aprende matemáticas mediante actividades educativas."
            footer={
              <Button variant="secondary" fullWidth disabled>
                Próximamente
              </Button>
            }
          />
        </div>
      </section>
    </main>
  )
}

export default WelcomePage