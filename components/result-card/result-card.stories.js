import './result-card.css';
import { init } from './result-card.js';

/* ─── Helpers ────────────────────────────────── */

let _cardCounter = 0;

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
 * @param {'closed'|'open'}  opts.state
 * @param {string[]} opts.leadingTags     — [{style:'special'|'taxonomy', text}]
 * @param {string}   opts.title
 * @param {string[]} opts.subjectTags
 * @param {string}   opts.description
 * @param {string}   opts.warningText
 * @param {string}   opts.infoText
 * @param {string}   opts.ctaHref
 * @param {string}   opts.ctaLabel
 * @param {string}   opts.linkLabel
 */
function makeCard({
  state = 'closed',
  leadingTags = [
    { style: 'special', text: 'Asistencia de IA' },
    { style: 'taxonomy', text: 'Novedad' },
    { style: 'taxonomy', text: 'Destacado' },
  ],
  title = 'AGORA - Research in Agriculture',
  subjectTags = ['Ingeniería Aeroespacial', 'Ingeniería Química', 'Ingeniería Civil', 'Ingeniería Eléctrica', 'Administración'],
  description = 'Proporciona acceso a libros especializados de la editorial McGraw-Hill: manuales, libros de texto, habilidades para los negocios, makerspace, normas y directorios técnicos, estudios de caso, además de vídeos de instrucción, tablas descargables, gráficos interactivos, calculadoras de cálculo. Suministra herramientas para la innovación de productos, reducción de riesgos y aumento de la productividad. AccessEngineering prepara a los estudiantes para resolver problemas del mundo real, facilita la planificación y la entrega del plan de estudios para los docentes y ayuda a los profesionales a encontrar información relevante más rápido, impulsando un mayor ROI.',
  warningText = 'Disponible hasta el 31 de diciembre de 2026. Se recomienda descargar los recursos antes de esa fecha.',
  infoText = 'Para acceder a los recursos suscritos, ingrese a: Módulo Presupuestar y Revista Construdata.',
  ctaHref = '#',
  ctaLabel = 'Ir al recurso',
  linkLabel = 'Ver Tutorial',
} = {}) {
  ensureMaterialSymbols();
  _cardCounter++;
  const id = `uds-rc-${_cardCounter}`;
  const descId = `${id}-desc`;

  const article = document.createElement('article');
  article.className = 'uds-result-card';
  article.dataset.state = state;
  article.id = id;

  /* ── Header ── */
  const header = document.createElement('div');
  header.className = 'uds-result-card__header';

  if (leadingTags.length) {
    const leadingEl = document.createElement('div');
    leadingEl.className = 'uds-result-card__leading-tags';
    leadingTags.forEach(({ style, text }) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `uds-tag uds-tag--${style}`;
      btn.textContent = text;
      leadingEl.appendChild(btn);
    });
    header.appendChild(leadingEl);
  }

  const titleEl = document.createElement('h3');
  titleEl.className = 'uds-result-card__title';
  titleEl.textContent = title;
  header.appendChild(titleEl);

  if (subjectTags.length) {
    const subjectEl = document.createElement('div');
    subjectEl.className = 'uds-result-card__subject-tags';
    subjectEl.setAttribute('role', 'list');
    subjectEl.setAttribute('aria-label', 'Áreas temáticas');
    subjectTags.forEach((text) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'uds-tag uds-tag--taxonomy';
      btn.setAttribute('role', 'listitem');
      btn.textContent = text;
      subjectEl.appendChild(btn);
    });
    header.appendChild(subjectEl);
  }

  article.appendChild(header);

  /* ── Content ── */
  const content = document.createElement('div');
  content.className = 'uds-result-card__content';

  const desc = document.createElement('p');
  desc.className = 'uds-result-card__description';
  desc.id = descId;
  desc.textContent = description;
  content.appendChild(desc);

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'uds-button uds-result-card__btn-toggle';
  toggle.setAttribute('aria-expanded', state === 'open' ? 'true' : 'false');
  toggle.setAttribute('aria-controls', descId);
  toggle.innerHTML = `
    <span class="uds-button__content">
      <span class="uds-button__label">${state === 'open' ? 'Ver menos' : 'Ver más'}</span>
      <span class="uds-button__icon" aria-hidden="true">${state === 'open' ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</span>
    </span>`;
  content.appendChild(toggle);

  article.appendChild(content);

  /* ── Info ── */
  const infoEl = document.createElement('div');
  infoEl.className = 'uds-result-card__info';

  if (warningText) {
    const row = document.createElement('div');
    row.className = 'uds-result-card__info-row';
    row.innerHTML = `
      <span class="uds-result-card__info-icon uds-result-card__info-icon--warning" aria-hidden="true">schedule</span>
      <p class="uds-result-card__info-text uds-result-card__info-text--warning">${warningText}</p>`;
    infoEl.appendChild(row);
  }

  if (infoText) {
    const row = document.createElement('div');
    row.className = 'uds-result-card__info-row';
    row.innerHTML = `
      <span class="uds-result-card__info-icon" aria-hidden="true">info</span>
      <p class="uds-result-card__info-text">${infoText}</p>`;
    infoEl.appendChild(row);
  }

  article.appendChild(infoEl);

  /* ── Divider ── */
  const hr = document.createElement('hr');
  hr.className = 'uds-result-card__divider';
  article.appendChild(hr);

  /* ── Actions ── */
  const actions = document.createElement('div');
  actions.className = 'uds-result-card__actions';

  const cta = document.createElement('a');
  cta.className = 'uds-result-card__btn-cta';
  cta.href = ctaHref;
  cta.setAttribute('aria-label', `${ctaLabel} ${title} (abre en nueva ventana)`);
  cta.target = '_blank';
  cta.rel = 'noopener';
  cta.innerHTML = `<span>${ctaLabel}</span><span class="uds-result-card__btn-icon" aria-hidden="true">arrow_outward</span>`;
  actions.appendChild(cta);

  const linkBtn = document.createElement('button');
  linkBtn.type = 'button';
  linkBtn.className = 'uds-button uds-result-card__btn-link';
  linkBtn.innerHTML = `<span class="uds-button__content"><span class="uds-button__label">${linkLabel}</span></span>`;
  actions.appendChild(linkBtn);

  article.appendChild(actions);

  /* Wire up toggle */
  init(article);

  return article;
}


