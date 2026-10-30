import { createBookContent } from './bookLessonHelpers.js'

const { audio, word, syllable, instruction, select, present } = createBookContent('w')
const words = (values) => values.map((text) => word(text))
const pic = (text) => word(text, true)

// Complete printed story, page 227.
const paragraphs = [
  'Una vez, un grupo de niños encontró un pequeño vagón que iba despacio por los rieles del tren. Walter, uno de los niños, avisó a los demás y corrieron para detenerlo.',
  'Karina, Andrea y José, así se llamaban las amigas y el amigo de Walter, lo siguieron. Entre todos pudieron parar el vagón.',
  '—¿Cómo se habrá escapado este vagón? —preguntó Andrea.',
  '—A lo mejor se destrabó de un tren —respondió José.',
  '—Yo pienso que es un vagón que quería viajar solo —dijo Walter.',
  'Walter, el más pequeño de los cuatro, era muy ocurrente.',
  'Lo cierto es que el vagón era perfecto para jugar. Walter, Karina, José y Andrea se montaron en él, imaginaron que iban de paseo. Luego, acomodaron unas cajas encima del vagón y este se convirtió en una casa. Al día siguiente, jugaron de carreras. Karina y Walter iban en bicicleta, mientras José empujaba el vagón que dirigía Andrea.',
  'Desde ese día, el vagón solitario se convirtió en el juguete favorito de los niños y jugaron con él durante muchos años.',
]

// Page 228 bubbles, in printed order. Only wo, wa, we, wi and wu are painted.
const bubbles = ['va', 'wo', 'wi', 've', 'wa', 'vo', 've', 'wu', 'vu', 'wo', 'vi', 'we']

// Page 230 drawings, in printed order. The book prints both "waffle" and "wafle".
const drawings = ['wantan', 'waffle', 'waterpolo', 'wifi', 'web', 'Wilfredo']

// Mixes the word bank differently for each drawing (always the same order for
// the same drawing) so the answer is not in the drawing's printed position.
const mixFor = (seed, values) => {
  let state = [...seed].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7)
  const random = () => { state = (state * 1103515245 + 12345) >>> 0; return state / 4294967296 }
  const mixed = [...values]
  for (let i = mixed.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[mixed[i], mixed[j]] = [mixed[j], mixed[i]]
  }
  return mixed
}

// Place of the right answer for each drawing, never its printed position.
const answerSlots = { wantan: 4, waffle: 1, waterpolo: 6, wifi: 2, web: 5, Wilfredo: 3 }
const optionsFor = (text) => {
  const others = mixFor(text, drawings.filter((value) => value !== text))
  others.splice(answerSlots[text] - 1, 0, text)
  return others
}

// Page 230 sentences: [answer, blank sentence, full sentence, box options].
const sentences = [
  ['kiwi', 'Wendy me regaló un ____.', 'Wendy me regaló un kiwi.', ['kiwi', 'web']],
  ['waterpolo', 'Walter es campeón de ____.', 'Walter es campeón de waterpolo.', ['wafle', 'waterpolo']],
  ['wantan', 'A Wilfredo le gusta comer ____.', 'A Wilfredo le gusta comer wantan.', ['wantan', 'wifi']],
]

// Each box option shows its drawing so the child knows what every word means.
// "wafle" (as printed in the sentence box) uses the waffle drawing.
const optionPic = (text) => ({ ...pic(text), ...(text === 'wafle' ? { image: pic('waffle').image } : {}) })

