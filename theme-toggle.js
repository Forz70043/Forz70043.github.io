function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');

  function updateIcons() {
    const isDark = document.body.classList.contains('dark');
    if (themeToggle) themeToggle.textContent = isDark ? '☀️' : '🌙';
    if (themeToggleMobile) themeToggleMobile.textContent = isDark ? '☀️' : '🌙';
  }

  function toggleTheme() {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    updateIcons();
  }

  if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
  updateIcons();

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
}

initThemeToggle();
