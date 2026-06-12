import './search-section.css';
import { init } from './search-section.js';

/* ─── Helpers ────────────────────────────────── */

let _counter = 0;

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

/**
 * @param {object} opts
 * @param {string[]} opts.tabs         — tab labels in order
 * @param {number}   opts.activeTab    — index of initially selected tab
 * @param {string}   opts.placeholder  — search input placeholder
 * @param {string}   opts.iaLabel      — IA button label
 * @param {string}   opts.advLabel     — Advanced search button label
 */
function makeSection({
  tabs = ['i-RUS', 'GPS Bibliográfico', 'En el portal'],
  activeTab = 0,
  placeholder = 'Buscar libros, artículos, juegos, mapas...',
  iaLabel = 'Asistente IA',
  advLabel = 'Búsqueda Avanzada',
} = {}) {
  ensureMaterialSymbols();
  _counter++;
  const uid = `uds-ss-${_counter}`;

  const section = document.createElement('section');
  section.className = 'uds-search-section';
  section.setAttribute('aria-label', 'Búsqueda de recursos');

  const container = document.createElement('div');
  container.className = 'uds-search-section__container';

  /* ── Tab line ── */
  const tabList = document.createElement('div');
  tabList.className = 'uds-tab-line';
  tabList.setAttribute('role', 'tablist');
  tabList.setAttribute('aria-label', 'Modos de búsqueda');

  const panels = [];

  tabs.forEach((label, i) => {
    const tabId = `${uid}-tab-${i}`;
    const panelId = `${uid}-panel-${i}`;
    const isSelected = i === activeTab;

    /* Tab button */
    const btn = document.createElement('button');
    btn.className = 'uds-tab';
    btn.setAttribute('role', 'tab');
    btn.dataset.state = isSelected ? 'selected' : 'default';
    btn.setAttribute('aria-selected', String(isSelected));
    btn.setAttribute('aria-controls', panelId);
    btn.id = tabId;
    btn.tabIndex = isSelected ? 0 : -1;
    btn.textContent = label;
    tabList.appendChild(btn);

    /* Tab panel */
    const panel = document.createElement('div');
    panel.id = panelId;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabId);
    panel.hidden = !isSelected;

    const catPanelId = `${uid}-catpanel-${i}`;
    panel.innerHTML = `
      <div class="uds-search-section__inner">
        <form class="uds-search-section__search-bar" role="search" action="#" method="get">
          <label for="${uid}-input-${i}" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap">Buscar en ${label}</label>
          <div class="uds-search-section__input-wrapper">
            <span class="uds-search-section__search-icon" aria-hidden="true">search</span>
            <input
              id="${uid}-input-${i}"
              class="uds-search-section__input"
              type="search"
              name="q"
              placeholder="${placeholder}"
              autocomplete="off"
            />
          </div>
          <button class="uds-search-section__buscar" type="submit">Buscar</button>
        </form>
        <button
          class="uds-search-categories"
          type="button"
          aria-expanded="false"
          aria-controls="${catPanelId}"
          data-state="closed"
        >
          <span class="uds-search-categories__label">Categorías de búsqueda</span>
          <span class="uds-search-categories__icon" aria-hidden="true">keyboard_arrow_down</span>
        </button>
        <div id="${catPanelId}" hidden></div>
      </div>`;

    panels.push(panel);
  });

  container.appendChild(tabList);
  panels.forEach((p) => container.appendChild(p));

  /* ── Button group ── */
  const group = document.createElement('div');
  group.className = 'uds-search-section__button-group';
  group.innerHTML = `
    <button class="uds-button uds-button--primary" type="button">
      <span class="uds-button__content">
        <span class="uds-button__icon" aria-hidden="true">category_search</span>
        <span class="uds-button__label">${iaLabel}</span>
      </span>
    </button>
    <button class="uds-button uds-button--secondary" type="button">
      <span class="uds-button__content">
        <span class="uds-button__label">${advLabel}</span>
      </span>
    </button>`;
  container.appendChild(group);

  section.appendChild(container);

  /* Wire up interactivity */
  init(section);

  return section;
}


/* ─── Meta ───────────────────────────────────── */