export const wLesson = {
  id: 'w', letter: 'Ww', title: 'La letra Ww', heading: 'La letra Ww',
  unitId: 6, pages: '227–230', showReadingSource: false, centeredItems: true,
  completionTitle: '¡Terminaste la lección de Ww!',
  reading: {
    title: 'El pequeño vagón solitario', paragraphs,
    instruction: instruction('lectura', 'Ahora aprenderás la letra doble uve. Escucha la historia.'),
    audio: audio('el-pequeno-vagon-solitario', `El pequeño vagón solitario\n\n${paragraphs.join('\n\n')}`, 'Historia'),
    image: '/images/lecciones/w/lectura-w.png',
    imageAlt: 'Cuatro niños se asoman sonrientes desde un pequeño vagón sobre los rieles del tren, en medio del campo.',
    questions: [
      '¿De qué jugaron los niños con el vagón?',
      '¿De qué otras cosas podrías jugar con el vagón?',
      '¿Por qué el vagón resultó ser un juguete tan divertido?',
      '¿De dónde crees que venía el vagón?',
    ].map((text) => ({ text })),
  },
  feedback: {
    correct: audio('respuesta-correcta', '¡Correcto! Puedes continuar.'),
    retry: audio('intenta-otra-vez', 'Escucha de nuevo e inténtalo otra vez.'),
    completed: audio('felicitacion-final', '¡Terminaste la lección de la letra doble uve! Vuelve a las lecciones de la Unidad 6.'),
  },
  activities: [
    { id: 'sonidos', title: 'Escuchamos y conocemos Ww', exercises: [
      present('sonido-w', 228, '¿Quién aparece abajo? Nómbralo despacio: Wal-ter. ¿Cuál es el primer sonido que escuchas? Es el sonido gu. Hoy aprenderás la w. Esta letra tiene dos sonidos. La w puede sonar como la combinación de letras gu y también como b.',
        [], {
          prompt: { ...pic('Walter'), audio: audio('silabas-walter', 'Wal-ter. Walter.', 'Sílabas') },
          // Both sounds of w in one track: first gu, then b.
          sound: audio('sonidos-w', 'gu… b', 'Sonidos'),
        }),
      { id: 'palabras-w', page: 228, type: 'oral', practiceLabel: 'Ya dije mis palabras', record: true,
        instruction: instruction('palabras-w', 'En el idioma español o castellano hay pocas palabras que se escriben con w. En cambio, en otros idiomas, como los mayas y el inglés, hay varias. Di en voz alta las palabras con w que conozcas. Puedes grabarte y escucharte.'),
        items: [],
      },
    ] },
    { id: 'silabas', title: 'Leemos sílabas y palabras', exercises: [
      present('letra-y-silabas', 228, 'Fíjate en la letra W mayúscula y la w minúscula. Practica las combinaciones de la letra w con las vocales.',
        ['wo', 'wa', 'we', 'wi', 'wu'].map(syllable), { letter: 'Ww', prompt: pic('Walter') }),
      { id: 'silabas-dibujos', page: 228, type: 'match',
        instruction: instruction('silabas-dibujos', 'Observa las siguientes imágenes. Trata de leer las palabras que aparecen debajo. Selecciona la combinación wi, wa o we que contiene cada una.'),
        groups: [['kiwi', 'wi'], ['Walda', 'wa'], ['sándwich', 'wi'], ['Wendy', 'we']]
          .map(([text, answer]) => ({ ...pic(text), answer, options: ['wi', 'wa', 'we'].map(syllable) })),
      },
      present('repetir-palabras', 228, 'Escucha cada palabra y repítela en voz alta.',
        ['kiwi', 'Walda', 'sándwich', 'Wendy'].map(pic)),
      select('burbujas', 228, 'Selecciona todas las sílabas wo, wa, we, wi y wu que están en las burbujas.',
        bubbles.map((text, index) => ({ ...syllable(text), id: `burbuja-${index + 1}` })),
        bubbles.flatMap((text, index) => (text.startsWith('w') ? [`burbuja-${index + 1}`] : [])),
        { multiple: true, compactOptions: true }),
    ] },
    { id: 'final', title: 'Palabras y oraciones con Ww', exercises: [
      ...drawings.map((text) => select(`dibujo-${word(text).id}`, 230,
        'Observa el dibujo y pronuncia su nombre. Luego, selecciona la palabra que lo representa.',
        words(optionsFor(text)), [word(text).id], { prompt: pic(text), hideWord: true })),
      ...sentences.map(([answer, blank, full, options]) => select(`oracion-${answer}`, 230,
        'Lee la oración. Complétala eligiendo una palabra del recuadro.',
        options.map(optionPic), [answer], {
          prompt: { id: `oracion-${answer}`, label: blank, listenLabel: 'la oración', audio: audio(`oracion-${answer}`, blank.replace('____', '...'), 'Oraciones') },
          resultAudio: audio(`oracion-completa-${answer}`, full, 'Oraciones'),
          showOptionLabels: true,
        })),
    ] },
  ],
}
