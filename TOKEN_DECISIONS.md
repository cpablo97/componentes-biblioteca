# Token Architecture — Design Decisions & Open Items

This document records every judgment call made when converting the Figma audit into CSS tokens, and every issue that requires a decision from the design team before the tokens can be considered stable.

---

## Decisions made

### Color

**negro-100 vs #1F1F1C (CRITICAL)**
The Figma `negro/100` variable is `#1F1E1C`. However, 870 nodes use `#1F1F1C` (green channel off by 1) as a hardcoded value instead of binding to the variable. The token is defined as `#1F1E1C` (the declared variable value). All 870 nodes must be rebound to `var(--negro-100)` in Figma.

**blanco-100 vs #FCFCFA (CRITICAL)**
Same off-by-one issue. Token is `#FCFBFA`. 57 nodes use `#FCFCFA`. Rebind in Figma.

**crema-50 introduced**
`#F5F5F2` (75 nodes, card and slot backgrounds) is not in the Figma variable collection but is clearly intentional and distinct from `crema-100` (`#F7F6F0`). Added as `--uds-crema-50`. Confirm with design team whether this should be a named primitive or collapsed into `crema-100`.

**gris scale expanded**
Figma only formally defines `gris/300` and `gris/500`. The audit found 5 additional gray values in heavy use (`#8A8984`, `#595959`, `#73726D`, `#4D4D4C`, `#BAB9B3`). All are added as primitives with suggested names. Design team should review and confirm or collapse.

**gris-500-alt kept separate**
`#73726D` (92 uses, event state text) is close to `gris-500` (`#6B6B68`) but distinct. Named `--uds-gris-500-alt` pending a team decision to either merge or keep separate.

**amarillo-100 added as brand primitive**
`#FFE41E` (46 uses, hero vectors) has no Figma token. It is clearly the Uniandes brand yellow and added as a first-class primitive. `#4D4500` (34 uses, tag text on yellow) added as `amarillo-900` to complete the minimum yellow pair.

**violeta added as feature palette**
5 purple values appear in IA Assistant and Special tag components with no tokens. Added as `violeta-50` through `violeta-900`. These are scoped to `--uds-color-ia-*` aliases and should not be used outside IA-specific components.

**azul-marino added**
`#252B37` (12 uses, cargo/role labels) has no token. Added as `--uds-azul-marino-100` and aliased to `--uds-color-cargo-texto`.

**negro-puro kept separate from negro-200**
`#000000` (101 uses) and `#191916` are both dark fills but serve different roles. `#000000` appears in Gamay display text and image overlays; `#191916` is the button fill. Kept separate.

**Color de blur normalized**
`#40403F` at 50% alpha has no primitive alias in Figma. Added as `--uds-negro-blur: rgba(64,63,63,0.5)`. Should alias to `negro-200` if the design team accepts a slight color shift; otherwise define a `negro-300` primitive.

---

### Spacing

**Component-semantic spacing kept as-is**
The Figma `Espaciado` collection defines spacing by component role (`boton-primario/h`, `etiqueta/v`, etc.), not as a generic scale. This is an unusual but valid approach. The tokens are mapped 1:1 to this structure. A generic numeric scale (`--uds-spacing-4`, `--uds-spacing-8`, etc.) is not imposed because it does not exist in Figma — adding one would introduce decisions not made by the design team.

**Generic spacing scale: UNRESOLVED**
`spacing-xxs`, `spacing-xs`, `spacing-md`, `spacing-lg`, `spacing-xl` are defined in the Figma file but resolve to external library aliases whose px values cannot be read without access to that library. These are marked `TODO` in `primitives.css`. **This must be resolved before any layout tokens can be used.**

---

### Typography

**Three font roles clearly separated**
`Source Sans 3` → UI body, labels, headings, buttons
`Source Serif 4` → editorial, event dates, secondary headings
`Gamay` → brand display only (hero/marketing sections, not UI components)

