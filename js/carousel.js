/**
 * Funcionalidad del carrusel de imágenes
 * Sistema modular de invitaciones
 */

// Cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el carrusel si existe en la página
    initializeCarousel();
});

/**
 * Inicializa el carrusel con imágenes desde la configuración
 */
function initializeCarousel() {
    const carouselTrack = document.getElementById('carousel-track');
    const carouselIndicators = document.getElementById('carousel-indicators');
    
    // Si no existen los elementos, salir
    if (!carouselTrack || !carouselIndicators) return;
    
    // Obtener imágenes desde la configuración (o usar predeterminadas si no hay)
    const images = getCarouselImages();
    
    if (images.length === 0) {
        // Si no hay imágenes, ocultar el carrusel
        const container = document.querySelector('.carousel-container');
        if (container) container.style.display = 'none';
        return;
    }
    
    // Generar diapositivas e indicadores
    generateCarouselSlides(images, carouselTrack, carouselIndicators);
    
    // Configurar controles
    setupCarouselControls();
    
    // Iniciar rotación automática si está configurada
    startAutoRotation();
    
    // Crear modal si está habilitado
    setupImageModal();
}

/**
 * Obtiene las imágenes del carrusel desde la configuración
 * @returns {Array} Array de objetos de imagen con src y caption
 */
function getCarouselImages() {
    // Comprobar si hay configuración de carrusel
    if (window.eventoConfig && eventoConfig.carrusel && eventoConfig.carrusel.imagenes) {
        return eventoConfig.carrusel.imagenes;
    }
    
    // Imágenes predeterminadas (para demostración)
    return [
        {
            src: 'assets/carousel/imagen1.png',
            caption: 'Imagen 1'
        },
        {
            src: 'assets/carousel/imagen2.png',
            caption: 'Imagen 2'
        },
        {
            src: 'assets/carousel/imagen3.png',
            caption: 'Imagen 3'
        },
        {
            src: 'assets/carousel/imagen4.png',
            caption: 'Imagen 4'
        }
    ];
}

/**
 * Genera las diapositivas e indicadores del carrusel
 * @param {Array} images - Array de objetos de imagen
 * @param {HTMLElement} track - Elemento pista del carrusel
 * @param {HTMLElement} indicators - Contenedor de indicadores
 */
function generateCarouselSlides(images, track, indicators) {
    // Limpiar contenedores
    track.innerHTML = '';
    indicators.innerHTML = '';
    
    // Generar diapositivas e indicadores
    images.forEach((image, index) => {
        // Crear diapositiva
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.dataset.index = index;
        
        // Crear imagen
        const img = document.createElement('img');
        img.className = 'carousel-image';
        img.src = image.src;
        img.alt = image.caption || `Imagen ${index + 1}`;
        img.loading = 'lazy'; // Carga perezosa para rendimiento
        
        // Agregar leyenda si existe
        if (image.caption) {
            const caption = document.createElement('div');
            caption.className = 'carousel-caption';
            caption.textContent = image.caption;
            slide.appendChild(caption);
        }
        
        // Agregar imagen a la diapositiva
        slide.appendChild(img);
        
        // Agregar diapositiva a la pista
        track.appendChild(slide);
        
        // Crear indicador
        const indicator = document.createElement('button');
        indicator.className = 'carousel-indicator';
        indicator.dataset.index = index;
        indicator.setAttribute('aria-label', `Imagen ${index + 1}`);
        
        // Si es el primer indicador, marcarlo como activo
        if (index === 0) {
            indicator.classList.add('active');
        }
        
        // Agregar evento al indicador
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
        
        // Agregar indicador al contenedor
        indicators.appendChild(indicator);
    });
}

/**
 * Configura los controles del carrusel
 */
function setupCarouselControls() {
    const prevButton = document.getElementById('carousel-prev');
    const nextButton = document.getElementById('carousel-next');
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            goToPrevSlide();
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            goToNextSlide();
        });
    }
    
    // Manejar gestos táctiles para dispositivos móviles
    setupTouchControls();
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToPrevSlide();
        } else if (e.key === 'ArrowRight') {
            goToNextSlide();
        }
    });
}

/**
 * Configura controles táctiles para dispositivos móviles
 */
