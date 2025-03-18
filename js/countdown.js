/**
 * Funcionalidad de cuenta regresiva para la invitación
 */

/**
 * Inicia la cuenta regresiva hacia la fecha del evento
 * @param {string} targetDateStr - Fecha del evento en formato YYYY-MM-DD HH:MM
 */
function startCountdown(targetDateStr) {
    // Convertir la cadena de fecha a objeto Date
    const targetDate = new Date(targetDateStr).getTime();
    
    // Actualizar el contador inmediatamente
    updateCountdown(targetDate);
    
    // Establecer un intervalo para actualizar el contador cada segundo
    const countdownInterval = setInterval(() => {
        const completed = updateCountdown(targetDate);
        
        // Si la cuenta regresiva ha terminado, limpiar el intervalo
        if (completed) {
            clearInterval(countdownInterval);
        }
    }, 1000);
}

/**
 * Actualiza los valores del contador
 * @param {number} targetDate - Timestamp de la fecha objetivo
 * @returns {boolean} - True si la cuenta regresiva ha terminado
 */
function updateCountdown(targetDate) {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    // Si la fecha ya pasó
    if (distance < 0) {
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
        
        // Opcionalmente, muestra un mensaje de "El evento ha comenzado"
        const countdownElement = document.getElementById("countdown");
        if (countdownElement) {
            const eventStartedMsg = document.createElement("div");
            eventStartedMsg.className = "event-started";
            eventStartedMsg.textContent = "¡El evento ha comenzado!";
            
            // Reemplazar el contador por el mensaje
            countdownElement.innerHTML = "";
            countdownElement.appendChild(eventStartedMsg);
        }
        
        return true; // Indica que la cuenta regresiva ha terminado
    }
    
    // Cálculos de tiempo
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Actualizar la UI con los valores calculados (con padding de ceros)
    document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
    document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
    
    return false; // Indica que la cuenta regresiva sigue activa
}