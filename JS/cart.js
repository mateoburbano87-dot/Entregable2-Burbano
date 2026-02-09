// Carrito de compras simple usando localStorage y sessionStorage

const CART_KEY = "toman_cart_v1";
const LAST_ADDED_KEY = "toman_last_added";

const cartList = document.querySelector("#cartList");
const cartCount = document.querySelector("#cartCount");
const cartTotal = document.querySelector("#cartTotal");
const cartEmpty = document.querySelector("#cartEmpty");
const cartClear = document.querySelector("#cartClear");
const cartToggle = document.querySelector("#cartToggle");
const cartToggleCount = document.querySelector("#cartToggleCount");
const cartPanel = document.querySelector("#cartPanel");
const cartOverlay = document.querySelector("#cartOverlay");
const cartClose = document.querySelector("#cartClose");
const cartLastAdded = document.querySelector("#cartLastAdded");
const cartItemTemplate = document.querySelector("#cart-item-template");

// 1) Obtener todos los productos disponibles
function getAllProducts() {
    const data = window.productsByCategory || {};
    return [
        ...(data.destacados || []),
        ...(data.recientes || []),
        ...(data.portatiles || []),
        ...(data.pc_ensamblados || []),
        ...(data.perifericos || []),
        ...(data.componentes || [])
    ];
}

// 2) Mapa rápido: id -> producto
let productMap = new Map(getAllProducts().map((p) => [p.id, p]));

function rebuildProductMap() {
    productMap = new Map(getAllProducts().map((p) => [p.id, p]));
}

// 3) Cargar carrito desde localStorage
function loadCart() {
    try {
        const raw = localStorage.getItem(CART_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        return [];
    }
}

// 4) Guardar carrito en localStorage
function saveCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
}

// 5) Agregar producto al carrito
function addToCart(productId) {
    const cart = loadCart();
    const found = cart.find((item) => item.id === productId);

    if (found) {
        found.qty += 1;
    } else {
        cart.push({ id: productId, qty: 1 });
    }

    saveCart(cart);
    saveLastAdded(productId);
    renderCart();
}

// 5.1) Guardar último producto agregado en sessionStorage
function saveLastAdded(productId) {
    const product = productMap.get(productId);
    if (!product) return;
    const payload = {
        id: product.id,
        nombre: product.nombre,
        precio: product.precio
    };
    sessionStorage.setItem(LAST_ADDED_KEY, JSON.stringify(payload));
}

// 5.2) Mostrar último producto agregado en el panel
function renderLastAdded() {
    if (!cartLastAdded) return;
    const raw = sessionStorage.getItem(LAST_ADDED_KEY);
    if (!raw) {
        cartLastAdded.textContent = "";
        return;
    }
    try {
        const data = JSON.parse(raw);
        cartLastAdded.textContent = `Último agregado: ${data.nombre} ($${data.precio})`;
    } catch (error) {
        cartLastAdded.textContent = "";
    }
}

// 6) Renderizar carrito (UI)
function renderCart() {
    const cart = loadCart(); // Carga datos
    let total = 0; // Inicializa total
    let count = 0; // Inicializa contador

    if (cartList) cartList.innerHTML = ""; // Limpia lista visual
    renderLastAdded(); // Muestra último agregado

    if (cart.length === 0) { // Si está vacío
        if (cartList) cartList.innerHTML = ""; // Asegura lista vacía
        if (cartEmpty) cartEmpty.style.display = "block"; // Muestra mensaje
        if (cartTotal) cartTotal.textContent = "$0"; // Muestra cero
        if (cartCount) cartCount.textContent = "0"; // Muestra cero
        if (cartToggleCount) cartToggleCount.textContent = "0"; // Muestra cero
        if (cartClear) cartClear.style.display = "none"; // Oculta limpiar
        return; // Termina render
    } // Fin del if vacío

    if (cartEmpty) cartEmpty.style.display = "none"; // Oculta mensaje vacío
    if (cartClear) cartClear.style.display = "block"; // Muestra botón limpiar

    const fragment = document.createDocumentFragment(); // Optimización

    cart.forEach((item) => { // Recorre items del carrito
        const product = productMap.get(item.id); // Obtiene info completa
        if (!product) return; // Salta irreconocibles

        total += product.precio * item.qty; // Suma al total
        count += item.qty; // Suma cantidad

        if (cartItemTemplate) { // Si hay template
            const clone = cartItemTemplate.content.cloneNode(true); // Clona
            
            const img = clone.querySelector(".cart-item-image");
            const title = clone.querySelector(".cart-item-title");
            const price = clone.querySelector(".cart-item-price");
            const qty = clone.querySelector(".cart-item-qty");
            
            const btnIncrease = clone.querySelector("[data-action='increase']");
            const btnDecrease = clone.querySelector("[data-action='decrease']");
            const btnRemove = clone.querySelector("[data-action='remove']");

            if (img) img.src = product.imagen;
            if (title) title.textContent = product.nombre;
            if (price) price.textContent = `$${product.precio * item.qty}`;
            if (qty) qty.textContent = item.qty;

            if (btnIncrease) btnIncrease.dataset.id = item.id;
            if (btnDecrease) btnDecrease.dataset.id = item.id;
            if (btnRemove) btnRemove.dataset.id = item.id;

            fragment.appendChild(clone); // Agrega al fragmento
        }
    }); // Fin del forEach

    if (cartList) cartList.appendChild(fragment); // Inserta todo
    if (cartTotal) cartTotal.textContent = `$${total}`; // Muestra total
    if (cartCount) cartCount.textContent = count; // Muestra cantidad
    if (cartToggleCount) cartToggleCount.textContent = count; // Muestra cantidad botón
} // Fin de renderCart

