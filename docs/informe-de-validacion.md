# Informe de entrega y validación

Universidad del Valle de Guatemala · Facultad de Ingeniería · Horas de extensión 2026  
Leo y Escribo · Documentación 1.0 · 26 de noviembre de 2026

## Entregables

| Documento | Markdown | Word | PDF | Páginas del PDF |
| --- | --- | --- | --- | ---: |
| Manual técnico y de desarrolladores | [Markdown](manual-tecnico.md) | [Word](entregables/word/Manual_Tecnico_Leo_y_Escribo.docx) | [PDF](entregables/pdf/Manual_Tecnico_Leo_y_Escribo.pdf) | 26 |
| Manual de usuario | [Markdown](manual-usuario.md) | [Word](entregables/word/Manual_Usuario_Leo_y_Escribo.docx) | [PDF](entregables/pdf/Manual_Usuario_Leo_y_Escribo.pdf) | 23 |
| Manual de administración y gestión de contenido | [Markdown](manual-administrador.md) | [Word](entregables/word/Manual_Administrador_Leo_y_Escribo.docx) | [PDF](entregables/pdf/Manual_Administrador_Leo_y_Escribo.pdf) | 11 |
| Guía rápida para estudiantes | [Markdown](guia-rapida-estudiantes.md) | [Word](entregables/word/Guia_Rapida_Estudiantes.docx) | [PDF](entregables/pdf/Guia_Rapida_Estudiantes.pdf) | 2 |

Se añadió el [índice de documentación](README.md) y se actualizó el [README del repositorio](../README.md). La carpeta `docs` reúne los doce manuales, el índice, este informe, los activos y las herramientas de generación. El README conserva el registro previo de integrantes. Las portadas incluyen los cuatro nombres indicados para la entrega y se compusieron con identificación institucional en texto, al no localizarse un logotipo oficial en el repositorio.

## Implementación revisada

- **Comunicación, `7e4224f`.** Acceso compartido, selector de módulo, inicio, galaxia, siete unidades, lecciones, cuentos, ejercicios, seis juegos finales, imágenes, audio, grabación opcional, progreso y recompensas.
- **Matemática, `c9fda4b`.** Se inspeccionó la integración con el acceso de Comunicación, el panel docente, el alta y consulta de cursos, el detalle de estudiantes de Matemática y el panel de coordinación. El resto del módulo de Matemática queda fuera del alcance de los cuatro manuales.
- **Roles.** Estudiante, docente y coordinación. El estado en revisión o aprobado modifica el acceso docente. Padres o tutores acompañan la cuenta de estudiante. Las funciones de mantenimiento institucional se gestionan con los accesos de infraestructura.
- **Tecnologías.** JavaScript y JSX, React 19.2.7, React Router DOM 7.18.1, Vite 8.1.4, Tailwind CSS 4.3.2, Lucide React 1.24.0, Supabase JS 2.110.2, PostgreSQL administrado, ESLint 10.7.0 y configuración de Cloudflare Workers Static Assets. La versión de PostgreSQL del servicio alojado sigue por confirmar.

## Verificaciones