/* ─── Meta ───────────────────────────────────── */

export default {
  title: 'Componentes/Result Card',
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      values: [
        { name: 'crema', value: '#F7F6F0' },
        { name: 'blanco', value: '#FFFFFF' },
        { name: 'negro', value: '#191916' },
      ],
      default: 'crema',
    },
    docs: {
      description: {
        component:
          'Tarjeta de resultado de búsqueda para recursos de base de datos. ' +
          'Contiene etiquetas de característica (Special + Taxonomy), título, nube de áreas temáticas, ' +
          'descripción colapsable, filas de información contextual, y botones de acción. ' +
          '**Interactivo**: clic en "Ver más/Ver menos" alterna `data-state="closed|open"`. ' +
          'Figma: `node-id=1069-4660`. ' +
          'Requiere **Material Symbols Outlined** global.',
      },
    },
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['closed', 'open'],
      description: 'Estado inicial del acordeón.',
    },
    title: {
      control: 'text',
      description: 'Título del recurso.',
    },
    description: {
      control: 'text',
      description: 'Descripción del recurso (completa; se trunca en estado cerrado).',
    },
    ctaLabel: {
      control: 'text',
      description: 'Texto del botón CTA principal.',
    },
    linkLabel: {
      control: 'text',
      description: 'Texto del botón enlace secundario.',
    },
  },
  render: (args) => makeCard(args),
};


/* ─── Default ────────────────────────────────── */

export const Default = {
  args: {
    state: 'closed',
    title: 'AGORA - Research in Agriculture',
    ctaLabel: 'Ir al recurso',
    linkLabel: 'Ver Tutorial',
  },
};


/* ─── State: Closed ──────────────────────────── */

export const StateClosed = {
  name: 'Estado: Cerrado',
  parameters: {
    docs: {
      description: {
        story:
          'Estado por defecto. Descripción truncada a 3 líneas con `-webkit-line-clamp`. ' +
          'Clic en "Ver más" expande la tarjeta.',
      },
    },
  },
  args: {
    state: 'closed',
    title: 'AGORA - Research in Agriculture',
  },
};


/* ─── State: Open ────────────────────────────── */

export const StateOpen = {
  name: 'Estado: Abierto',
  parameters: {
    docs: {
      description: {
        story:
          'Descripción completamente visible. Botón muestra "Ver menos" + `keyboard_arrow_up`. ' +
          'Clic cierra la tarjeta.',
      },
    },
  },
  args: {
    state: 'open',
    title: 'AccessEngineering — McGraw-Hill',
  },
};


