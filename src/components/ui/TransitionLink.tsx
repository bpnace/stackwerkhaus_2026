"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition } from "@/providers/TransitionProvider";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import {
  getTransitionNavigationDecision,
  isBypassHref,
} from "@/components/ui/transition-link-routing";

type TransitionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  prefetch?: boolean;
};

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

  if (href.startsWith("#") || isBypassHref(href)) {
    return (
      <a href={href} onClick={onClick} target={target} rel={rel} {...props}>
        {children}
      </a>
    );
  }

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) return;
    const decision = getTransitionNavigationDecision({
      href,
      currentOrigin: window.location.origin,
      currentPathname: pathname,
      currentSearch: window.location.search,
      target,
      isModifiedEvent: isModifiedEvent(event),
    });

    if (decision.kind === "bypass" || decision.kind === "same-page-hash") {
      return;
    }

    if (decision.kind === "noop") {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    triggerTransition(decision.href);
  };

  return (
    <Link
      href={href}
      prefetch={prefetch}
      onClick={handleClick}
      target={target}
      rel={rel}
      {...props}
    >
      {children}
    </Link>
  );
}
