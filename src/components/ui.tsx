import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";
import { ArrowUpRight, LogoMark, socialIcon } from "./icons";
import { site } from "@/lib/site";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10", className)}>{children}</div>;
}

export function Logo({
  className,
  invert = false,
  showTagline = true,
}: {
  className?: string;
  invert?: boolean;
  showTagline?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={cn("h-9 w-9 shrink-0", invert ? "text-[#f6f1e7]" : "text-accent")} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[1.22rem] font-extrabold tracking-[0.12em]",
            invert ? "text-[#f6f1e7]" : "text-ink",
          )}
        >
          SAWA
        </span>
        {showTagline && (
          <span
            className={cn(
              "mt-1 text-[0.53rem] font-semibold tracking-[0.32em]",
              invert ? "text-[#f6f1e7]/60" : "text-muted",
            )}
          >
            UNITED GROUP
          </span>
        )}
      </span>
    </span>
  );
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "dark" | "outline" | "light" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  withArrow?: boolean;
  icon?: ReactNode;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
};

const buttonVariants = {
  primary:
    "bg-accent text-[#181310] hover:bg-accent-2 hover:shadow-[0_12px_30px_-12px_rgba(185,122,67,0.75)]",
  dark: "bg-brand text-on-brand hover:bg-brand-2",
  outline: "border border-line bg-transparent text-ink hover:border-accent hover:text-accent",
  light: "border border-white/25 bg-white/[0.06] text-[#f6f1e7] hover:border-white/45 hover:bg-white/10",
  ghost: "text-ink hover:text-accent",
  danger: "bg-[#c2543f] text-white hover:bg-[#a8442f]",
};

const buttonSizes = {
  sm: "px-4 py-2 text-[0.72rem]",
  md: "px-5 py-2.5 text-[0.78rem]",
  lg: "px-6 py-3.5 text-[0.84rem]",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  withArrow = false,
  icon,
  target,
  rel,
  type = "button",
  disabled,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[0.04em] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60",
    buttonVariants[variant],
    buttonSizes[size],
    className,
  );
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {withArrow && <ArrowUpRight className="arrow-flip h-4 w-4" />}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}

export function Eyebrow({
  children,
  invert = false,
  className,
}: {
  children: ReactNode;
  invert?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[0.66rem] font-bold uppercase tracking-[0.26em]",
        invert ? "text-[#f6f1e7]/65" : "text-muted",
        className,
      )}
    >
      <span className={cn("h-[5px] w-[5px] rounded-full", invert ? "bg-accent" : "bg-accent")} />
      {children}
    </span>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-in", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      setDisplay(value);
      return;
    }

    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current) return;
        started.current = true;
        const duration = 1500;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * value));
          if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

export function SocialLinks({
  invert = false,
  compact = false,
  className,
}: {
  invert?: boolean;
  compact?: boolean;
  className?: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {site.socials.map((social) => {
        const Icon = socialIcon(social.icon);
        const expanded = activeId === social.id;
        const revealText = compact ? social.label : social.handle;

        return (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${social.label} (${social.handle})`}
            onMouseEnter={() => setActiveId(social.id)}
            onMouseLeave={() => setActiveId(null)}
            onFocus={() => setActiveId(social.id)}
            onBlur={() => setActiveId(null)}
            className={cn(
              "group inline-flex h-9 items-center rounded-full border transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
              expanded ? "px-3.5" : "px-[9px]",
              invert
                ? expanded
                  ? "border-accent bg-accent text-[#181310] shadow-[0_10px_25px_-10px_rgba(216,160,106,0.75)]"
                  : "border-white/15 bg-white/[0.03] text-[#f6f1e7]/75 hover:border-accent hover:text-accent"
                : expanded
                  ? "border-accent bg-accent text-[#181310] shadow-[0_10px_25px_-10px_rgba(185,122,67,0.65)]"
                  : "border-line bg-surface/60 text-muted hover:border-accent hover:text-accent",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span
              className={cn(
                "grid overflow-hidden transition-[grid-template-columns,margin] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
                expanded ? "ms-2 grid-cols-[1fr]" : "ms-0 grid-cols-[0fr]",
              )}
            >
              <span className="inline-flex min-w-0 items-center gap-1 overflow-hidden whitespace-nowrap text-[0.66rem] font-bold">
                <span dir="ltr">{revealText}</span>
                <ArrowUpRight className="arrow-flip h-3 w-3 shrink-0" />
              </span>
            </span>
          </a>
        );
      })}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  action,
  invert = false,
  className,
  align = "start",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  action?: ReactNode;
  invert?: boolean;
  className?: string;
  align?: "start" | "center";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-8 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
        <Eyebrow invert={invert}>{eyebrow}</Eyebrow>
        <h2
          className={cn(
            "mt-5 text-[clamp(1.9rem,3.6vw,3.15rem)] font-semibold leading-[1.06] tracking-[-0.03em]",
            invert ? "text-[#f6f1e7]" : "text-ink",
          )}
        >
          {title}
        </h2>
        {lead && (
          <p
            className={cn(
              "mt-5 max-w-xl text-[0.95rem] leading-relaxed",
              invert ? "text-[#f6f1e7]/60" : "text-muted",
            )}
          >
            {lead}
          </p>
        )}
      </Reveal>
      {action && <Reveal delay={120} className="shrink-0">{action}</Reveal>}
    </div>
  );
}

export function TextLink({
  children,
  href,
  onClick,
  invert = false,
  className,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  invert?: boolean;
  className?: string;
}) {
  const classes = cn(
    "group inline-flex items-center gap-2 border-b pb-1 text-[0.8rem] font-semibold tracking-[0.04em] transition-colors",
    invert
      ? "border-white/25 text-[#f6f1e7] hover:border-accent hover:text-accent"
      : "border-line text-ink hover:border-accent hover:text-accent",
    className,
  );
  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
        <ArrowUpRight className="arrow-flip h-4 w-4" />
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
      <ArrowUpRight className="arrow-flip h-4 w-4" />
    </button>
  );
}

export function FieldError({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return <p className="mt-1.5 text-[0.72rem] font-medium text-[#c2543f]">{children}</p>;
}

export type NativeButtonProps = ComponentPropsWithoutRef<"button">;
