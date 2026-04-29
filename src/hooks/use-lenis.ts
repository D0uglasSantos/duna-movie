"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { setLenisInstance } from "@/lib/lenis-store";

/**
 * Inicializa Lenis com integração oficial ao GSAP ticker.
 * Armazena a instância globalmente via lenis-store para que
 * qualquer componente possa chamar smoothScrollTo().
 */
export function useLenis(): void {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.4,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.8
    });

    // Expõe a instância globalmente
    setLenisInstance(lenis);

    // Sincroniza scroll do Lenis com o ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // GSAP ticker conduz o Lenis (padrão oficial Lenis)
    const tickerFn = (time: number): void => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      setLenisInstance(null);
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
    };
  }, []);
}
