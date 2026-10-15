import { createBookContent } from './bookLessonHelpers.js'

const { audio, word, syllable, instruction, select, present, order } = createBookContent('gr')
const pic = (text) => word(text, true)
const pics = (values) => values.map(pic)
const words = (values) => values.map((text) => word(text))

// Complete printed story, page 201.
const paragraphs = [
  'En una granja lejana vivían dos hermanos, Ingrid y Gregorio. Ellos ayudaban a sus padres en las tareas de la granja.',
  'Un día, mientras pesaban unos costales de maíz, Gregorio vio unos granos que llamaron su atención. Eran más grandes de lo acostumbrado y de un color amarillo intenso. Se los mostró a Ingrid. Ella le dijo que los guardaran para jugar lotería. Gregorio se los metió a la bolsa y siguió trabajando.',
  'Cuando terminaron, fueron a jugar lotería con los granos de maíz. Ingrid prendió la radio para escuchar música mientras jugaban. Gregorio sacó los granos y los colocó sobre la mesa. Al sonar la melodía pasó algo mágico. Los granos empezaron a moverse al ritmo de la música. Los niños se quedaron asombrados. Ingrid cambió de emisora y los granos de maíz bailaron diferente. Se movían según la música.',
  'Desde ese día, Ingrid y Gregorio bailan junto a sus granos de maíz y se divierten muchísimo.',
]
const tongueTwister = 'Griselda Grajeda\nes una granjera graciosa\nque guarda granos grandes\nen su granero.'
const sequence = [
  ['correr', 'Niños corriendo', 'Un grupo de niños corre.'],
  ['caer', 'Caída', 'Uno de los niños se cae.'],
  ['rodilla', 'Rodilla lastimada', 'El niño se lastima la rodilla.'],
].map(([id, label, text]) => ({ id, label, image: `/images/lecciones/gr/secuencia-${id}.png`, audio: audio(`escena-${id}`, text, 'Secuencia') }))

