"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SmoothLink } from "@/components/common/smooth-link";
import type { Cta } from "@/types/content";

type HeroSectionProps = {
  actions: Cta[];
  quotes: string[];
};

export function HeroSection({
  actions,
  quotes
}: HeroSectionProps): React.JSX.Element {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const quoteSideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper) return;

    const ctx = gsap.context(() => {
      const textPrimary = [
        eyebrowRef.current,
        headlineRef.current,
        subtitleRef.current
      ].filter(Boolean);
      const textSecondary = [ctasRef.current, statsRef.current].filter(Boolean);
      const aux = [scrollHintRef.current, quoteSideRef.current].filter(Boolean);

      // Estado base explícito para evitar "sumiço" em reload/retorno no scroll.
      gsap.set([...textPrimary, ...textSecondary, ...aux], {
        autoAlpha: 1,
        y: 0
      });

      // ── Entrada cinematográfica ──────────────────────────
      const entry = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      entry
        .fromTo(
          video,
          { scale: 1.06 },
          { scale: 1, duration: 2.5, ease: "power1.out" },
          0
        )
        // Eyebrow aparece cedo para dar feedback visual imediato
        .from(eyebrowRef.current, { autoAlpha: 0, duration: 0.8 }, 0.3)
        .from(
          headlineRef.current,
          { y: 60, autoAlpha: 0, duration: 1.3 },
          0.55
        )
        .from(
          subtitleRef.current,
          { autoAlpha: 0, y: 14, duration: 1.0 },
          1.1
        )
        .from(
          ctasRef.current,
          { autoAlpha: 0, y: 14, duration: 1.0 },
          1.45
        )
        .from(statsRef.current, { autoAlpha: 0, duration: 1.1 }, 2.0)
        .from(scrollHintRef.current, { autoAlpha: 0, duration: 1.1 }, 2.6)
        .from(quoteSideRef.current, { autoAlpha: 0, duration: 1.2 }, 2.4);

      // Bounce contínuo do scroll hint
      const bounceEl = scrollHintRef.current?.querySelector(".bounce-arrow");
      if (bounceEl) {
        gsap.to(bounceEl, {
          y: 7,
          repeat: -1,
          yoyo: true,
          duration: 1.3,
          ease: "sine.inOut",
          delay: 3.4
        });
      }

      // ── Scroll-driven video scrubbing ────────────────────
      const setupScrub = (): void => {
        const dur = video.duration;
        if (!dur) return;

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5
          }
        });

        // Scrubbing de vídeo frame a frame
        scrollTl.to(video, { currentTime: Math.max(dur - 0.04, 0), ease: "none" }, 0);

        // Texto sai com parallax e fade
        scrollTl.fromTo(
          textPrimary,
          { autoAlpha: 1, y: 0 },
          { autoAlpha: 0, y: -45, stagger: 0.04, ease: "power2.in" },
          0.52
        );
        scrollTl.fromTo(
          textSecondary,
          { autoAlpha: 1, y: 0 },
          { autoAlpha: 0, y: -24, ease: "power2.in" },
          0.62
        );
        scrollTl.fromTo(
          scrollHintRef.current,
          { autoAlpha: 1 },
          { autoAlpha: 0, ease: "power1.in" },
          0.45
        );
        scrollTl.fromTo(
          quoteSideRef.current,
          { autoAlpha: 1 },
          { autoAlpha: 0, ease: "power1.in" },
          0.5
        );

        ScrollTrigger.refresh();
      };

      if (video.readyState >= 1) {
        setupScrub();
      } else {
        video.addEventListener("loadedmetadata", setupScrub, { once: true });
      }
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    /* Altura curta para transição direta para a próxima seção */
    <div id="hero" ref={wrapperRef} className="relative h-[130vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">

        {/* Vídeo — mudo, sem controles, scrubbing via GSAP */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          src="/hero-video.mp4"
          muted
          playsInline
          preload="auto"
          aria-hidden
          tabIndex={-1}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/52" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/22 to-transparent" />

        {/* Quote lateral */}
        <div
          ref={quoteSideRef}
          aria-hidden
          className="absolute right-10 top-1/2 hidden -translate-y-1/2 -rotate-90 origin-center xl:block"
        >
          <p className="text-[9px] uppercase tracking-[0.55em] text-[var(--sand)]/28">
            {quotes[3]}
          </p>
        </div>

        {/* Conteúdo */}
        <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-6 pb-24 pt-36 md:px-10">

          {/* Eyebrow */}
          <div
            ref={eyebrowRef}
            className="mb-7 flex items-center gap-4"
          >
            <span aria-hidden className="h-px w-10 bg-[var(--sand)]/50" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-[var(--sand)]/78">
              Denis Villeneuve · 2024
            </span>
          </div>

          {/* Headline — clip reveal */}
          <div className="overflow-hidden">
            <h1
              ref={headlineRef}
              className="max-w-4xl text-balance font-serif text-5xl leading-[1.06] text-[var(--text-primary)] md:text-7xl lg:text-[5.5rem]"
            >
              O destino de Arrakis está escrito na areia.
            </h1>
          </div>

          {/* Subtítulo */}
          <p
            ref={subtitleRef}
            className="mt-7 max-w-lg text-base font-light leading-[1.75] text-[var(--text-secondary)] md:text-lg"
          >
            Viva Arrakis antes mesmo de assistir ao filme. Uma experiência
            imersiva sobre poder, profecia e sobrevivência.
          </p>

          {/* CTAs */}
          <div
            ref={ctasRef}
            className="mt-11 flex flex-wrap items-center gap-4"
          >
            {actions.map((action) =>
              action.variant === "primary" ? (
                <SmoothLink key={action.label} href={action.href}>
                  <Button
                    size="lg"
                    className="group gap-3 rounded-full border border-[var(--sand)]/25 bg-[var(--sand)] px-7 text-[13px] font-medium tracking-wide text-black transition-all duration-500 hover:bg-[var(--sand-light)] hover:shadow-[0_0_36px_rgba(200,169,110,0.28)]"
                  >
                    <Play className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5" />
                    {action.label}
                  </Button>
                </SmoothLink>
              ) : (
                <SmoothLink key={action.label} href={action.href}>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="rounded-full border border-[var(--border-strong)] bg-white/4 px-7 text-[13px] tracking-wide text-zinc-200 backdrop-blur-sm transition-all duration-500 hover:border-[var(--sand)]/30 hover:bg-white/8"
                  >
                    {action.label}
                  </Button>
                </SmoothLink>
              )
            )}
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="mt-16 flex flex-wrap items-center gap-8 border-t border-[var(--border)] pt-8"
          >
            {[
              { value: "8.5", label: "IMDb" },
              { value: "83%", label: "Rotten Tomatoes" },
              { value: "2h 46min", label: "Duração" },
              { value: "2024", label: "Lançamento" }
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="font-serif text-xl text-[var(--sand)]">
                  {stat.value}
                </span>
                <span className="text-[9px] uppercase tracking-[0.35em] text-[var(--text-muted)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          aria-hidden
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="bounce-arrow h-5 w-px bg-gradient-to-b from-[var(--sand)]/50 to-transparent" />
          <span className="text-[9px] uppercase tracking-[0.45em] text-[var(--text-muted)]">
            Role para explorar
          </span>
        </div>
      </div>
    </div>
  );
}
