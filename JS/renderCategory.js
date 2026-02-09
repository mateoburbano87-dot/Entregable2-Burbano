// Renderiza productos por categoría en secciones específicas

const categoryContainers = document.querySelectorAll("[data-products-category]"); // Selecciona todos los contenedores que tengan el atributo 'data-products-category'
const categoryTemplate = document.querySelector("#category-card-template"); // Selecciona la plantilla HTML para las tarjetas de productos

// Resuelve la ruta de la imagen dependiendo de la ubicación actual
function resolveImagePath(rutaImagen) {
    if (!rutaImagen) return rutaImagen;

    if (rutaImagen.includes("http")) {
        return rutaImagen;
    }

    const rutaActual = window.location.pathname;

    if (rutaActual.includes("/componentes/") || rutaActual.includes("/perifericos/")) {
        return "../../" + rutaImagen;
    }

    if (rutaActual.includes("/pages/")) {
        return "../" + rutaImagen;
    }

    return rutaImagen;
}

function renderCategoryContainer(container) { // Función para renderizar productos en un contenedor específico
    const categoryKey = container.dataset.productsCategory; // Obtiene la categoría del atributo data
    const filterValue = container.dataset.productsFilter; // Obtiene el filtro opcional del atributo data
    const subcategoryValue = container.dataset.productsSubcategory; // Obtiene la subcategoría opcional del atributo data
    const cardClass = container.dataset.cardClass; // Obtiene clases CSS extra opcionales para la tarjeta
    let products = window.productsByCategory?.[categoryKey] || []; // Intenta obtener los productos de esa categoría desde la variable global

    // Si no hay productos en esa categoría, pero es una categoría válida y existen 'componentes'
    // Intenta buscar en 'componentes' usando la categoría como nombre de subcategoría (fallback)
    if (!products.length && categoryKey && window.productsByCategory?.componentes) {
        const fallbackKey = categoryKey.toLowerCase(); // Convierte la categoría a minúsculas para comparar
        products = window.productsByCategory.componentes.filter((product) =>
            String(product.subcategoria || "").toLowerCase() === fallbackKey // Filtra componentes cuya subcategoría coincida
        );
    }

    if (filterValue) { // Si existe un valor de filtro
        const filterLower = filterValue.toLowerCase(); // Lo convierte a minúsculas
        products = products.filter((product) => // Filtra los productos
            String(product.categoria || "").toLowerCase() === filterLower // Compara la categoría del producto con el filtro
        );
    }

    if (subcategoryValue) { // Si existe un valor de subcategoría
        const subcategoryLower = subcategoryValue.toLowerCase(); // Lo convierte a minúsculas
        products = products.filter((product) => // Filtra los productos
            String(product.subcategoria || "").toLowerCase() === subcategoryLower // Compara la subcategoría del producto
        );
    }

    if (!categoryTemplate || products.length === 0) { // Si no hay plantilla o no se encontraron productos, termina
        return;
    }

    const fragment = document.createDocumentFragment(); // Crea un fragmento de documento para insertar todo de una vez (mejor rendimiento)

    products.forEach((product) => { // Itera sobre cada producto encontrado
        const card = categoryTemplate.content.cloneNode(true); // Clona el contenido de la plantilla
        const cardRoot = card.querySelector(".featured-card, .category-card"); // Busca el elemento raíz de la tarjeta
        const img = card.querySelector(".featured-image, .category-image"); // Busca la imagen
        const name = card.querySelector(".featured-name, .category-name"); // Busca el elemento del nombre
        const desc = card.querySelector(".featured-desc, .category-desc"); // Busca el elemento de la descripción
        const price = card.querySelector(".featured-price, .category-price"); // Busca el elemento del precio
        const button = card.querySelector(".add-to-cart"); // Busca el botón de agregar al carrito

        if (cardRoot && cardClass) { // Si hay elemento raíz y clases extra
            cardClass.split(" ").filter(Boolean).forEach((cls) => cardRoot.classList.add(cls)); // Agrega cada clase extra al elemento raíz
        }

        if (img) { // Si existe el elemento de imagen
            img.src = resolveImagePath(product.imagen); // Asigna la ruta resuelta de la imagen
            img.alt = product.nombre; // Asigna el texto alternativo
        }
        if (name) name.textContent = product.nombre; // Asigna el nombre del producto
        if (desc) desc.textContent = product.descripcion; // Asigna la descripción
        if (price) price.textContent = `$${product.precio}`; // Asigna el precio formateado
        if (button) button.dataset.productId = product.id; // Guarda el ID del producto en el botón (para el carrito)

        fragment.appendChild(card); // Agrega la tarjeta clonada al fragmento
    });

    container.appendChild(fragment); // Inserta el fragmento con todas las tarjetas en el contenedor
}

function renderAllCategories() { // Función para renderizar todos los contenedores encontrados
    categoryContainers.forEach(renderCategoryContainer); // Ejecuta renderCategoryContainer para cada contenedor
}

// Comprueba si los datos de productos ya están listos en la variable global
if (window.productsByCategory && Object.keys(window.productsByCategory).length) {
    renderAllCategories(); // Si ya están listos, renderiza inmediatamente
} else {
    // Si no, escucha el evento personalizado 'productDataReady' para renderizar cuando estén listos
    document.addEventListener("productDataReady", renderAllCategories, { once: true });
}
