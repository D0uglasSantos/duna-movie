"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { UniverseItem } from "@/types/content";

type UniverseCardProps = {
  item: UniverseItem;
  isLarge: boolean;
};

function UniverseCard({ item, isLarge }: UniverseCardProps): React.JSX.Element {
  return (
    <article
      data-universe-card
      className={[
        "group relative overflow-hidden rounded-2xl border border-[var(--border)]",
        isLarge ? "md:col-span-2 md:row-span-2" : ""
      ].join(" ")}
      style={{ opacity: 0, transform: "translateY(28px)" }}
    >
      <div className={`relative ${isLarge ? "h-[400px] md:h-full" : "h-[210px]"}`}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-[1100ms] ease-out will-change-transform group-hover:scale-[1.04]"
          sizes={isLarge ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/35 to-transparent" />
        <div className="absolute inset-0 bg-[var(--ember)]/0 transition-colors duration-700 group-hover:bg-[var(--ember)]/7" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3
          className={[
            "mt-1.5 font-serif leading-tight text-[var(--text-primary)]",
            isLarge ? "text-3xl md:text-4xl" : "text-xl"
          ].join(" ")}
        >
          {item.title}
        </h3>
        <p
          className={[
            "mt-2.5 leading-[1.65] text-[var(--text-secondary)]",
            isLarge ? "text-[15px] md:max-w-sm" : "text-[13px]"
          ].join(" ")}
        >
          {item.description}
        </p>
      </div>
    </article>
  );
}

type UniverseSectionProps = {
  items: UniverseItem[];
};

export function UniverseSection({ items }: UniverseSectionProps): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        eyebrowRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%" }
        }
      );

      gsap.fromTo(
        headingRef.current,
        { y: 55, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%" }
        }
      );

      // Cards com stagger
      const cards = section.querySelectorAll("[data-universe-card]");
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.querySelector(".universe-grid"),
          start: "top 82%"
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="universo"
      ref={sectionRef}
      className="px-6 py-28 md:py-40 md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14">
          <span
            ref={eyebrowRef}
            style={{ opacity: 0 }}
            className="text-[10px] uppercase tracking-[0.5em] text-[var(--sand)]/65"
          >
            Universo
          </span>
          <div className="overflow-hidden">
            <h2
              ref={headingRef}
              style={{ opacity: 0 }}
              className="mt-3 max-w-2xl font-serif text-3xl text-[var(--text-primary)] md:text-5xl"
            >
              Arrakis é mais do que um planeta — é um teste.
            </h2>
          </div>
        </div>

        <div className="universe-grid grid gap-4 md:h-[580px] md:grid-cols-3 md:grid-rows-2">
          {items.map((item, index) => (
            <UniverseCard
              key={item.title}
              item={item}
              isLarge={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
