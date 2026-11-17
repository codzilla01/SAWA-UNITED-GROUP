import { useEffect, useMemo, useState } from "react";
import { cn } from "@/utils/cn";
import { useI18n } from "@/lib/i18n";
import { navigateTo, readSectorFromHash } from "@/lib/router";
import { useSeo } from "@/lib/seo";
import { projects, sectors, type SectorId } from "@/data/content";
import { Button, Container, Eyebrow, Reveal } from "@/components/ui";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowUpRight, Spark } from "@/components/icons";

type Filter = SectorId | "all";

function normalizeFilter(value: string | null): Filter {
  if (value && sectors.some((sector) => sector.id === value)) return value as SectorId;
  return "all";
}

export function ProjectsPage() {
  const { t, locale } = useI18n();
  const [filter, setFilter] = useState<Filter>(() => normalizeFilter(readSectorFromHash()));

  useSeo({
    title: `${t.seo.projectsTitle}`,
    description: t.seo.projectsDesc,
    lang: locale,
    path: "projects.html",
  });

  useEffect(() => {
    const onHashChange = () => setFilter(normalizeFilter(readSectorFromHash()));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((project) => project.sector === filter)),
    [filter],
  );

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: projects.length };
    sectors.forEach((sector) => {
      base[sector.id] = projects.filter((project) => project.sector === sector.id).length;
    });
    return base;
  }, []);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t.projectsSection.all },
    ...sectors.map((sector) => ({ id: sector.id as Filter, label: sector.name[locale] })),
  ];

  return (
    <>
      <section className="hero-surface grain relative overflow-hidden text-[#f6f1e7]">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute -end-32 -top-40 h-[34rem] w-[34rem] rounded-full border border-white/[0.07]" />
        <div className="pointer-events-none absolute -end-10 -top-24 h-[18rem] w-[18rem] rounded-full border border-accent/20" />
        <Container className="relative pb-14 pt-12 sm:pb-16 sm:pt-16 lg:pb-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[0.66rem] font-medium text-[#f6f1e7]/45">
            <button type="button" onClick={() => navigateTo("home")} className="transition-colors hover:text-accent">
              {t.nav.home}
            </button>
            <span className="text-[#f6f1e7]/25">/</span>
            <span className="text-[#f6f1e7]/80">{t.nav.projects}</span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div className="anim-rise">
              <Eyebrow invert>{t.projectsSection.eyebrow}</Eyebrow>
              <h1 className="mt-5 text-[clamp(2.2rem,4.8vw,3.9rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
                <span className="block">{t.nav.projects}</span>
                <span
                  className={
                    locale === "ar"
                      ? "mt-1 block text-accent"
                      : "mt-1 block font-display font-light italic text-accent"
                  }
                >
                  {locale === "ar" ? "محفظة المجموعة" : locale === "fr" ? "Le portefeuille" : "The portfolio"}
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-[#f6f1e7]/60">{t.projectsSection.lead}</p>
            </div>

            <div className="anim-rise grid grid-cols-3 gap-3 border-t border-white/15 pt-5" style={{ animationDelay: "120ms" }}>
              {[
                { value: String(projects.length).padStart(2, "0"), label: t.projectsSection.portfolio },
                { value: "04", label: t.nav.sectors },
                { value: "06", label: t.stats.markets },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-[1.9rem] font-light leading-none text-[#f6f1e7]" dir="ltr">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-[0.62rem] tracking-wide text-[#f6f1e7]/45">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          <div className="flex flex-col gap-4 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <Spark className="h-4 w-4 text-accent" />
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-muted">
                {t.projectsSection.filterLabel}
              </p>
            </div>

            <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-wrap lg:justify-end lg:px-0">
              {filters.map((item) => {
                const active = filter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(item.id)}
                    className={cn(
                      "group inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[0.74rem] font-semibold transition-all duration-300",
                      active
                        ? "border-ink bg-ink text-[var(--base)]"
                        : "border-line bg-transparent text-muted hover:border-accent/60 hover:text-ink",
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-[0.56rem] font-bold tabular-nums",
                        active ? "bg-white/15 text-[var(--base)]" : "bg-surface-2 text-muted",
                      )}
                      dir="ltr"
                    >
                      {counts[item.id] ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-[0.7rem] text-muted" aria-live="polite">
              {locale === "ar"
                ? `${filtered.length} مشروعات معروضة`
                : locale === "fr"
                  ? `${filtered.length} projet${filtered.length > 1 ? "s" : ""} affiché${filtered.length > 1 ? "s" : ""}`
                  : `${filtered.length} project${filtered.length > 1 ? "s" : ""} shown`}
            </p>
            {filter !== "all" && (
              <button
                type="button"
                onClick={() => setFilter("all")}
                className="inline-flex items-center gap-1.5 text-[0.68rem] font-semibold text-accent transition-opacity hover:opacity-75"
              >
                {t.projectsSection.all}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="mt-7 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project, index) => (
                <Reveal key={`${filter}-${project.id}`} delay={(index % 3) * 80}>
                  <ProjectCard project={project} imageClassName="aspect-[4/3]" />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-10 flex flex-col items-center justify-center rounded-[26px] border border-dashed border-line bg-surface px-6 py-20 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
                <Spark className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-[1.2rem] font-semibold text-ink">{t.projectsSection.empty}</h2>
              <p className="mt-1.5 text-[0.84rem] text-muted">{t.projectsSection.emptyHint}</p>
              <Button variant="dark" size="md" className="mt-5" onClick={() => setFilter("all")}>
                {t.projectsSection.all}
              </Button>
            </div>
          )}

          <Reveal className="mt-16 flex flex-col items-start justify-between gap-5 rounded-[26px] border border-line bg-surface p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-accent">{t.common.startConversation}</p>
              <h2 className="mt-2 max-w-xl text-[clamp(1.3rem,2.4vw,1.8rem)] font-semibold leading-snug text-ink">
                {t.contact.title}
              </h2>
            </div>
            <Button variant="primary" size="lg" withArrow onClick={() => navigateTo("home", "contact")}>
              {t.common.contactUs}
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
