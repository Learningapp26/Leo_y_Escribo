BEGIN;

-- ============================================================
-- 1. COMPLETAR PERFILES PARA LOS ESTUDIANTES ACTUALES
-- ============================================================

INSERT INTO public.perfiles (
    id,
    nombre,
    rol,
    creado_en
)
SELECT
    e.id,
    e.nombre,
    'estudiante',
    e.creado_en
FROM public.estudiantes e
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- 2. AMPLIAR PERFILES
-- ============================================================

ALTER TABLE public.perfiles
    ADD COLUMN IF NOT EXISTS email text,
    ADD COLUMN IF NOT EXISTS avatar text,
    ADD COLUMN IF NOT EXISTS fecha_nacimiento date,
    ADD COLUMN IF NOT EXISTS pais text,
    ADD COLUMN IF NOT EXISTS departamento text,
    ADD COLUMN IF NOT EXISTS municipio text,
    ADD COLUMN IF NOT EXISTS estado text NOT NULL DEFAULT 'activo',
    ADD COLUMN IF NOT EXISTS actualizado_en timestamptz NOT NULL DEFAULT now();


-- Copiar avatar de estudiantes si ya existe
UPDATE public.perfiles p
SET avatar = e.avatar
FROM public.estudiantes e
WHERE p.id = e.id
  AND p.avatar IS NULL
  AND e.avatar IS NOT NULL;


-- Copiar correo desde Supabase Auth
UPDATE public.perfiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id
  AND p.email IS NULL;


-- Restricción para estado del usuario
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'perfiles_estado_check'
    ) THEN
        ALTER TABLE public.perfiles
        ADD CONSTRAINT perfiles_estado_check
        CHECK (
            estado IN (
                'activo',
                'inactivo',
                'suspendido'
            )
        );
    END IF;
END $$;


-- ============================================================
-- 3. ROLES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.roles (
    codigo text PRIMARY KEY,
    nombre text NOT NULL UNIQUE,
    creado_en timestamptz NOT NULL DEFAULT now()
);


INSERT INTO public.roles (
    codigo,
    nombre
)
VALUES
    ('admin', 'Administrador'),
    ('maestro', 'Maestro'),
    ('padre', 'Padre o tutor'),
    ('estudiante', 'Estudiante')
ON CONFLICT (codigo) DO NOTHING;


CREATE TABLE IF NOT EXISTS public.perfil_roles (
    perfil_id uuid NOT NULL
        REFERENCES public.perfiles(id)
        ON DELETE CASCADE,

    rol_codigo text NOT NULL
        REFERENCES public.roles(codigo),

    creado_en timestamptz NOT NULL DEFAULT now(),

    PRIMARY KEY (
        perfil_id,
        rol_codigo
    )
);


-- Migrar rol antiguo de perfiles
INSERT INTO public.perfil_roles (
    perfil_id,
    rol_codigo
)
SELECT
    p.id,
    CASE lower(p.rol)
        WHEN 'docente' THEN 'maestro'
        WHEN 'maestro' THEN 'maestro'
        WHEN 'encargado' THEN 'padre'
        WHEN 'padre' THEN 'padre'
        WHEN 'estudiante' THEN 'estudiante'
        WHEN 'admin' THEN 'admin'
        ELSE NULL
    END
FROM public.perfiles p
WHERE CASE lower(p.rol)
        WHEN 'docente' THEN 'maestro'
        WHEN 'maestro' THEN 'maestro'
        WHEN 'encargado' THEN 'padre'
        WHEN 'padre' THEN 'padre'
        WHEN 'estudiante' THEN 'estudiante'
        WHEN 'admin' THEN 'admin'
        ELSE NULL
      END IS NOT NULL
ON CONFLICT DO NOTHING;


-- Todo registro de estudiantes obtiene rol estudiante
INSERT INTO public.perfil_roles (
    perfil_id,
    rol_codigo
)
SELECT
    id,
    'estudiante'
FROM public.estudiantes
ON CONFLICT DO NOTHING;


-- Docentes actuales
INSERT INTO public.perfil_roles (
    perfil_id,
    rol_codigo
)
SELECT DISTINCT
    docente_id,
    'maestro'
FROM public.aulas
WHERE docente_id IS NOT NULL
ON CONFLICT DO NOTHING;


-- Encargados actuales
INSERT INTO public.perfil_roles (
    perfil_id,
    rol_codigo
)
SELECT DISTINCT
    encargado_id,
    'padre'
FROM public.estudiantes
WHERE encargado_id IS NOT NULL
ON CONFLICT DO NOTHING;


