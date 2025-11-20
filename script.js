// Initialize touch service-card behavior (idempotent)
function initMobileServiceCards(){
  try {
    const cards = Array.from(document.querySelectorAll('#servicios .service-card'));
    if (!cards.length) return;

    const isTouch = () => (('ontouchstart' in window) || navigator.maxTouchPoints > 0 || window.matchMedia('(hover: none)').matches);
    const clearArmed = (except) => {
      cards.forEach((card) => {
        if (card === except) return;
        card.classList.remove('armed');
        delete card.dataset.armed;
      });
    };

    cards.forEach((card) => {
      if (card.dataset.tapBound === '1') return;

      card.addEventListener('click', () => {
        clearArmed();
        // Sin preventDefault: cualquier toque (desktop o móvil) sigue el enlace inmediatamente
      }, { passive: true });

      card.dataset.tapBound = '1';
    });

    if (!document.body.dataset.cardDeselectBound) {
      document.addEventListener('click', (evt) => {
        if (evt.target.closest && evt.target.closest('#servicios .service-card')) return;
        document.querySelectorAll('#servicios .service-card.armed').forEach((card) => {
          card.classList.remove('armed');
          delete card.dataset.armed;
        });
      });
      document.body.dataset.cardDeselectBound = '1';
    }
  } catch (e) { /* noop */ }
}
// Snapshot store for restoring original ES content
if (!window.__i18nOrig) window.__i18nOrig = { snapTaken: false, elems: {}, serviceDetailsHTML: '', teamDetailsHTML: '', detailGridHTML: '' };
const __orig = window.__i18nOrig;

function takeI18nSnapshot(){
  if (__orig.snapTaken) return;
  try {
    const ids = [
      'nav-inicio','nav-acerca','nav-servicios','nav-contacto','nav-equipo','nav-casos-exito','nav-problema',
      'intro-title','intro-text','about-title','about-text','services-title','services-text','team-title',
      'contact-title','schedule-call','show-popup','popup-title','label-email','label-problema','submit-button',
      'footer-text','about-us-text','label-name','label-company','label-project','submit-contact-form','contact-soon',
      'success-intro','success-title','success-case1','success-case2','success-case3',
      'detail-hero-title','detail-hero-text','detail-back-link',
      'blog-kicker','blog-title','blog-subtitle','blog-meta','blog-eyebrow','blog-article-title','blog-excerpt','blog-cta',
      'blog-stat1','blog-stat2','blog-stat3','blog-stat4','blog-stat5','blog-stat6','blog-stat7','blog-stat8'
    ];
    ids.forEach(id=>{ const el=document.getElementById(id); if(el) __orig.elems[id]=el.innerHTML; });
    const svc = document.querySelector('.service-details');
    if (svc) __orig.serviceDetailsHTML = svc.innerHTML;
    const team = document.querySelector('.team-details');
    if (team) __orig.teamDetailsHTML = team.innerHTML;
    const detailGrid = document.querySelector('.detail-grid');
    if (detailGrid) __orig.detailGridHTML = detailGrid.innerHTML;
    __orig.snapTaken = true;
  } catch(e) { /* noop */ }
}

