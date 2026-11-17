export type SocialId = "facebook" | "tiktok" | "instagram";

export type SocialChannel = {
  id: SocialId;
  code: string;
  label: string;
  handle: string;
  shortUrl: string;
  href: string;
  icon: SocialId;
  coordinates: string;
};

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
  phoneDisplay: "+20 10 1122 5592",
  phoneHref: "+201011225592",
  whatsappNumber: "201011225592",
  address: {
    ar: "طريق الملك فهد، الرياض، المملكة العربية السعودية",
    en: "King Fahd Road, Riyadh, Saudi Arabia",
    fr: "King Fahd Road, Riyad, Arabie saoudite",
  },
  founded: "2007",
  socials: [
    {
      id: "facebook",
      code: "01",
      label: "Facebook",
      handle: "@Sawaunited.net",
      shortUrl: "facebook.com/Sawaunited.net",
      href: "https://www.facebook.com/Sawaunited.net",
      icon: "facebook",
      coordinates: "24°42′N · HQ",
    },
    {
      id: "tiktok",
      code: "02",
      label: "TikTok",
      handle: "@sawa.united",
      shortUrl: "tiktok.com/@sawa.united",
      href: "https://www.tiktok.com/@sawa.united",
      icon: "tiktok",
      coordinates: "09:16 · LIVE",
    },
    {
      id: "instagram",
      code: "03",
      label: "Instagram",
      handle: "@sawa.united.egypt",
      shortUrl: "instagram.com/sawa.united.egypt",
      href: "https://www.instagram.com/sawa.united.egypt",
      icon: "instagram",
      coordinates: "30°02′N · EG",
    },
  ] satisfies SocialChannel[],
};

export function whatsappLink(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${site.whatsappNumber}${text}`;
}

export const SITE_IMAGES = {
  about: "https://images.pexels.com/photos/3861563/pexels-photo-3861563.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  og: "https://images.pexels.com/photos/566317/pexels-photo-566317.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
};
