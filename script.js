
// Initialize/rebind mobile expand handlers safely (idempotent)
function initMobileServiceCards(){
  try {
    const isMobile = () => (('ontouchstart' in window) || navigator.maxTouchPoints > 0) || window.matchMedia('(max-width: 820px)').matches;
    // New: simple mobile behavior — tap title toggles description in place
    if (isMobile()) {
      // Use original behavior: full-card popup overlay on tap (handled below).
      // Clean any residual inline-open state from previous toggling approach.
      document.querySelectorAll('#servicios .service-card.open').forEach(function(c){ c.classList.remove('open'); });
      // Do not return; let the overlay binding below handle mobile clicks.
    }
    // Ensure single overlay and utilities live on window to persist across re-renders
    if (!window.__svc) window.__svc = { origPos: new WeakMap(), bound: false };
    const state = window.__svc;

    let overlay = document.querySelector('.card-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'card-overlay';
      document.body.appendChild(overlay);
    }

    const closeExpanded = () => {
      const open = overlay.querySelector('.service-card.expanded') || document.querySelector('#servicios .service-card.expanded');
      if (open) {
        open.classList.remove('expanded');
        const meta = state.origPos.get(open);
        if (meta && meta.parent) {
          if (meta.next && meta.next.parentNode === meta.parent) meta.parent.insertBefore(open, meta.next);
          else meta.parent.appendChild(open);
        }
        state.origPos.delete(open);
      }
      overlay.classList.remove('active');
      document.body.classList.remove('no-scroll');
    };
    window.__svcClose = closeExpanded;

    // Bind overlay listeners once
    if (!overlay.dataset.bound) {
      overlay.addEventListener('click', (e) => { if (e.target === overlay) closeExpanded(); });
      // Close on scroll/touch move/wheel anywhere
      const closeOnScroll = () => closeExpanded();
      document.addEventListener('scroll', closeOnScroll, true);
      overlay.addEventListener('wheel', closeOnScroll, { passive: true });
      overlay.addEventListener('touchmove', closeOnScroll, { passive: true });
      overlay.dataset.bound = '1';
    }
    if (!state.bound) {
      window.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') closeExpanded(); });
      window.addEventListener('resize', () => { if (!isMobile()) closeExpanded(); });
      state.bound = true;
    }

    // Delegate mobile open handler to the container so it survives re-renders
    const container = document.querySelector('#servicios .service-details');
    if (container && container.dataset.expandDelegated !== '1') {
      const openFromEvent = function(e){
        if (!isMobile()) return;
        const card = e.target.closest('.service-card');
        if (!card || !container.contains(card)) return;
        e.preventDefault();
        e.stopPropagation();
        const alreadyOpen = card.classList.contains('expanded');
        closeExpanded();
        if (!alreadyOpen) {
          state.origPos.set(card, { parent: card.parentNode, next: card.nextSibling });
          overlay.appendChild(card);
          card.classList.add('expanded');
          overlay.classList.add('active');
          document.body.classList.add('no-scroll');
        }
      };
      container.addEventListener('click', openFromEvent, { passive: false });
      container.addEventListener('touchend', openFromEvent, { passive: false });
      container.addEventListener('pointerup', openFromEvent);
      container.dataset.expandDelegated = '1';
    }
  } catch (e) { /* noop */ }
}
// Snapshot store for restoring original ES content
if (!window.__i18nOrig) window.__i18nOrig = { snapTaken: false, elems: {}, serviceDetailsHTML: '', teamDetailsHTML: '' };
const __orig = window.__i18nOrig;

