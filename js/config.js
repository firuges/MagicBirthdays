// Configuración central del evento
const eventoConfig = {
    // Información básica del evento
    titulo: "¡Triple Cumpleaños #40!",
    subtitulo: "Stephanie, Caterine y Paola celebran juntas",
    
    // Fecha y hora del evento (formato: YYYY-MM-DD HH:MM)
    fecha: "2025-06-07 20:30",
    
    // Ubicación
    ubicacion: {
        nombre: "Glorieta, Salón de Fiestas",
        direccion: "Dirección completa aquí",
        coordenadas: {
            lat: -34.8788235,
            lng: -56.1677936
        }
    },
    
    // Tema visual (opciones: "neon", "floral", "elegant", "rustic", "kids")
    tema: "kids",
    temas: {
        neon: {
            temaFiestaTitulo: "¡SORPRESA! Fiesta Temática de Neón",
            temaFiestaDescripcion: "¡A los 40 años hemos decidido que es hora de brillar más que nunca! Habrá una decoración que te transportará a los clubes de los 90s (pero con sillas cómodas disponibles para todos, porque sabemos lo que importa 😉).",
            coloresPrincipales: ["#ff00ff", "#00ffff", "#00ff00", "#ffff00", "#9d00ff"]
        },
        elegant: {
            temaFiestaTitulo: "Velada Elegante",
            temaFiestaDescripcion: "Para celebrar nuestros 40 años, hemos preparado una sofisticada velada con música en vivo, exquisita gastronomía y un ambiente de elegancia atemporal.",
            coloresPrincipales: ["#d4af37", "#800020", "#000080", "#36454f"]
        },
        floral: {
            temaFiestaTitulo: "Celebración Primaveral",
            temaFiestaDescripcion: "Nuestra fiesta estará decorada con hermosos arreglos florales, creando un ambiente fresco y acogedor para compartir este momento tan especial.",
            coloresPrincipales: ["#ff80ab", "#d896ff", "#7ecb7e", "#ffe57f", "#80d8ff"]
        },
        rustic: {
            temaFiestaTitulo: "Fiesta Campestre",
            temaFiestaDescripcion: "Celebraremos en un ambiente rústico y acogedor, con decoración natural y calidez hogareña que nos permitirá conectar y disfrutar de momentos inolvidables.",
            coloresPrincipales: ["#8d6e63", "#5d4037", "#d7ccc8", "#f5f5dc", "#e07a5f"]
        },
        kids: {
            temaFiestaTitulo: "¡Gran Celebración Divertida!",
            temaFiestaDescripcion: "Nunca se es demasiado mayor para divertirse como niños. ¡Tendremos juegos, música, sorpresas y mucha diversión!",
            coloresPrincipales: ["#ff5722", "#03a9f4", "#8bc34a", "#ffeb3b", "#e91e63"]
        },
    },
    
    // Cumpleañeros (agregar o quitar según sea necesario)
    cumpleaneros: [
        {
            nombre: "Stephanie",
            apodo: "Steph",
            descripcion: "La compañera fiel que dice que odia salir, pero nunca dice que no a un paseo si hay comida de por medio.",
            edad: 40,
            cuenta: "HSBC Pesos - 8315528"
        },
        {
            nombre: "Caterine",
            apodo: "Cate",
            descripcion: "Siempre ocupada, estudiante de por vida y con más grupos de amigos que tiempo libre.",
            edad: 40,
            cuenta: "BROU Pesos - 001350212-00002"
        },
        {
            nombre: "Paola",
            apodo: "Pao",
            descripcion: "Buscando eternamente la Paz mental y equilibrio, ahora a través del yoga.",
            edad: 40,
            cuenta: "OCA Blue Pesos - 4110785"
        }
    ],
    
    // Frases y mensajes personalizables
    mensajes: {
        bienvenida: "¡Estamos cumpliendo años y queremos celebrarlo contigo!",
        mensajeBroma: "¿Por qué decidimos celebrar nuestro cumpleaños juntas? Porque una sola fiesta = ¡triple diversión y un tercio de los gastos! (La sabiduría financiera llega con la edad 😂)",
        codigoVestimenta: "Para darle un toque especial a la fiesta, nos encantaría que uses algo blanco en tu vestimenta.",
        invitacion: "Únete a nuestra celebración el [fecha] a las [hora] en [ubicacion].",
        confirmacion: "Por favor confirma tu asistencia. ¡Nos encantaría contar contigo!",
        agradecimiento: "¡Gracias por confirmar! Hemos recibido tu respuesta y estamos ansiosos por verte brillar en la fiesta.",
        temaFiestaTitulo: "¡SORPRESA! Fiesta Temática de Neón",
        temaFiestaDescripcion: "¡A los 40 años hemos decidido que es hora de brillar más que nunca! Habrá una decoración que te transportará a los clubes de los 90s (pero con sillas cómodas disponibles para todos, porque sabemos lo que importa 😉)."
    },
    
    // Opciones de formulario
    formulario: {
        limiteSenaleAsistencia: "2025-05-31", // Fecha límite para confirmar (YYYY-MM-DD)
        maxAcompanantes: 2,
        incluirWhatsapp: true, // Habilitar opción de WhatsApp
        incluirDonacion: true, // Habilitar opción de donación/regalo
    },
    
    // Configuración de EmailJS
    emailjs: {
        serviceID: "service_cumple",
        adminTemplateID: "template_cumple40",
        userTemplateID: "template_usuario_cumple",
        userID: "vab4HD8Jp-sZVyOCF"
    },
    
    // Datos de contacto
    contacto: {
        email: "arq.scasertap@gmail.com",
        telefono: "+598 91 234 567"
    },

    carrusel: {
        // Si es false, el carrusel no se mostrará
        mostrar: true,
        
        // Rotación automática
        autoRotacion: true,
        intervalo: 5000, // milisegundos
        
        // Modal de imagen ampliada
        modalImagen: true,
        
        // Imágenes del carrusel (rutas relativas a la raíz del proyecto)
        imagenes: [
            {
                src: 'assets/carousel/imagen1.png',
                caption: 'Hermoso salón donde celebraremos'
            },
            {
                src: 'assets/carousel/imagen2.png',
                caption: 'Momentos inolvidables nos esperan'
            },
            {
                src: 'assets/carousel/imagen3.png',
                caption: 'Celebrando juntos esta fecha especial'
            },
            {
                src: 'assets/carousel/imagen4.png',
                caption: 'No te pierdas esta fiesta única'
            }
        ]
    }
};

// Exportar la configuración
window.eventoConfig = eventoConfig;


