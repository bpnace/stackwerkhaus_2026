import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type TransitionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

const EXTERNAL_LINK_PATTERN = /^(?:[a-z]+:)?\/\//i;

export function TransitionLink({
  href,
  children,
  ...props
}: TransitionLinkProps) {
  if (EXTERNAL_LINK_PATTERN.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
