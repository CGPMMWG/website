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
        // Sin preventDefault: cualquier toque (desktop o m?vil) sigue el enlace inmediatamente
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
            'closing-cta-title',
            'success-intro','success-title','success-case1','success-case2','success-case3',
            'detail-hero-title','detail-hero-text','detail-back-link',
            'blog-kicker','blog-title','blog-subtitle','blog-meta','blog-eyebrow','blog-article-title','blog-excerpt','blog-cta',
            'blog-stat1','blog-stat2','blog-stat3','blog-stat4','blog-stat5','blog-stat6','blog-stat7','blog-stat8'
        ];
        ['about-subtitle','why1-title','why1-text','why2-title','why2-text','why3-title','why3-text'].forEach(function(id){
          ids.push(id);
        });
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
        navAcerca: "&iquest;Por qu&eacute; elegirnos",
        navServicios: "Nuestros Servicios",
        navContacto: "Agenda una Llamada",
        navEquipo: "Nuestro Equipo",
        navcasosexito: "Casos de &eacute;xito",
        blogNav: "Blog",
        introTitle: "Bienvenidos a TrendMakers",
        introTagline: "Impulsamos el crecimiento de tu negocio con marketing, análisis de datos, automatización e inteligencia artificial.",
        introText: "Impulsamos el crecimiento de tu negocio con marketing, análisis de datos, automatización e inteligencia artificial.<br><br>Creamos y ejecutamos estrategias digitales personalizadas, basadas en datos, para atraer mejores clientes y escalar tus resultados.",
        aboutTitle: "&iquest;¿Por qu&eacute; elegirnos como tu socio digital?",
        aboutSubtitle: "Transformamos tu visi&oacute;n en realidad.",
        aboutText: "Tomamos tu proyecto como si fuera nuestro.<br><br>Para eso empezamos por aprender y escuchar. Entendemos tu problem&aacute;tica y te presentamos recursos y acciones para llegar a donde quieres.<br><br>Somos &aacute;giles y nos enfocamos en los resultados. Buscamos cumplir objetivos e ir por nuevos desaf&iacute;os.<br><br>Lo hacemos combinando marketing digital, dise&ntilde;o, programaci&oacute;n, IA y consultor&iacute;a, de principio a fin. Desde que nos contactas hasta que funciona.",
        why1Title: "Estrategia &amp; Visi&oacute;n",
        why1Text: "Comprendemos profundamente tus necesidades y diseñamos una hoja de ruta alineada con tus objetivos.",
        why2Title: "Ejecuci&oacute;n &amp; Tecnolog&iacute;a",
        why2Text: "Integramos marketing, diseño, IA y automatizaci&oacute;n para ofrecer resultados reales.",
        why3Title: "Crecimiento &amp; Optimizaci&oacute;n",
        why3Text: "Medimos, refinamos y escalamos tu proyecto para maximizar el impacto a largo plazo.",
        servicesTitle: "Nuestros Servicios",
        successtitle: "Casos de &eacute;xito",
        successIntro: "Algunos de nuestros casos de &eacute;xito:",
        successCase1: "Prontoled: Afectamos directamente la facturaci&oacute;n con la implementaci&oacute;n de automatizaciones de IA, gesti&oacute;n de anuncios y la realizaci&oacute;n de un plan exhaustivo de mercado que deriv&oacute; en un plan de acci&oacute;n.",
        successCase2: "Letratec: Aumentamos la facturaci&oacute;n en un 37% con la implementaci&oacute;n de un plan de marketing digital, la creaci&oacute;n de una p&aacute;gina web y gesti&oacute;n de leads.",
        successCase3: "VcG Imagen: Automatizamos la nutrici&oacute;n de leads y optimizamos campa&ntilde;as de performance para duplicar la tasa de conversi&oacute;n en solo 60 d&iacute;as.",
        servicesText: "Hace clic en las tarjetas para conocer m&aacute;s detalles sobre nuestros servicios y descubrir c&oacute;mo podemos contribuir al crecimiento de tu empresa.",
        closingCtaTitle: "&iquest;Listo para llevar tu marca al próximoo nivel",
        blogKicker: "Marketing &middot; Datos &middot; automatizaci&oacute;n",
        blogTitle: "Conoc&eacute; nuestro blog",
        blogSubtitle: "Aprend&eacute; con nuestros especialistas los errores m&aacute;s comunes y c&oacute;mo evitarlos con datos y automatizaci&oacute;n.",
        blogMeta: "Por TrendMakers &middot; 19/11/2025",
        blogEyebrow: "Art&iacute;culo destacado",
        blogArticleTitle: "9 errores de marketing que frenan a cualquier negocio (y c&oacute;mo evitarlos)",
        blogExcerpt: "En un mercado saturado, la diferencia no est&aacute; en publicar m&aacute;s sino en hacerlo estrat&eacute;gicamente. Conoc&eacute; los 9 fallos que vemos en negocios reales y c&oacute;mo evitarlos.",
        blogCta: "Leer art&iacute;culo",
        blogStat1: "De los usuarios juzga la credibilidad por el diseño;o visual",
        blogStat2: "De ingresos al mantener identidad consistente",
        blogStat3: "De interacci&oacute;n al publicar sin objetivo",
        blogStat4: "M&aacute;s leads con un calendario estrat&eacute;gico",
        blogStat5: "No vuelve a un sitio con mala experiencia",
        blogStat6: "Conversiones con CTA claro",
        blogStat7: "Crecimiento con inversi&oacute;n constante en anuncios",
        blogStat8: "Del presupuesto se desperdicia por mala segmentaci&oacute;n",
        teamTitle: "Nuestro equipo est&aacute; conformado por:",
        contactTitle: "Agenda una Llamada 1 a 1",
        scheduleCall: "Agenda una Llamada",
        problemaButton: "Contanos tu Proyecto",
        popupTitle: "Contanos tu Proyecto",
        labelEmail: "Correo Electr&oacute;nico:",
        labelProblema: "Proyecto:",
        submitButton: "Enviar",
        footerText: "&copy; 2023 TrendMakers. Todos los derechos reservados.",
    
        teamDetails: `
            <div class="team-card">
                <h3>Consultores en Marketing</h3>
                <p>Brindan asesoramiento estrat&eacute;gico para hacer crecer tu negocio.</p>
            </div>
            <div class="team-card">
                <h3>Dise&ntilde;adores UX/UI, Gr&aacute;ficos y Multimedia</h3>
                <p>Encargados de crear experiencias digitales innovadoras y amigables.</p>
            </div>
            <div class="team-card">
                <h3>Analistas de Datos</h3>
                <p>Expertos en interpretar m&eacute;tricas para impulsar la toma de decisiones informadas.</p>
            </div>
            <div class="team-card">
                <h3>Especialistas en Campa?as Digitales</h3>
                <p>Optimizan campa&ntilde;as publicitarias para obtener los mejores resultados.</p>
            </div>
            <div class="team-card">
                <h3>Desarrolladores Web</h3>
                <p>Capaces de crear sitios y plataformas digitales de alto rendimiento.</p>
            </div>
            <div class="team-card">
                <h3>Especialistas en SEO</h3>
                <p>Mejoran el posicionamiento org&aacute;nico y aumentan la visibilidad online de tu negocio.</p>
            </div>
            <div class="team-card">
                <h3>Especialistas en Business Intelligence</h3>
                <p>Ayudan a transformar datos en informaci&oacute;n valiosa y accionable.</p>
            </div>
            <div class="team-card">
                <h3>Community Managers</h3>
                <p>Expertos en la gesti&oacute;n de redes para aumentar la presencia y el compromiso de tu marca.</p>
            </div>
        `,
        contactTitle: "Agenda una Llamada 1 a 1",
        scheduleCall: "Agenda una Llamada",
        problemaButton: "Contanos tu Proyecto",
        popupTitle: "Contanos tu Proyecto",
        labelEmail: "Correo Electr&oacute;nico:",
        labelProblema: "Proyecto:",
        submitButton: "Enviar",
        footerText: "&copy; 2023 TrendMakers. Todos los derechos reservados.",
        aboutUsText: "Somos una agencia de marketing a nivel global que se dedica a brindar servicios de excelencia a clientes de todas partes del mundo. Con un equipo de expertos en diversas &aacute;reas del marketing digital, nos especializamos en crear estrategias personalizadas que se adaptan a las necesidades espec&iacute;ficas de cada negocio. Nuestra misi&oacute;n es impulsar el crecimiento y &eacute;xito de nuestros clientes a trav&eacute;s de soluciones innovadoras y efectivas. Desde la gesti&oacute;n de redes sociales hasta el desarrollo de campa&ntilde;as publicitarias integrales, estamos comprometidos con la excelencia y la satisfacci&oacute;n del cliente en cada proyecto que emprendemos.",
        serviceDetails: `
            <a class="service-card animate__animated" href="marketing-automation.html" data-service-id="marketing-automation">
                <img src="./img/logo1.png" alt="Marketing &amp; Automation">
                <h3>Marketing &amp; Automation</h3>
                <p>Automatizamos tus procesos y funnels para generar m&aacute;s leads y conversiones con menos esfuerzo.</p>
            </a>
            <a class="service-card animate__animated" href="branding-communication.html" data-service-id="branding-communication">
                <img src="./img/logo1.png" alt="Branding &amp; Communication">
                <h3>Branding &amp; Communication</h3>
                <p>Creamos marcas coherentes y comunicaci&oacute;n clara que conecta con tu audiencia.</p>
            </a>
            <a class="service-card animate__animated" href="web-ecommerce.html" data-service-id="web-ecommerce">
                <img src="./img/logo1.png" alt="Web &amp; E-Commerce Development">
                <h3>Web &amp; E-Commerce Development</h3>
                <p>Desarrollamos sitios y tiendas r&aacute;pidas, seguras y optimizadas para convertir.</p>
            </a>
            <a class="service-card animate__animated" href="data-analitics.html" data-service-id="consulting-data-strategy">
                <img src="./img/logo1.png" alt="Consulting, Data &amp; Strategy">
                <h3>Consulting, Data &amp; Strategy</h3>
                <p>Definimos tu rumbo con an&aacute;lisis, datos y estrategia para escalar tu negocio.</p>
            </a>
            <a class="service-card animate__animated" href="ia-hub.html" data-service-id="ai-innovation">
                <img src="./img/logo1.png" alt="AI &amp; Innovation Hub">
                <h3>AI &amp; Innovation Hub</h3>
                <p>Implementamos IA y automatizaciones que mejoran procesos y crean ventaja competitiva.</p>
            </a>
        `,
        contactFormTitle: "&iquest;Necesitas ayuda digital? TrendMakers es tu soluci&oacute;n",
        labelName: "Nombre:",
        labelCompany: "Empresa:",
        labelProject: "Proyecto:",
        submitContactForm: "Enviar",
        contactSoon: "Nuestro equipo se pondr? en contacto con usted a la brevedad para discutir los detalles de su proyecto.",
        detailBackButton: "? Volver"
    },
    en: {
        title: "TrendMakers",
        subtitle: "Your digital Partner",
        navInicio: "Home",
        navAcerca: "Why choose us",
        navServicios: "Our Services",
        navContacto: "Schedule a Call",
        navEquipo: "Our Team",
        navcasosexito: "Success Stories",
        blogNav: "Blog",
        introTitle: "Welcome to TrendMakers",
        introTagline: "We drive your business growth through marketing, data analysis, automation, and artificial intelligence.",
        introText: "We design and execute personalized, data-driven digital strategies to attract better clients and scale your results.",
        aboutTitle: "Why choose us as your digital partner?",
        aboutSubtitle: "We transform your vision into reality.",
        aboutText: "We transform your vision into reality.<br><br>We start by listening and understanding your needs. We dive into your challenges to offer solutions and strategies that lead you to success.<br><br>With an agile and results-oriented approach, we not only meet objectives but also seek new challenges to drive your growth.<br><br>From the first contact to the final implementation, we combine digital marketing, design, programming, AI, and consulting to ensure your project not only works but thrives.",
        why1Title: "Strategy &amp; Vision",
        why1Text: "We deeply understand your needs and design a roadmap aligned with your goals.",
        why2Title: "Execution &amp; Technology",
        why2Text: "We integrate marketing, design, AI, and automation to deliver real results.",
        why3Title: "Growth &amp; Optimization",
        why3Text: "We measure, refine, and scale your project to maximize long-term impact.",
        servicesTitle: "Our Services",
        successtitle: "Success Stories",
        successIntro: "Some of our success stories:",
        successCase1: "Prontoled: We directly impacted revenue with the implementation of AI automations, ad management, and the execution of a comprehensive market plan that led to an action plan.",
        successCase2: "Letratec: We increased revenue by 37% with the implementation of a digital marketing plan, the creation of a website, and lead management.",
        successCase3: "VcG Imagen: We automated lead nurturing and optimized performance media to double the qualified lead conversion rate in just 60 days.",
        servicesText: "Click on the cards to view more information about our services and learn how we can help you grow your business.",
        closingCtaTitle: "Ready to take your brand to the next level",
        blogKicker: "Marketing &middot; Data &middot; Automation",
        blogTitle: "Explore our blog",
        blogSubtitle: "Learn the most common mistakes from our specialists and how to avoid them with data and automation.",
        blogMeta: "By TrendMakers &middot; Nov 19, 2025",
        blogEyebrow: "Featured article",
        blogArticleTitle: "9 marketing mistakes that slow any business (and how to avoid them)",
        blogExcerpt: "In a saturated market, the difference isn't publishing more but doing it strategically. See the 9 mistakes we find in real businesses and how to avoid them.",
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
            <a class="service-card animate__animated" href="marketing-automation.html?lang=en" data-service-id="marketing-automation">
                <img src="./img/logo1.png" alt="Marketing &amp; Automation">
                <h3>Marketing &amp; Automation</h3>
                <p>We automate your funnels and processes to generate more qualified leads with less effort.</p>
            </a>
            <a class="service-card animate__animated" href="branding-communication.html?lang=en" data-service-id="branding-communication">
                <img src="./img/logo1.png" alt="Branding &amp; Communication">
                <h3>Branding &amp; Communication</h3>
                <p>We create coherent brands and clear communication that connects with your audience.</p>
            </a>
            <a class="service-card animate__animated" href="web-ecommerce.html?lang=en" data-service-id="web-ecommerce">
                <img src="./img/logo1.png" alt="Web &amp; E-Commerce Development">
                <h3>Web &amp; E-Commerce Development</h3>
                <p>We build fast, secure and conversion-focused websites and online stores.</p>
            </a>
            <a class="service-card animate__animated" href="data-analitics.html?lang=en" data-service-id="consulting-data-strategy">
                <img src="./img/logo1.png" alt="Consulting, Data &amp; Strategy">
                <h3>Consulting, Data &amp; Strategy</h3>
                <p>We define your growth path through data, analysis and strategic direction.</p>
            </a>
            <a class="service-card animate__animated" href="ia-hub.html?lang=en" data-service-id="ai-innovation">
                <img src="./img/logo1.png" alt="AI &amp; Innovation Hub">
                <h3>AI &amp; Innovation Hub</h3>
                <p>We implement AI and automations to improve processes and build competitive advantage.</p>
            </a>
        `,
        contactFormTitle: "Need help with digital marketing TrendMakers is your solution",
        labelName: "Name:",
        labelCompany: "Company:",
        labelProject: "Project:",
        submitContactForm: "Submit",
    contactSoon: "Our team will reach out to you shortly to discuss the details of your project.",
        detailHeroTitle: "Our Services in Detail",
        detailHeroText: "Explore every solution we use to accelerate your business results. This page only opens from the service cards so you can focus on the offer that matters most to you.",
        detailBackLink: "Back to the cards",
        detailBackButton: "? Back",
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
            const tagline = document.querySelector('.intro-tagline');
            if (tagline && translations.es && translations.es.introTagline) {
              tagline.innerHTML = translations.es.introTagline;
            }
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
        'nav-blog': 'blogNav',
                'nav-blog-mobile': 'blogNav',
        'blog-kicker': 'blogKicker',
        'blog-title': 'blogTitle',
        'blog-subtitle': 'blogSubtitle',
        'blog-meta': 'blogMeta',
        'blog-eyebrow': 'blogEyebrow',
        'blog-article-title': 'blogArticleTitle',
        'blog-excerpt': 'blogExcerpt',
        'blog-cta': 'blogCta',
        'blog-stat1': 'blogStat1',
        'blog-stat2': 'blogStat2',
        'blog-stat3': 'blogStat3',
        'blog-stat4': 'blogStat4',
        'blog-stat5': 'blogStat5',
        'blog-stat6': 'blogStat6',
        'blog-stat7': 'blogStat7',
        'blog-stat8': 'blogStat8',
        'closing-cta-title': 'closingCtaTitle',
        'intro-title': 'introTitle',
        'intro-text': 'introText',
        'about-title': 'aboutTitle',
        'about-text': 'aboutText',
        'about-subtitle': 'aboutSubtitle',
        'why1-title': 'why1Title',
        'why1-text': 'why1Text',
        'why2-title': 'why2Title',
        'why2-text': 'why2Text',
        'why3-title': 'why3Title',
        'why3-text': 'why3Text',
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
        'detail-back-link': 'detailBackLink',
        'detail-back-button': 'detailBackButton'
    };
    const tagline = document.querySelector('.intro-tagline');
    if (tagline && translations[language] && translations[language].introTagline) {
      tagline.innerHTML = translations[language].introTagline;
    }

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
      ['#nav-problema','problemaButton'],['#nav-blog','blogNav'],['#nav-blog-mobile','blogNav']
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
    try { initWhyCarousel(); } catch(e) { /* noop */ }

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
    const isSafari = /^((!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari) {
        videos.forEach(video => {
            video.style.pointerEvents = 'none'; // Deshabilita la interacci?n solo en Safari
        });
    }
});

// Carousel para la sección "Por qué elegirnos" en mobile
(function(){
  let timer = null;
  let current = 0;
  const INTERVAL = 5000;
  const mq = window.matchMedia('(max-width: 768px)');

  function goTo(grid, cards, index, instant){
    if (!grid || !cards.length) return;
    const card = cards[index];
    if (!card) return;
    const raw = card.offsetLeft - grid.offsetLeft - ((grid.clientWidth - card.clientWidth) / 2) + grid.scrollLeft;
    const max = Math.max(0, grid.scrollWidth - grid.clientWidth);
    const left = Math.min(Math.max(0, raw), max);
    grid.scrollTo({ left, behavior: instant ? 'auto' : 'smooth' });
  }

  function start(grid, cards){
    clear();
    if (!grid || cards.length <= 1) return;
    // En mobile centramos el primer slide
    goTo(grid, cards, 0, true);
    timer = setInterval(() => {
      current = (current + 1) % cards.length;
      goTo(grid, cards, current);
    }, INTERVAL);
  }

  function clear(){ if (timer) { clearInterval(timer); timer = null; } }

  window.initWhyCarousel = function(){
    const grid = document.querySelector('.why-grid');
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll('.why-card'));
    current = 0;
    if (mq.matches) {
      // En mobile apilamos: sin carrusel, sin scroll horizontal
      clear();
      grid.scrollTo({ left: 0, behavior: 'auto' });
    } else {
      clear();
      grid.scrollTo({ left: 0, behavior: 'auto' });
      // Solo carrusel en desktop/tablet
      goTo(grid, cards, 0, true);
      start(grid, cards);
    }
  };

  mq.addEventListener('change', () => {
    try { initWhyCarousel(); } catch(e) {}
  });
  window.addEventListener('resize', () => {
    try { initWhyCarousel(); } catch(e) {}
  });
})();

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
        // Fallback EN si no hay traducci?n cargada
        if(st) st.textContent = 'Success Stories';
        if(si) si.textContent = 'Some of our success stories:';
      }
      // hint text
      var hint = (language==='en' ? (isTouchDevice() ? 'Tap to see more' : 'Click to see more') : (isTouchDevice() ? 'Toca para ver mas' : 'Click para ver mas'));
      document.querySelectorAll('.flip-hint').forEach(function(el){ el.textContent=hint; });
      var ctaText = (language==='en') ? 'See more' : 'Ver mas';
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





