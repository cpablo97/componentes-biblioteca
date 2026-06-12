# Card Generic — Spec

**Figma node**: https://www.figma.com/design/fFyS7KbenVJZc9EJ8wTZWC/Entrega---Biblioteca-web?node-id=1069-4494
**Last synced**: 2026-06-11
**Status**: Draft

---

## Overview

A general-purpose content card used to surface navigable resources (salas, servicios, colecciones). Comes in two structural styles: **Geometric**, which features a decorative abstract illustration in the upper area and a taller footprint; and **Rectangular**, a compact text-only card with a solid black border. Both styles share the same content anatomy and animate to a yellow fill on hover. The component exposes a `Show Tag` boolean property to toggle the eyebrow label.

---

## Variants

| Style       | State   | Description |
|-------------|---------|-------------|
| Geometric   | Default | No background fill. Decorative yellow-geometric illustration occupies upper ~60% of card via an absolutely-positioned layer. 80px vertical padding on card outer container. |
| Geometric   | Hover   | Card background floods to `--uds-amarillo-100` (#FFE41E). Smooth `dissolve` / fade transition (0.1s ease-out). |
| Rectangular | Default | No background fill. 1px solid black border on content container. No illustration. |
| Rectangular | Hover   | Card background floods to amarillo-adjacent yellow (#F2D818). Dissolve transition 0.15s ease-out. See open question #4. |

---

## Anatomy

- **Card** (`.uds-card-generic`): outer `<article>`, `position: relative`, `overflow: hidden`, fixed width 352px.
- **Illustration** (`.uds-card-generic__illustration`): absolutely-positioned decorative layer, `aria-hidden="true"`. Geometric only.
- **Body** (`.uds-card-generic__body`): vertical flex container, padding 24px, gap 12px. Holds the content.
- **Header** (`.uds-card-generic__header`): vertical flex grouping tag + title, gap 8px.
- **Tag** (`.uds-card-generic__tag`): uppercase eyebrow label — *not* the `uds-tag` interactive component. Display-only text.
- **Title** (`.uds-card-generic__title`): card title `<h3>`, Source Sans 3 Medium 24px.
- **Link** (`.uds-card-generic__link`): anchor on the title that stretches to fill the full card via `::after`. Provides the clickable surface.
- **Description** (`.uds-card-generic__description`): body copy, 3-line clamp.

---

## Spacing and layout

| Property                     | Token                              | Value  |
|------------------------------|------------------------------------|--------|
| Card width                   | *(fixed)*                          | 352px  |
| Geometric card padding-top/bottom | *(no token — see open question #2)* | 80px |
| Body padding (all 4 sides)   | `--uds-spacing-boton-primario-h`   | 24px   |
| Body → content gap           | `--uds-spacing-acciones-gap`       | 12px   |
| Header → tag–title gap       | `--uds-spacing-etiqueta-h`         | 8px    |

---

## Typography

| Role        | Token(s)                                                              | Family           | Size  | Weight | Line-height |
|-------------|-----------------------------------------------------------------------|------------------|-------|--------|-------------|
| Tag (eyebrow) | `--uds-text-body-md-size` *(see open question #5)*                  | `--uds-font-sans`| 16px  | 400    | 1           |
| Title       | `--uds-text-card-title-sm-size` / `--uds-text-card-title-sm-lh` / `--uds-text-card-title-sm-weight` | `--uds-font-sans` | 24px | 500 | 28px |
| Description | `--uds-text-body-md-size` / `--uds-text-body-md-lh`                 | `--uds-font-sans`| 16px  | 400    | 24px        |

Tag additional: `text-transform: uppercase`, `letter-spacing: 0.08em` *(no token — see open question #5)*.

---

## Colors

### Shared (both styles)

| Role             | Token                        | Figma source               | Resolved value |
|------------------|------------------------------|----------------------------|----------------|
| Tag text         | `--uds-color-borde-etiqueta` | variable → negro-200       | #191916        |
| Title text       | `--uds-color-texto-primario` | variable → negro-100       | #1F1E1C        |
| Description text | `--uds-color-texto-primario` | unbound #000000 *(see Q#3)*| #1F1E1C (approx)|
| Hover background | `--uds-color-boton-amarillo-fondo` | amarillo-100         | #FFE41E        |

### Style: Geometric

| Role              | Token                              | Figma source       | Value    |
|-------------------|------------------------------------|--------------------|----------|
| Default bg        | transparent                        | —                  | —        |
| Illustration top  | `--uds-amarillo-100` + multiply    | Vector 6 (MULTIPLY)| #FFE41E  |
| Illustration base | *(no token — see Q#6)*             | Vector 7           | #FCF4B3  |

### Style: Rectangular

| Role              | Token                              | Figma source       | Value    |
|-------------------|------------------------------------|--------------------|----------|
| Default bg        | transparent                        | —                  | —        |
| Border            | `--uds-color-borde-etiqueta`       | unbound #000000 *(see Q#3)* | #191916 |
| Hover bg          | `--uds-color-boton-amarillo-fondo` *(approx — see Q#4)* | variable → #F2D818 | #FFE41E used |

---

## Accessibility

- [x] Element: `<article>` with an `<a>` stretched link on the title
- [x] Stretched link: `::after` overlay makes full card clickable from keyboard
- [x] Tag eyebrow is display-only — no interactive role
- [ ] When card is a navigation target: title link text must be unique enough to identify the card without visual context; add `aria-label` on the `<a>` if needed
- [x] `aria-hidden="true"` on illustration — purely decorative
- [ ] Contrast (AA):
  - Tag (#191916 on transparent/white bg) → ~17:1 ✓
  - Title (#1F1E1C) → ~17:1 on light bg ✓
  - Description (#1F1E1C) → ~17:1 ✓
  - Hover bg (#FFE41E) with dark text → title (#1F1E1C on #FFE41E) → ~9.5:1 ✓
- [x] Focus: `:focus-visible` ring on the link + `focus-within` ring on the card
- [x] `@media (prefers-reduced-motion)` — transitions disabled

---

## Open questions

1. **Body padding 24px has no semantic alias**: `--uds-spacing-boton-primario-h` has the correct value (24px) but is named for primary button horizontal padding. The variable ID in Figma (`7de1b55ce8b800a0dacdd453db198a86f83d9cf5/2121:8`) is from an external library not yet resolved. Similarly, `--uds-spacing-acciones-gap` (12px) is used for card body gap — value correct, semantics off. Design system team should add `--uds-spacing-tarjeta-padding` and `--uds-spacing-tarjeta-gap` aliases.

2. **80px vertical card padding has no token**: The Geometric card outer element has `paddingTop: 80px` and `paddingBottom: 80px` (variable ID `28199eb821bd77cb069a876eaf66ae29a65efc97/3614:16` from external library). No token resolves to 80px in the current system. Hardcoded as `80px`. Resolve once external spacing library is accessible.

3. **Unbound color values**: Both `Description Text` color (r=0,g=0,b=0 = pure black) and Rectangular border (r=0,g=0,b=0) have no bound variable in Figma. Treated as design debt — mapped to `--uds-color-texto-primario` and `--uds-color-borde-etiqueta` respectively (nearest semantic aliases). Design team should bind these to variables.

4. **Rectangular hover yellow differs from Geometric hover**: Geometric hover = `#FFE41E` (exact `--uds-amarillo-100`). Rectangular hover = `#F2D818` (variable `425c39483bf72f98f859574dbfed9232f1e522b0/2123:409` from external library). These are visibly different yellows. Using `--uds-color-boton-amarillo-fondo` for both for token consistency. Design team should decide whether to unify or create a distinct alias.

5. **Tag font size is fractional in Figma**: The inner tag text node renders at `15.567px` (from `M-Size: Large` variant of an external component). This is an unresolved scaled value. Rounded to `16px` (`--uds-text-body-md-size`). Tag letter-spacing is `8%` (0.08em) — no letter-spacing token exists. Hardcoded.

6. **Illustration palette color has no token**: Vector 7 (the lighter background shape in the illustration) uses `#FCF4B3` — a pale yellow distinct from any current primitive. Hardcoded. Design team should add `--uds-amarillo-50` or `--uds-color-ilustracion-*` primitives.

7. **Figma component name has a typo**: The component set is named "Gneric card" in Figma (not "Generic card"). This does not affect code — using `card-generic` as the canonical name.
