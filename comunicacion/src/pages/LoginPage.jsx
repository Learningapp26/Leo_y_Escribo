// Login and registration use the shared Supabase Auth helpers.
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, LogIn, Mail, UserPlus } from 'lucide-react'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import { signInWithEmail, signInWithGoogle, signUpWithEmail } from '../lib/auth'
import '../styles/login.css'

function LoginPage() {
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setName] = useState('')
  const [codigoAula, setCodigoAula] = useState('')
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
      ? await signUpWithEmail(email, password, name, codigoAula)
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
      <Card className="login-shell">
        <aside className="login-welcome" aria-label="Learning App">
          <span className="login-brand"><BookOpen aria-hidden="true" /> Learning App</span>
          <img className="login-welcome__image" src="/images/login-reading.png" alt="" aria-hidden="true" draggable={false} />
          <h2>Aprender es una aventura</h2>
          <p>Lee, calcula y descubre a tu ritmo.</p>
          <div className="login-letters" aria-hidden="true"><span>A</span><span>B</span><span>C</span></div>
        </aside>

        <div className="login-content">
          <header className="login-heading">
            <span className="login-heading__icon" aria-hidden="true">{isSignUp ? <UserPlus /> : <LogIn />}</span>
            <h1>{isSignUp ? 'Crear cuenta' : '¡Hola de nuevo!'}</h1>
            <p>{isSignUp ? 'Tu aventura de aprendizaje comienza aquí.' : 'Inicia sesión para seguir aprendiendo.'}</p>
          </header>

          <form className="login-form" onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <div className="login-field">
                  <label htmlFor="signup-name">Nombre</label>
                  <input id="signup-name" type="text" placeholder="Tu nombre" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required />
                </div>
                <div className="login-field">
                  <label htmlFor="signup-codigo-aula">Código de aula</label>
                  <input id="signup-codigo-aula" type="text" placeholder="Código de tu aula" value={codigoAula} onChange={(event) => setCodigoAula(event.target.value)} autoComplete="off" aria-describedby="classroom-help" required />
                  <p id="classroom-help" className="login-field__help">Te lo da tu maestra o maestro.</p>
                </div>
              </>
            )}
            <div className="login-field">
              <label htmlFor="login-email">Correo electrónico</label>
              <input id="login-email" type="email" placeholder="tu@correo.com" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
            </div>
            <div className="login-field">
              <label htmlFor="login-password">Contraseña</label>
              <input id="login-password" type="password" placeholder={isSignUp ? 'Al menos 6 caracteres' : 'Tu contraseña'} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={isSignUp ? 'new-password' : 'current-password'} minLength={6} required />
            </div>

            {error && <p role="alert" className="feedback-retry login-form__feedback">{error}</p>}
            {notice && <p role="status" className="feedback-correct login-form__feedback">{notice}</p>}

            <Button type="submit" icon={isSignUp ? UserPlus : LogIn} disabled={loading} fullWidth>
              {loading ? 'Un momento...' : isSignUp ? 'Crear cuenta' : 'Ingresar'}
            </Button>
          </form>

          <div className="login-divider"><span>o continúa con</span></div>
          <Button variant="secondary" icon={Mail} onClick={handleGoogleClick} disabled={loading} fullWidth>Gmail</Button>

          <div className="login-switch">
            <p>{isSignUp ? '¿Ya tienes una cuenta?' : '¿Eres nuevo?'}</p>
            <Button variant="secondary" className="login-switch__button" onClick={() => switchMode(!isSignUp)} disabled={loading}>
              {isSignUp ? 'Iniciar sesión' : 'Crear cuenta'}
            </Button>
          </div>
        </div>
      </Card>
    </main>
  )
}

export default LoginPage