const translations = {
    es: {
        title: "TrendMakers",
        subtitle: "Your digital Partner",
        navInicio: "Inicio",
        navAcerca: "¿Por qué elegirnos?",
        navServicios: "Nuestros Servicios",
        navContacto: "Agenda una Llamada",
        navEquipo: "Nuestro Equipo",
        navcasosexito: "Casos de éxito",
        introTitle: "Bienvenidos a TrendMakers",
        introText: "Ofrecemos soluciones de marketing digital personalizadas para tu negocio.",
        aboutTitle: "Acerca de Nosotros",
        aboutText: "Tomamos tu proyecto como si fuera nuestro.<br><br>Para eso empezamos por aprender y escuchar. Entendemos tu problemática y te presentamos recursos y acciones para llegar a donde quieres.<br><br>Somos ágiles y nos enfocamos en los resultados. Buscamos cumplir objetivos e ir por nuevos desafíos.<br><br>Lo hacemos combinando marketing digital, diseño, programación, IA y consultoría, de principio a fin. Desde que nos contactas hasta que funciona.",
        servicesTitle: "Nuestros Servicios",
        successtitle: "Casos de éxito",
        successIntro: "Algunos de nuestros casos de éxito:",
        successCase1: "Prontoled: Afectamos directamente la facturación con la implementación de automatizaciones de IA, gestión de anuncios y la realización de un plan exhaustivo de mercado que derivó en un plan de acción.",
        successCase2: "Letratec: Aumentamos la facturación en un 37% con la implementación de un plan de marketing digital, la creación de una página web y gestión de leads.",
        successCase3: "VcG Imagen: Automatizamos la nutrición de leads y optimizamos campañas de performance para duplicar la tasa de conversión en solo 60 días.",
        servicesText: "Ofrecemos una amplia gama de servicios de marketing digital...",
        closingCtaTitle: "¿Listo para llevar tu marca al próximo nivel?",
        blogKicker: "Marketing · Datos · Automatización",
        blogTitle: "Conocé nuestro blog",
        blogSubtitle: "Aprendé con nuestros especialistas los errores más comunes y cómo evitarlos con datos y automatización.",
        blogMeta: "Por TrendMakers · 19/11/2025",
        blogEyebrow: "Artículo destacado",
        blogArticleTitle: "9 errores de marketing que frenan a cualquier negocio (y cómo evitarlos)",
        blogExcerpt: "En un mercado saturado, la diferencia no está en publicar más sino en hacerlo estratégicamente. Conocé los 9 fallos que vemos en negocios reales y cómo evitarlos.",
        blogCta: "Leer artículo",
        blogStat1: "De los usuarios juzga la credibilidad por el diseño visual",
        blogStat2: "De ingresos al mantener identidad consistente",
        blogStat3: "De interacción al publicar sin objetivo",
        blogStat4: "Más leads con un calendario estratégico",
        blogStat5: "No vuelve a un sitio con mala experiencia",
        blogStat6: "Conversiones con CTA claro",
        blogStat7: "Crecimiento con inversión constante en anuncios",
        blogStat8: "Del presupuesto se desperdicia por mala segmentación",
        teamTitle: "Nuestro equipo está conformado por:",
        contactTitle: "Agenda una Llamada 1 a 1",
        scheduleCall: "Agenda una Llamada",
        problemaButton: "Contanos tu Proyecto",
        popupTitle: "Contanos tu Proyecto",
        labelEmail: "Correo Electrónico:",
        labelProblema: "Proyecto:",
        submitButton: "Enviar",
        footerText: "&copy; 2023 TrendMakers. Todos los derechos reservados.",
    
        teamDetails: `
            <div class="team-card">
                <h3>Consultores en Marketing</h3>
                <p>Brindan asesoramiento estratégico para hacer crecer tu negocio.</p>
            </div>
            <div class="team-card">
                <h3>Diseñadores UX/UI, Gráficos y Multimedia</h3>
                <p>Encargados de crear experiencias digitales innovadoras y amigables.</p>
            </div>
            <div class="team-card">
                <h3>Analistas de Datos</h3>
                <p>Expertos en interpretar métricas para impulsar la toma de decisiones informadas.</p>
            </div>
            <div class="team-card">
                <h3>Especialistas en Campañas Digitales</h3>
                <p>Optimizan campañas publicitarias para obtener los mejores resultados.</p>
            </div>
            <div class="team-card">
                <h3>Desarrolladores Web</h3>
                <p>Capaces de crear sitios y plataformas digitales de alto rendimiento.</p>
            </div>
            <div class="team-card">
                <h3>Especialistas en SEO</h3>
                <p>Mejoran el posicionamiento orgánico y aumentan la visibilidad online de tu negocio.</p>
            </div>
            <div class="team-card">
                <h3>Especialistas en Business Intelligence</h3>
                <p>Ayudan a transformar datos en información valiosa y accionable.</p>
            </div>
            <div class="team-card">
                <h3>Community Managers</h3>
                <p>Expertos en la gestión de redes para aumentar la presencia y el compromiso de tu marca.</p>
            </div>
        `,
        contactTitle: "Agenda una Llamada 1 a 1",
        scheduleCall: "Agenda una Llamada",
        problemaButton: "Contanos tu Proyecto",
        popupTitle: "Contanos tu Proyecto",
        labelEmail: "Correo Electrónico:",
        labelProblema: "Proyecto:",
        submitButton: "Enviar",
        footerText: "&copy; 2023 TrendMakers. Todos los derechos reservados.",
        aboutUsText: "Somos una agencia de marketing a nivel global que se dedica a brindar servicios de excelencia a clientes de todas partes del mundo. Con un equipo de expertos en diversas áreas del marketing digital, nos especializamos en crear estrategias personalizadas que se adaptan a las necesidades específicas de cada negocio. Nuestra misión es impulsar el crecimiento y éxito de nuestros clientes a través de soluciones innovadoras y efectivas. Desde la gestión de redes sociales hasta el desarrollo de campañas publicitarias integrales, estamos comprometidos con la excelencia y la satisfacción del cliente en cada proyecto que emprendemos.",
        serviceDetails: `
            <a class="service-card animate__animated" href="nuestros-servicios.html" data-service-id="marketing-tecnologia">
                <img src="logo1.png" alt="Marketing y Tecnologia">
                <h3>Marketing y Tecnologia</h3>
                <p>Usamos plataformas tecnologicas y desarrollos a medida para optimizar los procesos de Marketing y Ventas, implementando automatizacion en los ciclos comerciales.</p>
            </a>
            <a class="service-card animate__animated" href="nuestros-servicios.html" data-service-id="leads">
                <img src="logo1.png" alt="Leads">
                <h3>Leads</h3>
                <p>Generacion de prospectos para plataformas SaaS y empresas de servicios. Implementacion e integracion con CRM.</p>
            </a>
            <a class="service-card animate__animated" href="nuestros-servicios.html" data-service-id="ia">
                <img src="IA.jpg" alt="IA">
                <h3>CHATGPT - IA</h3>
                <p>Potenciamos tu empresa capacitando en ChatGPT y otras herramientas de IA en el dia a dia de todos los sectores.</p>
            </a>
            <a class="service-card animate__animated" href="nuestros-servicios.html" data-service-id="diseno">
                <img src="logo1.png" alt="Diseno y Comunicacion">
                <h3>Diseno/Comunicacion</h3>
                <p>Diseno y maquetado de webs, landing pages, WordPress y newsletters. Piezas graficas para redes, publicidad y eventos.</p>
            </a>
            <a class="service-card animate__animated" href="nuestros-servicios.html" data-service-id="ecommerce">
                <img src="logo1.png" alt="E-Commerce">
                <h3>E-Commerce</h3>
                <p>Operamos nuestros propios e-commerce y te acompanamos desde la idea hasta el lanzamiento.</p>
            </a>
            <a class="service-card animate__animated" href="nuestros-servicios.html" data-service-id="consultoria">
                <img src="logo1.png" alt="Consultoria">
                <h3>Consultoria</h3>
                <p>Consultoria en Marketing y Tecnologia (infraestructura o software) segun tu roadmap.</p>
            </a>
            <a class="service-card animate__animated" href="nuestros-servicios.html" data-service-id="datos">
                <img src="logo1.png" alt="Datos y Analitica">
                <h3>Datos y Analitica</h3>
                <p>Convertimos datos en informacion accionable con medicion avanzada y tableros claros.</p>
            </a>
            <a class="service-card animate__animated" href="nuestros-servicios.html" data-service-id="estudios">
                <img src="logo1.png" alt="Estudios de Mercado">
                <h3>Estudios de Mercado</h3>
                <p>Investigamos audiencias y categorias para que conectes con el mensaje correcto.</p>
            </a>
            <a class="service-card animate__animated" href="nuestros-servicios.html" data-service-id="desarrollo">
                <img src="logo1.png" alt="Desarrollo Web">
                <h3>Desarrollo Web</h3>
                <p>Disenamos y construimos sitios y plataformas de alto rendimiento adaptadas a tu stack.</p>
            </a>
        `,
        contactFormTitle: "¿Necesitas ayuda con marketing digital? TrendMakers es tu solución",
        labelName: "Nombre:",
        labelCompany: "Empresa:",
        labelProject: "Proyecto:",
        submitContactForm: "Enviar",
        contactSoon: "Nuestro equipo se pondrá en contacto con usted a la brevedad para discutir los detalles de su proyecto."
    },
    en: {
        title: "TrendMakers",
        subtitle: "Your digital Partner",
        navInicio: "Home",
        navAcerca: "Why choose us?",
        navServicios: "Our Services",
        navContacto: "Schedule a Call",
        navEquipo: "Our Team",
        navcasosexito: "Success Stories",
        introTitle: "Welcome to TrendMakers",
        introText: "We offer personalized digital marketing solutions for your business.",
        aboutTitle: "About Us",
        aboutText: "We transform your vision into reality.<br><br>We start by listening and understanding your needs. We dive into your challenges to offer solutions and strategies that lead you to success.<br><br>With an agile and results-oriented approach, we not only meet objectives but also seek new challenges to drive your growth.<br><br>From the first contact to the final implementation, we combine digital marketing, design, programming, AI, and consulting to ensure your project not only works but thrives.",
        servicesTitle: "Our Services",
        successtitle: "Success Stories",
        successIntro: "Some of our success stories:",
        successCase1: "Prontoled: We directly impacted revenue with the implementation of AI automations, ad management, and the execution of a comprehensive market plan that led to an action plan.",
        successCase2: "Letratec: We increased revenue by 37% with the implementation of a digital marketing plan, the creation of a website, and lead management.",
        successCase3: "VcG Imagen: We automated lead nurturing and optimized performance media to double the qualified lead conversion rate in just 60 days.",
        servicesText: "We offer a wide range of digital marketing services...",
        closingCtaTitle: "Ready to take your brand to the next level?",
        blogKicker: "Marketing · Data · Automation",
        blogTitle: "Explore our blog",
        blogSubtitle: "Learn the most common mistakes from our specialists and how to avoid them with data and automation.",
        blogMeta: "By TrendMakers · Nov 19, 2025",
        blogEyebrow: "Featured article",
        blogArticleTitle: "9 marketing mistakes that slow any business (and how to avoid them)",
        blogExcerpt: "In a saturated market, the difference isn’t publishing more but doing it strategically. See the 9 mistakes we find in real businesses and how to avoid them.",
        blogCta: "Read article",
        blogStat1: "Of users judge credibility by visual design",
        blogStat2: "Revenue uplift from a consistent identity",
        blogStat3: "Drop in engagement when posting without a goal",
        blogStat4: "More leads with a strategic content calendar",
        blogStat5: "Do not return to a site after a bad experience",
        blogStat6: "Conversion lift with a clear CTA",
        blogStat7: "Growth with consistent ad investment",
        blogStat8: "Of the budget is wasted by poor targeting",
        teamTitle: "Our team consists of:",
        contactTitle: "Schedule a 1-on-1 Call",
        scheduleCall: "Schedule a Call",
        problemaButton: "Tell us about your Project",
        popupTitle: "Tell us about your Project",
        labelEmail: "Email:",
        labelProblema: "Project:",
        submitButton: "Send",
    footerText: "&copy; 2023 TrendMakers. All rights reserved.",    
    teamDetails: `
            <div class="team-card">
                <h3>Marketing Consultants</h3>
                <p>They provide strategic advice to grow your business.</p>
            </div>
            <div class="team-card">
                <h3>UX/UI, Graphic, and Multimedia Designers</h3>
                <p>Responsible for creating innovative and user-friendly digital experiences.</p>
            </div>
            <div class="team-card">
                <h3>Data Analysts</h3>
                <p>Experts in interpreting metrics to drive informed decision-making.</p>
            </div>
            <div class="team-card">
                <h3>Digital Campaign Specialists</h3>
                <p>They optimize advertising campaigns to achieve the best results.</p>
            </div>
            <div class="team-card">
                <h3>Web Developers</h3>
                <p>Capable of creating high-performance websites and digital platforms.</p>
            </div>
            <div class="team-card">
                <h3>SEO Specialists</h3>
                <p>They improve organic positioning and increase your business's online visibility.</p>
            </div>
            <div class="team-card">
                <h3>Business Intelligence Specialists</h3>
                <p>They help transform data into valuable and actionable information.</p>
            </div>
            <div class="team-card">
                <h3>Community Managers</h3>
                <p>Experts in managing social networks to increase your brand's presence and engagement.</p>
            </div>
        `,
        contactTitle: "Schedule a 1-on-1 Call",
        scheduleCall: "Schedule a Call",
        problemaButton: "Tell Us Your Project",
        popupTitle: "Tell Us Your Project",
        labelEmail: "Email:",
        labelProblema: "Project:",
        submitButton: "Submit",
        footerText: "&copy; 2023 TrendMakers. All rights reserved.",    
        aboutUsText: "We are a global marketing agency dedicated to providing excellent services to clients all over the world. With a team of experts in various areas of digital marketing, we specialize in creating personalized strategies that cater to the specific needs of each business. Our mission is to drive growth and success for our clients through innovative and effective solutions. From social media management to the development of comprehensive advertising campaigns, we are committed to excellence and customer satisfaction in every project we undertake.",
        serviceDetails: `
            <a class="service-card animate__animated" href="nuestros-servicios.html?lang=en" data-service-id="marketing-tecnologia">
                <img src="logo1.png" alt="Marketing & Technology">
                <h3>Marketing & Technology</h3>
                <p>We use tech platforms and custom development to automate every marketing and sales cycle.</p>
            </a>
            <a class="service-card animate__animated" href="nuestros-servicios.html?lang=en" data-service-id="leads">
                <img src="logo1.png" alt="Leads">
                <h3>Leads</h3>
                <p>Lead generation for SaaS and service companies fully connected to your CRM.</p>
            </a>
            <a class="service-card animate__animated" href="nuestros-servicios.html?lang=en" data-service-id="ia">
                <img src="IA.jpg" alt="AI">
                <h3>CHATGPT - AI</h3>
                <p>We train teams on ChatGPT and AI tools so automation becomes part of the daily workflow.</p>
            </a>
            <a class="service-card animate__animated" href="nuestros-servicios.html?lang=en" data-service-id="diseno">
                <img src="logo1.png" alt="Design & Communication">
                <h3>Design/Communication</h3>
                <p>We design and build websites, landing pages, WordPress sites, newsletters, and creative assets for social and ads.</p>
            </a>
            <a class="service-card animate__animated" href="nuestros-servicios.html?lang=en" data-service-id="ecommerce">
                <img src="logo1.png" alt="E-Commerce">
                <h3>E-Commerce</h3>
                <p>We run our own e-commerce stack and guide you from idea to launch in every stage.</p>
            </a>
            <a class="service-card animate__animated" href="nuestros-servicios.html?lang=en" data-service-id="consultoria">
                <img src="logo1.png" alt="Consulting">
                <h3>Consulting</h3>
                <p>Marketing & Technology consulting (infrastructure and software) tailored to your roadmap.</p>
            </a>
            <a class="service-card animate__animated" href="nuestros-servicios.html?lang=en" data-service-id="datos">
                <img src="logo1.png" alt="Data & Analytics">
                <h3>Data & Analytics</h3>
                <p>We turn scattered data into actionable insights with advanced measurement setups.</p>
            </a>
            <a class="service-card animate__animated" href="nuestros-servicios.html?lang=en" data-service-id="estudios">
                <img src="logo1.png" alt="Market Research">
                <h3>Market Research</h3>
                <p>Deep research to understand audiences, behaviors, and opportunities for your category.</p>
            </a>
            <a class="service-card animate__animated" href="nuestros-servicios.html?lang=en" data-service-id="desarrollo">
                <img src="logo1.png" alt="Web Development">
                <h3>Web Development</h3>
                <p>We design, build, and optimize high-performance digital platforms connected to your stack.</p>
            </a>
        `,
        contactFormTitle: "Need help with digital marketing? TrendMakers is your solution",
        labelName: "Name:",
        labelCompany: "Company:",
        labelProject: "Project:",
        submitContactForm: "Submit",
    contactSoon: "Our team will reach out to you shortly to discuss the details of your project.",
    detailHeroTitle: "Our Services in Detail",
    detailHeroText: "Explore every solution we use to accelerate your business results. This page only opens from the service cards so you can focus on the offer that matters most to you.",
    detailBackLink: "Back to the cards",
        detailGrid: `
                <article id="marketing-tecnologia" class="detail-card">
                    <h2>Marketing & Technology</h2>
                    <p>We align your commercial objectives with tech architectures that automate campaigns, nurture leads, and measure performance in real time.</p>
                    <ul>
                        <li>MarTech stack implementation and automation.</li>
                        <li>Integrations with CRMs and journey orchestrators.</li>
                        <li>Custom dashboards for leadership and operations.</li>
                    </ul>
                </article>
                <article id="leads" class="detail-card">
                    <h2>Lead Generation</h2>
                    <p>We design funnels that attract qualified prospects for SaaS and service companies, from segmentation to the handoff with sales.</p>
                    <ul>
                        <li>Full-funnel campaigns across paid media, search, and outbound.</li>
                        <li>Lead scoring and smart routing.</li>
                        <li>Weekly optimization focused on CPL and LTV.</li>
                    </ul>
                </article>
                <article id="ia" class="detail-card">
                    <h2>Applied ChatGPT & AI</h2>
                    <p>We train your teams to adopt generative AI across marketing, sales, and ops, creating assistants and workflows that scale productivity.</p>
                    <ul>
                        <li>Bespoke workshops and playbooks.</li>
                        <li>Automated responses and content.</li>
                        <li>Role-based internal copilots.</li>
                    </ul>
                </article>
                <article id="diseno" class="detail-card">
                    <h2>Design & Communications</h2>
                    <p>We craft visual identities and digital experiences that stay consistent across every touchpoint to strengthen your brand perception.</p>
                    <ul>
                        <li>Branding, guidelines, and kits for social media.</li>
                        <li>Landing page and newsletter production.</li>
                        <li>End-to-end community management.</li>
                    </ul>
                </article>
                <article id="ecommerce" class="detail-card">
                    <h2>E-Commerce</h2>
                    <p>We operate our own stores and guide yours end to end, from platform and catalog to logistics and growth.</p>
                    <ul>
                        <li>Platform selection and implementation (Shopify, VTEX, WooCommerce).</li>
                        <li>Conversion rate and retention optimization.</li>
                        <li>Automated fulfillment and reporting.</li>
                    </ul>
                </article>
                <article id="consultoria" class="detail-card">
                    <h2>Consulting</h2>
                    <p>We help you prioritize digital and technology initiatives, define actionable roadmaps, and stay by your side through execution.</p>
                    <ul>
                        <li>Marketing and technology audits.</li>
                        <li>KPI frameworks and governance models.</li>
                        <li>PMO support for critical rollouts.</li>
                    </ul>
                </article>
                <article id="datos" class="detail-card">
                    <h2>Data & Analytics</h2>
                    <p>We turn scattered data into actionable dashboards that unlock faster decisions and surface opportunities ahead of the competition.</p>
                    <ul>
                        <li>Attribution models and advanced measurement.</li>
                        <li>Automated ETL and monitoring.</li>
                        <li>Actionable insights for marketing and sales.</li>
                    </ul>
                </article>
                <article id="estudios" class="detail-card">
                    <h2>Market Research</h2>
                    <p>We study audiences, behaviors, and categories so you can launch with less risk and more relevant messaging.</p>
                    <ul>
                        <li>Quantitative and qualitative research.</li>
                        <li>Competitive and opportunity mapping.</li>
                        <li>Actionable personas for campaigns.</li>
                    </ul>
                </article>
                <article id="desarrollo" class="detail-card">
                    <h2>Web Development</h2>
                    <p>We design and build high-performance sites that are secure, scalable, and ready to plug into your digital ecosystem.</p>
                    <ul>
                        <li>Corporate websites and landing pages.</li>
                        <li>Internal portals and tools.</li>
                        <li>Ongoing testing, performance, and accessibility.</li>
                    </ul>
                </article>
        `
    }
};

