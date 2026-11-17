import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { useI18n, localeMeta, type Locale } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { navigateTo } from "@/lib/router";
import { site } from "@/lib/site";
import { Button, Container, Logo } from "./ui";
import { Close, Globe, Mail, MapPin, Menu, Moon, Phone, Sun } from "./icons";

const locales: Locale[] = ["ar", "en", "fr"];

export function LanguageSwitcher({ invert = false, className }: { invert?: boolean; className?: string }) {
  const { locale, setLocale, t } = useI18n();
  return (
    <div
      role="group"
      aria-label={t.common.languages}
      className={cn(
        "flex items-center gap-0.5 rounded-full border p-0.5",
        invert ? "border-white/20 bg-white/[0.04]" : "border-line bg-surface/60",
        className,
      )}
    >
      {locales.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={active}
            title={localeMeta[code].label}
            onClick={() => setLocale(code)}
            className={cn(
              "min-w-[30px] rounded-full px-1.5 py-1 text-[0.66rem] font-bold transition-all duration-300",
              active
                ? invert
                  ? "bg-[#f6f1e7] text-[#082a23]"
                  : "bg-ink text-[var(--base)]"
                : invert
                  ? "text-[#f6f1e7]/60 hover:text-[#f6f1e7]"
                  : "text-muted hover:text-ink",
            )}
          >
            {localeMeta[code].short}
          </button>
        );
      })}
    </div>
  );
}

export function ThemeToggle({ invert = false, className }: { invert?: boolean; className?: string }) {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useI18n();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t.common.lightMode : t.common.darkMode}
      title={isDark ? t.common.lightMode : t.common.darkMode}
      className={cn(
        "group flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300",
        invert
          ? "border-white/20 text-[#f6f1e7]/75 hover:border-accent hover:text-accent"
          : "border-line bg-surface/60 text-muted hover:border-accent hover:text-accent",
        className,
      )}
    >
      {isDark ? (
        <Sun className="h-[15px] w-[15px] transition-transform duration-500 group-hover:rotate-45" />
      ) : (
        <Moon className="h-[15px] w-[15px] transition-transform duration-500 group-hover:-rotate-12" />
      )}
    </button>
  );
}

type NavItem = { key: string; label: string; anchor?: string; route?: "projects" | "home" };

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const items: NavItem[] = [
    { key: "group", label: t.nav.group, anchor: "group" },
    { key: "sectors", label: t.nav.sectors, anchor: "sectors" },
    { key: "projects", label: t.nav.projects, route: "projects" },
    { key: "presence", label: t.nav.presence, anchor: "presence" },
    { key: "contact", label: t.nav.contact, anchor: "contact" },
  ];

  const go = (item: NavItem) => {
    setOpen(false);
    if (item.route === "projects") {
      navigateTo("projects");
      return;
    }
    navigateTo("home", item.anchor);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          const main = document.getElementById("main");
          main?.scrollIntoView({ behavior: "smooth", block: "start" });
          main?.focus({ preventScroll: true });
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2 focus:text-sm focus:font-bold focus:text-[#181310] focus:start-3"
      >
        {t.common.skip}
      </button>

      <div className="hidden bg-brand text-[#f6f1e7]/65 lg:block">
        <Container className="flex h-9 items-center justify-between text-[0.68rem] tracking-wide">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-accent" />
              {t.footer.location}
            </span>
            <span className="h-3 w-px bg-white/15" />
            <span className="inline-flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-accent" />
              {localeMeta.ar.label} · English · Français
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-accent">
              <Mail className="h-3.5 w-3.5" />
              {site.email}
            </a>
            <a href={`tel:${site.phoneHref}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-accent" dir="ltr">
              <Phone className="h-3.5 w-3.5" />
              {site.phoneDisplay}
            </a>
          </div>
        </Container>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-line bg-base/90 shadow-[0_12px_30px_-24px_rgba(8,42,35,0.55)] backdrop-blur-xl"
            : "border-transparent bg-base/80 backdrop-blur-md",
        )}
      >
        <Container className="flex h-[70px] items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              navigateTo("home");
            }}
            aria-label="SAWA United Group — home"
            className="shrink-0"
          >
            <Logo />
          </button>

          <nav aria-label={t.nav.menu} className="hidden items-center gap-8 lg:flex">
            {items.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => go(item)}
                className="nav-link text-[0.79rem] font-semibold text-ink/75 transition-colors hover:text-ink"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher className="hidden sm:flex" />
            <ThemeToggle />
            <Button
              size="sm"
              variant="primary"
              className="hidden md:inline-flex"
              onClick={() => {
                navigateTo("home", "contact");
              }}
              withArrow
            >
              {t.common.contactUs}
            </Button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.common.menuOpen}
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent lg:hidden"
            >
              <Menu className="h-4.5 w-4.5" />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-[70] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
        inert={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-[#03110d]/60 backdrop-blur-sm transition-opacity duration-400",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menu}
          className={cn(
            "absolute inset-y-0 end-0 flex w-full max-w-[430px] flex-col overflow-y-auto bg-brand px-6 pb-8 pt-5 text-[#f6f1e7] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            open ? "translate-x-0" : "translate-x-full rtl:-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between">
            <Logo invert />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.nav.close}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-[#f6f1e7]/80 transition-colors hover:border-accent hover:text-accent"
            >
              <Close className="h-4 w-4" />
            </button>
          </div>

          <nav className="mt-10 flex flex-col" aria-label={t.nav.menu}>
            {items.map((item, index) => (
              <button
                key={item.key}
                type="button"
                onClick={() => go(item)}
                className="group flex items-center justify-between border-b border-white/10 py-4 text-start transition-colors hover:text-accent"
              >
                <span className="text-[1.35rem] font-medium">{item.label}</span>
                <span className="text-[0.62rem] tracking-[0.2em] text-[#f6f1e7]/35" dir="ltr">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </nav>

          <div className="mt-7">
            <p className="text-[0.64rem] font-bold uppercase tracking-[0.24em] text-[#f6f1e7]/40">
              {t.common.contactUs}
            </p>
            <div className="mt-3 space-y-2.5 text-[0.85rem] text-[#f6f1e7]/75">
              <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 hover:text-accent">
                <Mail className="h-4 w-4 text-accent" />
                {site.email}
              </a>
              <a href={`tel:${site.phoneHref}`} className="flex items-center gap-2.5 hover:text-accent" dir="ltr">
                <Phone className="h-4 w-4 text-accent" />
                {site.phoneDisplay}
              </a>
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {site.address.ar}
              </p>
            </div>
          </div>

          <div className="mt-auto pt-8">
            <div className="flex items-center justify-between border-t border-white/10 pt-5">
              <span className="inline-flex items-center gap-2 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#f6f1e7]/40">
                <Globe className="h-3.5 w-3.5" />
                {t.common.languages}
              </span>
              <div className="flex items-center gap-2">
                <LanguageSwitcher invert />
                <ThemeToggle invert />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
