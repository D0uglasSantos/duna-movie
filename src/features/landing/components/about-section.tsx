"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type AboutSectionProps = {
  synopsis: string;
};

export function AboutSection({ synopsis }: AboutSectionProps): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Linha vertical anima de baixo para cima ao entrar
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%" }
        }
      );

      // Eyebrow
      gsap.fromTo(
        eyebrowRef.current,
        { opacity: 0, x: -18 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%" }
        }
      );

      // Parágrafo — cada palavra revela com blur + fade
      const words = textRef.current?.querySelectorAll("span") ?? [];
      gsap.fromTo(
        words,
        { opacity: 0.08, filter: "blur(5px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.75,
          stagger: 0.024,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 78%"
          }
        }
      );

      // Citação
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: quoteRef.current, start: "top 85%" }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const words = synopsis.split(" ");

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="relative px-6 py-28 md:py-40 md:px-10"
    >
      {/* Linha vertical — animada por GSAP */}
      <div
        ref={lineRef}
        aria-hidden
        className="absolute left-6 top-0 h-full w-px origin-top bg-gradient-to-b from-transparent via-[var(--border)] to-transparent md:left-10"
        style={{ transform: "scaleY(0)" }}
      />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 md:grid-cols-[240px_1fr] lg:grid-cols-[300px_1fr]">

          {/* Coluna esquerda */}
          <div
            ref={eyebrowRef}
            style={{ opacity: 0 }}
            className="flex flex-col gap-5 pt-1"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-[var(--sand)]/65">
              Sinopse
            </span>
            <span aria-hidden className="h-px w-10 bg-[var(--sand)]/35" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--text-muted)]">
              Duna · Parte 2 · 2024
            </span>
          </div>

          {/* Coluna direita */}
          <div className="max-w-3xl">
            <p
              ref={textRef}
              className="font-serif text-2xl leading-[1.58] text-zinc-200 md:text-3xl lg:text-4xl"
            >
              {words.map((word, i) => (
                <span
                  key={`w-${i}`}
                  className="mr-[0.26em] inline-block"
                  style={{ opacity: 0.08 }}
                >
                  {word}
                </span>
              ))}
            </p>

            {/* Citação */}
            <blockquote
              ref={quoteRef}
              style={{ opacity: 0 }}
              className="mt-12 border-l-2 border-[var(--sand)]/40 pl-6"
            >
              <p className="text-base font-light italic leading-[1.7] text-[var(--sand)]/75 md:text-lg">
                &ldquo;A repressão só faz a religião florescer.&rdquo;
              </p>
              <cite className="mt-3 block text-[10px] uppercase not-italic tracking-[0.35em] text-[var(--text-muted)]">
                — Denis Villeneuve
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
