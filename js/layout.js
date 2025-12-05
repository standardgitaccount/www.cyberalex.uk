document.addEventListener('DOMContentLoaded', () => {
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

  function initFooterExtras() {
    // Copyright year
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // Back-to-top button
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (!backToTopBtn) return;

    const toggleButton = () => {
      const scrolled = window.scrollY || document.documentElement.scrollTop;
      backToTopBtn.classList.toggle('back-to-top--visible', scrolled > 300);
    };

    toggleButton();
    window.addEventListener('scroll', toggleButton);

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function initFooterEasterEgg() {
    const logo = document.querySelector('.footer-logo-img');
    if (!logo) return;

    let clickCount = 0;
    let firstClickTime = 0;
    const WINDOW_MS = 3000;
    const REQUIRED_CLICKS = 5;

    logo.addEventListener('click', () => {
      const now = performance.now();

      if (!firstClickTime || (now - firstClickTime) > WINDOW_MS) {
        firstClickTime = now;
        clickCount = 0;
      }

      clickCount++;

      if (clickCount >= REQUIRED_CLICKS) {
        clickCount = 0;
        firstClickTime = 0;
        window.location.href = '/super-hidden-game-of-snake.html';
      }
    });
  }

  function initShareCopy() {
    const buttons = document.querySelectorAll('.share-url-main');

    buttons.forEach(btn => {
      const explicitUrl = btn.getAttribute('data-share-url');
      const url = explicitUrl || btn.textContent.trim();
      const textSpan = btn.querySelector('.share-url-text') || btn;

      if (!url) return;

      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(url);
          const originalText = textSpan.textContent;
          textSpan.textContent = 'Copied to clipboard';
          btn.classList.add('copied');

          setTimeout(() => {
            textSpan.textContent = originalText;
            btn.classList.remove('copied');
          }, 2200);
        } catch (err) {
          console.error('Copy failed', err);
        }
      });
    });
  }

  // ---- INIT ----
  applyDarkTheme();

  // Header partial
  loadPartial('site-header', '/partials/header.html', () => {
    markActiveNav();
    hydrateEmailLinks();
  });

  // Footer partial
  loadPartial('site-footer', '/partials/footer.html', () => {
    hydrateEmailLinks();
    initFooterExtras();
    initFooterEasterEgg();
  });

  // Share cards live in main content (already parsed)
  initShareCopy();
});
