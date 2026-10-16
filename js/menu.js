const menuButton = document.querySelector('.header__burger');
const menu = document.querySelector('#site-menu');

function setMenuOpen(isOpen) {
  menu.hidden = !isOpen;
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
}

menuButton.addEventListener('click', () => {
  setMenuOpen(menu.hidden);
});

menu.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link) return;
  setMenuOpen(false);
  // Transfer keyboard focus to the destination section.
  const section = document.querySelector(link.getAttribute('href'));
  section.setAttribute('tabindex', '-1');
  section.focus({ preventScroll: true });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !menu.hidden) {
    setMenuOpen(false);
    menuButton.focus();
  }
});

document.addEventListener('click', (event) => {
  if (!menu.hidden && !menu.contains(event.target) && !menuButton.contains(event.target)) {
    setMenuOpen(false);
  }
});
