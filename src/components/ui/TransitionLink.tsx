"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition } from "@/providers/TransitionProvider";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

type TransitionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  prefetch?: boolean;
};

const EXTERNAL_LINK_PATTERN = /^(?:[a-z]+:)?\/\//i;

function isModifiedEvent(event: MouseEvent<HTMLAnchorElement>) {
  return (
    event.metaKey ||
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.button !== 0
  );
}

export function TransitionLink({
  href,
  children,
  onClick,
  prefetch,
  target,
  rel,
  ...props
}: TransitionLinkProps) {
  const pathname = usePathname();
  const { triggerTransition } = useTransition();

  if (
    href.startsWith("#") ||
    EXTERNAL_LINK_PATTERN.test(href) ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return (
      <a href={href} onClick={onClick} target={target} rel={rel} {...props}>
        {children}
      </a>
    );
  }

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) return;
    if (target && target !== "_self") return;
    if (isModifiedEvent(event)) return;

    const url = new URL(href, window.location.origin);
    if (url.hash) {
      return;
    }

    const samePathAndSearch =
      url.pathname === pathname && url.search === window.location.search;

    if (samePathAndSearch) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    triggerTransition(`${url.pathname}${url.search}${url.hash}`);
  };

  return (
    <Link
      href={href}
      prefetch={prefetch ?? false}
      onClick={handleClick}
      target={target}
      rel={rel}
      {...props}
    >
      {children}
    </Link>
  );
}
