# Uniandes Design System — Work Plan

**Stack**: HTML + CSS + Vanilla JS · Storybook 8 · Figma (MCP, read-only) · GitHub · GitHub Actions

---

## Phase 1 — Foundation (Week 1–2)
*Goal: the project can run, Claude Code knows what to do, Figma is connected.*

| Task | Owner | Output |
|------|-------|--------|
| Initialize GitHub repo with the folder structure in CLAUDE.md | Dev | Repo |
| Copy all `.md` files from this setup package into root | Dev | CLAUDE.md, FIGMA_SYNC.md, TOKENS.md, CONTRIBUTING.md, CHANGELOG.md |
| Add `.mcp.json` to repo root | Dev | Figma MCP connected in Claude Code |
| Move `.github/PULL_REQUEST_TEMPLATE.md` and `workflows/storybook.yml` | Dev | GitHub Actions live |
| Run `npx storybook@latest init` and configure for HTML | Dev | Storybook running locally |
| Verify Figma MCP connection in Claude Code | Dev | Claude can read Figma file |

**Exit criteria**: Claude Code can read the Figma file. `npm run storybook` works. First PR can be opened.

---

## Phase 2 — Token architecture (Week 3–4)
*Goal: all Figma variables are reflected as CSS custom properties.*

| Task | Owner | Output |
|------|-------|--------|
| Run token extraction workflow (FIGMA_SYNC.md → Step 1) | Claude Code | Token diff |
| Create `tokens/primitives.css` with raw scale values | Dev + Claude Code | File |
| Create `tokens/aliases.css` with semantic mappings | Dev + Claude Code | File |
| Create `tokens/index.css` that imports both | Dev | File |
| Build Storybook token documentation page | Dev + Claude Code | Story |
| Review all tokens against Figma variables — no gaps | Design + Dev | Audit doc |

**Exit criteria**: Every Figma variable has a CSS custom property. The Storybook token page renders correctly.

---

## Phase 3 — Component loop (Week 5–ongoing)
*One component per sprint. Repeat this cycle for each component.*

| Step | Action |
|------|--------|
| 1 | Design marks component **Ready for development** in Figma |
| 2 | Dev creates branch `feat/[component-name]` |
| 3 | Claude Code reads spec via `get_design_context` |
| 4 | Claude Code creates `SPEC.md` |
| 5 | Claude Code builds `[component].html`, `[component].css`, `[component].js` |
| 6 | Claude Code writes `[component].stories.js` |
| 7 | Dev reviews against pre-PR checklist in CONTRIBUTING.md |
| 8 | Dev opens PR, peer review, merge to `develop` |
| 9 | On release cycle: merge `develop` → `main`, deploy |

**Suggested component order** (typical for institutional design systems):
1. Typography styles (no interaction, pure CSS)
2. Color swatches / token page
3. Button (primary, secondary, ghost, disabled)
4. Input text (default, focus, error, disabled)
5. Form field (label + input + helper text + error)
6. Badge / tag
7. Alert / notification
8. Card
9. Modal / dialog
10. Navigation (header, sidebar)

---

## Phase 4 — Governance (Month 2+)
*Goal: the system can grow without degrading.*

| Task | Output |
|------|--------|
| Define version cadence (monthly releases?) | Release calendar |
| Set up `CHANGELOG.md` discipline in the team | Process |
| Document what "deprecated" means and how to handle it | Section in CONTRIBUTING.md |
| Evaluate GitHub Actions: add visual regression testing (Chromatic or Percy) | CI improvement |
| Review token naming for consistency after Phase 3 | Token audit |

---

## Quick reference — Claude Code prompts

**Start of any session**
```
Read CLAUDE.md and FIGMA_SYNC.md. Confirm you understand the project structure and MCP setup.
```

**Extract tokens**
```
Use get_variable_defs on [FIGMA_FILE_URL]. Compare against tokens/primitives.css and tokens/aliases.css. List any gaps.
```

**Start a new component**
```
Use get_design_context on [FIGMA_NODE_URL]. Create SPEC.md in components/[name]/ using the template in FIGMA_SYNC.md. Then build the component following the workflow in CLAUDE.md.
```

**Sync after a Figma update**
```
The Figma component at [URL] has been updated. Re-read its spec with get_design_context, update SPEC.md, and list what changed in the code.
```

**Verify a built component**
```
Compare components/[name]/[name].html against the Figma spec at [URL]. List any spacing, color, or type discrepancies.
```