export const grLesson = {
  id: 'gr', letter: 'Gr', title: 'Combinación Gr', unitId: 5, pages: '201–204', showReadingSource: false,
  centeredItems: true, completionTitle: '¡Terminaste la lección de Gr!',
  reading: {
    title: 'Los granos bailarines', paragraphs,
    instruction: instruction('lectura', 'Aprende otra combinación de letras: la ge y la erre. Escucha la siguiente historia.'),
    audio: audio('los-granos-bailarines', `Los granos bailarines\n\n${paragraphs.join('\n\n')}`, 'Historia'),
    image: '/images/lecciones/gr/lectura-gr.png',
    imageAlt: 'Ingrid y Gregorio observan unos granos de maíz junto a los costales de la granja.',
    questions: [
      '¿Qué le pasó a Ingrid y a Gregorio en esta historia?',
      '¿Qué tareas crees que hacían Ingrid y Gregorio en la granja?',
      '¿Qué parte de la historia te causó asombro?',
      'Cierra los ojos e imagina lo que pasó cuando Ingrid prendió la radio.',
      '¿Te gustaría tener unos granos de maíz bailarines? ¿Qué harías con ellos?',
    ].map((text) => ({ text })),
  },
  feedback: {
    correct: audio('respuesta-correcta', '¡Correcto! Puedes continuar.'),
    retry: audio('intenta-otra-vez', 'Escucha de nuevo e inténtalo otra vez.'),
    completed: audio('felicitacion-final', '¡Terminaste la lección de Gr! Vuelve a las lecciones de la Unidad 5.'),
  },
  activities: [
    { id: 'sonidos', title: 'Sonidos y trabalenguas con Gr', exercises: [
      present('sonido-gr', 202, 'Observa los granos. Escucha sus sonidos despacio y repítelos. La ge y la erre juntas hacen el sonido gr. Escucha y repite las palabras. Di otras palabras con este sonido.',
        words(['gracias', 'gris', 'grumo', 'lágrima', 'suegra', 'bolígrafo']), {
          prompt: pic('granos'), sound: audio('sonido-gr', 'gr', 'Sonidos'), extraAudios: [audio('sonidos-granos', 'g-r-a-n-o-s', 'Sonidos')],
        }),
      select('sonido-inicial', 202, 'Repite el nombre de cada dibujo. Selecciona los que empiezan con el mismo sonido que granos.',
        pics(['helicóptero', 'gradas', 'grillo', 'grapadora']), ['gradas', 'grillo', 'grapadora'], { multiple: true, showOptionLabels: true }),
      present('descubrir-palabras', 202, 'Escucha los sonidos despacio y descubre qué palabra se forma. Repítela. ¿Escuchaste el sonido gr?',
        [['grado', 'gr-a-d-o'], ['alegre', 'a-l-e-gr-e'], ['grupo', 'gr-u-p-o']]
          .map(([text, parts]) => ({ ...word(text), audio: audio(`sonidos-${text}`, `${parts}. ${text}.`, 'Sonidos') }))),
      present('trabalenguas', 202, 'Escucha y repite el trabalenguas. Apréndelo y, en grupo, díganlo tan rápido como puedan.',
        [{ id: 'griselda', label: tongueTwister, audio: audio('trabalenguas-griselda', tongueTwister, 'Trabalenguas') }]),
    ] },
    { id: 'silabas', title: 'Sílabas y palabras con Gr', exercises: [
      present('silabas-gr', 203, 'Observa Gr y gr. La ge y la erre juntas representan el sonido gr. Traza las letras con tu dedo, como indique tu maestra. Escucha y repite las combinaciones con las vocales.',
        ['gro', 'gra', 'gre', 'gri', 'gru'].map(syllable), { letter: 'Gr gr' }),
      present('leer-palabras', 203, 'Observa las imágenes. Escucha y lee las palabras. Encuentra gra, gru, gri y gre.', pics(['grupo', 'granada', 'cangrejo', 'grito'])),
      { id: 'encontrar-silabas', page: 203, type: 'match',
        instruction: instruction('encontrar-silabas', 'Lee y escucha cada palabra. Selecciona la sílaba con gr que contiene.'),
        groups: [ ['grama', ['gri', 'gar', 'gra', 'gre', 'gur'], 'gra'], ['grúa', ['gur', 'gro', 'gor', 'gre', 'gru'], 'gru'],
          ['grasa', ['gar', 'gro', 'gra', 'gur', 'gru'], 'gra'], ['milagro', ['gor', 'gro', 'gar', 'gre', 'gra'], 'gro'],
          ['greña', ['gri', 'ger', 'gra', 'gre', 'gor'], 'gre'], ['gripe', ['gri', 'gro', 'gra', 'gre', 'gru'], 'gri'],
        ].map(([text, options, answer]) => ({ ...word(text), options: options.map(syllable), answer })),
      },
    ] },
    { id: 'final', title: 'Formamos palabras y contamos', exercises: [
      ...[['tigre', ['gre', 'ti']], ['negro', ['gro', 'ne']], ['granja', ['ja', 'gran']]].flatMap(([text, parts]) => [
        { ...order(`separar-${text}`, 204, parts, text), prompt: pic(text),
          instruction: instruction('separar-silabas', 'Lee y escucha la palabra. Selecciona sus sílabas en orden para formarla. Puedes quitar la última para corregir.'),
        },
        { id: `letras-${text}`, page: 204, type: 'order', compactOptions: true, prompt: pic(text),
          instruction: instruction('separar-letras', 'Ahora separa la palabra en letras. Selecciona cada letra en orden. Puedes quitar la última para corregir.'),
          options: [...text].reverse().map((letter, index) => ({ id: `${letter}-${index}`, label: letter, audio: audio(`sonido-${letter}`, letter, 'Sonidos') })),
          answer: text, resultAudio: audio(text, text, 'Palabras'),
        },
      ]),
      { id: 'ordenar-escenas', page: 204, type: 'order', showOptionLabels: true,
        instruction: instruction('ordenar-escenas', 'Observa los dibujos. Selecciónalos en el orden en que sucedieron: primero, después y al final. Puedes quitar el último para corregir.'),
        options: [sequence[2], sequence[0], sequence[1]], answerIds: ['correr', 'caer', 'rodilla'], separator: ' → ',
      },
      { id: 'contar-secuencia', page: 204, type: 'oral', practiceLabel: 'Ya conté lo que pasó',
        instruction: instruction('contar-secuencia', 'Cuenta a tu maestra qué pasó primero, qué sucedió después y cuál fue el final. Di una oración para cada dibujo. Si las escribes, recuerda comenzar con mayúscula y terminar con punto.'),
        items: sequence,
      },
    ] },
  ],
}
