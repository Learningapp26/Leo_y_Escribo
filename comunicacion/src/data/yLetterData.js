import { createBookContent } from './bookLessonHelpers.js'

// Adaptación original por objetivos de las páginas 217–222; no transcripción.
// La página 220 (trazo) se omite. Nunca usar las claves de y-conjuncion.
const content = createBookContent('y-letra')
// Conserva rutas y guiones de grabación sin intentar reproducir archivos ausentes.
const audio = (...args) => ({ ...content.audio(...args), available: false })
const word = (text) => ({ ...content.word(text), audio: audio(content.word(text).id, text, 'Palabras') })
const syllable = (text) => ({ ...content.syllable(text), audio: audio(`silaba-${text}`, text, 'Sílabas') })
const instruction = (id, text) => audio(`instruccion-${id}`, text)
const select = (id, page, text, options, answers, extra = {}) => ({
  id, page, type: 'select', instruction: instruction(id, text), options, answers, ...extra,
})
const present = (id, page, text, items, extra = {}) => ({
  id, page, type: 'present', instruction: instruction(id, text), items, ...extra,
})
const words = (values) => values.map(word)
const pictures = {
  yoyó: '/images/lecciones/y-letra/yoyo.svg',
  yema: '/images/lecciones/y-letra/yema.svg',
  rayo: '/images/lecciones/y-letra/rayo.svg',
  payaso: '/images/lecciones/p/payaso.png',
  mesa: '/images/lecciones/m/mesa.png',
  sol: '/images/lecciones/y/sol.png',
}
const pic = (text) => ({ ...word(text), image: pictures[text] })
const syllables = ['ya', 'ye', 'yi', 'yo', 'yu'].map(syllable)
const title = 'El yoyó de Yoli'
const paragraphs = [
  'Yoli tiene un yoyó amarillo. Una mañana lo lleva al patio para jugar con su amigo Yayo. El yoyó baja por la cuerda y vuelve a subir hasta su mano.',
  'Yayo quiere aprender. Yoli le presta el yoyó y le enseña con paciencia. Al principio, el juguete se queda abajo. Yayo lo intenta otra vez y logra hacerlo subir. ¡Qué alegría!',
  'De pronto, una nube tapa el sol. A lo lejos se ve un rayo. Los niños dejan el patio y entran a la casa para estar seguros.',
  'Dentro de la casa, Yoli dibuja un payaso. Yayo busca en el dibujo la letra que están aprendiendo. La encuentra en Yoli, Yayo, yoyó, rayo y payaso. Después leen juntos: ya, ye, yi, yo, yu.',
]

