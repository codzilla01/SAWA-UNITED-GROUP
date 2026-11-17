import { useI18n } from "@/lib/i18n";
import { navigateTo, navigateToProjects } from "@/lib/router";
import { site, whatsappLink } from "@/lib/site";
import { sectors } from "@/data/content";
import { Button, Container, Logo, SocialLinks } from "./ui";
import { ArrowUpRight, Mail, MapPin, Phone, WhatsApp } from "./icons";
import { LanguageSwitcher, ThemeToggle } from "./Header";

export function Footer() {
  const { t, locale } = useI18n();

  const groupLinks = [
    { label: t.nav.group, anchor: "group" },
    { label: t.journey.eyebrow, anchor: "journey" },
    { label: t.nav.sectors, anchor: "sectors" },
    { label: t.nav.presence, anchor: "presence" },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#061f19] text-[#f6f1e7]">
      <div className="pointer-events-none absolute -top-32 end-[-80px] h-[420px] w-[420px] rounded-full border border-white/[0.06]" />
      <div className="pointer-events-none absolute -top-10 end-[40px] h-[220px] w-[220px] rounded-full border border-accent/20" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_0%,rgba(21,88,69,0.55),transparent_60%)]" />

      <Container className="relative">
        <div className="flex flex-col gap-8 border-b border-white/10 py-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.26em] text-accent">{t.common.startConversation}</p>
            <h2 className="mt-3 text-[clamp(1.7rem,3vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.02em]">
              {locale === "ar" ? "لديك فرصة؟ لنبنِها معًا." : locale === "fr" ? "Une opportunité ? Bâtissons-la ensemble." : "Have an opportunity? Let's build it together."}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              withArrow
              onClick={() => navigateTo("home", "contact")}
            >
              {t.common.contactUs}
            </Button>
            <Button
              href={whatsappLink()}
              target="_blank"
              variant="light"
              size="lg"
              icon={<WhatsApp className="h-4 w-4" />}
            >
              {t.common.whatsapp}
            </Button>
          </div>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.8fr_1fr]">
          <div>
            <Logo invert />
            <p className="mt-5 max-w-xs text-[0.86rem] leading-relaxed text-[#f6f1e7]/55">{t.footer.tagline}</p>
            <p className="mt-5 font-display text-[1.05rem] italic text-accent" dir="ltr">
              {t.footer.taglineShort}
            </p>
            <SocialLinks invert className="mt-6" />
          </div>

          <nav aria-label={t.footer.group}>
            <h3 className="text-[0.64rem] font-bold uppercase tracking-[0.24em] text-[#f6f1e7]/40">{t.footer.group}</h3>
            <ul className="mt-4 space-y-2.5">
              {groupLinks.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => navigateTo("home", link.anchor)}
                    className="text-[0.84rem] text-[#f6f1e7]/70 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("privacy")}
                  className="text-[0.84rem] text-[#f6f1e7]/70 transition-colors hover:text-accent"
                >
                  {t.footer.privacy}
                </button>
              </li>
            </ul>
          </nav>

          <nav aria-label={t.footer.sectors}>
            <h3 className="text-[0.64rem] font-bold uppercase tracking-[0.24em] text-[#f6f1e7]/40">{t.footer.sectors}</h3>
            <ul className="mt-4 space-y-2.5">
              {sectors.map((sector) => (
                <li key={sector.id}>
                  <button
                    type="button"
                    onClick={() => navigateToProjects(sector.id)}
                    className="group inline-flex items-center gap-1.5 text-[0.84rem] text-[#f6f1e7]/70 transition-colors hover:text-accent"
                  >
                    {sector.name[locale]}
                    <ArrowUpRight className="arrow-flip h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[0.64rem] font-bold uppercase tracking-[0.24em] text-[#f6f1e7]/40">{t.footer.reach}</h3>
            <ul className="mt-4 space-y-3.5 text-[0.84rem]">
              <li>
                <a href={`mailto:${site.email}`} className="group flex items-start gap-2.5 text-[#f6f1e7]/70 transition-colors hover:text-accent">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{site.email}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${site.phoneHref}`} dir="ltr" className="group flex items-start gap-2.5 text-[#f6f1e7]/70 transition-colors hover:text-accent">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{site.phoneDisplay}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[#f6f1e7]/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="leading-relaxed">{site.address[locale]}</span>
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-[0.74rem] font-semibold text-[#f6f1e7]/80 transition-colors hover:border-accent hover:text-accent"
                >
                  <WhatsApp className="h-3.5 w-3.5" />
                  {t.contact.info.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-[0.72rem] text-[#f6f1e7]/45 md:flex-row md:items-center md:justify-between">
          <p>{t.footer.copyright}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <button type="button" onClick={() => navigateTo("privacy")} className="transition-colors hover:text-accent">
              {t.footer.privacy}
            </button>
            <a href="/sitemap.xml" className="transition-colors hover:text-accent">
              {t.footer.sitemap}
            </a>
            <span className="hidden h-3 w-px bg-white/15 sm:block" />
            <LanguageSwitcher invert />
            <ThemeToggle invert />
          </div>
        </div>
      </Container>

      <div className="relative select-none overflow-hidden" aria-hidden="true">
        <p
          className="mx-auto -mb-[1.2vw] whitespace-nowrap text-center font-extrabold leading-[0.8] tracking-[-0.055em] text-[#f6f1e7]/[0.055]"
          style={{ fontSize: "clamp(3.5rem, 16.5vw, 15rem)" }}
          dir="ltr"
        >
          SAWA UNITED
        </p>
        <div className="h-6 bg-gradient-to-t from-[#061f19] to-transparent" />
      </div>
    </footer>
  );
}
