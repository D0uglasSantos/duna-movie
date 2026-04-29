"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type QuotesSectionProps = {
  quotes: string[];
};

export function QuotesSection({ quotes }: QuotesSectionProps): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const blocks = section.querySelectorAll("[data-quote]");

      gsap.fromTo(
        blocks,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%" }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-36"
    >
      <div
        aria-hidden
        className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[var(--border)] to-transparent"
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-14 md:grid-cols-2">
          {quotes.map((quote, i) => (
            <blockquote
              key={quote}
              data-quote
              style={{ opacity: 0 }}
              className={[
                "flex flex-col gap-5",
                i % 2 !== 0 ? "md:mt-20" : ""
              ].join(" ")}
            >
              <span aria-hidden className="font-serif text-5xl leading-none text-[var(--sand)]/18">
                &ldquo;
              </span>
              <p className="font-serif text-xl font-light leading-[1.6] text-zinc-200 md:text-2xl">
                {quote}
              </p>
              <span aria-hidden className="h-px w-10 bg-[var(--sand)]/35" />
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
