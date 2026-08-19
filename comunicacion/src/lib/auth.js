// auth.js — envoltorios sobre Supabase Auth para login/registro por correo.
// * Google: falta activar el proveedor en Supabase (Authentication → Providers).
import { supabase } from './supabaseClient'

// codigoAula queda guardado en el user_metadata de Supabase Auth (persiste
// para siempre en la cuenta). progreso.js lo lee la primera vez que el
// estudiante entra, para saber a qué docente vincularlo.
export function signUpWithEmail(email, password, fullName, codigoAula) {
  return supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, codigo_aula: codigoAula } },
  })
}

export function signInWithEmail(email, password) {
  return supabase.auth.signInWithPassword({ email, password })
}

export function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/welcome` },
  })
}
