import { createBookContent } from './bookLessonHelpers.js'

const { audio, word, syllable, instruction, select, present } = createBookContent('x')
const words = (values) => values.map((text) => word(text))
const pic = (text) => ({
  ...word(text, true),
  ...(text === 'examen' ? { image: '/images/lecciones/pr/prueba.png' } : {}),
})

// Complete printed story, page 213. Handwritten answers are not source text.
const paragraphs = [
  'El profesor Alexander da clases de música. Un día pidió que los estudiantes de primer grado llevaran un instrumento musical para aprender a tocarlo.',
  'Unos niños llevaron panderetas, otros, tambores. Algunas niñas llegaron con trompetas y chinchines. Xiomara llevó un xilófono de colores. Cuando lo sacó de una bolsa, todos se acercaron para verlo. Le preguntaban:',
  '—¿Qué es eso, Xiomara?',
  '—¿Cómo se toca?',
  '—¿Me dejas intentarlo?',
  'El xilófono llamó mucho la atención. Los niños ya no escuchaban al profesor Alexander. Entonces, él les pidió que regresaran a su lugar para que Xiomara les contara acerca de su instrumento.',
  'Xiomara les dijo que ese instrumento era un xilófono. Les explicó que se tocaba con unos palitos llamados baquetas. Sus padrinos se lo habían regalado por su cumpleaños, pero no lo sabía tocar. Por eso lo había llevado a la clase.',
  'Todos querían tocar el xilófono. Cuando Xiomara terminó de explicarles, dejó que sus compañeros lo tocaran. Uno por uno, fueron pasando. Ese día estuvo lleno de mucha alegría y música.',
]

const matchingWords = ['laxante', 'boxeo', 'toxina', 'axila', 'Mixco', 'asfixia', 'xilote']
const matchingOptions = ['Mixco', 'asfixia', 'axila', 'laxante', 'xilote', 'toxina', 'boxeo']
const sentences = [
  ['sexto', 'El hermano de Xiomara está en ____ grado.', 'El hermano de Xiomara está en sexto grado.', ['anexo', 'sexto', 'exacto']],
  ['boxean', 'Pedro y Alex ____ con sus guantes.', 'Pedro y Alex boxean con sus guantes.', ['reflexionan', 'tóxico', 'boxean']],
  ['conexion', 'La tormenta hizo que perdiéramos la ____.', 'La tormenta hizo que perdiéramos la conexión.', ['conexión', 'expresar', 'óxido']],
]

