import { createBookContent } from './bookLessonHelpers.js'

const { audio, word, syllable, instruction, select, present } = createBookContent('fr')
const pic = (text) => word(text, true)
const paragraphs = [
  'Frida tenía un perro llamado Rufo. Un día, a Frida se le ocurrió llevárselo al mercado.',
  'Frida no había notado que a su perro le gustaban mucho las frutas. Al entrar al mercado, Rufo se puso muy inquieto. Brincaba y ladraba. Al pasar por una venta de fresas, manzanas y naranjas, Rufo se tiró encima de los canastos.',
  '¡Oooh Rufo, qué haces! Dijo Frida asustada. Lo jaló de su correa.',
  'El perro ladraba e insistía en ir hacia la fruta.',
  'La mamá de Frida se había quedado comprando carne. Al oír los ladridos llegó rápido. Le pidió a Frida que sacara a Rufo del mercado. Ella se quedó recogiendo la fruta.',
  'Para compensar a la señora, la mamá de Frida le compró naranjas, manzanas y fresas. Al salir del mercado, Rufo olfateó las frutas. Empezó a brincar y a ladrar. La mamá de Frida tomó unas fresas y se las dio. Rufo se las comió muy contento. ¡Solo así se calmó!',
]
const tongueTwister = 'Francisco Freña disfruta tomar\nfresco de fresa y frambuesa.\nAdemás, disfruta sacar\nfruta fría del refrigerador.\n\nCon la fruta y el fresco\nFrancisco Freña se refresca.'
const syllables = ['fro', 'fra', 'fre', 'fri', 'fru'].map(syllable)
const sequence = [
  ['pelar', 'Pelar el plátano', 'Un hombre pela un plátano.'],
  ['aceite', 'Agregar aceite', 'El hombre agrega aceite a la sartén.'],
  ['freir', 'Freír el plátano', 'El hombre fríe los plátanos.'],
  ['comer', 'Compartir la comida', 'El hombre comparte la comida con dos niños.'],
].map(([id, label, text]) => ({ id, label, image: `/images/lecciones/fr/secuencia-${id}.png`, audio: audio(`escena-${id}`, text, 'Secuencia') }))
// All twelve printed words, in three short groups; no vocabulary substitutions.
const wordGroups = [
  [['frente', 'fre'], ['frazada', 'fra'], ['Francisco', 'fra'], ['fraile', 'fra']],
  [['fracaso', 'fra'], ['enfrentar', 'fre'], ['azufre', 'fre'], ['disfrutar', 'fru']],
  [['sufrimiento', 'fri'], ['fraterno', 'fra'], ['enfriar', 'fri'], ['frenazo', 'fre']],
]

