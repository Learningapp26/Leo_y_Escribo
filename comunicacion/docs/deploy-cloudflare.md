# Arreglo del deploy en Cloudflare

El deploy de Comunicación en Cloudflare falla con este error:

```
✘ [ERROR] Asset too large.
Cloudflare Workers supports assets with sizes of up to 25 MiB.
```

Este cambio arregla lo que se puede arreglar desde el código. Lo demás es
configuración en el panel de Cloudflare y lo tiene que hacer quien tenga
acceso (ver «Lo que falta en Cloudflare»).

## Qué se cambió en esta rama

### 1. Se borraron dos `.zip` que no se usan

| Archivo | Tamaño |
|---|---|
| `public/images/lecciones/q.zip` | 39 MB |
| `public/images/lecciones/c.zip` | 14 MB |

Cloudflare no acepta archivos de más de 25 MB, así que `q.zip` es el que
rompe el deploy. Los dos son copias comprimidas de las carpetas `q` y `c`,
que siguen en su lugar con todas sus imágenes. Ninguna parte de la app los
usa (no aparecen en `src` ni en `index.html`). Quedaron en el historial de
git, así que se pueden recuperar si hiciera falta.

### 2. Se agregó `public/_redirects`

```
/*    /index.html   200
```

La app usa rutas como `/home` o `/welcome`. Sin este archivo, si alguien
recarga la página o abre un link directo a una de esas rutas, Cloudflare
busca un archivo con ese nombre, no lo encuentra y muestra error 404. Con
él, cualquier ruta carga la app y la app decide qué pantalla mostrar.
Matemática ya lo tiene.

## Lo que falta en Cloudflare

Esto no se puede hacer desde el código.

El log del deploy dice «Adding Wrangler files…» y «Read 1392 files from
the assets directory …/comunicacion»: el proyecto se creó como **Worker** y
sube la carpeta del código tal cual, sin compilar. Lo que se publica tiene
que ser `dist`, que es lo que genera `npm run build`.

La propuesta es dejarlo como **Pages**, igual que Matemática:

| Campo | Valor |
|---|---|
| Framework preset | Vite (o React) |
| Root directory | `comunicacion` |
| Build command | `npm run build` |
| Build output directory | `dist` |

Variables de entorno (Settings → Environment variables):

| Variable | Valor |
|---|---|
| `VITE_USE_MOCK_AUTH` | `false` |
| `VITE_MATE_URL` | La URL publicada de Matemática |

Y en el proyecto de **Matemática** hay que poner `VITE_LOGIN_URL` con la URL
publicada del login de Comunicación. Sin eso, cerrar sesión en Matemática
manda a `localhost`.

## Cómo revisarlo

- [ ] El deploy termina sin «Asset too large».
- [ ] La app abre en la URL de Cloudflare.
- [ ] Recargar estando en `/home` no da 404.
- [ ] El botón de Matemáticas lleva a Matemática con la sesión iniciada.
