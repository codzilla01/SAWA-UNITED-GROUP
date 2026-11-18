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
    <div className="relative w-full">
      <div className="relative rounded-[24px] border border-white/15 bg-white/[0.045] p-3 shadow-[0_32px_70px_-30px_rgba(0,0,0,0.65)] backdrop-blur-md sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 px-1.5 pb-3 pt-0.5">
          <p className="inline-flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#f6f1e7]/60">
            <span className="relative flex h-1.5 w-1.5">
              <span className="anim-ping absolute inline-flex h-full w-full rounded-full bg-accent" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {t.hero.sectorsLabel}
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#f6f1e7] px-2.5 py-1 text-[0.6rem] font-bold text-[#082a23]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2f7a5e]" />
              {t.hero.marketsBadge}
            </span>
            <span className="hidden items-center gap-1 rounded-full border border-white/15 px-2.5 py-1 text-[0.58rem] font-semibold tracking-wide text-[#f6f1e7]/65 sm:inline-flex">
              <Spark className="h-3 w-3 text-accent" />
              {t.hero.projectsBadge}
            </span>
            <span className="hidden items-center gap-1 rounded-full border border-white/15 px-2.5 py-1 text-[0.58rem] font-semibold tracking-wide text-[#f6f1e7]/60 md:inline-flex">
              <Globe className="h-3 w-3" />
              04
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-3">
          {sectors.map((sector, index) => {
            const Icon = sectorIcon(sector.id);
            return (
              <button
                key={sector.id}
                type="button"
                onClick={() => openSector(sector.id)}
                className="group relative overflow-hidden rounded-[18px] border border-white/10 bg-[#0a2c25] p-4 text-start transition-all duration-500 hover:-translate-y-0.5 hover:border-accent/60"
              >
                <img
                  src={sector.image}
                  alt=""
                  loading={index > 1 ? "lazy" : "eager"}
                  className="absolute inset-0 h-full w-full object-cover opacity-25 transition-all duration-700 group-hover:scale-105 group-hover:opacity-40"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#061f19] via-[#082a23]/85 to-[#082a23]/25" />
                <span className="relative flex min-h-[136px] flex-col justify-between">
                  <span className="flex items-start justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-accent backdrop-blur-sm">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[#f6f1e7]/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-accent ltr:group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                  </span>
                  <span className="mt-5 block">
                    <span className="block text-[0.98rem] font-semibold leading-tight text-[#f6f1e7]">
                      {sector.name[locale]}
                    </span>
                    <span className="mt-1 block text-[0.66rem] leading-snug text-[#f6f1e7]/55">
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
    </div>
  );
}

export function Hero() {
  const { t, locale } = useI18n();

  return (
    <section className="hero-surface grain relative isolate overflow-hidden text-[#f6f1e7]">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-[26rem] end-[-16rem] h-[44rem] w-[44rem] rounded-full border border-white/[0.06]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-[18rem] end-[-10rem] h-[30rem] w-[30rem] rounded-full border border-accent/15"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute bottom-0 start-1/3 h-36 w-36 rounded-full bg-accent/10 blur-[80px]" aria-hidden="true" />

      <Container className="relative py-8 sm:py-10 lg:py-12">
        <h1 className="sr-only">
          {locale === "ar" ? "مجموعة سوا المتحدة — SAWA United Group" : "SAWA United Group"}
        </h1>

        <div className="anim-rise flex flex-wrap items-center justify-between gap-4" style={{ animationDelay: "40ms" }}>
          <p className="inline-flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#f6f1e7]/65">
            <span className="h-px w-8 bg-accent" />
            {t.hero.eyebrow}
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              size="md"
              variant="primary"
              withArrow
              onClick={() => navigateTo("home", "sectors")}
            >
              {t.hero.primaryCta}
            </Button>
            <Button
              size="md"
              variant="light"
              onClick={() => navigateTo("projects")}
              icon={<ArrowRight className="arrow-flip h-4 w-4" />}
            >
              {t.hero.secondaryCta}
            </Button>
          </div>
        </div>

        <div className="anim-rise mt-6" style={{ animationDelay: "120ms" }}>
          <SectorShowcase />
        </div>

        <dl className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-5">
          {[
            { value: "12+", label: t.stats.years },
            { value: "42", label: t.stats.projects },
            { value: "06", label: t.stats.markets },
          ].map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-[1.25rem] font-semibold tracking-tight text-[#f6f1e7]" dir="ltr">
                {stat.value}
              </dd>
              <span className="text-[0.68rem] tracking-wide text-[#f6f1e7]/50">{stat.label}</span>
            </div>
          ))}
          <span className="ms-auto text-[0.62rem] font-semibold tracking-[0.24em] text-[#f6f1e7]/35" dir="ltr">
            EST. 2014
          </span>
        </dl>
      </Container>

      <div className="relative border-y border-white/10 bg-[#051b16]/70 py-3.5">
        <div className="flex w-max anim-marquee items-center gap-10 whitespace-nowrap" aria-hidden="true">
          {[0, 1].map((cycle) => (
            <div key={cycle} className="flex items-center gap-10">
              {sectors.map((sector) => (
                <span key={`${cycle}-${sector.id}`} className="flex items-center gap-10">
                  <span className="flex items-center gap-2.5 text-[0.78rem] font-bold uppercase tracking-[0.2em] text-[#f6f1e7]/55">
                    <LogoMark className="h-4 w-auto shrink-0" />
                    {sector.company}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-accent/50" />
                </span>
              ))}
              <span className="flex items-center gap-10 text-[0.78rem] font-bold uppercase tracking-[0.2em] text-[#f6f1e7]/30">
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
