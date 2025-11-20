// Standalone case detail translations
(function(){
  const LANG_KEY = 'trendLang';
  const CASE_COPY = {
    prontoled: {
      es: {
        pageTitle: "TrendMakers · Caso Prontoled",
        eyebrow: "Caso de éxito · Prontoled",
        title: "Retargeting dinámico y nurturing con IA",
        summary: "Encendimos la demanda directa con un mix creativo + performance sin fricción. Diagnosticamos el funnel B2B y conectamos automatizaciones para responder, priorizar y nutrir cada lead en segundos.",
        hook: "Creatividad, automatización y media para ventas directas.",
        subtitle: "Prontoled · Retargeting dinámico y nurturing con IA",
        body: "Diagnosticamos su funnel B2B, reescribimos cada pauta clave y conectamos campañas full-funnel con flujos de WhatsApp y CRM. Mientras el media mix traía tráfico caliente, un set de automatizaciones contestaba en segundos, priorizaba leads y nutría hasta la venta.",
        stats: [
          "ventas online en 90 días",
          "leads calificados vs. trimestre anterior",
          "tiempo promedio de primera respuesta"
        ],
        stackValue: "Meta + Google Performance Max · HubSpot · Flujos IA",
        cta: "Quiero un caso así",
        back: "Volver a Casos de Éxito"
      },
      en: {
        pageTitle: "TrendMakers · Prontoled Case Study",
        eyebrow: "Success Story · Prontoled",
        title: "Dynamic retargeting and AI-powered nurturing",
        summary: "We ignited direct demand with a frictionless creative + performance mix. We diagnosed their B2B funnel and connected automation to answer, prioritize, and nurture every lead in seconds.",
        hook: "Creativity, automation, and media aligned to drive direct sales.",
        subtitle: "Prontoled · Dynamic retargeting & AI nurturing",
        body: "We rewrote every key campaign, linked full-funnel media with WhatsApp and CRM flows, and let an automation layer respond in seconds, score leads, and keep nurturing until the sale closed.",
        stats: [
          "online sales in 90 days",
          "qualified leads vs. prior quarter",
          "average first-response time"
        ],
        stackValue: "Meta + Google Performance Max · HubSpot · AI flows",
        cta: "I want a case like this",
        back: "Back to Success Stories"
      }
    },
    letratec: {
      es: {
        pageTitle: "TrendMakers · Caso Letratec",
        eyebrow: "Caso de éxito · Letratec",
        title: "Website modular + growth sprints para Letratec",
        summary: "Reconstruimos la presencia digital desde cero con una arquitectura SEO sólida, un sitio ligero en Jamstack y sprints de growth que empujaron cada cotización sin inflar el presupuesto.",
        hook: "Reconstruimos la presencia digital de cero con foco en autoridad y conversión.",
        subtitle: "Letratec · Website modular + growth sprints",
        body: "Diseñamos una arquitectura de contenidos orientada a SEO técnico, lanzamos una web liviana en Jamstack y activamos campañas always-on conectadas al pipeline comercial. Cada sprint cerraba con experimentos CRO para empujar cotizaciones sin inflar el presupuesto.",
        stats: [
          "facturación intermensual",
          "sesiones orgánicas en 60 días",
          "tasa de cierre en leads asistidos"
        ],
        stackValue: "Next.js · GA4 · Search Ads · Tableros Looker",
        cta: "Hablemos del proyecto",
        back: "Volver a Casos de Éxito"
      },
      en: {
        pageTitle: "TrendMakers · Letratec Case Study",
        eyebrow: "Success Story · Letratec",
        title: "Modular website + growth sprints for Letratec",
        summary: "We rebuilt their digital presence from scratch with a solid SEO architecture, a lightweight Jamstack site, and growth sprints that pushed every quote without inflating spend.",
        hook: "Authority, performance, and operations connected in one playbook.",
        subtitle: "Letratec · Modular website + growth sprints",
        body: "We engineered SEO-first content, shipped a blazing-fast Jamstack site, and ran always-on campaigns tied to their commercial pipeline. Each sprint ended with CRO experiments to keep quotes scaling efficiently.",
        stats: [
          "month-over-month revenue",
          "organic sessions in 60 days",
          "close rate on assisted leads"
        ],
        stackValue: "Next.js · GA4 · Search Ads · Looker dashboards",
        cta: "Let's talk about your project",
        back: "Back to Success Stories"
      }
    },
    vcg: {
      es: {
        pageTitle: "TrendMakers · Caso VcG Imagen",
        eyebrow: "Caso de éxito · VcG Imagen",
        title: "Performance creativo 360° para VcG Imagen",
        summary: "Activamos demanda constante con cápsulas motion, inteligencia de audiencias y workflows que nutrían a ventas con prioridad real en segundos.",
        hook: "Activamos demanda constante con contenido motion e inteligencia de audiencias.",
        subtitle: "VcG Imagen · Performance creativo 360°",
        body: "Creamos cápsulas audiovisuales pensadas para el scroll, testeamos creativos con modelos MMM livianos y automatizamos nurturing en etapas para no saturar. El equipo de ventas recibía alertas con scoring en tiempo real para priorizar oportunidades calientes.",
        stats: [
          "tasa de conversión en leads calificados",
          "brand lift recordado espontáneo",
          "workflows de nurturing multicanal"
        ],
        stackValue: "Meta Reels · YouTube · Data Studio · Zapier",
        cta: "Planifiquemos tu caso",
        back: "Volver a Casos de Éxito"
      },
      en: {
        pageTitle: "TrendMakers · VcG Imagen Case Study",
        eyebrow: "Success Story · VcG Imagen",
        title: "360° creative performance for VcG Imagen",
        summary: "We activated constant demand with motion capsules, audience intelligence, and workflows that kept sales focused on the hottest opportunities.",
        hook: "Scroll-stopping creative plus automation to prioritize hot leads.",
        subtitle: "VcG Imagen · 360° creative performance",
        body: "We produced motion content made for the feed, tested creatives with lightweight MMM models, and automated staged nurturing so audiences never felt saturated. Sales got real-time alerts with lead scoring to jump on the hottest deals.",
        stats: [
          "conversion rate on qualified leads",
          "brand lift in spontaneous recall",
          "multichannel nurturing workflows"
        ],
        stackValue: "Meta Reels · YouTube · Data Studio · Zapier",
        cta: "Let's plan your case",
        back: "Back to Success Stories"
      }
    }
  };

  function persistLang(lang){
    try { localStorage.setItem(LANG_KEY, lang); } catch(e){ /* noop */ }
  }
  function getLangFromRequest(){
    try {
      var params = new URLSearchParams(window.location.search);
      var q = params.get('lang');
      if (q) return q.toLowerCase();
    } catch(e){ /* noop */ }
    try {
      var stored = localStorage.getItem(LANG_KEY);
      if (stored) return stored.toLowerCase();
    } catch(e){ /* noop */ }
    return null;
  }
  function setHtmlLang(lang){
    document.documentElement.setAttribute('lang', (lang === 'en') ? 'en' : 'es');
  }
  function applyCaseLanguage(caseKey, lang){
    var pack = CASE_COPY[caseKey];
    if (!pack) return;
    var copy = pack[lang] || pack.es;
    var assign = function(id, value){
      var node = document.getElementById(id);
      if (node && value !== undefined) node.innerHTML = value;
    };
    assign('case-back-link', copy.back);
    assign('case-eyebrow', copy.eyebrow);
    assign('case-title', copy.title);
    assign('case-summary', copy.summary);
    assign('case-hook', copy.hook);
    assign('case-subtitle', copy.subtitle);
    assign('case-body', copy.body);
    var stats = copy.stats || [];
    stats.forEach(function(text, index){
      assign('stat' + (index + 1) + '-text', text);
    });
    assign('stack-label', 'Stack:');
    assign('stack-value', copy.stackValue);
    assign('case-cta', copy.cta);
    var cta = document.getElementById('case-cta');
    if (cta) cta.setAttribute('href', 'index.html#contact-form');
    var back = document.getElementById('case-back-link');
    if (back) back.setAttribute('href', 'index.html#casos-exito');
    if (copy.pageTitle) document.title = copy.pageTitle;
    setHtmlLang(lang);
    persistLang(lang);
  }

  function setupStatCounters(){
    var counters = document.querySelectorAll('.case-detail-stats .stat-counter');
    if (!counters.length) return;

    counters.forEach(function(counter){
      var raw = counter.textContent.trim();
      var match = raw.match(/^([^0-9+\-]*)([+\-]?)([\d.,]+)(.*)$/);
      if (!match) return;
      var prefix = (match[1] || '') + (match[2] || '');
      var numberPart = match[3] || '0';
      var suffix = match[4] || '';
      var decimals = 0;
      if (numberPart.indexOf('.') !== -1) {
        decimals = numberPart.split('.')[1].length;
      } else if (numberPart.indexOf(',') !== -1) {
        decimals = numberPart.split(',')[1].length;
      }
      counter.dataset.prefix = prefix;
      counter.dataset.suffix = suffix;
      counter.dataset.value = numberPart.replace(',', '.');
      counter.dataset.decimals = decimals;
      counter.textContent = prefix + '0' + suffix;
    });

    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        var el = entry.target;
        if (entry.isIntersecting) {
          startAnimation(el);
        } else {
          resetCounter(el);
        }
      });
    }, { threshold: 0.65 });

    counters.forEach(function(counter){ observer.observe(counter); });

    function startAnimation(el){
      if (el.dataset.animating === 'true') return;
      el.dataset.animating = 'true';
      var target = parseFloat(el.dataset.value || '0');
      var decimals = parseInt(el.dataset.decimals || '0', 10);
      var prefix = el.dataset.prefix || '';
      var suffix = el.dataset.suffix || '';
      var start = null;
      var duration = 1600;

      function step(timestamp){
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var value = target * progress;
        el.textContent = prefix + formatNumber(value, decimals) + suffix;
        if (progress < 1) {
          el._raf = requestAnimationFrame(step);
        } else {
          el.dataset.animating = 'false';
          el.textContent = prefix + formatNumber(target, decimals) + suffix;
        }
      }

      el._raf = requestAnimationFrame(step);
    }

    function resetCounter(el){
      if (el._raf) {
        cancelAnimationFrame(el._raf);
        el._raf = null;
      }
      el.dataset.animating = 'false';
      el.textContent = (el.dataset.prefix || '') + '0' + (el.dataset.suffix || '');
    }

    function formatNumber(value, decimals){
      if (decimals > 0) {
        return value.toFixed(decimals);
      }
      return Math.round(value).toString();
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    var body = document.body;
    if (!body || !body.classList.contains('case-detail-page')) return;
    var caseKey = body.getAttribute('data-case');
    if (!caseKey) return;
    var lang = getLangFromRequest() || 'es';
    if (lang !== 'es' && lang !== 'en') lang = 'es';
    applyCaseLanguage(caseKey, lang);
    setupStatCounters();
    document.querySelectorAll('.lang-option').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.preventDefault();
        var newLang = this.getAttribute('data-lang') || 'es';
        var currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('lang', newLang);
        window.location.href = currentUrl.toString();
      });
    });
  });
})();
