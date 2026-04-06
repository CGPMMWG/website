// Standalone case detail translations
(function () {
  const LANG_KEY = "trendLang";

  const CASE_COPY = {
    prontoled: {
      es: {
        pageTitle: "TrendMakers · Caso Prontoled",
        eyebrow: "Caso de éxito · Prontoled",
        title: "Email Marketing & Automation",
        summary:
          "Encendimos la demanda directa con un mix creativo + performance sin fricción. Diagnosticamos el funnel B2B y conectamos automatizaciones para responder, priorizar y nutrir cada lead en segundos.",
        hook: "Creatividad, automatización y media para ventas directas.",
        subtitle: "Prontoled · Retargeting dinámico y nurturing con IA",
        body: "Activamos su base de clientes con una estrategia de email marketing enfocada en conversión. Segmentamos audiencias, diseñamos campañas promocionales y automatizamos flujos de reactivación y recompra.Mientras el canal captaba demanda, un sistema de emails nutría leads, impulsaba pedidos recurrentes y mantenía activa la relación comercial.",
        stats: [
          "ventas online en 90 días",
          "leads calificados vs. trimestre anterior",
          "tiempo promedio de primera respuesta",
        ],
        stackValue: "Meta + Google Performance Max · HubSpot · Flujos IA",
        cta: "Quiero un caso así",
        back: "Volver a Casos de Éxito",
      },
      en: {
        pageTitle: "TrendMakers · Prontoled Case Study",
        eyebrow: "Success Story · Prontoled",
        title: "Email Marketing & Automation",
        summary:
          "We ignited direct demand with a frictionless creative + performance mix. We diagnosed their B2B funnel and connected automation to answer, prioritize, and nurture every lead in seconds.",
        hook: "Creativity, automation, and media aligned to drive direct sales.",
        subtitle: "Prontoled · Dynamic retargeting & AI nurturing",
        body: "We activated their customer database through a conversion-focused email marketing strategy. We segmented audiences, designed promotional campaigns, and built automated flows for reactivation and repeat purchases. While the channel captured demand, a structured email system nurtured leads, increased recurring orders, and kept the commercial pipeline active.",
        stats: [
          "online sales in 90 days",
          "qualified leads vs. prior quarter",
          "average first-response time",
        ],
        stackValue: "Meta + Google Performance Max · HubSpot · AI flows",
        cta: "I want a case like this",
        back: "Back to Success Stories",
      },
    },
    letratec: {
      es: {
        pageTitle: "TrendMakers · Caso Letratec",
        eyebrow: "Caso de éxito · Letratec",
        title: "Website modular + growth sprints para Letratec",
        summary:
          "Reconstruimos la presencia digital desde cero con una arquitectura SEO sólida, un sitio ligero en Jamstack y sprints de growth que empujaron cada cotización sin inflar el presupuesto.",
        hook: "Reconstruimos la presencia digital de cero con foco en autoridad y conversión.",
        subtitle: "Letratec · Website modular + growth sprints",
        body: "Estructuramos una arquitectura de contenidos basada en SEO técnico y desarrollamos un sitio web de alto rendimiento, optimizado para posicionamiento orgánico y conversión. Las campañas always-on se integraron directamente con el pipeline comercial. Cada sprint se enfocó en experimentación CRO, logrando aumentos sostenidos en cotizaciones calificadas y mejoras en eficiencia sin incrementar el gasto en medios.",
        stats: [
          "facturación intermensual",
          "sesiones orgánicas en 60 días",
          "tasa de cierre en leads asistidos",
        ],
        stackValue: "Next.js · GA4 · Search Ads · Tableros Looker",
        cta: "Hablemos del proyecto",
        back: "Volver a Casos de Éxito",
      },
      en: {
        pageTitle: "TrendMakers · Letratec Case Study",
        eyebrow: "Success Story · Letratec",
        title: "Modular website + growth sprints for Letratec",
        summary:
          "We rebuilt their digital presence from scratch with a solid SEO architecture, a lightweight Jamstack site, and growth sprints that pushed every quote without inflating spend.",
        hook: "Authority, performance, and operations connected in one playbook.",
        subtitle: "Letratec · Modular website + growth sprints",
        body: "We structured a content architecture based on technical SEO and developed a high-performance website optimized for organic visibility and conversion. Always-on campaigns were directly integrated into the commercial pipeline. Each sprint focused on CRO experimentation, achieving sustained increases in qualified quotes and improvements in efficiency without increasing media spend.",
        stats: [
          "month-over-month revenue",
          "organic sessions in 60 days",
          "close rate on assisted leads",
        ],
        stackValue: "Next.js · GA4 · Search Ads · Looker dashboards",
        cta: "Let's talk about your project",
        back: "Back to Success Stories",
      },
    },
    vcg: {
      es: {
        pageTitle: "TrendMakers · Caso GP Consultora",
        eyebrow: "Caso de éxito · GP Consultora",
        title: "Performance creativo 360° para GP Consultora",
        summary:
          ".",
        hook: "Diseño de marca y web design con foco en identidad, narrativa y experiencia.",
        subtitle: "GP Consultora · Performance creativo 360°",
        body: "Diseñamos y desarrollamos la identidad de marca y el sitio web, construyendo una experiencia visual coherente, funcional y pensada para convertir. Desde el  branding hasta la ejecución digital, cada decisión respondió a una estrategia clara de posicionamiento y crecimiento.",
        stats: [
          "Contactos el primer mes",
          "brand lift recordado espontáneo",
          "De la idea al lanzamiento en 30 días",
        ],
        stackValue: "VS Code · UX · Data Studio · UI",
        cta: "Quiero un caso asi",
        back: "Volver a Casos de Éxito",
      },
      en: {
        pageTitle: "TrendMakers · GP Consultora Case Study",
        eyebrow: "Success Story · GP Consultats",
        title: "360° creative performance for GP Consultants",
        summary:
          "We build brand identity and web experiences to position, communicate, and convert.",
        hook: "Branding and web aligned with a clear positioning and growth strategy.",
        subtitle: "GP Consultants · 360° creative performance",
        body: "We designed and developed the brand identity and website, creating a cohesive, functional visual experience built to convert. From branding to digital execution, every decision was driven by a clear positioning and growth strategy.",
        stats: [
          "Contacts in the first month",
          "Spontaneous brand recall lift",
          "From concept to launch in 30 days",
        ],
        stackValue: "VS Code · UX · Data Studio · UI",
        cta: "Let's plan your case",
        back: "Back to Success Stories",
      },
    },
  };

  const NAV_TEXT = {
    es: {
      inicio: "Inicio",
      servicios: "Nuestros Servicios",
      problema: "Contanos tu Proyecto",
      equipo: "Nuestro Equipo",
      acerca: "Por que elegirnos",
      casos: "Casos de exito",
      blog: "Blog",
      contacto: "Contacto",
    },
    en: {
      inicio: "Home",
      servicios: "Our Services",
      problema: "Tell Us Your Project",
      equipo: "Our Team",
      acerca: "About us",
      casos: "Success Stories",
      blog: "Blog",
      contacto: "Contact",
    },
  };

  let CURRENT_CASE_KEY = null;

  function persistLang(lang) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {
      /* noop */
    }
  }

  function getLangFromRequest() {
    try {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("lang");
      if (q) return q.toLowerCase();
    } catch (e) {
      /* noop */
    }
    try {
      const stored = localStorage.getItem(LANG_KEY);
      if (stored) return stored.toLowerCase();
    } catch (e) {
      /* noop */
    }
    return null;
  }

  function setHtmlLang(lang) {
    document.documentElement.setAttribute("lang", lang === "en" ? "en" : "es");
  }

  function applyCaseLanguage(caseKey, lang) {
    const pack = CASE_COPY[caseKey];
    if (!pack) return;
    CURRENT_CASE_KEY = caseKey;
    const copy = pack[lang] || pack.es;
    const assign = function (id, value) {
      const node = document.getElementById(id);
      if (node && value !== undefined) node.innerHTML = value;
    };
    assign("case-back-link", copy.back);
    assign("case-eyebrow", copy.eyebrow);
    assign("case-title", copy.title);
    assign("case-summary", copy.summary);
    assign("case-hook", copy.hook);
    assign("case-subtitle", copy.subtitle);
    assign("case-body", copy.body);
    const stats = copy.stats || [];
    stats.forEach(function (text, index) {
      assign("stat" + (index + 1) + "-text", text);
    });
    assign("stack-label", "Stack:");
    assign("stack-value", copy.stackValue);
    assign("case-cta", copy.cta);
    const cta = document.getElementById("case-cta");
    if (cta) cta.setAttribute("href", "index.html#contact-form");
    const back = document.getElementById("case-back-link");
    if (back) back.setAttribute("href", "index.html#casos-exito");
    if (copy.pageTitle) document.title = copy.pageTitle;

    const navText = NAV_TEXT[lang] || NAV_TEXT.es;
    if (navText) {
      [
        ["nav-inicio", navText.inicio],
        ["nav-servicios", navText.servicios],
        ["nav-problema", navText.problema],
        ["nav-equipo", navText.equipo],
        ["nav-acerca", navText.acerca],
        ["nav-casos-exito", navText.casos],
        ["nav-blog", navText.blog],
        ["nav-blog-mobile", navText.blog],
        ["nav-contacto", navText.contacto],
        ["nav-contacto-mobile", navText.contacto],
      ].forEach(function (pair) {
        const node = document.getElementById(pair[0]);
        if (node) node.textContent = pair[1];
      });
    }

    // Normalize language labels to avoid encoding glitches in markup
    document.querySelectorAll('.lang-option').forEach(function(btn){
      const code = btn.getAttribute('data-lang');
      if (code === 'es') btn.textContent = 'Español';
      if (code === 'en') btn.textContent = 'English';
    });

    setHtmlLang(lang);
    persistLang(lang);
  }

  function changeLanguage(newLang) {
    let lang = (newLang || "es").toLowerCase();
    if (lang !== "en" && lang !== "es") lang = "es";
    if (!CURRENT_CASE_KEY) return;
    applyCaseLanguage(CURRENT_CASE_KEY, lang);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      window.history.replaceState(null, "", url.toString());
    } catch (e) {
      /* noop */
    }
  }

  function bindLangDropdown() {
    try {
      const sel = document.querySelector(".language-selector");
      if (!sel || sel.dataset.bound) return;
      const toggle = sel.querySelector(".lang-toggle");
      const menu = sel.querySelector(".lang-menu");
      const open = function (v) {
        sel.classList.toggle("open", !!v);
        if (toggle) toggle.setAttribute("aria-expanded", v ? "true" : "false");
      };
      if (toggle)
        toggle.addEventListener("click", function (e) {
          e.stopPropagation();
          open(!sel.classList.contains("open"));
        });
      if (menu)
        menu.querySelectorAll(".lang-option").forEach(function (btn) {
          btn.addEventListener("click", function (e) {
            e.preventDefault();
            const l = this.getAttribute("data-lang") || "es";
            changeLanguage(l);
            open(false);
          });
        });
      document.addEventListener("click", function () {
        open(false);
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") open(false);
      });
      sel.dataset.bound = "1";
    } catch (e) {
      /* noop */
    }
  }

  function setupStatCounters() {
    const counters = document.querySelectorAll(".case-detail-stats .stat-counter");
    if (!counters.length) return;

    counters.forEach(function (counter) {
      const raw = counter.textContent.trim();
      const match = raw.match(/^([^0-9+\-]*)([+\-]?)([\d.,]+)(.*)$/);
      if (!match) return;
      const prefix = (match[1] || "") + (match[2] || "");
      const numberPart = match[3] || "0";
      const suffix = match[4] || "";
      let decimals = 0;
      if (numberPart.indexOf(".") !== -1) {
        decimals = numberPart.split(".")[1].length;
      } else if (numberPart.indexOf(",") !== -1) {
        decimals = numberPart.split(",")[1].length;
      }
      counter.dataset.prefix = prefix;
      counter.dataset.suffix = suffix;
      counter.dataset.value = numberPart.replace(",", ".");
      counter.dataset.decimals = decimals;
      counter.textContent = prefix + "0" + suffix;
    });

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          const el = entry.target;
          if (entry.isIntersecting) {
            startAnimation(el);
          } else {
            resetCounter(el);
          }
        });
      },
      { threshold: 0.65 }
    );

    counters.forEach(function (counter) {
      observer.observe(counter);
    });

    function startAnimation(el) {
      if (el.dataset.animating === "true") return;
      el.dataset.animating = "true";
      const target = parseFloat(el.dataset.value || "0");
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      let start = null;
      const duration = 1600;

      function step(timestamp) {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const value = target * progress;
        el.textContent = prefix + formatNumber(value, decimals) + suffix;
        if (progress < 1) {
          el._raf = requestAnimationFrame(step);
        } else {
          el.dataset.animating = "false";
          el.textContent = prefix + formatNumber(target, decimals) + suffix;
        }
      }

      el._raf = requestAnimationFrame(step);
    }

    function resetCounter(el) {
      if (el._raf) {
        cancelAnimationFrame(el._raf);
        el._raf = null;
      }
      el.dataset.animating = "false";
      el.textContent = (el.dataset.prefix || "") + "0" + (el.dataset.suffix || "");
    }

    function formatNumber(value, decimals) {
      if (decimals > 0) {
        return value.toFixed(decimals);
      }
      return Math.round(value).toString();
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    if (!body || !body.classList.contains("case-detail-page")) return;
    const caseKey = body.getAttribute("data-case");
    if (!caseKey) return;
    let lang = getLangFromRequest() || "es";
    if (lang !== "es" && lang !== "en") lang = "es";
    applyCaseLanguage(caseKey, lang);
    setupStatCounters();
    bindLangDropdown();
  });
})();