const LANG_STORAGE_KEY = 'trendLang';
function saveLanguagePreference(lang) {
    try { localStorage.setItem(LANG_STORAGE_KEY, lang); } catch (e) { /* noop */ }
}
function getLanguagePreference() {
    try { return localStorage.getItem(LANG_STORAGE_KEY); } catch (e) { return null; }
}
function updateDocumentLanguageAttr(lang) {
    try { document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'es'); } catch (e) { /* noop */ }
}
function getRequestedLanguage() {
    try {
        const params = new URLSearchParams(window.location.search);
        const q = params.get('lang');
        if (q) return q.toLowerCase();
    } catch (e) { /* noop */ }
    const stored = getLanguagePreference();
    return stored ? stored.toLowerCase() : 'es';
}

// IntersectionObserver para disparar animaciones solo cuando el usuario vea el elemento
let scrollObserver;
function setupScrollAnimations(rescan) {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.12
    };

    if (!scrollObserver) {
        scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
    }

    const animatedElements = document.querySelectorAll('.animate__animated, .service-card');
    animatedElements.forEach(element => {
        if (!rescan && element.dataset.animObserved === '1') return;
        element.dataset.animObserved = '1';
        if (!element.classList.contains('visible')) {
            element.style.animationPlayState = 'paused';
        }
        scrollObserver.observe(element);
    });
}

