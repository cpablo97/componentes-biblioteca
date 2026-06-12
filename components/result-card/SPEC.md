# Result Card — Spec

**Figma node**: https://www.figma.com/design/fFyS7KbenVJZc9EJ8wTZWC/Entrega---Biblioteca-web?node-id=1069-4660
**Last synced**: 2026-06-11
**Status**: Draft

---

## Overview

A search-result list card for surfacing database resources (journals, platforms, collections). Contains a rich header with leading feature tags (Special, Taxonomy), a title, a subject-tag cloud, a collapsible description, contextual info rows (availability warning + access note), a divider, and a primary CTA + secondary link button group. The card has two interactive states — **Closed** (description truncated) and **Open** (full description) — toggled by a "Ver más / Ver menos" button.

Sub-elements: uses `uds-tag` component instances for all tags; imports `uds-button` base styles for ghost link buttons; defines its own CTA button variant (crema fill + gray border) not covered by existing `uds-button` variants.

---

## Variants

| State  | Description |
|--------|-------------|
| Closed | Default. Description text is clamped to 3 lines. Toggle shows "Ver más" + `keyboard_arrow_down`. |
| Open   | Triggered by toggle click. Description is fully visible. Toggle shows "Ver menos" + `keyboard_arrow_up`. |

---

## Anatomy

- **Card** (`.uds-result-card`): `<article>`, `data-state="closed|open"`, vertical flex, 24px padding, white bg, soft shadow, 5px radius.
- **Header** (`.uds-result-card__header`): vertical flex, 8px gap. Contains leading tags, title, subject tags.
  - **Leading Tags** (`.uds-result-card__leading-tags`): horizontal flex, 8px gap. `uds-tag--special` + 0–N `uds-tag--taxonomy` for feature labels (AI badge, Novedad, Destacado).
  - **Title** (`.uds-result-card__title`): `<h3>`, Source Sans 3 Medium 24px/28px, `--uds-color-texto-primario`.
  - **Subject Tags** (`.uds-result-card__subject-tags`): horizontal flex-wrap, 4px gap. Multiple `uds-tag--taxonomy` for subject areas.
- **Content** (`.uds-result-card__content`): vertical flex, 8px gap. Contains description + toggle button.
  - **Description** (`.uds-result-card__description`): `<p>`, 16px/24px regular, `--uds-color-texto-primario`. Clamped to 3 lines in Closed state.
  - **Toggle** (`.uds-result-card__btn-toggle`): `<button>`, "Ver más/Ver menos" text + chevron icon. Ghost link style using `uds-button` base.
- **Info** (`.uds-result-card__info`): vertical flex, 4px gap. Two rows of icon + text.
  - **Info Row** (`.uds-result-card__info-row`): horizontal flex, 4px gap, center-aligned.
  - **Info Icon** (`.uds-result-card__info-icon`): 16px Material Symbols ligature, `aria-hidden`.
  - **Warning text** (`.uds-result-card__info-text--warning`): orange-brown, 12px/12px.
  - **Info text** (`.uds-result-card__info-text`): dark, 12px/16px.
- **Divider** (`.uds-result-card__divider`): `<hr>`, 1px solid, `--uds-color-superficie-slot`.
- **Actions** (`.uds-result-card__actions`): horizontal flex, 8px gap, centered vertically.
  - **CTA Button** (`.uds-result-card__btn-cta`): `<a>`, crema fill + gray border + icon `arrow_outward`.
  - **Link Button** (`.uds-result-card__btn-link`): `<button>`, ghost underlined, "Ver Tutorial".

---

## Spacing and layout

