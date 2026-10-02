// Banco de palabras para el juego de memoria (parejas imagen + palabra).
// Cada item es una pareja única; el componente del juego se encarga de
// duplicar y mezclar las cartas a partir de esta lista.
export const tarjetas = {
  items: [
    {
      id: 'serrucho',
      name: 'serrucho',
      image: '/images/lecciones/memoria_juego/serrucho.png',
    },
    {
      id: 'escribir',
      name: 'escribir',
      image: '/images/lecciones/memoria_juego/escribir.png',
    },
    {
      id: 'teclado',
      name: 'teclado',
      image: '/images/lecciones/memoria_juego/teclado.png',
    },
    {
      id: 'familia',
      name: 'familia',
      image: '/images/lecciones/memoria_juego/familia.png',
    },
    {
      id: 'oveja',
      name: 'oveja',
      image: '/images/lecciones/memoria_juego/oveja.png',
    },
    {
      id: 'elefante',
      name: 'elefante',
      image: '/images/lecciones/memoria_juego/elefante.png',
    },
    {
      id: 'carrusel',
      name: 'carrusel',
      image: '/images/lecciones/memoria_juego/carrusel.png',
    },
    {
      id: 'venado',
      name: 'venado',
      image: '/images/lecciones/memoria_juego/venado.png',
    },
    {
      id: 'carreta',
      name: 'carreta',
      image: '/images/lecciones/memoria_juego/carreta.png',
    },
    {
      id: 'pinata',
      name: 'piñata',
      image: '/images/lecciones/memoria_juego/pinata.png',
    },
    {
      id: 'muneca',
      name: 'muñeca',
      image: '/images/lecciones/memoria_juego/muneca.png',
    },
    {
      id: 'crater',
      name: 'cráter',
      image: '/images/lecciones/memoria_juego/crater.png',
    },
  ],
}

// Deriva las cartas de imagen y palabra sin duplicar las parejas en los datos.
export function crearMazoMemoria(items = tarjetas.items) {
  return items.flatMap(({ id, name, image }) => [
    {
      id: `${id}-imagen`,
      pairId: id,
      type: 'image',
      value: image,
      alt: name,
    },
    {
      id: `${id}-palabra`,
      pairId: id,
      type: 'word',
      value: name,
    },
  ])
}