export default {
  title: 'Componentes/Search Section',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      values: [
        { name: 'crema', value: '#F7F6F0' },
        { name: 'blanco', value: '#FFFFFF' },
      ],
      default: 'crema',
    },
    docs: {
      description: {
        component:
          'Sección de búsqueda principal de la biblioteca. Incluye tabs para cambiar de modo de búsqueda ' +
          '(i-RUS, GPS Bibliográfico, En el portal), barra de búsqueda, categorías desplegables, ' +
          'y grupo de botones (IA + Búsqueda Avanzada). ' +
          '**Interactivo**: tabs con teclado (←→ Home End), categorías con aria-expanded. ' +
          'Figma: `node-id=1069-9013`. ' +
          'Requiere **Material Symbols Outlined** global.',
      },
    },
  },
  argTypes: {
    activeTab: {
      control: { type: 'select' },
      options: [0, 1, 2],
      mapping: { 0: 0, 1: 1, 2: 2 },
      description: 'Tab activa inicialmente (0=i-RUS, 1=GPS, 2=Portal).',
    },
    placeholder: {
      control: 'text',
      description: 'Texto del placeholder del input de búsqueda.',
    },
    iaLabel: {
      control: 'text',
      description: 'Etiqueta del botón de Asistente IA.',
    },
    advLabel: {
      control: 'text',
      description: 'Etiqueta del botón de Búsqueda Avanzada.',
    },
  },
  render: (args) => makeSection(args),
};


/* ─── Default ────────────────────────────────── */

export const Default = {
  name: 'Default (i-RUS)',
  args: {
    activeTab: 0,
    placeholder: 'Buscar libros, artículos, juegos, mapas...',
    iaLabel: 'Asistente IA',
    advLabel: 'Búsqueda Avanzada',
  },
};


/* ─── Tab: GPS Bibliográfico activo ─────────── */

export const TabGPS = {
  name: 'Tab: GPS Bibliográfico',
  args: {
    activeTab: 1,
  },
};


/* ─── Tab: En el portal activo ──────────────── */

export const TabPortal = {
  name: 'Tab: En el portal',
  args: {
    activeTab: 2,
  },
};


/* ─── Tab switching (interactive demo) ─────── */

export const TabSwitching = {
  name: 'Interactivo — cambio de tab',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Haz clic en cada tab o usa ←→ con el teclado. El panel de búsqueda cambia al tab activo. ' +
          '`data-state="selected"` marca el tab activo; `aria-selected` sincroniza el lector de pantalla.',
      },
    },
  },
  render: () => makeSection({ activeTab: 0 }),
};


/* ─── Modo oscuro ────────────────────────────── */

export const ModoOscuro = {
  name: 'Modo oscuro',
  parameters: {
    backgrounds: { default: 'negro' },
    controls: { disable: true },
    docs: {
      description: {
        story:
          'El panel ya es oscuro por diseño. Con `data-theme="dark"` en el wrapper la página se oscurece ' +
          'pero el panel es idéntico — el contraste interior no cambia.',
      },
    },
  },
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('data-theme', 'dark');
    wrapper.style.cssText = 'background:#191916;min-height:100vh;';
    wrapper.appendChild(makeSection({ activeTab: 0 }));
    return wrapper;
  },
};


/* ─── Accesibilidad ──────────────────────────── */

export const Accesibilidad = {
  name: 'Accesibilidad',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
**Notas de accesibilidad:**

- \`<section aria-label="Búsqueda de recursos">\` anuncia el landmark.
- \`role="tablist"\` + \`role="tab"\` + \`aria-selected\` + \`aria-controls\`: patrón ARIA Tabs completo.
- Navegación por teclado: **Tab** para enfocar la tab activa; **←→** para cambiar entre tabs; **Home/End** para primera/última.
- Cada input tiene un \`<label>\` visually-hidden con contexto del tab activo.
- El botón "Buscar" está dentro de un \`<form role="search">\` — Enter en el input lo activa.
- \`.uds-search-categories\` lleva \`aria-expanded\` + \`aria-controls\` para el panel desplegable.
- Todos los íconos llevan \`aria-hidden="true"\`.
- Contraste tab activo (gris-200 sobre negro-200): ~9:1 ✓
- Contraste input placeholder (blanco 60% sobre negro-200): ~5.6:1 ✓
- \`@media (prefers-reduced-motion)\` desactiva transiciones en tabs y chevron.
        `.trim(),
      },
    },
  },
  render: () => {
    const wrapper = document.createElement('div');

    const note = document.createElement('p');
    note.style.cssText = 'font-size:13px;color:#595959;margin:0 0 1rem;font-family:sans-serif;padding:1rem 1rem 0;';
    note.textContent =
      'Tab → entra a la tab activa → ← → cambia tabs → Tab → entra al input → Tab → botón Buscar → Tab → categorías → Tab → botones IA / Avanzada.';
    wrapper.appendChild(note);

    wrapper.appendChild(makeSection({ activeTab: 0 }));
    return wrapper;
  },
};
