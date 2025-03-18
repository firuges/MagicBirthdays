# Sistema de Invitaciones Personalizable

Un sistema completo y genérico para crear invitaciones web para diferentes tipos de eventos (cumpleaños, bodas, aniversarios, etc.) con múltiples temas visuales y opciones de configuración.

## Características

- **Totalmente personalizable** a través de un archivo de configuración central
- **Múltiples temas visuales** (neón, floral, elegante, rústico, infantil)
- **Soporte para uno o varios homenajeados**
- **Formulario de confirmación** con envío de correo electrónico
- **Integración con WhatsApp** para compartir invitaciones
- **Panel de administración** para gestionar las confirmaciones
- **Responsive Design** - Funciona en móviles, tablets y escritorio
- **Cuenta regresiva** hacia el evento
- **Animaciones y efectos visuales** personalizables

## Estructura del Proyecto

```
/invitacion-evento/
│
├── index.html               # Página principal de invitación
├── gracias.html             # Página de agradecimiento
├── admin.html               # Página de administrador
│
├── js/
│   ├── config.js            # ⭐ ARCHIVO DE CONFIGURACIÓN PRINCIPAL
│   ├── countdown.js         # Cuenta regresiva
│   ├── form-handler.js      # Manejo de formulario
│   ├── whatsapp.js          # Funcionalidad de WhatsApp
│   └── utilities.js         # Funciones de utilidad
│
├── css/
│   ├── base.css             # Estilos base
│   ├── themes/
│   │   ├── neon.css         # Tema de Neón
│   │   ├── floral.css       # Tema Floral
│   │   ├── elegant.css      # Tema Elegante
│   │   └── ... otros temas
│   └── components/
│       └── ... estilos de componentes
│
└── assets/
    └── ... recursos adicionales
```

## Guía de Inicio Rápido

### 1. Configuración Básica

Para empezar, edita el archivo `js/config.js` con la información de tu evento:

```javascript
const eventoConfig = {
    // Información básica del evento
    titulo: "¡Tu evento aquí!",
    subtitulo: "Descripción breve del evento",
    
    // Fecha y hora del evento (formato: YYYY-MM-DD HH:MM)
    fecha: "2025-12-31 20:00",
    
    // Ubicación
    ubicacion: {
        nombre: "Nombre del lugar",
        direccion: "Dirección completa aquí",
        coordenadas: {
            lat: -34.123456,
            lng: -56.789012
        }
    },
    
    // Tema visual (opciones: "neon", "floral", "elegant", "rustic", "kids")
    tema: "neon",
    
    // Añade los homenajeados o anfitriones
    cumpleaneros: [
        {
            nombre: "Nombre 1",
            descripcion: "Descripción breve",
            edad: 30,
            cuenta: "Datos bancarios para regalo (opcional)"
        },
        // Añade más personas si es necesario
    ],
    
    // ... otras configuraciones
};
```

### 2. Configuración de EmailJS

