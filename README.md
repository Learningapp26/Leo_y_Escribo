# Proyecto Leo y Escribo

Proyecto de horas de extensión de la Universidad del Valle de Guatemala, Facultad de Ingeniería, 2026.

Leo y Escribo adapta el material *Leo y escribo, Paso 2* a una plataforma de práctica de lectura para primero de primaria. El estudiante recorre siete unidades, escucha fonemas y palabras, lee cuentos, practica mediante ejercicios y juegos y consulta su avance. El acceso compartido identifica el módulo de Comunicación como **Leo y Aprendo** y conduce a docentes y coordinación a sus paneles en el módulo de Matemática.

## Documentación final

| Documento | Markdown | Word | PDF |
| --- | --- | --- | --- |
| Manual técnico y de desarrolladores | [Markdown](docs/manual-tecnico.md) | [Word](docs/entregables/word/Manual_Tecnico_Leo_y_Escribo.docx) | [PDF](docs/entregables/pdf/Manual_Tecnico_Leo_y_Escribo.pdf) |
| Manual de usuario | [Markdown](docs/manual-usuario.md) | [Word](docs/entregables/word/Manual_Usuario_Leo_y_Escribo.docx) | [PDF](docs/entregables/pdf/Manual_Usuario_Leo_y_Escribo.pdf) |
| Manual de administración y gestión de contenido | [Markdown](docs/manual-administrador.md) | [Word](docs/entregables/word/Manual_Administrador_Leo_y_Escribo.docx) | [PDF](docs/entregables/pdf/Manual_Administrador_Leo_y_Escribo.pdf) |
| Guía rápida para estudiantes | [Markdown](docs/guia-rapida-estudiantes.md) | [Word](docs/entregables/word/Guia_Rapida_Estudiantes.docx) | [PDF](docs/entregables/pdf/Guia_Rapida_Estudiantes.pdf) |

El [índice de documentación](docs/README.md) enlaza las evidencias de entrega y el proceso de actualización. La [nota de despliegue](comunicacion/docs/deploy-cloudflare.md) y las notas de adaptación de `comunicacion/docs` se conservan como referencias del proyecto.

## Desarrollo local

El frontend utiliza JavaScript, React 19, React Router 7, Vite 8, Tailwind CSS 4 y estilos propios. Supabase Auth y PostgreSQL sostienen las cuentas y el progreso. Los archivos `wrangler.jsonc` configuran el alojamiento de la SPA con Cloudflare Workers Static Assets.

Use Git, Node.js 22.14.0 y npm 10.9.2 como referencia de la versión revisada. Desde la raíz del repositorio ejecute:

```bash
cd comunicacion
npm ci
npm run dev -- --host localhost --port 5173 --strictPort
```

Abra `http://localhost:5173/login`. El [manual técnico](docs/manual-tecnico.md#7-instalación-y-configuración) explica el entorno de pruebas de Supabase, la conexión con Matemática, las variables de compilación y las verificaciones. Para probar los paneles, alinee el proyecto de Supabase de pruebas y los orígenes de ambos repositorios.

## Equipo

- Mishell Rosa Elvira Ciprian Jiménez · 231169.
- Ingrid Nina Alessandra Nájera Marakovits · 231088.
- Diego Alejandro Ramírez Velásquez · 23601.
- Adriana Martínez Fuentes · 24086.
- Marcela Castillo · 24952.

## Créditos

Material educativo base del Ministerio de Educación de Guatemala (2020), *Leo y escribo, Paso 2* para primer grado del Nivel de Educación Primaria. [Copia pública oficial, parte 1](https://aprendoencasayenclase.mineduc.gob.gt/wp-content/uploads/Leo_y_escribo_Paso_2G_-_parte1.pdf).

La [nota de la lección fl](comunicacion/docs/leccion-fl.md) registra la edición empleada para esa adaptación y la atribución correspondiente. El manual técnico recoge los créditos verificables y los activos cuya procedencia requiere revisión.
