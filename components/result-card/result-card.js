export function init(el) {
  const toggle = el.querySelector('.uds-result-card__btn-toggle');
  if (!toggle) return;

  const descId = el.querySelector('.uds-result-card__description')?.id;
  if (descId) toggle.setAttribute('aria-controls', descId);
  toggle.setAttribute('aria-expanded', 'false');

  toggle.addEventListener('click', () => {
    const isOpen = el.dataset.state === 'open';
    el.dataset.state = isOpen ? 'closed' : 'open';

    const label = toggle.querySelector('.uds-button__label');
    const icon  = toggle.querySelector('.uds-button__icon');
    if (label) label.textContent = isOpen ? 'Ver más'  : 'Ver menos';
    if (icon)  icon.textContent  = isOpen ? 'keyboard_arrow_down' : 'keyboard_arrow_up';

    toggle.setAttribute('aria-expanded', String(!isOpen));
  });
}
