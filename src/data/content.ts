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
      ar: "خدمات وتأجير السيارات في المغرب",
      en: "Automotive & car rental in Morocco",
      fr: "Automobile & location au Maroc",
    },
    description: {
      ar: "تتركّز أنشطة المجموعة في قطاع السيارات وإيجار السيارات حاليًا في دولة المغرب، حيث نُشغّل أسطولًا حديثًا للتأجير قصير وطويل الأمد وحلول التنقّل لقطاعَي الأفراد والشركات بمعايير صيانة وخدمة عالية.",
      en: "Our automotive and car rental operations are currently anchored in Morocco — running a modern short- and long-term rental fleet and tailored mobility solutions for individuals and corporate clients.",
      fr: "Nos activités automobiles et de location de voitures sont actuellement concentrées au Maroc, avec une flotte moderne en location courte et longue durée et des solutions de mobilité dédiées.",
    },
    capabilities: {
      ar: ["إيجار السيارات في المغرب", "تأجير وإدارة الأساطيل", "التشغيل والصيانة الدورية"],
      en: ["Car rental in Morocco", "Fleet leasing & management", "Operations & maintenance"],
      fr: ["Location de voitures au Maroc", "Gestion & location de flotte", "Exploitation & maintenance"],
    },
    metric: { ar: "المغرب حاليًا", en: "Focused in Morocco", fr: "Concentré au Maroc" },
    image:
      "https://images.pexels.com/photos/26954167/pexels-photo-26954167.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    accent: "#c68a52",
  },
  {
    id: "food",
    company: "SAWA Foods",
    name: { ar: "الغذاء", en: "Food", fr: "Alimentaire" },
    tagline: {
      ar: "تصدير الحبوب والمواد الغذائية إقليميًا وعالميًا",
      en: "Regional & global grain and food exports",
      fr: "Export régional & mondial de céréales et denrées",
    },
    description: {
      ar: "نتخصص في تصدير الحبوب والمحاصيل الأساسية والمواد الغذائية المختلفة إقليميًا وعالميًا، مدعومين بشبكة توريد موثوقة ومعايير فحص جودة دقيقة وخطوط شحن تربط مراكز الإنتاج بالأسواق المستوردة.",
      en: "We specialise in exporting grains, staple crops and diverse foodstuffs regionally and globally — supported by vetted sourcing networks, strict quality inspection and dependable international trade logistics.",
      fr: "Nous sommes spécialisés dans l'exportation régionale et mondiale de céréales et de denrées alimentaires variées, soutenus par un approvisionnement rigoureux, un contrôle qualité strict et une logistique internationale fiable.",
    },
    capabilities: {
      ar: ["تصدير الحبوب والمحاصيل", "تصدير المواد الغذائية المتنوعة", "الشحن والتجارة الدولية"],
      en: ["Grain & cereal exports", "Diverse foodstuff exports", "Regional & global shipping"],
      fr: ["Exportation de céréales", "Denrées alimentaires variées", "Commerce & fret international"],
    },
    metric: { ar: "تصدير إقليمي وعالمي", en: "Regional & global reach", fr: "Portée régionale & mondiale" },
    image:
      "https://images.pexels.com/photos/2889347/pexels-photo-2889347.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    accent: "#7d9b71",
  },
  {
    id: "realestate",
    company: "SAWA Realty",
    name: { ar: "العقار", en: "Real Estate", fr: "Immobilier" },
    tagline: {
      ar: "أراضٍ في المغرب ووحدات سكنية بباقي الأسواق",
      en: "Land in Morocco & residential units across markets",
      fr: "Terrains au Maroc & unités résidentielles internationales",
    },
    description: {
      ar: "تجمع محفظتنا العقارية بين الاستثمار وتملّك الأراضي الاستراتيجية في دولة المغرب، وتوفير وإدارة وحدات سكنية متنوعة في باقي دول حضورنا في مصر وتركيا والإمارات والمجر والسعودية.",
      en: "Our real estate portfolio combines strategic land holdings in Morocco with a diverse range of residential units across our other markets — Egypt, Türkiye, the UAE, Hungary and Saudi Arabia.",
      fr: "Notre portefeuille immobilier allie des terrains stratégiques au Maroc et des unités résidentielles variées à travers nos autres marchés : Égypte, Turquie, Émirats arabes unis, Hongrie et Arabie saoudite.",
    },
    capabilities: {
      ar: ["أراضٍ استثمارية في المغرب", "وحدات سكنية في باقي الدول", "إدارة وتنمية الأصول"],
      en: ["Land portfolio in Morocco", "Residential units abroad", "Asset management"],
      fr: ["Foncier au Maroc", "Unités résidentielles", "Gestion d'actifs"],
    },
    metric: { ar: "أراضي المغرب + وحدات سكنية", en: "Morocco land + residential", fr: "Foncier Maroc + résidentiel" },
    image:
      "https://images.pexels.com/photos/566317/pexels-photo-566317.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    accent: "#8a9aa8",
  },
  {
    id: "petroleum",
    company: "SAWA Petroleum",
    name: { ar: "البترول", en: "Petroleum", fr: "Pétrole" },
    tagline: {
      ar: "تشغيل وإدارة ناقلات البترول",
      en: "Petroleum tankers & maritime oil transport",
      fr: "Navires pétroliers & transport maritime",
    },
    description: {
      ar: "يتمثل نشاط المجموعة في قطاع البترول في ناقلات البترول؛ حيث ندير عمليات النقل والشحن البحري للنفط الخام والمشتقات البترولية عبر الممرات الإقليمية والدولية بأعلى معايير السلامة البحرية والامتثال الدولي.",
      en: "Our petroleum sector focuses on petroleum tankers — operating and chartering crude and refined oil tankers across key regional and international maritime corridors under strict safety and compliance standards.",
      fr: "Notre activité pétrolière repose sur les pétroliers : exploitation, affrètement et transport maritime de pétrole brut et de produits raffinés sur les routes régionales et internationales selon les plus hautes normes de sécurité.",
    },
    capabilities: {
      ar: ["ناقلات البترول الخام والمكرر", "التأجير والشحن البحري", "السلامة والامتثال البحري"],
      en: ["Crude & product tankers", "Maritime chartering", "Safety & compliance"],
      fr: ["Pétroliers brut & raffiné", "Affrètement maritime", "Sécurité & conformité"],
    },
    metric: { ar: "ناقلات بترول دولية", en: "Petroleum tanker fleet", fr: "Flotte de pétroliers" },
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

const EGY = { ar: "مصر", en: "Egypt", fr: "Égypte" };
const TUR = { ar: "تركيا", en: "Türkiye", fr: "Turquie" };
const MAR = { ar: "المغرب", en: "Morocco", fr: "Maroc" };
const UAE = { ar: "الإمارات العربية المتحدة", en: "United Arab Emirates", fr: "Émirats arabes unis" };
const HUN = { ar: "المجر", en: "Hungary", fr: "Hongrie" };
const KSA = { ar: "المملكة العربية السعودية", en: "Saudi Arabia", fr: "Arabie saoudite" };

export const projects: Project[] = [
  {
    id: "morocco-car-rental",
    sector: "automotive",
    title: {
      ar: "أسطول سوا لإيجار السيارات — المغرب",
      en: "SAWA Car Rental Fleet — Morocco",
      fr: "Flotte de location SAWA — Maroc",
    },
    summary: {
      ar: "منظومة متكاملة لإيجار السيارات قصير وطويل الأمد في المغرب، تخدم الأفراد والشركات وقطاع الأعمال بأسطول حديث وصيانة دورية.",
      en: "A dedicated short- and long-term car rental operation in Morocco serving individual travellers, executives and corporate clients with a modern fleet.",
      fr: "Un service complet de location de voitures courte et longue durée au Maroc, au service des particuliers et des entreprises avec une flotte récente.",
    },
    city: { ar: "الدار البيضاء · المغرب", en: "Casablanca · Morocco", fr: "Casablanca · Maroc" },
    country: MAR,
    year: "2024",
    status: "operating",
    size: { ar: "تأجير يومي وتعاقدي", en: "Daily & long-term", fr: "Courte & longue durée" },
    image:
      "https://images.pexels.com/photos/26954167/pexels-photo-26954167.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    featured: true,
  },
  {
    id: "morocco-fleet-leasing",
    sector: "automotive",
    title: {
      ar: "سوا لخدمات السيارات وتأجير الأساطيل",
      en: "SAWA Mobility & Fleet Leasing",
      fr: "SAWA Mobilité & Location de flotte",
    },
    summary: {
      ar: "برامج تأجير سيارات مرنة وإدارة أساطيل للشركات والمؤسسات عبر المدن المغربية الرئيسية مع دعم تشغيلي متواصل.",
      en: "Flexible corporate car rental and managed automotive fleet programmes across major Moroccan cities with continuous roadside and service support.",
      fr: "Programmes flexibles de location automobile et gestion de flottes d'entreprise dans les grandes villes marocaines avec assistance continue.",
    },
    city: { ar: "مراكش والرباط · المغرب", en: "Marrakech & Rabat · Morocco", fr: "Marrakech & Rabat · Maroc" },
    country: MAR,
    year: "2023",
    status: "operating",
    size: { ar: "أسطول المغرب", en: "Morocco fleet", fr: "Flotte Maroc" },
    image:
      "https://images.pexels.com/photos/5050535/pexels-photo-5050535.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: "global-grain-exports",
    sector: "food",
    title: {
      ar: "منصّة سوا لتصدير الحبوب",
      en: "SAWA Grain Export Platform",
      fr: "Plateforme d'exportation céréalière SAWA",
    },
    summary: {
      ar: "توريد وفحص وتصدير الحبوب والمحاصيل الأساسية — القمح والذرة والبقوليات — إلى المستوردين وشركاء التوزيع إقليميًا وعالميًا.",
      en: "Sourcing, quality-grading and exporting staple grains — wheat, maize and pulses — to importers and trade partners across regional and global markets.",
      fr: "Approvisionnement, contrôle qualité et exportation de céréales de base — blé, maïs et légumineuses — vers les marchés régionaux et mondiaux.",
    },
    city: { ar: "القاهرة · مصر", en: "Cairo · Egypt", fr: "Le Caire · Égypte" },
    country: EGY,
    year: "2024",
    status: "operating",
    size: { ar: "تصدير إقليمي وعالمي", en: "Regional & global", fr: "Régional & mondial" },
    image:
      "https://images.pexels.com/photos/2889347/pexels-photo-2889347.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    featured: true,
  },
  {
    id: "danube-grain-corridor",
    sector: "food",
    title: {
      ar: "ممر أوروبا الوسطى لتصدير الحبوب",
      en: "Central Europe Grain Export Corridor",
      fr: "Corridor céréalier d'Europe centrale",
    },
    summary: {
      ar: "ربط إنتاج الحبوب والسلع الزراعية في المجر وأوروبا الوسطى بخطوط تصدير منتظمة نحو الشرق الأوسط وشمال أفريقيا والأسواق الدولية.",
      en: "Connecting grain and agricultural commodity supply in Hungary and Central Europe with regular export routes into MENA and international markets.",
      fr: "Liaison entre la production céréalière en Hongrie et des lignes d'exportation régulières vers le Moyen-Orient, l'Afrique du Nord et l'international.",
    },
    city: { ar: "بودابست · المجر", en: "Budapest · Hungary", fr: "Budapest · Hongrie" },
    country: HUN,
    year: "2023",
    status: "operating",
    size: { ar: "حبوب ومحاصيل", en: "Bulk grains", fr: "Céréales en vrac" },
    image:
      "https://images.pexels.com/photos/2889093/pexels-photo-2889093.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: "anatolia-food-exports",
    sector: "food",
    title: {
      ar: "مركز سوا لتصدير المواد الغذائية",
      en: "SAWA Foodstuffs Export Hub",
      fr: "Hub d'exportation alimentaire SAWA",
    },
    summary: {
      ar: "تصدير المواد الغذائية المختلفة من الدقيق والزيوت والبقوليات والأغذية الجافة المعبّأة عبر الموانئ التركية إلى الأسواق الإقليمية والعالمية.",
      en: "Exporting diverse food products — flour, edible oils, pulses and packaged dry goods — through Turkish ports to regional and global buyers.",
      fr: "Exportation de produits alimentaires variés — farines, huiles, légumineuses et denrées sèches — vers les acheteurs régionaux et internationaux.",
    },
    city: { ar: "إسطنبول · تركيا", en: "Istanbul · Türkiye", fr: "Istanbul · Turquie" },
    country: TUR,
    year: "2022",
    status: "operating",
    size: { ar: "شحن متعدد الأسواق", en: "Multi-market export", fr: "Export multimarché" },
    image:
      "https://images.pexels.com/photos/2889093/pexels-photo-2889093.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: "morocco-land-portfolio",
    sector: "realestate",
    title: {
      ar: "محفظة أراضي سوا — المغرب",
      en: "SAWA Strategic Land Portfolio — Morocco",
      fr: "Portefeuille foncier SAWA — Maroc",
    },
    summary: {
      ar: "تملّك واستثمار وتهيئة أراضٍ عقارية استراتيجية في مواقع نمو مختارة بالمملكة المغربية ضمن رؤية استثمارية طويلة الأمد.",
      en: "Acquiring, holding and preparing prime strategic land parcels across high-growth corridors in the Kingdom of Morocco for long-term value.",
      fr: "Acquisition, détention et valorisation de terrains stratégiques situés dans des zones à fort potentiel au Royaume du Maroc.",
    },
    city: { ar: "الدار البيضاء وطنجة · المغرب", en: "Casablanca & Tangier · Morocco", fr: "Casablanca & Tanger · Maroc" },
    country: MAR,
    year: "2025",
    status: "operating",
    size: { ar: "أراضٍ استثمارية", en: "Strategic land", fr: "Réserves foncières" },
    image:
      "https://images.pexels.com/photos/40318841/pexels-photo-40318841.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    featured: true,
  },
  {
    id: "gulf-residential-units",
    sector: "realestate",
    title: {
      ar: "وحدات سوا السكنية — السعودية والإمارات",
      en: "SAWA Residential Units — KSA & UAE",
      fr: "Unités résidentielles SAWA — Arabie & Émirats",
    },
    summary: {
      ar: "مجموعة متنوعة من الوحدات والشقق السكنية العصرية في الرياض ودبي بمواصفات تشطيب عالية وإدارة عقارية متكاملة.",
      en: "A curated portfolio of modern residential apartments and family homes in Riyadh and Dubai with high-spec finishes and full property management.",
      fr: "Un portefeuille d'appartements et d'unités résidentielles modernes à Riyad et Dubaï, avec finitions soignées et gestion complète.",
    },
    city: { ar: "الرياض ودبي", en: "Riyadh & Dubai", fr: "Riyad & Dubaï" },
    country: KSA,
    year: "2025",
    status: "operating",
    size: { ar: "وحدات سكنية متنوعة", en: "Residential units", fr: "Unités résidentielles" },
    image:
      "https://images.pexels.com/photos/30094324/pexels-photo-30094324.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: "eurasia-cairo-residences",
    sector: "realestate",
    title: {
      ar: "وحدات سوا السكنية — مصر وتركيا والمجر",
      en: "SAWA Residences — Egypt, Türkiye & Hungary",
      fr: "Résidences SAWA — Égypte, Turquie & Hongrie",
    },
    summary: {
      ar: "وحدات سكنية مختارة بمساحات وأنماط متعددة في القاهرة وإسطنبول وبودابست تجمع بين جودة الموقع والعائد المستدام.",
      en: "Selected residential units across multiple layouts in Cairo, Istanbul and Budapest, pairing prime urban locations with enduring long-term value.",
      fr: "Unités résidentielles variées au Caire, à Istanbul et à Budapest, alliant emplacements urbains recherchés et valeur durable.",
    },
    city: { ar: "القاهرة · إسطنبول · بودابست", en: "Cairo · Istanbul · Budapest", fr: "Le Caire · Istanbul · Budapest" },
    country: EGY,
    year: "2026",
    status: "development",
    size: { ar: "وحدات متعددة الأنماط", en: "Multi-type units", fr: "Logements variés" },
    image:
      "https://images.pexels.com/photos/566317/pexels-photo-566317.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: "petroleum-tankers-fleet",
    sector: "petroleum",
    title: {
      ar: "أسطول سوا لناقلات البترول",
      en: "SAWA Petroleum Tankers Fleet",
      fr: "Flotte de pétroliers SAWA",
    },
    summary: {
      ar: "تشغيل وإدارة ناقلات بترول متخصصة في نقل النفط الخام والمشتقات البترولية عبر خطوط الملاحة الإقليمية والدولية بأعلى معايير الأمان البحري.",
      en: "Operating and managing dedicated petroleum tankers carrying crude oil and refined products across regional and international shipping lanes.",
      fr: "Exploitation et gestion de navires pétroliers dédiés au transport de brut et de produits raffinés sur les voies maritimes régionales et internationales.",
    },
    city: { ar: "دبي · الإمارات", en: "Dubai · UAE", fr: "Dubaï · Émirats" },
    country: UAE,
    year: "2024",
    status: "operating",
    size: { ar: "ناقلات بترول بحرية", en: "Maritime oil tankers", fr: "Pétroliers maritimes" },
    image:
      "https://images.pexels.com/photos/5411674/pexels-photo-5411674.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    featured: true,
  },
  {
    id: "med-gulf-tanker-chartering",
    sector: "petroleum",
    title: {
      ar: "عمليات تأجير وجدولة ناقلات البترول",
      en: "Tanker Chartering & Maritime Operations",
      fr: "Affrètement & opérations de pétroliers",
    },
    summary: {
      ar: "تأجير وجدولة رحلات ناقلات البترول لربط موانئ الشحن والتفريغ بين الخليج العربي والبحر الأحمر والبحر المتوسط بانضباط تشغيلي صارم.",
      en: "Voyage and time chartering of petroleum tankers connecting loading and discharge ports across the Arabian Gulf, Red Sea and Mediterranean.",
      fr: "Affrètement et planification de pétroliers reliant les ports du Golfe, de la mer Rouge et de la Méditerranée avec une rigueur opérationnelle stricte.",
    },
    city: { ar: "السعودية وتركيا", en: "Saudi Arabia & Türkiye", fr: "Arabie saoudite & Turquie" },
    country: KSA,
    year: "2022",
    status: "operating",
    size: { ar: "خطوط شحن دولية", en: "International routes", fr: "Routes internationales" },
    image:
      "https://images.pexels.com/photos/10396411/pexels-photo-10396411.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
];

export type Market = {
  id: string;
  city: Localized;
  country: Localized;
  detail?: Localized;
  lon: number;
  lat: number;
  role: "hq" | "regional" | "operations" | "representative";
  since: string;
  focus: SectorId[];
};

export const markets: Market[] = [
  {
    id: "cairo",
    city: { ar: "القاهرة", en: "Cairo", fr: "Le Caire" },
    country: {
      ar: "مصر · مدينة الشيخ زايد، 6 أكتوبر",
      en: "Egypt · El Sheikh Zayed, 6 October City",
      fr: "Égypte · El Sheikh Zayed, Cité du 6 Octobre",
    },
    detail: {
      ar: "المركز الرئيسي للمجموعة (حديثًا) — إدارة القطاعات، تصدير الحبوب والأغذية، والوحدات السكنية.",
      en: "Newly established main headquarters — group leadership, grain & food exports, and residential units.",
      fr: "Nouveau siège principal du groupe — direction générale, exportation alimentaire et unités résidentielles.",
    },
    lon: 31.2357,
    lat: 30.0444,
    role: "hq",
    since: "2014",
    focus: ["food", "realestate", "petroleum", "automotive"],
  },
  {
    id: "turkey",
    city: { ar: "تركيا", en: "Türkiye", fr: "Turquie" },
    country: { ar: "إسطنبول", en: "Istanbul", fr: "Istanbul" },
    detail: {
      ar: "تصدير الحبوب والمواد الغذائية، وحدات سكنية متنوعة، وخطوط شحن ناقلات البترول.",
      en: "Grain and foodstuff exports, diverse residential units, and petroleum tanker shipping corridors.",
      fr: "Exportation de céréales et denrées, unités résidentielles variées et corridors de pétroliers.",
    },
    lon: 28.9784,
    lat: 41.0082,
    role: "regional",
    since: "2019",
    focus: ["food", "realestate", "petroleum"],
  },
  {
    id: "morocco",
    city: { ar: "المغرب", en: "Morocco", fr: "Maroc" },
    country: { ar: "الدار البيضاء · مراكش · طنجة", en: "Casablanca · Marrakech · Tangier", fr: "Casablanca · Marrakech · Tanger" },
    detail: {
      ar: "المركز الحصري لأنشطة السيارات وإيجار السيارات حاليًا، إلى جانب محفظة الأراضي العقارية.",
      en: "Exclusive hub for our automotive and car rental operations today, alongside strategic land holdings.",
      fr: "Pôle actuel dédié à l'automobile et à la location de voitures, ainsi qu'à notre portefeuille de terrains.",
    },
    lon: -7.5898,
    lat: 33.5731,
    role: "operations",
    since: "2020",
    focus: ["automotive", "realestate"],
  },
  {
    id: "uae",
    city: { ar: "الإمارات", en: "UAE", fr: "Émirats arabes unis" },
    country: { ar: "دبي", en: "Dubai", fr: "Dubaï" },
    detail: {
      ar: "إدارة وتشغيل ناقلات البترول، وحدات سكنية مختارة، وتجارة وتصدير المواد الغذائية.",
      en: "Petroleum tanker operations and chartering, residential units, and international food export trade.",
      fr: "Exploitation et affrètement de pétroliers, unités résidentielles et commerce alimentaire international.",
    },
    lon: 55.2708,
    lat: 25.2048,
    role: "regional",
    since: "2017",
    focus: ["petroleum", "realestate", "food"],
  },
  {
    id: "hungary",
    city: { ar: "المجر", en: "Hungary", fr: "Hongrie" },
    country: { ar: "بودابست", en: "Budapest", fr: "Budapest" },
    detail: {
      ar: "تصدير الحبوب والسلع الغذائية الأوروبية إقليميًا وعالميًا، ومحفظة وحدات سكنية.",
      en: "Exporting Central European grains and foodstuffs regionally and globally, plus residential units.",
      fr: "Exportation de céréales et produits alimentaires d'Europe centrale et unités résidentielles.",
    },
    lon: 19.0402,
    lat: 47.4979,
    role: "operations",
    since: "2022",
    focus: ["food", "realestate"],
  },
  {
    id: "saudi",
    city: { ar: "السعودية", en: "Saudi Arabia", fr: "Arabie saoudite" },
    country: { ar: "الرياض · جدة", en: "Riyadh · Jeddah", fr: "Riyad · Djeddah" },
    detail: {
      ar: "وحدات سكنية متنوعة، توريد وتصدير المواد الغذائية والحبوب، وعمليات ناقلات البترول.",
      en: "Diverse residential units, grain and food commodity trade, and petroleum tanker operations.",
      fr: "Unités résidentielles variées, commerce de céréales et denrées, et opérations de pétroliers.",
    },
    lon: 46.6753,
    lat: 24.7136,
    role: "regional",
    since: "2015",
    focus: ["realestate", "food", "petroleum"],
  },
];

export type PolicySection = { title: string; body: string[] };

export const privacyPolicy: Record<"ar" | "en", { title: string; intro: string; sections: PolicySection[] }> = {
  ar: {
    title: "سياسة الخصوصية",
    intro:
      "تشرح هذه السياسة كيف تجمع مجموعة سوا المتحدة («المجموعة»، «نحن») المعلومات الشخصية وتستخدمها وتحميها عند زيارتك لموقع sawa-united.net أو تواصلك معنا. باستخدامك للموقع فإنك توافق على الممارسات الموضحة أدناه.",
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
          "لممارسة هذه الحقوق، راسلنا على info@sawa-united.net وسنستجيب خلال المدة النظامية.",
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
          "لأي استفسار يتعلق بالخصوصية أو بحماية البيانات، يمكنك مراسلتنا على info@sawa-united.net أو الكتابة إلى المقر الرئيسي: مجموعة سوا المتحدة، مدينة الشيخ زايد، مدينة 6 أكتوبر، القاهرة، مصر.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    intro:
      "This policy explains how SAWA United Group (“the Group”, “we”) collects, uses and protects personal information when you visit sawa-united.net or contact us. By using this website, you agree to the practices described below.",
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
          "To exercise these rights, contact us at info@sawa-united.net and we will respond within the legal timeframe.",
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
          "For any privacy or data-protection question, write to info@sawa-united.net or to our headquarters: SAWA United Group, El Sheikh Zayed City, 6 October City, Cairo, Egypt.",
        ],
      },
    ],
  },
};

export const numberOfStats = {
  years: 12,
  projects: 42,
  markets: 6,
  people: 850,
};
