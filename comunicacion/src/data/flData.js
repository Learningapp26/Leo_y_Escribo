import { createBookContent } from './bookLessonHelpers.js'

// MINEDUC, Leo y escribo, Paso 2, sexta edición (2026), pp. 235–238.
// El libro autoriza reproducción no comercial con atribución; véase docs/leccion-fl.md.
const { audio, word, syllable, instruction, select, present } = createBookContent('fl')
const pic = (text) => word(text, true)
const words = (values) => values.map((text) => word(text))
const paragraphs = [
  'Estaban unas niñas y un niño jugando a la orilla de un río, cuando, de repente, vieron que algo brillaba en el agua. Florinda, quien nadaba muy bien, se metió al río. Nadó hacia el objeto brillante que flotaba trabado en una rama. Lo llevó a la orilla.',
  'Alex y Yoli se acercaron para ver qué era. Florinda les mostró: ¡era una flauta de metal!',
  '—¡Qué bonita! —dijo Yoli.',
  '—¡Nunca había visto una flauta de metal! ¿Cómo habrá llegado al río? —se preguntó Alex.',
  '—No lo sé —respondió Florinda—. Ahora esta flauta es nuestra porque estaba flotando y la rescatamos.',
  'Los niños, muy contentos, se llevaron la flauta a su casa. Al día siguiente llevaron el instrumento a la escuela, querían que su profesor les enseñara a tocar la flauta. Él, curioso, preguntó dónde la habían encontrado y los niños le contaron.',
  'La música que salía de la flauta era muy bonita. Florinda aprendió a tocarla. Los niños decidieron formar un coro y su música se hizo famosa por toda la región.',
]
const tongueTwister = 'Floridalma Flores\ntiene una floristería\ncon toda clase de flores.\n\nEn la floristería de Floridalma,\ntodas las flores\nestán en floreros floreados.'
const floryText = 'Mi hermana Flory es muy flaca.\nLe regalaron un vestido floreado.\nAl probárselo, le quedó flojo.\nElla arregló el vestido floreado.\nAhora no le queda flojo.\n¡Se ve muy linda!'
const syllables = ['flo', 'fla', 'fle', 'fli', 'flu'].map(syllable)
const wordGroups = [
  [['inflar', 'fla'], ['flan', 'fla'], ['coliflor', 'flo'], ['chiflido', 'fli'], ['floreado', 'flo']],
  [['flotador', 'flo'], ['inflamado', 'fla'], ['influenza', 'flu'], ['conflicto', 'fli'], ['reflector', 'fle']],
]
const sentenceGroups = [
  [['nombre', 'Mi hermana ____ es muy flaca.', 'Mi hermana Flory es muy flaca.', ['Flory', 'Yoli', 'Florinda'], 'Flory'],
    ['descripcion', 'Mi hermana Flory es muy ____.', 'Mi hermana Flory es muy flaca.', ['floja', 'flaca', 'floreada'], 'flaca']],
  [['regalo', 'Le ____ un vestido floreado.', 'Le regalaron un vestido floreado.', ['arregló', 'quedó', 'regalaron'], 'regalaron'],
    ['vestido', 'Le regalaron un vestido ____.', 'Le regalaron un vestido floreado.', ['floreado', 'inflamado', 'flotante'], 'floreado']],
  [['probar', 'Al probárselo, le quedó ____.', 'Al probárselo, le quedó flojo.', ['flaco', 'flojo', 'lindo'], 'flojo']],
  [['arreglo', 'Ella ____ el vestido floreado.', 'Ella arregló el vestido floreado.', ['regalaron', 'probárselo', 'arregló'], 'arregló'],
    ['estampado', 'Ella arregló el vestido ____.', 'Ella arregló el vestido floreado.', ['flaco', 'floreado', 'flojo'], 'floreado']],
  [['resultado', 'Ahora no le queda ____.', 'Ahora no le queda flojo.', ['flojo', 'floreado', 'flaca'], 'flojo']],
  [['final', '¡Se ve muy ____!', '¡Se ve muy linda!', ['flaca', 'floja', 'linda'], 'linda']],
]

