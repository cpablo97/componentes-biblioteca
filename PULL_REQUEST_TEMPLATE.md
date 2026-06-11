## What this PR does

<!-- One sentence describing what was built or changed. -->

**Figma node**: <!-- URL of the Figma component or token collection this is based on -->
**Type**: <!-- New component / Token update / Bug fix / Figma sync / Docs -->

---

## Pre-merge checklist

### Design fidelity
- [ ] Compared to Figma spec (side by side)
- [ ] All values reference tokens, no hardcoded colors, spacing, or type

### Code
- [ ] Semantic HTML
- [ ] BEM + `uds-` prefix, no `!important`, no inline styles
- [ ] Vanilla JS only, `init(el)` exported if JS present

### Accessibility
- [ ] Keyboard operable
- [ ] Correct ARIA roles and attributes
- [ ] WCAG AA contrast verified
- [ ] Focus ring visible
- [ ] `prefers-reduced-motion` handled

### Storybook
- [ ] All states have stories
- [ ] Dark mode story included
- [ ] Component description in docs page

### Documentation
- [ ] `SPEC.md` created or updated
- [ ] `CHANGELOG.md` updated under [Unreleased]

---

## Screenshots

<!-- Paste a screenshot of the built component next to a screenshot of the Figma spec. -->
