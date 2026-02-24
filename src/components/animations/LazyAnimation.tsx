"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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
  fallback = null,
  className = "",
  rootMargin = "0px 0px -15% 0px",
  threshold = 0.1,
  eagerOnMobile = false,
}: LazyAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const reducedMotion = useReducedMotion();
  const isActive = reducedMotion || isIntersecting || (eagerOnMobile && isMobile);

  useEffect(() => {
    if (eagerOnMobile) {
      const media = window.matchMedia("(pointer: coarse)");
      setIsMobile(media.matches);
    }
  }, [eagerOnMobile]);

  useEffect(() => {
    if (reducedMotion || (eagerOnMobile && isMobile)) return;

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion, rootMargin, threshold, eagerOnMobile, isMobile]);

  return (
    <div ref={containerRef} className={className}>
      {isActive ? children : fallback}
    </div>
  );
}
