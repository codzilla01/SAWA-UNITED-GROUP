import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "ar" | "en" | "fr";
export type Dir = "rtl" | "ltr";

export const localeMeta: Record<Locale, { label: string; short: string; dir: Dir; htmlLang: string }> = {
  ar: { label: "العربية", short: "ع", dir: "rtl", htmlLang: "ar" },
  en: { label: "English", short: "EN", dir: "ltr", htmlLang: "en" },
  fr: { label: "Français", short: "FR", dir: "ltr", htmlLang: "fr" },
};

const en = {
  nav: {
    group: "The group",
    sectors: "Sectors",
    projects: "Projects",
    presence: "Presence",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
    home: "Home",
  },
  common: {
    exploreSectors: "Explore our sectors",
    viewAllProjects: "View all projects",
    allProjects: "All projects",
    contactUs: "Contact us",
    startConversation: "Start a conversation",
    backHome: "Back to home",
    learnMore: "Learn more",
    since: "Since",
    headquarters: "Headquarters",
    close: "Close",
    languages: "Languages",
    theme: "Appearance",
    lightMode: "Light mode",
    darkMode: "Dark mode",
    language: "Language",
    whatsapp: "WhatsApp",
    email: "Email",
    phone: "Phone",
    menuOpen: "Open menu",
    skip: "Skip to content",
  },
  hero: {
    eyebrow: "A multi-sector group · Cairo Main HQ, Egypt",
    title1: "Built together.",
    titleAccent: "Beyond boundaries.",
    lead: "A multi-sector group operating across automotive & car rental in Morocco, regional and global grain & food exports, land and residential real estate, and petroleum tankers.",
    primaryCta: "Explore our sectors",
    secondaryCta: "See our projects",
    sectorsLabel: "Four sectors, one group",
    marketsBadge: "6 markets",
    projectsBadge: "42+ projects",
    trustLine: "Four companies. One standard.",
    scroll: "Scroll to explore",
  },
  stats: {
    years: "Years of building",
    projects: "Projects delivered",
    markets: "Markets served",
    people: "People across the group",
  },
  about: {
    eyebrow: "The group",
    title1: "We build businesses",
    titleAccent: "that last.",
    lead: "Founded in 2014 and newly headquartered in El Sheikh Zayed City, 6 October City, Egypt, SAWA United Group has grown into a multi-sector group that pairs long-term capital with local teams and global standards.",
    lead2: "We think in generations: entering sectors we understand deeply, then building companies able to serve their clients and communities for decades.",
    imageAlt: "The SAWA United Group team in a working session",
    imageCaption: "Cairo · El Sheikh Zayed — Main HQ",
    operatingTitle: "How we work",
    principles: [
      {
        title: "Long-term capital",
        text: "We invest with a generational horizon, not a quarterly one — committing where durable value can be built.",
      },
      {
        title: "Local teams",
        text: "Each market is led by people who know it. Local insight and decision rights sit close to the client.",
      },
      {
        title: "Shared standards",
        text: "One governance, disclosure and compliance framework applies across every sector and every market.",
      },
    ],
  },
  sectorSection: {
    eyebrow: "Our sectors",
    title: "Four engines. One vision.",
    lead: "Each business runs independently, strengthened by the reach, discipline and capital of the group.",
    capabilities: "Capabilities",
    metricLabel: "Today",
    discover: "Explore sector projects",
    selectLabel: "Select a sector",
  },
  projectsSection: {
    eyebrow: "Selected work",
    title: "Projects that turn ambition into assets.",
    lead: "From automotive rental fleets and strategic land in Morocco to global grain exports, residential units and petroleum tankers, we build assets that cross borders with confidence.",
    filterLabel: "Filter by sector",
    all: "All",
    empty: "No projects in this sector yet.",
    emptyHint: "Try another sector or browse the full portfolio.",
    statusLabel: "Status",
    locationLabel: "Location",
    yearLabel: "Year",
    view: "View project",
    portfolio: "The portfolio",
  },
  status: {
    operating: "Operating",
    development: "In development",
    delivered: "Delivered",
  },
  presence: {
    eyebrow: "Presence",
    title: "Rooted in Cairo. Reaching further.",
    lead: "Anchored by our main headquarters in Cairo, our operations span Türkiye, Morocco, the UAE, Hungary and Saudi Arabia with dedicated local teams.",
    mapAlt: "Map of SAWA United Group's Cairo main headquarters and markets in Türkiye, Morocco, the UAE, Hungary and Saudi Arabia",
    selectedLabel: "Selected market",
    focus: "Focus sectors",
    since: "Established",
    note: "Cairo Main HQ · 5 international markets",
    hqNote: "Main Headquarters",
  },
  journey: {
    eyebrow: "The journey",
    title: "Measured steps. A wider horizon.",
    lead: "We grow deliberately — adding a new capability or market only when we can add real, lasting value.",
    milestones: [
      { year: "2014", title: "Group founded", text: "SAWA United Group launches with a clear conviction: businesses built on long-term capital and global standards endure." },
      { year: "2017", title: "Grain & food exports", text: "Our export platform connects grains and diverse foodstuffs with regional and global trade corridors." },
      { year: "2019", title: "Cross-border real estate", text: "Building a portfolio that combines strategic land in Morocco with diverse residential units across our international markets." },
      { year: "2021", title: "Automotive & car rental in Morocco", text: "Establishing dedicated automotive operations and short- and long-term car rental fleets across Morocco." },
      { year: "2023", title: "Petroleum tankers", text: "Entering maritime energy logistics with petroleum tankers operated to stringent international marine safety standards." },
      { year: "2026", title: "New El Sheikh Zayed HQ · 6 markets", text: "Newly headquartered in El Sheikh Zayed City, 6 October City, Cairo — leading operations across Egypt, Türkiye, Morocco, the UAE, Hungary and Saudi Arabia." },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's start a conversation.",
    lead: "Tell us about the opportunity. The right team will get back to you within one business day.",
    form: {
      name: "Full name",
      namePlaceholder: "Your full name",
      email: "Email address",
      emailPlaceholder: "name@company.com",
      phone: "Phone (optional)",
      phonePlaceholder: "+20 10 XXXX XXXX",
      sector: "Sector of interest",
      sectorPlaceholder: "Select a sector",
      message: "Your message",
      messagePlaceholder: "Tell us about your project, partnership or enquiry…",
      consent: "I agree to the",
      privacy: "privacy policy",
      consentEnd: "and to being contacted about this enquiry.",
      submit: "Send message",
      submitting: "Sending…",
      required: "Required",
    },
    errors: {
      name: "Please enter your full name.",
      email: "Please enter a valid email address.",
      message: "Please write at least 20 characters.",
      consent: "Please accept the privacy policy.",
    },
    success: {
      title: "Your message is with us.",
      text: "Thank you for reaching out. Our team will reply within one business day.",
      again: "Send another message",
    },
    fallback: {
      title: "The mail server is slow to respond.",
      text: "Nothing is lost. Send the same message instantly on WhatsApp, or reach us by email — we'll reply within one business day.",
      whatsapp: "Continue on WhatsApp",
      mail: "Send by email instead",
      retry: "Try the form again",
      note: "Automatic fallback · your details are only shared with SAWA United Group",
    },
    info: {
      emailLabel: "Write to us",
      phoneLabel: "Call the group",
      hqLabel: "Main headquarters",
      hq: "El Sheikh Zayed City, 6 October City, Cairo, Egypt",
      hoursLabel: "Office hours",
      hours: "Sunday – Thursday, 9:00 – 17:00",
      responseLabel: "Response time",
      response: "Within one business day",
      whatsappLabel: "Direct line",
      whatsapp: "Chat on WhatsApp",
      direct: "Direct contact",
    },
  },
  social: {
    eyebrow: "Digital pulse",
    title1: "Follow the journey,",
    titleAccent: "in real time.",
    lead: "Three distinct lenses into SAWA United Group — from official milestones to field motion and our visual journal in Egypt.",
    follow: "Follow",
    followUs: "Official channels",
    openChannel: "Enter channel",
    switchLabel: "Spotlight a channel",
    dockLabel: "Official social channels",
    toggleOpen: "Open social channels",
    toggleClose: "Close social channels",
    egyptBadge: "Follow SAWA Egypt",
    channels: {
      facebook: {
        name: "Facebook",
        badge: "Official Chronicle",
        headline: "News, partnerships & milestones",
        description:
          "Follow group announcements, cross-sector launches, and official updates straight from SAWA United Group.",
        ticker: "OFFICIAL CHRONICLE · GROUP ANNOUNCEMENTS · PARTNERSHIPS · SAWAUNITED.NET",
      },
      tiktok: {
        name: "TikTok",
        badge: "In Motion",
        headline: "Behind the scenes, frame by frame",
        description:
          "Short-form stories from inside our operations, field teams, and daily momentum across all four sectors.",
        ticker: "IN MOTION · BEHIND THE SCENES · FIELD STORIES · @SAWA.UNITED",
      },
      instagram: {
        name: "Instagram",
        badge: "SAWA Egypt · Visuals",
        headline: "A curated visual journal from Egypt",
        description:
          "Spaces, people, and projects captured through the lens of SAWA United Group's growing presence in Egypt.",
        ticker: "VISUAL JOURNAL · SAWA EGYPT · CAIRO & BEYOND · @SAWA.UNITED.EGYPT",
      },
    },
  },
  footer: {
    tagline: "Founded in 2014 and newly headquartered in El Sheikh Zayed City, 6 October City, Cairo, Egypt — operating in automotive & car rental in Morocco, grain & food exports, real estate and petroleum tankers.",
    group: "The group",
    sectors: "Sectors",
    reach: "Reach us",
    legal: "Legal & trust",
    privacy: "Privacy policy",
    sitemap: "Sitemap",
    contact: "Contact",
    copyright: "© 2026 SAWA United Group. All rights reserved.",
    location: "Cairo · El Sheikh Zayed, 6 October City",
    taglineShort: "Together, beyond boundaries.",
    websites: "sawa-united.net",
  },
  privacy: {
    eyebrow: "Legal · Privacy",
    title: "Privacy policy",
    lead: "How SAWA United Group collects, uses and protects the information you share with us.",
    updated: "Last updated: 1 January 2026",
    back: "Back to the group",
    note: "This policy is available in Arabic and English.",
    otherLang: "Read in English",
  },
  notFound: {
    eyebrow: "Error 404",
    title: "This page is beyond the map.",
    lead: "The link may have changed, or the page has moved. Let's get you back to solid ground.",
    home: "Back to home",
    projects: "Browse projects",
    help: "Need help? Write to info@sawa-united.net",
  },
  seo: {
    homeTitle: "SAWA United Group — Automotive & Car Rental, Food Exports, Real Estate & Petroleum Tankers",
    homeTitleEn: "SAWA United Group — Automotive & Car Rental, Food Exports, Real Estate & Petroleum Tankers",
    homeDesc:
      "Founded in 2014 and newly headquartered in El Sheikh Zayed City, 6 October City, Cairo, Egypt, SAWA United Group operates across Türkiye, Morocco, the UAE, Hungary and Saudi Arabia in automotive & car rental, grain & food exports, real estate and petroleum tankers.",
    projectsTitle: "Projects | SAWA United Group",
    projectsDesc:
      "Explore SAWA United Group's portfolio across automotive & car rental in Morocco, regional and global grain & food exports, land and residential real estate, and petroleum tankers.",
    privacyTitle: "Privacy policy | SAWA United Group",
    privacyDesc:
      "How SAWA United Group collects, uses and protects personal information shared through its website.",
    notFoundTitle: "Page not found | SAWA United Group",
  },
};

export type Copy = typeof en;

const ar: Copy = {
  nav: {
    group: "المجموعة",
    sectors: "القطاعات",
    projects: "المشروعات",
    presence: "الحضور",
    contact: "تواصل معنا",
    menu: "القائمة",
    close: "إغلاق",
    home: "الرئيسية",
  },
  common: {
    exploreSectors: "استكشف قطاعاتنا",
    viewAllProjects: "عرض كل المشروعات",
    allProjects: "جميع المشروعات",
    contactUs: "تواصل معنا",
    startConversation: "لنبدأ حوارًا",
    backHome: "العودة إلى الرئيسية",
    learnMore: "تعرّف أكثر",
    since: "منذ",
    headquarters: "المقر الرئيسي",
    close: "إغلاق",
    languages: "اللغات",
    theme: "المظهر",
    lightMode: "الوضع النهاري",
    darkMode: "الوضع الليلي",
    language: "اللغة",
    whatsapp: "واتساب",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    menuOpen: "فتح القائمة",
    skip: "تجاوز إلى المحتوى",
  },
  hero: {
    eyebrow: "مجموعة متعددة القطاعات · المركز الرئيسي: القاهرة",
    title1: "معًا، نبني",
    titleAccent: "ما يتجاوز الحدود.",
    lead: "مجموعة متعددة القطاعات تعمل في السيارات وإيجار السيارات بالمغرب، وتصدير الحبوب والمواد الغذائية إقليميًا وعالميًا، والعقار، وناقلات البترول — لتبني قيمة تدوم عبر ستة أسواق.",
    primaryCta: "استكشف قطاعاتنا",
    secondaryCta: "شاهد مشروعاتنا",
    sectorsLabel: "أربعة قطاعات، مجموعة واحدة",
    marketsBadge: "٦ أسواق",
    projectsBadge: "+٤٢ مشروعًا",
    trustLine: "أربع شركات. معيار واحد.",
    scroll: "مرّر للاستكشاف",
  },
  stats: {
    years: "عامًا من البناء",
    projects: "مشروعًا منجزًا",
    markets: "أسواقًا حول العالم",
    people: "كفاءة في المجموعة",
  },
  about: {
    eyebrow: "المجموعة",
    title1: "نبني أعمالًا",
    titleAccent: "تبقى وتكبر.",
    lead: "تأسست مجموعة سوا المتحدة عام 2014 وتتخذ من مدينة الشيخ زايد بمدينة 6 أكتوبر في مصر مقراً رئيسياً لها حديثاً، لتنمو إلى مجموعة متعددة القطاعات تجمع بين رأس المال طويل الأمد والفرق المحلية والمعايير العالمية.",
    lead2: "نفكر بمنطق الأجيال: ندخل قطاعات نفهمها بعمق، ثم نبني شركات قادرة على خدمة عملائها ومجتمعاتها لعقود.",
    imageAlt: "فريق مجموعة سوا المتحدة في جلسة عمل",
    imageCaption: "القاهرة · مدينة الشيخ زايد — المركز الرئيسي",
    operatingTitle: "كيف نعمل",
    principles: [
      {
        title: "رأس مال طويل الأمد",
        text: "نستثمر بمنطق الأجيال لا الدورات، ونلتزم حيث يمكن بناء قيمة مستدامة.",
      },
      {
        title: "فرق محلية",
        text: "كل سوق يقوده أشخاص يعرفونه جيدًا، ومعرفة السوق وقراراته قريبة من العميل.",
      },
      {
        title: "معايير مشتركة",
        text: "إطار واحد للحوكمة والإفصاح والامتثال في كل قطاع وكل سوق نعمل فيه.",
      },
    ],
  },
  sectorSection: {
    eyebrow: "القطاعات",
    title: "أربعة محرّكات. رؤية واحدة.",
    lead: "كل قطاع يعمل باستقلالية، ويستفيد من امتداد المجموعة وانضباطها ورأس مالها.",
    capabilities: "القدرات",
    metricLabel: "حضورنا اليوم",
    discover: "استكشف مشروعات القطاع",
    selectLabel: "اختر قطاعًا",
  },
  projectsSection: {
    eyebrow: "أعمال مختارة",
    title: "مشروعات تحوّل الطموح إلى أصول.",
    lead: "من أساطيل السيارات والأراضي في المغرب إلى تصدير الحبوب والوحدات السكنية وناقلات البترول، نطوّر أصولًا تتحرّك بثقة عبر أسواقنا.",
    filterLabel: "تصفية حسب القطاع",
    all: "الكل",
    empty: "لا توجد مشروعات في هذا القطاع حاليًا.",
    emptyHint: "جرّب قطاعًا آخر أو استعرض المحفظة كاملة.",
    statusLabel: "الحالة",
    locationLabel: "الموقع",
    yearLabel: "السنة",
    view: "عرض المشروع",
    portfolio: "المحفظة",
  },
  status: {
    operating: "تشغيلي",
    development: "قيد التطوير",
    delivered: "منجز",
  },
  presence: {
    eyebrow: "الحضور",
    title: "من القاهرة، نمتدّ أبعد.",
    lead: "القاهرة مركزنا الرئيسي، ومنها تمتد أعمالنا إلى تركيا والمغرب والإمارات والمجر والسعودية عبر فرق قريبة من عملائها وشراكات تعبر الحدود.",
    mapAlt: "خريطة المركز الرئيسي في القاهرة وأسواق مجموعة سوا المتحدة في تركيا والمغرب والإمارات والمجر والسعودية",
    selectedLabel: "السوق المحدد",
    focus: "القطاعات",
    since: "بداية التواجد",
    note: "القاهرة مركزًا رئيسيًا · ٥ أسواق دولية",
    hqNote: "المركز الرئيسي",
  },
  journey: {
    eyebrow: "المسيرة",
    title: "خطى مدروسة. أفق أوسع.",
    lead: "ننمو بعناية: لا نضيف قدرة جديدة أو ندخل سوقًا إلا عندما نستطيع تقديم قيمة حقيقية تدوم.",
    milestones: [
      { year: "2014", title: "تأسيس المجموعة", text: "تأسست مجموعة سوا المتحدة بإيمان راسخ: الأعمال التي تُبنى برأس مال طويل الأمد ومعايير عالمية تدوم وتكبر." },
      { year: "2017", title: "تصدير الحبوب والمواد الغذائية", text: "إطلاق منصة التصدير الغذائي لربط الحبوب والمواد الغذائية المختلفة بالأسواق الإقليمية والعالمية." },
      { year: "2019", title: "التوسّع العقاري الدولي", text: "بناء محفظة عقارية تجمع بين الأراضي الاستثمارية في المغرب والوحدات السكنية المختلفة في مصر وتركيا والإمارات والمجر والسعودية." },
      { year: "2021", title: "السيارات وإيجار السيارات في المغرب", text: "تركيز عمليات السيارات وخدمات إيجار السيارات قصيرة وطويلة الأجل في دولة المغرب لخدمة الأفراد والشركات والسياحة." },
      { year: "2023", title: "قطاع ناقلات البترول", text: "دخول قطاع النقل البحري للطاقة عبر ناقلات البترول والشحن النفطي وفق أعلى معايير السلامة البحرية الدولية." },
      { year: "2026", title: "المركز الرئيسي بالشيخ زايد · ٦ أسواق", text: "اتخاذ مدينة الشيخ زايد بمدينة 6 أكتوبر في القاهرة مقرًا رئيسيًا حديثًا لإدارة أعمال المجموعة في مصر وتركيا والمغرب والإمارات والمجر والسعودية." },
    ],
  },
  contact: {
    eyebrow: "تواصل",
    title: "لنبدأ الحوار.",
    lead: "أخبرنا عن الفرصة، وسيعود إليك الفريق المختص خلال يوم عمل واحد.",
    form: {
      name: "الاسم الكامل",
      namePlaceholder: "اكتب اسمك الكامل",
      email: "البريد الإلكتروني",
      emailPlaceholder: "name@company.com",
      phone: "رقم الجوال (اختياري)",
      phonePlaceholder: "+20 10 XXXX XXXX",
      sector: "القطاع محل الاهتمام",
      sectorPlaceholder: "اختر القطاع",
      message: "رسالتك",
      messagePlaceholder: "أخبرنا عن مشروعك أو فرصة الشراكة أو استفسارك…",
      consent: "أوافق على",
      privacy: "سياسة الخصوصية",
      consentEnd: "وعلى التواصل معي بخصوص هذا الاستفسار.",
      submit: "إرسال الرسالة",
      submitting: "جارٍ الإرسال…",
      required: "مطلوب",
    },
    errors: {
      name: "يرجى إدخال الاسم الكامل.",
      email: "يرجى إدخال بريد إلكتروني صحيح.",
      message: "يرجى كتابة 20 حرفًا على الأقل.",
      consent: "يرجى الموافقة على سياسة الخصوصية.",
    },
    success: {
      title: "وصلتنا رسالتك.",
      text: "شكرًا لتواصلك. سيرد عليك فريقنا خلال يوم عمل واحد.",
      again: "إرسال رسالة أخرى",
    },
    fallback: {
      title: "خادم البريد يستغرق وقتًا أطول.",
      text: "لم يضع شيء. أرسل الرسالة نفسها فورًا عبر واتساب، أو راسلنا بالبريد الإلكتروني وسنرد خلال يوم عمل واحد.",
      whatsapp: "المتابعة عبر واتساب",
      mail: "الإرسال بالبريد بدلاً من ذلك",
      retry: "إعادة المحاولة عبر النموذج",
      note: "تحويل تلقائي آمن · تُشارك بياناتك مع مجموعة سوا المتحدة فقط",
    },
    info: {
      emailLabel: "راسلنا",
      phoneLabel: "اتصل بالمجموعة",
      hqLabel: "المركز الرئيسي",
      hq: "مدينة الشيخ زايد، مدينة 6 أكتوبر، القاهرة، مصر",
      hoursLabel: "ساعات العمل",
      hours: "الأحد – الخميس، 9:00 – 17:00",
      responseLabel: "مدة الرد",
      response: "خلال يوم عمل واحد",
      whatsappLabel: "خط مباشر",
      whatsapp: "محادثة واتساب",
      direct: "تواصل مباشر",
    },
  },
  social: {
    eyebrow: "النبض الرقمي",
    title1: "تابع المسيرة،",
    titleAccent: "بإيقاعها الحيّ.",
    lead: "ثلاث نوافذ غير تقليدية تطلّ على عالم مجموعة سوا المتحدة — من البيانات الرسمية إلى حركة الميدان وعدستنا البصرية في مصر.",
    follow: "تابعنا",
    followUs: "المنصّات الرسمية",
    openChannel: "استكشف المنصّة",
    switchLabel: "استعراض المنصّات",
    dockLabel: "منصّات التواصل الرسمية",
    toggleOpen: "فتح منصّات التواصل",
    toggleClose: "إغلاق منصّات التواصل",
    egyptBadge: "تابع سوا مصر",
    channels: {
      facebook: {
        name: "فيسبوك",
        badge: "السجلّ الرسمي",
        headline: "أخبار المجموعة وشراكاتها",
        description:
          "البيانات الرسمية، إطلاقات المشروعات، وأبرز المحطات عبر قطاعات مجموعة سوا المتحدة الأربعة.",
        ticker: "OFFICIAL CHRONICLE · SAWA UNITED GROUP · FACEBOOK · @SAWAUNITED.NET",
      },
      tiktok: {
        name: "تيك توك",
        badge: "إيقاع الميدان",
        headline: "كواليس الأعمال في حركة",
        description:
          "لقطات مرئية سريعة من قلب المشروعات، كواليس الفرق، والنبض اليومي لأعمال المجموعة.",
        ticker: "IN MOTION · FIELD RHYTHM · SAWA UNITED · TIKTOK · @SAWA.UNITED",
      },
      instagram: {
        name: "إنستغرام",
        badge: "عدسة سوا · مصر",
        headline: "الواجهة البصرية لسوا في مصر",
        description:
          "قصص بصرية مختارة توثّق حضور مجموعة سوا المتحدة ومشروعاتها وتفاصيلها اليومية في السوق المصري.",
        ticker: "VISUAL JOURNAL · SAWA UNITED EGYPT · INSTAGRAM · @SAWA.UNITED.EGYPT",
      },
    },
  },
  footer: {
    tagline: "تأسست عام 2014 وتتخذ من مدينة الشيخ زايد بمدينة 6 أكتوبر في مصر مقرًا رئيسيًا لها حديثًا — تعمل في السيارات وإيجار السيارات بالمغرب، وتصدير الحبوب والمواد الغذائية، والعقار، وناقلات البترول.",
    group: "المجموعة",
    sectors: "القطاعات",
    reach: "تواصل",
    legal: "الخصوصية والامتثال",
    privacy: "سياسة الخصوصية",
    sitemap: "خريطة الموقع",
    contact: "تواصل معنا",
    copyright: "© 2026 مجموعة سوا المتحدة. جميع الحقوق محفوظة.",
    location: "القاهرة · مدينة الشيخ زايد، 6 أكتوبر",
    taglineShort: "معًا، نتجاوز الحدود.",
    websites: "sawa-united.net",
  },
  privacy: {
    eyebrow: "قانوني · الخصوصية",
    title: "سياسة الخصوصية",
    lead: "كيف تجمع مجموعة سوا المتحدة المعلومات التي تشاركها معنا وتستخدمها وتحميها.",
    updated: "آخر تحديث: 1 يناير 2026",
    back: "العودة إلى المجموعة",
    note: "هذه السياسة متاحة بالعربية والإنجليزية.",
    otherLang: "اقرأ باللغة الإنجليزية",
  },
  notFound: {
    eyebrow: "خطأ 404",
    title: "هذه الصفحة خارج الخريطة.",
    lead: "ربما تغيّر الرابط أو نُقلت الصفحة. لنعُد بك إلى مسار واضح.",
    home: "العودة إلى الرئيسية",
    projects: "استعرض المشروعات",
    help: "تحتاج مساعدة؟ راسلنا على info@sawa-united.net",
  },
  seo: {
    homeTitle: "مجموعة سوا المتحدة | السيارات وإيجار السيارات، تصدير الحبوب والغذاء، العقار وناقلات البترول",
    homeTitleEn: "SAWA United Group — Automotive & Car Rental, Food Exports, Real Estate & Petroleum Tankers",
    homeDesc:
      "تأسست مجموعة سوا المتحدة عام 2014 وتتخذ من مدينة الشيخ زايد بمدينة 6 أكتوبر في القاهرة مقرًا رئيسيًا لها حديثًا، وتعمل في تركيا والمغرب والإمارات والمجر والسعودية في السيارات وإيجار السيارات وتصدير الحبوب والغذاء والعقار وناقلات البترول.",
    projectsTitle: "المشروعات | مجموعة سوا المتحدة",
    projectsDesc:
      "استعرض محفظة مشروعات مجموعة سوا المتحدة في السيارات وإيجار السيارات بالمغرب، وتصدير الحبوب والمواد الغذائية إقليميًا وعالميًا، والعقار، وناقلات البترول.",
    privacyTitle: "سياسة الخصوصية | مجموعة سوا المتحدة",
    privacyDesc: "كيف تجمع مجموعة سوا المتحدة بياناتك الشخصية وتستخدمها وتحميها.",
    notFoundTitle: "الصفحة غير موجودة | مجموعة سوا المتحدة",
  },
};

const fr: Copy = {
  nav: {
    group: "Le groupe",
    sectors: "Secteurs",
    projects: "Projets",
    presence: "Présence",
    contact: "Contact",
    menu: "Menu",
    close: "Fermer",
    home: "Accueil",
  },
  common: {
    exploreSectors: "Découvrir nos secteurs",
    viewAllProjects: "Voir tous les projets",
    allProjects: "Tous les projets",
    contactUs: "Nous contacter",
    startConversation: "Entamons la conversation",
    backHome: "Retour à l'accueil",
    learnMore: "En savoir plus",
    since: "Depuis",
    headquarters: "Siège",
    close: "Fermer",
    languages: "Langues",
    theme: "Apparence",
    lightMode: "Mode clair",
    darkMode: "Mode sombre",
    language: "Langue",
    whatsapp: "WhatsApp",
    email: "E-mail",
    phone: "Téléphone",
    menuOpen: "Ouvrir le menu",
    skip: "Aller au contenu",
  },
  hero: {
    eyebrow: "Groupe multisectoriel · Siège principal : Le Caire",
    title1: "Bâtir ensemble.",
    titleAccent: "Aller au-delà.",
    lead: "Un groupe multisectoriel actif dans l'automobile et la location au Maroc, l'exportation régionale et mondiale de céréales et denrées alimentaires, l'immobilier et les pétroliers.",
    primaryCta: "Découvrir nos secteurs",
    secondaryCta: "Voir nos projets",
    sectorsLabel: "Quatre secteurs, un groupe",
    marketsBadge: "6 marchés",
    projectsBadge: "42+ projets",
    trustLine: "Quatre entreprises. Un seul standard.",
    scroll: "Faites défiler",
  },
  stats: {
    years: "années de construction",
    projects: "projets livrés",
    markets: "marchés desservis",
    people: "collaborateurs",
  },
  about: {
    eyebrow: "Le groupe",
    title1: "Nous bâtissons des entreprises",
    titleAccent: "qui durent.",
    lead: "Fondé en 2014 et récemment établi à son siège principal d'El Sheikh Zayed City, Cité du 6 Octobre, Égypte, SAWA United Group est devenu un groupe multisectoriel qui associe capital de long terme, équipes locales et standards internationaux.",
    lead2: "Nous pensons en générations : entrer dans des secteurs que nous maîtrisons, puis bâtir des entreprises capables de servir clients et communautés pendant des décennies.",
    imageAlt: "L'équipe de SAWA United Group en séance de travail",
    imageCaption: "Le Caire · El Sheikh Zayed — Siège principal",
    operatingTitle: "Notre méthode",
    principles: [
      {
        title: "Capital de long terme",
        text: "Nous investissons avec un horizon générationnel, en nous engageant là où une valeur durable peut être construite.",
      },
      {
        title: "Équipes locales",
        text: "Chaque marché est dirigé par ceux qui le connaissent. La connaissance du terrain reste proche du client.",
      },
      {
        title: "Standards partagés",
        text: "Un même cadre de gouvernance, de transparence et de conformité s'applique à chaque secteur et chaque marché.",
      },
    ],
  },
  sectorSection: {
    eyebrow: "Nos secteurs",
    title: "Quatre moteurs. Une vision.",
    lead: "Chaque entreprise est indépendante, renforcée par la portée, la discipline et le capital du groupe.",
    capabilities: "Savoir-faire",
    metricLabel: "Aujourd'hui",
    discover: "Découvrir les projets du secteur",
    selectLabel: "Choisir un secteur",
  },
  projectsSection: {
    eyebrow: "Réalisations",
    title: "Des projets qui transforment l'ambition en actifs.",
    lead: "Des flottes automobiles et terrains au Maroc à l'exportation de céréales, aux résidences internationales et aux pétroliers, nous bâtissons des actifs durables.",
    filterLabel: "Filtrer par secteur",
    all: "Tous",
    empty: "Aucun projet dans ce secteur pour le moment.",
    emptyHint: "Essayez un autre secteur ou parcourez tout le portefeuille.",
    statusLabel: "Statut",
    locationLabel: "Localisation",
    yearLabel: "Année",
    view: "Voir le projet",
    portfolio: "Le portefeuille",
  },
  status: {
    operating: "En activité",
    development: "En développement",
    delivered: "Livré",
  },
  presence: {
    eyebrow: "Présence",
    title: "Ancrés au Caire. Présents plus loin.",
    lead: "Depuis notre siège principal au Caire, nos activités rayonnent en Turquie, au Maroc, aux Émirats arabes unis, en Hongrie et en Arabie saoudite.",
    mapAlt: "Carte du siège principal du Caire et des marchés de SAWA United Group en Turquie, au Maroc, aux Émirats, en Hongrie et en Arabie saoudite",
    selectedLabel: "Marché sélectionné",
    focus: "Secteurs clés",
    since: "Présents depuis",
    note: "Siège principal au Caire · 5 marchés internationaux",
    hqNote: "Siège principal",
  },
  journey: {
    eyebrow: "Le parcours",
    title: "Des étapes mesurées. Un horizon plus large.",
    lead: "Nous grandissons avec méthode : chaque nouvelle capacité ou marché n'est ajouté que lorsque nous pouvons créer une valeur durable.",
    milestones: [
      { year: "2014", title: "Fondation du groupe", text: "SAWA United Group naît d'une conviction claire : les entreprises bâties sur un capital patient et des standards mondiaux durent." },
      { year: "2017", title: "Export céréalier & alimentaire", text: "Lancement de notre plateforme d'exportation de céréales et de denrées alimentaires vers les marchés régionaux et mondiaux." },
      { year: "2019", title: "Immobilier transfrontalier", text: "Constitution d'un portefeuille alliant terrains stratégiques au Maroc et unités résidentielles variées sur nos autres marchés." },
      { year: "2021", title: "Automobile & location au Maroc", text: "Déploiement de nos activités automobiles et de location de véhicules courte et longue durée au Royaume du Maroc." },
      { year: "2023", title: "Flotte de pétroliers", text: "Entrée dans le transport maritime d'énergie avec des pétroliers opérés selon les normes internationales les plus strictes." },
      { year: "2026", title: "Nouveau siège à El Sheikh Zayed · 6 marchés", text: "Établissement récent de notre siège principal à El Sheikh Zayed City (6 Octobre, Le Caire), pilotant l'Égypte, la Turquie, le Maroc, les Émirats, la Hongrie et l'Arabie saoudite." },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Entamons la conversation.",
    lead: "Parlez-nous de votre opportunité. La bonne équipe vous répondra sous un jour ouvré.",
    form: {
      name: "Nom complet",
      namePlaceholder: "Votre nom complet",
      email: "Adresse e-mail",
      emailPlaceholder: "nom@entreprise.com",
      phone: "Téléphone (facultatif)",
      phonePlaceholder: "+20 10 XXXX XXXX",
      sector: "Secteur d'intérêt",
      sectorPlaceholder: "Choisir un secteur",
      message: "Votre message",
      messagePlaceholder: "Parlez-nous de votre projet, partenariat ou demande…",
      consent: "J'accepte la",
      privacy: "politique de confidentialité",
      consentEnd: "et d'être contacté au sujet de cette demande.",
      submit: "Envoyer le message",
      submitting: "Envoi…",
      required: "Requis",
    },
    errors: {
      name: "Veuillez saisir votre nom complet.",
      email: "Veuillez saisir une adresse e-mail valide.",
      message: "Veuillez écrire au moins 20 caractères.",
      consent: "Veuillez accepter la politique de confidentialité.",
    },
    success: {
      title: "Votre message nous est bien parvenu.",
      text: "Merci de nous avoir contactés. Notre équipe vous répondra sous un jour ouvré.",
      again: "Envoyer un autre message",
    },
    fallback: {
      title: "Le serveur de messagerie tarde à répondre.",
      text: "Rien n'est perdu. Envoyez le même message instantanément via WhatsApp ou par e-mail — nous répondons sous un jour ouvré.",
      whatsapp: "Continuer sur WhatsApp",
      mail: "Envoyer par e-mail",
      retry: "Réessayer avec le formulaire",
      note: "Repli automatique · vos coordonnées ne sont partagées qu'avec SAWA United Group",
    },
    info: {
      emailLabel: "Écrivez-nous",
      phoneLabel: "Appeler le groupe",
      hqLabel: "Siège principal",
      hq: "El Sheikh Zayed City, Cité du 6 Octobre, Le Caire, Égypte",
      hoursLabel: "Horaires",
      hours: "Dimanche – Jeudi, 9h00 – 17h00",
      responseLabel: "Délai de réponse",
      response: "Sous un jour ouvré",
      whatsappLabel: "Ligne directe",
      whatsapp: "Discuter sur WhatsApp",
      direct: "Contact direct",
    },
  },
  social: {
    eyebrow: "Présence digitale",
    title1: "Suivez l'élan,",
    titleAccent: "au fil du réel.",
    lead: "Trois fenêtres complémentaires sur SAWA United Group — des annonces officielles aux coulisses terrain et à notre journal visuel en Égypte.",
    follow: "Suivre",
    followUs: "Chaînes officielles",
    openChannel: "Explorer la chaîne",
    switchLabel: "Choisir une plateforme",
    dockLabel: "Réseaux sociaux officiels",
    toggleOpen: "Ouvrir les réseaux sociaux",
    toggleClose: "Fermer les réseaux sociaux",
    egyptBadge: "Suivre SAWA Égypte",
    channels: {
      facebook: {
        name: "Facebook",
        badge: "Chronique officielle",
        headline: "Actualités, partenariats & jalons",
        description:
          "Retrouvez les annonces du groupe, les nouveaux partenariats et les temps forts de nos quatre secteurs.",
        ticker: "CHRONIQUE OFFICIELLE · ANNONCES · PARTENARIATS · @SAWAUNITED.NET",
      },
      tiktok: {
        name: "TikTok",
        badge: "En mouvement",
        headline: "Les coulisses du groupe en vidéo",
        description:
          "Formats courts au cœur de nos chantiers, de nos équipes et de la dynamique quotidienne de nos activités.",
        ticker: "EN MOUVEMENT · COULISSES · TERRAIN · TIKTOK · @SAWA.UNITED",
      },
      instagram: {
        name: "Instagram",
        badge: "SAWA Égypte · Visuel",
        headline: "Journal visuel depuis l'Égypte",
        description:
          "Une sélection d'images et de récits dédiés aux projets, aux lieux et à la présence de SAWA United en Égypte.",
        ticker: "JOURNAL VISUEL · SAWA ÉGYPTE · LE CAIRE · @SAWA.UNITED.EGYPT",
      },
    },
  },
  footer: {
    tagline: "Fondé en 2014 et récemment établi à son siège principal d'El Sheikh Zayed City (6 Octobre, Le Caire, Égypte) — actif dans l'automobile et la location au Maroc, l'export céréalier et alimentaire, l'immobilier et les pétroliers.",
    group: "Le groupe",
    sectors: "Secteurs",
    reach: "Nous joindre",
    legal: "Confidentialité",
    privacy: "Politique de confidentialité",
    sitemap: "Plan du site",
    contact: "Contact",
    copyright: "© 2026 SAWA United Group. Tous droits réservés.",
    location: "Le Caire · El Sheikh Zayed, 6 Octobre",
    taglineShort: "Ensemble, au-delà des frontières.",
    websites: "sawa-united.net",
  },
  privacy: {
    eyebrow: "Juridique · Confidentialité",
    title: "Politique de confidentialité",
    lead: "Comment SAWA United Group collecte, utilise et protège les informations que vous partagez.",
    updated: "Dernière mise à jour : 1er janvier 2026",
    back: "Retour au groupe",
    note: "Cette politique est disponible en arabe et en anglais.",
    otherLang: "Lire en anglais",
  },
  notFound: {
    eyebrow: "Erreur 404",
    title: "Cette page est au-delà de la carte.",
    lead: "Le lien a peut-être changé ou la page a été déplacée. Revenons sur un terrain solide.",
    home: "Retour à l'accueil",
    projects: "Voir les projets",
    help: "Besoin d'aide ? Écrivez à info@sawa-united.net",
  },
  seo: {
    homeTitle: "SAWA United Group — Automobile & Location, Export Alimentaire, Immobilier & Pétroliers",
    homeTitleEn: "SAWA United Group — Automotive & Car Rental, Food Exports, Real Estate & Petroleum Tankers",
    homeDesc:
      "Fondé en 2014 et récemment établi à son siège principal d'El Sheikh Zayed City (6 Octobre, Le Caire, Égypte), SAWA United Group opère en Turquie, au Maroc, aux Émirats, en Hongrie et en Arabie saoudite.",
    projectsTitle: "Projets | SAWA United Group",
    projectsDesc:
      "Découvrez le portefeuille de projets de SAWA United Group : automobile et location au Maroc, exportation de céréales et denrées alimentaires, immobilier et pétroliers.",
    privacyTitle: "Politique de confidentialité | SAWA United Group",
    privacyDesc:
      "Comment SAWA United Group collecte, utilise et protège les données personnelles partagées via son site.",
    notFoundTitle: "Page introuvable | SAWA United Group",
  },
};

export const copy: Record<Locale, Copy> = { ar, en, fr };

type LocaleContextValue = {
  locale: Locale;
  dir: Dir;
  t: Copy;
  setLocale: (next: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function detectLocale(): Locale {
  try {
    const stored = localStorage.getItem("sawa-locale");
    if (stored === "ar" || stored === "en" || stored === "fr") return stored;
    const fromQuery = new URLSearchParams(window.location.search).get("lang");
    if (fromQuery === "ar" || fromQuery === "en" || fromQuery === "fr") return fromQuery;
    const fromPath = window.location.pathname.replace(/^\/+|\/+$/g, "").toLowerCase();
    if (fromPath === "ar" || fromPath === "en" || fromPath === "fr") return fromPath;
    const browser = navigator.language.slice(0, 2).toLowerCase();
    if (browser === "fr") return "fr";
    if (browser === "ar") return "ar";
  } catch {
    /* noop */
  }
  return "ar";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);
  const dir = localeMeta[locale].dir;

  useEffect(() => {
    const root = document.documentElement;
    root.lang = localeMeta[locale].htmlLang;
    root.dir = dir;
    try {
      localStorage.setItem("sawa-locale", locale);
    } catch {
      /* noop */
    }
  }, [locale, dir]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, dir, t: copy[locale], setLocale }),
    [locale, dir, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useI18n must be used within LocaleProvider");
  return ctx;
}
