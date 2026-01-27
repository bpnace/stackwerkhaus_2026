"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";
import { Navigation } from "@/components/layout/Navigation";

export function Header() {
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;
    event.preventDefault();
    scrollTo(0, { immediate: true });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[rgba(243,239,230,0.82)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <Link href="/#top" className="flex items-center gap-4" onClick={handleLogoClick}>
          <Image
            src="/images/logos/skwkhs.svg"
            alt="STACKWERKHAUS"
            width={40}
            height={40}
            className="h-10 w-20"
          />
          <div>
            <p className="font-display font-bold text-lg uppercase tracking-[0.2em]">
              STACKWERKHAUS
            </p>
            <p className="text-[11px] uppercase tracking-[0.35em] text-ink-soft">
              Dein Berliner Design Studio
            </p>
          </div>
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