// Conteo animado para stats del blog
let countObserver;
function initCountUps() {
    const counters = document.querySelectorAll('[data-count-target]');
    if (!counters.length) return;

    if (!countObserver) {
        countObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    observer.unobserve(el);
                    const target = parseFloat(el.dataset.countTarget || '0');
                    const prefix = el.dataset.countPrefix || '';
                    const suffix = el.dataset.countSuffix || '';
                    const duration = 1100;
                    const start = performance.now();
                    const decimals = target % 1 !== 0 ? 1 : 0;
                    function tick(now) {
                        const progress = Math.min((now - start) / duration, 1);
                        const current = (target * progress);
                        el.textContent = prefix + current.toFixed(decimals) + suffix;
                        if (progress < 1) {
                            requestAnimationFrame(tick);
                        } else {
                            el.textContent = prefix + target.toFixed(decimals) + suffix;
                        }
                    }
                    requestAnimationFrame(tick);
                }
            });
        }, { threshold: 0.35, rootMargin: '0px 0px -10% 0px' });
    }

    counters.forEach(el => {
        if (el.dataset.countBound === '1') return;
        el.dataset.countBound = '1';
        countObserver.observe(el);
    });
}

function updateSuccessCards() {
    try {
        const c1 = document.getElementById('success-case1');
        const c2 = document.getElementById('success-case2');
        const c3 = document.getElementById('success-case3');
        if (c1) {
            document.querySelectorAll('.success-content[data-key="success-case1"]').forEach(n => n.innerHTML = c1.innerHTML);
        }
        if (c2) {
            document.querySelectorAll('.success-content[data-key="success-case2"]').forEach(n => n.innerHTML = c2.innerHTML);
        }
        if (c3) {
            document.querySelectorAll('.success-content[data-key="success-case3"]').forEach(n => n.innerHTML = c3.innerHTML);
        }
    } catch (e) { /* noop */ }
}

