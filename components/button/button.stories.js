import './button.css';

/* Load Material Symbols Outlined once for all button stories. */
function ensureMaterialSymbols() {
  if (typeof document !== 'undefined' && !document.querySelector('[data-uds-material-symbols]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.setAttribute('data-uds-material-symbols', '');
    link.href =
      'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    document.head.appendChild(link);
  }
}

function makeButton({ style, label, icon, disabled }) {
  ensureMaterialSymbols();

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `uds-button uds-button--${style}`;
  if (disabled) btn.disabled = true;

  const content = document.createElement('span');
  content.className = 'uds-button__content';

  if (icon && style === 'primary') {
    const iconEl = document.createElement('span');
    iconEl.className = 'uds-button__icon';
    iconEl.setAttribute('aria-hidden', 'true');
    iconEl.textContent = icon;
    content.appendChild(iconEl);
  }

  const labelEl = document.createElement('span');
  labelEl.className = 'uds-button__label';
  labelEl.textContent = label;
  content.appendChild(labelEl);

  btn.appendChild(content);
  return btn;
}

/* ─── Meta ────────────────────────────────── */

export default {
  title: 'Componentes/Button',
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'negro' },
    docs: {
      description: {
        component:
          'Botón de dos variantes para el Search Section y contextos IA. ' +
          '**Primary**: acción IA con icono y borde violeta. ' +
          '**Secondary**: botón fantasma/enlace para acciones secundarias. ' +
          'Figma: `node-id=1069-9120`. ' +
          'Requiere **Material Symbols Outlined** cargado globalmente (ver SPEC.md #6).',
      },
    },
  },
  argTypes: {
    style: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Variante visual.',
    },
    label: {
      control: 'text',
      description: 'Texto del botón.',
    },
    icon: {
      control: 'text',
      description: 'Nombre del ícono Material Symbols (solo aplica a Primary).',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado deshabilitado.',
    },
  },
  render: (args) => makeButton(args),
};


/* ─── Default ─────────────────────────────── */

export const Default = {
  args: {
    style: 'primary',
    label: 'Asistente IA',
    icon: 'category_search',
    disabled: false,
  },
};


/* ─── Primary ─────────────────────────────── */

export const Primary = {
  parameters: {
    backgrounds: { default: 'negro' },
    docs: {
      description: {
        story:
          'Botón IA con fondo violeta oscuro (`--uds-color-ia-boton-fondo`), borde y texto en `--uds-color-ia-acento`. ' +
          'Hover agrega un overlay negro al 20%. Requiere icono Material Symbols.',
      },
    },
  },
  args: {
    style: 'primary',
    label: 'Asistente IA',
    icon: 'category_search',
    disabled: false,
  },
};


/* ─── Secondary ───────────────────────────── */

export const Secondary = {
  parameters: {
    backgrounds: { default: 'negro' },
    docs: {
      description: {
        story:
          'Botón fantasma/enlace. Fondo transparente, texto gris con subrayado. ' +
          'Hover revela un fondo oscuro cálido (#312E1C — sin token, ver SPEC.md #4).',
      },
    },
  },
  args: {
    style: 'secondary',
    label: 'Búsqueda Avanzada',
    icon: '',
    disabled: false,
  },
};


/* ─── All variants ────────────────────────── */

export const AllVariants = {
  name: 'Todas las variantes',
  parameters: {
    backgrounds: { default: 'negro' },
    controls: { disable: true },
    docs: {
      description: {
        story: 'Primary y Secondary juntos en el contexto de fondo oscuro para el que fueron diseñados.',
      },
    },
  },
  render: () => {
    ensureMaterialSymbols();

    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:1rem;align-items:center;flex-wrap:wrap;';

    row.appendChild(
      makeButton({ style: 'primary', label: 'Asistente IA', icon: 'category_search', disabled: false })
    );
    row.appendChild(
      makeButton({ style: 'secondary', label: 'Búsqueda Avanzada', icon: '', disabled: false })
    );

    return row;
  },
};


/* ─── Disabled ────────────────────────────── */

