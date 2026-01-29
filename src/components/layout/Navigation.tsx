"use client";

import { usePathname } from "next/navigation";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";
import { useTransition } from "@/providers/TransitionProvider";

export const navigationLinks = [
  { href: "#work", label: "Projekte" },
  { href: "#about", label: "Über uns" },
  { href: "#contact", label: "Kontakt" },
  { href: "#faq", label: "FAQ" },
];

type NavigationProps = {
  className?: string;
  onNavigate?: () => void;
};

export function Navigation({ className = "", onNavigate }: NavigationProps) {
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();
  const { triggerTransition } = useTransition();

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    onNavigate?.();
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const isHash = href.startsWith("#");

    if (isHash) {
      event.preventDefault();
      if (pathname === "/") {
        scrollTo(href);
      } else {
        triggerTransition(`/${href}`);
      }
      return;
    }

    event.preventDefault();
    triggerTransition(href);
  };

  return (
    <nav
      className={`flex items-center gap-6 text-xs uppercase tracking-[0.3em] ${className}`}
    >
      {navigationLinks.map((link) => (
        <a
          key={link.href}
          href={link.href.startsWith("#") ? `/${link.href}` : link.href}
          className="text-ink-soft transition-colors hover:text-foreground"
          data-cursor-text="Open"
          onClick={(event) => handleClick(event, link.href)}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
