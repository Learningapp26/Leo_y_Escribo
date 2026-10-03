import { createBookContent } from './bookLessonHelpers.js'

const { audio, word, syllable, instruction, select, present, order } = createBookContent('rr')

// Solo se reutilizan ilustraciones locales que representan exactamente la palabra.
const illustratedWord = (text, image) => ({ ...word(text), image })
const rrSyllables = ['rro', 'rra', 'rre', 'rri', 'rru'].map(syllable)

const paragraphs = [
  'Ricardo regresó a la casa donde vivió de niño, después de muchos años. Su mamá lo recibió como siempre, con un fuerte abrazo.',
  'Cuando llegó a su cuarto, del ropero sacó una caja. Adentro había un carro de madera. Se sentó y recordó el día que se lo dio su papá, envuelto en papel de regalo. Su papá era carpintero y se lo había tallado con sus propias manos.',
  'Su hermana Rosita llegó a saludarlo. Al verlo con el carro en la mano le dijo:',
  '—Me acuerdo cuando jugábamos con ese carrito. Lo dejábamos caer desde un volcán de tierra.',
  '—Sí, Rosita. ¿Te acordás cuando se me rompió la llanta?',
  '—¡Sí, no parabas de llorar!, pero papá pronto te lo arregló. Quedó como nuevo.',
  '—Me acuerdo. ¡Este ha sido el regalo más querido!',
  'Ricardo sacudió el carro y lo volvió a guardar en su caja.',
]

