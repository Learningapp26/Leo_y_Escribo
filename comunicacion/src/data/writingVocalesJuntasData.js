import { createWritingContent } from './writingLessonHelpers.js'

// Leo y escribo, pp. 247–248. Copying and writing become selecting and ordering.
const { base, finish, word, syllable, instruction, present } = createWritingContent(
  'escritura-vocales-juntas', '¡Escribamos palabras con vocales juntas!', 247,
  'Hay palabras que tienen dos vocales seguidas. Escucha las palabras y encuentra las vocales que están juntas.',
  [
    "Abuelo.mp3",
    "Aceite.mp3",
    "Aire.mp3",
    "Anual.mp3",
    "Arruinar.mp3",
    "Baile.mp3",
    "Boina.mp3",
    "Cielo.mp3",
    "Cuatro.mp3",
    "Cuidado.mp3",
    "Felicitacion-final.mp3",
    "Flauta.mp3",
    "Fuego.mp3",
    "Fuente.mp3",
    "Guanaba.mp3",
    "Guante.mp3",
    "Huevo.mp3",
    "Iguana.mp3",
    "Instruccion-introduccion.mp3",
    "Instruccion-mismas-vocales.mp3",
    "Instruccion-palmadas.mp3",
    "Instruccion-vocales-juntas.mp3",
    "Intenta-otra-vez.mp3",
    "Junio.mp3",
    "Laura.mp3",
    "Maizal.mp3",
    "Oigo.mp3",
    "Peine.mp3",
    "Pie.mp3",
    "Respuesta-correcta.mp3",
    "Ruinas.mp3",
    "Silaba-a.mp3",
    "Silaba-ai.mp3",
    "Silaba-au.mp3",
    "Silaba-bai.mp3",
    "Silaba-bue.mp3",
    "Silaba-cua.mp3",
    "Silaba-ei.mp3",
    "Silaba-flau.mp3",
    "Silaba-fue.mp3",
    "Silaba-go.mp3",
    "Silaba-ie.mp3",
    "Silaba-io.mp3",
    "Silaba-iu.mp3",
    "Silaba-le.mp3",
    "Silaba-lo.mp3",
    "Silaba-ne.mp3",
    "Silaba-pei.mp3",
    "Silaba-ta.mp3",
    "Silaba-tro.mp3",
    "Silaba-ua.mp3",
    "Triunfo.mp3",
    "Veinte.mp3",
    "Viejo.mp3",
    "Viuda.mp3",
    "Zoila.mp3",
    "instruccion-formar-palabra.mp3",
  ],
)
const images = {
  iguana: 'vocales/iguana', peine: 'pr/peine', fuego: 'f/fuego', flauta: 'f/flauta', abuelo: 'b/abuelo',
}
const pic = (text) => ({ ...word(text, true), ...(images[text] ? { image: `/images/lecciones/${images[text]}.png` } : {}) })
const split = (text, parts) => ({ ...word(text), label: parts })

// Page 247 drawings and the vowels that go together in each one.
const drawings = [
  ['Diego', 'ie'], ['maizal', 'ai'], ['aceite', 'ei'], ['iguana', 'ua'],
  ['peine', 'ei'], ['Laura', 'au'], ['junio', 'io'], ['viuda', 'iu'],
]
const pairs = ['ie', 'ai', 'ei', 'ua', 'au', 'io', 'iu']
const vowelChoices = (answer, index) => [answer, pairs[(pairs.indexOf(answer) + 2 + index) % pairs.length], pairs[(pairs.indexOf(answer) + 4) % pairs.length]]
  .filter((value, i, list) => list.indexOf(value) === i)
  .sort()

// Page 247 columns. mue-la ↔ rue-da is the printed example.
const left = [['boina', 'boi-na', 'Zoila'], ['veinte', 'vein-te', 'peine'], ['cielo', 'cie-lo', 'pie'], ['guante', 'guan-te', 'anual'], ['cuidado', 'cui-da-do', 'arruinar']]
const right = { Zoila: 'Zoi-la', pie: 'pie', arruinar: 'a-rrui-nar', anual: 'a-nual', peine: 'pei-ne' }
const rightIds = Object.keys(right)

