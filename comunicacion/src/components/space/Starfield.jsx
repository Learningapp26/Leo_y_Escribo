import { useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LESSON_UNIT_MAP } from '../../data/lessonColors'

const STAR_COLORS = ['#FFD166', '#FFC8DD', '#9BE3C3', '#A0C4FF']
const MOON_SIZE = 34
const GAP = 8 // aire entre un adorno y el contenido (cubre la flotación de ±6 px)
const MIN_CORNER_SCALE = 0.35

// Las actividades de la "y" usan el prefijo corto de la lección y-conjuncion.
const ROUTE_ALIASES = { y: 'y-conjuncion' }

// Generador pseudoaleatorio con semilla: la misma ruta da siempre el mismo cielo.
function seededRandom(text) {
  let seed = [...text].reduce((hash, char) => Math.imul(hash ^ char.charCodeAt(0), 16777619), 2166136261) >>> 0
  return () => {
    seed = (seed + 0x6D2B79F5) >>> 0
    let value = seed
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

// Starfield envuelve toda la app, así que no hereda .planet--N de la página:
// la unidad se deduce de la ruta para pintar un planeta de esquina de su color.
function getRouteUnit(pathname) {
  const [section, slug = ''] = pathname.split('/').filter(Boolean)
  const unitMatch = pathname.match(/^\/(?:lecciones\/unidad\/|unidad-)(\d+)/)
  if (unitMatch) return Number(unitMatch[1])
  if (section !== 'lecciones' && section !== 'actividad') return null

  // /actividad/m-silabas → prueba "m-silabas" y luego "m"
  const parts = slug.split('-')
  for (let length = parts.length; length > 0; length -= 1) {
    const key = parts.slice(0, length).join('-')
    const unit = LESSON_UNIT_MAP[ROUTE_ALIASES[key] ?? key]
    if (unit !== undefined) return unit
  }
  return null
}

// Candidatos de posición: el 15 % superior, el 15 % inferior o a menos de
// 40 px de un costado. Devuelve la esquina superior izquierda en px.
function placeStar(random, width, height, size) {
  const zone = Math.floor(random() * 4)
  const x = random(), y = random()
  if (zone === 0) return { left: x * (width - size), top: y * (height * 0.15 - size) }
  if (zone === 1) return { left: x * (width - size), top: height * 0.85 + y * (height * 0.15 - size) }
  const top = height * 0.15 + y * height * 0.7
  const side = 4 + x * (40 - size - 4)
  return { left: zone === 2 ? side : width - side - size, top }
}

const isTransparent = (color) => color === 'transparent' || /,\s*0\)$/.test(color)
const hasOwnText = (element) => [...element.childNodes].some((node) => node.nodeType === 3 && node.textContent.trim())

// Todo lo que un adorno no debe tocar: texto, controles, imágenes y tarjetas.
// onSky marca el texto que no tiene una tarjeta opaca debajo (ahí importa el contraste).
function measureObstacles(container) {
  const origin = container.getBoundingClientRect()
  const opaque = new Map()
  const isOpaque = (element) => {
    if (!opaque.has(element)) {
      const style = getComputedStyle(element)
      opaque.set(element, !isTransparent(style.backgroundColor) || style.backgroundImage !== 'none')
    }
    return opaque.get(element)
  }

  return [...container.querySelectorAll('*')].flatMap((element) => {
    if (element.closest('.starfield__sky')) return []
    const text = hasOwnText(element)
    if (!text && !element.matches('button, a, img, svg, input, [role="button"]') && !isOpaque(element)) return []
    const rect = element.getBoundingClientRect()
    if (!rect.width || !rect.height || getComputedStyle(element).visibility === 'hidden') return []
    // Los contenedores de página con fondo ocupan casi todo: no son tarjetas.
    if (!text && rect.width * rect.height > origin.width * origin.height * 0.5) return []

    let onSky = text
    for (let node = element; onSky && node && node !== container; node = node.parentElement) {
      if (isOpaque(node)) onSky = false
    }
    return [{
      left: rect.left - origin.left, top: rect.top - origin.top,
      right: rect.right - origin.left, bottom: rect.bottom - origin.top, onSky,
    }]
  })
}

const boxHits = (box, rect) => box.left < rect.right + GAP && rect.left - GAP < box.right
  && box.top < rect.bottom + GAP && rect.top - GAP < box.bottom

function circleHits(cx, cy, radius, rect) {
  const x = Math.max(rect.left, Math.min(cx, rect.right))
  const y = Math.max(rect.top, Math.min(cy, rect.bottom))
  return (x - cx) ** 2 + (y - cy) ** 2 < (radius + GAP) ** 2
}

// Encoge un planeta de esquina hasta que no quede detrás de texto sin tarjeta.
function fitCorner(startScale, circleAt, textOnSky) {
  for (let scale = startScale; scale >= MIN_CORNER_SCALE; scale -= 0.05) {
    const { cx, cy, radius } = circleAt(scale)
    if (!textOnSky.some((rect) => circleHits(cx, cy, radius, rect))) return +scale.toFixed(2)
  }
  return MIN_CORNER_SCALE
}

function layoutSky(container, pathname, cornerScale) {
  const width = container.clientWidth
  const height = container.clientHeight
  const obstacles = measureObstacles(container)
  const textOnSky = obstacles.filter((rect) => rect.onSky)
  const random = seededRandom(pathname)

  const cornerA = fitCorner(cornerScale, (s) => ({ cx: 30 * s, cy: 30 * s, radius: 140 * s }), textOnSky)
  const cornerB = fitCorner(cornerScale, (s) => ({ cx: width - 40 * s, cy: height - 30 * s, radius: 150 * s }), textOnSky)

  const taken = [...obstacles]
  const findSpot = (size, candidates) => {
    for (const spot of candidates) {
      const box = { ...spot, right: spot.left + size, bottom: spot.top + size }
      if (!taken.some((rect) => boxHits(box, rect))) {
        taken.push(box)
        return spot
      }
    }
    return null
  }
  const starCandidates = (size) => Array.from({ length: 40 }, () => placeStar(random, width, height, size))

  // La lunita busca sitio cerca de la esquina superior derecha.
  const moonCandidates = Array.from({ length: 24 }, () => ({
    left: width - MOON_SIZE - 10 - random() * 110, top: 10 + random() * 60,
  }))
  const moon = findSpot(MOON_SIZE, moonCandidates)

  const shapeCount = 5 + Math.floor(random() * 2)
  const shapes = Array.from({ length: shapeCount }, (_, index) => {
    const size = Math.round(10 + random() * 10)
    const opacity = +(0.7 + random() * 0.15).toFixed(2)
    const rotation = Math.round(-20 + random() * 40)
    const spot = findSpot(size, starCandidates(size))
    return spot && { ...spot, size, opacity, rotation, color: STAR_COLORS[index % STAR_COLORS.length] }
  }).filter(Boolean)

  const dotCount = 3 + Math.floor(random() * 2)
  const dots = Array.from({ length: dotCount }, () => {
    const size = 3 + Math.floor(random() * 2)
    const spot = findSpot(size, starCandidates(size))
    return spot && { ...spot, size }
  }).filter(Boolean)

  return { cornerA, cornerB, moon, shapes, dots }
}

const px = (value) => `${Math.round(value)}px`

// Pantalla completa con nebulosas, dos planetas en las esquinas y unas pocas estrellas.
// Los adornos se acomodan midiendo el contenido: nunca quedan detrás de texto ni tarjetas.
// cornerScale es el tamaño máximo de los planetas de las esquinas (0.7 en Actividad y Cuento).
function Starfield({ children, className = '', as: Tag = 'div', cornerScale = 1, ...props }) {
  const { pathname } = useLocation()
  const containerRef = useRef(null)
  const [sky, setSky] = useState(null)
  const unit = getRouteUnit(pathname)

  useLayoutEffect(() => {
    const container = containerRef.current
    let frame = 0
    let timer = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setSky(layoutSky(container, pathname, cornerScale)))
    }
    // Los cambios de contenido llegan en ráfagas (carga, respuestas): se agrupan.
    const schedule = () => {
      clearTimeout(timer)
      timer = setTimeout(update, 150)
    }
    update()
    const resizeObserver = new ResizeObserver(schedule)
    resizeObserver.observe(container)
    // Los cambios del propio cielo no cuentan: solo el contenido mueve los adornos.
    const mutationObserver = new MutationObserver((records) => {
      if (records.some((record) => !record.target.closest?.('.starfield__sky'))) schedule()
    })
    mutationObserver.observe(container, { childList: true, subtree: true })
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timer)
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [pathname, cornerScale])

  return (
    <Tag ref={containerRef} className={`starfield ${className}`.trim()} {...props}>
      <div className={`starfield__sky${unit === null ? '' : ` planet--${unit}`}`} aria-hidden="true">
        {sky && <>
          <span className="starfield__corner starfield__corner--a" style={{ '--corner-scale': sky.cornerA }} />
          <span className="starfield__corner starfield__corner--b" style={{ '--corner-scale': sky.cornerB }} />
          {sky.moon && <span className="starfield__moon" style={{ left: px(sky.moon.left), top: px(sky.moon.top) }} />}
          {sky.shapes.map((star, index) => (
            <span key={`star-${index}`} className={`starfield__star${index < 2 ? ' starfield__star--twinkle' : ''}`}
              style={{
                left: px(star.left), top: px(star.top), width: px(star.size), height: px(star.size),
                background: star.color, opacity: star.opacity, transform: `rotate(${star.rotation}deg)`,
                animationDelay: index < 2 ? `${index * 1.4}s` : undefined,
              }} />
          ))}
          {sky.dots.map((dot, index) => (
            <span key={`dot-${index}`} className="starfield__dot"
              style={{ left: px(dot.left), top: px(dot.top), width: px(dot.size), height: px(dot.size) }} />
          ))}
        </>}
      </div>
      {children}
    </Tag>
  )
}

export default Starfield
