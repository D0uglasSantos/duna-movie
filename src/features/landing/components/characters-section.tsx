"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { Character } from "@/types/content";

type CharacterCardProps = {
  character: Character;
};

function CharacterCard({ character }: CharacterCardProps): React.JSX.Element {
  return (
    <article
      data-char-card
      className="group relative cursor-default overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
      style={{ opacity: 0, transform: "translateY(36px)" }}
    >
      {/* Imagem */}
      <div className="relative h-[320px] overflow-hidden">
        <Image
          src={character.image}
          alt={`${character.name} — ${character.faction}`}
          fill
          className="object-cover object-top transition-transform duration-[1000ms] ease-out will-change-transform group-hover:scale-[1.05]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/40 to-transparent" />
      </div>

      {/* Info */}
      <div className="p-6">
        <span className="text-[10px] uppercase tracking-[0.32em] text-[var(--sand)]/65">
          {character.faction}
        </span>
        <h3 className="mt-2 font-serif text-2xl leading-tight text-[var(--text-primary)]">
          {character.name}
        </h3>
        <p className="mt-3 text-[13px] leading-[1.7] text-[var(--text-secondary)]">
          {character.motivation}
        </p>
      </div>

      {/* Linha de destaque no hover */}
      <div className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[var(--sand)]/80 via-[var(--ember)]/60 to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100" />

      {/* Glow ring */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-[var(--sand)]/20 transition-opacity duration-700 group-hover:opacity-100" />
    </article>
  );
}

type CharactersSectionProps = {
  characters: Character[];
};

export function CharactersSection({
  characters
}: CharactersSectionProps): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header
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
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%" }
        }
      );

      gsap.fromTo(
        descRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%" }
        }
      );

      // Cards com stagger GSAP
      const cards = section.querySelectorAll("[data-char-card]");
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.querySelector(".char-grid"),
          start: "top 82%"
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="personagens"
      ref={sectionRef}
      className="px-6 py-28 md:py-40 md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 flex items-end justify-between gap-6">
          <div>
            <span
              ref={eyebrowRef}
              style={{ opacity: 0 }}
              className="text-[10px] uppercase tracking-[0.5em] text-[var(--sand)]/65"
            >
              Personagens
            </span>
            <div className="overflow-hidden">
              <h2
                ref={headingRef}
                style={{ opacity: 0 }}
                className="mt-3 max-w-xl font-serif text-3xl text-[var(--text-primary)] md:text-5xl"
              >
                Alianças frágeis, motivações brutais.
              </h2>
            </div>
          </div>
          <p
            ref={descRef}
            style={{ opacity: 0 }}
            className="hidden max-w-[220px] text-right text-[13px] leading-[1.7] text-[var(--text-muted)] md:block"
          >
            Cada personagem carrega um peso que pode mudar o destino da galáxia.
          </p>
        </div>

        {/* Grid */}
        <div className="char-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {characters.map((character) => (
            <CharacterCard key={character.name} character={character} />
          ))}
        </div>
      </div>
    </section>
  );
}
