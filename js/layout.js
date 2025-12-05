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

  // NEW: update footer year after footer is injected
  function updateFooterYear() {
    const yearEl = document.querySelector('#site-footer #year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

    function initFooterExtras() {
    // Update copyright year
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // Back to top
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (!backToTopBtn) return;

    const toggleButton = () => {
      const scrolled = window.scrollY || document.documentElement.scrollTop;
      backToTopBtn.classList.toggle('back-to-top--visible', scrolled > 300);
    };

    toggleButton(); // initial state
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
  
      // Reset window if it's been more than 3s since the first click
      if (!firstClickTime || (now - firstClickTime) > WINDOW_MS) {
        firstClickTime = now;
        clickCount = 0;
      }
  
      clickCount++;
  
      if (clickCount >= REQUIRED_CLICKS) {
        // Reset so it doesn't immediately retrigger
        clickCount = 0;
        firstClickTime = 0;
  
        // Redirect to your snake game page
        window.location.href = '/super-hidden-game-of-snake.html';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
  const shareBtn = document.querySelector('.share-link-btn');
  const shareFeedback = document.getElementById('shareFeedback');

  if (shareBtn && shareFeedback) {
    shareBtn.addEventListener('click', async () => {
      const url = shareBtn.getAttribute('data-share-url');
      if (!url) return;

      try {
        await navigator.clipboard.writeText(url);
        shareFeedback.textContent = 'Link copied to clipboard.';
        setTimeout(() => {
          shareFeedback.textContent = '';
        }, 2500);
      } catch (err) {
        console.error(err);
        shareFeedback.textContent = 'Copy failed – you may need to copy it manually.';
        setTimeout(() => {
          shareFeedback.textContent = '';
        }, 4000);
      }
    });
  }
});

    function setupShortLinkCopy() {
    const pills = document.querySelectorAll('.short-link-pill');

    pills.forEach(pill => {
      const url = pill.dataset.shortUrl;
      const statusEl = pill
        .closest('.page-meta-card')
        ?.querySelector('.short-link-status');

      if (!url) return;

      pill.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(url);
          if (statusEl) {
            statusEl.textContent = 'Short link copied to clipboard.';
          }
          pill.classList.add('short-link-pill--copied');
          setTimeout(() => {
            pill.classList.remove('short-link-pill--copied');
            if (statusEl) statusEl.textContent = '';
          }, 2500);
        } catch (err) {
          console.error('Copy failed', err);
          if (statusEl) {
            statusEl.textContent = 'Copy failed – you may need to copy manually.';
          }
        }
      });
    });
  }


  // Init
  applyDarkTheme();
  
  loadPartial('site-header', '/partials/header.html', () => {
    markActiveNav();
    hydrateEmailLinks();
  });
  
  loadPartial('site-footer', '/partials/footer.html', () => {
    hydrateEmailLinks();
    initFooterEasterEgg();
    initShareButton();
    setupShortLinkCopy();
  });
  
});