/* ─── Minimal (no warning, no subject tags) ─── */

export const Minimal = {
  name: 'Mínimo (sin etiquetas de aviso)',
  parameters: {
    docs: {
      description: {
        story: 'Variante sin etiquetas de advertencia ni área temática. Solo título + descripción + acciones.',
      },
    },
  },
  render: () =>
    makeCard({
      state: 'closed',
      leadingTags: [{ style: 'taxonomy', text: 'Recurso' }],
      title: 'Scopus — Base de Datos de Citas',
      subjectTags: [],
      description:
        'Base de datos bibliográfica de resúmenes y citas de artículos de revistas científicas. ' +
        'Cubre ciencias, tecnología, medicina, ciencias sociales, artes y humanidades.',
      warningText: '',
      infoText: 'Acceso directo con credenciales institucionales.',
      ctaLabel: 'Ir al recurso',
      linkLabel: 'Ver Tutorial',
    }),
};


/* ─── All states side by side ────────────────── */

export const TodosLosEstados = {
  name: 'Todos los estados',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Cerrado y abierto juntos para comparar el comportamiento del acordeón.',
      },
    },
  },
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:flex;flex-direction:column;gap:2rem;';

    wrapper.appendChild(
      makeCard({
        state: 'closed',
        title: 'AGORA - Research in Agriculture',
      })
    );
    wrapper.appendChild(
      makeCard({
        state: 'open',
        title: 'AccessEngineering — McGraw-Hill',
        leadingTags: [
          { style: 'special', text: 'Asistencia de IA' },
          { style: 'taxonomy', text: 'Novedad' },
        ],
        subjectTags: ['Ingeniería Civil', 'Ingeniería Mecánica', 'Administración'],
      })
    );

    return wrapper;
  },
};


/* ─── Dark mode ──────────────────────────────── */

export const ModoOscuro = {
  name: 'Modo oscuro',
  parameters: {
    backgrounds: { default: 'negro' },
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`data-theme="dark"` en el contenedor: la tarjeta cambia a fondo oscuro, ' +
          'elimina la sombra y añade borde sutil. Tokens de texto se invierten vía alias.',
      },
    },
  },
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('data-theme', 'dark');
    wrapper.style.cssText =
      'background:#191916;padding:2rem;border-radius:12px;display:flex;flex-direction:column;gap:2rem;';

    wrapper.appendChild(makeCard({ state: 'closed', title: 'AGORA - Research in Agriculture' }));

    return wrapper;
  },
};


/* ─── Accessibility ──────────────────────────── */

export const Accesibilidad = {
  name: 'Accesibilidad',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `
**Notas de accesibilidad:**

- \`<article>\` es el elemento raíz semántico.
- El botón toggle lleva \`aria-expanded="false|true"\` y \`aria-controls="[desc-id]"\` — lectores de pantalla anuncian el cambio de estado.
- Las etiquetas de área temática usan \`role="list"\` + \`role="listitem"\` para semántica de lista de chips.
- El botón CTA es un \`<a>\` con \`aria-label\` que incluye el título del recurso — evita "Ir al recurso ×N" ambiguos.
- Los íconos llevan \`aria-hidden="true"\` — solo son decorativos.
- Contraste AA:
  - Título (#1F1E1C sobre blanco) → ~17:1 ✓
  - Descripción (#1F1E1C sobre blanco) → ~17:1 ✓
  - Texto de toggle (#4D4D4C sobre blanco) → ~8.6:1 ✓
  - Texto de aviso (#803300 sobre blanco) → ~6.1:1 ✓
  - CTA (#4D4D4C sobre crema) → ~8.2:1 ✓
- \`@media (prefers-reduced-motion)\` desactiva la transición del ícono chevron.
        `.trim(),
      },
    },
  },
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:flex;flex-direction:column;gap:1rem;';

    const note = document.createElement('p');
    note.style.cssText = 'font-size:13px;color:#595959;margin:0;font-family:sans-serif;';
    note.textContent =
      'Tab para recorrer: etiquetas → botón toggle → botón CTA → botón enlace. ' +
      'El toggle anuncia aria-expanded al expandir/colapsar.';
    wrapper.appendChild(note);

    wrapper.appendChild(makeCard({ state: 'closed', title: 'AGORA - Research in Agriculture' }));

    return wrapper;
  },
};
