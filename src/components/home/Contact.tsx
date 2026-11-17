import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { cn } from "@/utils/cn";
import { useI18n } from "@/lib/i18n";
import { navigateTo } from "@/lib/router";
import { SAWA_EVENTS } from "@/lib/events";
import { sectors } from "@/data/content";
import { site, whatsappLink } from "@/lib/site";
import { Button, Container, FieldError, Reveal, SectionHeading, SocialLinks } from "@/components/ui";
import {
  Check,
  Clock,
  Mail,
  MapPin,
  Phone,
  Refresh,
  Shield,
  WhatsApp,
} from "@/components/icons";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  sector: string;
  message: string;
  consent: boolean;
  company_website: string;
};

type FormErrors = Partial<Record<"name" | "email" | "message" | "consent", string>>;
type Status = "idle" | "submitting" | "sent" | "fallback";

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  sector: "",
  message: "",
  consent: false,
  company_website: "",
};

export function Contact() {
  const { t, locale } = useI18n();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPrefill = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (sectors.some((sector) => sector.id === detail)) {
        setValues((previous) => ({ ...previous, sector: detail }));
        setStatus("idle");
      }
    };
    window.addEventListener(SAWA_EVENTS.prefillSector, onPrefill);
    return () => window.removeEventListener(SAWA_EVENTS.prefillSector, onPrefill);
  }, []);

  const update = <Key extends keyof FormValues>(key: Key, value: FormValues[Key]) => {
    setValues((previous) => ({ ...previous, [key]: value }));
    if (key in errors) {
      setErrors((previous) => ({ ...previous, [key]: undefined }));
    }
  };

  const sectorName = useMemo(() => {
    const sector = sectors.find((item) => item.id === values.sector);
    if (sector) return sector.name[locale];
    return locale === "ar" ? "استفسار عام" : locale === "fr" ? "Demande générale" : "General enquiry";
  }, [values.sector, locale]);

  const whatsappMessage = useMemo(() => {
    const headline =
      locale === "ar"
        ? "استفسار جديد عبر موقع مجموعة سوا المتحدة"
        : locale === "fr"
          ? "Nouvelle demande via le site SAWA United Group"
          : "New enquiry via the SAWA United Group website";
    return [
      headline,
      `${t.contact.form.name}: ${values.name}`,
      `${t.contact.form.email}: ${values.email}`,
      values.phone ? `${t.contact.form.phone}: ${values.phone}` : "",
      `${t.contact.form.sector}: ${sectorName}`,
      "",
      values.message,
    ]
      .filter(Boolean)
      .join("\n");
  }, [values, sectorName, locale, t]);

  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
    locale === "ar" ? "استفسار عبر الموقع" : locale === "fr" ? "Demande via le site" : "Website enquiry",
  )}&body=${encodeURIComponent(whatsappMessage)}`;

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (values.name.trim().length < 2) next.name = t.contact.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) next.email = t.contact.errors.email;
    if (values.message.trim().length < 20) next.message = t.contact.errors.message;
    if (!values.consent) next.consent = t.contact.errors.consent;
    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (values.company_website.trim()) {
      setStatus("sent");
      return;
    }

    setStatus("submitting");

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 6500);

    try {
      const response = await fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          sector: sectorName,
          message: values.message.trim(),
          consent: values.consent,
          locale,
          page: window.location.href,
        }),
        signal: controller.signal,
      });
      window.clearTimeout(timeout);

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; success?: boolean; whatsapp?: string }
        | null;

      if (response.ok && data && (data.ok === true || data.success === true)) {
        setStatus("sent");
        return;
      }
      setStatus("fallback");
    } catch {
      window.clearTimeout(timeout);
      setStatus("fallback");
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setStatus("idle");
  };

  const errorId = (field: string) => `contact-${field}-error`;

  return (
    <section id="contact" className="relative overflow-hidden py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line" />
      <div className="pointer-events-none absolute -start-24 bottom-10 h-72 w-72 rounded-full bg-accent/[0.06] blur-[70px]" />
      <Container>
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          lead={t.contact.lead}
          action={
            <Button
              variant="outline"
              size="md"
              icon={<WhatsApp className="h-4 w-4" />}
              href={whatsappLink()}
              target="_blank"
            >
              {t.contact.info.whatsapp}
            </Button>
          }
        />

        <div className="mt-11 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[26px] bg-brand p-6 text-[#f6f1e7] sm:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_100%_0%,rgba(21,88,69,0.7),transparent_60%)]" />
              <div className="pointer-events-none absolute -bottom-20 -end-16 h-64 w-64 rounded-full border border-white/[0.07]" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {t.contact.info.direct}
                </span>

                <ul className="mt-7 space-y-5">
                  <li className="flex items-start gap-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-accent">
                      <Mail className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-[#f6f1e7]/40">{t.contact.info.emailLabel}</p>
                      <a href={`mailto:${site.email}`} className="mt-1 block text-[0.88rem] font-medium text-[#f6f1e7] transition-colors hover:text-accent">
                        {site.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-accent">
                      <Phone className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-[#f6f1e7]/40">{t.contact.info.phoneLabel}</p>
                      <a href={`tel:${site.phoneHref}`} dir="ltr" className="mt-1 block text-[0.88rem] font-medium text-[#f6f1e7] transition-colors hover:text-accent">
                        {site.phoneDisplay}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-accent">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-[#f6f1e7]/40">{t.contact.info.hqLabel}</p>
                      <p className="mt-1 max-w-[240px] text-[0.84rem] leading-relaxed text-[#f6f1e7]/85">{site.address[locale]}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-accent">
                      <Clock className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-[#f6f1e7]/40">{t.contact.info.hoursLabel}</p>
                      <p className="mt-1 text-[0.82rem] text-[#f6f1e7]/80">{t.contact.info.hours}</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-7 rounded-2xl border border-white/12 bg-white/[0.04] p-4">
                  <p className="flex items-center gap-2 text-[0.72rem] font-semibold text-[#f6f1e7]">
                    <Shield className="h-4 w-4 text-accent" />
                    {t.contact.info.responseLabel}
                  </p>
                  <p className="mt-1 text-[0.72rem] text-[#f6f1e7]/50">{t.contact.info.response}</p>
                </div>

                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 flex items-center justify-between rounded-full bg-[#f6f1e7] px-5 py-3 text-[#082a23] transition-colors hover:bg-accent"
                >
                  <span className="inline-flex items-center gap-2 text-[0.76rem] font-bold">
                    <WhatsApp className="h-4 w-4" />
                    {t.contact.info.whatsapp}
                  </span>
                  <span className="text-[0.62rem] font-semibold opacity-60" dir="ltr">
                    {site.phoneDisplay}
                  </span>
                </a>
              </div>

              <div className="relative mt-auto flex items-center justify-between border-t border-white/10 pt-5">
                <p className="font-display text-[1.05rem] italic text-[#f6f1e7]/70" dir="ltr">
                  Together, beyond boundaries.
                </p>
                <SocialLinks invert />
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div ref={formTopRef} className="scroll-mt-28 rounded-[26px] border border-line bg-surface p-5 shadow-[0_30px_70px_-50px_rgba(8,42,35,0.5)] sm:p-7">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-muted">
                  {t.contact.eyebrow} · {locale === "ar" ? "نموذج التواصل" : locale === "fr" ? "Formulaire" : "Contact form"}
                </p>
                <span className="hidden items-center gap-1.5 text-[0.58rem] font-medium text-muted sm:flex">
                  <Shield className="h-3 w-3 text-success" />
                  HTTPS
                </span>
              </div>

              {status === "sent" ? (
                <div className="flex min-h-[440px] flex-col items-center justify-center py-10 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
                    <Check className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 text-[1.4rem] font-semibold text-ink">{t.contact.success.title}</h3>
                  <p className="mt-2 max-w-sm text-[0.88rem] leading-relaxed text-muted">{t.contact.success.text}</p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <Button variant="dark" size="md" onClick={reset}>
                      {t.contact.success.again}
                    </Button>
                    <Button variant="outline" size="md" href={whatsappLink()} target="_blank" icon={<WhatsApp className="h-4 w-4" />}>
                      {t.common.whatsapp}
                    </Button>
                  </div>
                </div>
              ) : status === "fallback" ? (
                <div className="anim-rise py-2">
                  <div className="mt-4 rounded-2xl border border-accent/35 bg-accent/[0.06] p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Mail className="h-5 w-5" />
                    </span>
                    <h3 className="mt-3 text-[1.1rem] font-semibold text-ink">{t.contact.fallback.title}</h3>
                    <p className="mt-1.5 text-[0.84rem] leading-relaxed text-muted">{t.contact.fallback.text}</p>
                    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                      <Button
                        href={whatsappLink(whatsappMessage)}
                        target="_blank"
                        variant="primary"
                        size="md"
                        className="flex-1"
                        icon={<WhatsApp className="h-4 w-4" />}
                      >
                        {t.contact.fallback.whatsapp}
                      </Button>
                      <Button
                        href={mailtoHref}
                        variant="outline"
                        size="md"
                        className="flex-1"
                        icon={<Mail className="h-4 w-4" />}
                      >
                        {t.contact.fallback.mail}
                      </Button>
                    </div>
                    <p className="mt-3 text-[0.62rem] leading-relaxed text-muted/80">{t.contact.fallback.note}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-4 inline-flex items-center gap-2 text-[0.74rem] font-semibold text-ink transition-colors hover:text-accent"
                  >
                    <Refresh className="h-3.5 w-3.5" />
                    {t.contact.fallback.retry}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="text-[0.72rem] font-semibold text-ink">
                        {t.contact.form.name} <span className="text-accent">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={values.name}
                        onChange={(event) => update("name", event.target.value)}
                        placeholder={t.contact.form.namePlaceholder}
                        className="field mt-1.5"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? errorId("name") : undefined}
                        required
                      />
                      <FieldError>{errors.name}</FieldError>
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="text-[0.72rem] font-semibold text-ink">
                        {t.contact.form.email} <span className="text-accent">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        dir="ltr"
                        value={values.email}
                        onChange={(event) => update("email", event.target.value)}
                        placeholder={t.contact.form.emailPlaceholder}
                        className="field mt-1.5"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? errorId("email") : undefined}
                        required
                      />
                      <FieldError>{errors.email}</FieldError>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-phone" className="text-[0.72rem] font-semibold text-ink">
                        {t.contact.form.phone}
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        dir="ltr"
                        value={values.phone}
                        onChange={(event) => update("phone", event.target.value)}
                        placeholder={t.contact.form.phonePlaceholder}
                        className="field mt-1.5"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-sector" className="text-[0.72rem] font-semibold text-ink">
                        {t.contact.form.sector}
                      </label>
                      <select
                        id="contact-sector"
                        name="sector"
                        value={values.sector}
                        onChange={(event) => update("sector", event.target.value)}
                        className="field mt-1.5"
                      >
                        <option value="">{t.contact.form.sectorPlaceholder}</option>
                        {sectors.map((sector) => (
                          <option key={sector.id} value={sector.id}>
                            {sector.name[locale]}
                          </option>
                        ))}
                        <option value="general">
                          {locale === "ar" ? "استفسار عام" : locale === "fr" ? "Demande générale" : "General enquiry"}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="contact-message" className="text-[0.72rem] font-semibold text-ink">
                        {t.contact.form.message} <span className="text-accent">*</span>
                      </label>
                      <span className={cn("text-[0.6rem]", values.message.length >= 20 ? "text-success" : "text-muted/70")} dir="ltr">
                        {values.message.length}/1200
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      maxLength={1200}
                      value={values.message}
                      onChange={(event) => update("message", event.target.value)}
                      placeholder={t.contact.form.messagePlaceholder}
                      className="field mt-1.5 resize-none"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? errorId("message") : undefined}
                      required
                    />
                    <FieldError>{errors.message}</FieldError>
                  </div>

                  <div
                    className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
                    aria-hidden="true"
                  >
                    <label htmlFor="company_website">Company website</label>
                    <input
                      id="company_website"
                      name="company_website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.company_website}
                      onChange={(event) => update("company_website", event.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-consent" className="flex cursor-pointer items-start gap-2.5">
                      <input
                        id="contact-consent"
                        name="consent"
                        type="checkbox"
                        checked={values.consent}
                        onChange={(event) => update("consent", event.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-line accent-[var(--accent)]"
                        aria-invalid={Boolean(errors.consent)}
                        aria-describedby={errors.consent ? errorId("consent") : undefined}
                      />
                      <span className="text-[0.72rem] leading-relaxed text-muted">
                        {t.contact.form.consent}{" "}
                        <button
                          type="button"
                          onClick={() => navigateTo("privacy")}
                          className="font-semibold text-ink underline decoration-accent/50 underline-offset-2 transition-colors hover:text-accent"
                        >
                          {t.contact.form.privacy}
                        </button>{" "}
                        {t.contact.form.consentEnd}
                      </span>
                    </label>
                    <FieldError>{errors.consent}</FieldError>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 border-t border-line pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={status === "submitting"}
                      className="min-w-[160px]"
                      icon={
                        status === "submitting" ? (
                          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#181310]/30 border-t-[#181310]" />
                        ) : undefined
                      }
                    >
                      {status === "submitting" ? t.contact.form.submitting : t.contact.form.submit}
                    </Button>
                    <p className="flex items-center gap-1.5 text-[0.64rem] leading-relaxed text-muted">
                      <Shield className="h-3.5 w-3.5 shrink-0 text-success" />
                      {t.contact.fallback.note}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
