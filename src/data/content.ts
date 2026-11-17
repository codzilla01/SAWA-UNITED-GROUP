import type { Locale } from "@/lib/i18n";

export type Localized = Record<Locale, string>;
export type SectorId = "automotive" | "food" | "realestate" | "petroleum";
export type ProjectStatus = "operating" | "development" | "delivered";

export type Sector = {
  id: SectorId;
  company: string;
  name: Localized;
  tagline: Localized;
  description: Localized;
  capabilities: Record<Locale, string[]>;
  metric: Localized;
  image: string;
  accent: string;
};

export const sectors: Sector[] = [
  {
    id: "automotive",
    company: "SAWA Motors",
    name: { ar: "السيارات", en: "Automotive", fr: "Automobile" },
    tagline: {
      ar: "توزيع وبيع وخدمات ما بعد البيع",
      en: "Distribution, retail & after-sales",
      fr: "Distribution, vente & après-vente",
    },
    description: {
      ar: "نغطي سلسلة قيمة السيارات؛ من التوزيع والبيع بالتجزئة إلى خدمات ما بعد البيع والتمويل المرن، عبر شراكات مع علامات عالمية وفرق تفهم السوق المحلي.",
      en: "We cover the automotive value chain — distribution, retail, after-sales and flexible financing — through partnerships with global marques and teams that understand the local market.",
      fr: "Nous couvrons toute la chaîne de valeur automobile : distribution, vente, après-vente et financement flexible, grâce à des partenariats internationaux et des équipes ancrées localement.",
    },
    capabilities: {
      ar: ["التوزيع والوكلات", "خدمات ما بعد البيع", "التأجير والتمويل"],
      en: ["Distribution & retail", "After-sales care", "Leasing & finance"],
      fr: ["Distribution & vente", "Après-vente", "Leasing & financement"],
    },
    metric: { ar: "12 معرضًا", en: "12 showrooms", fr: "12 showrooms" },
    image:
      "https://images.pexels.com/photos/26954167/pexels-photo-26954167.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    accent: "#c68a52",
  },
  {
    id: "food",
    company: "SAWA Foods",
    name: { ar: "الغذاء", en: "Food", fr: "Alimentaire" },
    tagline: {
      ar: "تصنيع وتوزيع غذائي موثوق",
      en: "Trusted manufacturing & distribution",
      fr: "Fabrication & distribution de confiance",
    },
    description: {
      ar: "من المصدر إلى المائدة: نصنّع ونوزّع منتجات غذائية آمنة وعالية الجودة، مدعومة بسلاسل إمداد محلية وإقليمية قادرة على الصمود والتوسع.",
      en: "From source to table — we manufacture and distribute safe, quality food, backed by resilient local and regional supply chains built to grow.",
      fr: "De la source à la table : nous fabriquons et distribuons des produits sûrs et de qualité, grâce à des chaînes d'approvisionnement locales et régionales résilientes.",
    },
    capabilities: {
      ar: ["التصنيع الغذائي", "سلاسل الإمداد", "العلامات التجارية"],
      en: ["Food manufacturing", "Supply chain", "Consumer brands"],
      fr: ["Fabrication", "Chaîne logistique", "Marques"],
    },
    metric: { ar: "3 مرافق إنتاج", en: "3 production sites", fr: "3 sites de production" },
    image:
      "https://images.pexels.com/photos/2889347/pexels-photo-2889347.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    accent: "#7d9b71",
  },
  {
    id: "realestate",
    company: "SAWA Realty",
    name: { ar: "العقار", en: "Real Estate", fr: "Immobilier" },
    tagline: {
      ar: "تطوير وإدارة أصول عقارية",
      en: "Development & asset management",
      fr: "Développement & gestion d'actifs",
    },
    description: {
      ar: "نطوّر ونستثمر في وجهات سكنية وتجارية متكاملة، وندير أصولًا تُشغّل القيمة على المدى الطويل بما يتوافق مع احتياجات المجتمعات وأهداف المدن.",
      en: "We develop and invest in integrated residential and commercial destinations, and manage assets that compound value over the long term — aligned with communities and city ambitions.",
      fr: "Nous développons et investissons dans des destinations résidentielles et commerciales intégrées, et gérons des actifs qui créent de la valeur durable, au service des communautés.",
    },
    capabilities: {
      ar: ["التطوير العقاري", "إدارة الأصول", "الاستثمار المشترك"],
      en: ["Development", "Asset management", "Co-investment"],
      fr: ["Développement", "Gestion d'actifs", "Co-investissement"],
    },
    metric: { ar: "1.4M م²", en: "1.4M m²", fr: "1,4M m²" },
    image:
      "https://images.pexels.com/photos/566317/pexels-photo-566317.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    accent: "#8a9aa8",
  },
  {
    id: "petroleum",
    company: "SAWA Petroleum",
    name: { ar: "البترول", en: "Petroleum", fr: "Pétrole" },
    tagline: {
      ar: "تجارة وخدمات طاقة",
      en: "Trading & energy services",
      fr: "Négoce & services énergétiques",
    },
    description: {
      ar: "نقدّم خدمات وتجارة في قطاع الطاقة تشمل تزويد الوقود والخدمات الصناعية وحلول الطاقة المساندة، لعملاء من القطاعين العام والخاص بمعايير سلامة صارمة.",
      en: "We provide trading and services across the energy sector — fuel supply, industrial services and supporting energy solutions for public and private clients, under strict safety standards.",
      fr: "Nous fournissons des services et du négoce dans l'énergie : approvisionnement en carburant, services industriels et solutions complémentaires, avec des standards de sécurité stricts.",
    },
    capabilities: {
      ar: ["تزويد الوقود", "الخدمات الصناعية", "لوجستيات الطاقة"],
      en: ["Fuel supply", "Industrial services", "Energy logistics"],
      fr: ["Approvisionnement", "Services industriels", "Logistique énergétique"],
    },
    metric: { ar: "9 منشآت", en: "9 terminals", fr: "9 terminaux" },
    image:
      "https://images.pexels.com/photos/5411674/pexels-photo-5411674.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    accent: "#c9a36b",
  },
];