| Comprobación | Resultado |
| --- | --- |
| `node --test tests/*.test.mjs` | 46 aprobadas, 0 fallidas, en 12 archivos de prueba |
| `npm run lint` | Completó con código de salida 0 |
| `npm run build` | Compilaron Comunicación y Matemática a directorios de trabajo temporales. Vite avisó que el paquete principal superaba 500 kB en ambos |
| Instalación limpia en una copia aislada | `npm ci --offline` no pudo obtener una dependencia que faltaba en caché. El intento con registro habilitado terminó con un error de npm. Las demás comprobaciones usaron las dependencias instaladas y el lock del repositorio como referencia |
| Navegador de escritorio y vista móvil | Chrome 157, escritorio de 1160 × 860 y muestra de 390 × 844. Playwright sirvió el paquete local y respondió al tráfico Auth y de datos con registros ficticios. Se bloquearon solicitudes externas |
| Flujo de estudiante ejecutado | Login por contraseña con servicio simulado, selección de Comunicación, primera misión, respuesta incorrecta y reintento, acierto, avance hasta el cierre, unidad siguiente, progreso y sellos. La solicitud de audio de «avión» obtuvo respuesta 200 del paquete local. Se abrieron las pantallas representativas de los juegos y otros tipos de ejercicio |
| Flujos escolares ejecutados | Puente de sesión al módulo de Matemática, cuenta en revisión, grupo aprobado, creación de curso, búsqueda y ficha ficticia, lista de coordinación y aprobación en memoria |
| Artefactos | Se comprobaron tamaño carta, texto seleccionable, encabezados editables, imágenes incrustadas y enlaces. Word actualizó los tres índices y produjo las versiones PDF. La revisión visual usó las páginas exportadas por Microsoft Word y rasterizadas con Poppler, dado que LibreOffice no estaba disponible |
| Git y datos | Revisión de estados y diffs en los repositorios correspondientes. Los cambios se concentran en el README principal y la carpeta de entrega. La ejecución del navegador usó datos ficticios y no escribió en Supabase ni publicó cambios |

Las verificaciones de interfaz cubren transiciones y respuestas en un entorno reproducible mediante simulación. La lectura del SQL, las reglas de acceso, OAuth, el correo, la voz, la lógica interna de juegos y la operación de Cloudflare se documentaron por inspección. En particular, los juegos aparecen en las capturas por sus tipos de interacción; no se completaron todas sus partidas.

## Evidencia visual

Hay 44 archivos PNG en [assets/capturas](assets/capturas/), entre pantallas y recortes de las mismas interfaces. Incluyen acceso, registro, selector, mapa, unidad, cuento, selección, orden, casillas de sonido, emparejamiento, composición oral, crucigrama, repaso, los seis juegos finales, acierto, reintento y progreso. Para la gestión se incluyen alta docente, estado en revisión, grupo y curso ficticios, búsqueda, ficha de Matemática y aprobación de coordinación. La guía de estudiantes amplía los controles de su recorrido y usa el personaje Leo de la propia interfaz.

El manual técnico incorpora ocho diagramas con [fuentes editables e imágenes](assets/diagramas/). Cubren arquitectura, entidades, componentes, autenticación, navegación, actividad, progreso y despliegue. El esquema de referencia se basa en el contrato del cliente y los archivos SQL disponibles.

## Datos pendientes de verificar

1. Confirmar en un entorno institucional de pruebas el dominio final, la instancia de Supabase, los proveedores de autenticación, la entrega de correo, la política efectiva por fila y el estado de las migraciones. Repetir la prueba de persistencia y aislamiento entre aulas con cuentas de prueba.
2. Conseguir evidencias de confirmación real por correo, acceso por Google si se habilita, grabación con micrófono y persistencia de un flujo docente en el entorno autorizado. Las capturas actuales de los perfiles escolares emplean respuestas simuladas. La plataforma de producción queda fuera de la verificación visual.
3. Confirmar la atribución y el permiso de imágenes y grabaciones sin créditos individuales. Revisar la correspondencia entre las ediciones del libro que se usaron en las distintas lecciones y confirmar el listado institucional antes de emitir la publicación final.
4. Revisar accesibilidad con teclado, lector de pantalla, contraste y dispositivos escolares. La prueba de compatibilidad fue muestral.

## Observaciones para continuidad

- En Comunicación **Salir** abre el acceso y puede dejar activa la sesión. Se documentó el comportamiento para equipos compartidos. Matemática tiene un control **Cerrar sesión** en sus paneles.
- El avance de lectura se presenta en **Mi progreso** de Comunicación. El panel docente de la integración revisada consulta métricas de Matemática.
- El catálogo de Comunicación, sus imágenes y audios se mantienen en el repositorio. Las interfaces escolares no ofrecen un editor de estos recursos. Algunas lecciones conservan grabaciones marcadas como pendientes.
- La unión de sesión entre módulos, el alta inicial del estudiante por código, el esquema compartido y el orden curricular son contratos de mantenimiento. Cualquier cambio en ellos necesita validación coordinada en los dos repositorios.

