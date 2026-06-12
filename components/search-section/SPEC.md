# Search Section — Spec

**Figma node**: https://www.figma.com/design/fFyS7KbenVJZc9EJ8wTZWC/Entrega---Biblioteca-web?node-id=1069-9013
**Last synced**: 2026-06-11
**Status**: Draft

---

## Overview

Full-width search section for the library portal. Contains a tab line for switching between search modes (i-RUS, GPS Bibliográfico, En el portal), a search bar with an icon input and "Buscar" button, a search categories toggle, and a button group with the IA assistant CTA and an advanced search secondary link. Available in three platform variants: Desktop (1280px), Tablet, and Mobile (320–375px). The dark container sits on the page background and is not itself scrollable.

---

## Variants

| Variant           | Description                                                    |
|-------------------|----------------------------------------------------------------|
| Platform=Desktop  | 1280px outer, 768px inner container, padding 56px / 48px       |
| Platform=Tablet   | Intermediate breakpoint (not fully extracted)                  |
| Platform=Mobile   | Full-width, compact padding (24px), stacked layout             |
| Tab=Selected      | Active tab with yellow bottom indicator + lateral shadow       |
| Tab=Default       | Inactive tab, no indicator                                     |
| Categories=Closed | Arrow points down                                              |
| Categories=Open   | Arrow rotates 180° (not rendered in Figma variant shown)       |

---

## Anatomy

- **`.uds-search-section`** — outer wrapper; centers content, handles page-level padding
- **`.uds-search-section__container`** — dark card panel; max-width 768px; contains all sub-sections
- **`.uds-tab-line`** — horizontal strip of tab buttons (sub-component: `tab/tab.css`)
- **`.uds-tab`** — individual tab button with `data-state="selected|default"`
- **`.uds-search-section__inner`** — vertical stack of search bar + categories
- **`.uds-search-section__search-bar`** — horizontal row: input wrapper + buscar button
- **`.uds-search-section__input-wrapper`** — styled search field with icon and `<input>`
- **`.uds-search-section__search-icon`** — Material Symbol `search` icon
- **`.uds-search-section__input`** — `<input type="search">` with placeholder
- **`.uds-search-section__buscar`** — `<button>` labeled "Buscar"
- **`.uds-search-categories`** — toggle button (sub-component: `search-categories/search-categories.css`)
- **`.uds-search-section__button-group`** — flex row with IA button + secondary link button

---

## Spacing and layout

| Property                        | Token / Value                          | Figma value         |
|---------------------------------|----------------------------------------|---------------------|
| Outer padding H (Desktop)       | `48px` — external lib var, no token    | 56px (actual in px) |
| Outer padding V (Desktop)       | `48px` — external lib var, no token    | 48px                |
| Container max-width             | `768px` — hardcoded layout value       | 768px               |
| Container padding all sides     | `48px` — external lib var, no token    | 48px                |
| Container gap between sections  | `--uds-spacing-boton-primario-h` (24px)| external lib ~24px  |
| Container border-radius         | `--uds-border-radius-etiqueta` (2px)   | 2px                 |
| Tab line gap                    | `--uds-spacing-etiqueta-h` (8px)       | 8px bound var       |
| Tab padding H                   | `--uds-spacing-acciones-gap` (12px)    | 12px external lib   |
| Tab padding V                   | `--uds-spacing-etiqueta-h` (8px)       | 8px bound var       |
| Search section inner gap        | `--uds-spacing-acciones-gap` (12px)    | 12px external lib   |
| Search bar gap                  | `--uds-spacing-etiqueta-h` (8px)       | 8px                 |
| Input wrapper padding           | `--uds-spacing-etiqueta-v` (4px)       | 4px all sides       |
| Input wrapper height            | `36px` — no token                      | 36px                |
| Buscar button padding           | `--uds-spacing-etiqueta-h` (8px)       | 8px all sides       |
| Search categories gap           | `--uds-spacing-etiqueta-v` (4px)       | 4px                 |
| Button group gap                | `--uds-spacing-etiqueta-h` (8px)       | 8px                 |
| IA button height                | `32px` — no token                      | 32px                |
| IA button padding               | `--uds-spacing-etiqueta-h` (8px)       | 8px all sides       |

