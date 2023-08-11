/* ============================================================================
  TEMPLATES 
============================================================================== */

const fragment = document.createDocumentFragment();
const templateMovieCard = document.getElementById("template-item-card")
  .content;

/* ============================================================================
  CONTAINERS 
============================================================================== */

const itemsCarousel = document.querySelector("[data-carousel]");
const itemsGridResponsive = document.querySelector("[data-grid-responsive]");

/* ============================================================================
  UTILS 
============================================================================== */
  
const randomNumber = (min, max) => ~~(Math.random() * (max - min + 1)) + min;
const truncate = (str, no_words) => str.split(" ").splice(0,no_words).join(" ");

/* ============================================================================
  RENDERS 
============================================================================== */

const getProducts = async () => {
  const result = await window.fetch(`https://dummyjson.com/products/?skip=${randomNumber(0, 5)}&limit=${randomNumber(15, 20)}`);

  if (result.status === 200) {
    return result.json();
  }

  throw new Error(
    `Fallo la petición!, el resultado regreso: ${result.status} ${result.statusText}`
  );
};

const setProductCard = (product) => {
  templateMovieCard.querySelector(".item-card-info-title").textContent = product.title;
  templateMovieCard.querySelector(".item-card-info-price").textContent = `$${product.price}`;
  templateMovieCard.querySelector(".item-card-info-description").textContent = truncate(product.description, 10);
  templateMovieCard.querySelector(".item-card-info-rating").innerHTML = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <path d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"/>
    </svg> ${product.rating}`;
  templateMovieCard
    .querySelector(".item-card-image")
    .setAttribute("src", product.thumbnail);
  templateMovieCard
    .querySelector(".item-card-image")
    .setAttribute("alt", product.title);

  return templateMovieCard.cloneNode(true);
}

const renderItemsCards = () => {
  getProducts().then((productsData) => {
    productsData.products.forEach((product) => {
      fragment.append(setProductCard(product));
    });

    const cloneForGridResponsive = fragment.cloneNode(true);
    itemsCarousel.append(fragment);
    itemsGridResponsive.append(cloneForGridResponsive);
    window.dispatchEvent(new Event("itemsReady"))
  });

};

/* ============================================================================
  LOAD 
============================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderItemsCards();
});