// Override with a robust, reversible language switcher
function setLanguage(language) {
    language = (language || 'es').toLowerCase();
    // Ensure original ES snapshot exists
    takeI18nSnapshot();
    if (language === 'es') {
        try {
            // Restore original ES content
            Object.keys(__orig.elems).forEach(function(id){ const el=document.getElementById(id); if(el) el.innerHTML = __orig.elems[id]; });
            const svc = document.querySelector('.service-details');
            if (svc && __orig.serviceDetailsHTML) { svc.innerHTML = __orig.serviceDetailsHTML; }
            const team = document.querySelector('.team-details');
            if (team && __orig.teamDetailsHTML) { team.innerHTML = __orig.teamDetailsHTML; }
            const detailGrid = document.querySelector('.detail-grid');
            if (detailGrid && __orig.detailGridHTML) { detailGrid.innerHTML = __orig.detailGridHTML; }
            // Restore nav duplicates (desktop and mobile) using snapshot
            const navMap = [
              ['#nav-inicio','nav-inicio'],['#nav-acerca','nav-acerca'],['#nav-servicios','nav-servicios'],
              ['#nav-contacto','nav-contacto'],['#nav-equipo','nav-equipo'],['#nav-casos-exito','nav-casos-exito'],
              ['#nav-problema','nav-problema']
            ];
            navMap.forEach(function([sel,idKey]){
              const val = __orig.elems[idKey];
              if (val !== undefined) {
                const desktop = document.querySelector('ul.desktop-menu ' + sel) || document.querySelector(sel);
                const mobile = document.querySelector('ul.mobile-menu ' + sel);
                if (desktop) desktop.innerHTML = val;
                if (mobile) mobile.innerHTML = val;
              }
            });
            // Ensure restored ES service/team cards are visible
            try {
              document.querySelectorAll('#servicios .service-card, #equipo .team-card, .animate__animated').forEach(function(el){
                el.classList.add('visible');
              });
            } catch(e) { /* noop */ }
            // Rebind interactions after DOM restore
            initMobileServiceCards();
        } catch (e) { /* noop */ }
        setupScrollAnimations(true);
        saveLanguagePreference('es');
        updateDocumentLanguageAttr('es');
        return;
    }
    // Apply EN (or other) translations
    const elementsToUpdate = {
        'title': 'title',
        'subtitle': 'subtitle',
        'nav-inicio': 'navInicio',
        'nav-acerca': 'navAcerca',
        'nav-servicios': 'navServicios',
        'nav-contacto': 'navContacto',
        'nav-equipo': 'navEquipo',
        'nav-casos-exito': 'navcasosexito',
        'nav-problema': 'problemaButton',
        'closing-cta-title': 'closingCtaTitle',
        'intro-title': 'introTitle',
        'intro-text': 'introText',
        'about-title': 'aboutTitle',
        'about-text': 'aboutText',
        'services-title': 'servicesTitle',
        'services-text': 'servicesText',
        'team-title': 'teamTitle',
        'contact-title': 'contactTitle',
        'schedule-call': 'scheduleCall',
        'show-popup': 'problemaButton',
        'popup-title': 'popupTitle',
        'label-email': 'labelEmail',
        'label-problema': 'labelProblema',
        'submit-button': 'submitButton',
        'footer-text': 'footerText',
        'about-us-text': 'aboutUsText',
        'contact-title': 'contactFormTitle',
        'label-name': 'labelName',
        'label-company': 'labelCompany',
        'label-project': 'labelProject',
        'submit-contact-form': 'submitContactForm',
        'contact-soon': 'contactSoon',
        'success-intro': 'successIntro',
        'success-title': 'successtitle',
        'success-case1': 'successCase1',
        'success-case2': 'successCase2',
        'success-case3': 'successCase3',
        'detail-hero-title': 'detailHeroTitle',
        'detail-hero-text': 'detailHeroText',
        'detail-back-link': 'detailBackLink'
    };

    for (const id in elementsToUpdate) {
        const translationKey = elementsToUpdate[id];
        const element = document.getElementById(id);
        if (element && translations[language] && translations[language][translationKey] !== undefined) {
            element.innerHTML = translations[language][translationKey];
        }
    }

    const serviceDetailsElement = document.querySelector('.service-details');
    if (serviceDetailsElement && translations[language] && translations[language].serviceDetails) {
        serviceDetailsElement.innerHTML = translations[language].serviceDetails;
        try {
            const newCards = document.querySelectorAll('#servicios .service-card');
            newCards.forEach(el => el.classList.add('visible'));
        } catch (e) { /* noop */ }
        try { initMobileServiceCards(); } catch (e) { /* noop */ }
    }

    const teamDetailsElement = document.querySelector('.team-details');
    if (teamDetailsElement && translations[language] && translations[language].teamDetails) {
        teamDetailsElement.innerHTML = translations[language].teamDetails;
    }

    const detailGridElement = document.querySelector('.detail-grid');
    if (detailGridElement && translations[language] && translations[language].detailGrid) {
        detailGridElement.innerHTML = translations[language].detailGrid;
    }

    // Update nav (desktop and mobile duplicates)
    const navMap = [
      ['#nav-inicio','navInicio'],['#nav-acerca','navAcerca'],['#nav-servicios','navServicios'],
      ['#nav-contacto','navContacto'],['#nav-equipo','navEquipo'],['#nav-casos-exito','navcasosexito'],
      ['#nav-problema','problemaButton']
    ];
    navMap.forEach(function([sel,key]){
      try {
        const desktop = document.querySelector('ul.desktop-menu ' + sel) || document.querySelector(sel);
        const mobile = document.querySelector('ul.mobile-menu ' + sel);
        if (desktop && translations[language]) desktop.innerHTML = translations[language][key] || desktop.innerHTML;
        if (mobile && translations[language]) mobile.innerHTML = translations[language][key] || mobile.innerHTML;
      } catch(e){ /* noop */ }
    });
    setupScrollAnimations(true);
    saveLanguagePreference(language);
    updateDocumentLanguageAttr(language);
}

