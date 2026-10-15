# TrendMakers website

Esta es la única carpeta activa del sitio. El respaldo previo a la reorganización está en `../_archive/website-main-copy-2026-10-15`. No editar ni publicar ese respaldo.

## Estructura

- `index.html`, `404.html`, `privacy.html`: páginas de la raíz.
- `servicios/`, `blog/`, `casos-exito/`, `equipo/`, `academy/`, `academy-cursos/`: páginas por sección.
- `en/`: versiones públicas en inglés.
- `css/`, `js/`, `img/`, `video/`: recursos. Se mantienen sus rutas actuales.
- `scripts/`: generador SEO y validaciones.
- `docs/`: documentación SEO, Analytics e informes.
- `CNAME`, `robots.txt`, `sitemap.xml`, `favicon.png`: configuración pública; mantener en la raíz.

## Edición y publicación

Abrir `../TrendMakers.code-workspace` para trabajar únicamente sobre este proyecto.

El contenido de esta carpeta corresponde a la raíz del repositorio `CGPMMWG/website`, publicado mediante GitHub Pages. No publicar la carpeta superior que contiene el respaldo.

El generador utiliza el HTML español, los diccionarios de traducción y `scripts/seo-pages.json`. Revisar los cambios en inglés al regenerar. Los enlaces editoriales por artículo se declaran en `relatedFiles` dentro del catálogo SEO.

## Validación

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/audit-seo.ps1
```

Con Node y las dependencias instaladas, ejecutar `npm run check:seo` y `npm run check:paths`.

Consultar [SEO](docs/SEO.md), [Analytics](docs/GA4.md) e [informe de auditoría](docs/SEO-AUDIT-2026-10-14.md).
