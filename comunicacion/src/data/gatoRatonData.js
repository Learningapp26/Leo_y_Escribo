import { createBookContent } from './bookLessonHelpers.js'

// ¡El gato y el ratón! — juego final de la Unidad 5 (Planeta Cristal).
// El tablero sigue el recorrido del libro, de SALIDA a META.
export const GATO_RATON_ID = 'gato-raton'

const { audio } = createBookContent(GATO_RATON_ID)

// Pistas con dibujos que ya existen en otras lecciones.
const hint = (label, folder, file = label) => ({ label, image: folder ? `/images/lecciones/${folder}/${file}.png` : null })

// type: start | task | spell | mouse | cat | goal
// short: lo que se ve en la casilla; text: el reto completo (se escucha).
// El libro dice "Escribe…"; aquí se dice en voz alta, porque se omite la escritura libre.
const tile = (id, type, short, text, extra = {}) => ({
  id, type, short, text,
  ...(text ? { audio: audio(`casilla-${id}`, text) } : {}),
  ...extra,
})

export const BOARD = [
  tile('salida', 'start', 'Salida', null, { color: 'pink' }),
  tile('palabra-g', 'task', 'g', 'Di una palabra que empiece con g.', {
    color: 'sky', big: true, hints: [hint('gato', 'g'), hint('guitarra', 'g'), hint('gallina', 'g')],
  }),
  tile('palabra-dr', 'task', 'dr', 'Di una palabra que lleve las letras dr.', {
    color: 'lilac', big: true, hints: [hint('dragón', 'dr', 'dragon'), hint('cocodrilo', 'dr'), hint('piedra', 'dr')],
  }),
  tile('hormiguero', 'task', 'Hormiguero', 'Di el nombre del animal que vive en un hormiguero.', {
    color: 'sun', answer: '¡La hormiga!',
  }),
  tile('raton-1', 'mouse', '¡Ratón!', 'Encontraste al ratón. Avanza una casilla.', { color: 'pink' }),
  tile('palabra-h', 'task', 'h', 'Di una palabra que empiece con h.', {
    color: 'mint', big: true, hints: [hint('helado'), hint('hoja'), hint('huevo')],
  }),
  tile('globo', 'task', 'globo', 'Di lentamente la palabra globo.', {
    color: 'peach', syllables: ['glo', 'bo'], picture: '/images/lecciones/gl/globo.png',
  }),
  tile('raton-2', 'mouse', '¡Ratón!', 'Encontraste al ratón. Avanza una casilla.', { color: 'lilac' }),
  tile('animal', 'task', 'Animal', 'Di el nombre de un animal que te guste.', {
    color: 'pink', hints: [hint('tortuga', 'g'), hint('zorro', 'z'), hint('águila', 'g', 'aguila')],
  }),
  tile('comida', 'task', 'Comida', 'Di el nombre de una comida que te guste.', {
    color: 'mint', hints: [hint('manzana', 'z'), hint('galleta', 'g'), hint('aguacate', 'g')],
  }),
  tile('palabra-z', 'task', 'z', 'Di una palabra que empiece con z.', {
    color: 'sky', big: true, hints: [hint('zapato', 'z'), hint('zanahoria', 'z'), hint('zorro', 'z')],
  }),
  tile('gato-1', 'cat', '¡Gato!', '¡El gato te atrapó! Pierdes un turno.'),
  tile('palabra-ll', 'task', 'll', 'Di una palabra que comience con ll.', {
    color: 'mint', big: true, hints: [hint('llave'), hint('lluvia'), hint('llama')],
  }),
  tile('raton-3', 'mouse', '¡Ratón!', 'Encontraste al ratón. Avanza una casilla.', { color: 'pink' }),
  tile('grasa', 'spell', 'grasa', 'Deletrea la palabra grasa. Toca las letras en orden.', {
    color: 'peach', word: 'grasa',
  }),
  tile('juego', 'task', 'Juego', 'Di el nombre de tu juego favorito.', {
    color: 'sky', hints: [hint('pelota', 'g'), hint('juguetes', 'g')],
  }),
  tile('gato-2', 'cat', '¡Gato!', '¡El gato te atrapó! Pierdes un turno.'),
  tile('oracion-gato', 'task', 'Oración', 'Di una oración relacionada con el gato.', {
    color: 'sun', picture: '/images/lecciones/g/gato.png', example: 'Ejemplo: El gato toma leche.',
  }),
  tile('meta', 'goal', 'Meta', null),
]

export const GOAL_INDEX = BOARD.length - 1

// Instrucciones del libro, adaptadas: el dado ya no se recorta, se toca.
export const RULES = audio('instrucciones',
  'Juega con dos o tres compañeros, o tú solo. Por turnos, toca el dado. Empieza quien obtenga el número mayor. Tu ficha avanza según muestre el dado. Si caes donde está el gato, pierdes un turno; pero si caes donde está el ratón, avanzas una casilla. En las demás casillas hay retos para continuar el recorrido. Si tienes alguna duda, tu maestra o maestro te apoyará.')

export const SPELL_FEEDBACK = {
  correct: audio('deletreo-correcto', '¡Muy bien! g, r, a, s, a. Grasa.'),
  retry: audio('deletreo-otra-vez', 'Escucha de nuevo e inténtalo otra vez.'),
}

export const GLOBO_SLOW = audio('globo-lento', 'glo… bo. Globo.')
export const WIN = audio('ganaste', '¡Llegaste a la meta! ¡Ganaste el juego del gato y el ratón!')

// Cada jugador es un marcianito de un color.
export const PLAYERS = [
  { id: 1, name: 'Jugador 1', color: '#9BE3C3' },
  { id: 2, name: 'Jugador 2', color: '#FFC8DD' },
  { id: 3, name: 'Jugador 3', color: '#A0C4FF' },
  { id: 4, name: 'Jugador 4', color: '#FFD166' },
]
