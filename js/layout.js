document.addEventListener('DOMContentLoaded', () => {
  const userPreference = localStorage.getItem('theme');
  const initialTheme = userPreference || 'dark';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = userPreference || (prefersDark ? 'dark' : 'light');

  function applyTheme(theme) {
    document.body.classList.toggle('theme-dark', theme === 'dark');
    document.documentElement.setAttribute('data-bs-theme', theme === 'dark' ? 'dark' : 'light');
  }

  function updateToggle(theme) {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const isDark = theme === 'dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    toggle.querySelector('.theme-toggle__text').textContent = isDark ? 'Light mode' : 'Dark mode';
    toggle.querySelector('.theme-toggle__icon').textContent = isDark ? '☀️' : '🌙';
  }

  function setupThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const isDark = document.body.classList.contains('theme-dark');
      const nextTheme = isDark ? 'light' : 'dark';
      applyTheme(nextTheme);
      updateToggle(nextTheme);
      localStorage.setItem('theme', nextTheme);
    });
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
      if (!pathname) return '/index.html';
      if (pathname.endsWith('/')) return `${pathname}index.html`;
      return pathname.endsWith('/index.html') ? pathname : pathname.replace(/\/$/, '/index.html');
    };

    const currentPath = normalizePath(window.location.pathname);

    links.forEach(link => {
      const target = normalizePath(new URL(link.getAttribute('href'), window.location.href).pathname);
      const isActive = target === currentPath;

      link.classList.toggle('active', isActive);
      link.setAttribute('aria-current', isActive ? 'page' : null);
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

  applyTheme(initialTheme);
  hydrateEmailLinks();

  loadPartial('site-header', 'partials/header.html', () => {
    updateToggle(initialTheme);
    setupThemeToggle();
    markActiveNav();
    hydrateEmailLinks();
  });

  loadPartial('site-footer', 'partials/footer.html', hydrateEmailLinks);
  });

  loadPartial('site-footer', 'partials/footer.html');
});
