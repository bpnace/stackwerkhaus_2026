import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type MagneticLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  strength?: number;
};

const EXTERNAL_LINK_PATTERN = /^(?:[a-z]+:)?\/\//i;

export function MagneticLink({
  href,
  children,
  strength,
  ...props
}: MagneticLinkProps) {
  void strength;

  if (EXTERNAL_LINK_PATTERN.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} prefetch={false} {...props}>
      {children}
    </Link>
  );
}
