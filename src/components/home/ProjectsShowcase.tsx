import { useI18n } from "@/lib/i18n";
import { navigateTo } from "@/lib/router";
import { projects } from "@/data/content";
import { Button, Container, Reveal, SectionHeading } from "@/components/ui";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowUpRight } from "@/components/icons";

export function ProjectsShowcase() {
  const { t } = useI18n();
  const featured = projects.filter((project) => project.featured);

  return (
    <section className="relative overflow-hidden py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow={t.projectsSection.eyebrow}
          title={t.projectsSection.title}
          lead={t.projectsSection.lead}
          action={
            <Button variant="outline" size="md" withArrow onClick={() => navigateTo("projects")}>
              {t.common.viewAllProjects}
            </Button>
          }
        />

        <div className="mt-11 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-12">
          {featured.map((project, index) => (
            <Reveal
              key={project.id}
              delay={(index % 2) * 90}
              className={index % 2 === 0 ? "lg:col-span-7" : "lg:col-span-5"}
            >
              <ProjectCard
                project={project}
                imageClassName={index % 2 === 0 ? "aspect-[16/11]" : "aspect-[16/12]"}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={100} className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-line bg-surface px-6 py-5 sm:flex-row">
          <div className="flex items-center gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
              <ArrowUpRight className="h-5 w-5" />
            </span>
            <p className="max-w-md text-[0.82rem] leading-relaxed text-muted">
              {t.projectsSection.lead}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigateTo("projects")}
            className="group inline-flex shrink-0 items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:text-accent"
          >
            {t.projectsSection.portfolio}
            <span className="text-accent" dir="ltr">
              {String(projects.length).padStart(2, "0")}
            </span>
            <ArrowUpRight className="arrow-flip h-4 w-4" />
          </button>
        </Reveal>
      </Container>
    </section>
  );
}
