# Token Architecture

Design tokens are the single source of truth for all visual decisions in the Uniandes Design System. Every color, spacing value, type size, shadow, and radius in the codebase must reference a token — no hardcoded values.

---

## Two-tier structure

### Tier 1 — Primitives (`tokens/primitives.css`)

Raw values with no semantic meaning. These are the palette.

```css
:root {
  /* Color — blue scale */
  --uds-color-blue-100: #dce9f7;
  --uds-color-blue-200: #b9d3ef;
  --uds-color-blue-500: #1a6ab4;
  --uds-color-blue-700: #0d4a82;
  --uds-color-blue-900: #062a4e;

  /* Spacing scale (base 4px) */
  --uds-spacing-1: 4px;
  --uds-spacing-2: 8px;
  --uds-spacing-3: 12px;
  --uds-spacing-4: 16px;
  --uds-spacing-6: 24px;
  --uds-spacing-8: 32px;
  --uds-spacing-12: 48px;
  --uds-spacing-16: 64px;

  /* Type scale */
  --uds-font-size-xs:   11px;
  --uds-font-size-sm:   13px;
  --uds-font-size-md:   15px;
  --uds-font-size-lg:   18px;
  --uds-font-size-xl:   22px;
  --uds-font-size-2xl:  28px;
  --uds-font-size-3xl:  36px;

  /* Border radius */
  --uds-radius-none:  0;
  --uds-radius-sm:    4px;
  --uds-radius-md:    8px;
  --uds-radius-lg:    12px;
  --uds-radius-xl:    16px;
  --uds-radius-full:  9999px;

  /* Shadows */
  --uds-shadow-sm:  0 1px 2px rgba(0,0,0,0.08);
  --uds-shadow-md:  0 4px 8px rgba(0,0,0,0.10);
  --uds-shadow-lg:  0 8px 24px rgba(0,0,0,0.12);
}
```

Primitives are **never used directly in component CSS**. They are only referenced by aliases.

---

### Tier 2 — Aliases (`tokens/aliases.css`)

Semantic names that map to primitives. These carry meaning — they tell you *where* a value is used, not just *what* it is.

```css
:root {
  /* Surface */
  --uds-color-surface:           var(--uds-color-neutral-0);
  --uds-color-surface-raised:    var(--uds-color-neutral-50);
  --uds-color-surface-sunken:    var(--uds-color-neutral-100);
  --uds-color-surface-overlay:   var(--uds-color-neutral-900);

  /* Text */
  --uds-color-text-primary:      var(--uds-color-neutral-900);
  --uds-color-text-secondary:    var(--uds-color-neutral-600);
  --uds-color-text-placeholder:  var(--uds-color-neutral-400);
  --uds-color-text-disabled:     var(--uds-color-neutral-300);
  --uds-color-text-inverse:      var(--uds-color-neutral-0);
  --uds-color-text-link:         var(--uds-color-blue-600);

  /* Border */
  --uds-color-border-default:    var(--uds-color-neutral-200);
  --uds-color-border-strong:     var(--uds-color-neutral-400);
  --uds-color-border-focus:      var(--uds-color-blue-500);

  /* Interactive */
  --uds-color-interactive:       var(--uds-color-blue-600);
  --uds-color-interactive-hover: var(--uds-color-blue-700);
  --uds-color-interactive-active:var(--uds-color-blue-800);

  /* Feedback */
  --uds-color-success:           var(--uds-color-green-600);
  --uds-color-warning:           var(--uds-color-yellow-500);
  --uds-color-error:             var(--uds-color-red-600);
  --uds-color-info:              var(--uds-color-blue-500);
}
```

---

## Dark mode

Aliases are the mechanism for dark mode. Override alias values under a `[data-theme="dark"]` selector (or `@media (prefers-color-scheme: dark)` if no manual toggle is needed).

```css
[data-theme="dark"] {
  --uds-color-surface:         var(--uds-color-neutral-900);
  --uds-color-text-primary:    var(--uds-color-neutral-50);
  --uds-color-border-default:  var(--uds-color-neutral-700);
  /* etc. */
}
```

Only aliases change in dark mode. Primitives never change.

---

## Token naming rules

| Layer     | Pattern                                  | Example                        |
|-----------|------------------------------------------|--------------------------------|
| Primitive | `--uds-{category}-{scale}`               | `--uds-color-blue-500`         |
| Alias     | `--uds-{category}-{role}-{modifier?}`    | `--uds-color-text-secondary`   |
| Component | `--uds-[component]-{property}-{state?}` | `--uds-button-bg-hover`        |

Component-level tokens are optional and only created when a component needs values that don't map cleanly to aliases (e.g. a very specific focus ring offset).

---

## Token extraction from Figma

See `FIGMA_SYNC.md` → Step 1 for the extraction workflow.

When Figma uses a variable name like `Color/Blue/500`, it maps to `--uds-color-blue-500`.
When Figma uses a semantic variable like `Text/Primary`, it maps to `--uds-color-text-primary`.

---

## Storybook token documentation

The `tokens/` stories page should display:
- All color aliases as swatches, grouped by role (surface, text, border, interactive, feedback)
- The spacing scale as a visual ruler
- The type scale as a live text sample
- The radius scale as a set of corner demos

This page is auto-generated from `tokens/index.css` — do not maintain it manually.
