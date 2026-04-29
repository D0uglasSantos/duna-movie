"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ParallaxInterlude(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const lineTopRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const attributionRef = useRef<HTMLParagraphElement>(null);
  const lineBotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // ── Parallax no fundo ────────────────────────────────
      gsap.fromTo(
        bgRef.current,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );

      // ── Elementos de texto — entrada em cascata ──────────
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 68%" }
      });

      tl.fromTo(
        lineTopRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.1, ease: "power3.out" }
      )
        .fromTo(
          quoteRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          attributionRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.0, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          lineBotRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.1, ease: "power3.out" },
          "-=0.7"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Interlúdio — Litania contra o medo"
      className="relative overflow-hidden"
      style={{ height: "100svh" }}
    >
      {/* Fundo com parallax */}
      <div
        ref={bgRef}
        aria-hidden
        className="absolute inset-x-0 -top-[12%] bottom-[-12%]"
      >
        <Image
          src="/duna4.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Gradientes de integração com as seções vizinhas */}
      <div aria-hidden className="absolute inset-0 bg-black/55" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)]"
      />

      {/* Quote centrada */}
      <div className="relative flex h-full flex-col items-center justify-center gap-6 px-6 text-center">

        <div
          ref={lineTopRef}
          aria-hidden
          style={{ opacity: 0, transformOrigin: "center" }}
          className="h-px w-16 bg-gradient-to-r from-transparent via-[var(--sand)]/45 to-transparent"
        />

        <blockquote
          ref={quoteRef}
          style={{ opacity: 0 }}
          className="max-w-xl font-serif text-2xl italic leading-[1.65] text-[var(--text-primary)] md:text-3xl lg:text-4xl"
        >
          &ldquo;Eu devo não ter medo.<br />
          O medo é o assassino da mente.&rdquo;
        </blockquote>

        <p
          ref={attributionRef}
          style={{ opacity: 0 }}
          className="text-[9px] uppercase tracking-[0.55em] text-[var(--text-muted)]"
        >
          Litania contra o medo · Bene Gesserit
        </p>

        <div
          ref={lineBotRef}
          aria-hidden
          style={{ opacity: 0, transformOrigin: "center" }}
          className="h-px w-16 bg-gradient-to-r from-transparent via-[var(--sand)]/45 to-transparent"
        />
      </div>
    </section>
  );
}