export const flLesson = {
  id: 'fl', letter: 'Fl', title: 'Combinación fl', heading: 'Combinación fl',
  unitId: 6, pages: '235–238', centeredItems: true,
  completionTitle: '¡Terminaste la lección de la combinación fl!',
  reading: {
    source: 'Fuente: Ministerio de Educación de Guatemala (Mineduc), Leo y escribo, Paso 2, páginas 235–238. Adaptación educativa no comercial.',
    title: 'La flauta flotante', paragraphs,
    instruction: instruction('lectura', 'Ahora toca el turno de aprender otra combinación: la efe con la ele. Escucha la siguiente historia.'),
    audio: audio('la-flauta-flotante', `La flauta flotante\n\n${paragraphs.join('\n\n')}`, 'Historia'),
    image: '/images/lecciones/fl/lectura-fl.png',
    imageAlt: 'Florinda sostiene una flauta junto al río mientras Alex y Yoli se acercan.',
    questions: [
      '¿Qué otro título darías a esta historia?',
      '¿Por qué flotaba la flauta en el río?',
      '¿Por qué el profesor les preguntó dónde hallaron la flauta?',
      '¿Cómo continuarías la historia?',
      '¿Alguna vez te has encontrado algo? Comparte.',
    ].map((text, index) => ({ text, audio: audio(`pregunta-${index + 1}`, text, 'Preguntas') })),
  },
  feedback: {
    correct: audio('respuesta-correcta', '¡Correcto! Puedes continuar.'),
    retry: audio('intenta-otra-vez', 'Escucha de nuevo e inténtalo otra vez.'),
    completed: audio('felicitacion-final', '¡Terminaste la lección de la combinación fl! Vuelve a las lecciones de la Unidad 6.'),
  },
  activities: [
    { id: 'sonidos', title: 'Conocemos Fl y fl', exercises: [
      present('presentar-fl', 236, 'Observa Fl y fl. Son la efe y la ele juntas. Pronuncia f y l despacio y luego juntas: fl. Escucha y repite: flo-re-ro, flo-tar, in-flar, fle-co.',
        words(['florero', 'flotar', 'inflar', 'fleco']), {
          letter: 'Fl fl', letterForms: 'Fl   fl', prompt: pic('flauta'), sound: audio('sonido-fl', 'f. l. fl.', 'Sonidos'),
        }),
      select('reconocer-fl', 236, 'Pronuncia el nombre de cada dibujo. Selecciona todos los que tienen fl en alguna parte de su nombre.',
        ['flor', 'flecha', 'jirafa', 'inflador'].map(pic), ['flor', 'flecha', 'inflador'],
        { multiple: true, showOptionLabels: true }),
      ...[['flor', 'fl-o-r'], ['flaco', 'fl-a-c-o'], ['flota', 'fl-o-t-a']].map(([text, sounds]) =>
        select(`descubrir-${text}`, 236, 'Escucha los sonidos con tu maestra. Selecciona la palabra que forman.',
          words(['flor', 'flaco', 'flota']), [text], {
            prompt: { id: `sonidos-${text}`, label: sounds, listenLabel: 'los sonidos', audio: audio(`sonidos-${text}`, sounds, 'Sonidos') },
          })),
      present('trabalenguas', 236, 'Repite el trabalenguas con un compañero. Apréndelo y dilo cada vez más rápido.',
        [{ id: 'floridalma-flores', label: tongueTwister, image: '/images/lecciones/fl/floridalma.png',
          audio: audio('trabalenguas-floridalma', tongueTwister, 'Trabalenguas') }]),
    ] },
    { id: 'silabas', title: 'Sílabas y palabras con fl', exercises: [
      present('silabas-fl', 237, 'Observa Fl y fl. Lee y repite las combinaciones con las vocales: flo, fla, fle, fli, flu.', syllables, { letter: 'Fl fl', letterForms: 'Fl   fl' }),
      { id: 'silabas-dibujos', page: 237, type: 'match',
        instruction: instruction('silabas-dibujos', 'Lee el nombre de cada dibujo. Selecciona la combinación con fl que contiene.'),
        groups: [['flamenco', 'fla'], ['fleco', 'fle'], ['chiflido', 'fli'], ['florero', 'flo']]
          .map(([text, answer]) => ({ ...pic(text), answer, options: syllables })),
      },
      ...wordGroups.map((group, index) => ({ id: `palabras-${index + 1}`, page: 237, type: 'match',
        instruction: instruction('identificar-silabas', 'Lee cada palabra y selecciona la combinación que contiene. Conversa con tu maestra sobre las palabras nuevas.'),
        groups: group.map(([text, answer]) => ({ ...word(text), answer, options: syllables })),
      })),
    ] },
    { id: 'final', title: 'Leemos y completamos el relato de Flory', exercises: [
      present('relato-flory', 238, 'Lee el relato con tu maestra. Después, selecciona las palabras que faltan en las oraciones.',
        [{ id: 'relato-flory', label: floryText, image: '/images/lecciones/fl/flory.png',
          audio: audio('relato-flory', floryText, 'Lectura') }]),
      ...sentenceGroups.map((rows, index) => ({ id: `completar-oracion-${index + 1}`, page: 238, type: 'match',
        instruction: instruction('completar-relato', 'Recuerda el relato de Flory. Selecciona la palabra que completa cada oración. Puedes volver a leer el relato antes de responder.'),
        // Keep the source visible on every exercise; no dependence on memorizing the previous screen.
        items: [{ id: 'referencia-flory', label: floryText, audio: audio('relato-flory', floryText, 'Lectura') }],
        groups: rows.map(([id, blank, full, options, answer]) => ({
          id, label: blank, answer: word(answer).id, options: words(options),
          audio: audio(`oracion-${id}`, blank.replace('____', '...'), 'Oraciones'),
          // Full sentence transcript kept for future recording alongside the blank prompt.
          resultAudio: audio(`oracion-completa-${id}`, full, 'Oraciones'),
        })),
      })),
    ] },
  ],
}

// No fl recordings were supplied. Use the existing pending-audio UI, with the
// exact path + transcript ready for recording. Never request nonexistent files.
function markPendingRecordings(value) {
  if (!value || typeof value !== 'object') return
  if (value.src) value.available = false
  Object.values(value).forEach(markPendingRecordings)
}
markPendingRecordings(flLesson)