| Property                    | Token                              | Value  |
|-----------------------------|------------------------------------|--------|
| Card padding (all 4 sides)  | `--uds-spacing-boton-primario-h`   | 24px *(see Q#1)* |
| Card section gap            | `--uds-spacing-boton-primario-h`   | 24px *(see Q#1)* |
| Header → leading tags gap   | `--uds-spacing-etiqueta-h`         | 8px    |
| Header → title–tags gap     | `--uds-spacing-etiqueta-h`         | 8px    |
| Leading tags item gap       | `--uds-spacing-etiqueta-h`         | 8px    |
| Subject tags item gap       | `--uds-spacing-etiqueta-v`         | 4px    |
| Subject tags wrap gap       | `--uds-spacing-etiqueta-v`         | 4px    |
| Content item gap            | `--uds-spacing-etiqueta-h`         | 8px    |
| Info rows gap               | `--uds-spacing-etiqueta-v`         | 4px    |
| Info icon–text gap          | `--uds-spacing-etiqueta-v`         | 4px    |
| Actions item gap            | `--uds-spacing-etiqueta-h`         | 8px    |
| Card border radius          | `--uds-border-radius-boton`        | 5px    |

---

## Typography

| Role              | Token(s)                                                                          | Size  | Weight | Line-height |
|-------------------|-----------------------------------------------------------------------------------|-------|--------|-------------|
| Title             | `--uds-text-card-title-sm-size` / `--uds-text-card-title-sm-lh` / `--uds-text-card-title-sm-weight` | 24px | 500 | 28px |
| Description       | `--uds-text-body-md-size` / `--uds-text-body-md-lh`                              | 16px  | 400    | 24px        |
| Toggle/link btn   | `--uds-text-body-md-size` / `--uds-text-body-md-compact-lh` *(see Q#5)*          | 16px  | 400    | 20px        |
| Info warning text | `--uds-text-body-xs-size` / `--uds-text-body-xs-tight-lh`                        | 12px  | 400    | 12px        |
| Info general text | `--uds-text-body-xs-size` / `--uds-text-body-xs-lh`                              | 12px  | 400    | 16px        |

All button text: `letter-spacing: 0.04em` (no letter-spacing token).

---

## Colors

| Role                          | Token                              | Figma source                        | Resolved value |
|-------------------------------|------------------------------------|-------------------------------------|----------------|
| Card background               | `--uds-color-superficie-base`      | #FFFFFF                             | #FFFFFF        |
| Card shadow                   | `--uds-sombra-suave`               | 4px 4px 15px rgba(0,0,0,0.10)       | exact match ✓  |
| Title text                    | `--uds-color-texto-primario`       | variable → negro-100                | #1F1E1C        |
| Description text              | `--uds-color-texto-primario`       | unbound #000 *(see Q#6)*            | #1F1E1C (approx)|
| Toggle / link btn text        | `--uds-gris-700`                   | unbound #4D4D4D *(see Q#7)*         | #4D4D4C        |
| Info warning text + icon      | *(no token — see Q#2)*             | unbound rgb(128,51,0)               | #803300        |
| Info general text             | `--uds-color-texto-primario`       | variable bound ✓                    | #1F1E1C        |
| Divider stroke                | `--uds-color-superficie-slot`      | variable → ≈ #F5F4F2                | #F5F5F2 (approx)|
| CTA button fill               | `--uds-color-superficie-slot`      | external var ≈ #FCFCF9 *(see Q#3)*  | #F5F5F2 (approx)|
| CTA button stroke             | `--uds-gris-200`                   | external var ≈ #BABABC *(see Q#4)*  | #CFCFCF (approx)|
| CTA button text               | `--uds-gris-700`                   | unbound #4D4D4D                     | #4D4D4C        |

---

## Sub-component usage

| Sub-element            | Component      | Class applied                      |
|------------------------|----------------|------------------------------------|
| Feature badge (IA)     | `uds-tag`      | `.uds-tag--special`                |
| Feature badge (label)  | `uds-tag`      | `.uds-tag--taxonomy`               |
| Subject area chips     | `uds-tag`      | `.uds-tag--taxonomy`               |
| Toggle expand button   | `uds-button`   | base + `.uds-result-card__btn-toggle` |
| Secondary link button  | `uds-button`   | base + `.uds-result-card__btn-link`   |
| CTA link               | result-card    | `.uds-result-card__btn-cta` (new)  |

---

## Interactivity

| Trigger          | Action                                                              |
|------------------|---------------------------------------------------------------------|
| Click toggle     | `data-state` toggles `"closed"` ↔ `"open"` on `.uds-result-card`  |
| Closed state     | `.uds-result-card__description` clamped to 3 lines                 |
| Open state       | clamp removed; toggle text → "Ver menos"; icon → `keyboard_arrow_up` |
| Toggle aria      | `aria-expanded="false|true"` on toggle button                       |
| Description aria | `id="rc-desc-{n}"` referenced by toggle's `aria-controls`           |

---

## Accessibility

- [x] `<article>` with accessible name via title heading
- [x] Toggle: `aria-expanded`, `aria-controls` pointing to description
- [x] Tags are `<button type="button">` (interactive) or `<span>` (display-only)
- [x] CTA: `<a>` with descriptive `aria-label` (title included)
- [x] Icons: all `aria-hidden="true"`, text carries meaning
- [ ] Contrast AA:
  - Title (#1F1E1C on white) → ~17:1 ✓
  - Toggle text (#4D4D4C on white) → ~8.6:1 ✓
  - Warning text (#803300 on white) → ~6.1:1 ✓
  - Info text (#1F1E1C on white) → ~17:1 ✓
  - CTA text (#4D4D4C on crema #F5F5F2) → ~8.2:1 ✓
- [x] Focus: `focus-visible` on all interactive elements
- [x] `@media (prefers-reduced-motion)` — transitions disabled

---

## Open questions

1. **24px padding/gap has no semantic alias for cards**: `--uds-spacing-boton-primario-h` resolves to 24px (external library variable `7de1b55c.../2121:8`) but is semantically named for button horizontal padding. Design system team should add `--uds-spacing-tarjeta-padding` alias.

2. **Info warning orange color has no token**: The "schedule" icon and availability warning text use `rgb(128, 51, 0)` ≈ `#803300` — an orange-brown not present anywhere in the token system. Hardcoded in CSS. Design team should define `--uds-color-aviso-texto` and `--uds-color-aviso-icono` aliases.

3. **CTA button fill #FCFCF9 is from external library variable**: Bound to `b22ec898.../2123:406`. Resolved to ~#FCFCF9, which is close to `--uds-crema-50` (#F5F5F2) but noticeably whiter. Mapped to `--uds-color-superficie-slot` as nearest. Define `--uds-color-boton-suave-fondo` alias once external lib is accessible.

4. **CTA button stroke #BABABC is from external library variable**: Bound to `bb83518f.../2123:411`. Resolved to ~#BABABC, mapped to `--uds-gris-200` (#CFCFCF). Actual value is slightly darker/warmer. Define `--uds-color-boton-suave-borde` alias.

5. **Internal button line-height is 20px**: "Ver más", "Ir al recurso", and "Ver Tutorial" text all use 20px line-height (not 16px as `--uds-text-button-lh`). Mapped to `--uds-text-body-md-compact-lh` (20px) which has the correct value. The button component may need a separate `--uds-text-button-lh-md` token.

6. **Description color is unbound in Figma**: Pure black #000000 with no variable binding. Treated as design debt — mapped to `--uds-color-texto-primario` (#1F1E1C). Design team should bind this node.

7. **Ghost button text uses primitive `--uds-gris-700` directly**: No semantic alias exists for link-text on light background (#4D4D4C). Design team should add `--uds-color-texto-enlace` alias.

8. **Card's internal button types are from a different button system**: The "Primary" (crema fill) and "Tertiary" (ghost link) button types in this card come from a more general button component than the existing `uds-button` (which is IA-specific). The result card defines local `.uds-result-card__btn-*` variants. A future general `uds-button--soft` and `uds-button--tertiary` should be added to the button component.