export type Project = {
  id: string;
  sector: SectorId;
  title: Localized;
  summary: Localized;
  city: Localized;
  country: Localized;
  year: string;
  status: ProjectStatus;
  size: Localized;
  image: string;
  featured?: boolean;
};

const KSA = { ar: "المملكة العربية السعودية", en: "Saudi Arabia", fr: "Arabie saoudite" };
const UAE = { ar: "الإمارات العربية المتحدة", en: "United Arab Emirates", fr: "Émirats arabes unis" };
const EGY = { ar: "مصر", en: "Egypt", fr: "Égypte" };
const QAT = { ar: "قطر", en: "Qatar", fr: "Qatar" };
const TUR = { ar: "تركيا", en: "Türkiye", fr: "Turquie" };
const FRA = { ar: "فرنسا", en: "France", fr: "France" };

export const projects: Project[] = [
  {
    id: "mobility-hub",
    sector: "automotive",
    title: { ar: "مركز سوا للتنقّل", en: "SAWA Mobility Hub", fr: "SAWA Mobility Hub" },
    summary: {
      ar: "وجهة متعددة العلامات للسيارات تجمع المعارض وخدمات ما بعد البيع ومركز الابتكار في موقع واحد.",
      en: "A multi-brand automotive destination bringing showrooms, after-sales and an innovation studio together in one place.",
      fr: "Une destination automobile multimarque réunissant showrooms, après-vente et studio d'innovation.",
    },
    city: { ar: "الرياض", en: "Riyadh", fr: "Riyad" },
    country: KSA,
    year: "2025",
    status: "development",
    size: { ar: "34,000 م²", en: "34,000 m²", fr: "34 000 m²" },
    image:
      "https://images.pexels.com/photos/26954167/pexels-photo-26954167.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    featured: true,
  },
  {
    id: "west-retail",
    sector: "automotive",
    title: { ar: "شبكة سوا للبيع بالتجزئة", en: "SAWA Auto Retail Network", fr: "Réseau SAWA Auto" },
    summary: {
      ar: "شبكة معارض وخدمات في المنطقة الغربية، مع تسليم وتأجير وبرامج تمويل مرنة.",
      en: "A West Coast network of showrooms and service centres with delivery, leasing and flexible finance programmes.",
      fr: "Un réseau de showrooms et centres de services sur la côte ouest, avec leasing et financement flexible.",
    },
    city: { ar: "جدة", en: "Jeddah", fr: "Djeddah" },
    country: KSA,
    year: "2023",
    status: "operating",
    size: { ar: "7 معارض", en: "7 showrooms", fr: "7 showrooms" },
    image:
      "https://images.pexels.com/photos/5050535/pexels-photo-5050535.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: "harvest-foods",
    sector: "food",
    title: { ar: "مصانع سوا هارفست", en: "SAWA Harvest Foods", fr: "SAWA Harvest Foods" },
    summary: {
      ar: "منشأة تصنيع غذائي بثلاثة خطوط إنتاج، تخدم تجار التجزئة والجملة في المنطقة الشرقية.",
      en: "A food manufacturing facility with three production lines serving retail and wholesale partners across the Eastern Province.",
      fr: "Un site de fabrication alimentaire doté de trois lignes de production pour les partenaires de détail et de gros.",
    },
    city: { ar: "الخبر", en: "Al Khobar", fr: "Al Khobar" },
    country: KSA,
    year: "2024",
    status: "operating",
    size: { ar: "18,000 م²", en: "18,000 m²", fr: "18 000 m²" },
    image:
      "https://images.pexels.com/photos/2889347/pexels-photo-2889347.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    featured: true,
  },
  {
    id: "farm-to-shelf",
    sector: "food",
    title: { ar: "من المزرعة إلى الرف", en: "Farm to Shelf", fr: "De la ferme à l'étagère" },
    summary: {
      ar: "منظومة توزيع مبرّدة تربط المنتجين المحليين بشبكة تجزئة متنامية في القاهرة والدلتا.",
      en: "A cold-chain distribution platform connecting local producers to a growing retail network across Cairo and the Delta.",
      fr: "Une plateforme de distribution sous température dirigée reliant producteurs locaux et réseau de détail.",
    },
    city: { ar: "القاهرة", en: "Cairo", fr: "Le Caire" },
    country: EGY,
    year: "2022",
    status: "operating",
    size: { ar: "4 مراكز", en: "4 hubs", fr: "4 hubs" },
    image:
      "https://images.pexels.com/photos/2889093/pexels-photo-2889093.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: "horizon-residences",
    sector: "realestate",
    title: { ar: "سوا هورايزون السكنية", en: "SAWA Horizon Residences", fr: "SAWA Horizon Residences" },
    summary: {
      ar: "مجتمع سكني متكامل يضم 220 وحدة ومرافق مجتمعية ومساحات خضراء، في شمال الرياض.",
      en: "An integrated residential community of 220 homes with community facilities and green space in north Riyadh.",
      fr: "Une communauté résidentielle de 220 logements avec équipements et espaces verts au nord de Riyad.",
    },
    city: { ar: "الرياض", en: "Riyadh", fr: "Riyad" },
    country: KSA,
    year: "2026",
    status: "development",
    size: { ar: "220 وحدة", en: "220 homes", fr: "220 logements" },
    image:
      "https://images.pexels.com/photos/30094324/pexels-photo-30094324.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    featured: true,
  },
  {
    id: "corniche-quarter",
    sector: "realestate",
    title: { ar: "ربع الكورنيش للأعمال", en: "Corniche Business Quarter", fr: "Quartier d'affaires Corniche" },
    summary: {
      ar: "مبانٍ مكتبية وتجارية منخفضة الارتفاع حول ممر مشاة نابض، بإدارة أصول كاملة.",
      en: "Low-rise offices and retail around an active pedestrian spine, under full asset management.",
      fr: "Bureaux et commerces de faible hauteur autour d'une promenade active, entièrement gérés.",
    },
    city: { ar: "الدوحة", en: "Doha", fr: "Doha" },
    country: QAT,
    year: "2024",
    status: "operating",
    size: { ar: "62,000 م²", en: "62,000 m²", fr: "62 000 m²" },
    image:
      "https://images.pexels.com/photos/40318841/pexels-photo-40318841.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: "energy-terminal",
    sector: "petroleum",
    title: { ar: "محطة سوا للطاقة", en: "SAWA Energy Terminal", fr: "Terminal énergétique SAWA" },
    summary: {
      ar: "منشأة تخزين وتوزيع وقود بمعايير سلامة متقدمة، تخدم العملاء الصناعيين والتجاريين في دبي.",
      en: "A fuel storage and distribution terminal built to advanced safety standards, serving industrial and commercial clients in Dubai.",
      fr: "Un terminal de stockage et de distribution de carburant aux normes de sécurité avancées à Dubaï.",
    },
    city: { ar: "دبي", en: "Dubai", fr: "Dubaï" },
    country: UAE,
    year: "2023",
    status: "operating",
    size: { ar: "4 خزانات", en: "4 tanks", fr: "4 réservoirs" },
    image:
      "https://images.pexels.com/photos/5411674/pexels-photo-5411674.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    featured: true,
  },
  {
    id: "gulf-fuel-logistics",
    sector: "petroleum",
    title: { ar: "لوجستيات الوقود الخليجية", en: "Gulf Fuel Logistics", fr: "Logistique carburant du Golfe" },
    summary: {
      ar: "أسطول نقل وقود وخدمات تزويد ميدانية للمشروعات الإنشائية والمنشآت الصناعية.",
      en: "A fuel transport fleet and on-site supply service for construction projects and industrial facilities.",
      fr: "Une flotte de transport et un service d'approvisionnement sur site pour chantiers et industriels.",
    },
    city: { ar: "الدمام", en: "Dammam", fr: "Dammam" },
    country: KSA,
    year: "2021",
    status: "delivered",
    size: { ar: "24 شاحنة", en: "24 trucks", fr: "24 camions" },
    image:
      "https://images.pexels.com/photos/10396411/pexels-photo-10396411.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: "overseas-desk",
    sector: "realestate",
    title: { ar: "مكتب سوا الدولي", en: "SAWA Overseas Desk", fr: "Bureau SAWA International" },
    summary: {
      ar: "مكتب استثمار عقاري عابر للحدود يربط رؤوس الأموال الأوروبية بفرص نوعية في الخليج.",
      en: "A cross-border real estate investment desk connecting European capital with quality Gulf opportunities.",
      fr: "Un bureau d'investissement immobilier transfrontalier reliant les capitaux européens aux opportunités du Golfe.",
    },
    city: { ar: "باريس", en: "Paris", fr: "Paris" },
    country: FRA,
    year: "2025",
    status: "operating",
    size: { ar: "مكتب تمثيلي", en: "Representative office", fr: "Bureau de représentation" },
    image:
      "https://images.pexels.com/photos/30094324/pexels-photo-30094324.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: "anatolia-hub",
    sector: "food",
    title: { ar: "مركز أناضول للتوزيع", en: "Anatolia Distribution Hub", fr: "Hub de distribution Anatolie" },
    summary: {
      ar: "مركز إقليمي للتوزيع الغذائي يربط مصانع المجموعة بأسواق تركيا والبلقان.",
      en: "A regional food distribution hub linking the group's production to Türkiye and Balkan markets.",
      fr: "Un hub régional de distribution alimentaire reliant la production du groupe aux marchés turcs et balkaniques.",
    },
    city: { ar: "إسطنبول", en: "Istanbul", fr: "Istanbul" },
    country: TUR,
    year: "2022",
    status: "operating",
    size: { ar: "11,000 م²", en: "11,000 m²", fr: "11 000 m²" },
    image:
      "https://images.pexels.com/photos/2889093/pexels-photo-2889093.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
];

export type Market = {
  id: string;
  city: Localized;
  country: Localized;
  lon: number;
  lat: number;
  role: "hq" | "regional" | "operations" | "representative";
  since: string;
  focus: SectorId[];
};

export const markets: Market[] = [
  {
    id: "cairo",
    city: {
      ar: "الشيخ زايد · 6 أكتوبر",
      en: "El Sheikh Zayed · 6 October",
      fr: "El Sheikh Zayed · 6 Octobre",
    },
    country: EGY,
    lon: 30.9718,
    lat: 30.0444,
    role: "hq",
    since: "2007",
    focus: ["automotive", "food", "realestate", "petroleum"],
  },
  {
    id: "riyadh",
    city: { ar: "الرياض", en: "Riyadh", fr: "Riyad" },
    country: { ar: "المملكة العربية السعودية", en: "Saudi Arabia", fr: "Arabie saoudite" },
    lon: 46.6753,
    lat: 24.7136,
    role: "regional",
    since: "2012",
    focus: ["automotive", "food", "realestate"],
  },
  {
    id: "dubai",
    city: { ar: "دبي", en: "Dubai", fr: "Dubaï" },
    country: UAE,
    lon: 55.2708,
    lat: 25.2048,
    role: "regional",
    since: "2015",
    focus: ["petroleum", "automotive", "realestate"],
  },
  {
    id: "doha",
    city: { ar: "الدوحة", en: "Doha", fr: "Doha" },
    country: QAT,
    lon: 51.531,
    lat: 25.2854,
    role: "regional",
    since: "2020",
    focus: ["realestate", "petroleum"],
  },
  {
    id: "istanbul",
    city: { ar: "إسطنبول", en: "Istanbul", fr: "Istanbul" },
    country: TUR,
    lon: 28.9784,
    lat: 41.0082,
    role: "operations",
    since: "2021",
    focus: ["food", "automotive"],
  },
  {
    id: "paris",
    city: { ar: "باريس", en: "Paris", fr: "Paris" },
    country: FRA,
    lon: 2.3522,
    lat: 48.8566,
    role: "representative",
    since: "2025",
    focus: ["realestate"],
  },
];

export type PolicySection = { title: string; body: string[] };

export const privacyPolicy: Record<"ar" | "en", { title: string; intro: string; sections: PolicySection[] }> = {
  ar: {
    title: "سياسة الخصوصية",
    intro:
      "تشرح هذه السياسة كيف تجمع مجموعة سوا المتحدة («المجموعة»، «نحن») المعلومات الشخصية وتستخدمها وتحميها عند زيارتك لموقع sawaunited.net أو تواصلك معنا. باستخدامك للموقع فإنك توافق على الممارسات الموضحة أدناه.",
    sections: [
      {
        title: "المعلومات التي نجمعها",
        body: [
          "المعلومات التي تقدّمها طوعًا عبر نموذج التواصل، وتشمل الاسم والبريد الإلكتروني ورقم الجوال والقطاع محل الاهتمام ونص الرسالة.",
          "بيانات تقنية محدودة تُجمع تلقائيًا مثل نوع المتصفح والجهاز والصفحات التي تزورها ومدة الزيارة، بهدف تحسين أداء الموقع وأمانه.",
        ],
      },
      {
        title: "كيف نستخدم معلوماتك",
        body: [
          "نستخدم بياناتك للرد على استفساراتك ومتابعة فرص الأعمال والشراكات، ولتلبية الالتزامات القانونية والتنظيمية.",
          "قد نستخدم بيانات مجهولة الهوية ومجمّعة لفهم استخدام الموقع وتطوير خدماته. لا نبيع معلوماتك الشخصية ولا نشاركها لأغراض تسويقية لجهات أخرى.",
        ],
      },
      {
        title: "ملفات تعريف الارتباط والتفضيلات المحلية",
        body: [
          "يستخدم الموقع التخزين المحلي في متصفحك لحفظ تفضيلات اللغة (العربية، الإنجليزية، الفرنسية) والمظهر (الليلي أو النهاري)، بما يتيح لك تجربة متسقة عند العودة.",
          "هذه التفضيلات تبقى على جهازك ولا تُرسل إلى خوادمنا. يمكنك حذفها في أي وقت من إعدادات المتصفح.",
        ],
      },
      {
        title: "مشاركة المعلومات",
        body: [
          "نقيّد الوصول إلى معلوماتك على الموظفين والشركات التابعة الذين يحتاجون إليها لأداء مهامهم، ونطلب منهم الحفاظ على سريتها.",
          "قد نفصح عن البيانات إذا طُلب منّا ذلك بموجب نظام أو أمر قضائي، أو لحماية حقوق المجموعة وسلامة زوّار الموقع.",
        ],
      },
      {
        title: "الأمان والاحتفاظ",
        body: [
          "نطبّق ضوابط تقنية وتنظيمية معقولة لحماية البيانات، بما في ذلك تشفير الاتصال عبر HTTPS والتحقق من المدخلات والحماية من الرسائل المزعجة.",
          "نحتفظ بالبيانات فقط للمدة اللازمة لتحقيق الغرض الذي جُمعت من أجله أو للامتثال للمتطلبات النظامية.",
        ],
      },
      {
        title: "حقوقك",
        body: [
          "يحق لك طلب الوصول إلى معلوماتك الشخصية أو تصحيحها أو حذفها، أو الاعتراض على معالجتها، وذلك وفقًا للقوانين والأنظمة المعمول بها في جمهورية مصر العربية.",
          "للممارسة هذه الحقوق، راسلنا على info@sawaunited.net وسنستجيب خلال المدة النظامية.",
        ],
      },
      {
        title: "التعديلات على السياسة",
        body: [
          "قد نُحدّث هذه السياسة من وقت لآخر. سيظهر تاريخ آخر تحديث أعلى الصفحة، ويُعد استمرارك في استخدام الموقع موافقة على النسخة السارية.",
        ],
      },
      {
        title: "التواصل معنا",
        body: [
          "لأي استفسار يتعلق بالخصوصية أو بحماية البيانات، يمكنك مراسلتنا على info@sawaunited.net أو الكتابة إلى المقر الرئيسي: مجموعة سوا المتحدة، مدينة الشيخ زايد، مدينة 6 أكتوبر، مصر.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    intro:
      "This policy explains how SAWA United Group (“the Group”, “we”) collects, uses and protects personal information when you visit sawaunited.net or contact us. By using this website, you agree to the practices described below.",
    sections: [
      {
        title: "Information we collect",
        body: [
          "Information you choose to share through the contact form, including your name, email address, phone number, sector of interest and message.",
          "Limited technical data collected automatically, such as browser and device type, pages visited and visit duration, used to improve the performance and security of the website.",
        ],
      },
      {
        title: "How we use your information",
        body: [
          "We use your information to respond to enquiries and to follow up on business and partnership opportunities, and to meet legal and regulatory obligations.",
          "We may use anonymised, aggregated data to understand website usage and improve our services. We do not sell personal information or share it for third-party marketing.",
        ],
      },
      {
        title: "Cookies and local preferences",
        body: [
          "The website uses your browser's local storage to remember your language (Arabic, English or French) and appearance (dark or light) preferences, so your experience is consistent when you return.",
          "These preferences remain on your device and are not transmitted to our servers. You may clear them at any time from your browser settings.",
        ],
      },
      {
        title: "Sharing information",
        body: [
          "Access to your information is restricted to employees and affiliates who need it to do their work, and who are required to keep it confidential.",
          "We may disclose information where required by law or court order, or to protect the rights of the Group and the safety of website visitors.",
        ],
      },
      {
        title: "Security and retention",
        body: [
          "We apply reasonable technical and organisational safeguards, including HTTPS encryption, server-side validation and spam protection.",
          "We retain personal data only for as long as needed for the purpose for which it was collected, or as required by applicable regulation.",
        ],
      },
      {
        title: "Your rights",
        body: [
          "You may request access to, correction of, or deletion of your personal information, or object to its processing, in accordance with applicable laws and regulations in the Arab Republic of Egypt.",
          "To exercise these rights, contact us at info@sawaunited.net and we will respond within the legal timeframe.",
        ],
      },
      {
        title: "Changes to this policy",
        body: [
          "We may update this policy from time to time. The last-updated date will appear at the top of the page. Continued use of the website constitutes acceptance of the current version.",
        ],
      },
      {
        title: "Contact us",
        body: [
          "For any privacy or data-protection question, write to info@sawaunited.net or to our headquarters: SAWA United Group, El Sheikh Zayed City, 6 October City, Egypt.",
        ],
      },
    ],
  },
};

export const numberOfStats = {
  years: 18,
  projects: 42,
  markets: 6,
  people: 850,
};