export const rrLesson = {
  id: 'rr', letter: 'RR', unitId: 4, pages: '153–158',
  reading: {
    title: 'El regalo más querido',
    paragraphs,
    instruction: instruction('lectura', 'Ahora es el turno de conocer la doble erre. Presta atención al siguiente relato.'),
    audio: audio('el-regalo-mas-querido', `El regalo más querido\n\n${paragraphs.join('\n\n')}`, 'Historia'),
    image: '/images/lecciones/rr/lectura-rr.png',
    imageAlt: 'Ricardo sostiene su carro de madera mientras Rosita lo acompaña en su antiguo cuarto.',
    questions: [
      '¿Por qué Ricardo regresó a su casa?',
      '¿Por qué su papá le habrá regalado un carro?',
      '¿Por qué el carro de madera es el regalo más querido de Ricardo?',
      '¿Qué regalo te ha gustado más? ¿Por qué?',
      'Piensa en otro final y cuéntaselo a un compañero.',
    ].map((text) => ({ text })),
  },
  feedback: {
    correct: audio('respuesta-correcta', '¡Correcto! Puedes continuar.'),
    retry: audio('intenta-otra-vez', 'Escucha de nuevo e inténtalo otra vez.'),
    completed: audio('felicitacion-final', '¡Terminaste la lección de la doble erre! Vuelve a las lecciones de la Unidad 4.'),
  },
  activities: [
    {
      id: 'sonidos', title: 'Reconozcamos el sonido de RR', exercises: [
        present('sonido-rr', 154, 'Di despacio carro. El sonido que escuchas en la segunda sílaba es /rr/ fuerte. Escucha y repite las palabras.',
          [
            illustratedWord('carro', '/images/lecciones/c/carro.png'),
            word('zorrillo'), word('carretera'), word('terreno'),
          ], {
            prompt: illustratedWord('carro', '/images/lecciones/c/carro.png'),
            sound: audio('sonido-rr', '/rr/ fuerte (sin decir «erre»)', 'Sonidos'),
          }),
        select('sonido-rr-fuerte', 154, 'Toca los dibujos cuyos nombres tienen el sonido /rr/ fuerte.',
          [
            illustratedWord('burro', '/images/lecciones/b/burro.png'),
            illustratedWord('carro', '/images/lecciones/c/carro.png'),
            illustratedWord('perro', '/images/lecciones/q/perro.png'),
            illustratedWord('pera', '/images/lecciones/m/pera.png'),
            illustratedWord('carreta', '/images/lecciones/bl/carreta.png'),
          ], ['carro', 'perro', 'carreta'], { multiple: true }),
        select('rr-o-r-suave', 154, 'Escucha cada palabra. Selecciona las que tienen el sonido /rr/ fuerte en la segunda sílaba.',
          [word('burro'), word('aro'), word('grifo'), word('faro'), word('borrador'), word('gorra'), word('pera'), word('cometa'), word('araña'), word('garra')],
          ['burro', 'grifo', 'borrador', 'gorra', 'garra'], { multiple: true }),
      ],
    },
    {
      id: 'silabas', title: 'La doble RR y sus sílabas', exercises: [
        present('presentar-rr', 155, 'Fíjate en los trazos que representan el sonido fuerte /rr/. Es la rr. La r suena igual que la rr cuando está al inicio de una palabra; la rr siempre va entre dos vocales. Escucha y repite las combinaciones de rr con las vocales.',
          rrSyllables, { letter: 'rr' }),
        present('palabras-rr', 155, 'Observa, escucha y lee las palabras. Busca la sílaba con rr en cada una.',
          [
            illustratedWord('tierra', '/images/lecciones/rr/tierra.svg'),
            illustratedWord('torre', '/images/lecciones/rr/torre.svg'),
            illustratedWord('churro', '/images/lecciones/ch/churro.png'),
            illustratedWord('carrusel', '/images/lecciones/memoria_juego/carrusel.png'),
          ]),
        ...[
          ['barro', 'rro'], ['jarra', 'rra'], ['barrido', 'rri'], ['corre', 'rre'], ['serrucho', 'rru'],
          ['furrito', 'rri'], ['sorre', 'rre'], ['lerro', 'rro'], ['darra', 'rra'], ['burru', 'rru'],
        ].map(([text, answer]) => select(`silaba-${text}`, 155,
          'Lee la palabra. Selecciona la sílaba con rr que aparece en ella.', rrSyllables, [syllable(answer).id], { prompt: word(text) })),
        present('trazo-rr', 156, 'Practica el trazo de la rr. Repasa con tu lápiz la muestra y sigue la plana. Repite el trazo de la rr combinada con cada vocal.',
          rrSyllables),
      ],
    },
    {
      id: 'completar', title: 'Completemos palabras con RR', exercises: [
        ...[
          ['carreta', 'ca__ta', 'rre', '/images/lecciones/bl/carreta.png'],
          ['perrita', 'pe__ta', 'rri', '/images/lecciones/q/perro.png'],
          ['carrera', 'ca__ra', 'rre'],
          ['burro', 'bu__', 'rro', '/images/lecciones/b/burro.png'],
          ['carro', 'ca__', 'rro', '/images/lecciones/c/carro.png'],
          ['jarra', 'ja__', 'rra', '/images/lecciones/j/jarra.png'],
        ].map(([text, pattern, answer, image]) => select(`completar-${text}`, 157,
          'Nombra el dibujo lentamente. Identifica la sílaba con rr y selecciona la que falta para completar la palabra.',
          rrSyllables, [syllable(answer).id], {
            prompt: image ? illustratedWord(text, image) : word(text), hideWord: true, pattern,
          })),
        select('sopa-de-letras', 157, 'Observa las palabras. Selecciona todos los nombres que contienen rr, como en la sopa de letras.',
          [word('forro'), word('barra'), word('perro'), word('barril'), word('correr'), word('turrón')],
          ['forro', 'barra', 'perro', 'barril', 'correr', 'turron'], { multiple: true }),
      ],
    },
    {
      id: 'final', title: 'Palabras y oraciones con RR', exercises: [
        ...[
          ['carro', '/images/lecciones/c/carro.png'],
          ['chorro', '/images/lecciones/ch/chorro.png'],
          ['barrer', '/images/lecciones/b/escoba.png'],
          ['carreta', '/images/lecciones/bl/carreta.png'],
        ].map(([text, image]) => select(`nombre-${text}`, 158,
          'Observa el dibujo y selecciona la palabra que le corresponde.',
          [word('carro'), word('chorro'), word('barrer'), word('carreta')], [word(text).id], {
            prompt: illustratedWord(text, image), hideWord: true,
          })),
        order('rene-torre', 158, ['la', 'René', 'torre.', 'sube', 'a'], 'René sube a la torre.', true),
        {
          id: 'oracion-paisaje', page: 158, type: 'oral', prompt: word('Él toma una foto y mira el paisaje.'),
          instruction: instruction('oracion-paisaje', 'Lee la oración. Escribe o di una oración relacionada con lo que se está contando.'),
        },
      ],
    },
  ],
}
