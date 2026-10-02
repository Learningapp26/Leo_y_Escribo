// Content builders shared by book-based lessons. Audio metadata is also the
// recording script: each audio object used by a screen has its exact transcript.
export function createBookContent(lessonId) {
  const slug = (text) => text.toLowerCase().replaceAll('ñ', 'ni').normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const audio = (name, text, category = 'Instrucciones') => ({
    src: `/audio/lecciones/${lessonId}/${name}.mp3`, text, category,
  })
  const word = (text, illustrated = false) => ({
    id: slug(text), label: text,
    audio: audio(slug(text), text, 'Palabras'),
    ...(illustrated ? { image: `/images/lecciones/${lessonId}/${slug(text)}.png` } : {}),
  })
  const syllable = (text) => ({
    id: slug(text), label: text,
    audio: audio(`silaba-${slug(text)}`, text, 'Sílabas'),
  })
  const instruction = (id, text) => audio(`instruccion-${slug(id)}`, text)
  const select = (id, page, text, options, answers, extra = {}) => ({
    id, page, type: 'select', instruction: instruction(id, text), options, answers, ...extra,
  })
  const present = (id, page, text, items, extra = {}) => ({
    id, page, type: 'present', instruction: instruction(id, text), items, ...extra,
  })
  const order = (id, page, pieces, answer, sentence = false) => ({
    id, page, type: 'order',
    instruction: instruction(sentence ? 'ordenar-oracion' : 'ordenar-silabas', sentence
      ? 'Selecciona las palabras en orden para formar una oración. Comienza con mayúscula y termina con punto. Puedes quitar la última palabra para corregir.'
      : 'Selecciona las sílabas en orden para formar la palabra. Puedes quitar la última sílaba para corregir.'),
    options: pieces.map(sentence ? (text) => word(text) : syllable),
    answer, separator: sentence ? ' ' : '',
    resultAudio: audio(sentence ? `oracion-${id}` : slug(answer), answer, sentence ? 'Oraciones' : 'Palabras'),
  })
  const position = (text, page, letter) => select(`posicion-${slug(text)}`, page,
    `Escucha y pronuncia despacio la palabra. Cada casilla representa un sonido. Selecciona dónde escuchas el sonido de la letra ${letter}.`,
    Array.from(text).map((_, index) => ({ id: String(index), label: String(index + 1) })),
    [String(text.indexOf(letter))], { prompt: word(text, true), hideWord: true })
  return { audio, word, syllable, instruction, select, present, order, position }
}
