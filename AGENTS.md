# betvelora2 — Instrucciones del proyecto

## Stitch (fuente de diseño)

Este repo está vinculado a un proyecto de Stitch:

- **Proyecto:** Rediseño nro 2
- **ID:** `3428674509965421959`
- **Resource name:** `projects/3428674509965421959`
- **URL:** https://stitch.withgoogle.com/projects/3428674509965421959
- **Home de referencia:** `Velora Casino - Rediseño Premium Negro, Rojo y Blanco` (buscador + promos + Slots + Casino Live + New Games).
- **Metadatos locales:** [`.stitch/project.json`](.stitch/project.json)

El diseño de referencia vive en Stitch, no en este repo. Antes de crear o rediseñar
una pantalla, consulta el proyecto para reutilizar el diseño existente.

La conexión MCP está declarada en `opencode.json` y usa la variable de entorno
`STITCH_API_KEY` (la clave nunca se commitea). Si el servidor no aparece, verifica que
esa variable exista en la sesión.

### Herramientas MCP (`stitch`)

Usa el servidor MCP `stitch` (herramientas `stitch_*`):

- `list_screens` / `get_screen` — inventario y detalle de pantallas.
- `download_file` — descarga el HTML de una pantalla o su screenshot.
- `generate_screen_from_text`, `edit_screens`, `generate_variants` — crear/editar diseños.
- `create_design_system`, `apply_design_system` — tema visual global.

Al descargar HTML, guárdalo como referencia en `.stitch/screens/` (no lo mezcles con `src/`),
y trasládalo a componentes React + Tailwind en `src/` siguiendo la estructura del proyecto.

### Convenciones del repo

- React 19 + Vite + Tailwind CSS 4 (`@import "tailwindcss"` en `src/index.css`).
- Rutas con `react-router-dom`.
- Componentes reutilizables en `src/components/`, páginas en `src/pages/`.
- No inventar tokens de diseño: si el proyecto Stitch tiene design system, úsalo como
  fuente de colores, tipografías y espaciados.
