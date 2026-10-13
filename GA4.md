# GA4 — TrendMakers
Measurement ID: G-22TN2VP54F

## Estado
El sitio permite Medición mejorada parcial, manteniendo una vista manual por documento.
Google solo se carga después de aceptar analítica. Rechazar/retirar bloquea el seguimiento.
El banner ES/EN conserva la elección 180 días y se puede reabrir desde el pie.

## Configuración en Google Analytics (acción pendiente en la cuenta)
Administrar > Flujos de datos > Web > Medición mejorada > engranaje.
Activar el interruptor general.
Activar: desplazamientos, descargas de archivos e interacción con videos.
Desactivar: clics salientes, búsquedas del sitio e interacciones con formularios.
En Vistas de página > configuración avanzada, desactivar Cambios de página basados en eventos del historial del navegador.
La vista automática inicial se bloquea con send_page_view:false en cada documento.
No activar toda la medición sin revisar los campos y las URLs que registra.
El sitio no puede cambiar los ajustes de la propiedad GA4.

## Privacidad
No se envían formularios, emails, teléfonos ni mensajes mediante eventos propios.
Las vistas manuales excluyen query strings, hashes, referrer y rutas desconocidas.
Mantener archivos y URLs de videos libres de información personal; revisar antes de añadirlos.
En GA4 > Flujos de datos > Web > Ocultar datos: mantener ocultación de emails y configurar parámetros sensibles (email, name, phone, message, text, subject, body) como defensa adicional.
No añadir otra etiqueta GA/GTM para esta propiedad.
Aviso: /privacy.html y /en/privacy.html.

## Validación
Sesión nueva/rechazo: sin gtag.js ni g/collect.
Aceptación: una carga de gtag.js, una vista page_view por documento.
Repetir aceptación o navegar anchors: no crea vistas manuales adicionales.
Retirada: ga-disable-G-22TN2VP54F=true.
Después de configurar GA4, usar Realtime o DebugView:
- visitar home y servicio: una vista por documento;
- scroll al 90%: evento scroll;
- descarga/video compatible: eventos automáticos correspondientes;
- revisar payloads: sin datos de contacto o formularios.
La recepción real y los eventos mejorados requieren verificar la cuenta de GA4.

## Eventos de interacción seguros
- contact_click: whatsapp, email, calendar o phone.
- outbound_click: linkedin, instagram o external. Sin URL, texto de enlace ni destino.
- form_start: primera interacción consentida por formulario.
- form_submit_attempt: intento de envío, NO conversión.
- generate_lead: solo respuesta JSON ok:true y HTTP exitoso de Formspree.
- form_submit_error: categoría técnica network/rate_limit/server, sin respuesta ni campos.
- site_search: solo si existe un formulario role=search; no se envía el término. Actualmente no hay buscador.
Todos requieren consentimiento vigente. Formspree recibe los datos del formulario como antes; Analytics nunca los recibe.
El envío ahora usa AJAX, conserva datos si falla, previene doble clic y muestra confirmación accesible ES/EN.
Mantener DESACTIVADAS las opciones automáticas de clics salientes, formularios y búsqueda para evitar eventos paralelos.
En GA4, marcar generate_lead como evento clave. contact_click es intención, no consulta confirmada ni reserva.
Crear dimensión personalizada de alcance evento interaction_category para desglosar los canales.
Pruebas: usar respuestas simuladas; no generar consultas ficticias en el formulario de producción.