-- ============================================================
-- 4. PLATAFORMAS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.plataformas (
    codigo text PRIMARY KEY,
    nombre text NOT NULL UNIQUE,
    activo boolean NOT NULL DEFAULT true,
    creado_en timestamptz NOT NULL DEFAULT now()
);


INSERT INTO public.plataformas (
    codigo,
    nombre
)
VALUES
    ('leo', 'Leo y Escribo'),
    ('mate', 'Matemáticas')
ON CONFLICT (codigo) DO NOTHING;


CREATE TABLE IF NOT EXISTS public.perfil_plataformas (
    perfil_id uuid NOT NULL
        REFERENCES public.perfiles(id)
        ON DELETE CASCADE,

    plataforma_codigo text NOT NULL
        REFERENCES public.plataformas(codigo),

    estado text NOT NULL DEFAULT 'activo',

    inscrito_en timestamptz NOT NULL DEFAULT now(),

    PRIMARY KEY (
        perfil_id,
        plataforma_codigo
    ),

    CHECK (
        estado IN (
            'activo',
            'inactivo',
            'suspendido'
        )
    )
);


-- Inferir plataformas según progreso existente
INSERT INTO public.perfil_plataformas (
    perfil_id,
    plataforma_codigo
)
SELECT DISTINCT
    estudiante_id,
    CASE
        WHEN modulo = 'comunicacion' THEN 'leo'
        WHEN modulo = 'matematica' THEN 'mate'
    END
FROM public.progreso
WHERE modulo IN (
    'comunicacion',
    'matematica'
)
ON CONFLICT DO NOTHING;


-- ============================================================
-- 5. FAMILIAS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.familia_estudiantes (
    encargado_id uuid NOT NULL
        REFERENCES public.perfiles(id)
        ON DELETE CASCADE,

    estudiante_id uuid NOT NULL
        REFERENCES public.perfiles(id)
        ON DELETE CASCADE,

    parentesco text,

    es_principal boolean NOT NULL DEFAULT false,

    creado_en timestamptz NOT NULL DEFAULT now(),

    PRIMARY KEY (
        encargado_id,
        estudiante_id
    ),

    CHECK (
        encargado_id <> estudiante_id
    )
);


-- Migrar encargado actual
INSERT INTO public.familia_estudiantes (
    encargado_id,
    estudiante_id,
    es_principal
)
SELECT
    encargado_id,
    id,
    true
FROM public.estudiantes
WHERE encargado_id IS NOT NULL
ON CONFLICT DO NOTHING;


-- ============================================================
-- 6. AGREGAR ID INTERNO A LAS AULAS
-- ============================================================

ALTER TABLE public.aulas
ADD COLUMN IF NOT EXISTS id uuid
DEFAULT gen_random_uuid();


UPDATE public.aulas
SET id = gen_random_uuid()
WHERE id IS NULL;


ALTER TABLE public.aulas
ALTER COLUMN id SET NOT NULL;


CREATE UNIQUE INDEX IF NOT EXISTS aulas_id_unique
ON public.aulas(id);


ALTER TABLE public.aulas
    ADD COLUMN IF NOT EXISTS grado integer,
    ADD COLUMN IF NOT EXISTS seccion text,
    ADD COLUMN IF NOT EXISTS ciclo_escolar integer,
    ADD COLUMN IF NOT EXISTS estado text NOT NULL DEFAULT 'activa';


DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'aulas_estado_check'
    ) THEN
        ALTER TABLE public.aulas
        ADD CONSTRAINT aulas_estado_check
        CHECK (
            estado IN (
                'activa',
                'inactiva',
                'archivada'
            )
        );
    END IF;
END $$;


-- ============================================================
-- 7. PLATAFORMAS DE CADA AULA
-- ============================================================

CREATE TABLE IF NOT EXISTS public.aula_plataformas (
    aula_id uuid NOT NULL
        REFERENCES public.aulas(id)
        ON DELETE CASCADE,

    plataforma_codigo text NOT NULL
        REFERENCES public.plataformas(codigo),

    PRIMARY KEY (
        aula_id,
        plataforma_codigo
    )
);


-- Las aulas actuales pertenecen a Leo
INSERT INTO public.aula_plataformas (
    aula_id,
    plataforma_codigo
)
SELECT
    id,
    'leo'
FROM public.aulas
ON CONFLICT DO NOTHING;


-- ============================================================
-- 8. MAESTROS DE AULA
-- ============================================================

