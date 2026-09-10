const vocalesAudio = (name) => `/audio/lecciones/vocales/${name}.mp3`
const vocalesImage = (name) => `/images/lecciones/vocales/${name}.png`

export const vowelLesson = {
  unitLabel: 'Unidad 1',
  title: 'Repaso de las vocales',
  instruction:
    'Recordemos las  vocales antes de comenzar la actividad.',
  instructionAudio: vocalesAudio('Instruccion repaso'),
  progressLabel: 'Parte 1 de 2',
  reviewTitle: 'Estas son las vocales',
  reviewInstruction: 'Observa cada letra y pronuncia su sonido.',
  allVowelsAudio: vocalesAudio('vocales'),
  activityTitle: 'Actividad: encuentra la vocal',
  activityDescription:
    'Lee la instrucción y selecciona la vocal correcta. Completa tres ejercicios.',
  activityRoute: '/actividad/vocales-inicial',
}

export const vowelOptions = ['a', 'e', 'i', 'o', 'u']

export const vowelAudioPaths = {
  a: vocalesAudio('A'),
  e: vocalesAudio('E'),
  i: vocalesAudio('I'),
  o: vocalesAudio('O'),
  u: vocalesAudio('U'),
}

export const vowelInitialActivity = {
  activityId: 'vocales-inicial',
  lessonId: 'vocales',
  lessonRoute: '/lecciones/vocales',
  unitLabel: 'Actividad 1',
  title: 'Encuentra la vocal inicial',
  instruction:
    'Escucha la palabra y selecciona la vocal con la que comienza su nombre.',
  instructionAudio: vocalesAudio('Encuentra la vocal inicial'),
  prompt: 'Con que vocal comienza?',
  successFeedback: 'Muy bien! Elegiste la vocal correcta.',
  retryFeedback:
    'Casi lo logras. Escucha la palabra e intentalo otra vez.',
  completionTitle: 'Terminaste la actividad',
  completionMessage:
    'Identificaste la vocal inicial de cada palabra.',
  saveSessionError:
    'No hay una sesión activa. Inicia sesión para guardar tu progreso.',
  saveGenericError:
    'No se pudo guardar el progreso. Intenta nuevamente.',
}

export const vowelInitialExercises = [
  {
    palabra: 'avión',
    imagen: '/images/lecciones/n/nave.png',
    respuesta: 'a',
    audio: vocalesAudio('avion'),
  },
  {
    palabra: 'elefante',
    imagen: vocalesImage('elefante'),
    respuesta: 'e',
    audio: vocalesAudio('elefante'),
  },
  {
    palabra: 'iguana',
    imagen: vocalesImage('iguana'),
    respuesta: 'i',
    audio: vocalesAudio('iguana'),
  },
  {
    palabra: 'oso',
    imagen: vocalesImage('oso'),
    respuesta: 'o',
    audio: vocalesAudio('oso'),
  },
  {
    palabra: 'uniforme',
    imagen: vocalesImage('uniforme'),
    respuesta: 'u',
    audio: vocalesAudio('uniforme'),
  },
]
