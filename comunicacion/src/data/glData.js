import { createBookContent } from './bookLessonHelpers.js'

const { audio, word, syllable, instruction, select, present, order } = createBookContent('gl')

// Every printed drawing points to public/images/lecciones/gl/<palabra>.png.
const pic = (text) => word(text, true)
const pics = (values) => values.map(pic)
const words = (values) => values.map((value) => word(value))
const spoken = (text, parts) => ({ ...pic(text), audio: audio(`sonidos-${word(text).id}`, `${parts}. ${text[0].toUpperCase()}${text.slice(1)}.`, 'Sonidos') })

// Printed text, pages 205–208.
const paragraphs = [
  'Un globo azul fue inflado por un vendedor de globos. Ese globo era diferente a los demás, se veía más grande y hermoso. Pronto, una niña que iba con su mamá, lo compró.',
  'Iba la niña con su globo, cuando llegó un fuerte viento y se lo arrebató de las manos. El globo azul empezó a subir por el cielo. La mamá de la niña le dijo: no estés triste, te compraré otro.',
  'El globo azul voló sobre un campo de fútbol. Ahí, unos niños quisieron reventarlo y le lanzaron piedras, pero el viento lo elevó y nada malo le ocurrió.',
  'Pasó sobre un campo de siembras. Los sembradores lo vieron hasta que se alejó. El viento lo llevó hasta una pequeña aldea, donde jugaban unos niños. Ellos, al verlo, corrieron tras él. Cuando pasó por una arboleda, se atoró. Los niños treparon a los árboles y lo agarraron. ¡Qué felicidad! ¡Todos querían jugar con el globo azul! Nunca antes habían visto un globo tan hermoso. Era un regalo del viento.',
]

const tongueTwisters = [
  ['gladis', 'Gladis infla globos.\nArregla un arreglo\nde globos y gladiolas.'],
  ['gloria', 'A Gloria le gustan\nlos globos y gladiolas\ndel arreglo de Gladis.'],
].map(([id, text]) => ({ id, label: text, audio: audio(`trabalenguas-${id}`, text, 'Trabalenguas') }))

const text207Combinations = 'Lee la palabra. Selecciona la combinación glo, gle, gla o glu que contiene. Mira el ejemplo.'
const text208Syllables = 'Lee la palabra. Selecciona sus sílabas en orden para dividirla. Puedes quitar la última sílaba para corregir.'
const text208Replace = 'Cambia la sílaba con gl por otra y forma una nueva palabra. Selecciona la palabra nueva.'
const text208Sentences = 'Lee y escucha la oración. Complétala con una de las palabras del recuadro.'

// Page 208 sentences: [blank sentence, full sentence, box options, answer].
const sentences = [
  ['jungla', 'Los monos pasean en la ____.', 'Los monos pasean en la jungla.', ['laguna', 'jungla']],
  ['regla', 'Glenda dejó su ____ sobre la mesa.', 'Glenda dejó su regla sobre la mesa.', ['cama', 'regla']],
  ['globo', 'Gladis compró un ____ en el parque.', 'Gladis compró un globo en el parque.', ['globo', 'jarabe']],
  ['gladiolas', 'En el jardín hay muchas ____.', 'En el jardín hay muchas gladiolas.', ['goteras', 'gladiolas']],
]

