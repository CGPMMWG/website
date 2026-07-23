(function () {
  const COURSE_MAIL = {
    "academy-diagnostico-digital-ceos.html": {
      es: "Diagn\u00f3stico Digital para CEOs",
      en: "Digital Diagnosis for CEOs",
    },
    "academy-webs-que-convierten.html": {
      es: "Webs que convierten",
      en: "Websites that convert",
    },
    "academy-branding-communication-b2b.html": {
      es: "Branding & Communication",
      en: "Branding & Communication",
    },
    "academy-paid-media-essentials.html": {
      es: "Marketing Digital desde Cero",
      en: "Digital Marketing from Zero",
    },
    "academy-marketing-automation-basics.html": {
      es: "Ventas Digitales para Emprendedores",
      en: "Digital Sales for Entrepreneurs",
    },
    "academy-ai-business-marketing.html": {
      es: "Creaci\u00f3n de Contenido con IA",
      en: "AI Content Creation",
    },
  };

  function getLang() {
    try {
      const q = new URLSearchParams(window.location.search).get("lang");
      if (q) return q.toLowerCase() === "en" ? "en" : "es";
    } catch (e) {
      /* noop */
    }
    try {
      const stored = localStorage.getItem("trendLang") || localStorage.getItem("preferredLanguage");
      if (stored) return stored.toLowerCase() === "en" ? "en" : "es";
    } catch (e) {
      /* noop */
    }
    return document.documentElement.lang === "en" ? "en" : "es";
  }

  function saveCourseLang(lang) {
    try {
      localStorage.setItem("trendLang", lang);
      localStorage.setItem("preferredLanguage", lang);
    } catch (e) {
      /* noop */
    }
  }

  function updateCourseHeaderLang(lang) {
    const copy = {
      es: {
        academy: "Academia",
        courses: "Cursos",
        cases: "Casos",
        contact: "Contacto",
      },
      en: {
        academy: "Academy",
        courses: "Courses",
        cases: "Cases",
        contact: "Contact",
      },
    };
    const t = copy[lang] || copy.es;
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang-code").forEach((el) => {
      el.textContent = lang.toUpperCase();
    });
    document.querySelectorAll('nav a[href="/academy/"]:not(.tm-header-badge)').forEach((el) => {
      el.textContent = t.academy;
    });
    document.querySelectorAll('nav a[href="/academy/#programas"]').forEach((el) => {
      el.textContent = t.courses;
    });
    document.querySelectorAll('nav a[href="../index.html#casos-exito"]').forEach((el) => {
      el.textContent = t.cases;
    });
    document.querySelectorAll('nav a[href="../index.html#contact-form"]').forEach((el) => {
      el.textContent = t.contact;
    });
  }

  function getCourse() {
    const filename = window.location.pathname.split("/").pop();
    return COURSE_MAIL[filename] || {
      es: document.querySelector(".course-hero h1")?.textContent.trim() || "TrendMakers Academy",
      en: document.querySelector(".course-hero h1")?.textContent.trim() || "TrendMakers Academy",
    };
  }

  function buildMailto(lang, courseName) {
    const subject =
      lang === "en"
        ? `Information request about the course: ${courseName} | TrendMakers Academy`
        : `Consulta sobre el curso: ${courseName} | TrendMakers Academy`;

    const body =
      lang === "en"
        ? [
            "Hi TrendMakers Academy,",
            "",
            `I would like to receive information about the course "${courseName}".`,
            "",
            "I would like to know more about:",
            "- Format and available dates",
            "- Price and payment options",
            "- Course contents and requirements",
            "",
            "Name:",
            "Company/team:",
            "Comments:",
          ].join("\n")
        : [
            "Hola TrendMakers Academy,",
            "",
            `Quiero recibir informaci\u00f3n sobre el curso "${courseName}".`,
            "",
            "Me interesa conocer:",
            "- Modalidad y fechas disponibles",
            "- Precio y formas de pago",
            "- Contenido y requisitos",
            "",
            "Nombre:",
            "Empresa/equipo:",
            "Comentarios:",
          ].join("\n");

    return `mailto:info@trendmakers.agency?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function updateCourseMailto() {
    const lang = getLang();
    const course = getCourse();
    const courseName = course[lang] || course.es;
    const href = buildMailto(lang, courseName);
    const label = lang === "en" ? "Request information" : "Solicitar informaci\u00f3n";

    document.querySelectorAll(".course-actions .course-btn.primary, .course-cta-actions .course-btn.primary").forEach((btn) => {
      btn.setAttribute("href", href);
      btn.textContent = label;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    updateCourseHeaderLang(getLang());
    updateCourseMailto();
    document.querySelectorAll(".lang-option").forEach((btn) => {
      btn.addEventListener("click", function () {
        const lang = (this.dataset.lang || "es").toLowerCase() === "en" ? "en" : "es";
        saveCourseLang(lang);
        updateCourseHeaderLang(lang);
        setTimeout(function () {
          updateCourseHeaderLang(lang);
          updateCourseMailto();
        }, 0);
      });
    });
    window.addEventListener("academyCourseLanguageChanged", function (event) {
      const lang = event.detail && event.detail.lang ? event.detail.lang : getLang();
      saveCourseLang(lang);
      updateCourseHeaderLang(lang);
      updateCourseMailto();
    });
  });
})();

