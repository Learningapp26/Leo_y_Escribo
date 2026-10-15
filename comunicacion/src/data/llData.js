import { createBookContent } from './bookLessonHelpers.js'

const { audio, word, syllable, instruction, select, present } = createBookContent('ll')
const reused = {
  tapadera: 't/tapadera', gallina: 'g/gallina', galleta: 'g/galleta', olla: 'br/olla',
  martillo: 'dr/martillo', caballo: 'q/caballo', sol: 'y/sol', luna: 'l/luna',
  limón: 'l/limon', silla: 'q/silla', camión: 'n/camion', cuchillo: 'ch/cuchillo', escoba: 'b/escoba',
}
const pic = (text) => ({ ...word(text, true), ...(reused[text] ? { image: `/images/lecciones/${reused[text]}.png` } : {}) })
const words = (values) => values.map((text) => word(text))
const pics = (values) => values.map(pic)

// Complete printed story, page 195. Handwritten answers are not source text.
const paragraphs = [
  'Una tarde se juntaron muchas gotas de agua en una nube. Estaban preocupadas porque desde hacía días no bajaban a la tierra.',
  'Las nubes se turnaban para producir la lluvia. Conforme se llenaban de gotitas de agua, así iban bajando a la tierra. Una nube pequeña no quiso pasar cuando le tocaba su turno. Ella quería acumular más gotitas para que cayera una lluvia perenne. El problema era que había otras nubes que ya estaban muy grandes y querían bajar. La pequeña nube se empecinaba en no dejar pasar a ninguna.',
  'El sol se acercó para ver qué ocurría. Las gotitas le explicaron el problema. Él se quedó pensando y luego les dijo:',
  '—Debemos trabajar en equipo, para que todas puedan bajar a la tierra.',
  '—¡Tengo una idea! —dijo una gotita— ¡Nos podemos turnar!',
  '—Las gotitas de las nubes más grandes, vengan a esta nube pequeña.',
  'La nube pequeña empezó a crecer. Pronto tomó su turno y empezó a llover. Después de ella pasaron las otras nubes. Esa fue una hermosa tarde de lluvia.',
]

const syllablePositions = [
  ['gallo', ['ga', 'llo'], 1], ['sello', ['se', 'llo'], 1], ['olla', ['o', 'lla'], 1],
  ['galleta', ['ga', 'lle', 'ta'], 1], ['llavero', ['lla', 've', 'ro'], 0], ['gallina', ['ga', 'lli', 'na'], 1],
]
const letterBanks = [
  ['llanta', ['c', 'n', 'e', 'f', 'a', 'll', 'a', 't', 'o'], 5],
  ['ballena', ['b', 'n', 'i', 'm', 'a', 'll', 'a', 's', 'e'], 6],
  ['gallina', ['j', 'r', 'a', 'g', 'i', 'll', 'a', 'n', 'u'], 6],
]

