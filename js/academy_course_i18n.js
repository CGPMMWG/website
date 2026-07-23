(function () {
  const STORAGE_KEYS = ["trendLang", "preferredLanguage"];

  const shared = {
    es: {
      back: "<- Volver a cursos",
      nav: ["Academia", "Cursos", "Casos", "Contacto"],
      primary: "Solicitar informacion",
      modules: "Ver modulos",
      content: "Contenido",
      result: "Resultado",
      audience: "Para quien es",
      detection: "Deteccion",
      format: "Modalidad y precio",
      formatOnly: "Modalidad",
      price: "Precio",
      launchPrice: "Precio lanzamiento",
      investment: "Inversion",
      courseFormat: "Formato del curso",
      courseIncludes: "Que incluye el curso",
      courseWork: "Que se trabaja en el curso",
      formatLabel: "Formato",
      durationLabel: "Duracion estimada",
      levelLabel: "Nivel",
      includesLabel: "Incluye",
      certificateLabel: "Certificacion",
      onlineCourse: "Curso online",
      certified: "TrendMakers Academy Certified",
    },
    en: {
      back: "<- Back to courses",
      nav: ["Academy", "Courses", "Cases", "Contact"],
      primary: "Request information",
      modules: "View modules",
      content: "Content",
      result: "Outcome",
      audience: "Who it is for",
      detection: "Detection",
      format: "Format and price",
      formatOnly: "Format",
      price: "Price",
      launchPrice: "Launch price",
      investment: "Investment",
      courseFormat: "Course format",
      courseIncludes: "What the course includes",
      courseWork: "What you will work on",
      formatLabel: "Format",
      durationLabel: "Estimated duration",
      levelLabel: "Level",
      includesLabel: "Includes",
      certificateLabel: "Certification",
      onlineCourse: "Online course",
      certified: "TrendMakers Academy Certified",
    },
  };

  const courses = {
    "academy-diagnostico-digital-ceos.html": {
      meta: ["Digital Diagnosis for CEOs | TrendMakers Academy", "TrendMakers Academy Digital Diagnosis for CEOs course: detect missed opportunities in website, social channels, positioning, funnel and automation."],
      hero: {
        kicker: "Course 01",
        title: "Digital Diagnosis for CEOs",
        leads: [
          "Learn how to read your digital ecosystem with business criteria and detect opportunities that may be getting lost across your website, social channels, communication, funnel and sales follow-up.",
          "A practical course for owners, CEOs, founders and managers who want to understand what is working, what is failing and what to prioritize before investing more in marketing, ads, content, web or automation.",
        ],
        cardTitle: "For companies that are already online, but are not converting enough.",
        cardText: [
          "Many companies have a website, social channels, campaigns or active content, but they do not always have a clear reading of which part of the system is slowing results down.",
          "This course organizes the executive view of the digital ecosystem: website, positioning, communication, funnel, automation, sales follow-up and leakage points.",
        ],
        facts: ["Website and digital experience", "Social channels and positioning", "Sales funnel", "Automation and follow-up", "Missed opportunities", "Improvement priorities"],
      },
      modules: [
        ["Ecosystem audit", "Learn how to review the main digital assets of the business: website, social channels, messages, channels, value proposition and online presence.", "The goal is to understand whether the brand communicates clearly, builds trust and supports the sales process across its touchpoints."],
        ["Funnel and leakage points", "Analyze what happens from the moment someone discovers the brand until they inquire, receive follow-up and eventually buy.", "You will learn to detect friction in forms, WhatsApp, messages, response times, CTAs, content and basic automations."],
        ["Improvement priorities", "Turn diagnosis findings into a clear list of actionable opportunities.", "The focus is not to detect isolated problems, but to prioritize what to fix first based on potential impact, urgency and implementation difficulty."],
      ],
      results: [
        ["Map", "Digital diagnosis", "An organized reading of your assets, channels, messages and improvement opportunities.", "It helps you understand how your digital ecosystem is working and where the main gaps may be."],
        ["Checklist", "Critical points", "A practical framework to know what to review before investing more in marketing, ads, website redesign or automation.", "Useful as a guide for internal decisions or conversations with agencies and vendors."],
        ["Roadmap", "Next steps", "A simple prioritization to decide what to fix first.", "The final outcome is an initial action plan with improvements ordered by impact, ease and relevance to the business."],
      ],
      audienceTitle: "This course is ideal for:",
      audience: [
        ["Owners and CEOs", "Who want to better understand what is happening in their digital presence before continuing to invest."],
        ["Founders and entrepreneurs", "Who need to organize their website, social channels, messages and sales process."],
        ["Sales or marketing managers", "Who need a clearer view of opportunities, leakage points and improvement priorities."],
        ["Companies with active online presence", "That have a website, social channels or campaigns, but feel results do not reflect the effort invested."],
      ],
      checklistTitle: "What you will be able to detect",
      checklist: [
        "Whether your website clearly explains what you do and why people should choose you.",
        "Whether your social channels build trust or only act as presence.",
        "Whether your value proposition is clear for someone who does not know your brand.",
        "Whether your calls to action guide users correctly.",
        "Whether you are losing inquiries because of lack of follow-up.",
        "Whether there are leakage points between traffic, interest, contact and sale.",
        "Which improvements should be prioritized before investing more budget.",
      ],
      info: ["Online course", "20 hours", "Beginner / strategic", "Templates, checklist and improvement roadmap"],
      pricing: [
        ["Option 1", "Individual course", "USD 600", ["Course access.", "Digital diagnosis template.", "Critical points checklist.", "Next steps roadmap.", "Completion certificate."]],
        ["Option 2", "Course + personalized review", "USD 1200", ["Includes everything above, plus an applied review of your business, website or digital presence.", "Ideal if you want concrete feedback on which opportunities to prioritize and which improvements could have the highest impact."]],
      ],
      cta: ["Detect where opportunities are being lost.", "Before investing more in advertising, content, design or automation, you need to understand which part of the ecosystem is working and which part needs adjustment.", "Ask us for information and we will guide you toward the ideal format for you, your company or your team."],
    },
    "academy-webs-que-convierten.html": {
      meta: ["Websites that Convert | TrendMakers Academy", "Websites that Convert course: learn how to structure a website or e-commerce experience to generate inquiries, sales and leads."],
      hero: {
        kicker: "Course 02",
        title: "Websites that Convert",
        leads: [
          "Learn how to structure a website or e-commerce experience to build trust, explain your offer better and convert more visits into inquiries, sales or leads.",
          "A practical guide to understand what makes a page work commercially: not only how it looks, but how it organizes information, answers doubts, reduces friction and guides the user toward a concrete action.",
        ],
        cardTitle: "For brands with online presence that convert less than expected.",
        cardText: [
          "Many websites receive visits, but fail to turn that traffic into real opportunities. Sometimes the problem is not visit volume, but message clarity, page structure, lack of trust or an unintuitive path.",
          "This course explains how to review and organize the main elements of a results-oriented website: hero, value proposition, sections, content, CTAs, mobile experience, speed and trust signals.",
        ],
        facts: ["Hero and value proposition", "CTAs and user journey", "Trust, UX and mobile", "Speed and conversion", "Section structure", "Priority improvements"],
      },
      modules: [
        ["Conversion architecture", "How to organize the main structure of a website: hero, value proposition, sections, message hierarchy and calls to action.", "The goal is to understand how the page should flow so a person quickly understands what you offer, why it matters and what the next step is."],
        ["Trust and experience", "How to use trust signals, relevant content, clear design, mobile experience and speed to reduce doubts and friction.", "You will work on elements such as testimonials, cases, benefits, processes, FAQs, forms, buttons and navigation."],
        ["Measurement and improvement", "How to identify possible blockers inside a website and prioritize changes without redesigning everything from scratch.", "The focus is to review behavior, detect weak points and make better decisions about what to adjust first."],
      ],
      results: [
        ["Checklist", "Conversion-oriented website", "A practical guide to evaluate whether a website or landing page has the basic elements to build trust, explain the offer and guide the user toward action."],
        ["Map", "Recommended structure", "A simple model of sections and messages to organize a page with focus on clarity, journey and conversion."],
        ["Criteria", "Priority improvements", "A tool to identify possible adjustments and prioritize them by impact, implementation ease and business relevance."],
      ],
      info: ["Online course", "2.5 hours", "Beginner / applied", "Checklist, website structure template and improvement guide"],
      pricing: [["Online course", "Websites that Convert", "USD 25", ["Includes course access, checklist, website structure template, improvement guide and completion certificate."]]],
      cta: ["Convert the traffic you already have better.", "Before investing more in ads, content or redesign, you need to understand whether your website is ready to explain, build trust and convert.", "Ask us for information and we will see if this course fits your website, online store or landing page."],
    },
    "academy-branding-communication-b2b.html": {
      meta: ["Branding & Communication | TrendMakers Academy", "Branding & Communication course: learn how to communicate your brand value better, organize messages and build a clearer professional presence."],
      hero: {
        kicker: "Course 03",
        title: "Branding & Communication",
        leads: [
          "Learn how to communicate your brand value better, organize your messages and build a clearer, more professional and differentiated presence.",
          "A practical course for entrepreneurs, brands, professionals and teams that need to explain better what they do, who they help and why their offer should be chosen.",
        ],
        cardTitle: "For brands that have value, but cannot communicate it clearly.",
        cardText: [
          "Many brands have strong products, services or capabilities, but their communication does not always reflect that value. Sometimes the problem is not the offer, but how it is explained: generic messages, inconsistent tone, messy design, unclear social channels or a hard-to-understand value proposition.",
          "This course covers the fundamentals of clearer and more professional communication: narrative, tone, value proposition, sales messages, social channels, presentations and key brand assets.",
        ],
        facts: ["Narrative and positioning", "Value proposition", "Tone and consistency", "Professional presence", "Presentations and materials", "Sales messages"],
      },
      modules: [
        ["Positioning and narrative", "How to explain simply what a brand does, who it helps, what problem it solves and why its offer has value.", "The goal is to build a clear narrative that helps organize communication across website, social channels, presentations and sales conversations."],
        ["Brand tone and messages", "How to define a more consistent and professional tone for different channels.", "You will work on main messages, sales copy, claims, service descriptions and ways to communicate value without sounding generic, exaggerated or unclear."],
        ["Key communication assets", "How to organize pieces that influence brand perception: social channels, website, presentations, proposals, one pagers, emails and sales messages.", "The focus is to understand what each asset should communicate and how to make it clearer, more useful and more trustworthy."],
        ["Differentiation and clarity", "How to avoid generic messages and build more specific, relevant communication aligned with the audience you want to reach.", "You will work on criteria to differentiate better, prioritize messages and reinforce the brand's professional perception."],
      ],
      results: [
        ["Framework", "Value proposition", "A simple methodology to organize what the brand offers, who it helps, what problem it solves and what makes it different."],
        ["Guide", "Tone and messages", "Practical criteria to communicate with more clarity and consistency across website, social channels, presentations, proposals and sales messages."],
        ["Checklist", "Key assets", "A list of pieces and touchpoints worth reviewing to improve presence, professional perception and sales conversations."],
        ["Model", "Sales message", "A base structure to explain services, benefits, use cases and next steps more clearly."],
      ],
      info: ["Online course", "2 hours", "Beginner / applied", "Value proposition framework, message guide and brand asset checklist"],
      pricing: [["Online course", "Branding & Communication", "USD 85", ["Includes course access, value proposition framework, message guide, brand asset checklist and completion certificate."]]],
      cta: ["Make your brand value easier to understand.", "A strong offer needs clear communication. Before investing more in content, advertising, design or sales, your value proposition needs to be understood, look professional and build trust.", "Ask us for information and we will see if this course fits your brand, business or growth stage."],
    },
    "academy-paid-media-essentials.html": {
      meta: ["Digital Marketing from Zero | TrendMakers Academy", "Digital Marketing from Zero course: learn fundamentals, channels, content, funnels, metrics and build an initial digital marketing plan."],
      hero: {
        kicker: "Course 04",
        title: "Digital Marketing from Zero",
        leads: [
          "Learn the fundamentals of digital marketing and build a clear foundation to improve the online presence of your business, brand or venture.",
          "Introductory training for people who want to understand how digital marketing works without getting lost among social media, ads, metrics, tools, content and trends.",
          "The proposal is to organize the main concepts, understand the role of each channel and build a simple plan to start making better digital decisions.",
        ],
        cardTitle: "For people who want to start digital marketing with more clarity.",
        cardText: [
          "Starting can feel confusing: social media, website, content, ads, SEO, email marketing, WhatsApp, funnels, metrics, automation and many more tools.",
          "This course brings digital marketing fundamentals down to earth so you understand what each channel does, how they connect and which actions to prioritize based on the business stage.",
        ],
        facts: ["Digital marketing fundamentals", "Channels and online presence", "Content and trust", "Funnels and basic conversion", "Initial metrics", "30-day action plan"],
      },
      modules: [
        ["Digital marketing fundamentals", "What digital marketing is, what it is for and how it differs from selling, posting on social media or running ads.", "The goal is to understand the general logic: attract people, communicate value, build trust and turn interest into opportunities."],
        ["Main digital channels", "How the main channels work: website, social media, LinkedIn, email, WhatsApp, content, SEO and paid advertising.", "You will work on the role of each channel and how to choose where to start without trying to be everywhere at once."],
        ["Customer, message and content", "How to define who you talk to, what problem you solve and how to communicate your offer more clearly.", "You will also review what type of content helps educate, show value, build trust and support a purchase decision."],
        ["Basic funnel and conversion", "How to understand the journey from discovering your brand to inquiring, buying or moving to the next step.", "The focus is to understand how attraction, trust, message, offer and conversion connect."],
        ["Metrics and continuous improvement", "How to identify simple metrics to measure progress without getting overwhelmed.", "You will learn what to watch at the beginning, how to interpret basic signals and how to adjust actions based on results."],
        ["Initial marketing plan", "How to turn the course concepts into concrete actions for the next 30 days.", "The focus is to define simple goals, choose priority channels, organize content ideas and measure progress with criteria."],
      ],
      results: [
        ["Framework", "Digital fundamentals", "A simple methodology to understand how online presence, content, channels, trust, conversion and sales connect."],
        ["Checklist", "Channels and priorities", "A guide to review which digital channels may make the most sense depending on business type, stage and available resources."],
        ["Template", "30-day marketing plan", "A practical model to organize goals, actions, channels, content and basic metrics during the first month."],
        ["Bank", "Initial content ideas", "A base of ideas to start publishing with more intention and stop depending on improvisation."],
        ["Guide", "Basic metrics", "A simple framework to understand which indicators to watch at the beginning and how to use them to improve decisions."],
      ],
      info: ["Online course", "100 hours", "Beginner", "Channel checklist, marketing plan template, initial idea bank and metrics guide"],
      pricing: [["Online course", "Digital Marketing from Zero", "USD 45", ["Includes course access, channel checklist, marketing plan template, initial idea bank, metrics guide and completion certificate."]]],
      cta: ["Stop improvising and start organizing your digital marketing.", "Before investing in ads, design, tools or agencies, you need to understand what you are doing, for whom, through which channel and with what goal.", "This course gives you a clear foundation to start building a digital presence with better criteria."],
    },
    "academy-marketing-automation-basics.html": {
      meta: ["Digital Sales for Entrepreneurs | TrendMakers Academy", "Digital Sales for Entrepreneurs course: learn how to answer inquiries, present your offer and follow up to convert more interested people into customers."],
      hero: {
        kicker: "Course 05",
        title: "Digital Sales for Entrepreneurs",
        leads: [
          "Learn how to answer inquiries, present your offer and follow up to convert more interested people into customers.",
          "A practical course for entrepreneurs, independent professionals and businesses that sell through WhatsApp, Instagram, email, forms or calls, but feel many opportunities are lost in the process.",
          "The proposal is to organize sales communication, improve responses and build a simple flow to manage inquiries with more clarity.",
        ],
        cardTitle: "For businesses that receive inquiries, but convert less than expected.",
        cardText: [
          "Many sales are not lost because of lack of interest, but because of lack of process: late replies, improvised messages, unclear offers, poorly handled objections or no follow-up.",
          "This course explains how to respond better, what information to ask for, how to present an offer and how to follow up without sounding pushy.",
        ],
        facts: ["WhatsApp and Instagram", "Sales messages", "Offer presentation", "Frequent objections", "Sales follow-up", "Simple closing flow"],
      },
      modules: [
        ["First response and qualification", "How to answer an initial inquiry in a clear, professional way oriented to the next step.", "The goal is to understand what the person needs, which information to request and how to avoid replies that cool the conversation down."],
        ["Offer presentation", "How to explain a product or service in a simple, concrete way focused on value.", "You will work on message structure, benefits, prices, packages and ways to present the proposal without making it long, confusing or unconvincing."],
        ["Objections and follow-up", "How to answer common doubts such as \"I need to think about it\", \"it is expensive\" or \"I will let you know later\".", "You will also work on following up naturally, professionally and without pressure."],
        ["Simple sales flow", "How to organize the process from inquiry to closing.", "The focus is to build a basic sequence to manage interested people, record conversations, define next steps and stop relying on improvisation."],
      ],
      results: [
        ["Scripts", "Sales messages", "Simple models to answer inquiries, ask for information, present offers and guide interested people toward the next step."],
        ["Checklist", "Objections and follow-up", "A practical guide to prepare responses to frequent doubts and follow up without sounding pushy."],
        ["Flow", "Basic sales process", "A model to organize the main stages: inquiry, qualification, offer, follow-up and closing."],
        ["Template", "Opportunity tracking", "A simple tool to record inquiries, opportunity status, next steps and follow-up dates."],
      ],
      info: ["Online course", "25 hours", "Beginner / applied", "Scripts, objection checklist, sales flow and follow-up template"],
      pricing: [["Online course", "Digital Sales for Entrepreneurs", "USD 19", ["Includes course access, scripts, objection checklist, sales flow, follow-up template and completion certificate."]]],
      cta: ["Stop losing inquiries because of lack of follow-up.", "If you are already generating interested people, you need a simple process to respond better, present your offer and guide each opportunity to the next step.", "Ask us for information and we will see if this course fits your business, service or sales stage."],
    },
    "academy-ai-business-marketing.html": {
      meta: ["AI Content Creation | TrendMakers Academy", "AI Content Creation course: learn how to use AI to generate ideas, copy, calendars and sales content with better criteria."],
      hero: {
        kicker: "Course 06",
        title: "AI Content Creation",
        leads: [
          "Learn how to use AI tools to generate ideas, copy, calendars and sales content with more speed, clarity and criteria.",
          "A practical course for entrepreneurs, brands, professionals and teams that want to use artificial intelligence to create content without always depending on inspiration, improvisation or slow processes.",
          "The proposal is not to use AI to publish generic content, but to learn how to prompt better, organize ideas, adapt messages and produce more useful pieces for social media, blogs, campaigns and sales communication.",
        ],
        cardTitle: "For brands that need to create content with more order and speed.",
        cardText: [
          "Creating content consistently can become difficult: ideas run out, messages repeat, copy sounds generic or there is no clear calendar.",
          "This course explains how to use AI tools to speed up the creative process, organize topics, generate drafts, improve copy and build a content base applicable to different channels.",
        ],
        facts: ["Prompts and idea generation", "Content calendar", "Posts, captions and carousels", "Sales content", "Copy optimization", "AI applied with criteria"],
      },
      modules: [
        ["AI fundamentals for content", "How to understand the role of AI in content creation and what it can do well when used with criteria.", "The goal is to learn how to use these tools as support to think, organize and produce better, not as an automatic replacement for strategy."],
        ["Prompts and content ideas", "How to write better instructions to get more useful, specific ideas aligned with a brand or business.", "You will work on prompts to generate topics, angles, titles, hooks, post ideas, reels, carousels, emails and sales pieces."],
        ["Calendar and planning", "How to turn loose ideas into a more organized content calendar.", "The focus is to organize posts by goals: educate, build trust, show product or service, answer doubts and support purchase decisions."],
        ["Copy for social media and sales communication", "How to use AI to create and improve captions, posts, carousels, simple ads, emails, sales messages and website copy.", "You will work on clarity, tone, structure, calls to action and adapting content by channel."],
        ["Editing and content improvement", "How to review AI-generated copy so it does not sound generic, exaggerated or unnatural.", "The goal is to improve style, precision, tone, differentiation and usefulness before publishing."],
        ["Simple AI content system", "How to build a basic process to create content more consistently.", "The focus is to organize idea sources, base prompts, calendar, final review and publishing."],
      ],
      results: [
        ["Kit", "Content prompts", "A prompt base to generate ideas, titles, captions, carousels, emails, sales messages and copy for different channels."],
        ["Template", "Content calendar", "A model to organize posts by topic, goal, channel, format and customer stage."],
        ["Framework", "Content with criteria", "A simple methodology to avoid generic content and connect each piece with a goal: attract, educate, build trust or sell."],
        ["Checklist", "Review before publishing", "A guide to review clarity, tone, usefulness, coherence and quality of AI-generated content."],
      ],
      info: ["Online course", "14 hours", "Beginner / applied", "Prompt kit, calendar template, review checklist and content framework"],
      pricing: [["Online course", "AI Content Creation", "USD 19", ["Includes course access, prompt kit, calendar template, review checklist, content framework and completion certificate."]]],
    },
  };

  const original = new Map();
  const textTargets = "title, meta[name='description'], .course-back, .course-kicker, .course-hero h1, .course-lead, .course-card h2, .course-card p, .course-facts span, .course-actions .course-btn, .course-heading span, .course-heading h2, .module-card h3, .module-card p, .result-card strong, .result-card h3, .result-card p, .detail-card h3, .detail-card p, .course-checklist li, .course-info-grid strong, .course-info-grid span, .price-card span, .price-card h3, .price-card p, .price-card li, .course-cta h2, .course-cta p, .course-cta-actions .course-btn";

  function filename() {
    return window.location.pathname.split("/").pop();
  }

  function normalizeLang(lang) {
    return (lang || "es").toLowerCase() === "en" ? "en" : "es";
  }

  function saveLang(lang) {
    STORAGE_KEYS.forEach((key) => {
      try { localStorage.setItem(key, lang); } catch (e) { /* noop */ }
    });
  }

  function withLang(href, lang) {
    const hashIndex = href.indexOf("#");
    const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
    const base = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
    const cleanBase = base.replace(/[?&]lang=(es|en)/, "");
    const separator = cleanBase.includes("?") ? "&" : "?";
    return `${cleanBase}${separator}lang=${lang}${hash}`;
  }

  function syncUrlLang(lang) {
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.get("lang") === lang) return;
      url.searchParams.set("lang", lang);
      window.history.replaceState({}, "", url);
    } catch (e) { /* noop */ }
  }

  function syncCourseLinks(lang) {
    const back = document.querySelector(".course-back");
    if (back) back.setAttribute("href", withLang("/academy/#programas", lang));
    document.querySelectorAll('a[href^="/academy/"]:not(.tm-header-badge)').forEach((el) => {
      const href = el.getAttribute("href");
      const target = href.includes("#programas") ? "/academy/#programas" : "/academy/";
      el.setAttribute("href", withLang(target, lang));
    });
  }

  function getLang() {
    try {
      const q = new URLSearchParams(window.location.search).get("lang");
      if (q) return normalizeLang(q);
    } catch (e) { /* noop */ }
    try {
      return normalizeLang(localStorage.getItem("trendLang") || localStorage.getItem("preferredLanguage") || document.documentElement.lang);
    } catch (e) {
      return "es";
    }
  }

  function rememberOriginals() {
    document.querySelectorAll(textTargets).forEach((el) => {
      if (!original.has(el)) original.set(el, el.tagName === "META" ? el.getAttribute("content") : el.innerHTML);
    });
  }

  function setList(selector, values, prop) {
    const els = Array.from(document.querySelectorAll(selector));
    values.forEach((value, index) => {
      if (els[index] && value !== undefined) els[index][prop || "innerHTML"] = value;
    });
  }

  function setCards(selector, rows) {
    const cards = Array.from(document.querySelectorAll(selector));
    rows.forEach((row, index) => {
      const card = cards[index];
      if (!card) return;
      const strong = card.querySelector("strong");
      const h3 = card.querySelector("h3");
      const ps = Array.from(card.querySelectorAll("p"));
      if (strong && row[0] !== undefined) strong.innerHTML = row[0];
      if (h3 && row[1] !== undefined) h3.innerHTML = row[1];
      row.slice(2).forEach((text, pIndex) => {
        if (ps[pIndex]) ps[pIndex].innerHTML = text;
      });
    });
  }

  function setModuleCards(rows) {
    const cards = Array.from(document.querySelectorAll(".module-card"));
    rows.forEach((row, index) => {
      const card = cards[index];
      if (!card) return;
      const h3 = card.querySelector("h3");
      const ps = Array.from(card.querySelectorAll("p"));
      if (h3) h3.innerHTML = row[0];
      row.slice(1).forEach((text, pIndex) => {
        if (ps[pIndex]) ps[pIndex].innerHTML = text;
      });
    });
  }

  function restoreSpanish() {
    original.forEach((html, el) => {
      el.innerHTML = html;
    });
    document.title = original.get(document.querySelector("title")) || document.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && original.has(meta)) meta.setAttribute("content", original.get(meta));
  }

  function applyShared(lang) {
    const t = shared[lang];
    document.documentElement.lang = lang;
    saveLang(lang);
    syncUrlLang(lang);
    syncCourseLinks(lang);
    setList(".lang-code", [lang.toUpperCase()]);
    document.querySelectorAll(".lang-code").forEach((el) => { el.textContent = lang.toUpperCase(); });
    document.querySelectorAll('nav a[href^="/academy/"]:not(.tm-header-badge)').forEach((el) => {
      el.textContent = el.getAttribute("href").includes("#programas") ? t.nav[1] : t.nav[0];
    });
    document.querySelectorAll('nav a[href="../index.html#casos-exito"]').forEach((el) => { el.textContent = t.nav[2]; });
    document.querySelectorAll('nav a[href="../index.html#contact-form"]').forEach((el) => { el.textContent = t.nav[3]; });
  }

  function applyEnglish(course) {
    document.title = course.meta[0];
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", course.meta[1]);

    document.querySelector(".course-back").innerHTML = shared.en.back;
    document.querySelector(".course-kicker").innerHTML = course.hero.kicker;
    document.querySelector(".course-hero h1").innerHTML = course.hero.title;
    setList(".course-hero > div > .course-lead", course.hero.leads);
    setList(".course-actions .course-btn", [shared.en.primary, shared.en.modules]);
    document.querySelector(".course-card h2").innerHTML = course.hero.cardTitle;
    setList(".course-card > p", course.hero.cardText);
    setList(".course-facts span", course.hero.facts);

    const headings = Array.from(document.querySelectorAll(".course-section .course-heading"));
    if (headings[0]) { headings[0].querySelector("span").innerHTML = shared.en.content; headings[0].querySelector("h2").innerHTML = shared.en.courseWork; }
    if (headings[1]) { headings[1].querySelector("span").innerHTML = shared.en.result; headings[1].querySelector("h2").innerHTML = shared.en.courseIncludes; }
    if (course.audience && headings[2]) { headings[2].querySelector("span").innerHTML = shared.en.audience; headings[2].querySelector("h2").innerHTML = course.audienceTitle; }
    const offset = course.audience ? 1 : 0;
    if (course.checklist && headings[3]) { headings[3].querySelector("span").innerHTML = shared.en.detection; headings[3].querySelector("h2").innerHTML = course.checklistTitle; }
    const infoHeading = headings[2 + offset + (course.checklist ? 1 : 0)];
    if (infoHeading) { infoHeading.querySelector("span").innerHTML = course.checklist ? shared.en.formatOnly : shared.en.format; infoHeading.querySelector("h2").innerHTML = shared.en.courseFormat; }
    const priceHeading = headings[3 + offset + (course.checklist ? 1 : 0)];
    if (priceHeading) { priceHeading.querySelector("span").innerHTML = priceHeading.querySelector("span").textContent.toLowerCase().includes("lanzamiento") ? shared.en.launchPrice : shared.en.price; priceHeading.querySelector("h2").innerHTML = shared.en.investment; }

    setModuleCards(course.modules);
    setCards(".result-card", course.results);
    if (course.audience) setCards(".detail-card", course.audience);
    if (course.checklist) setList(".course-checklist li", course.checklist);

    setList(".course-info-grid strong", [shared.en.formatLabel, shared.en.durationLabel, shared.en.levelLabel, shared.en.includesLabel, shared.en.certificateLabel]);
    setList(".course-info-grid span", [course.info[0], course.info[1], course.info[2], course.info[3], shared.en.certified]);

    const priceCards = Array.from(document.querySelectorAll(".price-card"));
    course.pricing.forEach((price, index) => {
      const card = priceCards[index];
      if (!card) return;
      const span = card.querySelector(":scope > span");
      const h3 = card.querySelector("h3");
      if (span) span.innerHTML = price[0];
      if (h3) h3.innerHTML = price[1];
      const ul = card.querySelector("ul");
      if (ul) setList(".price-card:nth-of-type(" + (index + 1) + ") li", price[3]);
      else setList(".price-card:nth-of-type(" + (index + 1) + ") p", price[3]);
    });

    if (course.cta) {
      const cta = document.querySelector(".course-cta");
      if (cta) {
        cta.querySelector("h2").innerHTML = course.cta[0];
        setList(".course-cta p", course.cta.slice(1));
        setList(".course-cta-actions .course-btn", [shared.en.primary, shared.en.modules]);
      }
    }
  }

  function applyCourseLanguage(lang) {
    lang = normalizeLang(lang);
    rememberOriginals();
    const course = courses[filename()];
    if (!course) return;
    if (lang === "es") restoreSpanish();
    applyShared(lang);
    if (lang === "en") applyEnglish(course);
    window.dispatchEvent(new CustomEvent("academyCourseLanguageChanged", { detail: { lang } }));
  }

  document.addEventListener("DOMContentLoaded", function () {
    rememberOriginals();
    applyCourseLanguage(getLang());
    document.querySelectorAll(".lang-option").forEach((btn) => {
      btn.addEventListener("click", function () {
        applyCourseLanguage(this.dataset.lang || "es");
      });
    });
  });
})();

