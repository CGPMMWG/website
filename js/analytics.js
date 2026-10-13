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
        cookie_expires: 15552000,
        cookie_update: false,
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
/* First-party consent UI. Analytics remains gated by the verified GA4 setting. */
(function () {
  'use strict';
  if (window.TrendMakersConsent) return;
  var KEY = 'tm.analytics.consent.v1';
  var AGE = 180 * 24 * 60 * 60 * 1000;
  window.TM_GA4_SETTINGS = {enabled: true, enhancedMeasurementDisabled: true};
  function read() {
    try {
      var value = JSON.parse(localStorage.getItem(KEY));
      if (value && value.version === 1 && typeof value.analytics === 'boolean' &&
          typeof value.savedAt === 'number' && value.savedAt <= Date.now() && Date.now() - value.savedAt < AGE) return value;
    } catch (_) {}
    return null;
  }
  function save(accepted) {
    var value = {version: 1, analytics: accepted === true, savedAt: Date.now()};
    try { localStorage.setItem(KEY, JSON.stringify(value)); } catch (_) {}
    return value;
  }
  function apply(value) { window.TrendMakersAnalytics.setConsent(!!value && value.analytics === true); }
  var banner, prefs, close, accept, reject, previousFocus;
  function show() {
    previousFocus = document.activeElement;
    banner.hidden = false;
    close.hidden = !read();
    accept.focus();
  }
  function hide() {
    banner.hidden = true;
    if (previousFocus && previousFocus.focus) previousFocus.focus();
  }
  function choose(accepted) { apply(save(accepted)); hide(); }
  window.TrendMakersConsent = {read: read, open: function () { if (banner) show(); }};
  function init() {
    var en = document.documentElement.lang === 'en';
    var text = en ? {
      title: 'Your privacy matters',
      body: 'With your permission, we use Google Analytics to measure visits and improve this website. Optional analytics stays off unless you accept. You can change your choice at any time.',
      accept: 'Accept analytics', reject: 'Reject analytics', privacy: 'Privacy notice', prefs: 'Cookie preferences', close: 'Close',
      path: '/en/privacy.html'
    } : {
      title: 'Tu privacidad importa',
      body: 'Con tu permiso, usamos Google Analytics para medir visitas y mejorar el sitio. La analítica opcional queda apagada si no aceptás. Podés cambiar tu elección en cualquier momento.',
      accept: 'Aceptar analítica', reject: 'Rechazar analítica', privacy: 'Aviso de privacidad', prefs: 'Preferencias de cookies', close: 'Cerrar',
      path: '/privacy.html'
    };
    var style = document.createElement('link');
    style.rel = 'stylesheet'; style.href = '/css/consent.css';
    document.head.appendChild(style);
    banner = document.createElement('section');
    banner.className = 'tm-consent'; banner.hidden = true;
    banner.setAttribute('role', 'region'); banner.setAttribute('aria-label', text.title);
    var heading = document.createElement('h2'); heading.textContent = text.title;
    var body = document.createElement('p'); body.textContent = text.body;
    var more = document.createElement('a'); more.href = text.path; more.textContent = text.privacy;
    var actions = document.createElement('div'); actions.className = 'tm-consent__actions';
    function button(label, handler) {
      var el = document.createElement('button'); el.type = 'button'; el.textContent = label;
      el.addEventListener('click', handler); return el;
    }
    accept = button(text.accept, function () { choose(true); });
    reject = button(text.reject, function () { choose(false); });
    close = button(text.close, hide); close.className = 'tm-consent__close';
    actions.appendChild(accept); actions.appendChild(reject); actions.appendChild(close);
    banner.appendChild(heading); banner.appendChild(body); banner.appendChild(more); banner.appendChild(actions);
    document.body.appendChild(banner);
    var footer = document.createElement('div'); footer.className = 'tm-privacy-links';
    prefs = button(text.prefs, show);
    var policy = document.createElement('a'); policy.href = text.path; policy.textContent = text.privacy;
    footer.appendChild(prefs); footer.appendChild(policy); document.body.appendChild(footer);
    banner.addEventListener('keydown', function (event) { if (event.key === 'Escape' && read()) hide(); });
    var choice = read();
    apply(choice);
    if (!choice) { banner.hidden = false; close.hidden = true; }
    window.addEventListener('storage', function (event) {
      if (event.key !== KEY && event.key !== null) return;
      var updated = read(); apply(updated); banner.hidden = !!updated; close.hidden = !updated;
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