CREATE TABLE IF NOT EXISTS public.aula_docentes (
    aula_id uuid NOT NULL,

    docente_id uuid NOT NULL
        REFERENCES public.perfiles(id)
        ON DELETE CASCADE,

    plataforma_codigo text NOT NULL,

    es_principal boolean NOT NULL DEFAULT true,

    asignado_en timestamptz NOT NULL DEFAULT now(),

    PRIMARY KEY (
        aula_id,
        docente_id,
        plataforma_codigo
    ),

    FOREIGN KEY (
        aula_id,
        plataforma_codigo
    )
    REFERENCES public.aula_plataformas(
        aula_id,
        plataforma_codigo
    )
    ON DELETE CASCADE
);


-- Migrar docentes actuales
INSERT INTO public.aula_docentes (
    aula_id,
    docente_id,
    plataforma_codigo,
    es_principal
)
SELECT
    id,
    docente_id,
    'leo',
    true
FROM public.aulas
WHERE docente_id IS NOT NULL
ON CONFLICT DO NOTHING;


-- Dar acceso Leo a docentes actuales
INSERT INTO public.perfil_plataformas (
    perfil_id,
    plataforma_codigo
)
SELECT DISTINCT
    docente_id,
    'leo'
FROM public.aulas
WHERE docente_id IS NOT NULL
ON CONFLICT DO NOTHING;


-- ============================================================
-- 9. ESTUDIANTES DE AULA
-- ============================================================

CREATE TABLE IF NOT EXISTS public.aula_estudiantes (
    aula_id uuid NOT NULL
        REFERENCES public.aulas(id)
        ON DELETE CASCADE,

    estudiante_id uuid NOT NULL
        REFERENCES public.perfiles(id)
        ON DELETE CASCADE,

    estado text NOT NULL DEFAULT 'activo',

    inscrito_en timestamptz NOT NULL DEFAULT now(),

    retirado_en timestamptz,

    PRIMARY KEY (
        aula_id,
        estudiante_id
    ),

    CHECK (
        estado IN (
            'activo',
            'retirado'
        )
    )
);


-- Migrar estudiantes actuales según código de aula
INSERT INTO public.aula_estudiantes (
    aula_id,
    estudiante_id
)
SELECT
    a.id,
    e.id
FROM public.estudiantes e
JOIN public.aulas a
    ON a.codigo = e.codigo_aula
WHERE e.codigo_aula IS NOT NULL
ON CONFLICT DO NOTHING;


-- Dar acceso a Leo a esos estudiantes
INSERT INTO public.perfil_plataformas (
    perfil_id,
    plataforma_codigo
)
SELECT DISTINCT
    e.id,
    'leo'
FROM public.estudiantes e
WHERE e.codigo_aula IS NOT NULL
ON CONFLICT DO NOTHING;


-- ============================================================
-- 10. UNIDADES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.unidades (
    id uuid PRIMARY KEY
        DEFAULT gen_random_uuid(),

    plataforma_codigo text NOT NULL
        REFERENCES public.plataformas(codigo),

    clave text NOT NULL,

    titulo text NOT NULL,

    orden integer NOT NULL,

    activo boolean NOT NULL DEFAULT true,

    creado_en timestamptz NOT NULL DEFAULT now(),

    UNIQUE (
        plataforma_codigo,
        clave
    ),

    UNIQUE (
        plataforma_codigo,
        orden
    )
);


-- ============================================================
-- 11. LECCIONES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.lecciones (
    id uuid PRIMARY KEY
        DEFAULT gen_random_uuid(),

    unidad_id uuid NOT NULL
        REFERENCES public.unidades(id)
        ON DELETE CASCADE,

    clave text NOT NULL,

    titulo text NOT NULL,

    orden integer NOT NULL,

    ruta text,

    requerida boolean NOT NULL DEFAULT true,

    activo boolean NOT NULL DEFAULT true,

    creado_en timestamptz NOT NULL DEFAULT now(),

    UNIQUE (
        unidad_id,
        clave
    ),

    UNIQUE (
        unidad_id,
        orden
    )
);


-- ============================================================
-- 12. ACTIVIDADES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.actividades (
    id uuid PRIMARY KEY
        DEFAULT gen_random_uuid(),

    leccion_id uuid NOT NULL
        REFERENCES public.lecciones(id)
        ON DELETE CASCADE,

    clave text NOT NULL,

    titulo text NOT NULL,

    tipo text,

    ruta text,

    orden integer NOT NULL,

    requerida boolean NOT NULL DEFAULT true,

    activo boolean NOT NULL DEFAULT true,

    creado_en timestamptz NOT NULL DEFAULT now(),

    UNIQUE (
        leccion_id,
        clave
    ),

    UNIQUE (
        leccion_id,
        orden
    )
);


