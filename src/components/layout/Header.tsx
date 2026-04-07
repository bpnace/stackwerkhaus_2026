import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { LogoLockup } from "@/components/layout/LogoLockup";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[rgba(243,239,230,0.9)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="flex items-center gap-4">
          <LogoLockup className="shrink-0" />
          <div className="hidden md:block">
            <p className="text-[11px] uppercase tracking-[0.35em] text-ink-soft">
              Deine digitalen Architekten.
            </p>
          </div>
        </Link>

        <Navigation className="hidden md:flex" />
        <nav
          className="flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] md:hidden"
          aria-label="Mobile Navigation"
        >
          <Link href="/leistungen" className="text-ink-soft hover:text-foreground">
            Leistungen
          </Link>
          <Link href="/work" className="text-ink-soft hover:text-foreground">
            Projekte
          </Link>
          <Link href="/#contact" className="text-ink-soft hover:text-foreground">
            Kontakt
          </Link>
        </nav>
      </div>
    </header>
  );
}
