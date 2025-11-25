document.addEventListener('DOMContentLoaded', () => {
  // Helper to load a partial into a container
  function loadPartial(id, url) {
    const container = document.getElementById(id);
    if (!container) return;

    fetch(url)
      .then(response => response.text())
      .then(html => {
        container.innerHTML = html;
      })
      .catch(err => {
        console.error('Error loading partial:', url, err);
      });
  }

  loadPartial('site-header', 'partials/header.html');
  loadPartial('site-footer', 'partials/footer.html');
});
