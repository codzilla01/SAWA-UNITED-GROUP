import { LocaleProvider, useI18n } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { useRoute } from "@/lib/router";
import { whatsappLink } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SocialDock } from "@/components/SocialDock";
import { HomePage } from "@/pages/HomePage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { PrivacyPage } from "@/pages/PrivacyPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { WhatsApp } from "@/components/icons";

function FloatingWhatsApp() {
  const { t, locale } = useI18n();
  const message =
    locale === "ar"
      ? "مرحبًا مجموعة سوا المتحدة، أرغب في معرفة المزيد عن قطاعاتكم ومشروعاتكم."
      : locale === "fr"
        ? "Bonjour SAWA United Group, je souhaite en savoir plus sur vos secteurs et vos projets."
        : "Hello SAWA United Group, I'd like to learn more about your sectors and projects.";

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.contact.info.whatsapp}
      className="group fixed bottom-5 end-5 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-[#25d366] text-[#062d1e] shadow-[0_14px_35px_-10px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105 sm:bottom-7 sm:end-7"
      style={{ height: "3.25rem", width: "3.25rem" }}
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-[#25d366]/40 anim-ping" aria-hidden="true" />
      <WhatsApp className="relative h-6 w-6" />
      <span className="pointer-events-none absolute end-full me-3 hidden whitespace-nowrap rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.7rem] font-semibold text-ink opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 sm:block">
        {t.contact.info.whatsapp}
      </span>
    </a>
  );
}

function Shell() {
  const route = useRoute();

  return (
    <div className="min-h-screen bg-base text-ink">
      <Header />
      <main id="main" key={route} tabIndex={-1} className="outline-none">
        {route === "home" && <HomePage />}
        {route === "projects" && <ProjectsPage />}
        {route === "privacy" && <PrivacyPage />}
        {route === "notfound" && <NotFoundPage />}
      </main>
      <Footer />
      <SocialDock route={route} />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <Shell />
      </LocaleProvider>
    </ThemeProvider>
  );
}
