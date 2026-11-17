import { useState } from "react";
import { cn } from "@/utils/cn";
import { useI18n } from "@/lib/i18n";
import { navigateTo } from "@/lib/router";
import { markets, sectors, type Market } from "@/data/content";
import { site } from "@/lib/site";
import { Container, Eyebrow, Reveal } from "@/components/ui";
import { ArrowUpRight, Instagram, MapPin, sectorIcon } from "@/components/icons";
import landTopo from "world-atlas/land-110m.json";
import { feature } from "topojson-client";
import { geoGraticule10, geoInterpolate, geoNaturalEarth1, geoPath } from "d3-geo";

const topology = landTopo as unknown as {
  objects: { land: unknown };
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const landFeature = feature(topology as any, topology.objects.land as any) as any;
const projection = geoNaturalEarth1().fitExtent(
  [
    [18, 18],
    [782, 382],
  ],
  landFeature,
);
const pathGenerator = geoPath(projection);
const landPath = pathGenerator(landFeature) ?? "";
const graticulePath = pathGenerator(geoGraticule10()) ?? "";

// Small visual offsets keep neighbouring Gulf markers easy to click on the world map.
const markerOffsets: Record<string, { x: number; y: number }> = {
  cairo: { x: 0, y: 0 },
  riyadh: { x: -4, y: 8 },
  dubai: { x: 22, y: -20 },
  doha: { x: -6, y: 18 },
  istanbul: { x: 14, y: -10 },
  paris: { x: -12, y: -14 },
};

const HQ = markets[0];

function arcPath(from: Market, to: Market) {
  const interpolate = geoInterpolate([from.lon, from.lat], [to.lon, to.lat]);
  const points: string[] = [];
  for (let index = 0; index <= 40; index += 1) {
    const point = projection(interpolate(index / 40));
    if (point) points.push(`${index === 0 ? "M" : "L"}${point[0].toFixed(1)},${point[1].toFixed(1)}`);
  }
  return points.join(" ");
}

const arcs = markets.slice(1).map((market) => ({ id: market.id, path: arcPath(HQ, market) }));

const markers = markets.map((market) => {
  const point = projection([market.lon, market.lat]);
  const offset = markerOffsets[market.id] ?? { x: 0, y: 0 };
  return {
    market,
    x: ((point?.[0] ?? 400) / 800) * 100,
    y: ((point?.[1] ?? 200) / 400) * 100,
    offset,
  };
});

export function Presence() {
  const { t, locale, dir } = useI18n();
  const [activeId, setActiveId] = useState("cairo");
  const active = markets.find((market) => market.id === activeId) ?? markets[0];

  const roleLabels: Record<Market["role"], string> = {
    hq: t.presence.hqNote,
    regional: locale === "ar" ? "مكتب إقليمي" : locale === "fr" ? "Bureau régional" : "Regional office",
    operations:
      locale === "ar" ? "عمليات تشغيل" : locale === "fr" ? "Opérations" : "Operations",
    representative:
      locale === "ar" ? "مكتب تمثيلي" : locale === "fr" ? "Bureau de représentation" : "Representative office",
  };

  return (
    <section id="presence" className="relative overflow-hidden bg-brand py-20 text-[#f6f1e7] lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_60%_at_85%_0%,rgba(21,88,69,0.55),transparent_65%)]" />
      <div className="pointer-events-none absolute -end-32 bottom-[-10rem] h-[30rem] w-[30rem] rounded-full border border-white/[0.06]" />
      <Container className="relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <Eyebrow invert>{t.presence.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-[clamp(2rem,3.7vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
              {t.presence.title}
            </h2>
            <p className="mt-4 max-w-xl text-[0.94rem] leading-relaxed text-[#f6f1e7]/60">{t.presence.lead}</p>
          </Reveal>
          <Reveal delay={100} className="shrink-0">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="anim-ping absolute inline-flex h-full w-full rounded-full bg-accent" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-[0.68rem] font-semibold tracking-[0.08em] text-[#f6f1e7]/75">{t.presence.note}</span>
            </div>
          </Reveal>
        </div>

        <div className="mt-11 grid gap-6 lg:grid-cols-[1.45fr_0.75fr]">
          <Reveal>
            <div className="relative overflow-hidden rounded-[26px] border border-white/12 bg-[#051b16]/70 p-3 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] sm:p-5">
              <div className="flex items-center justify-between px-1 pb-2 sm:px-2">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-[#f6f1e7]/40">
                  {locale === "ar" ? "خريطة العمليات" : locale === "fr" ? "Carte des opérations" : "Operations map"}
                </p>
                <p className="text-[0.6rem] font-semibold tracking-[0.16em] text-accent" dir="ltr">
                  06 / {String(markets.length).padStart(2, "0")}
                </p>
              </div>

              <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl">
                <div className="map-grid pointer-events-none absolute inset-0 opacity-30" />
                <svg
                  viewBox="0 0 800 400"
                  role="img"
                  aria-label={t.presence.mapAlt}
                  className="absolute inset-0 h-full w-full"
                >
                  <path d={graticulePath} fill="none" stroke="#f6f1e7" strokeOpacity="0.055" strokeWidth="0.7" />
                  <path d={landPath} fill="#f6f1e7" fillOpacity="0.14" stroke="#f6f1e7" strokeOpacity="0.24" strokeWidth="0.8" />
                  {arcs.map((arc) => (
                    <path
                      key={arc.id}
                      d={arc.path}
                      fill="none"
                      stroke="#d8a06a"
                      strokeOpacity={activeId === arc.id ? 0.95 : 0.4}
                      strokeWidth={activeId === arc.id ? 1.5 : 1}
                      className="map-arc"
                    />
                  ))}
                </svg>

                {markers.map(({ market, x, y, offset }) => {
                  const isActive = market.id === activeId;
                  const showLabel = isActive || market.role === "hq";
                  return (
                    <button
                      key={market.id}
                      type="button"
                      onClick={() => setActiveId(market.id)}
                      onMouseEnter={() => setActiveId(market.id)}
                      aria-label={`${market.city[locale]} — ${roleLabels[market.role]}`}
                      aria-pressed={isActive}
                      className="group absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${x}%`, top: `${y}%` }}
                    >
                      <span
                        className="relative flex items-center justify-center"
                        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
                      >
                        {isActive && <span className="anim-ping absolute h-5 w-5 rounded-full bg-accent/40" />}
                        <span
                          className={cn(
                            "flex items-center justify-center rounded-full border transition-all duration-300",
                            isActive
                              ? "h-4 w-4 border-[#f6f1e7] bg-accent shadow-[0_0_0_4px_rgba(216,160,106,0.22)]"
                              : market.role === "hq"
                                ? "h-3 w-3 border-[#f6f1e7]/80 bg-[#f6f1e7]"
                                : "h-2.5 w-2.5 border-[#f6f1e7]/60 bg-[#0a2b24] group-hover:border-accent group-hover:bg-accent",
                          )}
                        >
                          <span className={cn("rounded-full", isActive ? "h-1 w-1 bg-[#181310]" : "hidden")} />
                        </span>
                      </span>
                      {showLabel && (
                        <span
                          className="pointer-events-none absolute start-1/2 top-0 z-10 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full border border-white/20 bg-[#082a23]/95 px-2.5 py-1 text-[0.58rem] font-semibold text-[#f6f1e7] shadow-lg backdrop-blur-sm rtl:translate-x-1/2"
                          style={{
                            transform: `translate(calc(${dir === "rtl" ? "50%" : "-50%"} + ${offset.x}px), calc(-100% + ${offset.y - 10}px))`,
                          }}
                        >
                          <MapPin className="h-2.5 w-2.5 text-accent" />
                          {market.city[locale]}
                          {market.role === "hq" && <span className="text-accent">· HQ</span>}
                        </span>
                      )}
                    </button>
                  );
                })}

                <div className="pointer-events-none absolute bottom-3 start-3 flex items-center gap-3 rounded-full border border-white/10 bg-[#051b16]/80 px-3 py-1.5 backdrop-blur-sm">
                  <span className="flex items-center gap-1.5 text-[0.55rem] font-semibold text-[#f6f1e7]/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {t.presence.hqNote}
                  </span>
                  <span className="h-2.5 w-px bg-white/15" />
                  <span className="flex items-center gap-1.5 text-[0.55rem] font-semibold text-[#f6f1e7]/60">
                    <span className="h-1.5 w-1.5 rounded-full border border-[#f6f1e7]/60" />
                    {roleLabels.operations}
                  </span>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 px-1 text-[0.58rem] text-[#f6f1e7]/35 sm:px-2">
                <span dir="ltr">EMEA · 30°N 31°E</span>
                <span>{locale === "ar" ? "اضغط على أي موقع لاستعراض تفاصيله" : locale === "fr" ? "Sélectionnez un marché pour ses détails" : "Select any market to explore it"}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-3">
            <div className="rounded-2xl border border-white/12 bg-white/[0.035] p-2">
              <ul className="divide-y divide-white/8">
                {markets.map((market, index) => {
                  const isActive = market.id === activeId;
                  return (
                    <li key={market.id}>
                      <button
                        type="button"
                        onClick={() => setActiveId(market.id)}
                        aria-pressed={isActive}
                        className={cn(
                          "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start transition-colors duration-300",
                          isActive ? "bg-white/[0.07]" : "hover:bg-white/[0.04]",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[0.56rem] font-bold transition-colors",
                            isActive ? "border-accent bg-accent text-[#181310]" : "border-white/15 text-[#f6f1e7]/45",
                          )}
                          dir="ltr"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-baseline gap-2">
                            <span className={cn("text-[0.86rem] font-semibold", isActive ? "text-[#f6f1e7]" : "text-[#f6f1e7]/80")}>
                              {market.city[locale]}
                            </span>
                            {market.role === "hq" && (
                              <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[0.48rem] font-bold tracking-[0.12em] text-accent">
                                HQ
                              </span>
                            )}
                          </span>
                          <span className="mt-0.5 block truncate text-[0.62rem] text-[#f6f1e7]/40">{roleLabels[market.role]}</span>
                        </span>
                        <ArrowUpRight
                          className={cn(
                            "arrow-flip h-3.5 w-3.5 transition-all duration-300",
                            isActive ? "text-accent" : "text-[#f6f1e7]/25 group-hover:text-accent",
                          )}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div key={active.id} className="anim-rise flex-1 rounded-2xl border border-accent/25 bg-accent/[0.07] p-5">
              <p className="text-[0.56rem] font-bold uppercase tracking-[0.22em] text-accent">{t.presence.selectedLabel}</p>
              <div className="mt-2.5 flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-[1.25rem] font-semibold text-[#f6f1e7]">{active.city[locale]}</h3>
                  <p className="mt-0.5 text-[0.7rem] text-[#f6f1e7]/50">{active.country[locale]}</p>
                </div>
                <span className="rounded-full border border-white/15 px-2.5 py-1 text-[0.56rem] font-semibold text-[#f6f1e7]/60">
                  {t.common.since} <span dir="ltr">{active.since}</span>
                </span>
              </div>
              <p className="mt-3 inline-flex items-center gap-1.5 text-[0.64rem] font-medium text-[#f6f1e7]/60">
                <MapPin className="h-3 w-3 text-accent" />
                {roleLabels[active.role]}
              </p>
              <p className="mt-4 text-[0.56rem] font-bold uppercase tracking-[0.2em] text-[#f6f1e7]/35">{t.presence.focus}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {active.focus.map((focusId) => {
                  const sector = sectors.find((item) => item.id === focusId);
                  if (!sector) return null;
                  const Icon = sectorIcon(sector.id);
                  return (
                    <span
                      key={focusId}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-2.5 py-1 text-[0.62rem] text-[#f6f1e7]/75"
                    >
                      <Icon className="h-3 w-3 text-accent" />
                      {sector.name[locale]}
                    </span>
                  );
                })}
              </div>
              {active.id === "cairo" && (() => {
                const egyptSocial = site.socials.find((item) => item.id === "instagram");
                if (!egyptSocial) return null;
                return (
                  <a
                    href={egyptSocial.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-3.5 flex items-center justify-between rounded-xl border border-accent/35 bg-accent/12 px-3 py-2 text-[0.66rem] text-[#f6f1e7] transition-colors hover:border-accent hover:bg-accent hover:text-[#181310]"
                  >
                    <span className="inline-flex items-center gap-2 font-semibold">
                      <Instagram className="h-3.5 w-3.5 shrink-0" />
                      <span>{t.social.egyptBadge}</span>
                    </span>
                    <span dir="ltr" className="inline-flex items-center gap-1 font-bold opacity-80">
                      {egyptSocial.handle}
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </a>
                );
              })()}
              <button
                type="button"
                onClick={() => navigateTo("home", "contact")}
                className="group mt-4 flex w-full items-center justify-between border-t border-white/15 pt-3 text-[0.64rem] font-bold tracking-[0.1em] text-accent"
              >
                {t.common.contactUs}
                <ArrowUpRight className="arrow-flip h-3.5 w-3.5" />
              </button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