function takeI18nSnapshot(){
  if (__orig.snapTaken) return;
  try {
    const ids = [
      'nav-inicio','nav-acerca','nav-servicios','nav-contacto','nav-equipo','nav-casos-exito','nav-problema',
      'intro-title','intro-text','about-title','about-text','services-title','services-text','team-title',
      'contact-title','schedule-call','show-popup','popup-title','label-email','label-problema','submit-button',
      'footer-text','about-us-text','label-name','label-company','label-project','submit-contact-form','contact-soon',
      'success-intro','success-title','success-case1','success-case2'
    ];
    ids.forEach(id=>{ const el=document.getElementById(id); if(el) __orig.elems[id]=el.innerHTML; });
    const svc = document.querySelector('.service-details');
    if (svc) __orig.serviceDetailsHTML = svc.innerHTML;
    const team = document.querySelector('.team-details');
    if (team) __orig.teamDetailsHTML = team.innerHTML;
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
        servicesText: "Ofrecemos una amplia gama de servicios de marketing digital...",
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
            <div class="service-card">
                <img src="logo1.png" alt="Marketing & Tecnología">
                <h3>Marketing & Tecnología</h3>
                <p>Usamos plataformas tecnológicas y desarrollos a medida para optimizar los procesos de Marketing y Ventas, implementando automatización en los ciclos comerciales.</p>
            </div>
            <div class="service-card">
                <img src="logo1.png" alt="Leads">
                <h3>Leads</h3>
                <p>Generación de Prospectos/Leads para plataformas SaaS y empresas de servicios. Implementación e Integración con CRM.</p>
            </div>
            <div class="service-card">
                <img src="IA.jpg" alt="CHATGPT - IA">
                <h3>CHATGPT - IA</h3>
                <p>Potenciamos tu empresa capacitando en ChatGPT y otras herramientas de Inteligencia Artificial en el día a día a todos los sectores y empleados.</p>
            </div>
            <div class="service-card">
                <img src="logo1.png" alt="Diseño/Comunicación">
                <h3>Diseño/Comunicación</h3>
                <p>Diseño y maquetado de Webs, Landing Pages, WordPress y Newsletters. Diseño de piezas gráficas para redes sociales, publicidad, eventos. Community Management.</p>
            </div>
            <div class="service-card">
                <img src="logo1.png" alt="E-Commerce">
                <h3>E-Commerce</h3>
                <p>Operamos nuestros propios e-commerce. Sabemos cómo hacerlo. Te acompañamos desde la idea hasta la puesta en marcha en todas las etapas del proyecto.</p>
            </div>
            <div class="service-card">
                <img src="logo1.png" alt="Consultoría">
                <h3>Consultoría</h3>
                <p>Brindamos consultoría en Marketing & Tecnología (infraestructura o software) para tus proyectos.</p>
            </div>
            <div class="service-card">
                <img src="logo1.png" alt="Datos y Analítica">
                <h3>Datos y Analítica</h3>
                <p>Convertimos datos en información valiosa y accionable. Utilizamos herramientas avanzadas para interpretar métricas y generar insights que impulsen decisiones estratégicas.</p>
            </div>
            <div class="service-card">
                <img src="logo1.png" alt="Estudios de Mercado">
                <h3>Estudios de Mercado</h3>
                <p>Realizamos estudios de mercado exhaustivos para entender tendencias y necesidades de tu público objetivo. Proveemos análisis detallados para identificar oportunidades y desarrollar estrategias efectivas.</p>
            </div>
            <div class="service-card">
                <img src="logo1.png" alt="Desarrollo WEB">
                <h3>Desarrollo WEB</h3>
                <p>Desarrollamos sitios y plataformas digitales de alto rendimiento, adaptados a tus necesidades. Desde el diseño inicial hasta la implementación final, garantizamos una experiencia de usuario excepcional y un rendimiento óptimo.</p>
            </div>
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
        servicesText: "We offer a wide range of digital marketing services...",
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
            <div class="service-card">
                <img src="logo1.png" alt="Marketing & Technology">
                <h3>Marketing & Technology</h3>
                <p>We use technological platforms and custom developments to optimize Marketing and Sales processes, implementing automation in commercial cycles.</p>
            </div>
            <div class="service-card">
                <img src="logo1.png" alt="Leads">
                <h3>Leads</h3>
                <p>Lead generation for SaaS platforms and service companies. Implementation and integration with CRM.</p>
            </div>
            <div class="service-card">
                <img src="IA.jpg" alt="CHATGPT - AI">
                <h3>CHATGPT - AI</h3>
                <p>We empower your company by training all sectors and employees in ChatGPT and other Artificial Intelligence tools for day-to-day operations.</p>
            </div>
            <div class="service-card">
                <img src="logo1.png" alt="Design/Communication">
                <h3>Design/Communication</h3>
                <p>Design and layout of Websites, Landing Pages, WordPress, and Newsletters. Design of graphic pieces for social media, advertising, events. Community Management.</p>
            </div>
            <div class="service-card">
                <img src="logo1.png" alt="E-Commerce">
                <h3>E-Commerce</h3>
                <p>We operate our own e-commerce platforms. We know how to do it. We accompany you from the idea to the launch in all stages of the project.</p>
            </div>
            <div class="service-card">
                <img src="logo1.png" alt="Consulting">
                <h3>Consulting</h3>
                <p>We provide consulting in Marketing & Technology (infrastructure or software) for your projects.</p>
            </div>
            <div class="service-card">
                <img src="logo1.png" alt="Data and Analytics">
                <h3>Data and Analytics</h3>
                <p>We turn data into valuable and actionable information. Using advanced tools, we interpret metrics and generate insights that drive strategic decisions.</p>
            </div>
            <div class="service-card">
                <img src="logo1.png" alt="Market Research">
                <h3>Market Research</h3>
                <p>We conduct comprehensive market research to understand trends and the needs of your target audience. We provide detailed analyses to identify opportunities and develop effective strategies.</p>
            </div>
            <div class="service-card">
                <img src="logo1.png" alt="Web Development">
                <h3>Web Development</h3>
                <p>We develop high-performance websites and digital platforms tailored to your needs. From initial design to final implementation, we ensure an exceptional user experience and optimal performance.</p>
            </div>
        `,
        contactFormTitle: "Need help with digital marketing? TrendMakers is your solution",
        labelName: "Name:",
        labelCompany: "Company:",
        labelProject: "Project:",
        submitContactForm: "Submit",
        contactSoon: "Our team will reach out to you shortly to discuss the details of your project."
    }
};

function updateSuccessCards() {
    try {
        const c1 = document.getElementById('success-case1');
        const c2 = document.getElementById('success-case2');
        if (c1) {
            document.querySelectorAll('.success-content[data-key="success-case1"]').forEach(n => n.innerHTML = c1.innerHTML);
        }
        if (c2) {
            document.querySelectorAll('.success-content[data-key="success-case2"]').forEach(n => n.innerHTML = c2.innerHTML);
        }
    } catch (e) { /* noop */ }
}

function setLanguage(language) {
    // Mantener el contenido original cuando se selecciona Español.
    // La página está maquetada nativamente en ES, así evitamos desfasajes de redacción.
    if (language === 'es') {
        try { initMobileServiceCards(); } catch (e) {}
        return;
    }
    const elementsToUpdate = {
        'title': 'title',
        'subtitle': 'subtitle',
        'nav-inicio': 'navInicio',
        'nav-acerca': 'navAcerca',
        'nav-servicios': 'navServicios',
        'nav-contacto': 'navContacto',
        'nav-equipo': 'navEquipo',
        // Nav item for Success Stories (matches index.html id="nav-casos-exito")
        'nav-casos-exito': 'navcasosexito',
        'nav-problema': 'problemaButton', // Asegurarnos de incluir el botón "Contanos tu Proyecto"
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
        'success-case2': 'successCase2'
    };

    for (const id in elementsToUpdate) {
        const translationKey = elementsToUpdate[id];
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = translations[language][translationKey];
        }
    }

    const serviceDetailsElement = document.querySelector('.service-details');
    if (serviceDetailsElement) {
        serviceDetailsElement.innerHTML = translations[language].serviceDetails;
        // Asegurar visibilidad tras re-render (evita que queden ocultas)
        try {
            const newCards = document.querySelectorAll('#servicios .service-card');
            newCards.forEach(el => el.classList.add('visible'));
        } catch (e) { /* noop */ }
        // Re-vincular interacción mobile tras re-render por cambio de idioma
        try { initMobileServiceCards(); } catch (e) { /* noop */ }
    }

    const teamDetailsElement = document.querySelector('.team-details');
    if (teamDetailsElement) {
        teamDetailsElement.innerHTML = translations[language].teamDetails;
    }

    // Actualizar los elementos de la barra de navegación
    document.getElementById('nav-inicio').innerHTML = translations[language].navInicio;
    document.getElementById('nav-acerca').innerHTML = translations[language].navAcerca;
    document.getElementById('nav-servicios').innerHTML = translations[language].navServicios;
    document.getElementById('nav-contacto').innerHTML = translations[language].navContacto;
    document.getElementById('nav-equipo').innerHTML = translations[language].navEquipo;
    var navSuccessEl = document.getElementById('nav-casos-exito');
    if (navSuccessEl) navSuccessEl.innerHTML = translations[language].navcasosexito;
    document.getElementById('nav-problema').innerHTML = translations[language].problemaButton; // Actualizar el botón "Contanos tu Proyecto"
}

// Override with a robust, reversible language switcher
function setLanguage(language) {
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
        'success-case2': 'successCase2'
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
}

// Animaciones de entrada
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Ajustar el umbral para activar la animación cuando el 10% del elemento esté visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Dejar de observar una vez que el elemento se ha hecho visible
            }
        });
    }, observerOptions);

    // Seleccionar todos los elementos que deben ser animados
    const animatedElements = document.querySelectorAll('.animate__animated, .service-card');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Pop-up removido: permitir que el enlace mailto funcione directamente

    // Mobile service-card expand/collapse (delegation + rebind-safe)
    try { initMobileServiceCards(); } catch (e) { /* noop */ }

    // Preloader
    const preloader = document.getElementById('preloader');
    const body = document.body;

    window.addEventListener('load', function() {
        preloader.style.display = 'none';
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
      if(t){
        if(st&&t.successtitle) st.innerHTML=t.successtitle;
        if(si&&t.successIntro) si.innerHTML=t.successIntro;
        if(sc1) sc1.innerHTML = t.successCase1 || sc1.innerHTML;
        if(sc2) sc2.innerHTML = t.successCase2 || sc2.innerHTML;
        // Escribir directamente en las tarjetas (sin depender del copiado desde los p ocultos)
        document.querySelectorAll('.success-content[data-key="success-case1"]').forEach(function(n){ n.innerHTML = t.successCase1 || ''; });
        document.querySelectorAll('.success-content[data-key="success-case2"]').forEach(function(n){ n.innerHTML = t.successCase2 || ''; });
      } else {
        // Fallback EN si no hay traducción cargada
        if(st) st.textContent = 'Success Stories';
        if(si) si.textContent = 'Some of our success stories:';
      }
      // hint text
      var hint=(language==='en')?(isTouchDevice()? 'Tap to see details' : 'Click to see details'):(isTouchDevice()? 'Toca para ver detalles' : 'Click para ver detalles');
      document.querySelectorAll('.flip-hint').forEach(function(el){ el.textContent=hint; });
    }catch(e){}
  }
  document.addEventListener('DOMContentLoaded', function(){
    try{
      var cards=document.querySelectorAll('.flip-card');
      cards.forEach(function(card){
        var toggle=function(){ card.classList.toggle('is-flipped'); };
        card.addEventListener('click',toggle);
        card.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); toggle(); } });
      });
      syncSuccessContent('es');
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
