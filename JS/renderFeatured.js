// Renderiza los productos destacados en la página principal

const featuredGrid = document.querySelector(".featured-grid");
const featuredTemplate = document.querySelector("#featured-card-template");

function renderFeatured() {
    const products = window.productsByCategory?.destacados || [];

    if (!featuredGrid || !featuredTemplate || products.length === 0) {
        return;
    }

    const fragment = document.createDocumentFragment();

    products.forEach((product) => {
        const card = featuredTemplate.content.cloneNode(true);
        const img = card.querySelector(".featured-image");
        const name = card.querySelector(".featured-name");
        const desc = card.querySelector(".featured-desc");
        const price = card.querySelector(".featured-price");
        const button = card.querySelector(".add-to-cart");

        img.src = product.imagen;
        img.alt = product.nombre;
        name.textContent = product.nombre;
        desc.textContent = product.descripcion;
        if (price) price.textContent = `$${product.precio}`;
        if (button) button.dataset.productId = product.id;

        fragment.appendChild(card);
    });

    featuredGrid.appendChild(fragment);
}

if (window.productsByCategory?.destacados?.length) {
    renderFeatured();
} else {
    document.addEventListener("productDataReady", renderFeatured, { once: true });
}
