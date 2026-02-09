// Formulario de datos de envío: valida campos y guarda en localStorage

// 1) Obtener referencias del formulario y mensaje
const form = document.querySelector("#shippingForm"); // Captura el formulario
const message = document.querySelector("#shippingMessage"); // Captura el mensaje

if (form && message) {
//
    const STORAGE_KEY = "toman_shipping_v1"; // Clave de almacenamiento
//
    // 2) Mostrar mensajes de estado en la interfaz
    function setMessage(text, type) { // Función para pintar mensajes
        message.textContent = text; // Texto del mensaje
        message.classList.remove("form-message--success", "form-message--error"); // Limpia clases
        if (type) message.classList.add(`form-message--${type}`); // Agrega clase según tipo
    } // Fin de setMessage
//
    // 3) Cargar datos guardados (si existen)
    function loadFormData() { // Lee datos guardados
        const raw = localStorage.getItem(STORAGE_KEY); // Obtiene string del storage
        if (!raw) return; // Sale si no hay datos
        try { // Intenta parsear
            const data = JSON.parse(raw); // Convierte a objeto
            Object.keys(data).forEach((key) => { // Recorre propiedades
                const field = form.elements.namedItem(key); // Busca campo por name
                if (field) field.value = data[key]; //
            }); 
        } catch (error) { 
            
        } 
    } 
//
    // 4) Guardar los datos en localStorage al enviar
    form.addEventListener("submit", (event) => { // Evento submit del formulario
        event.preventDefault(); // Evita recarga de página
        if (!form.checkValidity()) { // Valida campos requeridos
            setMessage("Completa los campos obligatorios para continuar.", "error"); // Muestra error
            return; // Detiene el guardado
        } 
//
        const formData = new FormData(form); // Toma datos del formulario
        const data = Object.fromEntries(formData.entries()); // Convierte a objeto
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); // Guarda como JSON
        setMessage("Datos de envío guardados correctamente.", "success"); // Muestra éxito
    }); 
//
    // 5) Inicialización
    loadFormData(); // Carga datos guardados al iniciar
}
