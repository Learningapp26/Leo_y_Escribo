import { createBookContent } from './bookLessonHelpers.js'

const { audio, word, syllable, instruction, select, present, order } = createBookContent('h')
const words = (values) => values.map((value) => word(value))
const illustratedWord = (text, image) => ({ ...word(text), image })

const paragraphs = [
  'Cierta vez, una hormiga andaba buscando alimento y llegó hasta la orilla de un pantano. Quería atravesar el pantano porque del otro lado había visto una canasta con comida.',
  'La hormiga comenzó a cruzar el pantano montada en una hoja. Cuando iba por la mitad del recorrido, sintió que algo la levantó. ¡La hormiga no se había dado cuenta que viajaba sobre el lomo de un hipopótamo!',
  'El hipopótamo se levantó para llegar a la orilla y comer unas hojas. Mientras él comía, la hormiga bajó y llegó a la canasta. Reunió toda la comida que podía cargar. Esperó a que el hipopótamo terminara de comer y volvió al agua con él.',
  'La hormiga quedó muy agradecida por el favor, aunque el hipopótamo no se enteró. Por eso, cada vez que podía, le acercaba algunas hojas que al hipopótamo le gustaba comer.',
  'El hipopótamo pronto notó los regalos de la hormiga. Cuando supo quién se las dejaba, le agradeció. La hormiga le contó la historia del día en que quería cruzar el río y se hicieron muy buenos amigos.',
]

const hSyllables = ['ho', 'ha', 'he', 'hi', 'hu'].map(syllable)

export const hLesson = {
  id: 'h', letter: 'H', unitId: 5, pages: '183–188',
  reading: {
    title: 'La hormiga y el hipopótamo',
    paragraphs,
    instruction: instruction('lectura', 'Hoy aprenderás la letra hache. Escucha el cuento que sigue.'),
    audio: audio('la-hormiga-y-el-hipopotamo', `La hormiga y el hipopótamo\n\n${paragraphs.join('\n\n')}`, 'Historia'),
    image: '/images/lecciones/h/lectura-h.png',
    imageAlt: 'Una hormiga lleva una hoja junto a un hipopótamo amistoso en la orilla de un pantano.',
    questions: [
      '¿En qué lugar o parte del mundo pudo haber ocurrido este cuento?',
      '¿Por qué el hipopótamo no sintió que llevaba una hormiga encima?',
      '¿Qué crees que hubiera hecho el hipopótamo de saber que transportaba a la hormiga?',
      '¿Cuál fue la parte del cuento que más te gustó? ¿Por qué?',
    ].map((text) => ({ text })),
  },
  feedback: {
    correct: audio('respuesta-correcta', '¡Correcto! Puedes continuar.'),
    retry: audio('intenta-otra-vez', 'Escucha de nuevo e inténtalo otra vez.'),
    completed: audio('felicitacion-final', '¡Terminaste la lección de la letra H! Vuelve a las lecciones de la Unidad 5.'),
  },
  activities: [
    {
      id: 'reconocimiento', title: 'Conozcamos la letra H', exercises: [
        present('letra-h', 184, 'Esta es la H mayúscula y la h minúscula. La h es una letra muda: no tiene sonido propio. Al leer una palabra con h, escuchamos el sonido de la vocal que la sigue.',
          [
            illustratedWord('helado', '/images/lecciones/d/helado.png'),
            illustratedWord('hoja', '/images/lecciones/l/hoja.png'),
            word('hilo'),
            word('humo'),
          ], { letter: 'H h' }),
        select('reconocer-h', 184, 'Selecciona todas las palabras que contienen la letra h.',
          words(['hormiga', 'hoja', 'hacha', 'huevo', 'mesa', 'luna']), ['hormiga', 'hoja', 'hacha', 'huevo'], { multiple: true }),
        ...[
          ['búho', 'ho'], ['hacha', 'ha'], ['hamaca', 'ha'], ['cohete', 'he'],
        ].map(([text, answer]) => select(`silaba-${text}`, 184,
          'Lee la palabra y selecciona la sílaba que contiene la letra h.', hSyllables, [syllable(answer).id], { prompt: word(text) })),
      ],
    },
    {
      id: 'silabas', title: 'Separemos palabras en sílabas', exercises: [
        present('silabas-h', 186, 'Lee las palabras y da una palmada por cada sílaba. Después, selecciona las sílabas en orden para formar cada palabra.',
          words(['hola', 'hormiga', 'hermano', 'hijastro', 'harina', 'hada'])),
        ...[
          ['hola', ['la', 'ho']],
          ['hormiga', ['mi', 'hor', 'ga']],
          ['hermano', ['no', 'her', 'ma']],
          ['hijastro', ['jas', 'hi', 'tro']],
          ['harina', ['na', 'ha', 'ri']],
          ['hada', ['da', 'ha']],
        ].map(([answer, pieces]) => order(`formar-${answer}`, 186, pieces, answer)),
        ...[
          ['huevo', '/images/lecciones/cl/huevo.png'],
          ['hoja', '/images/lecciones/l/hoja.png'],
        ].map(([target, image]) => select(`imagen-${target}`, 186,
          'Observa la imagen y selecciona la palabra que le corresponde.',
          words(['hielo', 'huevo', 'hoja']), [target], {
            prompt: illustratedWord(target, image), hideWord: true,
          })),
      ],
    },
    {
      id: 'oraciones', title: 'Palabras y oraciones con H', exercises: [
        select('palabra-hermanos', 187, 'Selecciona la palabra que nombra a dos niños o niñas de la misma familia.',
          words(['hermanos', 'hormiga', 'habas', 'Homero']), ['hermanos']),
        select('palabra-habas', 187, 'Selecciona la palabra que nombra una comida.',
          words(['Homero', 'hormiga', 'habas', 'hermanos']), ['habas']),
        order('hugo-habas', 187, ['habas.', 'Mi', 'y', 'Hugo', 'hermana', 'comen'], 'Mi hermana y Hugo comen habas.', true),
        order('hector-hotel', 187, ['hotel.', 'Hilda', 'Héctor', 'trabajan', 'en', 'el', 'y'], 'Hilda y Héctor trabajan en el hotel.', true),
        order('humo-hormigas', 187, ['hormigas.', 'El', 'a', 'humo', 'las', 'espantó'], 'El humo espantó a las hormigas.', true),
      ],
    },
    {
      id: 'practica', title: 'Leamos palabras con H', exercises: [
        present('leer-palabras-h', 188, 'Escucha y lee estas palabras. La h puede estar al inicio o en medio de una palabra, pero no tiene sonido propio.',
          words(['hambre', 'harina', 'herido', 'hormiga', 'hipopótamo', 'hielo', 'búho', 'moho', 'ahijado', 'hueso'])),
        select('h-inicial', 188, 'Selecciona las palabras que empiezan con h.',
          words(['hambre', 'hielo', 'búho', 'moho', 'hueso', 'ahijado']), ['hambre', 'hielo', 'hueso'], { multiple: true }),
        select('h-en-medio', 188, 'Selecciona las palabras que tienen la letra h en medio.',
          words(['ahijado', 'búho', 'moho', 'harina', 'hormiga']), ['ahijado', 'buho', 'moho'], { multiple: true }),
      ],
    },
  ],
}
