# Lección Dr

Fuente: `DR.pdf`, cuatro páginas escaneadas, numeración impresa 171–174.
Unidad 5, identificador `dr`, nombre visible **Combinación Dr**.

## Contenido y adaptación

- Lectura: los tres párrafos completos de «El dragón volador». Termina en
  «Entonces los niños...» porque el libro pide inventar un final en equipo.
  Las dos indicaciones de conversación se conservan para la maestra, sin audio.
- Actividad 1, `/actividad/dr-sonidos`: cuatro pasos. Sonidos de dragón;
  podrido, ladrón, madrina y padrino; selección de cuadro, piedra y ladrillo
  entre los cuatro dibujos impresos; pronunciación de ladrar, madre y padre;
  los dos trabalenguas completos. Pintar se adapta a seleccionar, y aplaudir
  y declamar siguen siendo prácticas orales.
- Actividad 2, `/actividad/dr-silabas`: siete pasos. Dr/dr y las cinco
  combinaciones con vocales; lectura ilustrada de almendra, ajedrez,
  cocodrilo y ladrón; cinco selecciones para asociar las palabras impresas
  con dro, dre, dra, dri y dru. Se conserva «madrileña», confirmada ampliando
  el escaneo. «Compadre» aparece dos veces en el libro y se muestra una sola
  tarjeta. Los distractores pertenecen al mismo ejercicio impreso.
- Actividad 3, `/actividad/dr-final`: tres pasos. Formación de madre y piedra
  con letras, manteniendo el orden del banco del libro, y composición oral
  libre con una palabra de cada uno de los tres recuadros originales. No se
  impone una oración ni se usan las respuestas manuscritas del ejemplar.
  La maestra escucha la oración. Cambiar una palabra requiere confirmarla
  nuevamente antes de terminar.

El trazado físico no se simula con el ratón: se observan las formas Dr/dr,
se reconocen sus combinaciones y se forman palabras mediante selección.
El dibujo libre del final del cuento se conserva como práctica acompañada
en papel, tal como indica la sección de conversación del libro.

## Integración

Reutiliza `BookLessonReading`, `BookLessonActivity`, `BookLessonExercise`,
`Button`, `Card`, `BackButton`, `LessonAudioButton`, `ProgressBar` y
`StarsCounter`. Los estilos son los compartidos de lectura, selección,
completar, sílabas y temas; no existe CSS exclusivo para Dr.

Los componentes de lectura y actividad ahora toman la unidad de `unitId`,
conservando Unidad 4 para F, Ñ y rr. La composición con bancos de palabras,
los audios de segmentación y el banco compacto de letras son opciones
reutilizables, no componentes exclusivos de Dr.

`units.js` habilita Dr después de Juego de memoria, la última lección de la
Unidad 4. Se mantienen `LessonAccessGuard`, `useStudentProgress`,
`registrarProgreso` y `registrarLeccionCompletada`; no se modifica Supabase.
`ProgressPage` incorpora Dr automáticamente. Al terminar se vuelve a
`/lecciones/unidad/5`. La lectura está en `/lecciones/dr`.

## Ilustraciones

PNG individuales con canal alfa en `public/images/lecciones/dr/`:
`dragon.png`, `cuadro.png`, `piedra.png`, `martillo.png`, `ladrillo.png`,
`almendra.png`, `ajedrez.png`, `cocodrilo.png`, `ladron.png`.

**Pendiente de la propietaria:** `public/images/lecciones/dr/lectura-dr.png`.
No se genera ni sustituye la ilustración del cuento. Mientras no exista,
el componente compartido muestra el cuento completo sin imagen rota.

Generadas con la herramienta integrada de imágenes, sin API/CLI externo.
Prompt base de los ocho objetos/personajes:

> One individual vocabulary illustration: [subject]. Traditional colorful
> children's educational textbook illustration, clean hand-drawn dark outlines
> and softly colored surfaces, simple recognizable form. Entire subject visible,
> centered with generous margins. Truly transparent background. No text, no
> letters, no frame, no ground or scenery. Single asset, not collage. PNG.

Sujetos por archivo:

- cuadro: a single framed painting of colorful flowers, wooden picture frame
  with small hanging string, no scenery outside the painting.
- piedra: one smooth oval gray stone.
- martillo: one claw hammer with a wooden handle and steel head.
- ladrillo: one solid red clay rectangular brick.
- almendra: a single almond in its tan shell with a brown almond kernel beside
  it, the same fruit represented intact and shelled.
- ajedrez: one small black and white chessboard with recognizable black and
  white chess pieces arranged on its squares, viewed from above at a gentle angle.
- cocodrilo: one green crocodile in side view with long snout and full tail,
  friendly and recognizable, not a dinosaur.
- ladron: a fictional adult thief in a dark cap and dark clothes running while
  carrying a plain cardboard box, full body, no mask, no weapon, lighthearted
  children's textbook style.

Para los primeros cuatro, el prompt dice «Entire object» y «no border around
the canvas» en lugar de «Entire subject» y «no frame».

Prompt de dragon.png:

> Create one individual educational children's picture-book vocabulary
> illustration of a friendly green dragon, orange and yellow wings, long tail
> ending in arrow tip, white belly. Entire animal visible, centered, ample
> margins. Clean hand-drawn ink outlines, softly colored simple textbook
> illustration for early readers, consistent with traditional Spanish
> first-grade textbooks. No scene, no people, no text, no letters, no border,
> no ground, truly transparent background. This is a vocabulary cutout,
> NOT a story scene. Save PNG.

## Audios y validación

Los botones usan `/audio/lecciones/dr/`. La grabación está pendiente.
`AUDIOS_DR.md`, en la raíz del repositorio y sin seguimiento en Git, contiene
65 archivos únicos con texto, ruta y ubicación en las pantallas. El cuento
completo también está en esa guía. No se incluyen audios de preguntas para
la maestra ni oraciones inventadas como respuestas únicas.

Pruebas: `node --test tests/drLesson.test.mjs tests/bookLessons.test.mjs`.
La prueba anterior de F/Ñ se actualiza al orden actual Cl → Cr → F → V → rr → Ñ.
Verificación del recorrido con Supabase y audio simulados, sin cuentas ni
escrituras reales: respuestas correctas/incorrectas, quitar letras, selección
de los tres bancos, reintento de guardado, registro único de finalización,
retorno a Unidad 5, ProgressPage, rutas bloqueadas, scroll y pantallas móviles.
Los MP3 reales se verificarán cuando se incorporen las grabaciones.