// Page 248: words to read and clap, then drawings to name sound by sound.
const clapWords = [['fuente', 'fuen - te'], ['huevo', 'hue - vo'], ['viejo', 'vie - jo'], ['oigo', 'oi - go'],
  ['triunfo', 'triun - fo'], ['ruinas', 'rui - nas'], ['aire', 'ai - re'], ['guanaba', 'gua - na - ba']]
const build = [['baile', ['bai', 'le']], ['fuego', ['fue', 'go']], ['peine', ['pei', 'ne']],
  ['cuatro', ['cua', 'tro']], ['flauta', ['flau', 'ta']], ['abuelo', ['a', 'bue', 'lo']]]

// Syllables of the word plus three from the other words, mixed in a fixed order,
// so the child has to find the right pieces and not only put them in order.
const withExtras = (parts, all) => {
  const extras = all.filter((piece) => !parts.includes(piece))
  const start = parts.join('').length % extras.length
  const pieces = [...new Set([...parts, ...[0, 2, 4].map((step) => extras[(start + step) % extras.length])])]
  let seed = [...parts.join('')].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7)
  for (let i = pieces.length - 1; i > 0; i -= 1) {
    seed = (seed * 1103515245 + 12345) >>> 0
    const j = seed % (i + 1)
    ;[pieces[i], pieces[j]] = [pieces[j], pieces[i]]
  }
  return pieces
}
const buildPieces = [...new Set(build.flatMap(([, parts]) => parts))]

export const writingVocalesJuntasLesson = finish({
  ...base,
  pages: '247–248',
  activities: [
    { id: 'vocales', title: 'Encontramos las vocales juntas',
      // Diego is the printed example, so it is shown as the pattern and not asked.
      exercises: [drawings.slice(1, 5), drawings.slice(5)].map((items, index) => ({
      id: `vocales-juntas-${index + 1}`, page: 247, type: 'match',
      instruction: instruction('vocales-juntas', 'Lee la palabra que está debajo de cada dibujo. Todas tienen dos vocales seguidas. Selecciona las vocales que estén juntas.'),
      pattern: 'Ejemplo: Diego → ie',
      groups: items.map(([text, answer], i) => ({ ...pic(text), answer, options: vowelChoices(answer, i).map(syllable) })),
    })) },
    { id: 'unir', title: 'Unimos palabras', exercises: [
      { id: 'mismas-vocales', page: 247, type: 'match',
        instruction: instruction('mismas-vocales', 'Lee cada palabra. Selecciona la palabra que tiene las mismas vocales juntas. El guion te indica cómo se divide en sílabas.'),
        pattern: 'Ejemplo: mue-la → rue-da',
        groups: left.map(([text, parts, answer], i) => ({ ...split(text, parts),
          answer: word(answer).id,
          options: [answer, rightIds[(rightIds.indexOf(answer) + 1 + i) % rightIds.length], rightIds[(rightIds.indexOf(answer) + 3) % rightIds.length]]
            .filter((value, j, list) => list.indexOf(value) === j)
            .map((value) => split(value, right[value]))
            .sort((a, b) => a.label.localeCompare(b.label, 'es')),
        })),
      },
    ] },
    { id: 'silabas', title: 'Separamos en sílabas', exercises: [
      present('palmadas', 248, 'Lee las palabras. Luego, lee la separación en sílabas. Da una palmada por cada sílaba.',
        clapWords.map(([text, parts]) => ({ ...word(text), label: `${text}\n${parts}` }))),
      ...build.map(([text, parts]) => ({
        id: `formar-${text}`, page: 248, type: 'order', compactOptions: true, prompt: pic(text),
        instruction: instruction('formar-palabra', 'Observa el dibujo. Nómbralo despacio. Busca sus sílabas y selecciónalas en orden para formar la palabra. ¡Cuidado, sobran algunas! Puedes quitar la última para corregir.'),
        options: withExtras(parts, buildPieces).map(syllable), answer: text, answerLength: parts.length, separator: '',
        resultAudio: word(text).audio,
      })),
    ] },
  ],
})