export const llLesson = {
  id: 'll', letter: 'Ll', title: 'Doble Ll', unitId: 5, pages: '195–200', showReadingSource: false,
  centeredItems: true, completionTitle: '¡Terminaste la lección de Ll!',
  reading: {
    title: 'Una tarde de lluvia', paragraphs,
    instruction: instruction('lectura', 'Llegó el turno de aprender la doble ele. Escucha el siguiente cuento.'),
    audio: audio('una-tarde-de-lluvia', `Una tarde de lluvia\n\n${paragraphs.join('\n\n')}`, 'Historia'),
    image: '/images/lecciones/ll/lectura-ll.png',
    imageAlt: 'La lluvia cae sobre el campo, los animales y un arroyo.',
    questions: [
      '¿Qué hubieras hecho tú en lugar de la nube pequeña?', '¿Por qué no había llovido?',
      '¿Qué te pareció la idea de la gotita?', '¿Te gusta la lluvia? ¿Por qué?',
    ].map((text) => ({ text })),
  },
  feedback: {
    correct: audio('respuesta-correcta', '¡Correcto! Puedes continuar.'),
    retry: audio('intenta-otra-vez', 'Escucha de nuevo e inténtalo otra vez.'),
    completed: audio('felicitacion-final', '¡Terminaste la lección de Ll! Vuelve a las lecciones de la Unidad 5.'),
  },
  activities: [
    { id: 'sonidos', title: 'Escuchamos la doble Ll', exercises: [
      present('sonido-ll', 196, 'Observa la lluvia. Escucha y repite su sonido inicial. Repite las palabras y di otras que comiencen con el mismo sonido.',
        words(['lleno', 'llama', 'llega']), { prompt: pic('lluvia'), sound: audio('sonido-ll', 'll', 'Sonidos') }),
      select('sonido-inicial', 196, 'Nombra cada dibujo. Selecciona los que comienzan con el mismo sonido que lluvia.',
        pics(['llave', 'llorar', 'tapadera', 'llanta']), ['llave', 'llorar', 'llanta'], { multiple: true, showOptionLabels: true }),
      present('escuchar-silabas', 196, 'Escucha y repite. En gallina, avellana, pollero, pellejo y pellizco, el sonido ll está en la sílaba de en medio. En sombrilla, membrillo, cepillo, cartilla y costilla, está en la última sílaba.',
        [ ['gallina', 'ga-lli-na'], ['avellana', 'a-ve-lla-na'], ['pollero', 'po-lle-ro'], ['pellejo', 'pe-lle-jo'], ['pellizco', 'pe-lliz-co'],
          ['sombrilla', 'som-bri-lla'], ['membrillo', 'mem-bri-llo'], ['cepillo', 'ce-pi-llo'], ['cartilla', 'car-ti-lla'], ['costilla', 'cos-ti-lla'],
        ].map(([text, parts]) => ({ ...word(text), audio: audio(`silabas-${word(text).id}`, `${parts}. ${text}.`, 'Sílabas') }))),
      { id: 'posicion-silaba', page: 196, type: 'boxes', boxLabel: 'Sílaba', showLabels: true,
        instruction: instruction('posicion-silaba', 'Di cada palabra separada en sílabas. Cada casilla representa una sílaba. Selecciona dónde escuchas ll. Mira el ejemplo de gallo.'),
        items: syllablePositions.map(([text, parts, answer], index) => ({
          ...pic(text), boxes: parts.length, answer, example: index === 0,
          audio: audio(`silabas-${word(text).id}`, `${parts.join('-')}. ${text}.`, 'Sílabas'),
        })),
      },
    ] },
    { id: 'silabas', title: 'Leemos sílabas y palabras', exercises: [
      present('silabas-ll', 197, 'Observa Ll y ll. Traza las letras con tu dedo, como indique tu maestra. Escucha y repite las sílabas.',
        ['llo', 'lla', 'lle', 'lli', 'llu'].map(syllable), { letter: 'Ll ll' }),
      present('leer-palabras', 197, 'Observa las imágenes. Escucha y lee las palabras. Encuentra la doble ele.', pics(['llave', 'llorar', 'gallina', 'Llemo'])),
      select('reconocer-silabas', 197, 'Selecciona solamente las sílabas que tienen doble ele.',
        ['lle', 'lo', 'lla', 'li', 'llu', 'le', 'llo', 'la', 'lli', 'lu'].map(syllable), ['lle', 'lla', 'llu', 'llo', 'lli'], { multiple: true }),
      { id: 'silaba-dibujos', page: 199, type: 'match',
        instruction: instruction('silaba-dibujos', 'Lee y escucha el nombre de cada dibujo. Selecciona la sílaba con doble ele que contiene.'),
        groups: [['martillo', 'llo'], ['botella', 'lla'], ['pollo', 'llo'], ['lluvia', 'llu'], ['caballo', 'llo']]
          .map(([text, answer]) => ({ ...pic(text), answer, options: ['lla', 'lle', 'lli', 'llo', 'llu'].map(syllable) })),
      },
    ] },
    { id: 'final', title: 'Formamos palabras y oraciones', exercises: [
      ...letterBanks.map(([text, letters, answerLength]) => ({
        id: `formar-${text}`, page: 199, type: 'order', compactOptions: true,
        instruction: instruction('formar-palabra', 'Escucha el nombre del dibujo. Selecciona en orden las letras que necesitas para formar la palabra. Sobran algunas letras. Puedes quitar la última para corregir.'),
        prompt: pic(text), options: letters.map((letter, index) => ({ id: `${letter}-${index}`, label: letter, audio: audio(`sonido-${letter}`, letter, 'Sonidos') })),
        answer: text, answerLength, separator: '', resultAudio: audio(word(text).id, text, 'Palabras'),
      })),
      { id: 'asociar-palabras', page: 200, type: 'match',
        instruction: instruction('asociar-palabras', 'Lee y escucha cada palabra. Selecciona el dibujo con el que se relaciona.'),
        groups: [ ['noche', ['sol', 'luna'], 'luna'], ['candado', ['limón', 'llave'], 'llave'],
          ['lluvia', ['sombrilla', 'silla'], 'sombrilla'], ['naranja', ['camión', 'cuchillo'], 'cuchillo'], ['dedo', ['anillo', 'escoba'], 'anillo'],
        ].map(([text, values, answer]) => ({ ...word(text), options: pics(values), answer })),
      },
      { id: 'crear-oraciones', page: 200, type: 'oral', multiple: true, selectionCount: 3, practiceLabel: 'Ya dije mis tres oraciones',
        instruction: instruction('crear-oraciones', 'Escoge tres palabras del recuadro. Forma una oración con cada palabra y dila a tu maestra. Cada oración debe tener por lo menos cinco palabras. Si las escribes, comienza con mayúscula y termina con punto.'),
        options: words(['galleta', 'mollete', 'bolillo', 'castillo', 'tornillo', 'jarrilla', 'cosquillas', 'armadillo', 'mantequilla', 'polilla', 'cochinilla', 'llanto', 'pellizco', 'patrulla', 'callejón', 'zapatilla']),
      },
    ] },
  ],
}
