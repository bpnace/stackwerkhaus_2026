"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { TransitionLink } from "@/components/ui/TransitionLink";

type MagneticLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  strength?: number;
};

export function MagneticLink({
  href,
  children,
  strength,
  className = "",
  ...props
}: MagneticLinkProps) {
  void strength;

  return (
    <TransitionLink href={href} className={className} {...props}>
      {children}
    </TransitionLink>
  );
}
