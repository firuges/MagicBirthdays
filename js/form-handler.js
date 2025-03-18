/**
 * Manejo del formulario de invitación
 */

// Cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el formulario
    initializeForm();
});

/**
 * Inicializa el formulario y sus eventos
 */
function initializeForm() {
    const form = document.getElementById('invitation-form');
    
    if (!form) return;
    
    // Cuando se envíe el formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Mostrar indicador de carga
        document.getElementById('loading-indicator').style.display = 'block';
        
        // Deshabilitar el botón de envío para evitar múltiples envíos
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) submitButton.disabled = true;
        
        // Recopilar datos del formulario
        const formData = new FormData(this);
        const formObject = {};
        
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Agregar fecha y hora actual
        const now = new Date();
        const formattedDate = now.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        formObject.date_time = formattedDate;
        
        // Preparar datos para la plantilla según si es uno o varios homenajeados
        if (eventoConfig.cumpleaneros.length > 1) {
            // Si hay múltiples homenajeados, obtener el seleccionado
            const selectedName = formObject['favorite-celebrant'];
            formObject.favorite_celebrant = selectedName || eventoConfig.cumpleaneros[0].nombre;
            
            // Buscar la cuenta correspondiente
            const selectedCelebrant = eventoConfig.cumpleaneros.find(c => c.nombre === formObject.favorite_celebrant);
            if (selectedCelebrant) {
                formObject.account_number = selectedCelebrant.cuenta;
            }
        } else if (eventoConfig.cumpleaneros.length === 1) {
            // Si hay solo un homenajeado, usar directamente sus datos
            formObject.favorite_celebrant = eventoConfig.cumpleaneros[0].nombre;
            formObject.account_number = eventoConfig.cumpleaneros[0].cuenta;
        }
        
        // Formatear estado de asistencia
        let attendanceClass = '';
        let attendanceText = '';

        if (formObject.attendance === 'yes') {
            attendanceClass = 'attendance-yes';
            attendanceText = '¡Asistirá!';
        } else if (formObject.attendance === 'maybe') {
            attendanceClass = 'attendance-maybe';
            attendanceText = 'Tal vez asista';
        } else if (formObject.attendance === 'no') {
            attendanceClass = 'attendance-no';
            attendanceText = 'No podrá asistir';
        }
        
        formObject.attendance_text = attendanceText;
        formObject.attendance_class = attendanceClass;
        
        // Determinar destinatario de email (para EmailJS)
        let recipientEmail = "";
        
        if (eventoConfig.cumpleaneros.length > 1 && formObject.favorite_celebrant) {
            // Si hay varios homenajeados, buscar el email del seleccionado
            const selectedCelebrant = eventoConfig.cumpleaneros.find(c => c.nombre === formObject.favorite_celebrant);
            if (selectedCelebrant && selectedCelebrant.email) {
                recipientEmail = selectedCelebrant.email;
            } else {
                // Si no tiene email, usar el de contacto general
                recipientEmail = eventoConfig.contacto.email;
            }
        } else {
            // Si hay un solo homenajeado o no se seleccionó ninguno
            recipientEmail = eventoConfig.contacto.email;
        }
        
        // Dirección para el mapa
        formObject.map_address = encodeURIComponent(`${eventoConfig.ubicacion.nombre}, ${eventoConfig.ubicacion.coordenadas.lat},${eventoConfig.ubicacion.coordenadas.lng}`);
        
        // Parámetros para EmailJS (admin)
        const adminTemplateParams = {
            name: formObject.name || 'No especificado',
            phone: formObject.phone || 'No especificado',
            email: formObject.email || 'No proporcionado',
            attendance: formObject.attendance_text,
            attendance_class: formObject.attendance_class,
            guests: formObject.guests || '0',
            message: formObject.message || 'Sin mensaje',
            favorite_celebrant: formObject.favorite_celebrant,
            account_number: formObject.account_number,
            date_time: formObject.date_time,
            to_name: formObject.favorite_celebrant, // Nombre del destinatario
            to_email: recipientEmail, // Email del destinatario
            reply_to: formObject.email || 'no-reply@example.com' // Email de respuesta
        };
        
        // Enviar email al administrador/homenajeado
        emailjs.send(
            eventoConfig.emailjs.serviceID, 
            eventoConfig.emailjs.adminTemplateID, 
            adminTemplateParams
        )
        .then(function(response) {
            console.log('Admin notification sent!', response.status);
            
            // Si el usuario proporcionó un email, enviarle una confirmación
            if (formObject.email && formObject.email.trim() !== '') {
                // Evento formateado para el email
                const eventDate = new Date(eventoConfig.fecha);
                const eventDateFormatted = eventDate.toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                const eventTimeFormatted = eventDate.toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit'
                });
                
                // Construir nombres de homenajeados
                let celebrantsNames = "";
                if (eventoConfig.cumpleaneros.length === 1) {
                    celebrantsNames = eventoConfig.cumpleaneros[0].nombre;
                } else if (eventoConfig.cumpleaneros.length === 2) {
                    celebrantsNames = `${eventoConfig.cumpleaneros[0].nombre} y ${eventoConfig.cumpleaneros[1].nombre}`;
                } else {
                    const allButLast = eventoConfig.cumpleaneros.slice(0, -1).map(c => c.nombre).join(', ');
                    const last = eventoConfig.cumpleaneros[eventoConfig.cumpleaneros.length - 1].nombre;
                    celebrantsNames = `${allButLast} y ${last}`;
                }
                
                // Parámetros para EmailJS (usuario)
                const userTemplateParams = {
                    name: formObject.name || 'Invitado',
                    birthday_person: formObject.favorite_celebrant || celebrantsNames,
                    celebrants_names: celebrantsNames,
                    event_date: `${eventDateFormatted}, ${eventTimeFormatted}`,
                    event_location: eventoConfig.ubicacion.nombre,
                    phone: formObject.phone || 'No especificado',
                    email: formObject.email,
                    attendance: formObject.attendance === 'yes' ? 'Confirmada' :
                        (formObject.attendance === 'maybe' ? 'Posible asistencia' : 'No podrá asistir'),
                    guests: formObject.guests || '0',
                    message: formObject.message || 'Sin mensaje',
                    host_name: celebrantsNames,
                    favorite_celebrant: formObject.favorite_celebrant || '',
                    account_number: formObject.account_number || '',
                    map_address: formObject.map_address,
                    to_name: formObject.name,
                    to_email: formObject.email,
                    from_name: celebrantsNames,
                    reply_to: recipientEmail
                };
                
                // Enviar email al usuario
                return emailjs.send(
                    eventoConfig.emailjs.serviceID, 
                    eventoConfig.emailjs.userTemplateID, 
                    userTemplateParams
                );
            }
            
            return Promise.resolve(); // No enviar email al usuario
        })
        .then(function(userResponse) {
            if (userResponse) {
                console.log('User confirmation sent!', userResponse.status);
            }
            
            // Ocultar indicador de carga
            document.getElementById('loading-indicator').style.display = 'none';
            
            // Verificar si el usuario quiere recibir WhatsApp
            const wantsWhatsapp = formObject['whatsapp-opt'] ? true : false;
            
            if (wantsWhatsapp && formObject.phone && formObject.phone.trim() !== '') {
                // Si optó por WhatsApp y proporcionó un teléfono
                const formattedPhone = formatPhoneNumber(formObject.phone);
                
                // Redireccionar a la página de agradecimiento con parámetros para WhatsApp
                setTimeout(() => {
                    const redirectUrl = `gracias.html?whatsapp=true&phone=${encodeURIComponent(formattedPhone)}&name=${encodeURIComponent(formObject.name || '')}&guests=${encodeURIComponent(formObject.guests || '0')}&favorite=${encodeURIComponent(formObject.favorite_celebrant || '')}`;
                    window.location.href = redirectUrl;
                }, 1000);
            } else {
                // Mostrar mensaje de éxito temporalmente
                const successMsg = document.getElementById('success-message');
                successMsg.textContent = eventoConfig.mensajes.agradecimiento;
                successMsg.style.display = 'block';
                
                // Redireccionar a la página de agradecimiento
                setTimeout(() => {
                    window.location.href = 'gracias.html';
                }, 2000);
            }
        })
        .catch(function(error) {
            console.error('Error sending form:', error);
            
            // Ocultar indicador de carga
            document.getElementById('loading-indicator').style.display = 'none';
            
            // Mostrar mensaje de error
            const errorMsg = document.getElementById('error-message');
            errorMsg.textContent = 'Error al enviar el formulario: ' + (error.text || 'Verifica tus datos');
            errorMsg.style.display = 'block';
            
            // Re-habilitar el botón de envío
            if (submitButton) submitButton.disabled = false;
            
            // Ocultar mensaje de error después de 5 segundos
            setTimeout(() => {
                errorMsg.style.display = 'none';
            }, 5000);
        });
    });
}

/**
 * Formatea un número de teléfono para uso internacional
 * @param {string} phoneNumber - Número de teléfono a formatear
 * @returns {string} - Número formateado para uso internacional
 */
function formatPhoneNumber(phoneNumber) {
    // Eliminar todos los caracteres no numéricos
    let cleaned = phoneNumber.replace(/\D/g, '');
    
    // Verificar si ya tiene prefijo internacional
    if (cleaned.startsWith('598')) {
        return cleaned;
    }
    
    // Si el número comienza con 0, eliminarlo
    if (cleaned.startsWith('0')) {
        cleaned = cleaned.substring(1);
    }
    
    // Agregar el prefijo internacional 598 (Uruguay)
    return '598' + cleaned;
}