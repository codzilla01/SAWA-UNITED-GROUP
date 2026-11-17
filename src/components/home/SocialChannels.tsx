import { useState, type MouseEvent } from "react";
import { cn } from "@/utils/cn";
import { useI18n } from "@/lib/i18n";
import { site, type SocialId } from "@/lib/site";
import { Container, Eyebrow, Reveal } from "@/components/ui";
import { ArrowUpRight, LogoMark, socialIcon } from "@/components/icons";

const EQ_BARS = [
  { h: 36, delay: "0s", accent: false },
  { h: 64, delay: "0.22s", accent: true },
  { h: 92, delay: "0.45s", accent: true },
  { h: 52, delay: "0.14s", accent: false },
  { h: 108, delay: "0.62s", accent: true },
  { h: 76, delay: "0.31s", accent: false },
  { h: 98, delay: "0.52s", accent: true },
  { h: 46, delay: "0.08s", accent: false },
  { h: 82, delay: "0.39s", accent: true },
  { h: 58, delay: "0.68s", accent: false },
  { h: 34, delay: "0.26s", accent: false },
];

function ChannelArtwork({ id, isActive }: { id: SocialId; isActive: boolean }) {
  const strokeMain = isActive ? "#f6f1e7" : "currentColor";
  const strokeAccent = isActive ? "#d8a06a" : "var(--accent)";
  const frameClass = cn(
    "pointer-events-none absolute transition-opacity duration-700 rtl:-scale-x-100",
    isActive ? "opacity-95" : "opacity-[0.16] group-hover:opacity-30",
  );

  if (id === "facebook") {
    return (
      <svg
        viewBox="0 0 320 320"
        fill="none"
        aria-hidden="true"
        className={cn(frameClass, "-end-12 -top-10 h-[270px] w-[270px] sm:h-[310px] sm:w-[310px]")}
      >
        <circle cx="190" cy="130" r="118" stroke={strokeMain} strokeOpacity="0.1" strokeWidth="1" />
        <circle cx="190" cy="130" r="86" stroke={strokeMain} strokeOpacity="0.14" strokeWidth="1" />
        <g
          className={cn(isActive && "anim-orbit")}
          style={{ transformBox: "view-box", transformOrigin: "190px 130px" }}
        >
          <circle
            cx="190"
            cy="130"
            r="62"
            stroke={strokeAccent}
            strokeOpacity="0.55"
            strokeWidth="1.1"
            strokeDasharray="5 8"
          />
          <circle cx="252" cy="130" r="3.2" fill={strokeAccent} />
          <circle cx="146" cy="86" r="2.2" fill={strokeMain} fillOpacity="0.65" />
        </g>
        <circle cx="190" cy="130" r="32" stroke={strokeAccent} strokeOpacity="0.3" strokeWidth="1" />
        <line x1="60" y1="130" x2="310" y2="130" stroke={strokeMain} strokeOpacity="0.08" strokeWidth="0.8" />
        <line x1="190" y1="6" x2="190" y2="260" stroke={strokeMain} strokeOpacity="0.08" strokeWidth="0.8" />
        <circle cx="190" cy="130" r="4" fill={strokeAccent} />
      </svg>
    );
  }

  if (id === "tiktok") {
    return (
      <svg
        viewBox="0 0 320 320"
        fill="none"
        aria-hidden="true"
        className={cn(frameClass, "-end-6 -top-4 h-[260px] w-[260px] sm:h-[300px] sm:w-[300px]")}
      >
        {/* Architectural 9:16 motion frame */}
        <rect
          x="126"
          y="26"
          width="142"
          height="226"
          rx="22"
          stroke={strokeMain}
          strokeOpacity="0.12"
          strokeWidth="1"
        />
        <rect
          x="138"
          y="38"
          width="118"
          height="202"
          rx="15"
          stroke={strokeAccent}
          strokeOpacity="0.22"
          strokeWidth="0.9"
          strokeDasharray="3 6"
        />
        <circle cx="156" cy="56" r="3" fill={strokeAccent} fillOpacity="0.85" />
        <line x1="166" y1="56" x2="202" y2="56" stroke={strokeMain} strokeOpacity="0.22" strokeWidth="1.5" strokeLinecap="round" />

        {/* Harmonic frequency equalizer */}
        <g transform="translate(148, 214)">
          {EQ_BARS.map((bar, idx) => (
            <rect
              key={idx}
              x={idx * 9}
              y={-bar.h}
              width="3.2"
              height={bar.h}
              rx="1.6"
              fill={bar.accent ? strokeAccent : strokeMain}
              fillOpacity={bar.accent ? 0.65 : 0.24}
              className={cn(isActive && "anim-eq")}
              style={{
                animationDelay: bar.delay,
                transformBox: "fill-box",
                transformOrigin: "bottom center",
              }}
            />
          ))}
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      aria-hidden="true"
      className={cn(frameClass, "-end-8 -top-6 h-[265px] w-[265px] sm:h-[305px] sm:w-[305px]")}
    >
      {/* Architectural camera viewfinder brackets */}
      <path d="M108 64V44h20M268 44h20v20M288 204v20h-20M128 224h-20v-20" stroke={strokeAccent} strokeOpacity="0.6" strokeWidth="1.3" strokeLinecap="round" />
      <g
        className={cn(isActive && "anim-orbit")}
        style={{ transformBox: "view-box", transformOrigin: "198px 134px" }}
      >
        <circle
          cx="198"
          cy="134"
          r="76"
          stroke={strokeMain}
          strokeOpacity="0.16"
          strokeWidth="1"
          strokeDasharray="2 9"
        />
      </g>
      <g
        className={cn(isActive && "anim-orbit-reverse")}
        style={{ transformBox: "view-box", transformOrigin: "198px 134px" }}
      >
        <circle
          cx="198"
          cy="134"
          r="50"
          stroke={strokeAccent}
          strokeOpacity="0.52"
          strokeWidth="1.1"
          strokeDasharray="16 8"
        />
      </g>
      <circle cx="198" cy="134" r="24" stroke={strokeMain} strokeOpacity="0.22" strokeWidth="1" />
      <circle cx="198" cy="134" r="3.5" fill={strokeAccent} />
      <circle cx="262" cy="70" r="3" fill={strokeAccent} fillOpacity="0.8" />
    </svg>
  );
}

export function SocialChannels() {
  const { t, locale } = useI18n();
  const [activeId, setActiveId] = useState<SocialId>("facebook");

  const activeChannel = site.socials.find((item) => item.id === activeId) ?? site.socials[0];

  const handlePointerMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.style.setProperty("--spot-x", `${x.toFixed(1)}%`);
    event.currentTarget.style.setProperty("--spot-y", `${y.toFixed(1)}%`);
  };

  return (
    <section
      id="social-channels"
      className="relative overflow-hidden border-t border-line bg-surface py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute -end-28 -top-28 h-[26rem] w-[26rem] rounded-full border border-line/70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -start-24 bottom-0 h-80 w-80 rounded-full bg-accent/[0.06] blur-[85px]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <Eyebrow>{t.social.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-[clamp(2rem,3.7vw,3.2rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-ink">
              {t.social.title1}{" "}
              <span className={locale === "ar" ? "text-accent" : "font-display font-light italic text-accent"}>
                {t.social.titleAccent}
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-[0.94rem] leading-relaxed text-muted">{t.social.lead}</p>
          </Reveal>

          {/* Interactive Frequency Dial */}
          <Reveal delay={110} className="shrink-0">
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-line bg-base/80 p-1.5 backdrop-blur-sm">
              <div role="group" aria-label={t.social.switchLabel} className="flex items-center gap-1">
                {site.socials.map((channel) => {
                  const Icon = socialIcon(channel.icon);
                  const selected = channel.id === activeId;
                  const meta = t.social.channels[channel.id];
                  return (
                    <button
                      key={channel.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setActiveId(channel.id)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.68rem] font-bold transition-all duration-300",
                        selected
                          ? "bg-brand text-[#f6f1e7] shadow-sm dark:bg-accent dark:text-[#181310]"
                          : "text-muted hover:text-ink",
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span dir="ltr">{channel.code}</span>
                      <span className="sr-only">{meta.name}</span>
                    </button>
                  );
                })}
              </div>
              <span className="hidden h-4 w-px bg-line sm:block" aria-hidden="true" />
              <a
                href={activeChannel.href}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="hidden pe-3 ps-1 text-[0.7rem] font-semibold text-accent transition-opacity hover:opacity-80 sm:inline-flex sm:items-center sm:gap-1"
              >
                <span>{activeChannel.handle}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Architectural Kinetic Triptych */}
        <Reveal delay={140} className="mt-11">
          <div className="flex flex-col gap-3.5 lg:min-h-[430px] lg:flex-row lg:items-stretch">
            {site.socials.map((channel) => {
              const Icon = socialIcon(channel.icon);
              const meta = t.social.channels[channel.id];
              const isActive = channel.id === activeId;

              return (
                <a
                  key={channel.id}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${meta.name} — ${channel.handle}`}
                  onMouseEnter={() => setActiveId(channel.id)}
                  onFocus={() => setActiveId(channel.id)}
                  onMouseMove={handlePointerMove}
                  className={cn(
                    "group relative flex min-w-0 flex-col justify-between overflow-hidden rounded-[26px] border transition-[flex-grow,background-color,border-color,box-shadow,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isActive
                      ? "grain border-[#d8a06a]/45 bg-[#07241d] text-[#f6f1e7] shadow-[0_34px_75px_-34px_rgba(6,31,25,0.82)] lg:flex-[2.25]"
                      : "border-line bg-base text-ink hover:border-accent/45 lg:flex-[0.92]",
                  )}
                >
                  {/* Ambient radial & pointer-reactive bronze spotlight */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "social-spotlight pointer-events-none absolute inset-0 transition-opacity duration-500",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_75%_at_92%_6%,rgba(21,88,69,0.52),transparent_62%)]"
                    />
                  )}

                  {/* Platform-specific kinetic geometry */}
                  <ChannelArtwork id={channel.id} isActive={isActive} />

                  {/* Main Plate Content */}
                  <div className="relative z-10 flex flex-1 flex-col justify-between p-6 sm:p-7">
                    {/* Top Row: Index + Badge + Medallion */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span
                          dir="ltr"
                          className={cn(
                            "font-display text-[1.45rem] font-light leading-none tracking-tight transition-colors duration-500",
                            isActive ? "text-[#d8a06a]" : "text-muted/65",
                          )}
                        >
                          {channel.code}
                        </span>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.16em] transition-all duration-500",
                            isActive
                              ? "border-white/15 bg-white/[0.06] text-[#f6f1e7]/85 backdrop-blur-sm"
                              : "border-line bg-surface/80 text-muted lg:hidden xl:inline-flex",
                          )}
                        >
                          <span
                            className={cn(
                              "relative inline-flex h-1.5 w-1.5 rounded-full",
                              isActive ? "bg-[#d8a06a]" : "bg-muted/50",
                            )}
                          >
                            {isActive && (
                              <span className="anim-ping absolute inset-0 rounded-full bg-[#d8a06a]" />
                            )}
                          </span>
                          {meta.badge}
                        </span>
                      </div>

                      <span
                        className={cn(
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-all duration-500",
                          isActive
                            ? "border-[#d8a06a] bg-[#d8a06a] text-[#181310] shadow-[0_12px_28px_-8px_rgba(216,160,106,0.65)] group-hover:scale-105"
                            : "border-line bg-surface text-ink group-hover:border-accent group-hover:text-accent",
                        )}
                      >
                        <Icon className="h-[19px] w-[19px]" />
                      </span>
                    </div>

                    {/* Lower Editorial Block */}
                    <div className="mt-12 lg:mt-16">
                      {/* Handle chip */}
                      <span
                        dir="ltr"
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.68rem] font-semibold transition-colors duration-500",
                          isActive
                            ? "border-accent/35 bg-accent/12 text-[#e8bd93]"
                            : "border-line bg-surface/75 text-muted",
                        )}
                      >
                        {channel.handle}
                      </span>

                      <h3
                        className={cn(
                          "mt-3.5 font-semibold leading-[1.12] tracking-[-0.025em] transition-colors duration-500",
                          isActive
                            ? "text-[clamp(1.6rem,2.6vw,2.25rem)] text-[#f6f1e7]"
                            : "text-[1.35rem] text-ink",
                        )}
                      >
                        {meta.name}
                      </h3>

                      <p
                        className={cn(
                          "mt-1.5 text-[0.84rem] font-medium leading-snug transition-colors duration-500",
                          isActive ? "text-[#f6f1e7]/85" : "text-muted",
                        )}
                      >
                        {meta.headline}
                      </p>

                      {/* Expanded narrative (always readable on mobile, spotlighted on active blade on desktop) */}
                      <p
                        className={cn(
                          "mt-3 max-w-[44ch] text-[0.84rem] leading-relaxed",
                          isActive ? "anim-rise block text-[#f6f1e7]/62" : "block text-muted/85 lg:hidden",
                        )}
                      >
                        {meta.description}
                      </p>

                      {/* Action Strip */}
                      <div
                        className={cn(
                          "mt-6 flex items-center justify-between gap-3 border-t pt-4 transition-colors duration-500",
                          isActive ? "border-white/12" : "border-line",
                        )}
                      >
                        <span
                          className={cn(
                            "inline-flex items-center gap-2 text-[0.74rem] font-bold tracking-[0.06em] transition-colors",
                            isActive ? "text-[#d8a06a]" : "text-ink/80 group-hover:text-accent",
                          )}
                        >
                          <span>{isActive ? t.social.openChannel : t.social.follow}</span>
                        </span>

                        <span
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                            isActive
                              ? "border-[#f6f1e7]/20 bg-[#f6f1e7] text-[#082a23] group-hover:border-[#d8a06a] group-hover:bg-[#d8a06a] group-hover:text-[#181310]"
                              : "border-line bg-surface text-muted group-hover:border-accent group-hover:text-accent",
                          )}
                        >
                          <ArrowUpRight className="arrow-flip h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Kinetic Frequency Strip */}
                  {isActive ? (
                    <div
                      dir="ltr"
                      aria-hidden="true"
                      className="relative z-10 overflow-hidden border-t border-white/10 bg-[#041712]/70 py-2.5"
                    >
                      <div className="flex w-max anim-marquee-fast whitespace-nowrap">
                        {[0, 1].map((half) => (
                          <div key={half} className="flex items-center gap-7 pr-7">
                            {[0, 1].map((idx) => (
                              <span
                                key={`${half}-${idx}`}
                                className="inline-flex items-center gap-2.5 text-[0.58rem] font-bold uppercase tracking-[0.24em] text-[#f6f1e7]/48"
                              >
                                <LogoMark className="h-2.5 w-2.5 shrink-0 text-accent" />
                                {meta.ticker}
                              </span>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div
                      dir="ltr"
                      className="relative z-10 flex items-center justify-between gap-3 border-t border-line/80 bg-surface/60 px-6 py-2.5 text-[0.58rem] font-bold uppercase tracking-[0.2em] text-muted/70 sm:px-7"
                    >
                      <span>{channel.coordinates}</span>
                      <span className="text-muted/50">{channel.code} / 03</span>
                    </div>
                  )}
                </a>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
