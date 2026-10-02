import { createBookContent } from './bookLessonHelpers.js'

const { audio, word, syllable, instruction, select, present, order, position } = createBookContent('enie')
const words = (values, illustrated = false) => values.map((value) => word(value, illustrated))
const paragraphs = [
  'En un lindo país llamado Perú vive una niña de nombre Sami, que significa feliz y dichosa. Ella tiene como mascota un ave muy grande. Es un ave más grande que tú.',
  'Esa ave se llama ñandú. Es un ave con un cuello largo, unas alas enormes y unas patas muy largas, con las que puede correr rápido. Es parecida a un avestruz.',
  'Un día Sami iba caminando a su casa, cuando en un matorral estaba un ñandú atrapado. Tenía un ala trabada en unas ramas. Sami le ayudó a salir y el ñandú la siguió hasta su casa.',
  'Al llegar, Sami le ofreció algunas frutas. El ñandú se las comió gustoso. Desde ese día, Sami y el ñandú se hicieron buenos amigos. El ñandú visitaba a Sami. Ella le daba comida y el ñandú la paseaba por el campo.',
]
const questions = [
  'De acuerdo con lo que relata la historia, ¿cómo te imaginas a un ñandú? ¿A qué otro animal se le parece?',
  '¿Por qué crees que el ñandú siguió a Sami hacia su casa?',
  '¿Por qué el ñandú visitaba a Sami?',
  '¿Tienes mascotas? ¿Cómo las cuidas?',
]

