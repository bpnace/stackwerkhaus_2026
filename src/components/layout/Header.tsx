import { TransitionLink } from "@/components/ui/TransitionLink";
import { Navigation } from "@/components/layout/Navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[rgba(243,239,230,0.9)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-start justify-between gap-4 px-6 py-4 md:items-center md:px-10">
        <TransitionLink
          href="/#top"
          className="inline-flex flex-col gap-1 text-foreground transition-opacity hover:opacity-90"
        >
          <p className="font-display text-[11px] font-bold uppercase leading-none tracking-[0.3em] md:text-[28px] md:tracking-[0.34em]">
            STACKWERKHAUS
          </p>
          <p className="text-[9px] uppercase tracking-[0.26em] text-ink-soft sm:text-[10px] sm:tracking-[0.32em] md:text-[11px] md:tracking-[0.36em]">
            Deine digitalen Architekten.
          </p>
        </TransitionLink>

        <div className="flex flex-col items-end gap-2 md:flex-row md:items-center md:gap-8">
          <Navigation className="hidden md:flex" />
          <Navigation className="md:hidden" variant="mobile" />
        </div>
      </div>
    </header>
  );
}
