# Lecciones F y Ñ

Fuente: `LeoyEscribo.pdf` proporcionado por la propietaria del proyecto. F: páginas 139–146. Ñ: páginas 159–166. Los cuentos «La foto familiar» y «La niña y el ñandú» conservan sus cuatro párrafos completos. Se transcribió el contenido impreso, no las respuestas manuscritas del ejemplar.

## Contenido y adaptación

| Lección | Sonidos | Letra y sílabas | Formación de palabras | Actividad final |
| --- | --- | --- | --- | --- |
| F | Páginas 140–142; sonido inicial, última sílaba, posición del fonema | Páginas 143–144; reconocimiento de mayúscula/minúscula y combinaciones | Página 145; ordenar letras y sílabas | Página 146; asociar nombres y producir oraciones propias |
| Ñ | Páginas 160–162; identificación, posición, rimas y omisión de sílabas | Páginas 163–164; reconocimiento de mayúscula/minúscula y combinaciones | Página 165; completar y ordenar sílabas | Página 166; los dos trabalenguas completos y las tres oraciones impresas |

Las actividades de señalar, subrayar y unir se resuelven mediante selección; escribir nombres se adapta a formar palabras. El reconocimiento de las formas mayúscula y minúscula sustituye la copia manuscrita. La creación de oraciones sobre familia, jirafa y feria se mantiene abierta y oral, con acompañamiento docente: no se inventa una respuesta única ni se asigna una estrella por autoconfirmarla. Las preguntas de comprensión se conversan con la maestra, tal como propone el libro.

La primera oración de Ñ incluye todas las palabras impresas: «La niña come caña y piña.». La respuesta manuscrita del ejemplar omite «caña», pero no se usa como fuente. El dibujo de farol de la página 143 representa una torre de faro: ambas palabras mantienen sus propios audios y archivos de imagen, reutilizando esa ilustración.

## Arquitectura y rutas

`fData.js` y `enieData.js` contienen el contenido y los guiones de audio. `bookLessonHelpers.js` construye los datos repetitivos. `BookLessonReading`, `BookLessonActivity` y `BookLessonExercise` son componentes genéricos para cuentos y actividades del libro; utilizan Button, Card, BackButton, ProgressBar, StarsCounter y el reproductor existente mediante LessonAudioButton.

Se reutilizan global.css, reading.css, selection.css, completion.css y syllables.css. Los pequeños ajustes de anchura y distribución son compartidos y optativos. No hay CSS exclusivo para F o Ñ. Se conserva Lexend y el tema `lesson-theme--unit-4`.

- `/lecciones/f`
- `/actividad/f-sonidos`
- `/actividad/f-silabas`
- `/actividad/f-completar`
- `/actividad/f-final`
- `/lecciones/enie`
- `/actividad/enie-sonidos`
- `/actividad/enie-silabas`
- `/actividad/enie-completar`
- `/actividad/enie-final`

El ID existente de Ñ es `enie`. Los nombres de archivos son ASCII; por ejemplo, `silaba-nia.mp3` se graba pronunciando «ña», no «nia».

## Progreso

Se usan exclusivamente registrarProgreso y registrarLeccionCompletada. Cada registro incluye detalle.leccionId. Las prácticas abiertas registran participación sin estrellas; los aciertos objetivos registran estrellas una vez por ejercicio en la sesión. El guardado final muestra el resultado y permite reintentar un error. La salida regresa a `/lecciones/unidad/4`.

units.js activa ambas lecciones en el orden existente. LessonAccessGuard protege también sus actividades. useStudentProgress admite una clave de actualización para releer el progreso al cambiar de ruta, evitando una lista de completadas desactualizada. ProgressPage consume el mismo resumen existente, sin cambios de esquema ni una segunda lógica de persistencia.

## Multimedia

Las dos ilustraciones de cuento fueron aportadas por la propietaria e incorporadas en estas rutas:

- `public/images/lecciones/f/lectura-f.png`
- `public/images/lecciones/enie/lectura-enie.png`

Los 277 MP3 necesitan grabación humana. El guion privado `AUDIOS_F_ENIE.md`, en la raíz del repositorio, enumera exactamente los archivos referenciados, sus textos y usos; deliberadamente no se versiona. La aplicación ya usa el helper y los botones de audio existentes. Hasta recibir los MP3, los botones no podrán reproducir las grabaciones.

