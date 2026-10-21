# Arreglo del deploy en Cloudflare

El deploy de Comunicación en Cloudflare (Worker `leo-y-escribo`) fallaba
con este error:

```
✘ [ERROR] Asset too large.
Cloudflare Workers supports assets with sizes of up to 25 MiB.
```

## Qué se cambió en esta rama

### 1. Se borraron dos `.zip` que no se usan

| Archivo | Tamaño |
|---|---|
| `public/images/lecciones/q.zip` | 39 MB |
| `public/images/lecciones/c.zip` | 14 MB |

Cloudflare no acepta archivos de más de 25 MB, así que `q.zip` rompía el
deploy. Los dos son copias comprimidas de las carpetas `q` y `c`, que siguen
en su lugar con todas sus imágenes. Ninguna parte de la app los usa (no
aparecen en `src` ni en `index.html`). Quedan en el historial de git por si
hicieran falta.

### 2. Se agregó `wrangler.jsonc`

Antes no había configuración, y Cloudflare subía la carpeta del código tal
cual (el log decía «Read 1392 files from the assets directory
…/comunicacion»). El archivo nuevo le dice tres cosas:

- **Publicar `dist`**, que es la app compilada por `npm run build`.
- **Cualquier ruta carga la app** (`not_found_handling`). Sin esto, recargar
  estando en `/home` o abrir un link directo a `/welcome` da 404.
- **`previews`**, que Cloudflare pide para armar la vista previa de las
  ramas que no son `main`. Sin él, el deploy de la rama fallaba con «Your
  Wrangler configuration is missing a `previews` block».

### 3. Se agregó otro `wrangler.jsonc` en la raíz del repo

Las vistas previas de ramas corren desde la raíz del repo y sin build
command, aunque el panel diga otra cosa. Este archivo compila la app
(`cd comunicacion && npm ci && npm run build`) y publica `comunicacion/dist`,
así que la vista previa funciona sin depender del panel.

## Configuración en el panel de Cloudflare

En el Worker `leo-y-escribo` → **Settings** → **Build**:

| Campo | Valor |
|---|---|
| Root directory | `comunicacion` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |

El build command es el que importa: sin él no existe `dist` y no hay nada
que publicar.

Variables de entorno de build (Settings → Variables and secrets, en la parte
de **build**):

| Variable | Valor |
|---|---|
| `VITE_USE_MOCK_AUTH` | `false` |
| `VITE_MATE_URL` | La URL publicada de Matemática |

Y en el proyecto de **Matemática** hay que poner `VITE_LOGIN_URL` con la URL
publicada del login de Comunicación. Sin eso, cerrar sesión en Matemática
manda a `localhost`.

## Cómo revisarlo

- [ ] El deploy de la rama termina bien y da un link de vista previa.
- [ ] La app abre en ese link.
- [ ] Recargar estando en `/home` no da 404.
- [ ] El botón de Matemáticas lleva a Matemática con la sesión iniciada.
