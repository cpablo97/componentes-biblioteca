export function init(el) {
  initTabs(el);
  initCategories(el);
}

function initTabs(el) {
  const tabList = el.querySelector('[role="tablist"]');
  if (!tabList) return;

  const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
  const panels = tabs.map((tab) => {
    const id = tab.getAttribute('aria-controls');
    return id ? el.querySelector(`#${id}`) : null;
  });

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activateTab(i));
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); activateTab((i + 1) % tabs.length); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); activateTab((i - 1 + tabs.length) % tabs.length); }
      if (e.key === 'Home')       { e.preventDefault(); activateTab(0); }
      if (e.key === 'End')        { e.preventDefault(); activateTab(tabs.length - 1); }
    });
  });

  function activateTab(index) {
    tabs.forEach((t, i) => {
      const isSelected = i === index;
      t.dataset.state = isSelected ? 'selected' : 'default';
      t.setAttribute('aria-selected', String(isSelected));
      t.tabIndex = isSelected ? 0 : -1;
      if (panels[i]) {
        panels[i].hidden = !isSelected;
      }
    });
    tabs[index].focus();
  }
}

function initCategories(el) {
  const toggle = el.querySelector('.uds-search-categories');
  if (!toggle) return;

  const panelId = toggle.getAttribute('aria-controls');
  const panel = panelId ? el.querySelector(`#${panelId}`) : null;

  toggle.setAttribute('aria-expanded', 'false');
  toggle.dataset.state = 'closed';

  toggle.addEventListener('click', () => {
    const isOpen = toggle.dataset.state === 'open';
    toggle.dataset.state = isOpen ? 'closed' : 'open';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    if (panel) panel.hidden = isOpen;
  });
}
