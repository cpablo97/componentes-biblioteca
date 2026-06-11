# Uniandes Design System — Claude Code Project Rules

This is the official design system for Universidad de los Andes.
Components are built in vanilla HTML, CSS, and JavaScript.
Documentation lives in Storybook. The source of truth for design decisions is a Figma file accessed via MCP.

---

## Stack

- **Components**: HTML + CSS + vanilla JS (no frameworks)
- **Documentation**: Storybook 8 (HTML stories)
- **Design source**: Figma (read-only via MCP)
- **Version control**: GitHub
- **CI**: GitHub Actions (Storybook build + deploy)

---

## MCP configuration

Figma is connected via the official Figma MCP server (`https://mcp.figma.com/mcp`).

Claude Code can use the following Figma MCP tools for reading:
- `get_design_context` — primary tool for extracting component specs, layout, spacing, typography, and color from any Figma node.
- `get_variable_defs` — read Figma variable (token) definitions linked to a node or file.
- `search_design_system` — search the Figma file for components, variables, and styles by keyword.
- `get_libraries` — list design libraries associated with the Figma file.

**Figma access is read-only.** Never push or modify Figma files programmatically.

When reading a component from Figma:
1. Use `get_design_context` on the component's Figma node URL.
2. Extract: dimensions, spacing, colors (mapped to token names), typography styles, states (default, hover, focus, disabled, error).
3. Cross-reference any variable names against `tokens/index.css` before hardcoding values.

---

## Project structure

```
uniandes-ds/
├── CLAUDE.md                  ← you are here
├── FIGMA_SYNC.md              ← Figma ↔ code sync workflow
├── TOKENS.md                  ← token architecture and naming conventions
├── CONTRIBUTING.md            ← contribution and review process
├── CHANGELOG.md               ← version history
├── tokens/
│   ├── index.css              ← all design tokens as CSS custom properties
│   ├── primitives.css         ← raw color, spacing, type scales
│   └── aliases.css            ← semantic aliases (--color-surface, --color-text-primary, etc.)
├── components/
│   └── [component-name]/
│       ├── SPEC.md            ← component spec (extracted from Figma)
│       ├── [component].html   ← markup template
│       ├── [component].css    ← scoped styles
│       ├── [component].js     ← behavior (if needed)
│       └── [component].stories.js
├── .storybook/
│   ├── main.js
│   └── preview.js
├── .github/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
│       └── storybook.yml
└── .mcp.json                  ← MCP server configuration for Claude Code
```

---

## Naming conventions

### Files
- All lowercase, hyphen-separated: `button-primary.css`, `input-text.js`
- Component folders match the Figma component name, normalized: `Button/Primary` → `button-primary/`

### CSS
- BEM methodology: `.component`, `.component__element`, `.component--modifier`
- Token usage is mandatory — no hardcoded color, spacing, or type values
- Prefix all component classes with `uds-`: `.uds-button`, `.uds-input`

### JavaScript
- No dependencies. Vanilla ES6+ only.
- Export a single `init(el)` function per component if JS is needed.
- All interactive state managed via data attributes: `data-state="open"`, `data-disabled`

### Tokens
- Primitives: `--uds-color-blue-500`, `--uds-spacing-4`, `--uds-font-size-md`
- Aliases: `--uds-color-surface`, `--uds-color-text-primary`, `--uds-border-radius-sm`

---

## Component build workflow

Follow this sequence for every new component:

1. **Read the Figma spec** — use `get_design_context` on the Figma node URL. Document in `SPEC.md`.
2. **Check tokens** — confirm all values exist in `tokens/index.css`. If missing, add them first.
3. **Write markup** — semantic HTML, no divs for divs' sake.
4. **Write styles** — scoped CSS using BEM + token variables.
5. **Write behavior** — JS only if needed. Keep it minimal.
6. **Write story** — document all states, variants, and accessibility notes in `.stories.js`.
7. **Self-review against checklist** — see CONTRIBUTING.md.
8. **Open PR** — use the PR template.

---

## Accessibility requirements

Every component must pass before merging:
- Keyboard navigation works (Tab, Enter, Escape, Arrow keys as appropriate)
- `aria-*` attributes present and correct
- Color contrast meets WCAG AA (4.5:1 for text, 3:1 for UI elements)
- Reduced motion respected (`@media (prefers-reduced-motion: reduce)`)
- Focus indicators visible

---

## What Claude Code should NOT do

- Modify Figma files
- Introduce JavaScript dependencies or frameworks
- Hardcode values that should be tokens
- Skip the SPEC.md step
- Write CSS that doesn't use token variables
- Use `!important`
- Merge to `main` directly — all changes go through PRs

---

## Storybook conventions

- Use `html` stories (no framework adapters)
- Every component needs: `Default`, `States` (all variants), `Dark mode`, `Accessibility` story
- Story titles follow Figma hierarchy: `Components/Button/Primary`
- Args must map to real HTML attributes or data attributes on the component
