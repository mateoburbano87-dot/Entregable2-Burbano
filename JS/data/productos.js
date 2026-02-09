const portatiles = [
    {
      id: 1,
      nombre: "Asus Rog SCAR 18",
      categoria: "Portátiles",
      precio: 1200,
      descripcion: "Laptop de alto rendimiento",
      imagen: "images/productos/portatiles/Asus_scar18.png",
      fecha: new Date("2026-02-07")
    },
    {
      id: 2,
      nombre: "Portátil Asus VivoBook Core i7 12TH 16GB 1TB TOUCHSCREEN",
      categoria: "Portátiles",
      precio: 800,
      descripcion: "Laptop delgada y ligera",
      imagen: "images/productos/portatiles/Portátil Asus VivoBook Core i7 12TH 16GB 1TB TOUCHSCREEN.webp",
      fecha: new Date("2026-02-07")
    },
    {
      id: 3,
      nombre: "Macbook Pro 16 Pulgadas",
      categoria: "Portátiles",
      precio: 1400,
      descripcion: "Laptop con pantalla 4K",
      imagen: "images/productos/portatiles/Macbook Pro 16 Pulgadas.png",
      fecha: new Date("2026-02-03")
    },
    {
      id: 4,
      nombre: "Portátil HP 14″ Celeron",
      categoria: "Portátiles",
      precio: 500,
      descripcion: "Laptop para uso diario",
      imagen: "images/productos/portatiles/Portátil HP 14″ Celeron.webp",
      fecha: new Date("2026-02-02")
    }
];

const pcEnsamblados = [
    {
      id: 5,
      nombre: "Torre del Caballero",
      categoria: "PC Ensamblados",
      precio: 600,
      descripcion: "PC con luces RGB",
      imagen: "images/productos/PC_ensamblados/Torre-caballero.webp",
      fecha: new Date("2026-01-29")
    },
    {
      id: 6,
      nombre: "Torre del Rey",
      categoria: "PC Ensamblados",
      precio: 1500,
      descripcion: "PC para trabajo",
      imagen: "images/productos/PC_ensamblados/Toore-Rey.png",
      fecha: new Date("2026-02-07")
    }
];

const sillas = [
    {
      id: 7,
      nombre: "Silla Gamer Razer Iskur X",
      categoria: "Sillas",
      precio: 300,
      descripcion: "Silla ergonómica con soporte lumbar",
      imagen: "images/productos/sillas/razer-iskur-v2-x-ergonomic-gaming-chair-black.png",
      fecha: new Date("2026-01-30")
    },
    {
      id: 8,
      nombre: "Silla de Oficina Ergonómica",
      categoria: "Sillas",
      precio: 150,
      descripcion: "Silla ajustable para oficina",
      imagen: "images/productos/sillas/Silla ergonomica-regina.png",
      fecha: new Date("2026-02-07")
    }
];

const streaming = [
    {
      id: 9,
      nombre: "Cámara Web Logitech C920 HD Pro",
      categoria: "Streaming",
      precio: 80,
      descripcion: "Cámara web Full HD para streaming",
      imagen: "images/productos/streaming/Cámara Web Logitech C920 HD Pro.png",
      fecha: new Date("2026-01-28")
    },
    {
      id: 10,
      nombre: "Micrófono Blue Yeti USB",
      categoria: "Streaming",
      precio: 120,
      descripcion: "Micrófono de condensador USB para streaming y podcasting",
      imagen: "images/productos/streaming/Micrófono Blue Yeti USB.png",
      fecha: new Date("2026-01-29")
    }
];