export const yLetterLesson = {
  id: 'y-letra', letter: 'Y y', title: 'La letra Y, y', heading: 'La letra Y, y',
  unitId: 6, pages: '217–222', showReadingSource: false, centeredItems: true,
  completionTitle: '¡Terminaste la lección de la letra Y, y!',
  reading: {
    title, paragraphs,
    instruction: instruction('lectura', 'Conoce la letra ye. Lee el cuento con tu maestra y descubre cómo suena en Yoli y yoyó.'),
    audio: audio('el-yoyo-de-yoli', `${title}\n\n${paragraphs.join('\n\n')}`, 'Historia'),
    image: pictures.yoyó, imageAlt: 'Un yoyó amarillo con su cuerda, el juguete de Yoli.',
    questions: [
      '¿Qué juguete lleva Yoli al patio?',
      '¿Cómo ayuda Yoli a Yayo a aprender?',
      '¿Por qué entran los niños a la casa?',
      '¿En cuáles palabras del cuento escuchas la ye de yoyó?',
    ].map((text) => ({ text })),
  },
  feedback: {
    correct: audio('respuesta-correcta', '¡Correcto! Puedes continuar.'),
    retry: audio('intenta-otra-vez', 'Escucha de nuevo e inténtalo otra vez.'),
    completed: audio('felicitacion-final', '¡Terminaste la lección de la letra ye! Vuelve a las lecciones de la Unidad 6.'),
  },
  activities: [
    { id: 'sonidos', title: 'Reconocemos el sonido de Y', exercises: [
      present('conocer-y', 218, 'Observa Y y. Con tu maestra, pronuncia yoyó, yema, rayo y payaso. La ye suena al principio de yoyó y yema, y en medio de rayo y payaso.',
        ['yoyó', 'yema', 'rayo', 'payaso'].map(pic), { letter: 'Y y' }),
      select('reconocer-sonido', 218, 'Pronuncia el nombre de cada dibujo. Selecciona todos los que tienen el sonido de la ye de yoyó.',
        ['mesa', 'yoyó', 'rayo', 'sol', 'payaso', 'yema'].map(pic), ['yoyo', 'rayo', 'payaso', 'yema'],
        { multiple: true, selectionCount: 4, showOptionLabels: true }),
      select('posicion-y', 218, 'Pronuncia payaso despacio. ¿Dónde escuchas el sonido de la ye?',
        words(['Al inicio', 'En medio', 'Al final']), ['en-medio'], { prompt: pic('payaso') }),
      present('y-final', 218, 'En rey y buey, la y está al final y suena como la vocal i. Es un sonido diferente de la ye de yoyó. Lee estas palabras con tu maestra.', words(['rey', 'buey'])),
    ] },
    { id: 'silabas', title: 'Leemos ya, ye, yi, yo, yu', exercises: [
      present('leer-silabas', 219, 'Lee y repite con tu maestra: ya, ye, yi, yo, yu.', syllables),
      ...[['Yayo', 'ya'], ['yema', 'ye'], ['yigüirro', 'yi'], ['yoyó', 'yo'], ['yuca', 'yu']].map(([text, answer]) =>
        select(`identificar-${answer}`, 219,
          text === 'yigüirro' ? 'El yigüirro es un pájaro. Pronuncia yi-güi-rro con tu maestra y selecciona su primera sílaba.'
            : 'Lee la palabra con tu maestra. Selecciona su primera sílaba.',
          syllables, [answer], { prompt: word(text) })),
    ] },
    { id: 'palabras', title: 'Identificamos palabras y sílabas', exercises: [
      select('identificar-palabra', 221, 'Escucha o lee la palabra del recuadro con tu maestra. Selecciona la misma palabra entre las opciones.',
        words(['yuca', 'yema', 'yoyó']), ['yema'], { prompt: pic('yema') }),
      { id: 'palabra-silaba', page: 221, type: 'match',
        instruction: instruction('palabra-silaba', 'Lee cada palabra y selecciona la sílaba que contiene la letra y.'),
        groups: [['payaso', 'ya'], ['yema', 'ye'], ['yoyó', 'yo'], ['yuca', 'yu']]
          .map(([text, answer]) => ({ ...word(text), answer, options: syllables })),
      },
    ] },
    { id: 'final', title: 'Relacionamos imágenes, palabras y oraciones', exercises: [
      ...['yoyó', 'rayo'].map((text) => select(`imagen-${word(text).id}`, 222,
        'Lee la palabra. Selecciona el dibujo que le corresponde.',
        ['rayo', 'yema', 'yoyó'].map(pic), [word(text).id], { prompt: word(text) })),
      ...[
        ['yoyo', 'yoyó', ['Yoli juega con su yoyó.', 'Yoli come una yema.', 'Yoli dibuja un payaso.'], 0],
        ['payaso', 'payaso', ['El payaso tiene un rayo.', 'El payaso sonríe.', 'El payaso es una mesa.'], 1],
      ].map(([id, imageWord, options, answer]) => select(`oracion-${id}`, 222,
        'Observa el dibujo y lee las oraciones con tu maestra. Selecciona la oración que corresponde.',
        words(options), [word(options[answer]).id], { prompt: pic(imageWord) })),
    ] },
  ],
}