document.addEventListener('DOMContentLoaded', function(){
    var initialLang = getRequestedLanguage();
    if (initialLang && initialLang !== 'es') {
        setLanguage(initialLang);
    } else {
        saveLanguagePreference('es');
        updateDocumentLanguageAttr('es');
    }
    initCountUps();
});

// Animaciones de entrada
document.addEventListener('DOMContentLoaded', function() {
    setupScrollAnimations();

    // Pop-up removido: permitir que el enlace mailto funcione directamente

    // Mobile service-card expand/collapse (delegation + rebind-safe)
    try { initMobileServiceCards(); } catch (e) { /* noop */ }

    // Preloader
    const preloader = document.getElementById('preloader');
    const body = document.body;

    window.addEventListener('load', function() {
        if (preloader) {
            preloader.classList.add('hide'); // activa fade-out CSS
            const done = () => {
                preloader.style.display = 'none';
                preloader.removeEventListener('transitionend', done);
            };
            preloader.addEventListener('transitionend', done);
            // Fallback por si transitionend no dispara
            setTimeout(done, 900);
        }
        body.classList.remove('loading');
        body.classList.add('loaded');
    });

    body.classList.add('loading');

    // Manejo del video de fondo
    const videos = document.querySelectorAll('video');

    // Detectar si el navegador es Safari
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari) {
        videos.forEach(video => {
            video.style.pointerEvents = 'none'; // Deshabilita la interacción solo en Safari
        });
    }
});