-- ============================================================
-- 13. AMPLIAR LA TABLA PROGRESO ACTUAL
--
-- No la eliminamos porque tu frontend la usa actualmente.
-- ============================================================

ALTER TABLE public.progreso
    ADD COLUMN IF NOT EXISTS plataforma_codigo text
        REFERENCES public.plataformas(codigo),

    ADD COLUMN IF NOT EXISTS leccion_id uuid
        REFERENCES public.lecciones(id)
        ON DELETE SET NULL,

    ADD COLUMN IF NOT EXISTS actividad_id uuid
        REFERENCES public.actividades(id)
        ON DELETE SET NULL;


-- Completar plataforma según el módulo antiguo
UPDATE public.progreso
SET plataforma_codigo =
    CASE
        WHEN modulo = 'comunicacion' THEN 'leo'
        WHEN modulo = 'matematica' THEN 'mate'
        ELSE plataforma_codigo
    END
WHERE plataforma_codigo IS NULL;


-- Mantener compatibilidad entre modulo y plataforma_codigo
CREATE OR REPLACE FUNCTION public.sincronizar_plataforma_progreso()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN

    IF NEW.plataforma_codigo IS NULL THEN

        NEW.plataforma_codigo :=
            CASE
                WHEN NEW.modulo = 'comunicacion'
                    THEN 'leo'

                WHEN NEW.modulo = 'matematica'
                    THEN 'mate'

                ELSE NULL
            END;

    END IF;

    RETURN NEW;

END;
$$;


DROP TRIGGER IF EXISTS
trg_sincronizar_plataforma_progreso
ON public.progreso;


CREATE TRIGGER trg_sincronizar_plataforma_progreso
BEFORE INSERT OR UPDATE
ON public.progreso
FOR EACH ROW
EXECUTE FUNCTION
public.sincronizar_plataforma_progreso();


-- ============================================================
-- 14. RESUMEN DE PROGRESO POR LECCIÓN
-- ============================================================

CREATE TABLE IF NOT EXISTS public.progreso_lecciones (
    estudiante_id uuid NOT NULL
        REFERENCES public.perfiles(id)
        ON DELETE CASCADE,

    leccion_id uuid NOT NULL
        REFERENCES public.lecciones(id)
        ON DELETE CASCADE,

    estado text NOT NULL DEFAULT 'iniciada',

    iniciado_en timestamptz NOT NULL DEFAULT now(),

    completado_en timestamptz,

    actualizado_en timestamptz NOT NULL DEFAULT now(),

    PRIMARY KEY (
        estudiante_id,
        leccion_id
    ),

    CHECK (
        estado IN (
            'iniciada',
            'completada'
        )
    )
);


-- ============================================================
-- 15. RESUMEN DE PROGRESO POR ACTIVIDAD
-- ============================================================

CREATE TABLE IF NOT EXISTS public.progreso_actividades (
    estudiante_id uuid NOT NULL
        REFERENCES public.perfiles(id)
        ON DELETE CASCADE,

    actividad_id uuid NOT NULL
        REFERENCES public.actividades(id)
        ON DELETE CASCADE,

    estado text NOT NULL DEFAULT 'iniciada',

    intentos integer NOT NULL DEFAULT 0,

    aciertos integer NOT NULL DEFAULT 0,

    mejor_puntaje numeric(5,2),

    iniciado_en timestamptz NOT NULL DEFAULT now(),

    completado_en timestamptz,

    actualizado_en timestamptz NOT NULL DEFAULT now(),

    PRIMARY KEY (
        estudiante_id,
        actividad_id
    ),

    CHECK (
        estado IN (
            'iniciada',
            'completada'
        )
    ),

    CHECK (
        intentos >= 0
    ),

    CHECK (
        aciertos >= 0
    )
);


-- ============================================================
-- 16. ACTIVAR RLS EN TABLAS NUEVAS
--
-- Todavía no creamos políticas.
-- Así el frontend NO puede manipularlas hasta que configuremos
-- correctamente los permisos.
-- ============================================================

ALTER TABLE public.roles
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.perfil_roles
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.plataformas
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.perfil_plataformas
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.familia_estudiantes
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.aula_plataformas
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.aula_docentes
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.aula_estudiantes
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.unidades
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.lecciones
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.actividades
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.progreso_lecciones
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.progreso_actividades
ENABLE ROW LEVEL SECURITY;


COMMIT;