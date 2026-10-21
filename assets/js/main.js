const toggle = document.querySelector('[data-nav-toggle]');
const menu = document.querySelector('[data-nav-menu]');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.dataset.open = String(!expanded);
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.dataset.open = 'false';
    });
  });
}

// Entry context changes navigation only; the public portfolio keeps its identity.
// The generated return links are the allowlist, never visitor-supplied URLs.
const returnBar = document.querySelector('[data-context-return]');
const returnLinks = [...document.querySelectorAll('[data-entry-link]')];
const ownContext = document.body.dataset.entryContext;
const requestedContext = new URLSearchParams(window.location.search).get('from');
const knownContext = (value) => returnLinks.some((link) => link.dataset.entryLink === value);
let entryContext = ownContext || (knownContext(requestedContext) ? requestedContext : null);
let storageAvailable = true;

try {
  if (entryContext) sessionStorage.setItem('entryContext', entryContext);
  else {
    const stored = sessionStorage.getItem('entryContext');
    if (knownContext(stored)) entryContext = stored;
  }
} catch {
  storageAvailable = false;
}

if (returnBar && knownContext(entryContext)) {
  returnLinks.forEach((link) => { link.hidden = link.dataset.entryLink !== entryContext; });
  returnBar.hidden = false;
  if (!storageAvailable) {
    document.querySelectorAll('a[href]').forEach((link) => {
      const url = new URL(link.href, window.location.href);
      if (url.origin === window.location.origin && url.pathname.endsWith('/') && !url.hash && !link.dataset.entryLink) {
        url.searchParams.set('from', entryContext);
        link.href = `${url.pathname}${url.search}`;
      }
    });
  }
}
