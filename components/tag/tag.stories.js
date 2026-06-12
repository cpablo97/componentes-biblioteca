import './tag.css';

export default {
  title: 'Componentes/Tag',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Etiqueta inline usada para categorías taxonómicas, tipos de contenido y marcadores especiales. ' +
          'Aparece dentro de Result Cards y Search Sections. ' +
          'Figma: `node-id=1069-4729`.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto visible del tag.',
      defaultValue: 'Taxonomía',
    },
    style: {
      control: 'select',
      options: ['transparent', 'taxonomy', 'special'],
      description: 'Variante visual del tag.',
      defaultValue: 'taxonomy',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado deshabilitado.',
      defaultValue: false,
    },
  },
  render: ({ label, style, disabled }) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `uds-tag uds-tag--${style}`;
    btn.textContent = label ?? 'Taxonomía';
    if (disabled) btn.disabled = true;
    return btn;
  },
};


/* ─── Default ─────────────────────────────── */

export const Default = {
  args: {
    label: 'Taxonomía',
    style: 'taxonomy',
    disabled: false,
  },
};


/* ─── All styles ──────────────────────────── */

export const AllStyles = {
  name: 'Todos los estilos',
  parameters: {
    backgrounds: { default: 'crema' },
    controls: { disable: true },
    docs: {
      description: {
        story: 'Los tres estilos en su estado por defecto. El estilo Transparent se muestra sobre fondo negro porque está diseñado para uso sobre imágenes u oscuro.',
      },
    },
  },
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:flex;flex-direction:column;gap:1rem;';

    const darkRow = document.createElement('div');
    darkRow.style.cssText =
      'display:flex;gap:0.5rem;align-items:center;background:#191916;padding:1rem;border-radius:8px;';

    ['Taxonomía', 'Investigación', 'Posgrado'].forEach((text) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'uds-tag uds-tag--transparent';
      btn.textContent = text;
      darkRow.appendChild(btn);
    });

    const taxonomyRow = document.createElement('div');
    taxonomyRow.style.cssText = 'display:flex;gap:0.5rem;align-items:center;';

    ['Taxonomía', 'Investigación', 'Posgrado'].forEach((text) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'uds-tag uds-tag--taxonomy';
      btn.textContent = text;
      taxonomyRow.appendChild(btn);
    });

    const specialRow = document.createElement('div');
    specialRow.style.cssText = 'display:flex;gap:0.5rem;align-items:center;';

    ['IA Uniandes', 'Asistente', 'Destacado'].forEach((text) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'uds-tag uds-tag--special';
      btn.textContent = text;
      specialRow.appendChild(btn);
    });

    wrapper.appendChild(darkRow);
    wrapper.appendChild(taxonomyRow);
    wrapper.appendChild(specialRow);
    return wrapper;
  },
};


/* ─── Transparent ─────────────────────────── */

export const Transparent = {
  parameters: {
    backgrounds: { default: 'negro' },
    docs: {
      description: {
        story: 'Estilo Transparent — diseñado para usarse sobre imágenes o superficies oscuras. En hover la opacidad del fondo pasa de 0.5 a 0.9.',
      },
    },
  },
  args: {
    label: 'Taxonomía',
    style: 'transparent',
    disabled: false,
  },
};


/* ─── Taxonomy ────────────────────────────── */

export const Taxonomy = {
  parameters: {
    backgrounds: { default: 'crema' },
    docs: {
      description: {
        story: 'Estilo Taxonomy — etiqueta de categoría estándar. Fondo crema con texto ámbar oscuro.',
      },
    },
  },
  args: {
    label: 'Investigación',
    style: 'taxonomy',
    disabled: false,
  },
};


/* ─── Special ─────────────────────────────── */

export const Special = {
  parameters: {
    backgrounds: { default: 'crema' },
    docs: {
      description: {
        story: 'Estilo Special — reservado para contenido relacionado con IA/Asistente Uniandes. Fondo violeta suave con texto violeta profundo.',
      },
    },
  },
  args: {
    label: 'IA Uniandes',
    style: 'special',
    disabled: false,
  },
};


