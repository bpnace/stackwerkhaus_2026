"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useTransition } from "@/providers/TransitionProvider";

type TransitionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

export function TransitionLink({
  href,
  children,
  className,
  onClick,
  ...props
}: TransitionLinkProps) {
  const { triggerTransition } = useTransition();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    triggerTransition(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
