# Letra Y · Unidad 6

Ruta: `/lecciones/y-letra`. Actividades: `/actividad/y-letra-sonidos`, `-silabas`, `-palabras`, `-final`.

La entrada se habilita después de X; K requiere completar `y-letra`. Conserva el tema `planet--6`, el sello Yoyo y el guardado compartido. La Y como conjunción conserva su ID `y-conjuncion`, ruta, datos y actividades de Unidad 1.

## Contenido

Adaptación original a los objetivos indicados para las páginas 217–222. No había una copia de esas páginas en el proyecto: el cuento «El yoyó de Yoli» no es una transcripción del libro. Pendiente cotejarlo con el ejemplar si se requiere fidelidad textual.

- 217: cuento de cuatro párrafos y conversación, con paginación compartida.
- 218: presentación, selección múltiple de cuatro imágenes, posición del sonido y contraste de la y final de rey/buey (suena i) frente a la ye de yoyó.
- 219: presentación ya/ye/yi/yo/yu y cinco selecciones. Para yi se usa yigüirro, explicado como pájaro y segmentado con ayuda de la maestra.
- 220: omitida; no hay escritura ni trazo.
- 221: reconocimiento de palabra y asociación de cuatro palabras con sílabas.
- 222: dos relaciones palabra/imagen y dos selecciones de oraciones.

16 pantallas de ejercicios en total, con retroalimentación visual, reintento y estrellas mediante los componentes existentes.

## Recursos

Nuevas ilustraciones SVG locales: `public/images/lecciones/y-letra/{yoyo,yema,rayo}.svg`. Se reutilizan las imágenes existentes de payaso, mesa y sol sin modificarlas. El cuento reutiliza la ilustración del yoyó.

Los MP3 están pendientes. Cada audio mantiene `src`, `text` y `category` del contrato existente, bajo `/audio/lecciones/y-letra/`. El listado de grabaciones está en `y-letra-audios.json`. `available: false` impide solicitudes a archivos ausentes, deshabilita los botones con el indicador existente «Audio próximamente disponible» y conserva la retroalimentación visual. Los ejercicios se pueden resolver leyendo con la maestra mientras faltan audios; todavía no son dictados autónomos.

Al disponer de las grabaciones, colocarlas en `public/audio/lecciones/y-letra/` según el manifiesto y actualizar el helper `audio` de `src/data/yLetterData.js` para marcar como disponibles únicamente los archivos entregados. No se añadió librería de audio.

## Validación

- Compilación de producción correcta; advertencia de tamaño del bundle compartido.
- 26 pruebas Node correctas, incluidos aislamiento de IDs, orden de desbloqueo, respuestas alcanzables, recursos y guiones.
- ESLint correcto en archivos de implementación modificados.
- Revisión en navegador de las 16 pantallas con los componentes reales en un montaje temporal sin el guard de autenticación: errores, reintentos, aciertos, transiciones y sello final; consola sin errores.
- Paginación anterior/siguiente del cuento, retorno a la unidad y lectura original de Y como conjunción comprobados. No se editó el código ni los recursos de esa lección.
- Vista estrecha sin desbordamiento horizontal.
- Sin sesión de estudiante: se comprobó el aviso y opción de reintento al no guardar; el guardado efectivo en Supabase queda por validar con una sesión real.
- No se hizo una revisión manual exhaustiva de todas las demás lecciones; sus 23 pruebas previas siguen pasando.

No se conservaron archivos del montaje temporal de revisión.