export const enieLesson = {
  id: 'enie', letter: 'Ñ', unitId: 4, pages: '159–166',
  reading: {
    title: 'La niña y el ñandú', paragraphs,
    instruction: instruction('lectura', 'Ahora es tiempo de aprender la letra eñe. Para empezar, escucha una historia.'),
    audio: audio('la-ninia-y-el-niandu', `La niña y el ñandú\n\n${paragraphs.join('\n\n')}`, 'Historia'),
    image: '/images/lecciones/enie/lectura-enie.png',
    imageAlt: 'Sami pasea por el campo sobre su amigo el ñandú, en Perú.',
    questions: questions.map((text) => ({ text })),
  },
  feedback: {
    correct: audio('respuesta-correcta', '¡Correcto! Puedes continuar.'),
    retry: audio('intenta-otra-vez', 'Escucha de nuevo e inténtalo otra vez.'),
    completed: audio('felicitacion-final', '¡Terminaste la lección de la letra Ñ! Vuelve a las lecciones de la Unidad 4.'),
  },
  activities: [
    { id: 'sonidos', title: 'Reconozcamos el sonido de Ñ', exercises: [
      present('sonido-enie', 160, 'Escucha el sonido de la letra Ñ. Pronúncialo y repite las palabras.',
        words(['niña', 'baño', 'dueño', 'pañal', 'sueño']),
        { prompt: word('ñandú', true), sound: audio('sonido-enie', '/ñ/ (sonido sostenido, sin decir «eñe»)', 'Sonidos') }),
      select('reconocer-sonido', 160, 'Escucha los nombres. Selecciona los dibujos que tienen el sonido de Ñ, como ñandú.',
        words(['sueño', 'banano', 'uña', 'borrador', 'niño', 'muñeca'], true),
        words(['sueño', 'uña', 'niño', 'muñeca']).map((item) => item.id), { multiple: true }),
      select('juego-sonidos', 160, 'Escucha las palabras. Selecciona todas las que tienen el sonido de la letra Ñ.',
        words(['pañuelo', 'cuaderno', 'sueño', 'pita', 'Toño', 'árbol', 'paño', 'caña', 'canasta', 'año', 'España', 'mañana', 'lento', 'daño', 'cabaña']),
        words(['pañuelo', 'sueño', 'Toño', 'paño', 'caña', 'año', 'España', 'mañana', 'daño', 'cabaña']).map((item) => item.id), { multiple: true }),
      ...['puño', 'piña', 'caña', 'leña', 'moño', 'araña'].map((text) => position(text, 160, 'ñ')),
      ...[['pestaña', 'araña'], ['pañal', 'señal'], ['piña', 'niña']].map(([source, answer]) => select(
        `rima-${word(source).id}`, 161, 'Escucha los nombres. Selecciona el dibujo cuyo nombre rima con el de arriba.',
        words(['niña', 'araña', 'señal'], true), [word(answer).id], { prompt: word(source, true), hideWord: true })),
      select('clasificar-sonidos', 161, 'Selecciona los dibujos que tienen el sonido de Ñ en su nombre.',
        words(['puño', 'muñeca', 'espejo', 'niño', 'caña', 'naranja'], true),
        words(['puño', 'muñeca', 'niño', 'caña']).map((item) => item.id), { multiple: true }),
      select('tres-objetos', 162, 'Selecciona tres objetos que tengan el sonido de Ñ en su nombre.',
        words(['pañuelo', 'espejo', 'piña', 'muñeca', 'naranja'], true),
        words(['pañuelo', 'piña', 'muñeca']).map((item) => item.id), { multiple: true }),
      present('quitar-silaba-ejemplo', 162, 'Escucha: ca-ba-ña. Si quitamos la sílaba ña, queda caba. Ahora prueba con otras palabras.', words(['cabaña', 'caba'])),
      ...[['araña', ['a', 'ra', 'ña'], [0, 1]], ['piñata', ['pi', 'ña', 'ta'], [0, 2]], ['montaña', ['mon', 'ta', 'ña'], [0, 1]]].map(([text, pieces, answersByIndex]) => select(
        `quitar-${word(text).id}`, 162, 'Escucha la palabra. Selecciona las sílabas que quedan al quitar la sílaba que contiene Ñ. Léelas en orden.',
        pieces.map(syllable), [], { multiple: true, answersByIndex, prompt: word(text, true) })),
    ] },
    { id: 'silabas', title: 'La letra Ñ y sus sílabas', exercises: [
      present('letra-enie', 163, 'Esta es la Ñ mayúscula y la ñ minúscula. Observa sus formas. Escucha y repite las combinaciones de ñ con las vocales.',
        ['ño', 'ña', 'ñe', 'ñi', 'ñu'].map(syllable), { letter: 'Ñ ñ' }),
      select('reconocer-mayuscula', 164, 'Selecciona la Ñ mayúscula.', [{ id: 'mayuscula', label: 'Ñ' }, { id: 'minuscula', label: 'ñ' }], ['mayuscula']),
      select('reconocer-minuscula', 164, 'Selecciona la ñ minúscula.', [{ id: 'mayuscula', label: 'Ñ' }, { id: 'minuscula', label: 'ñ' }], ['minuscula']),
      ...[['otoño', 'ño'], ['meñique', 'ñi'], ['muñeca', 'ñe'], ['piñata', 'ña']].map(([text, answer]) => select(
        `silaba-${word(text).id}`, 163, 'Lee y escucha la palabra. Selecciona la combinación de Ñ con una vocal que encuentres.',
        ['ño', 'ña', 'ñe', 'ñi', 'ñu'].map(syllable), [syllable(answer).id], { prompt: word(text, true) })),
      ...[
        ['ño', ['leño', 'corbata', 'cariño', 'riño', 'foca'], ['leño', 'cariño', 'riño']],
        ['ña', ['castaña', 'vaso', 'añade', 'peña', 'creo'], ['castaña', 'añade', 'peña']],
        ['ñe', ['ñeque', 'claro', 'añejo', 'atañe', 'chivo'], ['ñeque', 'añejo', 'atañe']],
        ['ñi', ['albañil', 'pluma', 'piñita', 'bloque', 'teñir'], ['albañil', 'piñita', 'teñir']],
        ['ñu', ['pañuelo', 'prensa', 'señuelo', 'tira', 'buñuelo'], ['pañuelo', 'señuelo', 'buñuelo']],
      ].map(([target, options, answers]) => select(`buscar-${syllable(target).id}`, 163,
        `Lee y escucha las palabras. Selecciona todas las que contienen ${target}.`, words(options), words(answers).map((item) => item.id), { multiple: true, prompt: syllable(target) })),
    ] },
    { id: 'completar', title: 'Completemos palabras con Ñ', exercises: [
      ...[['leña', 'le__', 'ña'], ['niño', 'ni__', 'ño'], ['piñata', 'pi__ta', 'ña'], ['cabaña', 'caba__', 'ña']].map(([text, pattern, answer]) => select(
        `completar-${word(text).id}`, 165, 'Escucha el nombre del dibujo y selecciona la sílaba que falta para completar la palabra.',
        ['ño', 'ña', 'ñe', 'ñi', 'ñu'].map(syllable), [syllable(answer).id], { prompt: word(text, true), hideWord: true, pattern })),
      ...[
        ['pañuelo', ['pa', 'lo', 'ñue']], ['mañana', ['ña', 'na', 'ma']], ['rebaño', ['re', 'ba', 'ño']],
        ['pequeña', ['pe', 'ña', 'que']], ['tamaño', ['ta', 'ño', 'ma']], ['niñera', ['ni', 'ra', 'ñe']],
      ].map(([answer, pieces]) => order(`formar-${word(answer).id}`, 165, pieces, answer)),
    ] },
    { id: 'final', title: 'Trabalenguas y oraciones con Ñ', exercises: [
      present('trabalenguas', 166, 'Escucha y lee los trabalenguas con tu maestra. Repítelos cada vez más rápido.', [
        { id: 'nonio', label: 'Ñoño cumple años año tras año,\ny en cada cumpleaños\nrecibe muchos regalos con moños.',
          audio: audio('trabalenguas-nionio', 'Ñoño cumple años año tras año,\ny en cada cumpleaños\nrecibe muchos regalos con moños.', 'Oraciones') },
        { id: 'arania', label: 'La araña teje año con año,\naunque se daña,\nla araña siempre teje su telaraña.',
          audio: audio('trabalenguas-arania', 'La araña teje año con año,\naunque se daña,\nla araña siempre teje su telaraña.', 'Oraciones') },
      ]),
      order('ninia', 166, ['niña', 'caña', 'La', 'come', 'piña.', 'y'], 'La niña come caña y piña.', true),
      order('ninio', 166, ['niño', 'El', 'quiebra', 'piñata.', 'la'], 'El niño quiebra la piñata.', true),
      order('niara', 166, ['lastimó', 'Ñiara', 'se', 'uña.', 'su'], 'Ñiara se lastimó su uña.', true),
    ] },
  ],
}
