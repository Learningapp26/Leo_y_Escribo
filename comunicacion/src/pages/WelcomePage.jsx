import { useEffect, useState } from 'react'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import { esDocente, irAMatematica, RUTA_PANEL_DOCENTE } from '../lib/irAMatematica'
import '../styles/landing.css'

function WelcomePage() {
  // La docente no elige proyecto: va directo a su panel, que vive en
  // Matemática. Se decide aquí y no en el login para cubrir también la
  // entrada con Google, que vuelve directo a /welcome.
  const [revisandoRol, setRevisandoRol] = useState(true)
  const [abriendoMate, setAbriendoMate] = useState(false)

  useEffect(() => {
    let activo = true

    esDocente().then(async (docente) => {
      if (!activo) return
      if (docente) {
        const { error } = await irAMatematica(RUTA_PANEL_DOCENTE)
        if (!error) return
      }
      setRevisandoRol(false)
    })

    return () => {
      activo = false
    }
  }, [])

  async function handleMatematica() {
    setAbriendoMate(true)
    const { error } = await irAMatematica('/')
    if (error) setAbriendoMate(false)
  }

  if (revisandoRol) return null

  return (
    <main className="page landing-page">
      <section
        className="landing-page__content"
        aria-labelledby="landing-title"
      >
        <header className="landing-page__header">
          <h1 id="landing-title">
            ¡Bienvenido!
          </h1>

          <p>
            Elige el proyecto al que deseas ingresar.
          </p>
        </header>

        <div className="landing-page__projects">
          <Card
            variant="project"
            className="project-card project-card--language"
            imageSrc="/images/lenguaje.png"
            imageAlt="Niños aprendiendo lenguaje y leyendo"
            title="Leo y Aprendo"
            description="Practica la lectura y la escritura con lecciones y actividades."
            footer={
              <Button
                to="/home"
                fullWidth
              >
                Ingresar
              </Button>
            }
          />

          <Card
            variant="project"
            className="project-card project-card--math"
            imageSrc="/images/mate.png"
            imageAlt="Niños aprendiendo matemáticas"
            title="Matemáticas"
            description="Aprende matemáticas mediante actividades educativas."
            footer={
              <Button
                fullWidth
                onClick={handleMatematica}
                disabled={abriendoMate}
              >
                {abriendoMate ? 'Abriendo...' : 'Ingresar'}
              </Button>
            }
          />
        </div>
      </section>
    </main>
  )
}

export default WelcomePage