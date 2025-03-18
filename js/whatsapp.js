/**
 * Funcionalidad de WhatsApp para la invitación
 */

// Inicializar la funcionalidad cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Esta funcionalidad se activa en la página de agradecimiento
    if (window.location.pathname.includes('gracias.html')) {
        initWhatsAppButton();
    }
});

/**
 * Inicializa la funcionalidad del botón de WhatsApp en la página de agradecimiento
 */
function initWhatsAppButton() {
    // Verificar si hay parámetros para WhatsApp en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const hasWhatsapp = urlParams.get('whatsapp');
    const phone = urlParams.get('phone');
    const name = urlParams.get('name');
    const guests = urlParams.get('guests');
    const favorite = urlParams.get('favorite');
    
    if (hasWhatsapp === 'true' && phone) {
        // Generar el mensaje personalizado para WhatsApp
        let whatsappMessage = `¡Hola ${name || ''}! 🎉 Aquí está tu invitación para `;
        
        // Usar la información de configuración para personalizar el mensaje
        if (window.eventoConfig) {
            whatsappMessage += eventoConfig.titulo;
            
            // Fecha y hora del evento
            const eventDate = new Date(eventoConfig.fecha);
            const formattedDate = eventDate.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            const formattedTime = eventDate.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
            });
            
            whatsappMessage += `\n\n📅 Fecha: ${formattedDate}, ${formattedTime}`;
            whatsappMessage += `\n📍 Ubicación: ${eventoConfig.ubicacion.nombre}`;
        } else {
            // Texto genérico si no hay configuración disponible
            whatsappMessage += "el evento";
            whatsappMessage += `\n\n📅 No olvides la fecha y hora del evento`;
            whatsappMessage += `\n📍 Te esperamos en la ubicación indicada`;
        }
        
        // Agregar información de acompañantes
        if (guests && guests !== '0') {
            whatsappMessage += `\n👥 Asistirás con: ${guests} acompañante(s)`;
        }
        
        // Agregar homenajeado favorito si aplica
        if (favorite) {
            whatsappMessage += `\n💕 Vienes por: ${favorite}`;
        }
        
        // Mensaje de código de vestimenta
        if (window.eventoConfig && eventoConfig.mensajes.codigoVestimenta) {
            whatsappMessage += `\n\n👕 ${eventoConfig.mensajes.codigoVestimenta}`;
        }
        
        // Agregar enlace al mapa
        if (window.eventoConfig && eventoConfig.ubicacion.coordenadas) {
            const mapUrl = `https://maps.google.com/?q=${eventoConfig.ubicacion.nombre},${eventoConfig.ubicacion.coordenadas.lat},${eventoConfig.ubicacion.coordenadas.lng}`;
            whatsappMessage += `\n\n🔗 Ver ubicación: ${mapUrl}`;
        }
        
        // Cierre del mensaje
        whatsappMessage += `\n\n¡Nos vemos pronto! 🥳`;
        
        // Codificar el mensaje para URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Generar el enlace de WhatsApp
        const whatsappLink = `https://wa.me/${phone}?text=${encodedMessage}`;
        
        // Crear el botón de WhatsApp
        const whatsappButton = document.createElement('a');
        whatsappButton.href = whatsappLink;
        whatsappButton.target = '_blank';
        whatsappButton.className = 'btn whatsapp-btn';
        whatsappButton.style.backgroundColor = '#25D366';
        whatsappButton.style.margin = '15px auto 0';
        whatsappButton.style.display = 'block';
        whatsappButton.innerHTML = '<i class="fab fa-whatsapp" style="margin-right: 8px;"></i> Recibir invitación por WhatsApp';
        
        // Buscar el contenedor para el botón
        const container = document.querySelector('.thank-you-card') || document.body;
        
        // Buscar el botón existente para insertar antes
        const existingButton = container.querySelector('.btn');
        
        if (existingButton) {
            // Insertar el botón de WhatsApp antes del botón existente
            existingButton.parentNode.insertBefore(whatsappButton, existingButton);
        } else {
            // Si no hay botón existente, agregar al final del contenedor
            container.appendChild(whatsappButton);
        }
    }
    
    // Verificar si hay un enlace en localStorage (alternativa)
    const storedWhatsappLink = window.localStorage.getItem('whatsappInvitationLink');
    if (storedWhatsappLink) {
        // Crear el botón usando el enlace almacenado
        const whatsappButton = document.createElement('a');
        whatsappButton.href = storedWhatsappLink;
        whatsappButton.target = '_blank';
        whatsappButton.className = 'btn whatsapp-btn';
        whatsappButton.style.backgroundColor = '#25D366';
        whatsappButton.style.margin = '15px auto 0';
        whatsappButton.style.display = 'block';
        whatsappButton.innerHTML = '<i class="fab fa-whatsapp" style="margin-right: 8px;"></i> Recibir invitación por WhatsApp';
        
        // Buscar el contenedor
        const container = document.querySelector('.thank-you-card') || document.body;
        const existingButton = container.querySelector('.btn');
        
        if (existingButton) {
            existingButton.parentNode.insertBefore(whatsappButton, existingButton);
        } else {
            container.appendChild(whatsappButton);
        }
        
        // Limpiar el localStorage
        window.localStorage.removeItem('whatsappInvitationLink');
    }
}