import { getLessonCardLabel } from './lessonLabels'

export const units = [
  {
    id: 1,
    title: 'Unidad 1',
    pageRange: 'Páginas 5–58',
    lessons: [
      {
        id: 'vocales',
        bookPage: 5,
        title: getLessonCardLabel('vocales'),
        route: '/lecciones/vocales',
        available: true,
      },
      {
        id: 'm',
        bookPage: 7,
        title: getLessonCardLabel('m'),
        route: '/lecciones/m',
        available: true,
      },
      {
        id: 'l',
        bookPage: 13,
        title: getLessonCardLabel('l'),
        route: '/lecciones/l',
        available: true,
      },
      {
        id: 's',
        bookPage: 19,
        title: getLessonCardLabel('s'),
        route: '/lecciones/s',
        available: true,
      },
      {
        id: 'y-conjuncion',
        bookPage: 25,
        title: getLessonCardLabel('y-conjuncion'),
        route: '/lecciones/y-conjuncion',
        available: true,
      },
      {
        id: 'r',
        bookPage: 29,
        title: getLessonCardLabel('r'),
        route: '/lecciones/r',
        available: true,
      },
      {
        id: 'p',
        bookPage: 37,
        title: getLessonCardLabel('p'),
        route: '/lecciones/p',
        available: true,
      },
      {
        id: 't',
        bookPage: 43,
        title: getLessonCardLabel('t'),
        route: '/lecciones/t',
        available: true,
      },
{
  id: 'n',
  bookPage: 49,
  title: getLessonCardLabel('n'),
  route: '/lecciones/n',
  available: true,
},
{
  id: 'juguemos-palabras',
  title: 'Juguemos con las palabras',
  route: '/unidad-1/juguemos-palabras',
  available: true,
},
{
  id: 'repaso-unidad-1',
  title: 'Palabras para leer y practicar',
  route: '/unidad-1/palabras-practica',
  available: true,
},
],
},
{
  id: 2,
  title: 'Unidad 2',
  pageRange: 'Páginas 59–96',
  lessons: [
      {
        id: 'c',
        bookPage: 59,
        title: getLessonCardLabel('c'),
        route: '/lecciones/c',
        available: true,
      },
      {
        id: 'q',
        bookPage: 65,
        title: getLessonCardLabel('q'),
        route: '/lecciones/q',
        available: true,
      },
      {
        id: 'd',
        bookPage: 71,
        title: getLessonCardLabel('d'),
        route: '/lecciones/d',
        available: true,
      },
      {
        id: 'silabas-inversas',
        bookPage: 79,
        title: getLessonCardLabel('silabas-inversas'),
        route: '/lecciones/silabas-inversas',
        available: true,
      },
      {
        id: 'pl',
        bookPage: 85,
        title: getLessonCardLabel('pl'),
        route: '/lecciones/pl',
        available: true,
      },
      {
        id: 'pr',
        bookPage: 89,
        title: getLessonCardLabel('pr'),
        route: '/lecciones/pr',
        available: true,
      },
      {
        id: 'repaso-unidad-2',
        title: 'Repaso de la Unidad 2',
        route: '/unidad-2/repaso',
        available: true,
      },
      {
        id: 'subidas-resbalones',
        title: 'Subidas y resbalones de palabras',
        route: '/unidad-2/subidas-resbalones',
        available: true,
      },
    ],
  },
  {
    id: 3,
    title: 'Unidad 3',
    pageRange: 'Páginas 97–130',
    lessons: [
      {
        id: 'b',
        bookPage: 97,
        title: getLessonCardLabel('b'),
        route: '/lecciones/b',
        available: true,
      },
      {
        id: 'j',
        bookPage: 103,
        title: getLessonCardLabel('j'),
        route: '/lecciones/j',
        available: true,
      },
      {
        id: 'tr',
        bookPage: 109,
        title: getLessonCardLabel('tr'),
        route: '/lecciones/tr',
        available: true,
      },
      {
        id: 'bl',
        bookPage: 113,
        title: getLessonCardLabel('bl'),
        route: '/lecciones/bl',
        available: true,
      },
      {
        id: 'br',
        bookPage: 117,
        title: getLessonCardLabel('br'),
        route: '/lecciones/br',
        available: true,
      },
      {
        id: 'ch',
        bookPage: 121,
        title: getLessonCardLabel('ch'),
        route: '/lecciones/ch',
        available: true,
      },
      {
        id: 'domino-palabras',
        title: 'Dominó de palabras',
        route: '/unidad-3/domino-palabras',
        available: true,
      },
      {
        id: 'repaso-unidad-3',
        title: 'Palabras para leer y practicar',
        route: '/unidad-3/palabras-practica',
        available: true,
      },
    ],
  },
  {
    id: 4,
    title: 'Unidad 4',
    pageRange: 'Páginas 131–170',
    lessons: [
    
      {
        id: 'cl',
        bookPage: 131,
        title: getLessonCardLabel('cl'),
        route: '/lecciones/cl',
        available: true,
      },
      {
        id: 'cr',
        title: getLessonCardLabel('cr'),
        route: '/lecciones/cr',
        available: true,
      },
      {
        id: 'f',
        bookPage: 139,
        title: getLessonCardLabel('f'),
        route: '/lecciones/f',
        available: true,
      },
      {
        id: 'v',
        bookPage: 147,
        title: getLessonCardLabel('v'),
        route: '/lecciones/v',
        available: true,
      },
      {
        id: 'rr',
        bookPage: 153,
        title: getLessonCardLabel('rr'),
        route: '/lecciones/rr',
        available: true,
      },
      {
        id: 'enie',
        bookPage: 159,
        title: getLessonCardLabel('enie'),
        route: '/lecciones/enie',
        available: true,
      },
      {
        id: 'repaso-unidad-4',
        title: 'Palabras para leer y practicar',
        route: '/unidad-4/palabras-practica',
        available: true,
      },
      {
        id: 'juego-memoria',
        title: 'Juego de memoria',
        route: '/lecciones/juego-memoria',
        available: true,
      },

    ],
  },
  {
    id: 5,
    title: 'Unidad 5',
    pageRange: 'Páginas 171–212',
    lessons: [
      {
        id: 'dr',
        bookPage: 171,
        title: getLessonCardLabel('dr'),
        route: '/lecciones/dr',
        available: true,
      },
      {
        id: 'g',
        title: getLessonCardLabel('g'),
        route: '/lecciones/g',
        available: true,
      },
      {
        id: 'h',
        bookPage: 183,
        title: getLessonCardLabel('h'),
        route: '/lecciones/h',
        available: true,
      },
      {
        id: 'z',
        bookPage: 189,
        title: getLessonCardLabel('z'),
        route: '/lecciones/z',
        available: true,
      },
      {
        id: 'll',
        bookPage: 195,
        title: getLessonCardLabel('ll'),
        route: '/lecciones/ll',
        available: true,
      },
      {
        id: 'gr',
        bookPage: 201,
        title: getLessonCardLabel('gr'),
        route: '/lecciones/gr',
        available: true,
      },
      {
        id: 'gl',
        title: getLessonCardLabel('gl'),
        route: '/lecciones/gl',
        available: true,
      },

      {
        id: 'repaso-unidad-5',
        title: 'Palabras para leer y practicar',
        route: '/unidad-5/palabras-practica',
        available: true,
      },
      {
        id: 'gato-raton',
        title: '¡El gato y el ratón!',
        route: '/lecciones/gato-raton',
        available: true,
      },
    ],
  },
  {
    id: 6,
    title: 'Unidad 6',
    pageRange: 'Páginas 213–256',
    lessons: [
      {
        id: 'x',
        title: getLessonCardLabel('x'),
        route: '/lecciones/x',
        available: false,
      },
      {
        id: 'y-letra',
        title: getLessonCardLabel('y-letra'),
        route: '/lecciones/y-letra',
        available: false,
      },
      {
        id: 'k',
        title: getLessonCardLabel('k'),
        route: '/lecciones/k',
        available: false,
      },
      {
        id: 'w',
        title: getLessonCardLabel('w'),
        route: '/lecciones/w',
        available: false,
      },
      {
        id: 'fr',
        title: getLessonCardLabel('fr'),
        route: '/lecciones/fr',
        available: false,
      },
      {
        id: 'fl',
        title: getLessonCardLabel('fl'),
        route: '/lecciones/fl',
        available: false,
      },
      {
        id: 'ge-gi',
        title: getLessonCardLabel('ge-gi'),
        route: '/lecciones/ge-gi',
        available: false,
      },
      {
        id: 'ce-ci',
        title: getLessonCardLabel('ce-ci'),
        route: '/lecciones/ce-ci',
        available: false,
      },
      {
        id: 'gue-con-dieresis',
        title: getLessonCardLabel('gue-con-dieresis'),
        route: '/lecciones/gue-con-dieresis',
        available: false,
      },
    ],
  },
]

