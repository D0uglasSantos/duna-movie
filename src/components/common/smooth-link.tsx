"use client";

import type { ReactNode } from "react";

import { smoothScrollTo } from "@/lib/lenis-store";

type SmoothLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Callback opcional após acionar o scroll (ex: fechar menu) */
  onAfterClick?: () => void;
};

/**
 * Substitui <Link href="#section"> para anchor links.
 * Intercepta o clique e delega ao Lenis para scroll suave.
 */
export function SmoothLink({
  href,
  children,
  className,
  onAfterClick
}: SmoothLinkProps): React.JSX.Element {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    if (href.startsWith("#")) {
      e.preventDefault();
      smoothScrollTo(href);
    }
    onAfterClick?.();
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
