# Arreglo del deploy en Cloudflare

El deploy de Comunicación en Cloudflare (Worker `aprende-facil`) fallaba
con este error:

```
✘ [ERROR] Asset too large.
Cloudflare Workers supports assets with sizes of up to 25 MiB.
```

## Qué se cambió en esta rama

### 1. Se excluyen del deploy dos archivos comprimidos

`public/.assetsignore` conserva en Git los archivos `images/lecciones/c.zip`
y `images/lecciones/q.zip`, pero impide que Wrangler los publique. Vite copia
este archivo a `dist/.assetsignore` durante el build. El ZIP de q supera el
límite de 25 MiB por archivo; las imágenes individuales siguen publicándose.

No se modifica ni elimina contenido de las lecciones. Véase la
[documentación de Cloudflare sobre exclusión de assets](https://developers.cloudflare.com/workers/static-assets/binding/#ignoring-assets).

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

En el Worker `aprende-facil` → **Settings** → **Build**:

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

## Alcance de la integración

Se conservan las lecciones, los audios, las imágenes y las reglas de progreso
actuales de `main`, además del nombre y diseño actuales del login. Del login
compartido se integra la redirección por rol: docentes a `/maestra/estudiantes`
y coordinación a `/coordinacion` en Matemática. Las cuentas de estudiantes
mantienen la selección de plataforma.
