export const JUGUEMOS_PALABRAS_ID =
  'juguemos-palabras'

const IMAGE_FOLDER =
  '/images/lecciones/juguemos-palabras'

export const JUGUEMOS_PICTURE_WORDS = [
  {
    id: 'luna',
    word: 'luna',
    image: `${IMAGE_FOLDER}/luna.png`,
    imageAlt: 'La luna',
  },
  {
    id: 'rosa',
    word: 'rosa',
    image: `${IMAGE_FOLDER}/rosa.png`,
    imageAlt: 'Una rosa',
  },
  {
    id: 'mula',
    word: 'mula',
    image: `${IMAGE_FOLDER}/mula.png`,
    imageAlt: 'Una mula',
  },
  {
    id: 'piso',
    word: 'piso',
    image: `${IMAGE_FOLDER}/piso.png`,
    imageAlt: 'Un piso',
  },
  {
    id: 'tele',
    word: 'tele',
    image: `${IMAGE_FOLDER}/tele.png`,
    imageAlt: 'Un televisor',
  },
  {
    id: 'oso',
    word: 'oso',
    image: `${IMAGE_FOLDER}/oso.png`,
    imageAlt: 'Un oso',
  },
  {
    id: 'puma',
    word: 'puma',
    image: `${IMAGE_FOLDER}/puma.png`,
    imageAlt: 'Un puma',
  },
  {
    id: 'loro',
    word: 'loro',
    image: `${IMAGE_FOLDER}/loro.png`,
    imageAlt: 'Un loro',
  },
  {
    id: 'mano',
    word: 'mano',
    image: `${IMAGE_FOLDER}/mano.png`,
    imageAlt: 'Una mano',
  },
  {
    id: 'rata',
    word: 'rata',
    image: `${IMAGE_FOLDER}/rata.png`,
    imageAlt: 'Una rata',
  },
  {
    id: 'rama',
    word: 'rama',
    image: `${IMAGE_FOLDER}/rama.png`,
    imageAlt: 'Una rama',
  },
  {
    id: 'topo',
    word: 'topo',
    image: `${IMAGE_FOLDER}/topo.png`,
    imageAlt: 'Un topo',
  },
  {
    id: 'pino',
    word: 'pino',
    image: `${IMAGE_FOLDER}/pino.png`,
    imageAlt: 'Un pino',
  },
  {
    id: 'lana',
    word: 'lana',
    image: `${IMAGE_FOLDER}/lana.png`,
    imageAlt: 'Un ovillo de lana',
  },
  {
    id: 'melon',
    word: 'melón',
    image: `${IMAGE_FOLDER}/melon.png`,
    imageAlt: 'Un melón',
  },
  {
    id: 'pala',
    word: 'pala',
    image: `${IMAGE_FOLDER}/pala.png`,
    imageAlt: 'Una pala',
  },
  {
    id: 'mono',
    word: 'mono',
    image: `${IMAGE_FOLDER}/mono.png`,
    imageAlt: 'Un mono',
  },
  {
    id: 'sala',
    word: 'sala',
    image: `${IMAGE_FOLDER}/sala.png`,
    imageAlt: 'Una sala',
  },
  {
    id: 'toro',
    word: 'toro',
    image: `${IMAGE_FOLDER}/toro.png`,
    imageAlt: 'Un toro',
  },
  {
    id: 'sol',
    word: 'sol',
    image: `${IMAGE_FOLDER}/sol.png`,
    imageAlt: 'El sol',
  },
  {
    id: 'moto',
    word: 'moto',
    image: `${IMAGE_FOLDER}/moto.png`,
    imageAlt: 'Una motocicleta',
  },
  {
    id: 'sapo',
    word: 'sapo',
    image: `${IMAGE_FOLDER}/sapo.png`,
    imageAlt: 'Un sapo',
  },
  {
    id: 'rita',
    word: 'Rita',
    image: `${IMAGE_FOLDER}/rita.png`,
    imageAlt: 'Rita',
  },
  {
    id: 'pepe',
    word: 'Pepe',
    image: `${IMAGE_FOLDER}/pepe.png`,
    imageAlt: 'Pepe',
  },
  {
    id: 'nati',
    word: 'Nati',
    image: `${IMAGE_FOLDER}/nati.png`,
    imageAlt: 'Nati',
  },
]

export const JUGUEMOS_READING_WORDS = [
  'nena',
  'loma',
  'solo',
  'meta',
  'pato',
  'mapa',
  'tela',
  'risa',
  'lima',
  'ala',
  'sale',
  'pita',
  'mar',
  'ramo',
  'sal',
  'polo',
  'tapa',
  'sano',
  'mesa',
  'pera',
  'lupa',
  'mora',
  'pito',
  'roto',
  'nata',
]

export function shuffleJuguemosItems(items) {
  const shuffled = [...items]

  for (
    let index = shuffled.length - 1;
    index > 0;
    index -= 1
  ) {
    const randomIndex =
      Math.floor(Math.random() * (index + 1))

    ;[shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ]
  }

  return shuffled
}

export function createJuguemosRounds(
  items,
  roundCount = 5,
  optionCount = 6,
) {
  return shuffleJuguemosItems(items)
    .slice(0, roundCount)
    .map((target) => {
      const targetId =
        typeof target === 'string'
          ? target
          : target.id

      const distractors = shuffleJuguemosItems(
        items.filter((item) => {
          const itemId =
            typeof item === 'string'
              ? item
              : item.id

          return itemId !== targetId
        }),
      ).slice(0, optionCount - 1)

      return {
        target,
        options: shuffleJuguemosItems([
          target,
          ...distractors,
        ]),
      }
    })
}