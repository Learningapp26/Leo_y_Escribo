// mockAuth.js — sustituto local de Supabase Auth mientras no exista/no haya
// acceso al proyecto real. Guarda usuarios y sesión en localStorage.
// Se activa desde auth.js cuando VITE_USE_MOCK_AUTH=true (ver .env.local).
// NO es autenticación real: no hay verificación de correo ni servidor.

const USERS_KEY = 'mock-auth-users'
const SESSION_KEY = 'mock-auth-session'

function readUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export async function mockSignUpWithEmail(email, password, fullName) {
  const users = readUsers()

  if (users.some((user) => user.email === email)) {
    return { error: { message: 'Ya existe una cuenta con ese correo (mock).' } }
  }

  users.push({ email, password, fullName })
  writeUsers(users)

  return { error: null }
}

export async function mockSignInWithEmail(email, password) {
  const user = readUsers().find((u) => u.email === email && u.password === password)

  if (!user) {
    return { error: { message: 'Correo o contraseña incorrectos (mock).' } }
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify({ email: user.email, fullName: user.fullName }))
  return { error: null }
}

export async function mockSignInWithGoogle() {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ email: 'demo@mock.local', fullName: 'Usuario Demo' }),
  )
  return { error: null }
}
