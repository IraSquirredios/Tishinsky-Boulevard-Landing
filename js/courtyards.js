const courtyardButtons = document.querySelectorAll('[data-courtyard]');
const courtyardImage = document.querySelector('#courtyard-image');
const courtyardMobileSource = courtyardImage.closest('picture').querySelector('source');

const courtyards = {
  rowan: {
    src: 'images/unique/unique-1.jpg',
    srcset: 'images/unique/unique-1@2x.jpg 2x',
    mobile: 'images/unique/unique-1-mobile.jpg 1x, images/unique/unique-1-mobile@2x.jpg 2x',
    alt: 'Рябиновый двор: озеленение и каменные дорожки у воды',
  },
  maple: {
    src: 'images/unique/maple-courtyard.png',
    alt: 'Иллюстрация кленового двора с деревьями и прудом',
  },
  willow: {
    src: 'images/unique/willow-courtyard.png',
    alt: 'Иллюстрация ивового двора с плакучими ивами у воды',
  },
};

courtyardButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const courtyard = courtyards[button.dataset.courtyard];
    courtyardMobileSource.srcset = courtyard.mobile || courtyard.src;
    courtyardImage.srcset = courtyard.srcset || courtyard.src;
    courtyardImage.src = courtyard.src;
    courtyardImage.alt = courtyard.alt;

    courtyardButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('unique__gallery-button--active', active);
      item.setAttribute('aria-pressed', String(active));
    });
  });
});
