import { useEffect } from 'react'

import AppRouter from './routes/AppRouter'
import { ensureEstudiante } from './lib/progreso'
import { supabase } from './lib/supabaseClient'

function App() {
  // Al iniciar sesión, asegura la fila del estudiante antes de guardar progreso.
  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) ensureEstudiante(session.user)
      },
    )

    return () => subscription.subscription.unsubscribe()
  }, [])

  return <AppRouter />
}

export default App