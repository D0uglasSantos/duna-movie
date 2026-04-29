"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type GallerySectionProps = {
  images: string[];
};

export function GallerySection({ images }: GallerySectionProps): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!section || !pin || !track) return;

    let tween: gsap.core.Tween | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let refreshHandler: (() => void) | null = null;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        eyebrowRef.current,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 82%" }
        }
      );

      gsap.fromTo(
        headingRef.current,
        { y: 48, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%" }
        }
      );

      gsap.fromTo(
        hintRef.current,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 70%" }
        }
      );

      const createHorizontalScroll = (): void => {
        tween?.scrollTrigger?.kill();
        tween?.kill();

        const distance = Math.max(track.scrollWidth - pin.clientWidth, 0);
        gsap.set(track, { x: 0 });
        if (distance <= 0) return;

        tween = gsap.to(track, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance + window.innerHeight * 0.45}`,
            scrub: 1.15,
            pin,
            invalidateOnRefresh: true,
            anticipatePin: 1
          }
        });
      };

      createHorizontalScroll();
      refreshHandler = createHorizontalScroll;
      ScrollTrigger.addEventListener("refreshInit", refreshHandler);

      resizeObserver = new ResizeObserver(() => {
        createHorizontalScroll();
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(pin);
      resizeObserver.observe(track);
    }, section);

    return () => {
      if (refreshHandler) {
        ScrollTrigger.removeEventListener("refreshInit", refreshHandler);
      }
      resizeObserver?.disconnect();
      tween?.scrollTrigger?.kill();
      tween?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div ref={pinRef} className="overflow-hidden px-6 py-28 md:py-40 md:px-10">
        <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <span
            ref={eyebrowRef}
            style={{ opacity: 0 }}
            className="text-[10px] uppercase tracking-[0.5em] text-[var(--sand)]/65"
          >
            Galeria
          </span>
          <div className="overflow-hidden">
            <h2
              ref={headingRef}
              style={{ opacity: 0 }}
              className="mt-3 max-w-xl font-serif text-3xl text-[var(--text-primary)] md:text-5xl"
            >
              Visuais que ampliam a escala épica.
            </h2>
          </div>
        </div>

        {/* Scroll horizontal guiado pelo scroll vertical da página */}
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--bg)] to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--bg)] to-transparent"
          />
          <div className="overflow-hidden pb-4">
            <div ref={trackRef} className="flex w-max gap-4 will-change-transform">
          {images.map((image, index) => (
            <figure
              key={image}
              data-gallery-card
              className="group relative flex-none overflow-hidden rounded-2xl border border-[var(--border)]"
              style={{
                width: "clamp(240px, 30vw, 400px)",
                height: "clamp(180px, 22vw, 300px)"
              }}
            >
              <Image
                src={image}
                alt={`Frame cinematográfico ${index + 1} — universo de Duna`}
                fill
                className="object-cover transition-transform duration-[900ms] ease-out will-change-transform group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 80vw, 30vw"
              />
              {/* Overlay sutil no hover */}
              <div className="absolute inset-0 bg-[var(--sand)]/0 transition-colors duration-700 group-hover:bg-[var(--sand)]/4" />

              {/* Numeração discreta */}
              <div className="absolute bottom-3 right-4 text-[10px] uppercase tracking-[0.3em] text-white/30">
                {String(index + 1).padStart(2, "0")}
              </div>
            </figure>
          ))}
            </div>
          </div>
        </div>

        {/* Hint */}
        <p
          ref={hintRef}
          style={{ opacity: 0 }}
          className="mt-5 text-[10px] uppercase tracking-[0.35em] text-[var(--text-muted)]"
        >
          Continue rolando para explorar →
        </p>
        </div>
      </div>
    </section>
  );
}
