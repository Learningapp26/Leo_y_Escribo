import { createBookContent } from './bookLessonHelpers.js'

const { audio, word, syllable, instruction, select, present, order, position } = createBookContent('f')
const words = (values, illustrated = false) => values.map((value) => word(value, illustrated))
const paragraphs = [
  'Me llamo Felipe y tengo diez años. Vivo en un pueblo pequeño. Mi familia celebró una fiesta por el aniversario de bodas de mis abuelos. A la fiesta llegaron todos mis familiares. ¡Yo estaba feliz!',
  'Como íbamos a estar todos juntos, mi papá contrató a un fotógrafo para que tomara una foto de la familia. Así, tendríamos un bonito recuerdo de ese día especial.',
  'El fotógrafo colocó atrás a las personas más altas, y a todos los niños, adelante. Mis abuelos quedaron en el centro. Mi abuela quería que la foto se hiciera debajo del primer árbol que ellos plantaron después de casarse.',
  'En la foto familiar aparecen mis tíos, tías, primas, primos, la abuela, el abuelo, mi papá, mi mamá, mi hermana y, por supuesto, yo, Felipe. Soy el que tiene el dedo pulgar hacia arriba. ¿Quieres verla? ¡Quedó hermosa!',
]
const questions = [
  '¿Te has tomado alguna foto familiar? ¿Cuándo? Comparte.',
  'Se le llama narrador a quien cuenta una historia. ¿Quién narra la historia? ¿El narrador es parte de la historia?',
  '¿Por qué se reunió la familia de Felipe?',
  '¿Dónde fue tomada la foto de la familia? ¿Por qué la abuela escogió ese lugar?',
  '¿Qué opinas de cómo colocó el fotógrafo a la familia?',
]

