export const site = {
  name: {
    ar: "مجموعة سوا المتحدة",
    en: "SAWA United Group",
    fr: "SAWA United Group",
  },
  shortName: "SAWA",
  domain: "sawaunited.net",
  url: "https://sawaunited.net",
  email: "info@sawaunited.net",
  outgoingEmail: "noreply@sawaunited.net",
  phoneDisplay: "+966 55 123 4567",
  phoneHref: "+966551234567",
  whatsappNumber: "966551234567",
  address: {
    ar: "طريق الملك فهد، الرياض، المملكة العربية السعودية",
    en: "King Fahd Road, Riyadh, Saudi Arabia",
    fr: "King Fahd Road, Riyad, Arabie saoudite",
  },
  founded: "2007",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/sawa-united-group/", icon: "linkedin" as const },
    { label: "X", href: "https://x.com/sawaunitedgroup", icon: "x" as const },
    { label: "Instagram", href: "https://www.instagram.com/sawaunitedgroup/", icon: "instagram" as const },
  ],
};

export function whatsappLink(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${site.whatsappNumber}${text}`;
}

export const SITE_IMAGES = {
  about: "https://images.pexels.com/photos/3861563/pexels-photo-3861563.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  og: "https://images.pexels.com/photos/566317/pexels-photo-566317.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
};
