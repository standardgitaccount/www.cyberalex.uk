document.addEventListener('DOMContentLoaded', () => {
  // Always use dark theme
  function applyDarkTheme() {
    document.body.classList.add('theme-dark');
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  }

  function hydrateEmailLinks() {
    const links = document.querySelectorAll('.email-link[data-user][data-domain]');
    links.forEach(link => {
      const user = link.dataset.user;
      const domain = link.dataset.domain;

      if (!user || !domain) return;

      const decodedUser = atob(user);
      const decodedDomain = atob(domain);
      const address = `${decodedUser}@${decodedDomain}`;

      link.href = `mailto:${address}`;
      link.textContent = address;
      link.removeAttribute('aria-label');
    });
  }

  function markActiveNav() {
    const links = document.querySelectorAll('header nav a[data-page]');
    if (!links.length) return;

    const normalizePath = (pathname) => {
      if (!pathname || pathname === '/') return '/index.html';
      if (pathname.endsWith('/')) return `${pathname}index.html`;
      return pathname.endsWith('/index.html') ? pathname : pathname.replace(/\/$/, '/index.html');
    };

    const currentPath = normalizePath(window.location.pathname);

    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      const target = normalizePath(new URL(href, window.location.href).pathname);
      const isActive = target === currentPath;

      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  // Helper to load a partial into a container
  function loadPartial(id, url, onLoad) {
    const container = document.getElementById(id);
    if (!container) return Promise.resolve();

    return fetch(url)
      .then(response => response.text())
      .then(html => {
        container.innerHTML = html;
        if (typeof onLoad === 'function') onLoad();
      })
      .catch(err => {
        console.error('Error loading partial:', url, err);
      });
  }

  // Init
  applyDarkTheme();
  hydrateEmailLinks();

  loadPartial('site-header', 'partials/header.html', () => {
    markActiveNav();
    hydrateEmailLinks();
  });

  loadPartial('site-footer', 'partials/footer.html', hydrateEmailLinks);
});
