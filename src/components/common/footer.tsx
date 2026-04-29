import Link from "next/link";

const footerLinks = [
  { label: "Sinopse", href: "#sobre" },
  { label: "Personagens", href: "#personagens" },
  { label: "Universo", href: "#universo" },
  { label: "Trailer", href: "#trailer" }
];

export function Footer(): React.JSX.Element {
  return (
    <footer
      role="contentinfo"
      className="border-t border-[var(--border)] px-6 py-10 md:px-10"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        {/* Brand */}
        <div className="flex flex-col gap-1.5">
          <span className="font-serif text-sm uppercase tracking-[0.35em] text-[var(--sand)]">
            Duna
          </span>
          <span className="text-[11px] text-[var(--text-muted)]">
            Parte 2 · Denis Villeneuve · 2024
          </span>
        </div>

        {/* Links */}
        <nav aria-label="Links do rodapé">
          <ul className="flex flex-wrap gap-6" role="list">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)] transition-colors duration-400 hover:text-[var(--sand)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Legal */}
        <p className="text-[11px] leading-[1.6] text-[var(--text-muted)]">
          Projeto de portfólio.
          <br />
          Direitos do conteúdo © Warner Bros. Entertainment.
        </p>
      </div>
    </footer>
  );
}
