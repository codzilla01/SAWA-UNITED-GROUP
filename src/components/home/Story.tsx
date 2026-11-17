import { useI18n } from "@/lib/i18n";
import { navigateTo } from "@/lib/router";
import { SITE_IMAGES } from "@/lib/site";
import { numberOfStats } from "@/data/content";
import { Button, Container, Counter, Eyebrow, Reveal, SectionHeading, TextLink } from "@/components/ui";
import { ArrowUpRight, LogoMark, MapPin, Spark } from "@/components/icons";

export function Stats() {
  const { t, locale } = useI18n();

  const items = [
    { value: numberOfStats.years, suffix: "+", label: t.stats.years },
    { value: numberOfStats.projects, suffix: "+", label: t.stats.projects },
    { value: numberOfStats.markets, suffix: "", label: t.stats.markets },
    { value: numberOfStats.people, suffix: "+", label: t.stats.people },
  ];

  return (
    <section className="border-b border-line bg-surface" aria-label={locale === "ar" ? "المجموعة بالأرقام" : locale === "fr" ? "Le groupe en chiffres" : "The group in numbers"}>
      <Container>
        <div className="flex flex-col gap-2 border-b border-line py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-2.5 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-muted">
            <Spark className="h-3.5 w-3.5 text-accent" />
            {locale === "ar" ? "المجموعة بالأرقام" : locale === "fr" ? "Le groupe en chiffres" : "The group in numbers"}
          </p>
          <p className="inline-flex items-center gap-1.5 text-[0.64rem] font-medium tracking-wide text-muted">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            {t.footer.location} · {t.common.since} 2014
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <Reveal
              key={item.label}
              delay={index * 90}
              className={`px-1 py-8 sm:px-5 ${index !== 0 ? "border-s border-line" : ""} ${
                index === 2 ? "max-lg:border-t max-lg:border-s-0" : index === 3 ? "max-lg:border-t" : ""
              }`}
            >
              <p className="text-[0.58rem] font-bold uppercase tracking-[0.22em] text-muted/70" dir="ltr">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 flex items-start font-display text-[clamp(2.5rem,4.4vw,3.6rem)] font-light leading-none tracking-[-0.04em] text-ink">
                <Counter value={item.value} suffix={item.suffix} />
              </p>
              <p className="mt-2 text-[0.76rem] font-medium leading-relaxed text-muted sm:text-[0.82rem]">{item.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function About() {
  const { t, locale } = useI18n();

  return (
    <section id="group" className="relative overflow-hidden py-20 lg:py-28">
      <div className="pointer-events-none absolute -start-40 top-24 h-80 w-80 rounded-full bg-accent/[0.05] blur-[70px]" />
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -bottom-5 -start-5 h-full w-full rounded-[26px] border border-accent/35" aria-hidden="true" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] bg-surface-2">
                <img
                  src={SITE_IMAGES.about}
                  alt={t.about.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04130f]/85 via-[#04130f]/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <div>
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-accent">{t.about.imageCaption}</p>
                    <p className="mt-1 font-display text-[2.3rem] font-light leading-none text-[#f6f1e7]" dir="ltr">
                      2014
                    </p>
                  </div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[#f6f1e7] backdrop-blur-sm">
                    <LogoMark className="h-5 w-5" />
                  </span>
                </div>
              </div>
              <div className="absolute -top-4 -end-4 hidden items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 shadow-sm sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                <span className="text-[0.64rem] font-semibold tracking-wide text-ink">
                  {t.presence.note}
                </span>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7 lg:ps-4">
            <Reveal>
              <Eyebrow>{t.about.eyebrow}</Eyebrow>
              <h2 className="mt-5 text-[clamp(2rem,3.7vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-ink">
                {t.about.title1}{" "}
                <span className={locale === "ar" ? "text-accent" : "font-display font-light italic text-accent"}>
                  {t.about.titleAccent}
                </span>
              </h2>
            </Reveal>

            <Reveal delay={90}>
              <p className="mt-6 max-w-2xl text-[0.95rem] leading-[1.85] text-muted">{t.about.lead}</p>
              <p className="mt-3 max-w-2xl text-[0.95rem] leading-[1.85] text-muted">{t.about.lead2}</p>
            </Reveal>

            <Reveal delay={150} className="mt-9">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-muted">{t.about.operatingTitle}</p>
                <span className="text-[0.62rem] font-semibold tracking-[0.16em] text-accent" dir="ltr">
                  03
                </span>
              </div>
              <ol className="divide-y divide-line">
                {t.about.principles.map((principle, index) => (
                  <li key={principle.title} className="group flex gap-5 py-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line font-display text-[0.72rem] text-muted transition-colors duration-300 group-hover:border-accent group-hover:text-accent" dir="ltr">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-[0.9rem] font-semibold text-ink">{principle.title}</h3>
                      <p className="mt-1 text-[0.82rem] leading-relaxed text-muted">{principle.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button variant="dark" size="md" withArrow onClick={() => navigateTo("home", "journey")}>
                  {t.common.learnMore}
                </Button>
                <TextLink onClick={() => navigateTo("home", "presence")}>{t.nav.presence}</TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Journey() {
  const { t } = useI18n();

  return (
    <section id="journey" className="border-y border-line bg-surface-2/45 py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow={t.journey.eyebrow}
          title={t.journey.title}
          lead={t.journey.lead}
          action={
            <TextLink onClick={() => navigateTo("home", "presence")}>
              {t.nav.presence}
            </TextLink>
          }
        />

        <div className="mt-12 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-6">
          {t.journey.milestones.map((milestone, index) => (
            <Reveal key={milestone.year} delay={index * 70} className="relative">
              <div className="mb-5 flex items-center gap-3 lg:mb-6">
                <span className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
                  <span className={`absolute h-full w-full rounded-full ${index === t.journey.milestones.length - 1 ? "bg-accent" : "bg-ink/25"}`} />
                  {index === t.journey.milestones.length - 1 && <span className="absolute h-full w-full animate-ping rounded-full bg-accent/40" />}
                </span>
                <span className="h-px flex-1 bg-line" />
              </div>
              <p className="font-display text-[1.55rem] font-light leading-none tracking-tight text-accent" dir="ltr">
                {milestone.year}
              </p>
              <h3 className="mt-2.5 text-[0.88rem] font-semibold leading-snug text-ink">{milestone.title}</h3>
              <p className="mt-1.5 text-[0.78rem] leading-relaxed text-muted">{milestone.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-7 sm:flex-row sm:items-center">
          <p className="max-w-lg text-[0.86rem] leading-relaxed text-muted">
            {t.footer.tagline}
          </p>
          <a
            href="#presence"
            onClick={(event) => {
              event.preventDefault();
              navigateTo("home", "presence");
            }}
            className="group inline-flex items-center gap-2 text-[0.74rem] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:text-accent"
          >
            {t.presence.eyebrow}
            <ArrowUpRight className="arrow-flip h-4 w-4" />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
