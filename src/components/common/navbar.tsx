"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { SmoothLink } from "@/components/common/smooth-link";

const navLinks = [
  { label: "Sinopse", href: "#sobre" },
  { label: "Personagens", href: "#personagens" },
  { label: "Universo", href: "#universo" },
  { label: "Trailer", href: "#trailer" }
];

export function Navbar(): React.JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 72);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha menu ao redimensionar para desktop
  useEffect(() => {
    const onResize = (): void => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMenu = (): void => setOpen(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700",
        scrolled
          ? "border-b border-[var(--border)] bg-[var(--bg)]/92 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav
        role="navigation"
        aria-label="Navegação principal"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10"
      >
        {/* Logo — scroll suave para o topo */}
        <SmoothLink
          href="#hero"
          className="font-serif text-sm uppercase tracking-[0.35em] text-[var(--sand)] transition-opacity duration-300 hover:opacity-70"
        >
          Duna
        </SmoothLink>

        {/* Links desktop — todos com SmoothLink */}
        <ul className="hidden items-center gap-9 md:flex" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <SmoothLink
                href={link.href}
                className="relative text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)] transition-colors duration-500 hover:text-[var(--sand)]"
              >
                {link.label}
              </SmoothLink>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <SmoothLink
          href="#trailer"
          className="hidden rounded-full border border-[var(--border-strong)] bg-[var(--sand)]/8 px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] text-[var(--sand)] transition-all duration-500 hover:border-[var(--sand)]/40 hover:bg-[var(--sand)]/15 md:block"
        >
          Ver trailer
        </SmoothLink>

        {/* Toggle mobile */}
        <button
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] transition-colors duration-300 hover:border-[var(--border-strong)] md:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-4 w-4 text-zinc-300" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -45, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-4 w-4 text-zinc-300" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Menu mobile com AnimatePresence */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[var(--border)] bg-[var(--bg)]/96 md:hidden"
          >
            <ul
              role="list"
              className="flex flex-col divide-y divide-[var(--border)] px-6"
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                >
                  <SmoothLink
                    href={link.href}
                    onAfterClick={closeMenu}
                    className="block py-4 text-[11px] uppercase tracking-[0.3em] text-zinc-300 transition-colors duration-300 hover:text-[var(--sand)]"
                  >
                    {link.label}
                  </SmoothLink>
                </motion.li>
              ))}
            </ul>
            <div className="px-6 pb-6 pt-2">
              <SmoothLink
                href="#trailer"
                onAfterClick={closeMenu}
                className="block rounded-full border border-[var(--border-strong)] bg-[var(--sand)]/10 py-3 text-center text-[11px] uppercase tracking-[0.2em] text-[var(--sand)]"
              >
                Ver trailer
              </SmoothLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