export const Disabled = {
  name: 'Estado deshabilitado',
  parameters: {
    backgrounds: { default: 'negro' },
    controls: { disable: true },
    docs: {
      description: {
        story: 'Ambas variantes deshabilitadas (opacity 0.4, pointer-events none).',
      },
    },
  },
  render: () => {
    ensureMaterialSymbols();

    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:1rem;align-items:center;flex-wrap:wrap;';

    row.appendChild(
      makeButton({ style: 'primary', label: 'Asistente IA', icon: 'category_search', disabled: true })
    );
    row.appendChild(
      makeButton({ style: 'secondary', label: 'Búsqueda Avanzada', icon: '', disabled: true })
    );

    return row;
  },
};


/* ─── Dark mode ───────────────────────────── */

export const DarkMode = {
  name: 'Modo oscuro',
  parameters: {
    backgrounds: { default: 'negro' },
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Ambas variantes en modo oscuro (`data-theme="dark"`). ' +
          'Los alias de botón se invierten: `--uds-color-boton-primario-fondo` → blanco-100. ' +
          'Primary IA conserva su paleta violeta (no usa los alias genéricos de botón).',
      },
    },
  },
  render: () => {
    ensureMaterialSymbols();

    const wrapper = document.createElement('div');
    wrapper.setAttribute('data-theme', 'dark');
    wrapper.style.cssText =
      'display:flex;gap:1rem;align-items:center;flex-wrap:wrap;background:#191916;padding:1.5rem;border-radius:8px;';

    wrapper.appendChild(
      makeButton({ style: 'primary', label: 'Asistente IA', icon: 'category_search', disabled: false })
    );
    wrapper.appendChild(
      makeButton({ style: 'secondary', label: 'Búsqueda Avanzada', icon: '', disabled: false })
    );

    return wrapper;
  },
};


/* ─── Accessibility ───────────────────────── */

export const Accessibility = {
  name: 'Accesibilidad',
  parameters: {
    backgrounds: { default: 'negro' },
    controls: { disable: true },
    docs: {
      description: {
        story: `
**Notas de accesibilidad:**

- Usar \`<button type="button">\` para acciones; \`<a href="...">\` para navegación — no mezclar.
- El ícono lleva \`aria-hidden="true"\`; el texto visible es el nombre accesible del botón.
- Agregar \`aria-label\` si el texto no es suficientemente descriptivo fuera de contexto.
- Contraste AA:
  - Primary: #BA92FF sobre #230F46 → ~4.6:1 ✓ (pasa AA, borderline — verificar en prod)
  - Secondary: #BAB9B3 sobre fondo oscuro negro (#191916) → ~5.0:1 ✓
- Indicador de foco: \`outline: 2px solid currentColor\` con offset 2px — visible en ambas variantes.
- \`@media (prefers-reduced-motion: reduce)\` desactiva todas las transiciones.
- Estado disabled: \`button[disabled]\` o \`aria-disabled="true"\` + \`tabindex="-1"\` según contexto.
        `.trim(),
      },
    },
  },
  render: () => {
    ensureMaterialSymbols();

    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:flex;flex-direction:column;gap:1rem;';

    const note = document.createElement('p');
    note.style.cssText = 'font-size:13px;color:#BAB9B3;margin:0;font-family:sans-serif;';
    note.textContent = 'Tab para enfocar cada botón y verificar el indicador de foco:';
    wrapper.appendChild(note);

    const row = document.createElement('div');
    row.style.cssText =
      'display:flex;gap:1rem;align-items:center;flex-wrap:wrap;background:#191916;padding:1.5rem;border-radius:8px;';

    const primaryBtn = makeButton({
      style: 'primary',
      label: 'Asistente IA',
      icon: 'category_search',
      disabled: false,
    });
    primaryBtn.setAttribute('aria-label', 'Abrir el Asistente IA de Uniandes');
    row.appendChild(primaryBtn);

    const secondaryBtn = makeButton({
      style: 'secondary',
      label: 'Búsqueda Avanzada',
      icon: '',
      disabled: false,
    });
    secondaryBtn.setAttribute('aria-label', 'Abrir búsqueda avanzada');
    row.appendChild(secondaryBtn);

    wrapper.appendChild(row);
    return wrapper;
  },
};
