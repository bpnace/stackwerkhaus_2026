import Link from "next/link";

export const navigationLinks = [
  { href: "#work", label: "Projekte" },
  { href: "#about", label: "Über mich" },
  { href: "#skills", label: "Leistungen" },
  { href: "#contact", label: "Kontakt" },
  { href: "#faq", label: "FAQ" },
];

type NavigationProps = {
  className?: string;
  onNavigate?: () => void;
};

export function Navigation({ className = "", onNavigate }: NavigationProps) {
  return (
    <nav
      className={`flex items-center gap-6 text-xs uppercase tracking-[0.3em] ${className}`}
    >
      {navigationLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-ink-soft transition-colors hover:text-foreground"
          data-cursor-text="Open"
          onClick={onNavigate}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