export const frLesson = {
  id: 'fr', letter: 'Fr', title: 'Combinación Fr', unitId: 6, pages: '231–234',
  showReadingSource: false, centeredItems: true, completionTitle: '¡Terminaste la lección de Fr!',
  reading: {
    title: 'Rufo y la venta de frutas', paragraphs,
    instruction: instruction('lectura', 'Aprende otra combinación de letras: la efe con la erre. Escucha una nueva historia.'),
    audio: audio('rufo-y-la-venta-de-frutas', `Rufo y la venta de frutas\n\n${paragraphs.join('\n\n')}`, 'Historia'),
    image: '/images/lecciones/fr/lectura-fr.png',
    imageAlt: 'Frida sujeta la correa de Rufo junto a los canastos de frutas de una vendedora del mercado.',
    questions: [
      '¿Por qué razón crees que Frida se llevó a Rufo al mercado?',
      '¿Qué hubieras hecho tú en el lugar de Frida?',
      '¿Por qué Frida no sabía que a Rufo le gustaban las frutas?',
      '¿Cuál es tu fruta preferida?',
    ].map((text) => ({ text })),
  },
  feedback: {
    correct: audio('respuesta-correcta', '¡Correcto! Puedes continuar.'),
    retry: audio('intenta-otra-vez', 'Escucha de nuevo e inténtalo otra vez.'),
    completed: audio('felicitacion-final', '¡Terminaste la lección de Fr! Vuelve a las lecciones de la Unidad 6.'),
  },
  activities: [
    { id: 'sonidos', title: 'Sonidos y trabalenguas con Fr', exercises: [
      present('sonido-fr', 232, 'Observa las frutas. Repite sus primeros sonidos: f y r. Ahora más rápido: fr. Escucha y repite las palabras. Di otras palabras que tengan el sonido fr.',
        ['fresco', 'frío', 'fruto', 'cofrade', 'disfraz'].map((text) => word(text)), {
          prompt: pic('frutas'), sound: audio('sonido-fr', 'fr', 'Sonidos'),
          extraAudios: [audio('sonidos-frutas', 'f-r. fr. fr-u-t-a-s. frutas.', 'Sonidos')],
        }),
      select('reconocer-fr', 232, 'Repite en voz alta el nombre de cada dibujo. Selecciona todos los que tengan el sonido fr en alguna parte.',
        [pic('fresa'), { ...word('olla'), image: '/images/lecciones/br/olla.png' }, pic('cofre'), pic('frasco')],
        ['fresa', 'cofre', 'frasco'], { multiple: true, showOptionLabels: true }),
      present('descubrir-palabras', 232, 'Escucha los sonidos y descubre qué palabra se forma. ¿Escuchaste el sonido fr? Después, juega con un compañero: di los sonidos de una palabra para que descubra cuál es. Tomen turnos.',
        [['frío', 'fr-í-o'], ['frito', 'fr-i-t-o'], ['freno', 'fr-e-n-o']]
          .map(([text, parts]) => ({ ...word(text), audio: audio(`sonidos-${word(text).id}`, `${parts}. ${text}.`, 'Sonidos') }))),
      present('trabalenguas', 232, 'Escucha y repite el trabalenguas. Apréndelo y dilo rápido.',
        [{ id: 'francisco-frenia', label: tongueTwister, audio: audio('trabalenguas-francisco-frenia', tongueTwister, 'Trabalenguas') }]),
    ] },
    { id: 'silabas', title: 'Sílabas y palabras con Fr', exercises: [
      present('silabas-fr', 233, 'Fíjate en la efe y la erre juntas. Traza las letras con tu dedo, como indique tu maestra. Escucha y repite las combinaciones con las vocales.',
        syllables, { letter: 'Fr', prompt: pic('frutas') }),
      { id: 'silabas-dibujos', page: 233, type: 'match',
        instruction: instruction('silabas-dibujos', 'Observa las imágenes. Escucha y lee cada palabra. Selecciona la combinación con fr que contiene.'),
        groups: [['frambuesa', 'fra'], ['fresco', 'fre'], ['frijoles', 'fri'], ['frotar', 'fro']]
          .map(([text, answer]) => ({ ...pic(text), answer, options: ['fro', 'fra', 'fri', 'fre'].map(syllable) })),
      },
      ...wordGroups.map((group, index) => ({ id: `encontrar-silabas-${index + 1}`, page: 233, type: 'match',
        instruction: instruction('encontrar-silabas', 'Lee y escucha cada palabra. Selecciona fro, fre, fra, fri o fru según la combinación que contiene. Conversa sobre su significado con tu compañero o tu maestra. Di una oración con las palabras nuevas.'),
        groups: group.map(([text, answer]) => ({ ...word(text), answer, options: syllables })),
      })),
    ] },
    { id: 'final', title: 'Ordenamos y contamos', exercises: [
      { id: 'ordenar-escenas', page: 234, type: 'order', showOptionLabels: true, optionLayout: 'pairs',
        instruction: instruction('ordenar-escenas', 'Observa los dibujos. Selecciónalos en el orden en que sucedieron: primero, luego, después y al final. Puedes quitar el último para corregir.'),
        options: [sequence[2], sequence[0], sequence[3], sequence[1]],
        answerIds: sequence.map((item) => item.id), separator: ' → ',
      },
      { id: 'contar-secuencia', page: 234, type: 'oral', record: true, practiceLabel: 'Ya conté lo que pasó',
        instruction: instruction('contar-secuencia', 'Cuenta qué sucedió primero, luego, después y al final. Di una oración para cada dibujo. Puedes grabarte y escucharte. Si escribes tus oraciones, recuerda que comienzan con mayúscula y terminan con punto.'),
        items: sequence,
      },
    ] },
  ],
}
