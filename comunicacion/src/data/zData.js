import { createBookContent } from './bookLessonHelpers.js'

const { audio, word, syllable, instruction, select, present, order } = createBookContent('z')

// Every printed drawing points to public/images/lecciones/z/<palabra>.png.
// Pending illustrations keep their space through BookLessonImage.
const pic = (text) => word(text, true)
const pics = (values) => values.map(pic)
const words = (values) => values.map((value) => word(value))
const spoken = (text, parts) => ({ ...pic(text), audio: audio(`sonidos-${word(text).id}`, `${parts}. ${text[0].toUpperCase()}${text.slice(1)}.`, 'Sonidos') })

// Printed text, pages 189–194.
const paragraphs = [
  'Zoe era la hija de un zapatero muy prestigioso. Desde pequeña ayudó a su papá a fabricar zapatos. Hacían zapatos muy bonitos. Cuando Zoe creció, se quedó con el negocio de su papá. No era común que una mujer hiciera zapatos; por eso, algunas personas le decían que mejor se dedicara a otra cosa, pero Zoe no les hizo caso. A ella le gustaba mucho ser zapatera.',
  'Cierto día, una caravana de artistas llegó al pueblo. Unas bailarinas necesitaban zapatillas de baile. Llegaron a la zapatería de Zoe y le preguntaron si podía elaborarlas. Zoe nunca había hecho unos zapatos así, pero aceptó el trabajo.',
  'Zoe pasó toda la noche trabajando en las zapatillas. ¡Le quedaron preciosas! Eran de cuero muy suave. Cuando las bailarinas llegaron por sus zapatillas, quedaron encantadas. Eran las zapatillas más bonitas y cómodas que habían tenido. Las zapatillas que hizo Zoe ahora viajan por todo el mundo.',
]

const text191Rectangles = 'Lee las palabras de los rectángulos. Selecciona la sílaba con z que aparezca en cada palabra.'
const text193Match = 'Observa el dibujo. Lee cada palabra y selecciona la que lo representa.'
const text193Letters = 'Nombra cada dibujo lentamente. Repite e identifica cada uno de los sonidos que la forman. Selecciona, en orden, la letra que representa cada sonido. Practica con el ejemplo.'

// Page 190 boxes: one per sound, so the rr of pizarrón is a single box.
// pozo is the printed example with its dot already marked.
const positions = [
  ['pozo', ['p', 'o', 'z', 'o']],
  ['taza', ['t', 'a', 'z', 'a']],
  ['lazo', ['l', 'a', 'z', 'o']],
  ['lápiz', ['l', 'á', 'p', 'i', 'z']],
  ['zapato', ['z', 'a', 'p', 'a', 't', 'o']],
  ['pizarrón', ['p', 'i', 'z', 'a', 'rr', 'ó', 'n']],
]

// Page 193 drawings, in printed order. The zeta drawing is the letter itself.
const matchDrawings = ['cabeza', 'pozo', 'taza', 'zancudo', 'zeta', 'erizo']

