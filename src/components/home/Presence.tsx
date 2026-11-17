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

// Subtle visual offsets keep neighbouring markers crisp and easy to click on the world map.
const markerOffsets: Record<string, { x: number; y: number }> = {
  cairo: { x: -4, y: 2 },
  turkey: { x: 10, y: -6 },
  morocco: { x: -8, y: 2 },
  uae: { x: 16, y: -4 },
  hungary: { x: -8, y: -12 },
  saudi: { x: 2, y: 12 },
};

const HQ = markets[0];
const hqSvgPoint = projection([HQ.lon, HQ.lat]) ?? [400, 200];

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
  const isActiveHq = active.role === "hq";

  const roleLabels: Record<Market["role"], string> = {
    hq: t.presence.hqNote,
    regional: locale === "ar" ? "سوق إقليمي" : locale === "fr" ? "Marché régional" : "Regional market",
    operations:
      locale === "ar" ? "عمليات تشغيلية" : locale === "fr" ? "Opérations" : "Active operations",
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
            <div className="inline-flex items-center gap-3 rounded-full border border-[#2dd4bf]/30 bg-[#2dd4bf]/[0.07] px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="anim-ping absolute inline-flex h-full w-full rounded-full bg-[#2dd4bf]" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2dd4bf]" />
              </span>
              <span className="text-[0.68rem] font-semibold tracking-[0.06em] text-[#f6f1e7]/85">{t.presence.note}</span>
            </div>
          </Reveal>
        </div>

        <div className="mt-11 grid gap-6 lg:grid-cols-[1.45fr_0.75fr]">
          <Reveal>
            <div className="relative overflow-hidden rounded-[26px] border border-white/12 bg-[#051b16]/70 p-3 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] sm:p-5">
              <div className="flex items-center justify-between px-1 pb-2 sm:px-2">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-[#f6f1e7]/40">
                  {locale === "ar" ? "خريطة الأسواق والمركز الرئيسي" : locale === "fr" ? "Carte du siège & des marchés" : "Headquarters & markets map"}
                </p>
                <p className="text-[0.6rem] font-semibold tracking-[0.16em] text-accent" dir="ltr">
                  {String(markets.findIndex((item) => item.id === active.id) + 1).padStart(2, "0")} / {String(markets.length).padStart(2, "0")}
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
                  {/* Distinct concentric beacon ring highlighting Cairo Main HQ */}
                  <circle
                    cx={hqSvgPoint[0]}
                    cy={hqSvgPoint[1]}
                    r="18"
                    fill="#2dd4bf"
                    fillOpacity="0.09"
                    stroke="#2dd4bf"
                    strokeOpacity="0.42"
                    strokeWidth="0.9"
                    strokeDasharray="3 4"
                  />
                  {arcs.map((arc) => {
                    const highlighted = activeId === arc.id || isActiveHq;
                    return (
                      <path
                        key={arc.id}
                        d={arc.path}
                        fill="none"
                        stroke={activeId === arc.id ? "#d8a06a" : isActiveHq ? "#2dd4bf" : "#d8a06a"}
                        strokeOpacity={activeId === arc.id ? 0.95 : highlighted ? 0.55 : 0.35}
                        strokeWidth={activeId === arc.id ? 1.6 : 1.05}
                        className="map-arc"
                      />
                    );
                  })}
                </svg>

                {markers.map(({ market, x, y, offset }) => {
                  const isActive = market.id === activeId;
                  const isHq = market.role === "hq";
                  const showLabel = isActive || isHq;

                  return (
                    <button
                      key={market.id}
                      type="button"
                      onClick={() => setActiveId(market.id)}
                      onMouseEnter={() => setActiveId(market.id)}
                      aria-label={`${market.city[locale]} — ${roleLabels[market.role]}`}
                      aria-pressed={isActive}
                      className={cn(
                        "group absolute -translate-x-1/2 -translate-y-1/2",
                        isActive ? "z-30" : isHq ? "z-20" : "z-10",
                      )}
                      style={{ left: `${x}%`, top: `${y}%` }}
                    >
                      <span
                        className="relative flex items-center justify-center"
                        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
                      >
                        {isHq ? (
                          <>
                            <span className="anim-ping absolute h-6 w-6 rounded-full bg-[#2dd4bf]/45" />
                            <span
                              className={cn(
                                "flex items-center justify-center rounded-full border-2 border-[#f6f1e7] bg-[#2dd4bf] transition-all duration-300",
                                isActive
                                  ? "h-4.5 w-4.5 shadow-[0_0_0_5px_rgba(45,212,191,0.32),0_0_18px_rgba(45,212,191,0.65)]"
                                  : "h-4 w-4 shadow-[0_0_0_4px_rgba(45,212,191,0.22)]",
                              )}
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-[#04241e]" />
                            </span>
                          </>
                        ) : (
                          <>
                            {isActive && <span className="anim-ping absolute h-5 w-5 rounded-full bg-accent/45" />}
                            <span
                              className={cn(
                                "flex items-center justify-center rounded-full border transition-all duration-300",
                                isActive
                                  ? "h-4 w-4 border-[#f6f1e7] bg-[#d8a06a] shadow-[0_0_0_4px_rgba(216,160,106,0.26)]"
                                  : "h-3 w-3 border-[#d8a06a]/85 bg-[#d8a06a]/75 group-hover:scale-110 group-hover:border-[#f6f1e7] group-hover:bg-[#d8a06a]",
                              )}
                            >
                              <span className={cn("rounded-full", isActive ? "h-1 w-1 bg-[#181310]" : "hidden")} />
                            </span>
                          </>
                        )}
                      </span>

                      {showLabel && (
                        <span
                          className={cn(
                            "pointer-events-none absolute start-1/2 top-0 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-1 text-[0.58rem] font-semibold shadow-lg backdrop-blur-sm rtl:translate-x-1/2",
                            isHq
                              ? "border-[#2dd4bf]/65 bg-[#052924]/95 text-[#f6f1e7]"
                              : "border-[#d8a06a]/45 bg-[#082a23]/95 text-[#f6f1e7]",
                          )}
                          style={{
                            transform: `translate(calc(${dir === "rtl" ? "50%" : "-50%"} + ${offset.x}px), ${
                              isHq ? `calc(100% + ${offset.y + 4}px)` : `calc(-100% + ${offset.y - 10}px)`
                            })`,
                          }}
                        >
                          <MapPin className={cn("h-2.5 w-2.5", isHq ? "text-[#2dd4bf]" : "text-[#d8a06a]")} />
                          {market.city[locale]}
                          {isHq && <span className="font-bold text-[#5eead4]">· HQ</span>}
                        </span>
                      )}
                    </button>
                  );
                })}

                <div className="pointer-events-none absolute bottom-3 start-3 flex flex-wrap items-center gap-3 rounded-full border border-white/12 bg-[#051b16]/85 px-3 py-1.5 backdrop-blur-sm">
                  <span className="flex items-center gap-1.5 text-[0.56rem] font-semibold text-[#99f6e4]">
                    <span className="h-2 w-2 rounded-full bg-[#2dd4bf] shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                    {HQ.city[locale]} · {t.presence.hqNote}
                  </span>
                  <span className="h-2.5 w-px bg-white/15" />
                  <span className="flex items-center gap-1.5 text-[0.56rem] font-semibold text-[#f6f1e7]/70">
                    <span className="h-2 w-2 rounded-full bg-[#d8a06a]" />
                    {locale === "ar" ? "الأسواق الخمسة" : locale === "fr" ? "5 marchés actifs" : "5 active markets"}
                  </span>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 px-1 text-[0.58rem] text-[#f6f1e7]/35 sm:px-2">
                <span dir="ltr">CAIRO HQ · 30°N 31°E</span>
                <span>
                  {locale === "ar"
                    ? "اضغط على أي دولة لاستعراض أنشطة المجموعة فيها"
                    : locale === "fr"
                      ? "Sélectionnez un marché pour voir ses activités"
                      : "Select any market to view its activities"}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-3">
            <div className="rounded-2xl border border-white/12 bg-white/[0.035] p-2">
              <ul className="divide-y divide-white/8">
                {markets.map((market, index) => {
                  const isActive = market.id === activeId;
                  const isHq = market.role === "hq";

                  return (
                    <li key={market.id}>
                      <button
                        type="button"
                        onClick={() => setActiveId(market.id)}
                        aria-pressed={isActive}
                        className={cn(
                          "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start transition-all duration-300",
                          isHq
                            ? isActive
                              ? "bg-[#2dd4bf]/[0.14] ring-1 ring-[#2dd4bf]/45"
                              : "bg-[#2dd4bf]/[0.06] hover:bg-[#2dd4bf]/[0.11]"
                            : isActive
                              ? "bg-white/[0.08] ring-1 ring-[#d8a06a]/30"
                              : "hover:bg-white/[0.04]",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[0.56rem] font-bold transition-colors",
                            isHq
                              ? "border-[#2dd4bf] bg-[#2dd4bf] text-[#04241e] shadow-[0_0_14px_-2px_rgba(45,212,191,0.65)]"
                              : isActive
                                ? "border-[#d8a06a] bg-[#d8a06a] text-[#181310]"
                                : "border-white/15 text-[#f6f1e7]/50 group-hover:border-[#d8a06a]/50",
                          )}
                          dir="ltr"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span
                              className={cn(
                                "text-[0.86rem] font-semibold",
                                isHq ? "text-[#99f6e4]" : isActive ? "text-[#f6f1e7]" : "text-[#f6f1e7]/80",
                              )}
                            >
                              {market.city[locale]}
                            </span>
                            {isHq && (
                              <span className="rounded-full border border-[#2dd4bf]/40 bg-[#2dd4bf]/15 px-2 py-0.5 text-[0.5rem] font-bold tracking-[0.08em] text-[#5eead4]">
                                {t.presence.hqNote}
                              </span>
                            )}
                          </span>
                          <span className="mt-0.5 block truncate text-[0.62rem] text-[#f6f1e7]/45">
                            {market.country[locale]}
                          </span>
                        </span>
                        <ArrowUpRight
                          className={cn(
                            "arrow-flip h-3.5 w-3.5 transition-all duration-300",
                            isHq
                              ? "text-[#2dd4bf]"
                              : isActive
                                ? "text-[#d8a06a]"
                                : "text-[#f6f1e7]/25 group-hover:text-[#d8a06a]",
                          )}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div
              key={active.id}
              className={cn(
                "anim-rise flex-1 rounded-2xl border p-5 transition-colors",
                isActiveHq
                  ? "border-[#2dd4bf]/35 bg-[#2dd4bf]/[0.08]"
                  : "border-accent/25 bg-accent/[0.07]",
              )}
            >
              <p
                className={cn(
                  "text-[0.56rem] font-bold uppercase tracking-[0.22em]",
                  isActiveHq ? "text-[#5eead4]" : "text-accent",
                )}
              >
                {isActiveHq ? t.presence.hqNote : t.presence.selectedLabel}
              </p>
              <div className="mt-2.5 flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-[1.25rem] font-semibold text-[#f6f1e7]">{active.city[locale]}</h3>
                  <p className="mt-0.5 text-[0.7rem] text-[#f6f1e7]/60">{active.country[locale]}</p>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full border px-2.5 py-1 text-[0.56rem] font-semibold",
                    isActiveHq
                      ? "border-[#2dd4bf]/40 bg-[#2dd4bf]/12 text-[#99f6e4]"
                      : "border-white/15 text-[#f6f1e7]/65",
                  )}
                >
                  {isActiveHq
                    ? locale === "ar"
                      ? "مقر رئيسي حديث · منذ 2014"
                      : locale === "fr"
                        ? "Nouveau siège · depuis 2014"
                        : "New HQ · Est. 2014"
                    : (
                      <>
                        {t.common.since} <span dir="ltr">{active.since}</span>
                      </>
                    )}
                </span>
              </div>

              {active.detail && (
                <p className="mt-3 text-[0.74rem] leading-relaxed text-[#f6f1e7]/72">
                  {active.detail[locale]}
                </p>
              )}

              <p className="mt-4 text-[0.56rem] font-bold uppercase tracking-[0.2em] text-[#f6f1e7]/35">{t.presence.focus}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {active.focus.map((focusId) => {
                  const sector = sectors.find((item) => item.id === focusId);
                  if (!sector) return null;
                  const Icon = sectorIcon(sector.id);
                  return (
                    <span
                      key={focusId}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-2.5 py-1 text-[0.62rem] text-[#f6f1e7]/80"
                    >
                      <Icon className={cn("h-3 w-3", isActiveHq ? "text-[#2dd4bf]" : "text-accent")} />
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
                    className="group mt-3.5 flex items-center justify-between rounded-xl border border-[#2dd4bf]/35 bg-[#2dd4bf]/12 px-3 py-2 text-[0.66rem] text-[#f6f1e7] transition-colors hover:border-[#2dd4bf] hover:bg-[#2dd4bf] hover:text-[#04241e]"
                  >
                    <span className="inline-flex items-center gap-2 font-semibold">
                      <Instagram className="h-3.5 w-3.5 shrink-0" />
                      <span>{t.social.egyptBadge}</span>
                    </span>
                    <span dir="ltr" className="inline-flex items-center gap-1 font-bold opacity-85">
                      {egyptSocial.handle}
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </a>
                );
              })()}

              <button
                type="button"
                onClick={() => navigateTo("home", "contact")}
                className={cn(
                  "group mt-4 flex w-full items-center justify-between border-t border-white/15 pt-3 text-[0.64rem] font-bold tracking-[0.1em]",
                  isActiveHq ? "text-[#5eead4]" : "text-accent",
                )}
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
