# Combinación fl · Unidad 6

## Fuente verificada

Ministerio de Educación de Guatemala (Mineduc), **Leo y escribo, Paso 2**, sexta edición, 2026.
PDF oficial: https://mineduc.edu.gt/tmp-libros/leo_y_escribo_paso_2_compressed.pdf

Las páginas impresas 235–238 corresponden a las páginas 237–240 del PDF (índices 236–239). Se revisaron visualmente las cuatro páginas, incluidos sus dibujos, y la página de créditos. Esta autoriza reproducción total o parcial con atribución a MINEDUC y para usos no comerciales. La atribución también se muestra junto al cuento dentro de la lección. El material incorporado se destina al uso educativo no comercial.

## Adaptación

- **235:** cuento completo «La flauta flotante», sus siete párrafos de texto y sus cinco preguntas de conversación; lectura paginada mediante StoryCard.
- **236:** presentación Fl/fl y unión de los sonidos f + l; ejemplos florero, flotar, inflar, fleco; selección de flor, flecha e inflador frente al distractor jirafa; tres selecciones de palabras a partir de sonidos (flor/flaco/flota); trabalenguas original de Floridalma Flores.
- **237:** cinco combinaciones vocálicas; asociación de flamenco, fleco, chiflido y florero con su sílaba; las diez palabras originales, repartidas en dos grupos para identificar flo/fle/fla/fli/flu. La práctica de trazo se transforma en reconocimiento visual, sin escritura manual.
- **238:** relato original de Flory y seis pantallas de selección que cubren sus nueve espacios. El relato permanece visible para consultar las respuestas. El recorte y pegado de revistas para casa no se implementó como una actividad digital.

Total: **17 pantallas** de ejercicios en tres actividades, además del cuento. Las respuestas conservan los objetivos y vocabulario del libro; las instrucciones de interacción y distractores son adaptaciones digitales.

## Integración

Ruta de lectura: `/lecciones/fl`.
Rutas de actividad: `/actividad/fl-sonidos`, `/actividad/fl-silabas`, `/actividad/fl-final`.

La entrada existente se habilita en Unidad 6 entre fr y ge-gi, con página inicial 235. Se reutilizan BookLessonReading, StoryCard, BookLessonActivity, BookLessonExercise, los helpers de contenido, los estilos existentes, el tema planet--6, el sello Flecha y el registro de intentos/finalización en Supabase.

No se añadieron dependencias, CSS ni un motor de actividades paralelo. Dos ampliaciones opcionales de los componentes compartidos permiten mostrar ambas formas grandes Fl/fl y la atribución de la fuente. Las lecciones que no usan esas propiedades conservan su comportamiento.

La navegación conserva el flujo compartido: continuar entre ejercicios/actividades, regresar al menú de la lección para elegir otra actividad y regresar a Unidad 6. Los intentos se registran mediante el sistema existente; el índice local de ejercicio no se restaura al volver a abrir una actividad, igual que en las demás lecciones. No se cambió el contrato de progreso.

## Imágenes y audio

Se añadieron doce PNG en `public/images/lecciones/fl/`, recortados del PDF oficial: lectura-fl, flauta, flor, flecha, jirafa, inflador, floridalma, flamenco, fleco, chiflido, florero, flory. Son archivos locales; no dependen de URLs externas.

No se suministraron grabaciones fl. Todas las referencias tienen ruta, transcripción y categoría, y se marcan explícitamente como pendientes (`available: false`). Se reutilizan el botón deshabilitado «Audio próximamente disponible» y playLessonAudio, sin solicitar archivos inexistentes ni reproducir varias pistas a la vez. Mientras falten audios, la lectura requiere apoyo de la maestra; no se afirma que haya reproducción audible disponible.

El manifiesto `fl-audios.json` contiene cada ruta y su guion de grabación. Al recibir los MP3, colocarlos bajo `public/audio/lecciones/fl/` y ajustar `markPendingRecordings` en flData.js para habilitar únicamente las rutas realmente entregadas. Incluye guiones de oraciones completas preparados para grabación, aunque el componente de relación solo reproduce actualmente los enunciados y la retroalimentación general.

## Archivos

Creados:
- src/data/flData.js
- tests/flLesson.test.mjs
- docs/leccion-fl.md
- docs/fl-audios.json
- public/images/lecciones/fl/*.png (12)

Modificados:
- src/data/units.js
- src/routes/AppRouter.jsx
- src/components/lessons/BookLessonExercise.jsx (letterForms opcional)
- src/components/lessons/BookLessonReading.jsx (source opcional)

## Verificación y pendientes

- Compilación de producción correcta; persiste la advertencia del bundle compartido de más de 500 kB.
- 41 pruebas Node correctas, incluidas tres nuevas para fl: orden de desbloqueo, contenido, nueve espacios, respuestas alcanzables, imágenes locales, rutas y guiones consistentes.
- ESLint de los archivos de implementación modificados correcto.
- No se modificaron los datos ni los recursos de otras lecciones; sus 38 pruebas existentes pasan.
- El servidor Vite inició correctamente en http://127.0.0.1:5173/.
- La herramienta de control de Chrome detuvo la revisión al no poder determinar la URL activa con suficiente confianza. No se completó prueba manual de menús, respuestas, navegación, diseño responsive ni consola en navegador. Los controles de audio pendientes se verificaron por contrato y pruebas de datos, no por reproducción audible.
- Pendiente: grabaciones y prueba manual con una sesión de estudiante, incluido el guardado real de progreso en Supabase.

El montaje temporal de revisión y el PDF descargado para inspección se retiraron del repositorio.
