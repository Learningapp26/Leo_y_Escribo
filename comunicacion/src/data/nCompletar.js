export const nSyllableOptions = ['na', 'ne', 'ni', 'no', 'nu']

export const nWordCompletion = [
  {
    id: 'nave',
    word: 'nave',
    pattern: '__ve',
    image: '/images/lecciones/n/nave.png',
    audio: null, // TODO: agregar audio_nave.mp3
    answer: 'na',
  },
  {
    id: 'nena',
    word: 'nena',
    pattern: '__na',
    image: '/images/lecciones/n/nati.png', // TODO: Reemplazar por imagen definitiva de una nena si se desea
    audio: null, // TODO: agregar audio_nena.mp3
    answer: 'ne',
  },
  {
    id: 'nido',
    word: 'nido',
    pattern: '__do',
    image: '/images/lecciones/n/nido.png', // TODO: Agregar imagen de un nido
    audio: null, // TODO: agregar audio_nido.mp3
    answer: 'ni',
  },
  {
    id: 'nube',
    word: 'nube',
    pattern: '__be',
    image: '/images/lecciones/n/nube.png', // TODO: Agregar imagen de una nube
    audio: null, // TODO: agregar audio_nube.mp3
    answer: 'nu',
  },
]

export const nSyllableJoin = [
  {
    id: 'pi-no',
    first: { id: 'pi', syllable: 'pi' },
    second: { id: 'no', syllable: 'no' },
    word: 'pino',
    wordAudio: null, // TODO: agregar audio_pino.mp3
  },
  {
    id: 'to-no',
    first: { id: 'to', syllable: 'to' },
    second: { id: 'no', syllable: 'no' },
    word: 'tono',
    wordAudio: null, // TODO: agregar audio_tono.mp3
  },
  {
    id: 'ma-no',
    first: { id: 'ma', syllable: 'ma' },
    second: { id: 'no', syllable: 'no' },
    word: 'mano',
    wordAudio: null, // TODO: agregar audio_mano.mp3
  },
  {
    id: 'sa-no',
    first: { id: 'sa', syllable: 'sa' },
    second: { id: 'no', syllable: 'no' },
    word: 'sano',
    wordAudio: null, // TODO: agregar audio_sano.mp3
  },
  {
    id: 'mo-no',
    first: { id: 'mo', syllable: 'mo' },
    second: { id: 'no', syllable: 'no' },
    word: 'mono',
    wordAudio: null, // TODO: agregar audio_mono.mp3
  },
]
