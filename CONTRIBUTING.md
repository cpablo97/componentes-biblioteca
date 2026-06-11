# Contributing to the Uniandes Design System

---

## Who contributes

This design system is maintained by the Uniandes digital product team. External contributions require prior alignment with the design system lead.

---

## Branching strategy

| Branch     | Purpose                                         |
|------------|-------------------------------------------------|
| `main`     | Stable, deployed to Storybook production        |
| `develop`  | Integration branch, Storybook preview deploys   |
| `feat/*`   | New components or features                      |
| `fix/*`    | Bug fixes                                       |
| `tokens/*` | Token additions or changes                      |
| `sync/*`   | Figma sync updates (label PRs `figma-sync`)     |
| `docs/*`   | Documentation-only changes                      |

All branches target `develop`. `develop` merges to `main` on release.

---

## Starting a new component

1. Confirm the component exists and is marked **Ready for development** in Figma.
2. Create a branch: `feat/[component-name]`
3. Follow the workflow in `CLAUDE.md` (read spec → check tokens → build → story → review).
4. Open a PR to `develop`.

---

## Pre-PR checklist

Before opening a pull request, verify every item below.

### Design fidelity
- [ ] Compared built component to Figma spec visually (side by side)
- [ ] All spacing, color, and type values come from tokens, not hardcoded
- [ ] All states implemented: default, hover, focus, disabled, error (where applicable)

### Code quality
- [ ] HTML is semantic (correct element types, no unnecessary wrappers)
- [ ] CSS uses BEM naming with `uds-` prefix
- [ ] No `!important` used
- [ ] No inline styles
- [ ] JS is vanilla ES6+, no external dependencies
- [ ] `init(el)` function exported if JS is present

### Accessibility
- [ ] Keyboard operable (Tab, Enter, Space, Escape, Arrow keys as appropriate)
- [ ] Correct ARIA roles and attributes
- [ ] Color contrast passes WCAG AA (test with browser dev tools)
- [ ] Focus ring visible and distinct
- [ ] `@media (prefers-reduced-motion: reduce)` applied to any animation

### Storybook
- [ ] Story title follows Figma hierarchy: `Components/[Category]/[Name]`
- [ ] All states have their own story
- [ ] Args map to real HTML attributes or data attributes
- [ ] `docs` page has a component description
- [ ] Dark mode story included

### Documentation
- [ ] `SPEC.md` exists and is complete
- [ ] `CHANGELOG.md` updated (if applicable)

---

## PR template

PRs are created from `.github/PULL_REQUEST_TEMPLATE.md`. Fill it out completely — PRs without a completed checklist will not be reviewed.

---

## Review process

1. Author opens PR to `develop` and self-reviews against the checklist above.
2. At least one peer review required before merging.
3. Reviewer checks: fidelity, accessibility, token usage, story completeness.
4. Merge uses **squash and merge** to keep history clean.

---

## Versioning

This project follows [Semantic Versioning](https://semver.org/):

- **Patch** (`0.0.x`): bug fixes, documentation corrections, accessibility fixes
- **Minor** (`0.x.0`): new components, new token aliases, non-breaking changes
- **Major** (`x.0.0`): breaking changes to tokens or component APIs

Update `CHANGELOG.md` under `[Unreleased]` as you work. On release, the team moves unreleased items under the new version number.

---

## Working with Claude Code

Claude Code is part of the build workflow. When using it:

- Always start a session by letting Claude read `CLAUDE.md` and `FIGMA_SYNC.md`.
- Provide the specific Figma node URL for the component you're building.
- Review all generated code against the pre-PR checklist before committing.
- Claude Code should never push directly to `main` or `develop`.