---

## Typography

| Role                    | Token                              | Value              |
|-------------------------|------------------------------------|--------------------|
| Tab label               | `--uds-text-body-md-compact-*`     | 16px / 20px / 400  |
| Search placeholder      | `--uds-text-body-md-compact-*`     | 16px / 20px / 400  |
| Buscar button label     | `--uds-text-body-md-compact-*`     | 16px / 20px / 400  |
| Categories label        | `--uds-text-body-md-compact-*`     | 16px / 20px / 400  |
| IA button label         | `--uds-text-button-*`              | 16px / 16px / 600  |
| Secondary button label  | `--uds-text-body-md-compact-*`     | 16px / 16px / 400  |
| Letter spacing (all)    | `0.04em`                           | 4% (Figma percent) |

---

## Colors

| Role                        | Token                              | Approx hex  |
|-----------------------------|-------------------------------------|-------------|
| Container background        | `--uds-color-boton-primario-fondo` | `#191916`   |
| Tab text                    | `--uds-color-borde-sutil`          | `#CFCFCF`   |
| Tab selected indicator      | `--uds-color-boton-amarillo-fondo` | `#FFE41E`   |
| Input/Buscar border         | `--uds-color-superficie-slot`      | `#F5F5F2`   |
| Input text + icon           | `--uds-color-texto-invertido`      | `#FCFBFA`   |
| Placeholder (60% opacity)   | `--uds-color-texto-invertido`      | `#FCFBFA`   |
| Buscar button text          | `--uds-color-superficie-slot`      | `#F5F5F2`   |
| Categories text             | `--uds-color-borde-sutil`          | `#CFCFCF`   |
| IA button fill              | `--uds-color-ia-boton-fondo`       | `#230F46`   |
| IA button stroke/text/icon  | `--uds-color-ia-acento`            | `#BA92FF`   |
| Secondary button text       | `--uds-color-borde-sutil`          | `#CFCFCF`   |

---

## Accessibility

- [x] Tab buttons: `role="tab"`, `aria-selected`, `aria-controls` pointing to panel
- [x] Tab line: `role="tablist"`, `aria-label="Modos de búsqueda"`
- [x] Search input: `<input type="search">` with visible `aria-label`
- [x] Buscar button: `type="submit"` within a `<form>`
- [x] Categories toggle: `aria-expanded`, `aria-controls`
- [x] IA button: descriptive label "Asistente IA"
- [x] Keyboard: Tab / Enter / Space navigate tabs; arrow keys switch tabs
- [x] Contrast: white text on #191916 → ~17:1 ✓; gris-200 on #191916 → ~9:1 ✓
- [x] `@media (prefers-reduced-motion)` disables tab + chevron transitions

---

## Open questions

1. **Outer padding H = 56px**: Figma binds this to an external library variable (`d12dc58...`). No token exists. Using hardcoded `56px` with comment.
2. **Container and outer padding V = 48px**: Same external library variable. No `--uds-spacing-xl` resolved yet (value is empty TODO). Using hardcoded `48px`.
3. **Container gap = 24px**: External library variable. Reusing `--uds-spacing-boton-primario-h` (24px) — correct value, semantic mismatch.
4. **Tab padding H = 12px**: External library variable. Reusing `--uds-spacing-acciones-gap` (12px) — correct value, semantic mismatch.
5. **Search bar height = 36px**: No corresponding token. Using hardcoded `36px`.
6. **IA button height = 32px**: No corresponding token. Using hardcoded `32px`.
7. **Container background token**: `--uds-color-boton-primario-fondo` (negro-200) is the correct value but wrong semantic name for a section background. Consider adding `--uds-color-superficie-destacada: var(--uds-negro-200)` in future.
8. **Tablet breakpoint**: Figma node 1069-9078 not fully extracted — layout assumed to be between Desktop and Mobile.
9. **Search categories open state**: The Figma node shows only `State=Closed`. Open state assumed from arrow rotation convention.