export const fLesson = {
  id: 'f', letter: 'F', unitId: 4, pages: '139–146',
  reading: {
    title: 'La foto familiar', paragraphs,
    instruction: instruction('lectura', 'Ahora aprenderás la letra efe. Escucha la siguiente historia.'),
    audio: audio('la-foto-familiar', `La foto familiar\n\n${paragraphs.join('\n\n')}`, 'Historia'),
    image: '/images/lecciones/f/lectura-f.png',
    imageAlt: 'Felipe y su familia reunidos debajo del árbol para la foto familiar.',
    questions: questions.map((text, index) => ({ text, audio: audio(`pregunta-cuento-${index + 1}`, text) })),
  },
  feedback: {
    correct: audio('respuesta-correcta', '¡Correcto! Puedes continuar.'),
    retry: audio('intenta-otra-vez', 'Escucha de nuevo e inténtalo otra vez.'),
    completed: audio('felicitacion-final', '¡Terminaste la lección de la letra F! Vuelve a las lecciones de la Unidad 4.'),
  },
  activities: [
    { id: 'sonidos', title: 'Reconozcamos el sonido de F', exercises: [
      present('sonido-f', 140, 'Escucha el sonido de la letra F. Pronúncialo y repite las palabras.',
        [word('familia', true), ...words(['Felipe', 'fila', 'feliz', 'fácil'])],
        { sound: audio('sonido-f', '/f/ (sonido sostenido, sin decir «efe»)', 'Sonidos') }),
      select('sonido-inicial', 140, 'Escucha los nombres. Selecciona los dibujos que empiezan con el mismo sonido que familia.',
        words(['falda', 'fuego', 'pie', 'flecha', 'mochila', 'flor'], true), ['falda', 'fuego', 'flecha', 'flor'], { multiple: true }),
      select('juego-sonidos', 140, 'Escucha las palabras. Selecciona todas las que tienen el sonido de la letra F.',
        words(['feo', 'Fabiola', 'Luna', 'finca', 'famoso', 'pelo', 'chorizo', 'forma', 'fuerte', 'fino', 'jarra', 'faja', 'fútbol']),
        words(['feo', 'Fabiola', 'finca', 'famoso', 'forma', 'fuerte', 'fino', 'faja', 'fútbol']).map((item) => item.id), { multiple: true, hideOptions: true }),
      ...[['foca', 'foto'], ['faro', 'fantasma'], ['fideos', 'fila']].map(([source, answer]) => select(
        `pareja-${source}`, 140, 'Escucha los nombres y elige el dibujo que comienza con los mismos dos sonidos.',
        words(['fantasma', 'fila', 'foto'], true), [answer], { prompt: word(source, true), hideWord: true })),
      present('ultima-silaba', 141, 'Escucha y repite las palabras dando una palmada por cada sílaba. El sonido de F está en la última sílaba.', words(['gafa', 'sofá', 'jefe', 'rifa'])),
      select('sonido-ultima-silaba', 141, 'Selecciona los dibujos cuyos nombres tienen el sonido de F en la última sílaba.',
        words(['jirafa', 'estufa', 'delfín', 'corona', 'café', 'plancha'], true), ['jirafa', 'estufa', 'delfin', 'cafe'], { multiple: true }),
      present('sonido-medio', 141, 'Escucha y repite. En estas palabras, el sonido de F está en medio.', words(['refacción', 'alfiler', 'difícil', 'confianza', 'teléfono'])),
      ...['perfume', 'flauta', 'elefante', 'fiebre', 'fogata'].map((text) => select(
        `clasificar-${text}`, 141, 'Escucha la palabra. ¿El sonido de F está al inicio o en medio?',
        words(['inicio', 'medio']), [text.startsWith('f') ? 'inicio' : 'medio'], { prompt: word(text, true), hideWord: true })),
      ...['foco', 'sofá', 'café', 'faro'].map((text) => position(text, 142, 'f')),
      select('tres-objetos', 142, 'Selecciona tres objetos que tengan el sonido de F en su nombre.',
        words(['foco', 'mochila', 'flauta', 'flor', 'pie'], true), ['foco', 'flauta', 'flor'], { multiple: true }),
    ] },
    { id: 'silabas', title: 'La letra F y sus sílabas', exercises: [
      present('letra-f', 143, 'Esta es la F mayúscula y la f minúscula. Observa sus formas. Escucha y repite las combinaciones de f con las vocales.',
        ['fo', 'fa', 'fe', 'fi', 'fu'].map(syllable), { letter: 'F f' }),
      select('reconocer-mayuscula', 144, 'Selecciona la F mayúscula.', [{ id: 'mayuscula', label: 'F' }, { id: 'minuscula', label: 'f' }], ['mayuscula']),
      select('reconocer-minuscula', 144, 'Selecciona la f minúscula.', [{ id: 'mayuscula', label: 'F' }, { id: 'minuscula', label: 'f' }], ['minuscula']),
      ...[['farol', 'fa'], ['feria', 'fe'], ['firma', 'fi'], ['fuente', 'fu']].map(([text, answer]) => select(
        `silaba-${text}`, 143, 'Lee y escucha la palabra. Selecciona la combinación de F con una vocal que encuentres.',
        ['fo', 'fa', 'fe', 'fi', 'fu'].map(syllable), [answer], { prompt: word(text, true) })),
      ...[['jefa', 'fa'], ['futuro', 'fu'], ['fino', 'fi'], ['profe', 'fe'], ['foco', 'fo'], ['feo', 'fe'], ['fama', 'fa'], ['fósforo', 'fo'], ['fibra', 'fi'], ['fuerte', 'fu']].map(([text, answer]) => select(
        `reconocer-${text}`, 143, 'Lee y escucha la palabra. Selecciona la combinación de F con una vocal que encuentres.',
        ['fo', 'fa', 'fe', 'fi', 'fu'].map(syllable), [answer], { prompt: word(text) })),
    ] },
    { id: 'completar', title: 'Formemos palabras con F', exercises: [
      ...['foca', 'faro', 'fiesta', 'fuente'].map((text) => ({
        ...order(`letras-${text}`, 145, [...text].reverse(), text),
        instruction: instruction('formar-letras', 'Escucha el nombre del dibujo. Selecciona las letras en orden para formar su nombre.'),
        options: [...text].reverse().map((label) => ({ label, id: label })), prompt: word(text, true), hideWord: true,
      })),
      ...[['foco', ['co', 'fo']], ['filo', ['lo', 'fi']], ['perfume', ['me', 'per', 'fu']], ['enfermo', ['mo', 'en', 'fer']], ['famosa', ['mo', 'sa', 'fa']]].map(([answer, pieces]) => order(`formar-${answer}`, 145, pieces, answer)),
    ] },
    { id: 'final', title: 'Palabras y oraciones con F', exercises: [
      ...['faro', 'fila', 'Fabi', 'Felipe', 'foca', 'firma'].map((text) => select(
        `nombre-${text.toLowerCase()}`, 146, 'Escucha los nombres y selecciona la palabra que corresponde al dibujo.',
        words(['Felipe', 'firma', 'fila', 'Fabi', 'foca', 'faro']), [word(text).id], { prompt: word(text, true), hideWord: true })),
      ...['familia', 'jirafa', 'feria'].map((text) => ({
        id: `oracion-${text}`, page: 146, type: 'oral', prompt: word(text, true),
        instruction: instruction(`oracion-${text}`, `Observa el dibujo de ${text}. Inventa y di una oración sobre él. Puedes hacerlo con tu maestra. Recuerda que al escribir una oración se empieza con mayúscula y se termina con punto.`),
      })),
    ] },
  ],
}
