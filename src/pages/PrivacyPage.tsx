import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { useI18n } from "@/lib/i18n";
import { navigateTo } from "@/lib/router";
import { useSeo } from "@/lib/seo";
import { privacyPolicy } from "@/data/content";
import { site } from "@/lib/site";
import { Button, Container, Eyebrow, Logo, Reveal } from "@/components/ui";
import { ArrowLeft, ArrowUpRight, Mail, Shield } from "@/components/icons";

type PolicyLang = "ar" | "en";

export function PrivacyPage() {
  const { t, locale } = useI18n();
  const [policyLang, setPolicyLang] = useState<PolicyLang>(locale === "ar" ? "ar" : "en");
  const policy = privacyPolicy[policyLang];

  useSeo({
    title: `${t.seo.privacyTitle}`,
    description: t.seo.privacyDesc,
    lang: locale,
    path: "privacy.html",
  });

  useEffect(() => {
    setPolicyLang(locale === "ar" ? "ar" : "en");
  }, [locale]);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-surface py-12 sm:py-16">
        <div className="pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full border border-accent/15" />
        <div className="pointer-events-none absolute -end-10 -top-10 h-40 w-40 rounded-full border border-line" />
        <Container>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[0.66rem] font-medium text-muted">
            <button type="button" onClick={() => navigateTo("home")} className="transition-colors hover:text-accent">
              {t.nav.home}
            </button>
            <span className="text-line">/</span>
            <span className="text-ink">{t.privacy.title}</span>
          </nav>

          <div className="mt-7 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="anim-rise">
              <Eyebrow>{t.privacy.eyebrow}</Eyebrow>
              <h1 className="mt-4 text-[clamp(2.2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-ink">
                {t.privacy.title}
              </h1>
              <p className="mt-3 max-w-xl text-[0.9rem] leading-relaxed text-muted">{t.privacy.lead}</p>
              <p className="mt-4 text-[0.68rem] font-semibold tracking-wide text-muted/80">{t.privacy.updated}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div role="group" aria-label={t.common.language} className="flex items-center gap-1 rounded-full border border-line bg-base p-1">
                {(["ar", "en"] as PolicyLang[]).map((code) => (
                  <button
                    key={code}
                    type="button"
                    lang={code}
                    aria-pressed={policyLang === code}
                    onClick={() => setPolicyLang(code)}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 text-[0.7rem] font-bold transition-colors",
                      policyLang === code ? "bg-ink text-[var(--base)]" : "text-muted hover:text-ink",
                    )}
                  >
                    {code === "ar" ? "العربية" : "English"}
                  </button>
                ))}
              </div>
              <Button variant="outline" size="sm" icon={<ArrowLeft className="arrow-flip h-3.5 w-3.5" />} onClick={() => navigateTo("home")}>
                {t.privacy.back}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_290px] lg:gap-14">
            <article
              dir={policyLang === "ar" ? "rtl" : "ltr"}
              lang={policyLang}
              className="min-w-0 rounded-[26px] border border-line bg-surface p-6 sm:p-9"
            >
              <div className="flex items-start gap-3.5 rounded-2xl border border-accent/25 bg-accent/[0.05] p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Shield className="h-4 w-4" />
                </span>
                <p className="text-[0.82rem] leading-relaxed text-ink/80">{policy.intro}</p>
              </div>

              <div className="mt-8 space-y-8">
                {policy.sections.map((section, index) => (
                  <Reveal key={section.title} delay={Math.min(index * 40, 160)}>
                    <section id={`policy-${index + 1}`} className="scroll-mt-28">
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-[0.78rem] font-medium text-accent" dir="ltr">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h2 className="text-[1.02rem] font-semibold text-ink">{section.title}</h2>
                      </div>
                      <div className="mt-2 space-y-2.5 border-s border-line ps-4">
                        {section.body.map((paragraph) => (
                          <p key={paragraph.slice(0, 40)} className="text-[0.86rem] leading-[1.9] text-muted">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </section>
                  </Reveal>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-center gap-2 text-[0.76rem] text-muted">
                  <Mail className="h-4 w-4 text-accent" />
                  <a href={`mailto:${site.email}`} className="font-semibold text-ink transition-colors hover:text-accent">
                    {site.email}
                  </a>
                </p>
                <Button variant="outline" size="sm" withArrow onClick={() => navigateTo("home")}>
                  {t.privacy.back}
                </Button>
              </div>
            </article>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[22px] border border-line bg-surface p-5">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-muted">
                  {policyLang === "ar" ? "محتويات الصفحة" : "On this page"}
                </p>
                <ol className="mt-3 space-y-2">
                  {policy.sections.map((section, index) => (
                    <li key={section.title}>
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById(`policy-${index + 1}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
                        }
                        className="flex w-full items-start gap-2 text-start text-[0.76rem] leading-snug text-muted transition-colors hover:text-accent"
                      >
                        <span className="font-display text-[0.64rem] text-accent/70" dir="ltr">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {section.title}
                      </button>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-4 overflow-hidden rounded-[22px] bg-brand p-5 text-[#f6f1e7]">
                <Logo invert size="sm" />
                <p className="mt-3 text-[0.86rem] font-semibold leading-snug">{t.contact.title}</p>
                <p className="mt-1.5 text-[0.72rem] leading-relaxed text-[#f6f1e7]/50">{t.contact.info.response}</p>
                <button
                  type="button"
                  onClick={() => navigateTo("home", "contact")}
                  className="group mt-4 inline-flex items-center gap-1.5 text-[0.7rem] font-bold text-accent"
                >
                  {t.common.contactUs}
                  <ArrowUpRight className="arrow-flip h-3.5 w-3.5" />
                </button>
              </div>

              {locale === "fr" && (
                <p className="mt-4 text-[0.7rem] leading-relaxed text-muted">{t.privacy.note}</p>
              )}
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
