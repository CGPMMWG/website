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
    return settings.enabled === true && settings.measurementMode === 'manual-pageviews-with-enhanced-events';
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

  function track(name, category) {
    var categories = {
      contact_click: ['whatsapp', 'email', 'calendar', 'phone'],
      outbound_click: ['linkedin', 'instagram', 'external'],
      form_start: ['contact'], form_submit_attempt: ['contact'],
      generate_lead: ['contact'], form_submit_error: ['network', 'rate_limit', 'server'],
      site_search: ['internal']
    };
    if (!allowed || !configured || window['ga-disable-' + id] || !categories[name] || categories[name].indexOf(category) === -1) return false;
    window.gtag('event', name, {
      send_to: id, interaction_category: category,
      page_location: cleanLocation(), page_referrer: '', page_title: cleanPath(),
      transport_type: 'beacon'
    });
    return true;
  }
  window.TrendMakersAnalytics = {
    track: track,
    setConsent: function (value) { if (value === true) return grant(); revoke(); return false; },
    status: function () { return {measurementId: id, prerequisitesReady: ready(), consentGranted: allowed, configured: configured, pageViewSent: sent}; }
  };
})();
/* First-party consent UI. Analytics remains gated by the verified GA4 setting. */
(function () {
  'use strict';
  if (window.TrendMakersConsent) return;
  var consentRoot = new URL('../', document.currentScript.src);
  var KEY = 'tm.analytics.consent.v1';
  var AGE = 180 * 24 * 60 * 60 * 1000;
  window.TM_GA4_SETTINGS = {enabled: true, measurementMode: 'manual-pageviews-with-enhanced-events'};
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
    style.rel = 'stylesheet'; style.href = new URL('css/consent.css?v=20261014-local-paths', consentRoot).href;
    document.head.appendChild(style);
    banner = document.createElement('section');
    banner.className = 'tm-consent'; banner.hidden = true;
    banner.setAttribute('role', 'region'); banner.setAttribute('aria-label', text.title);
    var heading = document.createElement('h2'); heading.textContent = text.title;
    var body = document.createElement('p'); body.textContent = text.body;
    var more = document.createElement('a'); more.href = new URL(text.path.replace(/^\//, ''), consentRoot).href; more.textContent = text.privacy;
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
    var policy = document.createElement('a'); policy.href = new URL(text.path.replace(/^\//, ''), consentRoot).href; policy.textContent = text.privacy;
    var legal = document.createElement('div'); legal.className = 'tm-footer-legal';
    legal.appendChild(prefs); legal.appendChild(policy);
    footer.appendChild(legal); document.body.appendChild(footer);
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

/* Safe interaction events and confirmed Formspree submissions. */
(function () {
  'use strict';
  if (window.__tmInteractionsInstalled) return;
  window.__tmInteractionsInstalled = true;
  var started = new WeakSet();
  var pending = new WeakSet();
  function emit(name, category) { return window.TrendMakersAnalytics.track(name, category); }
  function classify(href) {
    try {
      var url = new URL(href, location.href);
      if (url.protocol === 'mailto:') return ['contact_click', 'email'];
      if (url.protocol === 'tel:') return ['contact_click', 'phone'];
      if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
      if (['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].indexOf(url.hostname) !== -1) return ['contact_click', 'whatsapp'];
      if (url.hostname === 'calendly.com' || url.hostname.endsWith('.calendly.com')) return ['contact_click', 'calendar'];
      if (url.origin === location.origin) return null;
      if (url.hostname === 'linkedin.com' || url.hostname.endsWith('.linkedin.com')) return ['outbound_click', 'linkedin'];
      if (url.hostname === 'instagram.com' || url.hostname.endsWith('.instagram.com')) return ['outbound_click', 'instagram'];
      return ['outbound_click', 'external'];
    } catch (_) { return null; }
  }
  function contactForm(form) {
    return form && form.tagName === 'FORM' && form.method.toLowerCase() === 'post' &&
      form.action === 'https://formspree.io/f/xyzwvwop';
  }
  document.addEventListener('click', function (event) {
    if (event.button !== 0) return;
    var anchor = event.target.closest && event.target.closest('a[href]');
    var category = anchor && classify(anchor.href);
    if (category) emit(category[0], category[1]);
  }, true);
  document.addEventListener('focusin', function (event) {
    var form = event.target.closest && event.target.closest('form');
    if (contactForm(form) && !started.has(form) && emit('form_start', 'contact')) started.add(form);
  });
  document.addEventListener('submit', function (event) {
    var form = event.target;
    if (form.matches && form.matches('form[role="search"]')) emit('site_search', 'internal');
    if (!contactForm(form) || !window.fetch || !window.FormData || !window.AbortController || event.defaultPrevented) return;
    event.preventDefault();
    if (pending.has(form)) return;
    pending.add(form);
    if (!started.has(form) && emit('form_start', 'contact')) started.add(form);
    emit('form_submit_attempt', 'contact');
    var en = document.documentElement.lang === 'en';
    var controls = Array.from(form.querySelectorAll('button[type="submit"], input[type="submit"]'));
    var previous = controls.map(function (button) { return button.disabled; });
    var status = form.querySelector('.tm-form-status');
    if (!status) {
      status = document.createElement('p'); status.className = 'tm-form-status';
      status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
      form.appendChild(status);
    }
    status.textContent = en ? 'Sending your request…' : 'Enviando tu consulta…';
    form.setAttribute('aria-busy', 'true');
    var data = new FormData(form);
    if (event.submitter && event.submitter.name) data.append(event.submitter.name, event.submitter.value);
    controls.forEach(function (button) { button.disabled = true; });
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, 30000);
    window.fetch(form.action, {
      method: 'POST', body: data, headers: {Accept: 'application/json'}, signal: controller.signal
    }).then(function (response) {
      if (!response.ok) {
        var failure = new Error('Submission failed');
        failure.category = response.status === 429 ? 'rate_limit' : 'server';
        throw failure;
      }
      return response.json();
    }).then(function (result) {
      if (result.ok !== true) { var error = new Error('Unconfirmed submission'); error.category = 'server'; throw error; }
      emit('generate_lead', 'contact');
      status.textContent = en ? 'Your request was sent successfully. Thank you!' : 'Tu consulta se envió correctamente. ¡Gracias!';
      form.reset(); started.delete(form);
    }).catch(function (error) {
      var category = error.category || 'network';
      emit('form_submit_error', category);
      status.textContent = category === 'rate_limit'
        ? (en ? 'Too many requests. Please wait a few minutes and try again.' : 'Hubo demasiados envíos. Esperá unos minutos y volvé a intentarlo.')
        : (en ? 'We could not confirm delivery. Your details are preserved. Check your connection or contact info@trendmakers.agency.' : 'No pudimos confirmar el envío. Conservamos tus datos. Revisá tu conexión o escribinos a info@trendmakers.agency.');
    }).finally(function () {
      clearTimeout(timer); pending.delete(form); form.removeAttribute('aria-busy');
      controls.forEach(function (button, index) { button.disabled = previous[index]; });
    });
  });
})();