/* ─── Disabled ────────────────────────────── */

export const Disabled = {
  name: 'Estado deshabilitado',
  parameters: {
    backgrounds: { default: 'crema' },
    controls: { disable: true },
    docs: {
      description: {
        story: 'Los tres estilos en estado deshabilitado (opacity 0.4, pointer-events none).',
      },
    },
  },
  render: () => {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;flex-direction:column;gap:1rem;';

    const darkRow = document.createElement('div');
    darkRow.style.cssText =
      'display:flex;gap:0.5rem;align-items:center;background:#191916;padding:1rem;border-radius:8px;';
    const t = document.createElement('button');
    t.type = 'button';
    t.className = 'uds-tag uds-tag--transparent';
    t.textContent = 'Taxonomía';
    t.disabled = true;
    darkRow.appendChild(t);

    const lightRow = document.createElement('div');
    lightRow.style.cssText = 'display:flex;gap:0.5rem;align-items:center;';

    [['taxonomy', 'Investigación'], ['special', 'IA Uniandes']].forEach(([style, label]) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `uds-tag uds-tag--${style}`;
      btn.textContent = label;
      btn.disabled = true;
      lightRow.appendChild(btn);
    });

    row.appendChild(darkRow);
    row.appendChild(lightRow);
    return row;
  },
};


/* ─── Accessibility ───────────────────────── */

export const Accessibility = {
  name: 'Accesibilidad',
  parameters: {
    backgrounds: { default: 'crema' },
    controls: { disable: true },
    docs: {
      description: {
        story: `
**Notas de accesibilidad:**

- Usar \`<button type="button">\` cuando el tag es interactivo (filtro, navegación).
- Usar \`<span role="img" aria-label="...">\` cuando es puramente decorativo/display.
- Agregar \`aria-pressed="true/false"\` cuando actúa como filtro toggle.
- El indicador de foco (outline) usa \`currentColor\` con 2px de offset — visible en todos los estilos.
- Los tres estilos superan el contraste AA: Transparent ✓, Taxonomy ✓ (~9.3:1), Special ✓ (~7.4:1).
- \`@media (prefers-reduced-motion: reduce)\` desactiva las transiciones.
        `.trim(),
      },
    },
  },
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:flex;flex-direction:column;gap:1rem;';

    const p = document.createElement('p');
    p.style.cssText = 'font-size:14px;color:#6B6B68;margin:0;';
    p.textContent = 'Tab para enfocar cada tag y verificar el indicador de foco:';
    wrapper.appendChild(p);

    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;';

    const items = [
      { style: 'transparent', label: 'Taxonomía', bg: '#191916' },
      { style: 'taxonomy', label: 'Investigación', bg: 'transparent' },
      { style: 'special', label: 'IA Uniandes', bg: 'transparent' },
    ];

    items.forEach(({ style, label, bg }) => {
      const wrap = document.createElement('span');
      wrap.style.cssText = `background:${bg};padding:8px;border-radius:4px;`;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `uds-tag uds-tag--${style}`;
      btn.textContent = label;
      btn.setAttribute('aria-label', `Categoría: ${label}`);
      wrap.appendChild(btn);
      row.appendChild(wrap);
    });

    wrapper.appendChild(row);
    return wrapper;
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
        story: 'Los tres estilos sobre fondo oscuro. El Transparent está optimizado para este contexto. Taxonomy y Special mantienen sus colores base.',
      },
    },
  },
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('data-theme', 'dark');
    wrapper.style.cssText = 'display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;background:#191916;padding:1.5rem;border-radius:8px;';

    [
      ['transparent', 'Taxonomía'],
      ['taxonomy', 'Investigación'],
      ['special', 'IA Uniandes'],
    ].forEach(([style, label]) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `uds-tag uds-tag--${style}`;
      btn.textContent = label;
      wrapper.appendChild(btn);
    });

    return wrapper;
  },
};
