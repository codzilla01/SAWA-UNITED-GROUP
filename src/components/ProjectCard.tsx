import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import { useI18n } from "@/lib/i18n";
import { navigateTo } from "@/lib/router";
import { emitSawaEvent, SAWA_EVENTS } from "@/lib/events";
import { sectors, type Project } from "@/data/content";
import { Button } from "./ui";
import { ArrowUpRight, Close, MapPin, sectorIcon } from "./icons";

export function SectorTag({ sectorId, className }: { sectorId: Project["sector"]; className?: string }) {
  const { locale } = useI18n();
  const sector = sectors.find((item) => item.id === sectorId);
  if (!sector) return null;
  const Icon = sectorIcon(sector.id);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#061f19]/55 px-2.5 py-1 text-[0.62rem] font-semibold tracking-wide text-[#f6f1e7] backdrop-blur-md",
        className,
      )}
    >
      <Icon className="h-3 w-3 text-accent" />
      {sector.name[locale]}
    </span>
  );
}

export function StatusDot({ status, className }: { status: Project["status"]; className?: string }) {
  const colors = {
    operating: "bg-[#6fbb96]",
    development: "bg-[#d8a06a]",
    delivered: "bg-[#93a8bb]",
  };
  return <span className={cn("h-1.5 w-1.5 rounded-full", colors[status], className)} />;
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t, locale } = useI18n();
  const sector = sectors.find((item) => item.id === project.sector);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-[#02100c]/75 p-0 backdrop-blur-md sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`project-${project.id}-title`}
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[26px] border border-line bg-surface shadow-2xl sm:rounded-[26px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <img src={project.image} alt="" className="h-full w-full object-cover" />
          <span className="absolute inset-0 bg-gradient-to-t from-[#061f19] via-[#061f19]/20 to-transparent" />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#061f19]/60 px-3 py-1.5 text-[0.66rem] font-semibold text-[#f6f1e7] backdrop-blur-md">
              {sector && <span>{sector.name[locale]}</span>}
              <span className="h-1 w-1 rounded-full bg-accent" />
              {project.year}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label={t.common.close}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-[#061f19]/40 text-[#f6f1e7] backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
            >
              <Close className="h-4 w-4" />
            </button>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-[#f6f1e7]/60">
              {t.projectsSection.eyebrow}
            </p>
            <h2
              id={`project-${project.id}-title`}
              className="mt-2 text-[clamp(1.5rem,3vw,2.2rem)] font-semibold leading-tight text-[#f6f1e7]"
            >
              {project.title[locale]}
            </h2>
          </div>
        </div>

        <div className="p-5 sm:p-7">
          <p className="text-[0.92rem] leading-relaxed text-muted">{project.summary[locale]}</p>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-5 sm:grid-cols-4">
            <div>
              <dt className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-muted">{t.projectsSection.locationLabel}</dt>
              <dd className="mt-1 flex items-center gap-1 text-[0.82rem] font-semibold text-ink">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                {project.city[locale]}
              </dd>
            </div>
            <div>
              <dt className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-muted">{t.projectsSection.yearLabel}</dt>
              <dd className="mt-1 text-[0.82rem] font-semibold text-ink">{project.year}</dd>
            </div>
            <div>
              <dt className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-muted">{t.projectsSection.statusLabel}</dt>
              <dd className="mt-1 flex items-center gap-1.5 text-[0.82rem] font-semibold text-ink">
                <StatusDot status={project.status} />
                {t.status[project.status]}
              </dd>
            </div>
            <div>
              <dt className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-muted">
                {locale === "ar" ? "الحجم" : locale === "fr" ? "Taille" : "Scale"}
              </dt>
              <dd className="mt-1 text-[0.82rem] font-semibold text-ink">{project.size[locale]}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[0.7rem] text-muted">{t.contact.info.response}</p>
            <Button
              variant="dark"
              withArrow
              onClick={() => {
                emitSawaEvent(SAWA_EVENTS.prefillSector, project.sector);
                onClose();
                navigateTo("home", "contact");
              }}
            >
              {t.common.startConversation}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function ProjectCard({
  project,
  className,
  imageClassName,
}: {
  project: Project;
  className?: string;
  imageClassName?: string;
}) {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className={cn("group", className)}>
        <button type="button" onClick={() => setOpen(true)} className="block w-full text-start">
          <div className={cn("relative overflow-hidden rounded-[20px] bg-surface-2", imageClassName ?? "aspect-[4/3]")}>
            <img
              src={project.image}
              alt={project.title[locale]}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-[#04130f]/80 via-transparent to-[#04130f]/10" />
            <span className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
              <SectorTag sectorId={project.sector} />
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#061f19]/55 px-2.5 py-1 text-[0.6rem] font-semibold text-[#f6f1e7] backdrop-blur-md">
                <StatusDot status={project.status} />
                {t.status[project.status]}
              </span>
            </span>
            <span className="absolute bottom-4 end-4 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full bg-[#f6f1e7] text-[#082a23] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight className="h-4 w-4" />
            </span>
            <span className="absolute bottom-4 start-4 flex items-center gap-2 text-[0.68rem] font-medium text-[#f6f1e7]/85">
              <MapPin className="h-3.5 w-3.5 text-accent" />
              <span>{project.city[locale]}</span>
              <span className="h-1 w-1 rounded-full bg-[#f6f1e7]/35" />
              <span dir="ltr">{project.year}</span>
            </span>
          </div>

          <div className="mt-4 flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[1.06rem] font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-accent">
                {project.title[locale]}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-[0.82rem] leading-relaxed text-muted">{project.summary[locale]}</p>
            </div>
          </div>
        </button>
      </article>
      {open && <ProjectDialog project={project} onClose={() => setOpen(false)} />}
    </>
  );
}
