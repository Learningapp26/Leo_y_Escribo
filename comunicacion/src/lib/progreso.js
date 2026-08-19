// progreso.js — guarda y lee el avance del estudiante en Supabase.
//
// Contrato compartido con Matemática (NO modificar sin avisar):
//   estudiantes.id = auth.users.id, progreso.modulo = 'comunicacion'|'matematica'
//   aulas es tabla propia del módulo, resuelve codigo_aula → docente_id.
//
// Todo defensivo a propósito: si Supabase falla o no hay sesión, las
// funciones devuelven vacío/null en vez de lanzar error, para que una
// actividad nunca se rompa por un fallo de guardado.

import { supabase } from './supabaseClient'

const MODULO = 'comunicacion'

// Usuario autenticado actual, o null si no hay sesión.
async function getUsuarioActual() {
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) return null

  return data.user
}

// Docente dueño de un código de aula, o null si el código no existe.
async function buscarDocentePorCodigoAula(codigoAula) {
  const { data, error } = await supabase
    .from('aulas')
    .select('docente_id')
    .ilike('codigo', codigoAula)
    .maybeSingle()

  if (error) {
    console.error('No se pudo buscar el código de aula:', error)
    return null
  }

  return data?.docente_id ?? null
}

// Crea la fila del estudiante si no existe (upsert por id). Se llama una
// vez por sesión desde App.jsx al detectar login. codigo_aula viene del
// user_metadata guardado al registrarse (auth.js).
export async function ensureEstudiante(user) {
  if (!user) return { error: new Error('No hay usuario autenticado') }

  const nombre = user.user_metadata?.full_name || user.email || 'Estudiante'
  const codigoAula = user.user_metadata?.codigo_aula?.trim()

  if (!codigoAula) {
    const error = new Error(
      'Este usuario no tiene código de aula guardado (cuenta creada antes de agregar el campo).',
    )
    console.error('No se pudo asegurar la fila de estudiante:', error)
    return { error }
  }

  const docenteId = await buscarDocentePorCodigoAula(codigoAula)

  if (!docenteId) {
    const error = new Error(`El código de aula "${codigoAula}" no existe.`)
    console.error('No se pudo asegurar la fila de estudiante:', error)
    return { error }
  }

  const { error } = await supabase.from('estudiantes').upsert(
    { id: user.id, nombre, codigo_aula: codigoAula, docente_id: docenteId },
    { onConflict: 'id', ignoreDuplicates: true },
  )

  if (error) {
    console.error('No se pudo asegurar la fila de estudiante:', error)
  }

  return { error }
}

// Registra un intento de actividad. detalle debe incluir leccionId, ej.
// { leccionId: 'l', ejercicioId: 'meme-lima', fase: 'oraciones' }.
export async function registrarProgreso({
  actividad,
  correcto,
  intentos = 1,
  detalle = {},
}) {
  const usuario = await getUsuarioActual()

  if (!usuario) {
    console.warn(
      `Progreso no guardado (sin sesión real de Supabase): ${actividad}`,
    )
    return { error: null, skipped: true }
  }

  const { error } = await supabase.from('progreso').insert({
    modulo: MODULO,
    estudiante_id: usuario.id,
    actividad,
    correcto,
    intentos,
    detalle,
  })

  if (error) {
    console.error('No se pudo guardar el progreso:', error)
  }

  return { error, skipped: false }
}

// Marca una lección completa. Se llama una sola vez, al llegar a la
// pantalla final. `parte` es solo para lecciones con mini-lecciones
// sueltas (ver PARTES_REQUERIDAS abajo), se omite en el resto.
export async function registrarLeccionCompletada(leccionId, parte) {
  return registrarProgreso({
    actividad: 'leccion-completada',
    correcto: true,
    detalle: parte ? { leccionId, parte } : { leccionId },
  })
}

// Todos los registros de progreso del estudiante actual en este módulo,
// del más reciente al más antiguo. Devuelve [] si no hay sesión o falla.
export async function obtenerProgreso() {
  const usuario = await getUsuarioActual()

  if (!usuario) return []

  const { data, error } = await supabase
    .from('progreso')
    .select('actividad, correcto, intentos, detalle, creado_en')
    .eq('modulo', MODULO)
    .eq('estudiante_id', usuario.id)
    .order('creado_en', { ascending: false })

  if (error) {
    console.error('No se pudo leer el progreso:', error)
    return []
  }

  return data ?? []
}

// Lecciones que en realidad son varias mini-lecciones sueltas (cada una
// con su propia pantalla final) en vez de un solo flujo: solo cuentan
// como completadas cuando TODAS sus partes lo están.
const PARTES_REQUERIDAS = {
  'silabas-inversas': ['l', 's', 'n'],
}

// Resumen listo para la pantalla de progreso: total de estrellas ganadas
// y, por lección (ej. "l", "vocales"), si está completada o solo iniciada.
// Se apoya en detalle.leccionId, que todas las páginas de actividad deben
// mandar en cada registrarProgreso/registrarLeccionCompletada.
export async function obtenerResumenProgreso() {
  const registros = await obtenerProgreso()

  let estrellas = 0
  const completadas = new Set()
  const iniciadas = new Set()
  const partesCompletadas = new Map()

  for (const registro of registros) {
    const leccionId = registro.detalle?.leccionId
    if (leccionId) iniciadas.add(leccionId)

    if (registro.actividad === 'leccion-completada') {
      if (!leccionId) continue

      const parte = registro.detalle?.parte
      if (!parte) {
        completadas.add(leccionId)
        continue
      }

      const partes = partesCompletadas.get(leccionId) ?? new Set()
      partes.add(parte)
      partesCompletadas.set(leccionId, partes)
      continue
    }

    if (registro.correcto) estrellas += 1
  }

  for (const [leccionId, requeridas] of Object.entries(PARTES_REQUERIDAS)) {
    const partes = partesCompletadas.get(leccionId)
    if (partes && requeridas.every((parte) => partes.has(parte))) {
      completadas.add(leccionId)
    }
  }

  return { estrellas, completadas, iniciadas }
}