export function getUnitById(unitId) {
  const parsedUnitId = Number(unitId)

  return (
    units.find(
      (unit) => unit.id === parsedUnitId,
    ) ?? null
  )
}

export function getUnitThemeClass(unitId) {
  const parsedUnitId = Number(unitId)

  return parsedUnitId >= 0 && parsedUnitId <= 7
    ? `planet--${parsedUnitId}`
    : 'planet--default'
}

export function isUnitUnlocked(
  unitId,
  completedLessonIds = new Set(),
) {
  const unit = getUnitById(unitId)
  if (!unit) return false

  const firstAvailableLesson = unit.lessons.find((lesson) => lesson.available)

  return firstAvailableLesson
    ? isLessonUnlocked(firstAvailableLesson.id, completedLessonIds)
    : false
}

// ¿El planeta (0–7) tiene al menos una lección hecha en la app? El 0 son las
// vocales (dentro de la unidad 1); los planetas sin lecciones van bloqueados.
export function planetHasLessons(planetId) {
  if (planetId === 0) return Boolean(getLessonById('vocales'))
  return getUnitById(planetId)?.lessons.some((lesson) => lesson.available && lesson.id !== 'vocales') ?? false
}

export const availableLessons = units.flatMap((unit) =>
  unit.lessons.filter((lesson) => lesson.available),
)

export function getLessonById(lessonId) {
  return availableLessons.find((lesson) => lesson.id === lessonId) ?? null
}

export function isLessonUnlocked(
  lessonId,
  completedLessonIds = new Set(),
) {
  const lessonIndex = availableLessons.findIndex(
    (lesson) => lesson.id === lessonId,
  )

  if (lessonIndex < 0) return false
  if (lessonIndex === 0 || completedLessonIds.has(lessonId)) return true

  return completedLessonIds.has(availableLessons[lessonIndex - 1].id)
}

// Siguiente lección por hacer (la "misión de hoy") con su unidad.
export function getCurrentLesson(completedLessonIds = new Set()) {
  for (const unit of units) {
    for (const lesson of unit.lessons) {
      if (lesson.available && !completedLessonIds.has(lesson.id) && isLessonUnlocked(lesson.id, completedLessonIds)) {
        return { lesson, unit }
      }
    }
  }
  return null
}
