// auth.js — envoltorios sobre Supabase Auth para login/registro por correo.
// * Google: falta activar el proveedor en Supabase (Authentication → Providers).
//
// MOCK: mientras no exista/no haya acceso al proyecto de Supabase, pon
// VITE_USE_MOCK_AUTH=true en .env.local para probar el flujo de login/signup
// guardando los datos en localStorage. No es autenticación real.
import { supabase } from './supabaseClient'
import { mockSignInWithEmail, mockSignInWithGoogle, mockSignUpWithEmail } from './mockAuth'

const USE_MOCK_AUTH = import.meta.env.VITE_USE_MOCK_AUTH === 'true'

export function signUpWithEmail(email, password, fullName) {
  if (USE_MOCK_AUTH) return mockSignUpWithEmail(email, password, fullName)

  return supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  })
}

export function signInWithEmail(email, password) {
  if (USE_MOCK_AUTH) return mockSignInWithEmail(email, password)

  return supabase.auth.signInWithPassword({ email, password })
}

export function signInWithGoogle() {
  if (USE_MOCK_AUTH) return mockSignInWithGoogle()

  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/home` },
  })
}
