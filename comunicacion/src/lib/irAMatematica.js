// irAMatematica.js — puente del login compartido hacia el módulo de Matemática.
//
// El login de toda la plataforma es este. Matemática vive en otra URL (otro
// origen), así que no ve la sesión guardada aquí: se la pasamos en el hash.
// Matemática la arma con supabase.auth.setSession() y borra el hash.
//
//   VITE_MATE_URL/ruta#access_token=...&refresh_token=...
//
// El hash no viaja al servidor ni queda en los logs de Cloudflare.
//
// El panel docente y el registro de docentes viven en Matemática; este
// archivo solo decide a dónde mandar a cada quien.
import { supabase } from './supabaseClient'

const MATE_URL = (import.meta.env.VITE_MATE_URL || 'http://localhost:5174').replace(/\/$/, '')

export const RUTA_PANEL_DOCENTE = '/maestra/estudiantes'
export const URL_REGISTRO_DOCENTE = `${MATE_URL}/registro-docente`

// true si la cuenta con sesión es de docente. También cuenta como docente
// quien se registró como tal y todavía no entró al panel: el rol se escribe
// en `perfiles` la primera vez que entra (ver registrar_docente en el repo
// de Matemática), y sin esto quedaría atrapada en la bienvenida.
export async function esDocente() {
  const { data: userData } = await supabase.auth.getUser()
  const user = userData?.user
  if (!user) return false

  if (user.user_metadata?.registro_docente?.pendiente) return true

  const { data, error } = await supabase
    .from('perfiles')
    .select('rol')
    .eq('id', user.id)
    .maybeSingle()

  if (error) {
    console.error('No se pudo leer el rol del usuario:', error)
    return false
  }

  return data?.rol === 'docente'
}

// Abre Matemática con la sesión actual. Devuelve { error } si no hay
// sesión; si la hay, la página se va y no devuelve nada.
export async function irAMatematica(ruta = '/') {
  const { data } = await supabase.auth.getSession()
  const session = data?.session

  if (!session) return { error: new Error('No hay sesión activa.') }

  const hash = new URLSearchParams({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  })

  window.location.assign(`${MATE_URL}${ruta}#${hash.toString()}`)
  return { error: null }
}

// Alta de docente desde este login (SCRUM-90). Solo crea la cuenta de Auth
// y deja en user_metadata lo que necesita el RPC registrar_docente. El
// perfil y el aula se crean la primera vez que la docente entra al panel de
// Matemática (completarRegistroDocente en frontend_math/src/lib/docentes.js):
// esta pantalla no escribe `perfiles` ni `aulas`.
//
// El formato de registro_docente tiene que ser IGUAL al que lee
// frontend_math; si se cambia aquí, se cambia allá.
export function registrarDocente({ email, password, nombre, nombreAula }) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/login`,
      data: {
        full_name: nombre,
        registro_docente: {
          pendiente: true,
          nombre_aula: nombreAula,
        },
      },
    },
  })
}
