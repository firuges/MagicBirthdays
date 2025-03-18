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
    tema: "elegant",
    
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
        codigoVestimenta: "Para darle un toque especial a la fiesta, nos encantaría que uses algo blanco en tu vestimenta.",
        invitacion: "Únete a nuestra celebración el [fecha] a las [hora] en [ubicacion].",
        confirmacion: "Por favor confirma tu asistencia. ¡Nos encantaría contar contigo!",
        agradecimiento: "¡Gracias por confirmar! Hemos recibido tu respuesta y estamos ansiosos por verte brillar en la fiesta."
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
    }
};

// Exportar la configuración
window.eventoConfig = eventoConfig;


