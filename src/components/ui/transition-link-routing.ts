const EXTERNAL_LINK_PATTERN = /^(?:[a-z]+:)?\/\//i;

export type TransitionNavigationDecision =
  | { kind: "bypass" }
  | { kind: "same-page-hash"; href: string }
  | { kind: "transition"; href: string }
  | { kind: "noop"; href: string };

type TransitionNavigationInput = {
  href: string;
  currentOrigin: string;
  currentPathname: string;
  currentSearch: string;
  target?: string;
  isModifiedEvent?: boolean;
};

export function isBypassHref(href: string) {
  return (
    EXTERNAL_LINK_PATTERN.test(href) ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

export function getTransitionNavigationDecision({
  href,
  currentOrigin,
  currentPathname,
  currentSearch,
  target,
  isModifiedEvent = false,
}: TransitionNavigationInput): TransitionNavigationDecision {
  if (isModifiedEvent) {
    return { kind: "bypass" };
  }

  if (target && target !== "_self") {
    return { kind: "bypass" };
  }

  if (isBypassHref(href)) {
    return { kind: "bypass" };
  }

  const currentUrl = `${currentOrigin}${currentPathname}${currentSearch}`;
  const url = new URL(href, currentUrl);
  const resolvedHref = `${url.pathname}${url.search}${url.hash}`;
  const samePathAndSearch =
    url.pathname === currentPathname && url.search === currentSearch;

  if (url.hash && samePathAndSearch) {
    return { kind: "same-page-hash", href: resolvedHref };
  }

  if (samePathAndSearch) {
    return { kind: "noop", href: resolvedHref };
  }

  return { kind: "transition", href: resolvedHref };
}
