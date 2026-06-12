# Button — Spec

**Figma node**: https://www.figma.com/design/fFyS7KbenVJZc9EJ8wTZWC/Entrega---Biblioteca-web?node-id=1069-9120
**Last synced**: 2026-06-11
**Status**: Draft

---

## Overview

A two-variant button set living inside the Search Section component. **Primary** is an IA-branded action button with a leading icon and a bordered violet fill. **Secondary** is a ghost/link-style button used for secondary actions like "Búsqueda Avanzada". Both use Source Sans 3 Regular at 16px with a 4% letter-spacing — notably lighter weight than the generic `--uds-text-button-weight` token (see open question #1).

---

## Variants

| Style     | State   | Description |
|-----------|---------|-------------|
| Primary   | Default | Dark violet fill (`--uds-color-ia-boton-fondo`), violet border and text (`--uds-color-ia-acento`), leading icon. |
| Primary   | Hover   | Same, plus a black overlay at 20% opacity darkens the fill. |
| Secondary | Default | Transparent background, underlined muted-gray text. Ghost/link style. |
| Secondary | Hover   | Dark warm background (#312E1C) appears behind the text. |

---

## Anatomy

- **Container** (`.uds-button`): the `<button>` element — horizontal flex, hug-contents.
- **Content wrapper** (`.uds-button__content`): inner horizontal flex row holding icon + label, gap 4px.
- **Icon** (`.uds-button__icon`): optional leading icon (Material Symbols Outlined ligature). Hidden on Secondary. `aria-hidden="true"`.
- **Label** (`.uds-button__label`): visible text string.

---

## Spacing and layout

| Property          | Token                          | Value   |
|-------------------|--------------------------------|---------|
| Padding (all 4)   | `--uds-spacing-etiqueta-h`     | 8px     |
| Icon–label gap    | `--uds-spacing-etiqueta-v`     | 4px     |
| Border radius     | `--uds-border-radius-etiqueta` | 2px     |
| Primary min-width | *(no resolved token)*          | 72px    |
| Primary max-width | *(no resolved token)*          | 280px   |

---

## Typography

| Role      | Token                    | Family           | Size | Weight | Line-height | Letter-spacing |
|-----------|--------------------------|------------------|------|--------|-------------|----------------|
| Label     | `--uds-text-button-size` | `--uds-font-sans`| 16px | 400    | `--uds-text-button-lh` (16px) | 0.04em *(no token)* |
| Icon      | `--uds-icon-size-md`     | Material Symbols Outlined | 16px | 300 (Light) | 100% | — |

---

## Colors

### Style: Primary

| Role           | Token                      | Figma source       | Resolved value |
|----------------|----------------------------|--------------------|----------------|
| Background     | `--uds-color-ia-boton-fondo` | violeta-900      | #230F46        |
| Border         | `--uds-color-ia-acento`    | violeta-300        | #BA92FF        |
| Text           | `--uds-color-ia-acento`    | violeta-300        | #BA92FF        |
| Icon           | `--uds-color-ia-acento`    | violeta-300        | #BA92FF        |
| Hover overlay  | *(no token — hardcoded)*   | black 20%          | rgba(0,0,0,0.2)|

### Style: Secondary

| Role           | Token                      | Figma source       | Resolved value |
|----------------|----------------------------|--------------------|----------------|
| Background     | transparent                | —                  | —              |
| Text           | `--uds-gris-100` *(primitive — no alias)* | — | #BAB9B3 |
| Text decoration| underline                  | —                  | —              |
| Hover bg       | *(no token — hardcoded)*   | dark warm #312E1C  | #312E1C        |

---

## Accessibility

- [x] Element: `<button type="button">`
- [x] Keyboard: Tab, Enter/Space to activate
- [x] Icon: `aria-hidden="true"` on icon span — label text is the accessible name
- [ ] When acting as a link: use `<a>` with `role="button"` or just `<a>`
- [ ] `aria-disabled="true"` on disabled state (with `tabindex="-1"` if needed)
- [ ] Contrast (AA):
  - Primary: #BA92FF on #230F46 — ratio ~4.6:1 ✓ (passes AA, borderline)
  - Secondary: #BAB9B3 on transparent (dark bg context) — depends on backdrop; ≥4.5:1 on negro-200 ✓
- [x] Focus indicator: visible `outline` via `:focus-visible` using `currentColor`
- [x] `@media (prefers-reduced-motion: reduce)` — transitions disabled

---

## Open questions

1. **Font weight diverges from button token**: `--uds-text-button-weight` is `600` (SemiBold) but Figma renders both Primary and Secondary at `weight: 400` (Regular). Using Figma as source of truth (400). Confirm whether these search-section buttons intentionally deviate from the system-wide button weight.

2. **Letter-spacing 4% has no token**: Both variants apply `letter-spacing: 4%` of font size (= 0.04em at 16px). No token exists for letter-spacing values. Hardcoded as `0.04em`. Suggest adding `--uds-letter-spacing-wide: 0.04em` or similar.

3. **Secondary text color uses primitive directly**: `#BAB9B3` matches `--uds-gris-100` exactly, but that alias is named `--uds-color-texto-deshabilitado`. Semantically incorrect for an active (non-disabled) button. Suggest adding `--uds-color-boton-secundario-texto: var(--uds-gris-100)` or a more accurate semantic alias.

4. **Secondary hover background has no token**: `#312E1C` is a dark warm brown not present in the token system. Closest is `--uds-negro-100: #1F1E1C` (cooler and darker). Hardcoded for now. The intent appears to be a subtle warm scrim on the transparent button hover. Flag for design team.

5. **Primary min/max-width binds to unresolved variables**: `minWidth: 72px` and `maxWidth: 280px` are bound to VariableID references from an external library not yet resolved in `primitives.css`. Hardcoded as literal `72px` / `280px`. Resolve once external lib is accessible.

6. **Icon font dependency**: Primary button uses Material Symbols Outlined (ligature-based). This font must be loaded globally. It is not included in the token system. Load it in `.storybook/preview-head.html` or equivalent app-level entrypoint.

7. **Naming ambiguity**: The aliases layer already defines `--uds-color-boton-primario-fondo` (negro-200, black fill) for a different "primary" button style. This component's "Primary" is the IA purple variant. Consider renaming to `uds-button--ia` / `uds-button--link` in code to avoid future confusion with the generic primary button.
