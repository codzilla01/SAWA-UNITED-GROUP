import { useI18n } from "@/lib/i18n";
import { useSeo } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { Stats, About, Journey } from "@/components/home/Story";
import { Sectors } from "@/components/home/Sectors";
import { ProjectsShowcase } from "@/components/home/ProjectsShowcase";
import { Presence } from "@/components/home/Presence";
import { Contact } from "@/components/home/Contact";

export function HomePage() {
  const { t, locale } = useI18n();

  useSeo({
    title: t.seo.homeTitle,
    description: t.seo.homeDesc,
    lang: locale,
  });

  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Sectors />
      <ProjectsShowcase />
      <Presence />
      <Journey />
      <Contact />
    </>
  );
}
