// Procesa los productos cargados en JS/data/productos.js y los organiza para la app
//
(function () {
    // 1) Recuperar los datos desde window.productData (definido en productos.js)
    const rawData = window.productData;

    if (!rawData) {
        console.error("No se encontraron datos en window.productData. Asegúrate de cargar productos.js antes de este script.");
        
        window.productsByCategory = {
            destacados: [],
            recientes: [],
            portatiles: [],
            pc_ensamblados: [],
            sillas: [],
            streaming: [],
            perifericos: [],
            componentes: []
        };
        document.dispatchEvent(new CustomEvent("productDataReady"));
        return;
    }

    // 2) Extraer las listas (ya son arrays de objetos con fecha Date, no hace falta fetch ni normalizar)
    const { portatiles, pcEnsamblados, sillas, streaming, perifericos, componentes } = rawData;

    // 3) Crear un solo array con todo para buscar destacados y recientes
    const productos = [
        ...(portatiles || []), 
        ...(pcEnsamblados || []), 
        ...(sillas || []), 
        ...(streaming || []), 
        ...(perifericos || []), 
        ...(componentes || [])
    ];

    // 4) Filtrar destacados y recientes
    const destacadosIds = [1, 5, 8, 12, 14, 15, 17]; 
    const destacados = destacadosIds
        .map((id) => productos.find((producto) => producto.id === id))
        .filter(Boolean);

    const limiteRecientes = new Date();
    limiteRecientes.setDate(limiteRecientes.getDate() - 7); // Últimos 7 días

    const recientes = productos
        .filter((producto) => producto.fecha >= limiteRecientes)
        .sort((a, b) => b.fecha - a.fecha)
        .slice(0, 5); // Mostrar máximo 5 recientes en la home

    // 5) Exponer todo organizado en window.productsByCategory para que renderCategory.js lo use
    window.productsByCategory = {
        destacados,
        recientes,
        portatiles: portatiles || [],
        pc_ensamblados: pcEnsamblados || [],
        sillas: sillas || [],
        streaming: streaming || [],
        perifericos: perifericos || [],
        componentes: componentes || []
    };

    // 6) Avisar a la aplicación que los datos están listos
    document.dispatchEvent(new CustomEvent("productDataReady"));
})();