export const xLesson = {
  id: 'x', letter: 'Xx', title: 'La letra Xx', heading: 'La letra Xx',
  unitId: 6, pages: '213–216', showReadingSource: false, centeredItems: true,
  completionTitle: '¡Terminaste la lección de Xx!',
  reading: {
    title: 'El xilófono de Xiomara', paragraphs,
    instruction: instruction('lectura', 'Llegó el turno de aprender la letra equis. Escucha la siguiente historia.'),
    audio: audio('el-xilofono-de-xiomara', `El xilófono de Xiomara\n\n${paragraphs.join('\n\n')}`, 'Historia'),
    image: '/images/lecciones/x/lectura-x.png',
    imageAlt: 'Xiomara muestra su xilófono de colores al profesor Alexander y a sus compañeros en la clase de música.',
    questions: [
      'Observa el xilófono. Explica cómo es.',
      '¿Qué motivó a los compañeros de Xiomara para acercarse a ella?',
      '¿Por qué este día la clase fue muy alegre?',
      'Si pudieras hablar con Xiomara, ¿qué quisieras preguntarle?',
      'Dibuja un xilófono en tu cuaderno.',
    ].map((text) => ({ text })),
  },
  feedback: {
    correct: audio('respuesta-correcta', '¡Correcto! Puedes continuar.'),
    retry: audio('intenta-otra-vez', 'Escucha de nuevo e inténtalo otra vez.'),
    completed: audio('felicitacion-final', '¡Terminaste la lección de la letra equis! Vuelve a las lecciones de la Unidad 6.'),
  },
  activities: [
    { id: 'sonidos', title: 'Escuchamos y conocemos Xx', exercises: [
      present('sonido-inicial', 214, '¿Recuerdas el instrumento que llevó Xiomara? Escucha y repite: xi-ló-fo-no. Al inicio de xilófono y Xiomara, la equis suena como s.',
        [{ ...word('Xiomara'), audio: audio('silabas-xiomara', 'Xio-ma-ra. Xiomara.', 'Sílabas') }], {
          prompt: { ...pic('xilófono'), audio: audio('silabas-xilofono', 'xi-ló-fo-no. Xilófono.', 'Sílabas') },
          sound: audio('sonido-x-inicial', 's', 'Sonidos'), centeredItems: true,
        }),
      present('sonido-ks', 214, 'Algunas veces, entre vocales o antes de una consonante, la equis suena ks. Escucha y repite las palabras.',
        words(['taxi', 'extra', 'boxeo', 'Axel']), { sound: audio('sonido-x-ks', 'ks', 'Sonidos') }),
      present('trazo-y-silabas', 215, 'Observa la equis mayúscula y la equis minúscula. Traza las letras con tu dedo, como indique tu maestra. Escucha y repite las combinaciones con las vocales.',
        ['xo', 'xa', 'xe', 'xi', 'xu'].map(syllable), { letter: 'Xx' }),
    ] },
    { id: 'silabas', title: 'Leemos sílabas y palabras', exercises: [
      { id: 'silabas-dibujos', page: 214, type: 'match',
        instruction: instruction('silabas-dibujos', 'Observa los dibujos. Escucha y lee cada palabra. Selecciona la combinación xa, xe o xi que contiene.'),
        groups: [['hexágono', 'xa'], ['boxeo', 'xe'], ['taxi', 'xi'], ['Alexis', 'xi']]
          .map(([text, answer]) => ({ ...pic(text), answer, options: ['xa', 'xe', 'xi'].map(syllable) })),
      },
      present('combinaciones-inversas', 214, 'Escucha y repite ox, ax, ex, ix y ux. Ahora escucha las palabras externo, excavar y extraño.',
        [...['ox', 'ax', 'ex', 'ix', 'ux'].map(syllable), ...words(['externo', 'excavar', 'extraño'])]),
      present('lectura-palabras', 214, 'Lee las palabras varias veces con tu maestra. Trata de hacerlo cada vez más rápido. Puedes escuchar cada palabra.',
        words(['examen', 'experimento', 'texto', 'explosión', 'excursión', 'asfixia', 'tórax', 'extraviar', 'sexto', 'auxilio', 'éxito', 'excusa'])),
      ...[matchingWords.slice(0, 4), matchingWords.slice(4)].map((values, index) => ({
        id: `palabras-iguales-${index + 1}`, page: 216, type: 'match',
        instruction: instruction('palabras-iguales', 'Lee las palabras junto a tu maestra. Después, selecciona la palabra igual en cada recuadro.'),
        groups: values.map((text) => {
          const start = matchingWords.indexOf(text)
          const distractors = [matchingWords[(start + 1) % matchingWords.length], matchingWords[(start + 3) % matchingWords.length]]
          return { ...word(text), answer: word(text).id, options: words(matchingOptions.filter((value) => value === text || distractors.includes(value))) }
        }),
      })),
    ] },
    { id: 'final', title: 'Escuchamos y formamos oraciones', exercises: [
      select('dictado', 216, 'Escucha la palabra del dictado. Selecciona la palabra que escuchaste.',
        words(matchingOptions), ['xilote'], { prompt: word('xilote'), hideWord: true }),
      ...sentences.map(([id, blank, full, options]) => select(`oracion-${id}`, 216,
        'Escucha y lee la oración. Complétala con una palabra del recuadro. Si no sabes qué significa alguna palabra, pregúntale a tu maestra.',
        words(options), [id], {
          prompt: { id: `oracion-${id}`, label: blank, listenLabel: 'la oración', audio: audio(`oracion-${id}`, blank.replace('____', '...'), 'Oraciones') },
          resultAudio: audio(`oracion-completa-${id}`, full, 'Oraciones'),
        })),
      { id: 'crear-oraciones', page: 216, type: 'oral', practiceLabel: 'Ya dije mis tres oraciones',
        instruction: instruction('crear-oraciones', 'Observa las tres imágenes. Di a tu maestra una oración con cada una: xilófono, taxi y examen.'),
        items: ['xilófono', 'taxi', 'examen'].map(pic),
      },
    ] },
  ],
}
