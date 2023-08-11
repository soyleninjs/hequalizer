/*
* pasar a plugin
* configurar parametros
*   - offset
*   - relativeToParent/relativeToViewport
*   - classActive
*   - withHash
*   - hashPrefix
*   - smoothScroll
* Checar que cuando se haga click en un boton no ponga actives en medio del camino
*
*
*
*
*
*
*
*
*
*
*/

window.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('[data-scrollspy-button]');
  const sections = document.querySelectorAll('[data-scrollspy-section]');

  function makeActive(sectionIndex) {
    buttons.forEach(button => {
      if (button.getAttribute('data-scrollspy-button') === sectionIndex) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  function scrollToSection(section, smoothScroll = true, offset = 0) {
    const container = section.parentElement;
    const containerRect = container.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();
    const offsetTop = sectionRect.top - containerRect.top - offset;

    if (smoothScroll) {
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo(0, offsetTop);
    }
  }

  function updateURL(sectionIndex) {
    const section = document.querySelector(`[data-scrollspy-section="${sectionIndex}"]`);
    const newURL = `#section-${sectionIndex}`;
    history.replaceState(null, null, newURL);
  }

  function checkSection() {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const sectionIndex = section.getAttribute('data-scrollspy-section');
      const button = document.querySelector(`[data-scrollspy-button="${sectionIndex}"]`);

      if (rect.top <= 150 && rect.bottom >= 150) {
        makeActive(sectionIndex);
        updateURL(sectionIndex);
      }
    });
  }

  buttons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const sectionIndex = this.getAttribute('data-scrollspy-button');
      const section = document.querySelector(`[data-scrollspy-section="${sectionIndex}"]`);
      scrollToSection(section, true, -20);
      updateURL(sectionIndex);
    });
  });

  window.addEventListener('scroll', checkSection);

  // Desplazarse a la sección correspondiente al cargar la URL
  const currentHash = window.location.hash;
  if (currentHash) {
    const sectionIndex = currentHash.replace('#section-', '');
    const section = document.querySelector(`[data-scrollspy-section="${sectionIndex}"]`);
    if (section) {
      scrollToSection(section, false, -20); // Desplazamiento instantáneo
    }
  }
  checkSection();
});
