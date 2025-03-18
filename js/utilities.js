/**
 * Funciones utilitarias para la aplicación de invitación
 */

/**
 * Formatea una fecha a un formato legible en español
 * @param {string|Date} date - Fecha a formatear
 * @param {boolean} includeTime - Indica si incluir la hora
 * @returns {string} - Fecha formateada
 */
function formatDate(date, includeTime = false) {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    if (includeTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
    }
    
    return dateObj.toLocaleDateString('es-ES', options);
}

/**
 * Genera un ID único
 * @returns {string} - ID único
 */
function generateUniqueId() {
    return 'id_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Formatea un número de teléfono para mostrar
 * @param {string} phone - Número de teléfono a formatear
 * @returns {string} - Número formateado para mostrar
 */
function formatPhoneForDisplay(phone) {
    if (!phone) return '';
    
    // Eliminar todos los caracteres no numéricos
    const cleaned = phone.replace(/\D/g, '');
    
    // Si empieza con el prefijo internacional
    if (cleaned.startsWith('598')) {
        const countryCode = cleaned.slice(0, 3);
        const rest = cleaned.slice(3);
        
        // Formatear como +598 XX XXXXXX
        return `+${countryCode} ${rest.slice(0, 2)} ${rest.slice(2)}`;
    }
    
    // Si es un número local sin prefijo
    if (cleaned.length <= 8) {
        return cleaned.replace(/(\d{2})(\d{6})/, '$1 $2');
    }
    
    // Para cualquier otro formato
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
}

/**
 * Crea elementos HTML a partir de una cadena HTML
 * @param {string} html - Cadena HTML
 * @returns {HTMLElement} - Elemento creado
 */
function createElementFromHTML(html) {
    const div = document.createElement('div');
    div.innerHTML = html.trim();
    return div.firstChild;
}

/**
 * Valida una dirección de correo electrónico
 * @param {string} email - Correo electrónico a validar
 * @returns {boolean} - True si es válido
 */
function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Agrega efectos visuales aleatorios como confeti o globos
 * @param {string} containerId - ID del contenedor donde agregar los efectos
 * @param {string} effectType - Tipo de efecto ('confetti' o 'balloons')
 * @param {number} count - Número de elementos a crear
 */
function addVisualEffects(containerId, effectType = 'confetti', count = 10) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Obtener colores del tema actual o usar predeterminados
    const colors = getThemeColors();
    
    for (let i = 0; i < count; i++) {
        const element = document.createElement('div');
        
        if (effectType === 'confetti') {
            element.className = 'confetti';
            element.style.left = `${Math.random() * 100}%`;
            element.style.animationDelay = `${Math.random() * 5}s`;
            element.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        } else if (effectType === 'balloons') {
            element.className = 'balloon';
            element.style.left = `${Math.random() * 100}%`;
            element.style.animationDelay = `${Math.random() * 10}s`;
            
            // Crear un icono de globo o similar
            const icon = document.createElement('i');
            icon.className = 'fas fa-birthday-cake';
            icon.style.fontSize = `${1 + Math.random()}rem`;
            icon.style.color = colors[Math.floor(Math.random() * colors.length)];
            
            element.appendChild(icon);
        }
        
        container.appendChild(element);
    }
}

/**
 * Obtiene los colores del tema actual
 * @returns {Array} - Array de colores hexadecimales
 */
function getThemeColors() {
    // Colores por defecto (tema neón)
    let defaultColors = ['#ff00ff', '#00ffff', '#00ff00', '#ffff00', '#9d00ff'];
    
    // Si hay una configuración de tema, obtener sus colores
    if (window.eventoConfig && eventoConfig.tema) {
        switch (eventoConfig.tema) {
            case 'neon':
                return defaultColors;
            case 'floral':
                return ['#ff80ab', '#d896ff', '#7ecb7e', '#ffe57f', '#80d8ff'];
            case 'elegant':
                return ['#d4af37', '#c0c0c0', '#b76e79', '#7851a9', '#9fbfdf'];
            case 'rustic':
                return ['#d7ccc8', '#a1887f', '#8d6e63', '#6d4c41', '#5d4037'];
            case 'kids':
                return ['#ff5722', '#03a9f4', '#8bc34a', '#ffeb3b', '#e91e63'];
            default:
                return defaultColors;
        }
    }
    
    return defaultColors;
}