import { Navigation } from "@/components/layout/Navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[rgba(243,239,230,0.82)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full border border-black/20" />
          <div>
            <p className="font-display text-lg uppercase tracking-[0.2em]">
              STACKWERKHAUS
            </p>
            <p className="text-[11px] uppercase tracking-[0.35em] text-ink-soft">
              Dein Berliner Design Studio
            </p>
          </div>
        </div>
        <Navigation />
      </div>
    </header>
  );
}
