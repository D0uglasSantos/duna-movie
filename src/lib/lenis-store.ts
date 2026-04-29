import type Lenis from "lenis";

/**
 * Singleton global da instância Lenis.
 * Permite chamar scrollTo de qualquer componente
 * sem precisar de Context/prop drilling.
 */
let _instance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null): void {
  _instance = lenis;
}

/** Scroll suave via Lenis para um anchor, elemento ou posição numérica */
export function smoothScrollTo(
  target: string | HTMLElement | number,
  duration = 1.8
): void {
  _instance?.scrollTo(target, {
    duration,
    easing: (t: number) => 1 - Math.pow(1 - t, 4)
  });
}
