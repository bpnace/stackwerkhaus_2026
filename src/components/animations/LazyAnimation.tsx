import type { ReactNode } from "react";

interface LazyAnimationProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
  eagerOnMobile?: boolean;
}

export function LazyAnimation({
  children,
  className = "",
}: LazyAnimationProps) {
  return <div className={className}>{children}</div>;
}
