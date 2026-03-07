const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const yearElement = document.getElementById('current-year');

const storageKey = 'ga-theme';
const savedTheme = localStorage.getItem(storageKey);

if (savedTheme === 'dark') {
  root.classList.add('dark');
}

const syncThemeUi = () => {
  const isDark = root.classList.contains('dark');

  if (themeToggle) {
    themeToggle.innerHTML = isDark
      ? '<i class="fa-solid fa-sun"></i><span id="theme-label">Light mode</span>'
      : '<i class="fa-solid fa-moon"></i><span id="theme-label">Dark mode</span>';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute(
      'aria-label',
      isDark ? 'Trocar para light mode' : 'Trocar para dark mode',
    );
  }
};

syncThemeUi();

themeToggle?.addEventListener('click', () => {
  root.classList.toggle('dark');
  const isDark = root.classList.contains('dark');
  localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
  syncThemeUi();
});

menuToggle?.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
