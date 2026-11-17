const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const yearElement = document.getElementById('current-year');

const storageKey = 'ga-theme';
try {
  root.classList.toggle('dark', localStorage.getItem(storageKey) === 'dark');
} catch {
  // Storage can be unavailable even when scripts are enabled.
}

if (themeToggle) {
  const syncThemeUi = () => {
    const isDark = root.classList.contains('dark');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon', !isDark);
    icon.classList.toggle('fa-sun', isDark);
    themeToggle.setAttribute('aria-pressed', String(isDark));
  };

  syncThemeUi();
  themeToggle.addEventListener('click', () => {
    const isDark = root.classList.toggle('dark');
    syncThemeUi();

    try {
      localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
    } catch {
      // The theme still works for the current page.
    }
  });
}

if (menuToggle && mobileMenu) {
  const setMenuOpen = (isOpen) => {
    mobileMenu.classList.toggle('hidden', !isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  };

  menuToggle.addEventListener('click', () => {
    setMenuOpen(mobileMenu.classList.contains('hidden'));
  });

  document.addEventListener('keydown', (event) => {
    if (
      event.key === 'Escape' &&
      !mobileMenu.classList.contains('hidden') &&
      (event.target === menuToggle || mobileMenu.contains(event.target))
    ) {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      const section = document.getElementById(link.hash.slice(1));
      const heading = section?.querySelector('h2');
      setMenuOpen(false);
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      }
    });
  });
}

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
