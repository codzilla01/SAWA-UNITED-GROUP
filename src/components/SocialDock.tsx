import { useEffect, useRef, useState, type MouseEvent } from "react";
import { cn } from "@/utils/cn";
import { useI18n } from "@/lib/i18n";
import { site, type SocialChannel, type SocialId } from "@/lib/site";
import { ArrowUpRight, Close, SocialOrbit, socialIcon } from "./icons";

function MagneticDockItem({
  channel,
  localizedName,
  hoveredId,
  onHover,
}: {
  channel: SocialChannel;
  localizedName: string;
  hoveredId: SocialId | null;
  onHover: (id: SocialId | null) => void;
}) {
  const Icon = socialIcon(channel.icon);
  const expanded = hoveredId === channel.id;
  const dimmed = hoveredId !== null && !expanded;

  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = ((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * 2.5;
    const dy = ((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * 2.5;
    event.currentTarget.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
  };

  const onLeave = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.transform = "translate3d(0, 0, 0)";
    onHover(null);
  };

  return (
    <a
      href={channel.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${localizedName} (${channel.handle})`}
      onMouseEnter={() => onHover(channel.id)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onFocus={() => onHover(channel.id)}
      onBlur={() => onHover(null)}
      className={cn(
        "group relative inline-flex h-9 items-center rounded-full transition-[background-color,color,padding,opacity,box-shadow] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
        expanded
          ? "bg-[#d8a06a] px-3.5 text-[#181310] shadow-[0_10px_24px_-8px_rgba(216,160,106,0.75)]"
          : "px-2.5 text-[#f6f1e7]/80 hover:text-[#f6f1e7]",
        dimmed && "opacity-50",
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span
        className={cn(
          "grid overflow-hidden transition-[grid-template-columns,margin] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
          expanded ? "ms-2 grid-cols-[1fr]" : "ms-0 grid-cols-[0fr]",
        )}
      >
        <span className="inline-flex min-w-0 items-center gap-1.5 overflow-hidden whitespace-nowrap text-[0.68rem] font-bold">
          <span dir="ltr">{channel.handle}</span>
          <ArrowUpRight className="arrow-flip h-3.5 w-3.5 shrink-0" />
        </span>
      </span>
    </a>
  );
}

export function SocialDock({ route }: { route: string }) {
  const { t } = useI18n();
  const [hoveredId, setHoveredId] = useState<SocialId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dockedAway, setDockedAway] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);

  // Gracefully tuck away when the dedicated SocialChannels showcase or Footer is in view
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    setDockedAway(false);
    setMobileOpen(false);

    const visibleTargets = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleTargets.add(entry.target);
          } else {
            visibleTargets.delete(entry.target);
          }
        });
        const shouldHide = visibleTargets.size > 0;
        setDockedAway(shouldHide);
        if (shouldHide) setMobileOpen(false);
      },
      { threshold: 0.14 },
    );

    const frame = window.requestAnimationFrame(() => {
      const showcase = document.getElementById("social-channels");
      const footer = document.querySelector("footer");
      if (showcase) observer.observe(showcase);
      if (footer) observer.observe(footer);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [route]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (mobileRef.current && !mobileRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <aside
      aria-label={t.social.dockLabel}
      className={cn(
        "fixed bottom-5 start-5 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:bottom-7 sm:start-7",
        dockedAway ? "pointer-events-none translate-y-4 opacity-0" : "translate-y-0 opacity-100",
      )}
    >
      {/* Desktop & Tablet: Sculptural Magnetic Morphing Capsule */}
      <div className="hidden items-center gap-0.5 rounded-full border border-[#f6f1e7]/15 bg-[#082a23]/92 p-1.5 text-[#f6f1e7] shadow-[0_18px_45px_-14px_rgba(4,19,15,0.65)] backdrop-blur-xl sm:flex">
        <span className="inline-flex items-center gap-2 pe-2.5 ps-3 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#f6f1e7]/55 select-none">
          <span className="relative flex h-1.5 w-1.5">
            <span className="anim-ping absolute inset-0 rounded-full bg-[#d8a06a]" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#d8a06a]" />
          </span>
          {t.social.follow}
        </span>
        <span className="me-0.5 h-4 w-px bg-white/15" aria-hidden="true" />
        {site.socials.map((channel) => (
          <MagneticDockItem
            key={channel.id}
            channel={channel}
            localizedName={t.social.channels[channel.id].name}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>

      {/* Mobile: Orbital Compass Trigger + Staggered Fan-Out Totem */}
      <div ref={mobileRef} className="relative sm:hidden">
        <div
          aria-hidden={!mobileOpen}
          className={cn(
            "absolute bottom-full start-0 mb-3 flex flex-col gap-2",
            mobileOpen ? "pointer-events-auto" : "pointer-events-none",
          )}
        >
          {site.socials.map((channel, index) => {
            const Icon = socialIcon(channel.icon);
            const meta = t.social.channels[channel.id];
            const reverseIndex = site.socials.length - 1 - index;
            return (
              <a
                key={channel.id}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={mobileOpen ? 0 : -1}
                onClick={() => setMobileOpen(false)}
                style={{
                  transitionDelay: mobileOpen ? `${reverseIndex * 55}ms` : "0ms",
                }}
                className={cn(
                  "group flex items-center gap-2.5 rounded-full border border-[#f6f1e7]/15 bg-[#082a23]/95 py-1.5 pe-3.5 ps-1.5 text-[#f6f1e7] shadow-[0_16px_36px_-12px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  mobileOpen ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0",
                )}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d8a06a] text-[#181310]">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="whitespace-nowrap text-[0.72rem] font-semibold text-[#f6f1e7]">
                    {meta.name}
                  </span>
                  <span dir="ltr" className="whitespace-nowrap text-[0.58rem] text-[#e8bd93]/85">
                    {channel.handle}
                  </span>
                </span>
                <ArrowUpRight className="arrow-flip ms-1 h-3.5 w-3.5 shrink-0 text-[#d8a06a]" />
              </a>
            );
          })}
        </div>

        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? t.social.toggleClose : t.social.toggleOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className={cn(
            "relative flex items-center justify-center rounded-full border shadow-[0_14px_35px_-10px_rgba(0,0,0,0.55)] transition-all duration-300 active:scale-95",
            mobileOpen
              ? "border-[#d8a06a] bg-[#d8a06a] text-[#181310]"
              : "border-[#d8a06a]/45 bg-[#082a23] text-[#f6f1e7]",
          )}
          style={{ height: "3.25rem", width: "3.25rem" }}
        >
          {!mobileOpen && (
            <svg
              viewBox="0 0 56 56"
              fill="none"
              aria-hidden="true"
              className="anim-orbit pointer-events-none absolute -inset-1 h-[calc(100%+8px)] w-[calc(100%+8px)]"
            >
              <circle
                cx="28"
                cy="28"
                r="26"
                stroke="#d8a06a"
                strokeOpacity="0.45"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
            </svg>
          )}
          {mobileOpen ? <Close className="h-5 w-5" /> : <SocialOrbit className="h-5 w-5 text-[#d8a06a]" />}
        </button>
      </div>
    </aside>
  );
}