export const zLesson = {
  id: 'z', letter: 'Z', unitId: 5, pages: '189–194',
  reading: {
    title: 'Zoe, la zapatera', paragraphs,
    instruction: instruction('lectura', 'Hoy aprenderás la letra zeta. Escucha la historia de Zoe.'),
    audio: audio('zoe-la-zapatera', `Zoe, la zapatera\n\n${paragraphs.join('\n\n')}`, 'Historia'),
    image: '/images/lecciones/z/lectura-z.png',
    imageAlt: 'Zoe sonríe en su zapatería mientras sostiene un zapato, rodeada de zapatos y zapatillas de baile.',
    questions: [
      '¿Por qué Zoe se hizo zapatera?',
      '¿Qué piensas del trabajo que hacía Zoe?',
      '¿Por qué dice la historia que las zapatillas que hizo Zoe «ahora viajan por todo el mundo»?',
      '¿A qué te gustaría dedicarte cuando crezcas?',
    ].map((text) => ({ text })),
  },
  feedback: {
    correct: audio('respuesta-correcta', '¡Correcto! Puedes continuar.'),
    retry: audio('intenta-otra-vez', 'Escucha de nuevo e inténtalo otra vez.'),
    completed: audio('felicitacion-final', '¡Terminaste la lección de la letra Z! Vuelve a las lecciones de la Unidad 5.'),
  },
  activities: [
    { id: 'sonidos', title: 'Reconozcamos el sonido de Z', exercises: [
      present('sonido-z', 190, '¿Qué aparece al lado? Nómbralo despacio. ¿Cuál es el primer sonido que escuchas? Tu maestra o maestro te dirá cuál es. Repítelo varias veces. Escucha y repite las siguientes palabras. Di otras palabras que inicien con el mismo sonido.',
        [spoken('zona', 'zo-na'), spoken('zanco', 'zan-co'), spoken('zumbido', 'zum-bi-do')],
        { prompt: pic('zapato'), sound: audio('sonido-z', 'z (suena casi igual que la s)', 'Sonidos') }),
      select('sonido-inicial', 190, 'Repite en voz alta lo que muestran los siguientes dibujos. Selecciona las figuras que tengan el mismo sonido inicial que la palabra zapato.',
        pics(['zorro', 'zanahoria', 'computadora', 'zíper']), ['zorro', 'zanahoria', 'ziper'], { multiple: true, showOptionLabels: true }),
      present('sonido-final', 190, 'Escucha estas palabras. ¿Notaste el sonido con que finalizan?',
        pics(['feliz', 'vejez', 'veloz', 'aprendiz', 'audaz'])),
      present('segunda-silaba', 190, 'Ahora, escucha y repite lentamente. Todas llevan el mismo sonido en la segunda sílaba.',
        pics(['lazo', 'trazar', 'pizarrón', 'quizá', 'panza', 'cazador'])),
      {
        id: 'posicion-z', page: 190, type: 'boxes',
        instruction: instruction('posicion-z', 'Di despacio el nombre de cada dibujo. Cada cuadrito es un sonido. Toca el cuadrito donde escuchas la z. Mira el ejemplo: /p/-/o/-/z/-/o/.'),
        items: positions.map(([text, sounds], index) => ({
          ...pic(text), boxes: sounds.length, answer: sounds.indexOf('z'), example: index === 0,
        })),
      },
    ] },
    { id: 'silabas', title: 'La letra Z y sus sílabas', exercises: [
      present('letra-z', 191, 'Fíjate en esta letra. Es la Z mayúscula o la z minúscula. Esta letra suena casi igual que la s. Aprenderás nuevas palabras que se escriben con z. Traza esta letra en diferentes superficies, como indique tu maestra o maestro. Repite las combinaciones de la letra z con las vocales.',
        ['zo', 'za', 'ze', 'zi', 'zu'].map(syllable), { letter: 'Z z', prompt: pic('zapato') }),
      present('leer-palabras', 191, 'Observa las siguientes imágenes. Trata de leer las palabras que aparecen debajo. Fíjate en: zo, ze, zi y zu.',
        pics(['zorro', 'zepelín', 'zíper', 'Zulema'])),
      ...[
        ['zeta', ['za', 'ze'], 'ze'], ['zona', ['za', 'zo'], 'zo'], ['pezuña', ['ze', 'zu'], 'zu'],
        ['chorizo', ['zo', 'zi'], 'zo'], ['pereza', ['za', 'ze'], 'za'], ['lechuza', ['za', 'zi'], 'za'],
      ].map(([text, pair, answer]) => select(`rectangulo-${word(text).id}`, 191, text191Rectangles,
        pair.map(syllable), [answer], { prompt: word(text) })),
    ] },
    { id: 'completar', title: 'Palabras e imágenes con Z', exercises: [
      ...matchDrawings.map((text) => select(`imagen-${text}`, 193, text193Match,
        words(['taza', 'azúcar', 'erizo', 'cabeza', 'zeta', 'marzo', 'pozo', 'zancudo']), [text],
        text === 'zeta' ? { prompt: word(text), hideWord: true, letter: 'Z' } : { prompt: pic(text), hideWord: true })),
      present('ejemplo-azul', 193, text193Letters,
        [{ ...word('azul'), label: 'a z u l', image: '/images/lecciones/z/azul.png' }]),
      ...['zorro', 'manzana', 'zapato', 'pezuña'].map((text) => ({
        ...order(`letras-${word(text).id}`, 193, [], text),
        instruction: instruction('formar-letras', text193Letters),
        options: [...text].sort((a, b) => a.localeCompare(b, 'es')).map((label) => ({ id: label, label })),
        compactOptions: true, prompt: pic(text), hideWord: true,
      })),
    ] },
    { id: 'final', title: 'Familia de palabras e historia', exercises: [
      // Book example: zapatera. The other options come from the story.
      select('familia-zapato', 194, 'Selecciona las palabras que se derivan de la palabra zapato. Crea una familia de palabras. Fíjate en el ejemplo.',
        words(['zapatero', 'zorro', 'zapatería', 'taza', 'zapatillas', 'pozo']),
        ['zapatero', 'zapateria', 'zapatillas'], { multiple: true, prompt: pic('zapato'), pattern: 'Ejemplo: zapatera' }),
      {
        id: 'historia-zorro', page: 194, type: 'oral',
        instruction: instruction('historia-zorro', 'Lee la primera oración de la historia del zorro. Continúala: escoge una opción de cada recuadro y cuenta lo que le pasó.'),
        prompt: { id: 'inicio-historia', label: 'En un bosque vivía un zorro.', audio: audio('inicio-historia-zorro', 'En un bosque vivía un zorro.', 'Oraciones'), image: pic('zorro').image },
        groups: [
          { id: 'que-hacia', label: '¿Qué hacía el zorro?', options: words(['buscaba comida', 'dormía bajo un árbol', 'jugaba con una lechuza']) },
          { id: 'que-paso', label: '¿Qué pasó después?', options: words(['encontró una manzana', 'conoció a un erizo', 'llegó a la zapatería de Zoe']) },
          { id: 'como-termino', label: '¿Cómo terminó?', options: words(['regresó feliz a su casa', 'compartió con sus amigos', 'se quedó dormido']) },
        ],
      },
    ] },
  ],
}
