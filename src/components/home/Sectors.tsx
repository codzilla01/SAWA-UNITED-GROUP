import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { useI18n } from "@/lib/i18n";
import { navigateToProjects } from "@/lib/router";
import { SAWA_EVENTS } from "@/lib/events";
import { sectors, type SectorId } from "@/data/content";
import { Container, Eyebrow, Reveal } from "@/components/ui";
import { ArrowUpRight, sectorIcon } from "@/components/icons";

export function Sectors() {
  const { t, locale } = useI18n();
  const [activeId, setActiveId] = useState<SectorId>("automotive");

  useEffect(() => {
    const onSelect = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (sectors.some((sector) => sector.id === detail)) {
        setActiveId(detail as SectorId);
      }
    };
    window.addEventListener(SAWA_EVENTS.selectSector, onSelect);
    return () => window.removeEventListener(SAWA_EVENTS.selectSector, onSelect);
  }, []);

  const active = sectors.find((sector) => sector.id === activeId) ?? sectors[0];
  const ActiveIcon = sectorIcon(active.id);

  return (
    <section id="sectors" className="relative overflow-hidden border-y border-line bg-surface py-20 lg:py-24">
      <div className="pointer-events-none absolute -end-24 top-0 h-96 w-96 rounded-full bg-accent/[0.045] blur-[80px]" />
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <Eyebrow>{t.sectorSection.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-[clamp(2rem,3.7vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-ink">
              {t.sectorSection.title}
            </h2>
            <p className="mt-4 max-w-xl text-[0.94rem] leading-relaxed text-muted">{t.sectorSection.lead}</p>
          </Reveal>
          <Reveal delay={100} className="hidden shrink-0 items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-muted md:flex">
            <span className="h-1 w-1 rounded-full bg-accent" />
            {t.sectorSection.selectLabel}
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
          <Reveal className="order-2 lg:order-1">
            <div
              role="tablist"
              aria-label={t.sectorSection.selectLabel}
              aria-orientation="vertical"
              className="no-scrollbar -mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 lg:flex lg:flex-col lg:gap-2 lg:overflow-visible"
            >
              {sectors.map((sector, index) => {
                const Icon = sectorIcon(sector.id);
                const isActive = sector.id === activeId;
                return (
                  <button
                    key={sector.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="sector-panel"
                    id={`sector-tab-${sector.id}`}
                    onClick={() => setActiveId(sector.id)}
                    className={cn(
                      "group relative flex min-w-[230px] snap-start items-start gap-4 overflow-hidden rounded-2xl border p-4 text-start transition-all duration-400 lg:min-w-0 lg:p-5",
                      isActive
                        ? "border-accent/50 bg-base shadow-[0_16px_40px_-30px_rgba(8,42,35,0.6)]"
                        : "border-line bg-transparent hover:border-ink/20 hover:bg-base/50",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300",
                        isActive
                          ? "border-accent bg-accent text-[#181310]"
                          : "border-line bg-surface text-muted group-hover:text-accent",
                      )}
                    >
                      <Icon className="h-[19px] w-[19px]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-[0.98rem] font-semibold text-ink">{sector.name[locale]}</span>
                        <span className="text-[0.58rem] font-bold tracking-[0.16em] text-muted/60" dir="ltr">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-[0.7rem] text-muted">{sector.tagline[locale]}</span>
                      <span className={cn("mt-2 hidden items-center gap-1 text-[0.62rem] font-bold tracking-[0.12em] lg:flex", isActive ? "text-accent" : "text-muted/50")}>
                        {sector.company}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "absolute inset-y-0 start-0 w-[3px] rounded-full bg-accent transition-opacity duration-300",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-5 hidden items-center gap-3 rounded-2xl border border-dashed border-line px-5 py-4 lg:flex">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
                <ActiveIcon className="h-4 w-4" />
              </span>
              <p className="text-[0.78rem] leading-relaxed text-muted">
                {t.sectorSection.metricLabel}: <span className="font-semibold text-ink">{active.metric[locale]}</span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} className="order-1 lg:order-2">
            <div
              id="sector-panel"
              role="tabpanel"
              aria-labelledby={`sector-tab-${active.id}`}
              className="relative aspect-[16/13] min-h-[400px] overflow-hidden rounded-[26px] bg-[#082a23] sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[560px]"
            >
              {sectors.map((sector) => (
                <img
                  key={sector.id}
                  src={sector.image}
                  alt={sector.name[locale]}
                  loading="lazy"
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                    sector.id === active.id ? "scale-100 opacity-100" : "scale-105 opacity-0",
                  )}
                />
              ))}
              <span className="absolute inset-0 bg-gradient-to-t from-[#04130f] via-[#04130f]/55 to-[#04130f]/10" />
              <span className="absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#061f19]/50 px-3 py-1.5 text-[0.64rem] font-semibold tracking-[0.08em] text-[#f6f1e7] backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {active.company}
                </span>
                <span className="font-display text-[0.9rem] tracking-[0.16em] text-[#f6f1e7]/60" dir="ltr">
                  {String(sectors.findIndex((item) => item.id === active.id) + 1).padStart(2, "0")} / 04
                </span>
              </span>

              <div key={active.id} className="anim-rise absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <div className="flex items-end justify-between gap-4">
                  <h3 className="text-[clamp(1.55rem,2.8vw,2.35rem)] font-semibold leading-tight text-[#f6f1e7]">
                    {active.name[locale]}
                  </h3>
                  <button
                    type="button"
                    onClick={() => navigateToProjects(active.id)}
                    aria-label={t.sectorSection.discover}
                    className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-[#181310] transition-transform duration-300 hover:scale-105"
                  >
                    <ArrowUpRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                  </button>
                </div>
                <p className="mt-2.5 max-w-xl text-[0.86rem] leading-relaxed text-[#f6f1e7]/65">
                  {active.description[locale]}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {active.capabilities[locale].map((capability) => (
                    <span
                      key={capability}
                      className="rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-[0.66rem] font-medium text-[#f6f1e7]/80 backdrop-blur-sm"
                    >
                      {capability}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-3">
                  <button
                    type="button"
                    onClick={() => navigateToProjects(active.id)}
                    className="inline-flex items-center gap-1.5 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-accent transition-opacity hover:opacity-80"
                  >
                    {t.sectorSection.discover}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-[0.68rem] font-medium text-[#f6f1e7]/55">
                    {t.sectorSection.metricLabel}: <span className="text-[#f6f1e7]">{active.metric[locale]}</span>
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