**heading-sm consolidation recommended**
`heading-sm` (18px SemiBold, lh:20px) and `heading-sm-tight` (18px SemiBold, lh:18px) have the same usage count (20 each). These should be one token with a variant, not two separate tokens. Recommendation: keep `--uds-text-heading-sm` at lh:20px, add a `--uds-text-heading-sm-lh-tight: 18px` override if needed.

**Fractional font sizes excluded**
`15.567px` (22 nodes) and `20.583px` (3 nodes) are scaling artifacts — nodes were resized via transform rather than having font-size set directly. These are NOT tokenized. The Figma nodes must be fixed to use `16px` and `20px` respectively.

**label-md-compact deprioritized**
`label-md-compact` (16px Medium, lh:20px, 8 uses) is close to `label-md` (16px Medium, lh:24px). Consider removing and using `label-md` everywhere unless the tighter leading is genuinely intentional.

**Gamay: consolidation recommended**
11 Gamay combinations exist with 1–4 uses each. For a first token release, only the pairs that appear on more than 1 node are included. Single-use combinations (`display-gamay-bold-xl`, `display-gamay-bold-3xl`) are included but flagged for potential removal.

**serif-xs-loose flagged**
12px with 20px line-height (ratio 1.67) is very open for a small size. Included as a token but marked for design review.

**Source Serif 4 12px has three line-height variants**
`serif-xs` (lh:14px, 18 uses), `serif-xs-loose` (lh:20px, 12 uses), and `serif-xs-fixed` implied. The 20px variant is suspect — verify it is not a copy-paste error.

---

### Radii

No design decisions needed — the four values are clear and consistently used:
`2px` (tags) → `4px` (buttons) → `16px` (cards) → `20px` (large containers)

Note: Figma has no radius variable collection. All four values are hardcoded across nodes. Consider adding them as variables in Figma for consistency.

---

### Shadows

Both shadows are hardcoded in Figma (no effect styles, no variables). Tokenized here as primitives. Low usage (4 and 2 nodes respectively) — verify they are intentional and not accidental.

---

## Open items requiring design team decision

| Priority | Item | Decision needed |
|----------|------|-----------------|
| CRITICAL | 870 nodes using `#1F1F1C` instead of `negro/100` | Rebind all nodes to variable in Figma |
| CRITICAL | 57 nodes using `#FCFCFA` instead of `blanco/100` | Rebind all nodes to variable in Figma |
| CRITICAL | `spacing-xxs/xs/md/lg/xl` unresolved | Share source library or confirm px values |
| HIGH | `crema-50` (`#F5F5F2`) — intentional or error? | Confirm whether to keep separate from `crema-100` |
| HIGH | `gris-500-alt` (`#73726D`) — merge with `gris-500`? | Confirm or consolidate |
| HIGH | Brand yellow — is `amarillo-100` the correct name? | Confirm naming with brand guidelines |
| HIGH | No Figma text styles defined | Add named text styles in Figma to match these tokens |
| HIGH | No Figma effect styles defined | Add named effect styles for the two shadows |
| MEDIUM | `heading-sm` vs `heading-sm-tight` — consolidate? | Confirm if both are needed |
| MEDIUM | `label-md-compact` — needed or remove? | Confirm usage intent |
| MEDIUM | `serif-xs-loose` (12px/20px) — intentional? | Verify leading ratio |
| MEDIUM | `Source Serif 4 / Medium / 20px` has lh:24px and lh:25px variants | Consolidate to one |
| MEDIUM | Dark mode token values | These are first-pass estimates — needs proper dark mode design |
| LOW | `Colors/Base/white` (#FFFFFF) not aliased in Figma | Add `blanco/puro` to semantic Color collection |
| LOW | `Color de blur` not aliased to a primitive in Figma | Alias to `negro/200` or define `negro/300` |
| LOW | Gamay 1-use combinations — keep or remove? | Confirm which Gamay tokens are canonical |
