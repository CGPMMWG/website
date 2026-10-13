# GA4 — TrendMakers
Measurement ID: G-22TN2VP54F

## Estado
Integración instalada en todas las páginas. Seguimiento bloqueado por defecto.
Banner propio ES/EN instalado; aviso en /privacy.html y /en/privacy.html. Preferencias al pie. Elección en localStorage durante 180 días.
No se carga gtag.js ni se envía información a Google mientras falten los requisitos.

## Antes de activar
1. Banner y aviso ya implementados. Falta confirmar la desactivación de Medición mejorada antes de habilitar el indicador enhancedMeasurementDisabled en js/analytics.js.
2. En GA4 > Administrar > Flujos de datos > Web > Medición mejorada: DESACTIVAR la medición mejorada completa. Los enlaces mailto/WhatsApp pueden incluir datos personales; no activar clics, formularios, búsqueda ni page views por cambios de historial.
3. El CMP debe definir window.TM_GA4_SETTINGS = {enabled: true, enhancedMeasurementDisabled: true} antes de conceder permiso. Este indicador requiere comprobar la configuración real de GA4.
4. Tras consentimiento explícito: window.TrendMakersAnalytics.setConsent(true). Repetir al cargar cada documento si hay consentimiento persistido.
5. Al rechazar o retirar: window.TrendMakersAnalytics.setConsent(false). Nunca conceder permiso por silencio o visita.

## Eventos y privacidad
Un page_view manual por documento tras consentimiento; send_page_view:false impide el automático.
Repetir setConsent(true) no duplica vistas. Los anchors no crean vistas; ES/EN y servicios cargan documentos nuevos.
Se excluyen query strings, hashes, referrer y títulos editoriales; el título técnico es el pathname estático.
Sin user_id, datos de formularios, email, teléfono, nombres ni eventos de enlaces.
No introducir datos personales en rutas del sitio. No añadir otra etiqueta GA/GTM para esta propiedad.
Solo se permite carga en trendmakers.agency y www.trendmakers.agency.
Al retirar consentimiento se bloquean nuevos envíos y se eliminan cookies _ga accesibles.

## Validación
Antes de activar: Network no debe mostrar googletagmanager.com/gtag/js ni google-analytics.com/g/collect.
Después de conectar el CMP y desactivar medición mejorada: aceptar analítica, abrir home y un servicio y comprobar una petición page_view por documento con tid=G-22TN2VP54F.
Inspeccionar page_location sin query/hash; sin campos de formulario ni link_url.
Rechazar en sesión nueva: cero solicitudes GA. Retirar permiso: sin nuevas solicitudes.
Comprobar window.TrendMakersAnalytics.status().
GA4 > Informes > Tiempo real: abrir sitio sin bloqueador, aceptar analítica y navegar; verificar usuario activo y page_view. La confirmación de ingestión requiere acceso a la propiedad GA4 y una sesión consentida.
