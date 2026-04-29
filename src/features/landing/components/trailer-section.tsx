"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play } from "lucide-react";

export function TrailerSection(): React.JSX.Element {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [playing, setPlaying] = useState(false);

  return (
    <section id="trailer" ref={ref} className="px-6 py-28 md:py-40 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header em grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.9 }}
              className="text-[10px] uppercase tracking-[0.5em] text-[var(--sand)]/65"
            >
              Trailer Oficial
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-3 font-serif text-3xl text-[var(--text-primary)] md:text-5xl"
              >
                Assista ao conflito tomar forma.
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.95, delay: 0.28, ease: "easeOut" }}
            className="text-[15px] leading-[1.7] text-[var(--text-secondary)] md:text-right"
          >
            Uma prévia intensa da batalha entre casas, crenças e destino. O
            futuro do império se decide nas dunas de Arrakis.
          </motion.p>
        </div>

        {/* Player */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.99 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
        >
          <div className="relative aspect-video w-full">
            {playing ? (
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/Way9Dexny3w?autoplay=1&rel=0&modestbranding=1&color=white"
                title="Trailer Oficial — Duna: Parte 2"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <div className="relative h-full w-full">
                {/* Thumbnail */}
                <div
                  role="img"
                  aria-label="Thumbnail do trailer de Duna Parte 2"
                  className="h-full w-full bg-cover bg-center transition-transform duration-[1200ms] ease-out"
                  style={{
                    backgroundImage:
                      "url(https://img.youtube.com/vi/Way9Dexny3w/maxresdefault.jpg)"
                  }}
                />
                <div className="absolute inset-0 bg-black/45" />

                {/* Botão play custom */}
                <button
                  onClick={() => setPlaying(true)}
                  aria-label="Assistir trailer oficial de Duna Parte 2"
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-[var(--sand)]/35 bg-black/55 backdrop-blur-md transition-all duration-500 hover:border-[var(--sand)]/60 hover:bg-black/70 hover:shadow-[0_0_40px_rgba(200,169,110,0.18)]"
                  >
                    <Play className="h-6 w-6 translate-x-0.5 text-[var(--sand)]" />
                  </motion.div>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--sand)]/50">
                    Reproduzir trailer
                  </span>
                </button>

                {/* Badge */}
                <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-[var(--border)] bg-black/65 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[var(--sand)]/70 backdrop-blur-sm">
                  <Play className="h-2.5 w-2.5" />
                  Trailer Oficial 2024
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
