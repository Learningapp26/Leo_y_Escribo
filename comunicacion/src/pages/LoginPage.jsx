// LoginPage — tarjeta deslizante inspirada en AsmrProg/Modern-Login,
// conectada a Supabase Auth (crear cuenta / iniciar sesión + Gmail).
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, Mail, UserPlus } from 'lucide-react'
import Button from '../components/common/Button'
import { signInWithEmail, signInWithGoogle, signUpWithEmail } from '../lib/auth'
import '../styles/login.css'

function LoginPage() {
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  function switchMode(nextIsSignUp) {
    setError('')
    setNotice('')
    setIsSignUp(nextIsSignUp)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setNotice('')
    setLoading(true)

    const { error: authError } = isSignUp
      ? await signUpWithEmail(email, password, name)
      : await signInWithEmail(email, password)

    setLoading(false)

    if (authError) {
      setError(authError.message)
      return
    }

    if (isSignUp) {
      // Supabase exige confirmar el correo antes de dejar sesión activa
      setNotice('Cuenta creada. Revisa tu correo para confirmarla y luego inicia sesión.')
      setIsSignUp(false)
      return
    }

    navigate('/welcome')
  }

  async function handleGoogleClick() {
    setError('')

    const {
      data,
      error: authError,
    } = await signInWithGoogle()

    if (authError) {
      setError(authError.message)
      return
    }

    if (!data?.url) {
      navigate('/welcome')
    }
  }

  return (
    <main className="page login-page">
      <div className={`login-shell${isSignUp ? ' login-shell--active' : ''}`}>
        <div className="login-form-panel login-form-panel--signup" aria-hidden={!isSignUp}>
          <form className="login-form" onSubmit={handleSubmit}>
            <h1>Crear cuenta</h1>

            <button
              type="button"
              className="login-social-icon"
              onClick={handleGoogleClick}
              aria-label="Continuar con Gmail"
              tabIndex={isSignUp ? 0 : -1}
            >
              <Mail size={18} />
            </button>
            {/* * Google: pendiente de activar en Supabase */}

            <label className="login-sr-only" htmlFor="signup-name">Nombre</label>
            <input
              id="signup-name"
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              tabIndex={isSignUp ? 0 : -1}
              required
            />

            <label className="login-sr-only" htmlFor="signup-email">Correo</label>
            <input
              id="signup-email"
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              tabIndex={isSignUp ? 0 : -1}
              required
            />

            <label className="login-sr-only" htmlFor="signup-password">Contraseña</label>
            <input
              id="signup-password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              minLength={6}
              tabIndex={isSignUp ? 0 : -1}
              required
            />

            {isSignUp && error && <p className="feedback-retry login-form__feedback">{error}</p>}

            <Button
              type="submit"
              variant="accent"
              icon={UserPlus}
              disabled={loading}
              tabIndex={isSignUp ? 0 : -1}
            >
              {loading ? 'Un momento...' : 'Crear cuenta'}
            </Button>
          </form>
        </div>

        <div className="login-form-panel login-form-panel--signin" aria-hidden={isSignUp}>
          <form className="login-form" onSubmit={handleSubmit}>
            <h1>Iniciar sesión</h1>

            <button
              type="button"
              className="login-social-icon"
              onClick={handleGoogleClick}
              aria-label="Continuar con Gmail"
              tabIndex={isSignUp ? -1 : 0}
            >
              <Mail size={18} />
            </button>
            {/* * Google: pendiente de activar en Supabase */}

            <label className="login-sr-only" htmlFor="signin-email">Correo</label>
            <input
              id="signin-email"
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              tabIndex={isSignUp ? -1 : 0}
              required
            />

            <label className="login-sr-only" htmlFor="signin-password">Contraseña</label>
            <input
              id="signin-password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              minLength={6}
              tabIndex={isSignUp ? -1 : 0}
              required
            />

            {!isSignUp && error && <p className="feedback-retry login-form__feedback">{error}</p>}
            {!isSignUp && notice && <p className="feedback-correct login-form__feedback">{notice}</p>}

            <Button
              type="submit"
              variant="accent"
              icon={LogIn}
              disabled={loading}
              tabIndex={isSignUp ? -1 : 0}
            >
              {loading ? 'Un momento...' : 'Ingresar'}
            </Button>
          </form>
        </div>

        <div className="login-toggle-container">
          <div className="login-toggle">
            <div className="login-toggle-panel login-toggle-panel--left">
              <h1>¡Bienvenido de nuevo!</h1>
              <p>Inicia sesión con tu cuenta para continuar.</p>
              <button type="button" className="login-toggle__button" onClick={() => switchMode(false)}>
                Iniciar sesión
              </button>
            </div>

            <div className="login-toggle-panel login-toggle-panel--right">
              <h1>¡Hola!</h1>
              <p>Regístrate con tus datos para empezar a usar Leo y Escribo.</p>
              <button type="button" className="login-toggle__button" onClick={() => switchMode(true)}>
                Crear cuenta
              </button>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}

export default LoginPage
