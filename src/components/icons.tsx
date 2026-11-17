import type { ImgHTMLAttributes, SVGProps } from "react";
import logoMarkSrc from "@/assets/logo-mark.png";

type IconProps = SVGProps<SVGSVGElement>;
type LogoMarkProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function LogoMark({ className = "", ...props }: LogoMarkProps) {
  return (
    <img
      src={logoMarkSrc}
      alt=""
      width={128}
      height={104}
      decoding="async"
      draggable={false}
      aria-hidden="true"
      className={`inline-block select-none object-contain ${className}`.trim()}
      {...props}
    />
  );
}

export function ArrowUpRight({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowRight({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M20 12H4M10 18l-6-6 6-6" />
    </svg>
  );
}

export function Sun({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function Moon({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

export function Globe({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.9 5.8 3.9 9s-1.4 6.4-3.9 9c-2.5-2.6-3.9-5.8-3.9-9S9.5 5.6 12 3Z" />
    </svg>
  );
}

export function Menu({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Close({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function Check({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="m4 12.5 5 5L20 6.5" />
    </svg>
  );
}

export function Mail({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function Phone({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M6.2 3h2.4l1.7 4.3-2 1.4a12 12 0 0 0 5.6 5.6l1.4-2L19.7 14v2.4a2.4 2.4 0 0 1-2.6 2.4A16 16 0 0 1 3.8 5.6 2.4 2.4 0 0 1 6.2 3Z" />
    </svg>
  );
}

export function MapPin({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M12 21s7-6.1 7-11.1a7 7 0 1 0-14 0C5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.7" r="2.6" />
    </svg>
  );
}

export function Clock({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.4l3.4 2" />
    </svg>
  );
}

export function Shield({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M12 3 4.5 6v5.4c0 4.6 3.1 8 7.5 9.6 4.4-1.6 7.5-5 7.5-9.6V6L12 3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  );
}

export function WhatsApp({ className = "", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M12.04 2a9.94 9.94 0 0 0-8.44 15.2L2 22l4.94-1.56A9.94 9.94 0 1 0 12.04 2Zm0 18.07a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.05.96.97-2.97-.2-.31a8.11 8.11 0 1 1 6.71 3.63Zm5.82-6.02c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.65-1.57-.9-2.15-.24-.57-.48-.5-.66-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.06 3.15 5 4.42.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

export function Facebook({ className = "", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M13.6 21v-8.1h2.75l.42-3.18H13.6V7.68c0-.92.26-1.55 1.58-1.55h1.68V3.29c-.29-.04-1.29-.13-2.46-.13-2.44 0-4.1 1.49-4.1 4.22v2.34H7.55v3.18h2.75V21h3.3Z" />
    </svg>
  );
}

export function TikTok({ className = "", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M16.6 5.82A4.1 4.1 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1-2.6-2.6 2.6 2.6 0 0 1 2.6-2.6c.27 0 .53.04.77.12V9.66a5.74 5.74 0 0 0-.77-.05A5.68 5.68 0 0 0 4.18 15.3 5.68 5.68 0 0 0 15.54 15.3V9.01a7.16 7.16 0 0 0 4.19 1.34V7.26a4.1 4.1 0 0 1-3.13-1.44Z" />
    </svg>
  );
}

export function LinkedIn({ className = "", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.7c0-1.36-.03-3.11-1.9-3.11-1.9 0-2.2 1.48-2.2 3.01V21h-4V9Z" />
    </svg>
  );
}

export function Instagram({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XSocial({ className = "", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M17.4 3h3.3l-7.2 8.2L22 21h-6.6l-5.2-6.7L4.3 21H1l7.7-8.8L1.6 3h6.8l4.7 6.2L17.4 3Zm-1.2 16h1.8L7.6 4.8H5.7L16.2 19Z" />
    </svg>
  );
}

export function SocialOrbit({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
      <circle cx="18.5" cy="6.5" r="1.8" />
      <circle cx="5.8" cy="8" r="1.6" />
      <circle cx="16.5" cy="18.2" r="1.7" />
      <path d="m13.8 10.5 3.3-2.8M10 10.9 7.3 9M13.3 14l2.1 2.8" />
    </svg>
  );
}

export function socialIcon(id: string) {
  const map = {
    facebook: Facebook,
    tiktok: TikTok,
    instagram: Instagram,
    linkedin: LinkedIn,
    x: XSocial,
  } as const;
  return map[id as keyof typeof map] ?? Globe;
}

export function Car({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M4 15.5 5.4 10A3 3 0 0 1 8.3 8h7.4a3 3 0 0 1 2.9 2l1.4 5.5" />
      <path d="M3.5 15.5h17v3h-2.2M5.7 18.5H3.5v-3M9 18.5h6" />
      <circle cx="7" cy="18.5" r="1.6" />
      <circle cx="17" cy="18.5" r="1.6" />
      <path d="M6.5 12h11" />
    </svg>
  );
}

export function Leaf({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M20.5 3.5C11 3 4.5 7 4.5 13.2c0 3.2 2.3 5.6 5.5 5.6 6.2 0 10.2-6.4 10.5-15.3Z" />
      <path d="M3.5 21c1.6-5.2 4.6-8.7 9.4-11.2" />
    </svg>
  );
}

export function Building({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M4 21V5.5L13 3v18M13 9h7v12M4 21h17" />
      <path d="M7.4 8h2.2M7.4 11.5h2.2M7.4 15h2.2M16 12.5h1.2M16 16h1.2" />
    </svg>
  );
}

export function Droplet({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M12 3s6.6 7 6.6 11.4A6.6 6.6 0 0 1 12 21a6.6 6.6 0 0 1-6.6-6.6C5.4 10 12 3 12 3Z" />
      <path d="M9 14.6a3 3 0 0 0 3 3" />
    </svg>
  );
}

export function Spark({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  );
}

export function ChevronDown({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Refresh({ className = "", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7" />
    </svg>
  );
}

export function sectorIcon(id: string) {
  const map = {
    automotive: Car,
    food: Leaf,
    realestate: Building,
    petroleum: Droplet,
  } as const;
  return map[id as keyof typeof map] ?? Spark;
}
