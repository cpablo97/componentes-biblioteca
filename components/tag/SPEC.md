# Tag — Spec

**Figma node**: https://www.figma.com/design/fFyS7KbenVJZc9EJ8wTZWC/Entrega---Biblioteca-web?node-id=1069-4729
**Last synced**: 2026-06-11
**Status**: Draft

---

## Overview

A small inline label used to display taxonomy categories, content types, and special feature markers. Tags appear inside Result Cards and Search Sections. All variants have hover states, making them interactive controls (filters or navigation links). The component set exposes two variant axes: **Style** (Transparent, Taxonomy, Special) and **State** (Default, Hover).

---

## Variants

| Style       | State   | Description |
|-------------|---------|-------------|
| Transparent | Default | Dark semi-transparent background with backdrop blur. Designed for use over images or dark surfaces. |
| Transparent | Hover   | Same palette, background opacity increases from 0.5 → 0.9. |
| Taxonomy    | Default | Warm crema background (#F5F5F2) with dark amber text (#4D4500). Standard content-category label. |
| Taxonomy    | Hover   | Crema base + warm yellow overlay at 30% opacity on top. |
| Special     | Default | Soft violet background (#EEEDFE) with deep violet text (#2E2499). Used for AI/IA-related or featured content. |
| Special     | Hover   | Violet base + purple overlay (#BA92FF) at 30% opacity on top. |

---

## Anatomy

- **Container** (`.uds-tag`): the tag element itself — inline-flex, hug-contents, horizontally centered. Acts as a `<button>` when interactive.
- **Text** (direct text content): the label string. No wrapper element needed.

---

## Spacing and layout

| Property        | Token                          | Value      |
|-----------------|--------------------------------|------------|
| Padding (all 4) | `--uds-spacing-etiqueta-h`     | 8px        |
| Border radius   | `--uds-border-radius-etiqueta` | 2px        |
| Layout          | `inline-flex`, center/center   | —          |
| Backdrop filter | *(no token)*                   | blur(32px) |
| Min width       | none — hug contents            | —          |

---

## Typography

| Role  | Token                    | Family (via token)      | Size | Weight | Line-height |
|-------|--------------------------|-------------------------|------|--------|-------------|
| Label | `--uds-text-tag-size`    | `--uds-font-sans`       | 14px | 400    | `--uds-text-tag-lh` (14px) |

---

## Colors

### Style: Transparent

| Role        | Token                           | Figma variable    | Resolved value       |
|-------------|---------------------------------|-------------------|----------------------|
| Background  | `--uds-color-superficie-overlay`| Color de blur     | rgba(64, 63, 63, 0.5)|
| Text        | `--uds-color-texto-invertido`   | —                 | #FCFBFA              |
| Hover bg    | *(no token — hardcoded)*        | —                 | rgba(64, 63, 63, 0.9)|

### Style: Taxonomy

| Role        | Token                              | Figma source          | Resolved value |
|-------------|------------------------------------|-----------------------|----------------|
| Background  | `--uds-color-superficie-slot`      | crema-50              | #F5F5F2        |
| Text        | `--uds-amarillo-900`               | amarillo/900          | #4D4500        |
| Hover bg    | `--uds-color-superficie-seleccionado` *(approx)* | crema-50 + yellow overlay 30% | #ECEAE3 |

### Style: Special

| Role        | Token                   | Figma source    | Resolved value |
|-------------|-------------------------|-----------------|----------------|
| Background  | `--uds-color-ia-fondo`  | violeta-50      | #EEEDFE        |
| Text        | `--uds-color-ia-texto`  | violeta-700     | #2E2499        |
| Hover overlay | `--uds-color-ia-acento` at 0.3 opacity | violeta-300 overlay 30% | #BA92FF @ 0.3 |

---

## Accessibility

- [ ] Role: `<button>` when interactive (default), `<span>` for display-only usage
- [ ] Keyboard: Tab to focus, Enter/Space to activate
- [ ] `aria-pressed` when used as a toggle filter
- [ ] `aria-label` if the text alone is not self-describing in context
- [ ] Contrast (AA):
  - Transparent: ~#F5F4F2 on rgba(64,63,63,0.5) over dark — estimated ≥ 4.5:1 ✓ (depends on backdrop)
  - Taxonomy: #4D4500 on #F5F5F2 — ratio ~9.3:1 ✓
  - Special: #2E2499 on #EEEDFE — ratio ~7.4:1 ✓
- [ ] Focus indicator: visible `outline` via `:focus-visible`
- [ ] `@media (prefers-reduced-motion)` respected — transitions disabled

---

## Open questions

1. **Backdrop blur token missing**: All Tag variants use `backdrop-filter: blur(32px)`. No token exists. Hardcoded as `blur(32px)` in CSS. Design system team should add `--uds-blur-md` or similar.

2. **Vertical padding discrepancy**: `--uds-spacing-etiqueta-v` is `4px` in tokens but Figma's Tag binds all four padding sides to the same variable resolving to `8px`. Measured height confirms 8 + 9 + 8 = 25px (padding + text + padding). Using `--uds-spacing-etiqueta-h` (8px) for all sides. Team should clarify whether `--uds-spacing-etiqueta-v` needs updating.

3. **Hover overlay colors unmapped**: Taxonomy hover adds a warm yellow overlay at 30% opacity; Special hover adds violeta-300 at 30% opacity. Neither has a semantic alias token. Taxonomy hover approximated with `--uds-color-superficie-seleccionado`. Special hover uses `--uds-color-ia-acento` via a `::before` pseudo-element at 0.3 opacity. Flag for token system to add `--uds-color-etiqueta-*-hover` aliases.

4. **Taxonomy text uses primitive directly**: `#4D4500` maps to `--uds-amarillo-900` (a primitive), not a semantic alias. The aliases layer has no "tag text on crema" semantic alias. Suggest adding `--uds-color-etiqueta-taxonomia-texto: var(--uds-amarillo-900)`.

5. **Transparent text off-by-one**: Figma binds tag text in Transparent to a variable resolving to ~#F5F4F2. The nearest alias is `--uds-color-texto-invertido` → `--uds-blanco-100: #FCFBFA`. Off-by-one already documented in `primitives.css`. Using `--uds-color-texto-invertido` as canonical value.