function setupTouchControls() {
    const carousel = document.getElementById('event-carousel');
    if (!carousel) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Cuando comienza el toque
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    // Cuando termina el toque
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    // Manejar el gesto
    function handleSwipe() {
        const threshold = 50; // Mínima distancia para considerar un swipe
        
        if (touchStartX - touchEndX > threshold) {
            // Swipe a la izquierda, ir a la siguiente diapositiva
            goToNextSlide();
        } else if (touchEndX - touchStartX > threshold) {
            // Swipe a la derecha, ir a la diapositiva anterior
            goToPrevSlide();
        }
    }
}

/**
 * Va a una diapositiva específica
 * @param {number} index - Índice de la diapositiva
 */
function goToSlide(index) {
    const track = document.getElementById('carousel-track');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (!track || slides.length === 0) return;
    
    // Validar índice
    if (index < 0) {
        index = slides.length - 1;
    } else if (index >= slides.length) {
        index = 0;
    }
    
    // Mover la pista
    track.style.transform = `translateX(-${index * 100}%)`;
    
    // Actualizar indicadores
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
        if (parseInt(indicator.dataset.index) === index) {
            indicator.classList.add('active');
        }
    });
    
    // Guardar el índice actual
    track.dataset.currentIndex = index;
    
    // Reiniciar temporizador de rotación automática si está habilitado
    resetAutoRotation();
}

/**
 * Va a la diapositiva anterior
 */
function goToPrevSlide() {
    const track = document.getElementById('carousel-track');
    if (!track) return;
    
    const currentIndex = parseInt(track.dataset.currentIndex || 0);
    goToSlide(currentIndex - 1);
}

/**
 * Va a la siguiente diapositiva
 */
function goToNextSlide() {
    const track = document.getElementById('carousel-track');
    if (!track) return;
    
    const currentIndex = parseInt(track.dataset.currentIndex || 0);
    goToSlide(currentIndex + 1);
}

/**
 * Inicia la rotación automática del carrusel
 */
function startAutoRotation() {
    // Verificar si está habilitada la rotación automática en la configuración
    if (window.eventoConfig && eventoConfig.carrusel && eventoConfig.carrusel.autoRotacion === false) {
        return;
    }
    
    // Intervalo predeterminado de 5 segundos (configurable)
    const interval = (window.eventoConfig && eventoConfig.carrusel && eventoConfig.carrusel.intervalo) || 5000;
    
    // Establecer temporizador
    window.carouselInterval = setInterval(() => {
        goToNextSlide();
    }, interval);
    
    // Detener rotación cuando el usuario interactúa con el carrusel
    const carousel = document.getElementById('event-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(window.carouselInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            resetAutoRotation();
        });
    }
}

/**
 * Reinicia la rotación automática
 */
function resetAutoRotation() {
    // Si la rotación automática está deshabilitada, salir
    if (window.eventoConfig && eventoConfig.carrusel && eventoConfig.carrusel.autoRotacion === false) {
        return;
    }
    
    // Limpiar temporizador existente
    clearInterval(window.carouselInterval);
    
    // Configurar nuevo temporizador
    const interval = (window.eventoConfig && eventoConfig.carrusel && eventoConfig.carrusel.intervalo) || 5000;
    window.carouselInterval = setInterval(() => {
        goToNextSlide();
    }, interval);
}

/**
 * Configura modal para visualización ampliada de imágenes
 */
function setupImageModal() {
    // Verificar si está habilitado el modal en la configuración
    if (window.eventoConfig && eventoConfig.carrusel && eventoConfig.carrusel.modalImagen === false) {
        return;
    }
    
    // Crear estructura del modal si no existe
    if (!document.getElementById('carousel-modal')) {
        const modal = document.createElement('div');
        modal.id = 'carousel-modal';
        modal.className = 'carousel-modal';
        
        const modalImg = document.createElement('img');
        modalImg.id = 'carousel-modal-img';
        modalImg.className = 'carousel-modal-content';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'carousel-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = () => {
            modal.classList.remove('active');
        };
        
        modal.appendChild(modalImg);
        modal.appendChild(closeBtn);
        document.body.appendChild(modal);
        
        // Cerrar modal al hacer clic fuera de la imagen
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
    
    // Agregar comportamiento a las imágenes
    const images = document.querySelectorAll('.carousel-image');
    const modal = document.getElementById('carousel-modal');
    const modalImg = document.getElementById('carousel-modal-img');
    
    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            modalImg.src = img.src;
            modal.classList.add('active');
        });
    });
}