// Success Stories translations and flip-cards integration
(function(){
  function isTouchDevice(){ return (("ontouchstart" in window) || navigator.maxTouchPoints > 0); }
  function syncSuccessContent(language){
    try{
      var t = (typeof translations !== 'undefined') ? translations[language] : null;
      var st = document.getElementById('success-title');
      var si = document.getElementById('success-intro');
      var sc1 = document.getElementById('success-case1');
      var sc2 = document.getElementById('success-case2');
      var sc3 = document.getElementById('success-case3');
      if(t){
        if(st&&t.successtitle) st.innerHTML=t.successtitle;
        if(si&&t.successIntro) si.innerHTML=t.successIntro;
        if(sc1) sc1.innerHTML = t.successCase1 || sc1.innerHTML;
        if(sc2) sc2.innerHTML = t.successCase2 || sc2.innerHTML;
        if(sc3) sc3.innerHTML = t.successCase3 || sc3.innerHTML;
      } else {
        // Fallback EN si no hay traducción cargada
        if(st) st.textContent = 'Success Stories';
        if(si) si.textContent = 'Some of our success stories:';
      }
      // hint text
      var hint=(language==='en')?(isTouchDevice()? 'Tap to see more' : 'Click to see more'):(isTouchDevice()? 'Toca para ver más' : 'Click para ver más');
      document.querySelectorAll('.flip-hint').forEach(function(el){ el.textContent=hint; });
      var ctaText = (language==='en') ? 'See more' : 'Ver más';
      document.querySelectorAll('.flip-cta').forEach(function(el){ el.textContent = ctaText; });
    }catch(e){}
  }
  document.addEventListener('DOMContentLoaded', function(){
    try{
      var cards=document.querySelectorAll('.flip-card');
      var storeLang=function(){
        var lang = (typeof getLanguagePreference === 'function' && getLanguagePreference()) || 'es';
        try { localStorage.setItem('trendLastCaseLang', lang); } catch(e){}
      };
      cards.forEach(function(card){
        card.addEventListener('click',storeLang);
        card.addEventListener('keydown',function(e){
          if(e.key===' '){
            e.preventDefault();
            storeLang();
            card.click();
          }
        });
      });
      var langForCards = (typeof getLanguagePreference === 'function' && getLanguagePreference()) || 'es';
      syncSuccessContent(langForCards);
    }catch(e){}
  });
  if(typeof window.setLanguage==='function' && !window.__langWrapped){
    var _orig=window.setLanguage;
    window.setLanguage=function(lang){ _orig(lang); syncSuccessContent(lang); };
    window.__langWrapped = true;
  }
})();

// Bind language dropdown (image toggle + small menu)
(function(){
  function bindLangDropdown(){
    try {
      var sel = document.querySelector('nav .language-selector');
      if (!sel || sel.dataset.bound) return;
      var toggle = sel.querySelector('.lang-toggle');
      var menu = sel.querySelector('.lang-menu');
      var open = function(v){
        sel.classList.toggle('open', !!v);
        if (toggle) toggle.setAttribute('aria-expanded', v ? 'true' : 'false');
      };
      if (toggle) toggle.addEventListener('click', function(e){ e.stopPropagation(); open(!sel.classList.contains('open')); });
      if (menu) menu.querySelectorAll('.lang-option').forEach(function(btn){
        btn.addEventListener('click', function(e){
          e.preventDefault();
          var lang = this.getAttribute('data-lang');
          if (window.setLanguage) window.setLanguage(lang);
          open(false);
        });
      });
      document.addEventListener('click', function(){ open(false); });
      document.addEventListener('keydown', function(e){ if (e.key === 'Escape') open(false); });
      sel.dataset.bound = '1';
    } catch(e) { /* noop */ }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindLangDropdown); else bindLangDropdown();
})();
