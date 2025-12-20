// Lightweight i18n for equipo.html (ES/EN)
(function(){
  const copy = {
    es: {
      heroTitle: "Personas que hacen que todo funcione",
      heroTagline: "Estrategas, creativos, científicos de datos, tecnólogos y ejecutores trabajando como un solo equipo para escalar tu marca.",
      heading: "Nuestro equipo",
      subtitle: "Talento multidisciplinario para estrategia, datos, tecnología y ejecución.",
      back: "&#8592; Volver",
      credHeading: "Sumate a nuestro equipo",
      credTitle: "¿Te interesa trabajar con nosotros?",
      credText: "En TrendMakers buscamos profesionales con experiencia que quieran formar parte de una agencia de marketing y tecnología que opera con estándares de calidad a nivel internacional.<br><br>Trabajamos con procesos claros, enfoque en datos y una cultura colaborativa, acompañando el crecimiento de marcas que buscan escalar de manera sostenible. Si tenés experiencia en marketing, datos, tecnología, diseño o áreas afines y te motiva crecer en un entorno dinámico, profesional y en constante evolución, nos interesa conocerte.",
      credEmail: "talent@trendmakers.agency",
      cards: [
        ["Consultores en Marketing", "Diseñan roadmaps y definen objetivos de negocio medibles."],
        ["Diseñadores UX/UI, Gráficos y Multimedia", "Construyen experiencias visuales consistentes y orientadas a conversión."],
        ["Analistas de Datos", "Transforman métricas en decisiones accionables y dashboards en tiempo real."],
        ["Especialistas en Campañas Digitales", "Operan y optimizan medios para maximizar ROAS y volumen de leads."],
        ["Desarrolladores Web", "Implementan sitios y productos digitales de alto rendimiento y seguridad."],
        ["Especialistas en SEO", "Escalan visibilidad orgánica con contenido, técnica y autoridad."],
        ["Especialistas en Business Intelligence", "Modelan datos para detectar oportunidades y priorizar decisiones."],
        ["Community Managers", "Gestionan comunidades y reputación para impulsar engagement."]
      ],
      ctaTitle: "¿Listo para sumar a este equipo a tu crecimiento?",
      ctaText: "Contanos tu proyecto y te proponemos un plan con especialistas dedicados.",
      ctaButton: "Hablemos"
    },
    en: {
      heroTitle: "The people who make everything work",
      heroTagline: "We drive your business growth through marketing, data analysis, automation, and artificial intelligence.",
      heading: "Our Team",
      subtitle: "Multidisciplinary talent across strategy, data, technology, and execution.",
      back: "&#8592; Back",
      credHeading: "Join our team",
      credTitle: "Interested in working with us?",
      credText: "At TrendMakers, we are looking for experienced professionals who want to be part of a marketing and technology agency operating under international quality standards.<br><br>We work with clear processes, a data-driven mindset, and a collaborative culture, supporting the sustainable growth of ambitious brands. If you have experience in marketing, data, technology, design, or related fields and are motivated to grow within a dynamic, professional, and evolving environment, we’d love to hear from you.",
      credEmail: "talent@trendmakers.agency",
      cards: [
        ["Marketing Consultants", "Design roadmaps and define measurable business objectives."],
        ["UX/UI, Graphic & Multimedia Designers", "Build consistent, conversion-focused visual experiences."],
        ["Data Analysts", "Turn metrics into actionable insights and real-time dashboards."],
        ["Digital Campaign Specialists", "Manage and optimize media to maximize ROAS and lead volume."],
        ["Web Developers", "Deliver high-performance, secure websites and digital products."],
        ["SEO Specialists", "Scale organic visibility through content, technical optimization, and authority."],
        ["Business Intelligence Specialists", "Model data to identify opportunities and prioritize decisions."],
        ["Community Managers", "Manage communities and brand reputation to drive engagement."]
      ],
      ctaTitle: "Ready to add this team to your growth?",
      ctaText: "Tell us about your project and we’ll propose a plan with dedicated specialists.",
      ctaButton: "Let’s talk"
    }
  };

  const ids = {
    heroTitle: "team-hero-title",
    heroTagline: "team-hero-tagline",
    heading: "team-heading",
    subtitle: "team-subtitle",
    backBtn: "team-back-btn",
    ctaTitle: "team-cta-title",
    ctaText: "team-cta-text",
    ctaButton: "team-cta-button",
    credTitle: "team-cred-title",
    credText: "team-cred-text",
    credEmail: "team-cred-email",
    credHeading: "team-cred-heading"
  };

  function setText(id, text){
    const el = document.getElementById(id);
    if (el && text !== undefined) el.innerHTML = text;
  }

  function applyTeamLang(lang){
    const l = (lang === "en") ? "en" : "es";
    const t = copy[l];
    if (!t) return;

    setText(ids.heroTitle, t.heroTitle);
    setText(ids.heroTagline, t.heroTagline);
    setText(ids.heading, t.heading);
    setText(ids.subtitle, t.subtitle);

    t.cards.forEach((pair, idx) => {
      const [title, body] = pair;
      setText(`team-card${idx+1}-title`, title);
      setText(`team-card${idx+1}-text`, body);
    });

    setText(ids.ctaTitle, t.ctaTitle);
    setText(ids.ctaText, t.ctaText);
    setText(ids.ctaButton, t.ctaButton);
    setText(ids.backBtn, t.back);
    setText(ids.credTitle, t.credTitle);
    setText(ids.credText, t.credText);
    setText(ids.credHeading, t.credHeading);
    const email = document.getElementById(ids.credEmail);
    if (email) {
      email.innerHTML = t.credEmail;
      email.setAttribute("href", "mailto:" + t.credEmail);
    }
  }

  // Apply on initial load
  document.addEventListener("DOMContentLoaded", function(){
    const initial = (typeof getRequestedLanguage === "function" && getRequestedLanguage()) || "es";
    applyTeamLang(initial);
  });

  // Hook into global setLanguage if present
  if (typeof window !== "undefined" && typeof window.setLanguage === "function" && !window.__teamLangWrapped){
    const _orig = window.setLanguage;
    window.setLanguage = function(lang){
      _orig(lang);
      applyTeamLang(lang);
    };
    window.__teamLangWrapped = true;
  } else if (typeof window !== "undefined" && !window.setLanguage) {
    // Fallback: expose minimal setter
    window.setLanguage = function(lang){ applyTeamLang(lang); };
  }
})();