1. Crea una cuenta en [EmailJS](https://www.emailjs.com/)
2. Configura un servicio de correo electrónico
3. Crea dos plantillas:
   - Una para notificaciones al administrador/homenajeado
   - Otra para confirmar al invitado
4. Actualiza la configuración en `config.js`:

```javascript
emailjs: {
    serviceID: "tu_service_id",
    adminTemplateID: "tu_template_id_admin",
    userTemplateID: "tu_template_id_usuario",
    userID: "tu_user_id"
}
```

### 3. Personalización del Tema

Para cambiar el tema visual, simplemente modifica la propiedad `tema` en `config.js`:

```javascript
tema: "floral", // Opciones: "neon", "floral", "elegant", "rustic", "kids"
```

## Personalización Avanzada

### Personalizar los Textos

Todos los textos pueden personalizarse en la sección `mensajes` del archivo `config.js`:

```javascript
mensajes: {
    bienvenida: "Texto de bienvenida personalizado",
    codigoVestimenta: "Información sobre el código de vestimenta",
    invitacion: "Texto de invitación personalizado",
    confirmacion: "Mensaje para el formulario de confirmación",
    agradecimiento: "Mensaje de agradecimiento"
}
```

### Añadir Más Homenajeados

Para eventos con múltiples homenajeados (como cumpleaños compartidos), simplemente añade más entradas al array `cumpleaneros`:

```javascript
cumpleaneros: [
    {
        nombre: "Persona 1",
        descripcion: "Descripción de persona 1",
        edad: 30,
        cuenta: "Datos bancarios 1"
    },
    {
        nombre: "Persona 2",
        descripcion: "Descripción de persona 2",
        edad: 30,
        cuenta: "Datos bancarios 2"
    },
    {
        nombre: "Persona 3",
        descripcion: "Descripción de persona 3",
        edad: 30,
        cuenta: "Datos bancarios 3"
    }
]
```

El sistema automáticamente generará perfiles para cada persona y un selector en el formulario para que el invitado indique a quién viene a ver principalmente.

### Configuración del Formulario

Puedes personalizar las opciones del formulario:

```javascript
formulario: {
    limiteSenaleAsistencia: "2025-12-15", // Fecha límite para confirmar
    maxAcompanantes: 2, // Número máximo de acompañantes permitidos
    incluirWhatsapp: true, // Habilitar opción de WhatsApp
    incluirDonacion: true, // Mostrar sección de donación/regalo
}
```

### Crear un Nuevo Tema

Si quieres crear un tema personalizado:

1. Crea un nuevo archivo CSS en la carpeta `css/themes/`, por ejemplo `mi-tema.css`
2. Copia la estructura básica de otro tema y personaliza los colores y estilos
3. Especifica el nuevo tema en la configuración:

```javascript
tema: "mi-tema"
```

## Despliegue

Este sistema es estático y puede alojarse en cualquier servicio de hosting:

1. **GitHub Pages**: Sube los archivos a un repositorio y activa GitHub Pages
2. **Netlify/Vercel**: Conecta tu repositorio para despliegue automático
3. **Hosting tradicional**: Sube los archivos a través de FTP

## Problemas Comunes

### Los correos no se envían

- Verifica tu configuración de EmailJS
- Asegúrate de haber inicializado EmailJS correctamente
- Comprueba que las plantillas contengan las variables correctas

### El contador no funciona

- Verifica que el formato de fecha en `config.js` sea correcto (YYYY-MM-DD HH:MM)
- Asegúrate de que la fecha esté en el futuro

### Problemas con el botón de WhatsApp

- El número de teléfono debe tener el formato internacional correcto
- Prueba añadir/quitar el prefijo del país (ejemplo: +598)

## Personalización de Plantillas de Email

Para personalizar las plantillas de email en EmailJS, utiliza estas variables:

**Plantilla de admin:**
- `{{name}}` - Nombre del invitado
- `{{phone}}` - Teléfono del invitado
- `{{email}}` - Email del invitado
- `{{attendance}}` - Estado de asistencia
- `{{guests}}` - Número de acompañantes
- `{{favorite_celebrant}}` - Homenajeado seleccionado
- `{{message}}` - Mensaje del invitado
- `{{date_time}}` - Fecha y hora de confirmación

**Plantilla de usuario:**
- `{{name}}` - Nombre del invitado
- `{{event_date}}` - Fecha del evento
- `{{event_location}}` - Ubicación del evento
- `{{map_address}}` - Dirección para Google Maps
- `{{attendance}}` - Estado de asistencia
- `{{guests}}` - Número de acompañantes
- `{{favorite_celebrant}}` - Homenajeado seleccionado
- `{{account_number}}` - Cuenta bancaria del homenajeado

## Licencia

Este proyecto está disponible con licencia MIT.

## Agradecimientos

Desarrollado con amor para hacer que tus eventos especiales sean aún más memorables.

¡Disfruta y personaliza tu invitación!