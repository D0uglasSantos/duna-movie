"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type MarqueeDividerProps = {
  text: string;
  /** velocidade em segundos para percorrer o loop (padrão: 28s) */
  duration?: number;
  /** direção do movimento */
  direction?: "left" | "right";
};

export function MarqueeDivider({
  text,
  duration = 28,
  direction = "left"
}: MarqueeDividerProps): React.JSX.Element {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Metade do total = largura de um único set de itens
    const fullWidth = track.scrollWidth / 2;

    // Left:  0 → -fullWidth (repeat: pula de volta p/ 0)
    // Right: -fullWidth → 0 (repeat: pula de volta p/ -fullWidth)
    // Em ambos os casos, o conteúdo duplicado torna o loop visual imperceptível
    const fromX = direction === "right" ? -fullWidth : 0;
    const toX = direction === "right" ? 0 : -fullWidth;

    gsap.set(track, { x: fromX });

    const tween = gsap.fromTo(
      track,
      { x: fromX },
      { x: toX, duration, ease: "none", repeat: -1 }
    );

    return () => {
      tween.kill();
    };
  }, [duration, direction]);

  // Duplica o texto para loop contínuo sem gap
  const items = Array.from({ length: 6 }).map((_, i) => (
    <span
      key={i}
      className="flex shrink-0 items-center gap-6 px-3"
      aria-hidden={i > 0}
    >
      <span className="text-[10px] uppercase tracking-[0.5em] text-[var(--text-muted)]">
        {text}
      </span>
      <span className="h-1 w-1 rounded-full bg-[var(--sand)]/30" aria-hidden />
    </span>
  ));

  return (
    <div
      className="overflow-hidden border-y border-[var(--border)] py-4"
      aria-hidden
    >
      <div ref={trackRef} className="flex" style={{ willChange: "transform" }}>
        {items}
        {items}
      </div>
    </div>
  );
}
