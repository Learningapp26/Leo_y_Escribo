export const nSyllableOptions = ['na', 'ne', 'ni', 'no', 'nu']

export const nWordCompletion = [
  {
    id: 'nati',
    word: 'Nati',
    pattern: '__ti',
    image: '/images/lecciones/n/nati.png',
    audio: null, // TODO: agregar audio_nati.mp3
    answer: 'na',
  },
  {
    id: 'nena',
    word: 'nena',
    pattern: '__na',
    image: '/images/lecciones/n/nena.png',
    audio: null, // TODO: agregar audio_nena.mp3
    answer: 'ne',
  },
  {
    id: 'pino',
    word: 'pino',
    pattern: 'pi__',
    image: '/images/lecciones/n/pino.png',
    audio: null, // TODO: agregar audio_pino.mp3
    answer: 'no',
  },
  {
    id: 'mono',
    word: 'mono',
    pattern: 'mo__',
    image: '/images/lecciones/n/mono.png',
    audio: null, // TODO: agregar audio_mono.mp3
    answer: 'no',
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
