import './card-generic.css';

/* ─── Factory ────────────────────────────────── */

/**
 * @param {object} opts
 * @param {'geometric'|'rectangular'} opts.style
 * @param {string}  opts.tag          - Eyebrow label text; falsy = hide tag
 * @param {string}  opts.title        - Card title (link text)
 * @param {string}  opts.href         - Link destination
 * @param {string}  opts.description  - Body copy text
 */
function makeCard({ style = 'geometric', tag = 'Reserva de Salas', title = 'Salas Biblioteca General', href = '#', description = 'Proporciona acceso a las salas de estudio y trabajo colaborativo ubicadas en las instalaciones de la Biblioteca General.' } = {}) {
  const article = document.createElement('article');
  article.className = `uds-card-generic uds-card-generic--${style}`;

  const body = document.createElement('div');
  body.className = 'uds-card-generic__body';

  const header = document.createElement('div');
  header.className = 'uds-card-generic__header';

  if (tag) {
    const tagEl = document.createElement('span');
    tagEl.className = 'uds-card-generic__tag';
    tagEl.textContent = tag;
    header.appendChild(tagEl);
  }

  const titleEl = document.createElement('h3');
  titleEl.className = 'uds-card-generic__title';

  const link = document.createElement('a');
  link.className = 'uds-card-generic__link';
  link.href = href;
  link.textContent = title;
  titleEl.appendChild(link);
  header.appendChild(titleEl);

  body.appendChild(header);

  if (description) {
    const desc = document.createElement('p');
    desc.className = 'uds-card-generic__description';
    desc.textContent = description;
    body.appendChild(desc);
  }

  article.appendChild(body);
  return article;
}

/* ─── Meta ───────────────────────────────────── */

export default {
  title: 'Componentes/Card Generic',
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'crema' },
    docs: {
      description: {
        component:
          'Tarjeta de contenido general para servicios y recursos de la biblioteca. ' +
          'Dos estilos: **Geometric** (con ilustración decorativa abstracta) y **Rectangular** (compacta, con borde). ' +
          'Ambas animan a fondo amarillo en hover. La propiedad `Show Tag` controla la etiqueta eyebrow. ' +
          'Figma: `node-id=1069-4494`.',
      },
    },
    backgrounds: {
      values: [
        { name: 'crema', value: '#F7F6F0' },
        { name: 'blanco', value: '#FFFFFF' },
        { name: 'negro', value: '#191916' },
      ],
      default: 'crema',
    },
  },
  argTypes: {
    style: {
      control: 'select',
      options: ['geometric', 'rectangular'],
      description: 'Variante visual de la tarjeta.',
    },
    tag: {
      control: 'text',
      description: 'Etiqueta eyebrow (vacío = ocultar).',
    },
    title: {
      control: 'text',
      description: 'Título de la tarjeta (texto del enlace).',
    },
    href: {
      control: 'text',
      description: 'Destino del enlace.',
    },
    description: {
      control: 'text',
      description: 'Texto descriptivo (máx. 3 líneas).',
    },
  },
  render: (args) => makeCard(args),
};


/* ─── Default ────────────────────────────────── */

export const Default = {
  args: {
    style: 'geometric',
    tag: 'Reserva de Salas',
    title: 'Salas Biblioteca General',
    href: '#',
    description:
      'Proporciona acceso a las salas de estudio y trabajo colaborativo ubicadas en las instalaciones de la Biblioteca General.',
  },
};


/* ─── Geometric ──────────────────────────────── */

export const Geometric = {
  name: 'Geometric',
  parameters: {
    docs: {
      description: {
        story:
          'Estilo Geometric: ilustración decorativa en la parte superior (pseudo-elementos CSS), ' +
          'desaparece en hover para revelar el fondo amarillo. Altura total ≈ 328px (80px padding vertical + body).',
      },
    },
  },
  args: {
    style: 'geometric',
    tag: 'Reserva de Salas',
    title: 'Salas Biblioteca General',
    href: '#',
    description:
      'Proporciona acceso a las salas de estudio y trabajo colaborativo ubicadas en las instalaciones de la Biblioteca General.',
  },
};


/* ─── Rectangular ────────────────────────────── */

export const Rectangular = {
  name: 'Rectangular',
  parameters: {
    docs: {
      description: {
        story:
          'Estilo Rectangular: sin ilustración, borde 1px negro (`--uds-color-borde-etiqueta`). ' +
          'Más compacto (~168px). Hover a amarillo 0.15s ease-out.',
      },
    },
  },
  args: {
    style: 'rectangular',
    tag: 'Servicios',
    title: 'Préstamo de Equipos',
    href: '#',
    description:
      'Consulta y solicita equipos disponibles para préstamo: portátiles, cámaras, grabadoras y material multimedia.',
  },
};


/* ─── Without tag ────────────────────────────── */

export const SinEtiqueta = {
  name: 'Sin etiqueta (Show Tag = false)',
  parameters: {
    docs: {
      description: {
        story: 'La propiedad `tag` vacía oculta la etiqueta eyebrow. El título sube y el header se compacta.',
      },
    },
  },
  render: () => {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:1.5rem;flex-wrap:wrap;align-items:flex-start;';

    row.appendChild(
      makeCard({
        style: 'geometric',
        tag: '',
        title: 'Colecciones Digitales',
        href: '#',
        description: 'Accede al catálogo completo de recursos digitales: artículos, libros electrónicos, bases de datos y más.',
      })
    );
    row.appendChild(
      makeCard({
        style: 'rectangular',
        tag: '',
        title: 'Acceso a Bases de Datos',
        href: '#',
        description: 'Conecta con plataformas académicas suscritas por la universidad: JSTOR, Scopus, Web of Science y otras.',
      })
    );

    return row;
  },
};


