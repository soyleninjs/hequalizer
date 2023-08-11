
/* ----------- Ejemplo ----------- */

/* Carousel */
window.addEventListener("itemsReady", () => {
  const swiper = new Swiper('.swiper', {
    loop: true,
    spaceBetween: 10,
    pagination: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1: {
        slidesPerView: 1,
      },
      501: {
        slidesPerView: 2,
      },
      681: {
        slidesPerView: 3,
      },    }
  });

  const carouselTitles = document.querySelectorAll("[data-carousel] .item-card-info-title");
  const carouselDescription = document.querySelectorAll("[data-carousel] .item-card-info-description");
  const carouselRating = document.querySelectorAll("[data-carousel] .item-card-info-rating");
  const carouselPrice = document.querySelectorAll("[data-carousel] .item-card-info-price");

  window.setTimeout(() => {
    new Hequalizer(carouselTitles, {});
    new Hequalizer(carouselDescription, {});
    new Hequalizer(carouselRating, {});
    new Hequalizer(carouselPrice, {});
  }, 100)

  /* Grid Responsive */
  const gridResponsiveOptions = {
    columns: 3,
    responsive: {
      680: {
        columns: 2,
      },
      500: {
        columns: 1,
        resizeObserver: false,
      }
    }
  };
  const gridResponsiveTitles = document.querySelectorAll("[data-grid-responsive] .item-card-info-title");
  const gridResponsiveDescription = document.querySelectorAll("[data-grid-responsive] .item-card-info-description");
  const gridResponsiveRating = document.querySelectorAll("[data-grid-responsive] .item-card-info-rating");
  const gridResponsivePrice = document.querySelectorAll("[data-grid-responsive] .item-card-info-price");
  new Hequalizer(gridResponsiveTitles, gridResponsiveOptions);
  new Hequalizer(gridResponsiveDescription, gridResponsiveOptions);
  new Hequalizer(gridResponsiveRating, gridResponsiveOptions);
  new Hequalizer(gridResponsivePrice, gridResponsiveOptions);
})

/* ----------- End Ejemplo ----------- */


const $buttonThemeMode = document.querySelector('[data-button-theme-mode]');
let lightMode = JSON.parse(localStorage.getItem("hequalizer-light-mode")) || false

if (lightMode) {
  $buttonThemeMode.classList.toggle("button-light-mode")
  document.body.classList.toggle('light-mode');
}

$buttonThemeMode.addEventListener('click', () => {
  lightMode = JSON.parse(localStorage.getItem("hequalizer-light-mode"))
  localStorage.setItem("hequalizer-light-mode", !lightMode);
  
  $buttonThemeMode.classList.toggle("button-light-mode")
  document.body.classList.toggle('light-mode');
});