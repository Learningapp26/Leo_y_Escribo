# Documentación final de Leo y Escribo

Universidad del Valle de Guatemala · Facultad de Ingeniería · Horas de extensión 2026

Los manuales describen Comunicación en `7e4224f` y el punto de integración con Matemática en `c9fda4b`. La guía rápida está diseñada para impresión en tamaño carta.

| Documento | Markdown | Word | PDF |
| --- | --- | --- | --- |
| Manual técnico y de desarrolladores | [Markdown](manual-tecnico.md) | [Word](entregables/word/Manual_Tecnico_Leo_y_Escribo.docx) | [PDF](entregables/pdf/Manual_Tecnico_Leo_y_Escribo.pdf) |
| Manual de usuario | [Markdown](manual-usuario.md) | [Word](entregables/word/Manual_Usuario_Leo_y_Escribo.docx) | [PDF](entregables/pdf/Manual_Usuario_Leo_y_Escribo.pdf) |
| Manual de administración y gestión de contenido | [Markdown](manual-administrador.md) | [Word](entregables/word/Manual_Administrador_Leo_y_Escribo.docx) | [PDF](entregables/pdf/Manual_Administrador_Leo_y_Escribo.pdf) |
| Guía rápida para estudiantes | [Markdown](guia-rapida-estudiantes.md) | [Word](entregables/word/Guia_Rapida_Estudiantes.docx) | [PDF](entregables/pdf/Guia_Rapida_Estudiantes.pdf) |

El [informe de entrega](informe-de-validacion.md) registra los resultados de verificación, activos utilizados y comprobaciones pendientes. Los diagramas incluyen la fuente editable de Graphviz (`.dot`) y su imagen (`.png`) en [assets/diagramas](assets/diagramas/). Las [capturas](assets/capturas/) son de las interfaces ejecutadas con datos ficticios y solicitudes externas interceptadas.

## Actualizar los manuales

1. Edite los cuatro archivos Markdown, conservando la jerarquía de títulos, las referencias a las capturas y la numeración de sus figuras. En los manuales formales actualice la portada, la versión y los enlaces de **Contenido** al cambiar la estructura.
2. Si cambió un diagrama, vuelva a exportarlo desde su archivo `.dot` con Graphviz. El siguiente ejemplo se ejecuta desde la raíz del repositorio.
3. Use Python 3 con `python-docx` y `Pillow` instalados en el entorno de documentación. Ejecute `generar.py` desde la raíz. Los documentos editables se guardan en `docs/entregables/word`.
4. En Windows con Microsoft Word, ejecute `exportar-word.ps1` desde la raíz. Actualiza los índices y páginas, guarda los Word y exporta los PDF a `docs/entregables/pdf`. Cierre las copias de esos manuales que estén abiertas mientras los actualiza.
5. Revise el render, los enlaces, la paginación y las figuras antes de distribuir los archivos. Actualice el informe de entrega si vuelve a validar otra versión del código.

```powershell
dot.exe -Tpng docs/assets/diagramas/01-arquitectura.dot -o docs/assets/diagramas/01-arquitectura.png
python docs/herramientas/generar.py
./docs/herramientas/exportar-word.ps1
python docs/herramientas/generar.py --limpiar-metadatos
```

Las notas de desarrollo anteriores permanecen en [comunicacion/docs](../comunicacion/docs/).

