import Link from "next/link";

const links = [
  { href: "#about", label: "Über mich" },
  { href: "#skills", label: "Leistungen" },
  { href: "#work", label: "Projekte" },
  { href: "#contact", label: "Kontakt" },
];

export function Navigation() {
  return (
    <nav className="flex items-center gap-6 text-xs uppercase tracking-[0.3em]">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-ink-soft transition-colors hover:text-foreground"
          data-cursor-text="Open"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
