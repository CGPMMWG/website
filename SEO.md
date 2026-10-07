Mejoras de SEO — septiembre de 2026
=================================

Se optimizaron las 28 páginas originales y se generaron 27 versiones estáticas en inglés bajo `/en/`. El sitio sigue siendo HTML estático: no necesita Node ni un servidor de aplicaciones para publicarse.

- Títulos y descripciones específicos por página e idioma; las páginas comerciales contemplan Argentina, Latinoamérica y mercados internacionales.
- Un canonical por página, alternativas `es`, `en` y `x-default` recíprocas, y selector de idioma con enlaces rastreables. La preferencia guardada ya no cambia el idioma de una URL. Los enlaces anteriores con `?lang=en` llevan a su versión equivalente.
- Un único grafo JSON-LD por página: Organization, WebSite, WebPage, BreadcrumbList y el tipo correspondiente al contenido (Service, Course, Article o BlogPosting). Se eliminaron duplicados y fechas sin respaldo editorial; no se agregaron reseñas, direcciones, precios ni resultados inventados.
- Corrección de enlaces a Equipo y de breadcrumbs que apuntaban a carpetas inexistentes. Enlaces relacionados entre servicios, artículos y casos.
- Open Graph y Twitter con imágenes pertinentes y dimensiones reales.
- Imágenes WebP con sus originales conservados, variantes adaptables, dimensiones explícitas y carga diferida fuera de la cabecera. Se conservó el lienzo de los logos y su ajuste óptico.
- El título principal y los CTA aparecen sin esperar las animaciones de entrada. Hay contenido disponible sin JavaScript y una página 404 con `noindex`.
- Sitemap con las 55 URL canónicas y sus equivalencias de idioma. Se omite `lastmod` hasta contar con un registro editorial fiable, en lugar de actualizar fechas automáticamente en cada compilación.

El artículo `blog/blog-calificaciones-google.html` permanece en español porque aún no tiene una traducción editorial. Su enlace sigue funcionando desde el blog inglés; no se declara una alternativa inglesa inexistente.

Validación y rendimiento
-----------------------

`npm run check:seo` comprueba las 55 páginas: título, descripción, H1, canonical, alternativas de idioma, JSON-LD, enlaces internos y anclas, dimensiones de imágenes, sitemap, errores de JavaScript, recursos faltantes y desbordes a 390 px.

También se comprobó la portada antes y después en escritorio/móvil, el menú móvil, el cambio ES ↔ EN, enlaces antiguos con `?lang=en`, los botones de regreso y páginas sin JavaScript.

En la optimización inicial, las 38 imágenes convertidas pasaron de 47,98 MB a 4,68 MB en conjunto (aproximadamente 90% menos). En una comparación local de la portada a 390 px, recorriendo la página para cargar imágenes diferidas, los recursos descargados pasaron de 4,71 MB a 0,65 MB. Las fuentes y otros recursos externos estuvieron bloqueados en ambas mediciones. Estas cifras históricas son una comparación local de transferencia, no una puntuación de Lighthouse ni datos de Core Web Vitals de usuarios reales. Posteriormente se retiraron los medios sin uso y sus variantes; se conservan los originales necesarios para regenerar las imágenes activas.

Edición y regeneración
----------------------

1. Editar el HTML original en español y las traducciones existentes en `js/` o en los scripts de cada página. No editar directamente los archivos de `en/`: se generan.
2. Editar títulos, descripciones y la selección de imagen en `scripts/seo-pages.json`.
3. Instalar las herramientas con `npm install` y Chromium con `npx playwright install chromium`. Si ya hay Chrome instalado, se puede definir `CHROME_PATH` con su ruta.
4. Ejecutar `npm run build:seo` y después `npm run check:seo`.

La compilación actualiza los metadatos de los originales, genera imágenes optimizadas, renderiza las traducciones como HTML estático y reconstruye el sitemap. Los recursos y enlaces internos usan rutas relativas: el sitio funciona desde la raíz del dominio, dentro de una subcarpeta (por ejemplo con Live Server) y al abrir `index.html` directamente. Los canonical, hreflang y datos estructurados conservan las URL públicas absolutas.

`npm run check:paths` verifica las 55 páginas desde una subcarpeta y mediante `file://`, incluyendo estilos, imágenes, scripts, enlaces internos y navegación de idiomas.

Publicación y seguimiento
------------------------

Los cambios están en estos archivos locales; no se realizó un despliegue. Publicar también `en/`, `img/optimized/`, los nuevos CSS/JS, `robots.txt`, `sitemap.xml` y `404.html` junto al resto del sitio.

Después de publicar, enviar `https://trendmakers.agency/sitemap.xml` en Google Search Console e inspeccionar la portada y algunas URL de ambos idiomas. En el hosting, confirmar HTTPS, redirección permanente del dominio alternativo hacia `https://trendmakers.agency/`, compresión/cache de recursos y respuesta HTTP 404 real para páginas inexistentes. Estas configuraciones dependen del alojamiento y no se simulan con etiquetas HTML.

El posicionamiento debe seguirse por consultas, países, clics, indexación y conversiones. La implementación técnica facilita el rastreo y la comprensión del contenido; no garantiza posiciones.

Referencias oficiales
--------------------

- La separación de versiones por idioma y sus enlaces sigue la [guía de Google para sitios multilingües](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites).
- Los metadatos y el contenido estático se apoyan en las [recomendaciones de Google para SEO con JavaScript](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).
- Los canonical coherentes siguen la [guía de consolidación de URL duplicadas](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
- El marcado refleja contenido visible según la [introducción a datos estructurados de Google](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data).
- La carga de imágenes y la visualización temprana del contenido siguen las [recomendaciones para optimizar LCP](https://web.dev/articles/optimize-lcp).