// 7) Cambiar cantidad (+1 o -1)
function changeQty(productId, delta) { // Modifica cantidad
    const cart = loadCart(); // Obtiene carrito
    const item = cart.find((i) => i.id === productId); // Busca item
    if (!item) return; // Sale si no encuentra

    item.qty += delta; // Aplica cambio
    if (item.qty <= 0) { // Si baja a cero o menos
        removeFromCart(productId); // Elimina
    } else { // Si sigue positivo
        saveCart(cart); // Guarda cambios
        renderCart(); // Actualiza
    } // Fin del if
} // Fin de changeQty

// 8) Eliminar del carrito
function removeFromCart(productId) { // Elimina completamente
    let cart = loadCart(); // Obtiene carrito
    cart = cart.filter((item) => item.id !== productId); // Filtra excepto el id
    saveCart(cart); // Guarda
    renderCart(); // Actualiza
} // Fin de removeFromCart

// 9) Vaciar carrito
function clearCart() { // Borra todo
    localStorage.removeItem(CART_KEY); // Elimina clave de storage
    sessionStorage.removeItem(LAST_ADDED_KEY); // Elimina último agregado
    renderCart(); // Actualiza
} // Fin de clearCart

// 10) Funciones UI (Panel Lateral)
function openCart() { // Abre sidebar
    document.body.classList.add("cart-open"); // Usa clase en body para manejar estado
} // Fin de openCart

function closeCart() { // Cierra sidebar
    document.body.classList.remove("cart-open"); // Remueve clase del body
} // Fin de closeCart

// 11) Delegación de Eventos (Event Listeners)
document.addEventListener("click", (event) => { // Clicks globales
    const addButton = event.target.closest(".add-to-cart"); // Botón agregar
    if (addButton) { // Si se hizo click en agregar
        const productId = Number(addButton.dataset.productId); // Id del producto
        if (productMap.has(productId)) { // Si existe en el mapa
            addToCart(productId); // Agrega al carrito
            openCart(); // Abre el panel
        } // Fin de validación map
        return; // Sale del handler
    } // Fin de addButton

    const actionButton = event.target.closest("[data-action]"); // Botones de acción
    if (!actionButton) return; // Sale si no hay acción

    const productId = Number(actionButton.dataset.id); // Id del producto
    const action = actionButton.dataset.action; // Acción solicitada

    if (action === "increase") changeQty(productId, 1); // Aumenta cantidad
    if (action === "decrease") changeQty(productId, -1); // Disminuye cantidad
    if (action === "remove") removeFromCart(productId); // Elimina producto
}); // Fin del evento click

if (cartClear) { // Si existe botón vaciar
    cartClear.addEventListener("click", clearCart); // Asigna evento
} // Fin de cartClear

if (cartToggle) { // Si existe botón abrir
    cartToggle.addEventListener("click", openCart); // Asigna evento
} // Fin de cartToggle

if (cartClose) { // Si existe botón cerrar
    cartClose.addEventListener("click", closeCart); // Asigna evento
} // Fin de cartClose

if (cartOverlay) { // Si existe overlay
    cartOverlay.addEventListener("click", closeCart); // Cierra al click
} // Fin de cartOverlay

document.addEventListener("keydown", (event) => { // Escucha teclado
    if (event.key === "Escape") closeCart(); // Cierra con Escape
}); // Fin de keydown

document.addEventListener("productDataReady", () => { // Espera datos de productos
    rebuildProductMap(); // Reconstruye mapa
    renderCart(); // Re-renderiza
}); // Fin de productDataReady

// Render inicial
renderCart(); // Renderiza al cargar
