import { useI18n } from "@/lib/i18n";
import { navigateTo } from "@/lib/router";
import { emitSawaEvent, SAWA_EVENTS } from "@/lib/events";
import { sectors } from "@/data/content";
import { Button, Container } from "@/components/ui";
import { ArrowRight, ArrowUpRight, Globe, LogoMark, Spark, sectorIcon } from "@/components/icons";

function SectorShowcase() {
  const { t, locale } = useI18n();

  const openSector = (id: string) => {
    emitSawaEvent(SAWA_EVENTS.selectSector, id);
    navigateTo("home", "sectors");
  };

  return (
    <div className="relative mx-auto w-full max-w-[540px] lg:me-0">
      <div className="pointer-events-none absolute -inset-7 rounded-[38px] border border-white/[0.07]" />
      <div className="pointer-events-none absolute -inset-14 rounded-[52px] border border-white/[0.04]" />

      <div className="relative rounded-[26px] border border-white/15 bg-white/[0.045] p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.65)] backdrop-blur-md">
        <div className="flex items-center justify-between px-2 pb-3 pt-1">
          <p className="inline-flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#f6f1e7]/55">
            <span className="relative flex h-1.5 w-1.5">
              <span className="anim-ping absolute inline-flex h-full w-full rounded-full bg-accent" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {t.hero.sectorsLabel}
          </p>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/15 px-2.5 py-1 text-[0.58rem] font-semibold tracking-wide text-[#f6f1e7]/60">
            <Globe className="h-3 w-3" />
            03
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {sectors.map((sector, index) => {
            const Icon = sectorIcon(sector.id);
            return (
              <button
                key={sector.id}
                type="button"
                onClick={() => openSector(sector.id)}
                className={`group relative overflow-hidden rounded-[18px] border border-white/10 bg-[#0a2c25] p-4 text-start transition-colors duration-500 hover:border-accent/60 ${
                  index % 2 === 0 ? "anim-float" : "anim-float-alt"
                }`}
                style={{ animationDelay: `${index * 0.7}s` }}
              >
                <img
                  src={sector.image}
                  alt=""
                  loading={index > 1 ? "lazy" : "eager"}
                  className="absolute inset-0 h-full w-full object-cover opacity-25 transition-all duration-700 group-hover:scale-105 group-hover:opacity-40"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#061f19] via-[#082a23]/85 to-[#082a23]/25" />
                <span className="relative flex min-h-[132px] flex-col justify-between">
                  <span className="flex items-start justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-accent backdrop-blur-sm">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[#f6f1e7]/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-accent ltr:group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                  </span>
                  <span className="mt-6 block">
                    <span className="block text-[0.98rem] font-semibold leading-tight text-[#f6f1e7]">
                      {sector.name[locale]}
                    </span>
                    <span className="mt-1 block text-[0.66rem] leading-snug text-[#f6f1e7]/50">
                      {sector.tagline[locale]}
                    </span>
                    <span className="mt-2.5 flex items-center gap-1 text-[0.6rem] font-bold tracking-[0.1em] text-accent/90">
                      {sector.company}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="absolute -bottom-7 start-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/15 bg-[#0b2f27]/95 px-4 py-2.5 shadow-xl backdrop-blur-md rtl:translate-x-1/2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-[#181310]">
          <Spark className="h-4 w-4" />
        </span>
        <span>
          <span className="block text-[0.56rem] font-bold uppercase tracking-[0.18em] text-[#f6f1e7]/45">
            {t.sectorSection.eyebrow}
          </span>
          <span className="block text-[0.82rem] font-semibold text-[#f6f1e7]">{t.hero.projectsBadge}</span>
        </span>
      </div>

      <div className="absolute -top-4 end-3 z-10 hidden items-center gap-1.5 rounded-full border border-white/15 bg-[#f6f1e7] px-3 py-1.5 text-[0.62rem] font-bold text-[#082a23] shadow-lg sm:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-[#2f7a5e]" />
        {t.hero.marketsBadge}
      </div>
    </div>
  );
}

export function Hero() {
  const { t, locale } = useI18n();

  return (
    <section className="hero-surface grain relative isolate overflow-hidden text-[#f6f1e7]">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-[26rem] end-[-16rem] h-[52rem] w-[52rem] rounded-full border border-white/[0.06]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-[18rem] end-[-10rem] h-[36rem] w-[36rem] rounded-full border border-accent/15"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute bottom-0 start-1/3 h-40 w-40 rounded-full bg-accent/10 blur-[80px]" aria-hidden="true" />

      <Container className="relative pb-14 pt-14 sm:pt-16 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
          <div className="anim-rise max-w-2xl" style={{ animationDelay: "40ms" }}>
            <p className="inline-flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-[#f6f1e7]/55">
              <span className="h-px w-8 bg-accent" />
              {t.hero.eyebrow}
            </p>

            <h1 className="mt-6">
              <span className="block text-[clamp(2.7rem,6vw,4.9rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
                {t.hero.title1}
              </span>
              <span
                className={`mt-2 block text-[clamp(2.7rem,6vw,4.9rem)] leading-[1.02] tracking-[-0.035em] text-accent ${
                  locale === "ar" ? "font-semibold" : "font-display font-light italic"
                }`}
              >
                {t.hero.titleAccent}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-[0.95rem] leading-[1.8] text-[#f6f1e7]/62">
              {t.hero.lead}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                variant="primary"
                withArrow
                onClick={() => navigateTo("home", "sectors")}
              >
                {t.hero.primaryCta}
              </Button>
              <Button
                size="lg"
                variant="light"
                onClick={() => navigateTo("projects")}
                icon={<ArrowRight className="arrow-flip h-4 w-4" />}
              >
                {t.hero.secondaryCta}
              </Button>
            </div>

            <dl className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-6">
              {[
                { value: "18+", label: t.stats.years },
                { value: "42", label: t.stats.projects },
                { value: "06", label: t.stats.markets },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-[1.45rem] font-semibold tracking-tight text-[#f6f1e7]" dir="ltr">
                    {stat.value}
                  </dd>
                  <span className="mt-0.5 text-[0.68rem] tracking-wide text-[#f6f1e7]/45">{stat.label}</span>
                </div>
              ))}
              <span className="ms-auto hidden text-[0.62rem] font-semibold tracking-[0.24em] text-[#f6f1e7]/30 xl:block" dir="ltr">
                EST. 2007
              </span>
            </dl>
          </div>

          <div className="anim-rise pb-6" style={{ animationDelay: "180ms" }}>
            <SectorShowcase />
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-white/10 pt-5 lg:mt-20">
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#f6f1e7]/35">
            {t.hero.trustLine}
          </span>
          <span className="hidden items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#f6f1e7]/35 sm:flex">
            {t.hero.scroll}
            <span className="inline-block h-6 w-px bg-gradient-to-b from-accent to-transparent" />
          </span>
        </div>
      </Container>

      <div className="relative border-y border-white/10 bg-[#051b16]/70 py-4">
        <div className="flex w-max anim-marquee items-center gap-10 whitespace-nowrap" aria-hidden="true">
          {[0, 1].map((cycle) => (
            <div key={cycle} className="flex items-center gap-10">
              {sectors.map((sector) => (
                <span key={`${cycle}-${sector.id}`} className="flex items-center gap-10">
                  <span className="flex items-center gap-2.5 text-[0.8rem] font-bold uppercase tracking-[0.2em] text-[#f6f1e7]/55">
                    <LogoMark className="h-3 w-3 text-accent" />
                    {sector.company}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-accent/50" />
                </span>
              ))}
              <span className="flex items-center gap-10 text-[0.8rem] font-bold uppercase tracking-[0.2em] text-[#f6f1e7]/30">
                {t.hero.trustLine}
                <span className="h-1 w-1 rounded-full bg-accent/50" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