/* ─── All variants ───────────────────────────── */

export const TodasLasVariantes = {
  name: 'Todas las variantes',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Geometric y Rectangular en la misma vista, con y sin etiqueta.',
      },
    },
  },
  render: () => {
    const grid = document.createElement('div');
    grid.style.cssText = 'display:flex;gap:1.5rem;flex-wrap:wrap;align-items:flex-start;';

    const cards = [
      { style: 'geometric', tag: 'Reserva de Salas', title: 'Salas Biblioteca General', href: '#', description: 'Proporciona acceso a las salas de estudio y trabajo colaborativo ubicadas en las instalaciones de la Biblioteca General.' },
      { style: 'geometric', tag: '', title: 'Colecciones Digitales', href: '#', description: 'Accede al catálogo completo de recursos digitales: artículos, libros electrónicos, bases de datos y más.' },
      { style: 'rectangular', tag: 'Servicios', title: 'Préstamo de Equipos', href: '#', description: 'Consulta y solicita equipos disponibles para préstamo: portátiles, cámaras, grabadoras y material multimedia.' },
      { style: 'rectangular', tag: '', title: 'Acceso a Bases de Datos', href: '#', description: 'Conecta con plataformas académicas suscritas por la universidad: JSTOR, Scopus, Web of Science y otras.' },
    ];

    cards.forEach((opts) => grid.appendChild(makeCard(opts)));
    return grid;
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
          'Las tarjetas en contexto oscuro (`data-theme="dark"`). ' +
          'Los alias de texto y borde se invierten: texto → blanco, borde → gris-600. ' +
          'El hover amarillo permanece igual (no se invierte).',
      },
    },
  },
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('data-theme', 'dark');
    wrapper.style.cssText =
      'display:flex;gap:1.5rem;flex-wrap:wrap;align-items:flex-start;background:#191916;padding:2rem;border-radius:12px;';

    wrapper.appendChild(
      makeCard({
        style: 'geometric',
        tag: 'Reserva de Salas',
        title: 'Salas Biblioteca General',
        href: '#',
        description: 'Proporciona acceso a las salas de estudio y trabajo colaborativo ubicadas en las instalaciones de la Biblioteca General.',
      })
    );
    wrapper.appendChild(
      makeCard({
        style: 'rectangular',
        tag: 'Servicios',
        title: 'Préstamo de Equipos',
        href: '#',
        description: 'Consulta y solicita equipos disponibles para préstamo: portátiles, cámaras, grabadoras y material multimedia.',
      })
    );

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

- \`<article>\` como elemento semántico de la tarjeta.
- Enlace estirado (\`.uds-card-generic__link::after\`) cubre toda la tarjeta — toda la superficie es clickeable y navegable por teclado.
- El texto del título es el nombre accesible del enlace. Si no es único en la página, agregar \`aria-label\` más descriptivo.
- La etiqueta eyebrow (\`.uds-card-generic__tag\`) es decorativa — no lleva rol ni aria adicional.
- Contraste AA:
  - Etiqueta (#191916 sobre crema #F7F6F0) → ~17:1 ✓
  - Título (#1F1E1C sobre crema) → ~17:1 ✓
  - Hover bg (#FFE41E) con título (#1F1E1C) → ~9.5:1 ✓
- \`:focus-visible\` en el \`::after\` del link muestra outline 2px en el borde de la tarjeta.
- \`@media (prefers-reduced-motion)\` desactiva transitions de hover.
        `.trim(),
      },
    },
  },
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:flex;flex-direction:column;gap:1rem;';

    const note = document.createElement('p');
    note.style.cssText = 'font-size:13px;color:#595959;margin:0;font-family:sans-serif;';
    note.textContent = 'Tab para enfocar el enlace de cada tarjeta — el outline aparece en el borde de la card completa:';
    wrapper.appendChild(note);

    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:1.5rem;flex-wrap:wrap;align-items:flex-start;';

    const geoCard = makeCard({
      style: 'geometric',
      tag: 'Reserva de Salas',
      title: 'Salas Biblioteca General',
      href: '#salas',
      description: 'Proporciona acceso a las salas de estudio y trabajo colaborativo ubicadas en las instalaciones de la Biblioteca General.',
    });
    geoCard.querySelector('.uds-card-generic__link').setAttribute(
      'aria-label',
      'Ver salas de la Biblioteca General — Reserva de Salas'
    );
    row.appendChild(geoCard);

    const rectCard = makeCard({
      style: 'rectangular',
      tag: 'Servicios',
      title: 'Préstamo de Equipos',
      href: '#prestamo',
      description: 'Consulta y solicita equipos disponibles para préstamo: portátiles, cámaras, grabadoras y material multimedia.',
    });
    rectCard.querySelector('.uds-card-generic__link').setAttribute(
      'aria-label',
      'Ver servicio de Préstamo de Equipos — Servicios'
    );
    row.appendChild(rectCard);

    wrapper.appendChild(row);
    return wrapper;
  },
};
