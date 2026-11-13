import { createBookContent } from './bookLessonHelpers.js'

const { audio, word, instruction, select } = createBookContent('abecedario')
const rows = [
  ['a', 'a', 'araña', 'enie/arania.png', 'a'],
  ['b', 'be', 'banano', 'b/banano.png', 'b'],
  ['c', 'ce', 'coco', 'c/coco.png', 'k'],
  ['d', 'de', 'dedo', 'd/dedo.png', 'd'],
  ['e', 'e', 'elote', 'abecedario/elote.png', 'e'],
  ['f', 'efe', 'familia', 'f/familia.png', 'f'],
  ['g', 'ge', 'gato', 'g/gato.png', 'g'],
  ['h', 'hache', 'hormiga', 'abecedario/hormiga.png', null],
  ['i', 'i', 'iguana', 'vocales/iguana.png', 'i'],
  ['j', 'jota', 'jirafa', 'j/jirafa.png', 'j'],
  ['k', 'ka', 'kiosco', 'k/kiosco.png', 'k'],
  ['l', 'ele', 'luna', 'ch/luna.png', 'l'],
  ['m', 'eme', 'mamá', 'm/mama.png', 'm'],
  ['n', 'ene', 'nariz', 'n/nariz.png', 'n'],
  ['ñ', 'eñe', 'ñandú', 'enie/niandu.png', 'ñ'],
  ['o', 'o', 'ojo', 'j/ojo.png', 'o'],
  ['p', 'pe', 'papá', 'p/papa.png', 'p'],
  ['q', 'cu', 'queso', 'q/queso.png', 'k'],
  ['r', 'erre', 'rosa', 'r/rosa.png', 'rr'],
  ['s', 'ese', 'sapo', 'p/sapo.png', 's'],
  ['t', 'te', 'tamal', 't/tamal.png', 't'],
  ['u', 'u', 'uña', 'enie/unia.png', 'u'],
  ['v', 'uve', 'vaca', 'v/vaca.png', 'b'],
  // The teacher confirmed that the unnamed boy in the PDF is Walter.
  ['w', 'doble uve', 'Walter', 'w/walter.png', 'gu'],
  ['x', 'equis', 'xilófono', 'x/xilofono.png', 's'],
  ['y', 'ye', 'yoyó', 'y-letra/yoyo.svg', 'y'],
  ['z', 'zeta', 'zapato', 'z/zapato.png', 's'],
]

// Sounds are recorded as phonemes, not letter names. The pictured word provides
// context for shared sounds (b/v, c/k/q, s/x/z); h is explicitly silent.
export const alphabetEntries = rows.map(([letter, name, text, image, sound]) => {
  const id = letter === 'ñ' ? 'enie' : letter
  const letterAudio = audio(`letra-${id}`, name, 'Letras')
  return {
    id, letter, label: `${letter.toLocaleUpperCase('es')}${letter}`, caption: text,
    image: `/images/lecciones/${image}`, imageAlt: text,
    audio: word(text).audio, letterAudio,
    soundAudio: audio(`sonido-${id}`, sound
      ? `/${sound}/. Escucha ${text}. Encuentra la primera letra de su nombre.`
      : 'La hache no tiene sonido. Encuentra la letra muda al inicio de hormiga.', 'Sonidos'),
  }
})

export const alphabetGame = {
  id: 'abecedario', letter: 'abecedario', title: '¡El juego del abecedario!', unitId: 6,
  completionTitle: '¡Terminaste el juego del abecedario!',
  instruction: instruction('juego', 'Juega con tu maestra. Tu selección será la prenda del tablero. Puedes practicar las letras o los sonidos. En cada modalidad hay tres retos. Puedes hacer unos hoy y otros después.'),
  feedback: {
    correct: audio('respuesta-correcta', '¡Correcto! Puedes continuar.'),
    retry: audio('intenta-otra-vez', 'Escucha de nuevo e inténtalo otra vez.'),
    completed: audio('felicitacion-final', '¡Terminaste el juego del abecedario! Vuelve a las lecciones de la Unidad 6.'),
  },
  activities: [
    { id: 'letras', title: 'Escucha y encuentra la letra',
      instruction: instruction('buscar-letra', 'Escucha la letra. Encuéntrala en el tablero y coloca tu prenda seleccionándola. Di a tu maestra cómo suena esa letra. Recuerda que la hache no tiene sonido.'),
    },
    { id: 'sonidos', title: 'Escucha el sonido y forma la palabra',
      instruction: instruction('buscar-sonido', 'Escucha el sonido y el nombre del dibujo. Selecciona la primera letra de ese nombre y dile a tu maestra cómo se llama. Después, formarás la palabra del dibujo.'),
    },
  ],
  spellingInstruction: instruction('formar-palabra', 'Di el nombre de la letra que encontraste. Observa el dibujo y escucha su nombre. Selecciona las letras en orden para formar la palabra. Puedes quitar la última para corregir.'),
}

function shuffle(values, random) {
  const result = [...values]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function createAlphabetLesson(random = Math.random) {
  const names = shuffle(alphabetEntries, random).slice(0, 3)
  const sounds = shuffle(alphabetEntries.filter((entry) => entry.soundAudio && !names.includes(entry)), random).slice(0, 3)
  const find = (entry, mode) => ({
    ...select(`${mode}-${entry.id}`, undefined, '', alphabetEntries, [entry.id], {
      optionLayout: 'board', showOptionLabels: true, hideWord: true,
      teacherPrompt: mode === 'letras' ? `Di el nombre de la letra: ${entry.letterAudio.text}.` : entry.soundAudio.text,
      prompt: { label: entry.label, listenLabel: mode === 'letras' ? 'la letra' : 'el sonido',
        audio: mode === 'letras' ? entry.letterAudio : entry.soundAudio },
    }),
    instruction: alphabetGame.activities.find((activity) => activity.id === mode).instruction,
  })
  return {
    ...alphabetGame,
    activities: [
      { ...alphabetGame.activities[0], exercises: names.map((entry) => find(entry, 'letras')) },
      { ...alphabetGame.activities[1], exercises: sounds.flatMap((entry) => [
        find(entry, 'sonidos'),
        { id: `formar-${entry.id}`, type: 'order', compactOptions: true,
          instruction: alphabetGame.spellingInstruction,
          prompt: { label: entry.caption, image: entry.image, audio: entry.audio },
          options: shuffle([...entry.caption].map((letter, index) => ({
            id: `${letter}-${index}`, label: letter,
            audio: alphabetEntries.find((item) => item.letter === letter.toLocaleLowerCase('es')
              .normalize('NFD').replace(/\u0301/g, '').normalize('NFC')).letterAudio,
          })), random),
          answer: entry.caption, resultAudio: entry.audio,
        },
      ]) },
    ],
  }
}