const perifericos = [
    {
      id: 11,
      nombre: "TECLADO LOGITECH PRO X TKL LIGHTSPEED WHITE",
      categoria: "Periféricos",
      subcategoria: "Teclados",
      precio: 100,
      descripcion: "Teclado mecánico RGB",
      imagen: "images/productos/perifericos/teclados/TECLADO LOGITECH PRO X TKL LIGHTSPEED WHITE.png",
      fecha: new Date("2026-01-27")
    },
    {
      id: 12,
      nombre: "Logitech G PRO 2 LIGHTSPEED",
      categoria: "Periféricos",
      subcategoria: "Mouse",
      precio: 50,
      descripcion: "Ratón de alta precisión",
      imagen: "images/productos/perifericos/mouse/logitech_Pro2.png",
      fecha: new Date("2026-01-26")
    },
    {
      id: 13,
      nombre: "DIADEMA LOGITECH ASTRO A50 X LIGHTSPEED WIRELESS + BASE STATION (WHITE)",
      categoria: "Periféricos",
      subcategoria: "Diademas",
      precio: 80,
      descripcion: "Auriculares con sonido envolvente",
      imagen: "images/productos/perifericos/diademas/DIADEMA LOGITECH ASTRO A50 X LIGHTSPEED WIRELESS + BASE STATION (WHITE).png",
      fecha: new Date("2025-12-20")
    },
    {
      id: 14,
      nombre: "ASUS Republic of Gamers Swift OLED PG27AQWP-W 26.5\"",
      categoria: "Periféricos",
      subcategoria: "Monitores",
      precio: 300,
      descripcion: "Monitor OLED de 27 pulgadas con alta tasa de refresco",
      imagen: "images/productos/perifericos/monitores/ASUS Republic of Gamers Swift OLED PG27AQWP-W 26.5.png",
      fecha: new Date("2026-01-23")
    },
    {
        id :15,
        nombre: "HYTE-CNVS-Analog-Eternity",
        categoria: "Periféricos",
        subcategoria: "Mousepad",
        precio: 20,
        descripcion: "Mousepad con diseño personalizado",
        imagen: "images/productos/perifericos/mousepad/HYTE-CNVS-Analog-Eternity.png",
        fecha: new Date("2026-02-07")
    }
];

const componentes = [
    {
      id: 16,
      nombre: "Procesador Intel core Ultra i7-265k",
      categoria: "Componentes",
      subcategoria: "Procesadores",
      precio: 350,
      descripcion: "Procesador de 8 núcleos",
      imagen: "images/productos/componentes/procesadores/Procesador Intel Ultra core i7-265k.png",
      fecha: new Date("2025-12-15")
    },
    {
      id: 17,
      nombre: "TUF GAMING B850-PLUS WIFI",
      categoria: "Componentes",
      subcategoria: "Placa Madre",
      precio: 200,
      descripcion: "Placa madre ATX",
      imagen: "images/productos/componentes/placa_madre/TUF GAMING B850-PLUS WIFI.png",
      fecha: new Date("2026-02-7")
    },
    {
      id: 18,
      nombre: "Memoria RAM Corsair Vengeance RGB 32GB (2 x 16GB)",
      categoria: "Componentes",
      subcategoria: "Memoria RAM",
      precio: 80,
      descripcion: "Memoria de alta velocidad",
      imagen: "images/productos/componentes/RAM/Memoria RAM Corsair Vengeance RGB 32GB (2 x 16GB).png",
      fecha: new Date("2025-12-25")
    },
    {
      id: 19,
      nombre: "Disco SSD M.2 SAMSUNG 1TB 980 PRO",
      categoria: "Componentes",
      subcategoria: "Almacenamiento",
      precio: 120,
      descripcion: "Almacenamiento rápido",
      imagen: "images/productos/componentes/almacenamiento/DISCO-SOLIDO-SSD-M.2-SAMSUNG-1TB-980-PRO-1.webp",
      fecha: new Date("2026-01-29")
    },
    {
      id: 20,
      nombre: "GeForce RTX™ 5060 8G GAMING OC",
      categoria: "Componentes",
      subcategoria: "Tarjetas Gráficas",
      precio: 600,
      descripcion: "GPU de última generación",
      imagen: "images/productos/componentes/tarjeta_grafica/GeForce RTX™ 5060 8G GAMING OC.png",
      fecha: new Date("2026-01-29")
    },
    {
      id: 21,
      nombre: "TUF Gaming 750W Gold",
      categoria: "Componentes",
      subcategoria: "Fuente de Poder",
      precio: 100,
      descripcion: "Fuente modular 80+ Gold",
      imagen: "images/productos/componentes/fuente_poder/TUF Gaming 750W Gold.png",
      fecha: new Date("2025-12-18")
    },
    {
      id: 22,
      nombre: "ASUS ROG Hyperion GR701 Edición EVA-02",
      categoria: "Componentes",
      subcategoria: "Gabinetes",
      precio: 350,
      descripcion: "Gabinete con ventiladores RGB",
      imagen: "images/productos/componentes/chasis/ASUS ROG Hyperion GR701 Edición EVA-02.png",
      fecha: new Date("2026-02-09")
    },
    {
      id: 23,
      nombre: "ASUS ROG RYUO IV 360 ARGB",
      categoria: "Componentes",
      subcategoria: "Refrigeración",
      precio: 150,
      descripcion: "Sistema de refrigeración líquida para CPU",
      imagen: "images/productos/componentes/refrigeracion/ASUS ROG RYUO IV 360 ARGB.png",
      fecha: new Date("2026-01-30")
    }
];

window.productData = {
    portatiles,
    pcEnsamblados,
    sillas,
    streaming,
    perifericos,
    componentes
};