## Validación

- `node --test tests/bookLessons.test.mjs`: orden/desbloqueos, respuestas alcanzables, conservación de historias en audio, rutas de audio sin conflictos y tareas finales del libro.
- Recorrido automatizado en Chrome de las 98 pantallas de ejercicios, con revisión de anchura a 375 px y capturas de escritorio/móvil.
- Accesos bloqueados de las diez rutas; reintento de respuesta; fallo y recuperación del guardado final; una finalización por lección; vuelta a Unidad 4; desbloqueo de V y aparición de F/Ñ en Progreso.
- La prueba de navegador sustituye únicamente la conexión Supabase y el reproductor de audio con datos aislados. No escribe en cuentas reales ni verifica una instancia Supabase de producción o las grabaciones pendientes.

## Generación de imágenes de actividad

Imágenes PNG individuales con transparencia, sin texto ni etiquetas; nunca se generaron ilustraciones de cuento. El prompt común pidió ilustración infantil educativa con lápiz de color y gouache suave, objeto completo y centrado, margen transparente y sin collage ni marco decorativo. Cada petición describió solamente el objeto o concepto indicado por el nombre de archivo. Los personajes Fabi y Felipe corresponden al ejercicio del libro.

El inventario de archivos se encuentra a continuación. Todas las rutas son relativas a `comunicacion/`.

- `public/images/lecciones/enie/arania.png`
- `public/images/lecciones/enie/banano.png`
- `public/images/lecciones/enie/borrador.png`
- `public/images/lecciones/enie/cabania.png`
- `public/images/lecciones/enie/cania.png`
- `public/images/lecciones/enie/espejo.png`
- `public/images/lecciones/enie/lenia.png`
- `public/images/lecciones/enie/meniique.png`
- `public/images/lecciones/enie/monio.png`
- `public/images/lecciones/enie/montania.png`
- `public/images/lecciones/enie/munieca.png`
- `public/images/lecciones/enie/naranja.png`
- `public/images/lecciones/enie/niandu.png`
- `public/images/lecciones/enie/ninia.png`
- `public/images/lecciones/enie/ninio.png`
- `public/images/lecciones/enie/otonio.png`
- `public/images/lecciones/enie/panial.png`
- `public/images/lecciones/enie/paniuelo.png`
- `public/images/lecciones/enie/pestania.png`
- `public/images/lecciones/enie/pinia.png`
- `public/images/lecciones/enie/piniata.png`
- `public/images/lecciones/enie/punio.png`
- `public/images/lecciones/enie/senial.png`
- `public/images/lecciones/enie/suenio.png`
- `public/images/lecciones/enie/unia.png`
- `public/images/lecciones/f/cafe.png`
- `public/images/lecciones/f/corona.png`
- `public/images/lecciones/f/delfin.png`
- `public/images/lecciones/f/elefante.png`
- `public/images/lecciones/f/estufa.png`
- `public/images/lecciones/f/fabi.png`
- `public/images/lecciones/f/falda.png`
- `public/images/lecciones/f/familia.png`
- `public/images/lecciones/f/fantasma.png`
- `public/images/lecciones/f/faro.png`
- `public/images/lecciones/f/farol.png`
- `public/images/lecciones/f/felipe.png`
- `public/images/lecciones/f/feria.png`
- `public/images/lecciones/f/fideos.png`
- `public/images/lecciones/f/fiebre.png`
- `public/images/lecciones/f/fiesta.png`
- `public/images/lecciones/f/fila.png`
- `public/images/lecciones/f/firma.png`
- `public/images/lecciones/f/flauta.png`
- `public/images/lecciones/f/flecha.png`
- `public/images/lecciones/f/flor.png`
- `public/images/lecciones/f/foca.png`
- `public/images/lecciones/f/foco.png`
- `public/images/lecciones/f/fogata.png`
- `public/images/lecciones/f/foto.png`
- `public/images/lecciones/f/fuego.png`
- `public/images/lecciones/f/fuente.png`
- `public/images/lecciones/f/jirafa.png`
- `public/images/lecciones/f/mochila.png`
- `public/images/lecciones/f/perfume.png`
- `public/images/lecciones/f/pie.png`
- `public/images/lecciones/f/plancha.png`
- `public/images/lecciones/f/sofa.png`
