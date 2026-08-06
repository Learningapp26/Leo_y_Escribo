export const nLetterPresentation = {
  instructionAudio: null, // TODO: agregar audio de instruccion
  soundAudio: null, // TODO: agregar audio del sonido /n/
  combinations: [
    { syllable: 'na', audio: null }, // TODO: agregar audio_silaba_na.mp3
    { syllable: 'ne', audio: null }, // TODO: agregar audio_silaba_ne.mp3
    { syllable: 'ni', audio: null }, // TODO: agregar audio_silaba_ni.mp3
    { syllable: 'no', audio: null }, // TODO: agregar audio_silaba_no.mp3
    { syllable: 'nu', audio: null }, // TODO: agregar audio_silaba_nu.mp3
  ],
}

export const nSyllableWords = [
  {
    id: 'nave',
    word: 'nave',
    highlighted: 'na',
    rest: 've',
    image: '/images/lecciones/n/nave.png', // TODO: Agregar imagen de una nave
    syllableAudio: null, // TODO: agregar audio_silaba_na.mp3
    wordAudio: null, // TODO: agregar audio_nave.mp3
  },
  {
    id: 'nena',
    word: 'nena',
    highlighted: 'ne',
    rest: 'na',
    image: '/images/lecciones/n/nati.png', // TODO: Reemplazar por imagen definitiva de una nena si se desea
    syllableAudio: null, // TODO: agregar audio_silaba_ne.mp3
    wordAudio: null, // TODO: agregar audio_nena.mp3
  },
  {
    id: 'naranja',
    word: 'naranja',
    highlighted: 'na',
    rest: 'ranja',
    image: '/images/lecciones/n/naranja.png', // TODO: Agregar imagen de una naranja
    syllableAudio: null, // TODO: agregar audio_silaba_na.mp3
    wordAudio: null, // TODO: agregar audio_naranja.mp3
  },
  {
    id: 'nube',
    word: 'nube',
    highlighted: 'nu',
    rest: 'be',
    image: '/images/lecciones/n/nube.png', // TODO: Agregar imagen de una nube
    syllableAudio: null, // TODO: agregar audio_silaba_nu.mp3
    wordAudio: null, // TODO: agregar audio_nube.mp3
  },
]

export const nSyllableSearch = {
  instructionAudio: null, // TODO: agregar audio de instruccion
  targetSyllables: ['na', 'ne', 'ni', 'no', 'nu'],
  options: [
    { syllable: 'na', audio: null }, // TODO: agregar audio_silaba_na.mp3
    { syllable: 'mi', audio: null }, // TODO: agregar audio_silaba_mi.mp3
    { syllable: 'no', audio: null }, // TODO: agregar audio_silaba_no.mp3
    { syllable: 'nu', audio: null }, // TODO: agregar audio_silaba_nu.mp3
    { syllable: 'me', audio: null }, // TODO: agregar audio_silaba_me.mp3
    { syllable: 'ne', audio: null }, // TODO: agregar audio_silaba_ne.mp3
    { syllable: 'ni', audio: null }, // TODO: agregar audio_silaba_ni.mp3
    { syllable: 'ma', audio: null }, // TODO: agregar audio_silaba_ma.mp3
    { syllable: 'mu', audio: null }, // TODO: agregar audio_silaba_mu.mp3
    { syllable: 'lo', audio: null }, // TODO: agregar audio_silaba_lo.mp3
  ],
}
