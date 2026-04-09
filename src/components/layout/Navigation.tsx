import { TransitionLink } from "@/components/ui/TransitionLink";

export const navigationLinks = [
  { href: "/#services", label: "Leistungen" },
  { href: "/work", label: "Projekte" },
  { href: "/#about", label: "Über uns" },
  { href: "/#contact", label: "Kontakt" },
  { href: "/#faq", label: "FAQ" },
];

type NavigationProps = {
  className?: string;
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
};

export function Navigation({
  className = "",
  onNavigate,
  variant = "desktop",
}: NavigationProps) {
  const isMobile = variant === "mobile";

  return (
    <nav
      className={`flex flex-wrap items-center ${
        isMobile ? "justify-end gap-x-3 gap-y-2" : "gap-6"
      } ${className}`}
      aria-label="Hauptnavigation"
    >
      {navigationLinks.map((link) => (
        <TransitionLink
          key={link.href}
          href={link.href}
          className={
            isMobile
              ? "inline-flex items-center text-[10px] uppercase tracking-[0.22em] text-ink-soft transition-colors hover:text-foreground"
              : "nav-link text-xs uppercase tracking-[0.3em] text-ink-soft transition-colors hover:text-foreground"
          }
          onClick={onNavigate}
        >
          <span className={isMobile ? "whitespace-nowrap" : "nav-link__label"}>
            {link.label}
          </span>
          {!isMobile ? (
            <span className="nav-link__line" aria-hidden="true" />
          ) : null}
        </TransitionLink>
      ))}
    </nav>
  );
}
