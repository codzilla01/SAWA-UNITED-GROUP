import { useI18n } from "@/lib/i18n";
import { navigateTo } from "@/lib/router";
import { useSeo } from "@/lib/seo";
import { site } from "@/lib/site";
import { Button, Container, Eyebrow } from "@/components/ui";
import { ArrowUpRight, LogoMark, Mail } from "@/components/icons";

export function NotFoundPage() {
  const { t, locale } = useI18n();

  useSeo({
    title: `${t.seo.notFoundTitle}`,
    description: t.notFound.lead,
    lang: locale,
    path: "404.html",
    noIndex: true,
  });

  return (
    <section className="hero-surface grain relative isolate flex min-h-[calc(100vh-160px)] items-center overflow-hidden text-[#f6f1e7]">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -end-40 -top-40 h-[38rem] w-[38rem] rounded-full border border-white/[0.07]" />
      <div className="pointer-events-none absolute -end-16 -top-16 h-[22rem] w-[22rem] rounded-full border border-accent/20" />
      <Container className="relative py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="anim-rise">
            <Eyebrow invert>{t.notFound.eyebrow}</Eyebrow>
            <p
              className="mt-4 select-none font-display text-[clamp(6rem,16vw,12rem)] font-light leading-[0.8] tracking-[-0.06em] text-[#f6f1e7]/10"
              aria-hidden="true"
              dir="ltr"
            >
              404
            </p>
            <h1 className="-mt-5 text-[clamp(1.9rem,3.8vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
              {t.notFound.title}
            </h1>
            <p className="mt-4 max-w-md text-[0.92rem] leading-relaxed text-[#f6f1e7]/60">{t.notFound.lead}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button size="lg" variant="primary" withArrow onClick={() => navigateTo("home")}>
                {t.notFound.home}
              </Button>
              <Button size="lg" variant="light" onClick={() => navigateTo("projects")}>
                {t.notFound.projects}
              </Button>
            </div>

            <a
              href={`mailto:${site.email}`}
              className="mt-7 inline-flex items-center gap-2 border-b border-white/20 pb-1 text-[0.76rem] font-medium text-[#f6f1e7]/60 transition-colors hover:border-accent hover:text-accent"
            >
              <Mail className="h-4 w-4" />
              {t.notFound.help}
            </a>
          </div>

          <div className="relative mx-auto hidden w-full max-w-[420px] sm:block" aria-hidden="true">
            <div className="relative aspect-square rounded-full border border-white/10">
              <div className="absolute inset-10 rounded-full border border-dashed border-white/15" />
              <div className="absolute inset-24 rounded-full border border-accent/25" />
              <span className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] backdrop-blur-sm">
                <LogoMark className="h-12 w-auto" />
              </span>
              {[
                { top: "4%", left: "48%" },
                { top: "46%", left: "94%" },
                { top: "88%", left: "46%" },
                { top: "44%", left: "3%" },
              ].map((position, index) => (
                <span
                  key={index}
                  className="absolute flex h-3 w-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                  style={position}
                >
                  <span className={`absolute h-full w-full rounded-full ${index === 1 ? "bg-accent/50 anim-ping" : "bg-[#f6f1e7]/20"}`} />
                  <span className={`relative h-1.5 w-1.5 rounded-full ${index === 1 ? "bg-accent" : "bg-[#f6f1e7]/60"}`} />
                </span>
              ))}
            </div>
            <div className="absolute -bottom-4 start-6 rounded-2xl border border-white/15 bg-[#082a23]/95 px-4 py-3 shadow-xl backdrop-blur">
              <p className="text-[0.56rem] font-bold uppercase tracking-[0.2em] text-[#f6f1e7]/35">{t.footer.websites}</p>
              <button
                type="button"
                onClick={() => navigateTo("home")}
                className="mt-1 flex items-center gap-2 text-[0.76rem] font-semibold text-[#f6f1e7] hover:text-accent"
              >
                {t.nav.home}
                <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
