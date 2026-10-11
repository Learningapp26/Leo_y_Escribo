import { createBookContent } from './bookLessonHelpers.js'

const { audio, word, syllable, instruction, select, present } = createBookContent('dr')
const words = (values, illustrated = false) => values.map((value) => word(value, illustrated))

// Printed text, pages 171–174. The open ending is intentional in the book.
const paragraphs = [
  'Cuentan algunas leyendas que, en un país lejano, existió un dragón volador. ¿Puedes imaginar cómo se veía? Dicen que era muy grande, con dos alas enormes, una larga cola que terminaba con una punta en forma de flecha. Aunque de su boca salía fuego, tenía un gran corazón.',
  'Cuentan que el dragón protegía a los pobladores del lugar. Si alguien quería atacarlos, el dragón lanzaba fuego y lo asustaba. Durante muchos años, él los cuidó. La gente del lugar lo alimentó y dejó que viviera en el pueblo.',
  'Pasaron los años y el dragón envejeció. Ya no era capaz de volar como antes, pero su corazón seguía siendo bondadoso. Se pasaba la mayor parte del tiempo en tierra, divirtiendo a los niños y niñas que lo trepaban para luego resbalarse por su cola. Un día, el dragón se enfermó, no comía y ya no jugaba. Entonces los niños...',
]
const tongueTwisters = [
  ['picapedrero', 'El picapedrero,\npicapedreando va,\ny sin parar,\npica que pica la piedra está.'],
  ['dragon', 'El dragón drena que drena está,\ndrena hasta la madrugada,\ndrenando el drenaje va.'],
].map(([id, text]) => ({ id, label: text, audio: audio(`trabalenguas-${id}`, text, 'Trabalenguas') }))

export const drLesson = {
  id: 'dr', letter: 'Dr', title: 'Combinación Dr', unitId: 5, pages: '171–174',
  showReadingSource: false,
  completionTitle: '¡Terminaste la lección de Dr!',
  reading: {
    title: 'El dragón volador', paragraphs,
    instruction: instruction('lectura', 'Aprende otra combinación de letras: la de y la erre. Escucha un interesante relato, a continuación.'),
    audio: audio('el-dragon-volador', `El dragón volador\n\n${paragraphs.join('\n\n')}`, 'Historia'),
    image: '/images/lecciones/dr/lectura-dr.png',
    imageAlt: 'Un dragón verde de grandes alas juega con los niños del pueblo, que trepan sobre él y se deslizan por su cola.',
    questions: [
      { text: 'El relato del dragón quedó incompleto. Le falta el final. ¿Cómo quieres que termine? Forma un equipo con tres compañeros e inventen un final para el relato del dragón.' },
      { text: 'Dibuja en una hoja el final.' },
    ],
  },
  feedback: {
    correct: audio('respuesta-correcta', '¡Correcto! Puedes continuar.'),
    retry: audio('intenta-otra-vez', 'Escucha de nuevo e inténtalo otra vez.'),
    completed: audio('felicitacion-final', '¡Terminaste la lección de Dr! Vuelve a las lecciones de la Unidad 5.'),
  },
  activities: [
    { id: 'sonidos', title: 'Sonidos y trabalenguas con Dr', exercises: [
      present('sonido-dr', 172, 'Observa el dragón. Escucha sus sonidos despacio y repítelos. La de y la erre juntas suenan dr. Escucha y repite las palabras. Di otras palabras con este sonido.',
        words(['podrido', 'ladrón', 'madrina', 'padrino']), {
          prompt: word('dragón', true),
          sound: audio('sonido-dr', 'dr', 'Sonidos'),
          extraAudios: [audio('sonidos-dragon', 'd-r-a-g-ó-n', 'Sonidos')],
        }),
      select('reconocer-dr', 172, 'Repite el nombre de cada figura. Selecciona los dibujos que tengan el sonido dr en alguna parte.',
        words(['cuadro', 'piedra', 'martillo', 'ladrillo'], true), ['cuadro', 'piedra', 'ladrillo'], { multiple: true, showOptionLabels: true }),
      present('pronunciar-sonidos', 172, 'Escucha y repite cada sonido. Después di la palabra más rápido. Aplaude cuando escuches dr.',
        ['ladrar', 'madre', 'padre'].map((text) => ({
          ...word(text),
          audio: audio(`sonidos-${text}`, text === 'ladrar' ? 'l-a-dr-a-r. Ladrar.' : text === 'madre' ? 'm-a-dr-e. Madre.' : 'p-a-dr-e. Padre.', 'Sonidos'),
        }))),
      present('trabalenguas', 172, 'Escucha y repite los trabalenguas. Apréndelos y, en grupo, declama frente a la clase.', tongueTwisters),
    ] },
    { id: 'silabas', title: 'Sílabas y palabras con Dr', exercises: [
      present('silabas-dr', 173, 'Estas son las letras d y r juntas. Observa Dr y dr. Escucha y repite las combinaciones con las vocales.',
        ['dro', 'dra', 'dre', 'dri', 'dru'].map(syllable), { letter: 'Dr dr' }),
      present('leer-palabras', 173, 'Observa las imágenes. Escucha y lee las palabras. Señala dónde aparecen dra, dre, dri y dro.',
        words(['almendra', 'ajedrez', 'cocodrilo', 'ladrón'], true)),
      ...[
        ['dro', ['comadrona', 'Pedro']],
        ['dre', ['compadre', 'compadre']],
        ['dra', ['drástico', 'dramático']],
        ['dri', ['madrileña', 'padrino']],
        ['dru', ['pedrusco', 'cuádruple']],
      ].map(([target, matching]) => select(`asociar-${target}`, 173,
        `Escucha y lee las palabras. Selecciona las que contienen ${target}.`,
        // The book repeats compadre in both columns; one selectable card suffices.
        words([...new Set([...matching, ...({ dro: ['compadre', 'padrino'], dre: ['Pedro', 'pedrusco'], dra: ['padrino', 'compadre'], dri: ['dramático', 'comadrona'], dru: ['drástico', 'Pedro'] }[target])])]),
        words([...new Set(matching)]).map((item) => item.id), { multiple: true, prompt: syllable(target) })),
    ] },
    { id: 'final', title: 'Formemos palabras y oraciones', exercises: [
      ...['madre', 'piedra'].map((text) => ({
        id: `formar-${text}`, page: 174, type: 'order', compactOptions: true,
        instruction: instruction('formar-palabra', 'Escucha el sonido de cada letra. Selecciona las letras en orden para formar la palabra. Después léela. Puedes quitar la última letra para corregir.'),
        options: [...text].map((letter, index) => ({ id: `${letter}-${index}`, label: letter, audio: audio(`sonido-${letter}`, letter, 'Sonidos') })),
        answer: text, separator: '', resultAudio: audio(text, text, 'Palabras'),
      })),
      {
        id: 'crear-oracion', page: 174, type: 'oral',
        instruction: instruction('crear-oracion', 'Lee y escucha las palabras. Escoge una de cada recuadro y forma una oración. Dila en voz alta a tu maestra. Si la escribes, recuerda iniciar con mayúscula y terminar con un punto.'),
        groups: [
          { id: 'personaje', label: 'Primer recuadro', options: words(['dragón', 'perro', 'cocodrilo']) },
          { id: 'cualidad', label: 'Segundo recuadro', options: words(['alto', 'rápido', 'fuerte']) },
          { id: 'accion', label: 'Tercer recuadro', options: words(['ladra', 'nada', 'vuela']) },
        ],
      },
    ] },
  ],
}
