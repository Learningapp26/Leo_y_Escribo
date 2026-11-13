import { createBookContent } from './bookLessonHelpers.js'

const { audio, word, syllable, instruction, select, present } = createBookContent('ge-gi')
const words = (values) => values.map((text) => word(text))
const pic = (text) => word(text, true)
const pics = (values) => values.map(pic)

// Printed story, page 239.
const paragraphs = [
  'Gilda era una gitana que tenía una hermana gemela, se llamaba Regina. Gilda practicaba gimnasia y Regina bailaba. Gilda era genial para las matemáticas, Regina era ágil con las letras. Las gemelas eran muy amables y toda la gente las quería.',
]
const story = audio('gilda-y-regina', `Gilda y Regina\n\n${paragraphs.join('\n\n')}`, 'Historia')

// Words of the story, in printed order. Only the ones with ge or gi are answers.
const storyWords = ['Gilda', 'gitana', 'hermana', 'gemela', 'Regina', 'gimnasia', 'bailaba', 'genial', 'matemáticas', 'ágil', 'letras', 'gente']
const withGeGi = (text) => /g[eéií]/i.test(text)

// Page 240 word list, both columns in printed order.
const wordList = ['vigilante', 'gentil', 'colegio', 'mágico', 'recogedor', 'geranio', 'ligero',
  'página', 'imaginación', 'geografía', 'virgen', 'generoso', 'energía', 'jengibre']

// Page 240: "de cada par, escoge una palabra y forma una oración". Every combination
// of the three boxes makes a sentence, so the child can choose freely.
const sentencePair = (id, pair, places) => ({
  id: `oracion-${id}`, page: 240, type: 'oral', record: true, practiceLabel: 'Ya dije mi oración',
  instruction: instruction('formar-oracion', 'Escoge una palabra de cada recuadro y forma una oración. Dila en voz alta. Puedes grabarte y escucharte.'),
  items: pair.map(([text]) => pic(text)),
  groups: [
    { id: 'inicio', label: 'Primer recuadro', options: words(['Veo', 'Dibujo', 'Me gusta ver']) },
    { id: 'palabra', label: 'Segundo recuadro', options: pair.map(([text, label]) => ({ ...word(text), label })) },
    { id: 'lugar', label: 'Tercer recuadro', options: words(places) },
  ],
})

export const geGiLesson = {
  id: 'ge-gi', letter: 'ge gi', unitId: 6, pages: '239–240', showReadingSource: false, centeredItems: true,
  completionTitle: '¡Terminaste la lección de ge y gi!',
  reading: {
    title: 'Gilda y Regina', paragraphs,
    instruction: instruction('lectura', 'Escucha el relato. Fíjate en las palabras que llevan ge y gi.'),
    audio: story,
    image: '/images/lecciones/ge-gi/lectura-ge-gi.png',
    imageAlt: 'Gilda, con falda de colores y un pandero, saluda junto a su hermana gemela Regina, que lleva blusa fucsia y pantalón blanco.',
    questions: [
      '¿Qué palabras con ge o gi escuchaste en el relato?',
      '¿Qué practicaba Gilda? ¿Qué hacía Regina?',
    ].map((text) => ({ text })),
  },
  feedback: {
    correct: audio('respuesta-correcta', '¡Correcto! Puedes continuar.'),
    retry: audio('intenta-otra-vez', 'Escucha de nuevo e inténtalo otra vez.'),
    completed: audio('felicitacion-final', '¡Terminaste la lección de ge y gi! Vuelve a las lecciones de la Unidad 6.'),
  },
  activities: [
    { id: 'sonidos', title: 'Escuchamos ge y gi', exercises: [
      present('sonido-ge-gi', 239, 'Ya conoces el sonido de la letra g. Ahora aprenderás que cuando se combina con las vocales e - i, suena j, igual que la letra j. ¿Qué dibujo aparece al lado? Repite ge-la-ti-na. Gelatina se escribe con g. Repite ge y gi.',
        ['ge', 'gi'].map(syllable), {
          prompt: { ...pic('gelatina'), audio: audio('silabas-gelatina', 'ge-la-ti-na. Gelatina.', 'Sílabas') },
          sound: audio('sonido-ge-gi', 'j', 'Sonidos'),
        }),
      select('dibujos-ge-gi', 239, 'Repite en voz alta lo que muestra cada dibujo. Son palabras que se escriben con g. Selecciona las figuras donde escuches ge o gi.',
        pics(['gigante', 'gorro', 'ángel', 'gemelos']), ['gigante', 'angel', 'gemelos'], { multiple: true, showOptionLabels: true }),
    ] },
    { id: 'palabras', title: 'Leemos palabras con ge y gi', exercises: [
      select('palabras-relato', 239, 'Escucha otra vez el relato de Gilda y Regina. Selecciona todas las palabras que lleven ge y gi. Pronúncialas varias veces.',
        words(storyWords), storyWords.filter(withGeGi).map((text) => word(text).id), {
          multiple: true, hideWord: true,
          prompt: { id: 'relato', label: 'Gilda y Regina', listenLabel: 'el relato', audio: story },
        }),
      present('lista-palabras', 240, 'Lee varias veces las palabras de la lista. Todas llevan la letra g en alguna parte de la palabra. Fíjate bien. Puedes escuchar cada palabra.',
        words(wordList)),
    ] },
    { id: 'oraciones', title: 'Formamos oraciones con ge y gi', exercises: [
      present('palabras-dibujos', 240, 'Lee las palabras que identifican a los dibujos. Escucha cada una.',
        pics(['gente', 'girasol', 'magia', 'gemas'])),
      sentencePair('gente-girasol', [['gente', 'a la gente'], ['girasol', 'un girasol']], ['en el parque', 'en el jardín', 'en el colegio']),
      sentencePair('magia-gemas', [['magia', 'magia'], ['gemas', 'gemas']], ['en el circo', 'en la cueva', 'en el libro']),
    ] },
  ],
}
