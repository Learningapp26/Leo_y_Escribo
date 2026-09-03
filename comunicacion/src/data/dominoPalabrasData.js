export const DOMINO_PALABRAS_ID = 'domino-palabras'

export const DOMINO_PALABRAS_TILES = [
  { id: 'jarra-chancho', imageId: 'jarra', image: '/images/lecciones/j/jarra.png', imageAlt: 'Una jarra', word: 'chancho' },
  { id: 'chancho-conejo', imageId: 'chancho', image: '/images/lecciones/domino-palabras/chancho.svg', imageAlt: 'Un chancho rosado', word: 'conejo' },
  { id: 'conejo-jalea', imageId: 'conejo', image: '/images/lecciones/j/conejo.png', imageAlt: 'Un conejo', word: 'jalea' },
  { id: 'jalea-banano', imageId: 'jalea', image: '/images/lecciones/j/jalea.png', imageAlt: 'Un frasco de jalea', word: 'banano' },
  { id: 'banano-abeja', imageId: 'banano', image: '/images/lecciones/b/banano.png', imageAlt: 'Un banano', word: 'abeja' },
  { id: 'abeja-tren', imageId: 'abeja', image: '/images/lecciones/b/abeja.png', imageAlt: 'Una abeja', word: 'tren' },
  { id: 'tren-blusa', imageId: 'tren', image: '/images/lecciones/tr/tren.png', imageAlt: 'Un tren', word: 'blusa' },
  { id: 'blusa-brujula', imageId: 'blusa', image: '/images/lecciones/bl/blusa.png', imageAlt: 'Una blusa', word: 'brújula' },
  { id: 'brujula-mochila', imageId: 'brújula', image: '/images/lecciones/domino-palabras/brujula.svg', imageAlt: 'Una brújula', word: 'mochila' },
  { id: 'mochila-jarra', imageId: 'mochila', image: '/images/lecciones/m/mochila.png', imageAlt: 'Una mochila', word: 'jarra' },
]

export const DOMINO_START_TILE = DOMINO_PALABRAS_TILES[0]

export function shuffleDominoTiles(tiles) {
  const shuffledTiles = [...tiles]

  for (let index = shuffledTiles.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffledTiles[index], shuffledTiles[randomIndex]] = [
      shuffledTiles[randomIndex],
      shuffledTiles[index],
    ]
  }

  return shuffledTiles
}
