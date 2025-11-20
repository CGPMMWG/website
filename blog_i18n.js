(function(){
  const blogCopy = {
    es: {
      kicker: "Marketing · Datos · Automatización",
      title: "Conocé nuestro blog",
      subtitle: "Aprendé con nuestros especialistas los errores más comunes y cómo evitarlos con datos y automatización.",
      meta: "Por TrendMakers · 19/11/2025",
      eyebrow: "Artículo destacado",
      articleTitle: "9 errores de marketing que frenan a cualquier negocio (y cómo evitarlos)",
      excerpt: "En un mercado donde todas las marcas publican, diseñan, suben historias y hacen ads, la diferencia real no está en hacer más, sino en hacer mejor.",
      cta: "Leer artículo",
      stat1: "De los usuarios juzga la credibilidad por el diseño visual",
      stat2: "De ingresos al mantener identidad consistente",
      stat3: "De interacción al publicar sin objetivo",
      stat4: "Más leads con un calendario estratégico",
      stat5: "No vuelve a un sitio con mala experiencia",
      stat6: "Conversiones con CTA claro",
      stat7: "Crecimiento con inversión constante en anuncios",
      stat8: "Del presupuesto se desperdicia por mala segmentación"
    },
    en: {
      kicker: "Marketing · Data · Automation",
      title: "Explore our blog",
      subtitle: "Learn the most common mistakes from our specialists and how to avoid them with data and automation.",
      meta: "By TrendMakers — Marketing, Data & Automation · 11/19/2025",
      eyebrow: "Featured article",
      articleTitle: "9 Marketing Mistakes That Block Business Growth (and How to Avoid Them)",
      excerpt: "In a market where every brand posts, designs, uploads stories, and runs ads, the real difference isn’t doing more — it’s doing better. Most small businesses don’t fail because of a lack of effort, but because of marketing decisions that unknowingly slow them down. At TrendMakers, we’ve gathered the nine most common mistakes we see across businesses of all sizes — and how to avoid them to accelerate growth.",
      cta: "Read article",
      stat1: "Of users judge credibility by visual design",
      stat2: "Revenue uplift from a consistent identity",
      stat3: "Drop in engagement when posting without a goal",
      stat4: "More leads with a strategic content calendar",
      stat5: "Do not return to a site after a bad experience",
      stat6: "Conversion lift with a clear CTA",
      stat7: "Growth with consistent ad investment",
      stat8: "Of the budget is wasted by poor targeting"
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