export const glLesson = {
  id: 'gl', letter: 'Gl', title: 'Combinación GL', unitId: 5, pages: '205–208',
  showReadingSource: false,
  completionTitle: '¡Terminaste la lección de Gl!',
  reading: {
    title: 'El globo azul', paragraphs,
    instruction: instruction('lectura', 'Llega el turno de otra combinación de letras: la ge y la ele. Escucha una nueva historia.'),
    audio: audio('el-globo-azul', `El globo azul\n\n${paragraphs.join('\n\n')}`, 'Historia'),
    image: '/images/lecciones/gl/lectura-gl.png',
    imageAlt: 'Cuatro niños juegan en un campo verde y alzan las manos para alcanzar un gran globo azul.',
    questions: [
      '¿Qué otro título le pondrías a la historia?',
      '¿Qué hubiera pasado si el globo no se atora entre los árboles?',
      '¿Recuerdas lo que le pasó al globo desde que el viento lo arrebató de las manos de la niña?',
      '¿Qué te pareció el final de la historia? Inventa otro final.',
    ].map((text) => ({ text })),
  },
  feedback: {
    correct: audio('respuesta-correcta', '¡Correcto! Puedes continuar.'),
    retry: audio('intenta-otra-vez', 'Escucha de nuevo e inténtalo otra vez.'),
    completed: audio('felicitacion-final', '¡Terminaste la lección de Gl! Vuelve a las lecciones de la Unidad 5.'),
  },
  activities: [
    { id: 'sonidos', title: 'Sonidos y trabalenguas con Gl', exercises: [
      present('sonido-gl', 206, '¿Qué dibujo aparece al lado? Nombra cada sonido despacio: g-l-o-b-o. ¿Cuáles son los primeros sonidos que escuchas? Son los sonidos g y l. Repítelo varias veces. Ahora más rápido, g y l juntos hacen el sonido gl. Escucha y repite las siguientes palabras. Di otras palabras que tengan el sonido gl.',
        // Words that can be drawn, so the child recognizes them by the picture.
        [spoken('jungla', 'jun-gla'), spoken('glaciar', 'gla-ciar'), spoken('globo terráqueo', 'glo-bo te-rrá-que-o'), spoken('gladiola', 'gla-dio-la')], {
          prompt: pic('globo'),
          sound: audio('sonido-gl', 'gl', 'Sonidos'),
          extraAudios: [audio('sonidos-globo', 'g-l-o-b-o', 'Sonidos')],
        }),
      select('reconocer-gl', 206, 'Repite en voz alta lo que muestra cada dibujo. Selecciona las figuras que lleven el sonido gl, como la palabra globo, en alguna parte.',
        pics(['regla', 'iglú', 'martillo', 'iglesia']), ['regla', 'iglu', 'iglesia'], { multiple: true, showOptionLabels: true }),
      select('juega-sonidos', 206, '¡Juega con los sonidos! Escucha las palabras. Selecciona solamente las que tengan el sonido gl.',
        words(['glotón', 'guante', 'arreglo', 'ganancia', 'reglamento', 'mango', 'glosario']),
        ['gloton', 'arreglo', 'reglamento', 'glosario'], { multiple: true }),
      present('trabalenguas', 206, 'Repite el trabalenguas. Apréndelo y dilo tan rápido como puedas.', tongueTwisters),
    ] },
    { id: 'silabas', title: 'Sílabas y palabras con Gl', exercises: [
      present('silabas-gl', 207, 'Fíjate en las letras que representan el sonido gl, son la g y la l juntas. Realiza el trazo en diferentes superficies, según indique tu maestra o maestro. Repite las combinaciones de las letras gl con las vocales.',
        ['glo', 'gla', 'gle', 'gli', 'glu'].map(syllable), { letter: 'Gl gl', prompt: pic('globo') }),
      present('leer-palabras', 207, 'Observa las siguientes imágenes. Trata de leer las palabras que aparecen debajo. Fíjate en gla, glu, gli y gle.',
        pics(['gladiola', 'glifo', 'iglú', 'iglesia'])),
      ...[
        ['glotón', ['glo', 'gla'], 'glo'], ['aglutinar', ['gle', 'glu'], 'glu'], ['manglares', ['gla', 'glo'], 'gla'],
        ['Glenda', ['gle', 'gli'], 'gle'], ['jungla', ['glu', 'gla'], 'gla'],
      ].map(([text, pair, answer]) => select(`combinacion-${word(text).id}`, 207, text207Combinations,
        pair.map(syllable), [answer], { prompt: word(text), pattern: 'Ejemplo: arregla → gla' })),
    ] },
    { id: 'final', title: 'Sílabas y oraciones con Gl', exercises: [
      present('ejemplo-glifo', 208, 'Mira el ejemplo. La palabra glifo se divide en dos sílabas: gli y fo. Si cambiamos gli por ri, se forma una nueva palabra: rifo.',
        [{ id: 'glifo-rifo', label: 'gli · fo → rifo', image: pic('glifo').image, audio: audio('ejemplo-glifo', 'gli, fo. Glifo. Si cambiamos gli por ri, se forma rifo.', 'Palabras') }]),
      ...[
        ['glotón', ['tón', 'glo'], ['botón', 'gloria', 'globo'], 'boton'],
        ['jungla', ['gla', 'jun'], ['junta', 'jarabe', 'gladiola'], 'junta'],
      ].flatMap(([text, pieces, replacements, answer]) => [
        { ...order(`dividir-${word(text).id}`, 208, pieces, text), instruction: instruction('dividir-silabas', text208Syllables) },
        select(`sustituir-${word(text).id}`, 208, text208Replace, words(replacements), [answer], { prompt: word(text) }),
      ]),
      ...sentences.map(([id, blank, full, options]) => select(`oracion-${id}`, 208, text208Sentences,
        words(options), [word(id).id], {
          prompt: { id: `oracion-${id}`, label: blank, listenLabel: 'la oración', audio: audio(`oracion-${id}`, blank.replace('____', '...'), 'Oraciones') },
          resultAudio: audio(`oracion-completa-${id}`, full, 'Oraciones'),
          ...(id === 'jungla' ? { pattern: 'Ejemplo: Mi primo arregló mi juguete.' } : {}),
        })),
    ] },
  ],
}
