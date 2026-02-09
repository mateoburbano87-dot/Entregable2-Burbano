// Renderiza los productos recientes en la página principal

const recentGrid = document.querySelector(".recent-grid");
const recentTemplate = document.querySelector("#featured-card-template");

function renderRecent() {
    const products = window.productsByCategory?.recientes || [];

    if (!recentGrid || !recentTemplate || products.length === 0) {
        return;
    }

    const fragment = document.createDocumentFragment();

    products.forEach((product) => {
        const card = recentTemplate.content.cloneNode(true);
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

    recentGrid.appendChild(fragment);
}

if (window.productsByCategory?.recientes?.length) {
    renderRecent();
} else {
    document.addEventListener("productDataReady", renderRecent, { once: true });
}
