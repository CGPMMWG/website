/* GA4: no Google requests until prerequisites and explicit analytics consent. */
(function () {
  'use strict';
  if (window.TrendMakersAnalytics) return;
  var id = 'G-22TN2VP54F';
  var configured = false;
  var loader = null;
  var allowed = false;
  var sent = false;
  function ready() {
    var settings = window.TM_GA4_SETTINGS || {};
    return settings.enabled === true && settings.enhancedMeasurementDisabled === true;
  }
  var knownPaths = ["/404.html","/index.html","/academy/index.html","/academy-cursos/academy-ai-business-marketing.html","/academy-cursos/academy-branding-communication-b2b.html","/academy-cursos/academy-diagnostico-digital-ceos.html","/academy-cursos/academy-marketing-automation-basics.html","/academy-cursos/academy-paid-media-essentials.html","/academy-cursos/academy-webs-que-convierten.html","/blog/blog-branding.html","/blog/blog-calificaciones-google.html","/blog/blog-email-marketing-automatizacion.html","/blog/blog-errores-marketing.html","/blog/blog-ia-automatizacion.html","/blog/blog-ia-marketing-growth.html","/blog/blog-ia2.html","/blog/blog-marketing-estrategico.html","/blog/blog-websites1.html","/blog/index.html","/casos-exito/caso-gope-consulting.html","/casos-exito/caso-letratec.html","/casos-exito/caso-prontoled.html","/en/index.html","/en/academy/index.html","/en/academy-cursos/academy-ai-business-marketing.html","/en/academy-cursos/academy-branding-communication-b2b.html","/en/academy-cursos/academy-diagnostico-digital-ceos.html","/en/academy-cursos/academy-marketing-automation-basics.html","/en/academy-cursos/academy-paid-media-essentials.html","/en/academy-cursos/academy-webs-que-convierten.html","/en/blog/blog-branding.html","/en/blog/blog-email-marketing-automatizacion.html","/en/blog/blog-errores-marketing.html","/en/blog/blog-ia-automatizacion.html","/en/blog/blog-ia-marketing-growth.html","/en/blog/blog-ia2.html","/en/blog/blog-marketing-estrategico.html","/en/blog/blog-websites1.html","/en/blog/index.html","/en/casos-exito/caso-gope-consulting.html","/en/casos-exito/caso-letratec.html","/en/casos-exito/caso-prontoled.html","/en/equipo/index.html","/en/servicios/branding-communication.html","/en/servicios/data-analytics.html","/en/servicios/ia-hub.html","/en/servicios/index.html","/en/servicios/marketing-automation.html","/en/servicios/web-ecommerce.html","/equipo/index.html","/servicios/branding-communication.html","/servicios/data-analytics.html","/servicios/ia-hub.html","/servicios/index.html","/servicios/marketing-automation.html","/servicios/web-ecommerce.html"];
  function cleanPath() {
    var current = location.pathname;
    var file = current.endsWith('/') ? current + 'index.html' : current;
    return knownPaths.indexOf(file) !== -1 ? current : '/404.html';
  }
  function cleanLocation() { return location.origin + cleanPath(); }
  function grant() {
    if (!ready()) return false;
    if (location.hostname !== 'trendmakers.agency' && location.hostname !== 'www.trendmakers.agency') return false;
    if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]') && !loader) return false;
    allowed = true;
    window['ga-disable-' + id] = false;
    if (!configured) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('consent', 'default', {
        analytics_storage: 'denied', ad_storage: 'denied',
        ad_user_data: 'denied', ad_personalization: 'denied'
      });
      window.gtag('consent', 'update', {analytics_storage: 'granted'});
      window.gtag('js', new Date());
      window.gtag('config', id, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        page_location: cleanLocation(),
        page_referrer: '',
        page_title: cleanPath()
      });
      configured = true;
      loader = document.createElement('script');
      loader.async = true;
      loader.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
      document.head.appendChild(loader);
    } else {
      window.gtag('consent', 'update', {analytics_storage: 'granted'});
    }
    if (!sent) {
      window.gtag('event', 'page_view', {
        send_to: id, page_location: cleanLocation(),
        page_referrer: '', page_title: cleanPath()
      });
      sent = true;
    }
    return true;
  }
  function revoke() {
    allowed = false;
    window['ga-disable-' + id] = true;
    if (configured) window.gtag('consent', 'update', {analytics_storage: 'denied'});
    // Remove first-party analytics cookies after a withdrawal.
    document.cookie.split(';').forEach(function (entry) {
      var name = entry.split('=')[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) return;
      ['', location.hostname, '.' + location.hostname, '.trendmakers.agency'].forEach(function (domain) {
        document.cookie = name + '=; Max-Age=0; path=/' + (domain ? '; domain=' + domain : '') + '; SameSite=Lax';
      });
    });
  }
  window.TrendMakersAnalytics = {
    setConsent: function (value) { if (value === true) return grant(); revoke(); return false; },
    status: function () { return {measurementId: id, prerequisitesReady: ready(), consentGranted: allowed, configured: configured, pageViewSent: sent}; }
  };
})();