import { createWritingContent } from './writingLessonHelpers.js'

// Leo y escribo, Paso 2, p. 254. The source has no story title.
// Pictogram insect confirmed by the teacher as "catarina".
const { base, finish, word, audio, instruction, present } = createWritingContent(
  'escritura-q-c', '¡Escribamos palabras con q-c!', 254,
  'Observa los dibujos y reconoce las palabras que los identifican. Después, sustituye los dibujos de la historia por sus palabras e inventa un título con tu maestra.',
)
const bank = ['parque', 'chaleco', 'equilibrio', 'canasto', 'cubeta', 'quince', 'escalera', 'güisquil']
const reused = { 'güisquil': 'gue-con-dieresis/guisquil', chaleco: 'ch/chaleco', quince: 'q/quince', canasto: 't/canasto', casa: 'c/casa', tacos: 'c/taco' }
const pic = (text) => ({ ...word(text, true), ...(reused[text] ? { image: `/images/lecciones/${reused[text]}.png` } : {}) })
export const writingQcParagraphs = [
  'En el parque que está junto a la casa hay una venta de tacos. Se llama «Taquería Quique». Ahí venden los tacos más ricos. Siempre vamos con mi primo Maquito.',
  'Un día, a Maquito le salió una catarina en su taco. Él se quejó con el dueño. Don Quique, el dueño, se disculpó y le obsequió dos tacos más. ¡Estaban exquisitos!',
]
const storyAudio = audio('historia-taqueria-quique', writingQcParagraphs.join('\n\n'), 'Historia')
const drawings = ['güisquil', 'escalera', 'equilibrio', 'parque', 'cubeta', 'chaleco', 'quince', 'canasto']
const storyGroups = [
  ['parque', 'En el ____ que está junto a la casa hay una venta de tacos.', ['parque', 'canasto', 'chaleco']],
  ['casa', 'En el parque que está junto a la ____ hay una venta de tacos.', ['cubeta', 'casa', 'escalera']],
  ['tacos', 'Hay una venta de ____.', ['tacos', 'güisquil', 'canasto']],
  ['tacos', 'Ahí venden los ____ más ricos.', ['chaleco', 'tacos', 'parque']],
  ['catarina', 'Un día, a Maquito le salió una ____ en su taco.', ['catarina', 'cubeta', 'escalera']],
  ['tacos', 'Le obsequió dos ____ más.', ['canasto', 'chaleco', 'tacos']],
]
export const writingQcLesson = finish({
  ...base,
  activities: [
    { id: 'dibujos', title: 'Buscamos los nombres', exercises: [drawings.slice(0, 4), drawings.slice(4)].map((items, index) => ({
      id: `nombres-${index}`, page: 254, type: 'match',
      instruction: instruction('nombres', 'Observa los dibujos y selecciona la palabra que identifica cada uno. Puedes consultar el recuadro.'),
      teacherPrompt: bank.join(' · '),
      groups: items.map((text, i) => ({ ...pic(text), answer: word(text).id,
        options: [text, items[(i + 1) % items.length], items[(i + 2) % items.length]].map((value) => word(value)).sort((a, b) => a.label.localeCompare(b.label, 'es')),
      })),
    })) },
    { id: 'historia', title: 'Completamos la historia', exercises: [storyGroups.slice(0, 3), storyGroups.slice(3)].map((items, index) => ({
      id: `historia-${index}`, page: 254, type: 'match',
      instruction: instruction('sustituir-dibujos', 'Lee la historia. Selecciona la palabra que representa cada dibujo para completar las oraciones.'),
      items: [{ id: 'historia-completa', label: writingQcParagraphs.join('\n\n'), audio: storyAudio }],
      groups: items.map(([answer, label, choices], i) => ({ id: `dibujo-${index}-${i}`, label,
        image: pic(answer).image, imageAlt: answer, listenLabel: 'Escuchar oración', audio: audio(`oracion-${index}-${i}`, label.replace('____', '...'), 'Oraciones'),
        options: choices.map((value) => word(value)), answer: word(answer).id,
      })),
    })) },
    { id: 'lectura', title: 'Leemos y damos un título', exercises: [
      present('leer-historia', 254, 'Lee y escucha la historia completa. Los dibujos ya están sustituidos por sus palabras.',
        [], { reading: { title: 'Historia para inventar un título', paragraphs: writingQcParagraphs, audio: storyAudio,
          image: '/images/lecciones/escritura-q-c/lectura-q-c.png',
          imageAlt: 'Maquito en la Taquería Quique, junto al parque y la casa.' } }),
      { id: 'inventar-titulo', page: 254, type: 'oral',
        instruction: instruction('inventar-titulo', 'Inventa un título para la historia y compártelo con tu maestra.'),
        items: [{ id: 'historia', label: writingQcParagraphs.join('\n\n'), audio: storyAudio }],
        practiceLabel: 'Ya compartí mi título',
      },
    ] },
  ],
})
