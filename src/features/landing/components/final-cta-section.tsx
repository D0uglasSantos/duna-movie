"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SmoothLink } from "@/components/common/smooth-link";

const waitlistSchema = z.object({
  email: z.email("Digite um e-mail válido.")
});

type WaitlistData = z.infer<typeof waitlistSchema>;

export function FinalCtaSection(): React.JSX.Element {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm<WaitlistData>({ resolver: zodResolver(waitlistSchema) });

  const onSubmit = async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    reset();
  };

  return (
    <section
      ref={ref}
      aria-labelledby="cta-heading"
      className="relative overflow-hidden px-6 py-28 md:py-40 md:px-10"
    >
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 h-[600px] w-[900px] -translate-x-1/2 translate-y-1/3 rounded-full bg-[var(--ember)]/6 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/70 px-8 py-16 text-center backdrop-blur-sm md:px-16 md:py-24"
        >
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.25 }}
            className="text-[10px] uppercase tracking-[0.5em] text-[var(--sand)]/60"
          >
            Sua jornada começa aqui
          </motion.span>

          {/* Headline */}
          <div className="overflow-hidden">
            <motion.h2
              id="cta-heading"
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-5 max-w-3xl text-balance font-serif text-3xl text-[var(--text-primary)] md:text-5xl"
            >
              Entre em Arrakis e descubra o que está em jogo.
            </motion.h2>
          </div>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.55, ease: "easeOut" }}
            className="mx-auto mt-6 max-w-xl text-[15px] font-light leading-[1.75] text-[var(--text-secondary)]"
          >
            O confronto que definirá o futuro do império não espera por ninguém.
            Escolha seu lado antes que a areia decida por você.
          </motion.p>

          {/* CTAs principais */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <SmoothLink href="#trailer">
              <Button
                size="lg"
                className="gap-2.5 rounded-full border border-[var(--sand)]/25 bg-[var(--sand)] px-8 text-[13px] font-medium tracking-wide text-black transition-all duration-500 hover:bg-[var(--sand-light)] hover:shadow-[0_0_40px_rgba(200,169,110,0.22)]"
              >
                Assistir agora <ArrowRight className="h-4 w-4" />
              </Button>
            </SmoothLink>
            <SmoothLink href="#hero">
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full border border-[var(--border-strong)] bg-white/4 px-8 text-[13px] tracking-wide text-zinc-200 backdrop-blur-sm transition-all duration-500 hover:border-[var(--sand)]/30 hover:bg-white/8"
              >
                Explorar mais filmes
              </Button>
            </SmoothLink>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.9 }}
            aria-hidden
            className="mx-auto mt-12 h-px w-32 origin-center bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent"
          />

          {/* Form de captura */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.05, ease: "easeOut" }}
            className="mt-8"
          >
            <p className="mb-5 text-[11px] uppercase tracking-[0.4em] text-[var(--text-muted)]">
              Receba novidades de Arrakis
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto flex max-w-sm flex-col gap-3 sm:flex-row"
              noValidate
            >
              <Input
                type="email"
                placeholder="seu@email.com"
                aria-label="Endereço de e-mail"
                className="rounded-full border-[var(--border)] bg-white/5 text-center placeholder:text-[var(--text-muted)] sm:text-left"
                {...register("email")}
              />
              <Button
                type="submit"
                variant="secondary"
                disabled={isSubmitting}
                className="shrink-0 rounded-full border-[var(--border-strong)] bg-white/5 px-6 text-[13px] text-zinc-200 transition-all duration-500 hover:bg-white/10 disabled:opacity-50"
              >
                {isSubmitting ? "Enviando…" : "Inscrever"}
              </Button>
            </form>

            {/* Feedback */}
            {errors.email ? (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-[13px] text-red-400/90"
              >
                {errors.email.message}
              </motion.p>
            ) : null}
            {isSubmitSuccessful ? (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-[13px] text-[var(--sand)]/75"
              >
                Feito. Você receberá novidades em primeira mão.
              </motion.p>
            ) : null}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
