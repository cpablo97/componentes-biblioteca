# Figma ↔ Code Sync Workflow

This document describes how to extract design information from Figma and translate it into code. Figma is the source of truth. Code follows Figma, not the other way around.

---

## Prerequisites

- Claude Code running with the Figma MCP server connected (see `.mcp.json`)
- The Uniandes Figma file URL (or individual node URLs)
- `tokens/index.css` already initialized

---

## Step 1 — Extract tokens from Figma variables

Run this when the Figma file has been updated with new or changed variables.

```
# In Claude Code, prompt:
"Use get_variable_defs on https://www.figma.com/design/fFyS7KbenVJZc9EJ8wTZWC/Entrega---Biblioteca-web?node-id=4-6 and list all variables organized by collection.
 Cross-reference with tokens/primitives.css and tokens/aliases.css.
 Flag any variable in Figma that does not have a corresponding CSS custom property."
```

What to look for:
- **Color collections** → map to `--uds-color-*`
- **Spacing/sizing collections** → map to `--uds-spacing-*`
- **Typography collections** → map to `--uds-font-*`
- **Radius/elevation** → map to `--uds-border-radius-*`, `--uds-shadow-*`

Output: a diff between Figma variables and `tokens/index.css`. Update the tokens file before building any component.

---

## Step 2 — Read a component spec

When starting work on a new component, get its full design context from Figma.

```
# In Claude Code, prompt:
"Use get_design_context on [FIGMA_COMPONENT_NODE_URL].
 Extract:
 - All layout values (width, height, padding, gap, border-radius)
 - All color values (map to token names, not raw hex)
 - Typography (font family, size, weight, line-height, letter-spacing)
 - All states visible in the Figma file (default, hover, focus, disabled, error, loading)
 - Any visible interaction notes or annotations
 Then create a SPEC.md file in components/[component-name]/ using the SPEC template."
```

---

## Step 3 — Validate before building

Before writing any code, confirm:

- [ ] All token values referenced in the spec exist in `tokens/index.css`
- [ ] Component name is normalized to lowercase hyphen-separated
- [ ] All states from Figma are accounted for in the spec
- [ ] The Figma node URL is recorded in SPEC.md for future reference

---

## Step 4 — Build the component

Follow the component build workflow in `CLAUDE.md`. Map every design value to a token variable, not a hardcoded value.

If Figma uses a raw hex value that has no token, that is a Figma inconsistency. Document it in SPEC.md under "Open questions" and use the nearest alias token with a comment.

---

## Step 5 — Verify against Figma after building

After the component is built:

```
# In Claude Code, prompt:
"Compare the rendered component in components/[name]/[name].html against the Figma spec
 at [FIGMA_COMPONENT_NODE_URL]. Use get_design_context to re-read the spec.
 List any discrepancies in spacing, color, or typography."
```

Resolve discrepancies before opening a PR.

---

## SPEC.md template

Every component gets a `SPEC.md` at the time it is created. Copy this template:

```markdown
# [Component Name] — Spec

**Figma node**: [URL]
**Last synced**: [YYYY-MM-DD]
**Status**: Draft | In review | Stable

---

## Overview

[One paragraph describing what this component is and when to use it.]

---

## Variants

| Variant | Description |
|---------|-------------|
| Default | ... |
| Hover   | ... |
| Focus   | ... |
| Disabled| ... |
| Error   | ... |

---

## Anatomy

[Describe each part of the component: container, label, icon, indicator, etc.]

---

## Spacing and layout

| Property     | Token                  | Value   |
|--------------|------------------------|---------|
| Padding H    | --uds-spacing-4        | 16px    |
| Padding V    | --uds-spacing-2        | 8px     |
| Border radius| --uds-border-radius-sm | 4px     |
| Gap          | --uds-spacing-2        | 8px     |

---

## Typography

| Role    | Token               | Value              |
|---------|---------------------|--------------------|
| Label   | --uds-font-size-sm  | 14px / 500 / -0.01em |

---

## Colors

| Role            | Token                      | Figma source       |
|-----------------|----------------------------|--------------------|
| Background      | --uds-color-surface        | Surface/Default    |
| Border          | --uds-color-border-default | Border/Default     |
| Label text      | --uds-color-text-primary   | Text/Primary       |

---

## Accessibility

- [ ] Role: `button` / `input` / etc.
- [ ] Keyboard: Tab, Enter/Space, Escape
- [ ] ARIA attributes:
- [ ] Contrast ratio (AA):

---

## Open questions

- Any Figma inconsistencies or missing tokens noted here.
```

---

## When Figma updates a component you've already built

1. Run `get_design_context` on the updated Figma node.
2. Update `SPEC.md` with the new values and change `Last synced` date.
3. Update `[component].css` and `[component].html` as needed.
4. If token values changed, update `tokens/index.css` first.
5. Bump the version and update `CHANGELOG.md`.
6. Open a PR labeled `figma-sync`.
