(function(){
  const blogCopy = {
    es: {
      kicker: "Marketing · Datos · Automatización",
      title: "Conocé nuestro blog",
      subtitle: "Aprendé con nuestros especialistas los errores más comunes y cómo evitarlos con datos y automatización.",
      meta: "Por TrendMakers · Marketing Automation & Growth · 2025",
      eyebrow: "Artículo destacado",
      articleTitle: "Marketing Automation & Growth: cómo dejar de perder leads",
      excerpt: "Conectá funnels, CRM, automatización y datos para dar seguimiento a cada lead y construir un sistema de crecimiento medible.",
      cta: "Leer artículo",
      stat1: "De los usuarios juzga la credibilidad por el diseño visual",
      stat2: "De ingresos al mantener identidad consistente",
      stat3: "De la interacción baja al publicar sin objetivo",
      stat4: "Más leads con un calendario estratégico",
      stat5: "No vuelve a un sitio con mala experiencia",
      stat6: "Conversiones con CTA claro",
      stat7: "Crecimiento con inversión constante en anuncios",
      stat8: "Del presupuesto se desperdicia por mala segmentación"
      ,moreKicker: "Seguir explorando"
      ,moreTitle: "Más ideas para empezar a crecer"
      ,moreAll: "Ver todos los artículos"
      ,mini1Meta: "Marketing · Estrategia"
      ,mini1Title: "Dejar de improvisar y crecer con un sistema"
      ,mini2Meta: "IA · Marketing"
      ,mini2Title: "Usar IA sin perder estrategia ni criterio"
      ,mini3Meta: "Web · E-Commerce"
      ,mini3Title: "Diseñar experiencias digitales que convierten"
    },
    en: {
      kicker: "Marketing · Data · Automation",
      title: "Explore our blog",
      subtitle: "Learn the most common mistakes from our specialists and how to avoid them with data and automation.",
      meta: "By TrendMakers · Marketing Automation & Growth · 2025",
      eyebrow: "Featured article",
      articleTitle: "Marketing Automation & Growth: Stop Losing Leads",
      excerpt: "Connect funnels, CRM, automation and data to follow up on every lead and build a measurable growth system.",
      cta: "Read article",
      stat1: "Of users judge credibility by visual design",
      stat2: "Revenue uplift from a consistent identity",
      stat3: "Drop in engagement when posting without a goal",
      stat4: "More leads with a strategic content calendar",
      stat5: "Do not return to a site after a bad experience",
      stat6: "Conversion lift with a clear CTA",
      stat7: "Growth with consistent ad investment",
      stat8: "Of the budget is wasted by poor targeting"
      ,moreKicker: "Keep exploring"
      ,moreTitle: "More ideas to grow your business"
      ,moreAll: "View all articles"
      ,mini1Meta: "Marketing · Strategy"
      ,mini1Title: "Stop improvising and grow with a system"
      ,mini2Meta: "AI · Marketing"
      ,mini2Title: "Use AI without losing strategy or judgment"
      ,mini3Meta: "Web · E-Commerce"
      ,mini3Title: "Design digital experiences that convert"
    }
  };

  function applyBlogCopy(lang){
    const t = blogCopy[lang] || blogCopy.es;
    const set = (id, val) => { const el = document.getElementById(id); if (el && val !== undefined) el.innerHTML = val; };
    set('blog-kicker', t.kicker);
    set('blog-title', t.title);
    set('blog-subtitle', t.subtitle);
    set('blog-meta', t.meta);
    set('blog-eyebrow', t.eyebrow);
    set('blog-article-title', t.articleTitle);
    set('blog-excerpt', t.excerpt);
    set('blog-cta', t.cta);
    set('blog-stat1', t.stat1);
    set('blog-stat2', t.stat2);
    set('blog-stat3', t.stat3);
    set('blog-stat4', t.stat4);
    set('blog-stat5', t.stat5);
    set('blog-stat6', t.stat6);
    set('blog-stat7', t.stat7);
    set('blog-stat8', t.stat8);
    set('home-blog-more-kicker', t.moreKicker);
    set('home-blog-more-title', t.moreTitle);
    set('home-blog-more-all', t.moreAll);
    set('home-blog-mini1-meta', t.mini1Meta);
    set('home-blog-mini1-title', t.mini1Title);
    set('home-blog-mini2-meta', t.mini2Meta);
    set('home-blog-mini2-title', t.mini2Title);
    set('home-blog-mini3-meta', t.mini3Meta);
    set('home-blog-mini3-title', t.mini3Title);
  }

  // Wrap setLanguage to sync blog copy
  if (typeof window.setLanguage === 'function' && !window.__blogLangWrapped){
    const _orig = window.setLanguage;
    window.setLanguage = function(lang){
      _orig(lang);
      applyBlogCopy((lang || 'es').toLowerCase());
    };
    window.__blogLangWrapped = true;
  }

  // Initial sync on load
  document.addEventListener('DOMContentLoaded', function(){
    let lang = 'es';
    try {
      if (typeof getLanguagePreference === 'function') {
        lang = getLanguagePreference() || 'es';
      }
    } catch(e){}
    applyBlogCopy((lang || 'es').toLowerCase());
  });
})();
