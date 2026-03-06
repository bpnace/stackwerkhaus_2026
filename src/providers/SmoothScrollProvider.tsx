"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SmoothScrollContextValue {
  scrollTo: (target: number | string, options?: { immediate?: boolean }) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);
const HEADER_GAP = 5;
const RELOAD_SCROLL_DRIFT_LIMIT = 80;

function isReloadNavigation() {
  const navigationEntry = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming | undefined;

  return navigationEntry?.type === "reload";
}

function resetSmallScrollDrift() {
  if (window.location.hash) return;
  if (window.scrollY <= 0 || window.scrollY >= RELOAD_SCROLL_DRIFT_LIMIT) return;

  window.scrollTo({
    top: 0,
    behavior: "auto",
  });
}

function getAnchorTarget(target: string) {
  if (!target.startsWith("#")) return null;

  const element = document.querySelector<HTMLElement>(target);
  if (!element) return null;

  const headerHeight =
    document.querySelector("header")?.getBoundingClientRect().height ?? 0;

  return {
    element,
    offset: -(headerHeight + HEADER_GAP),
  };
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isReloadNavigation()) return;

    const rafId = window.requestAnimationFrame(resetSmallScrollDrift);
    const timeoutId = window.setTimeout(resetSmallScrollDrift, 160);

    window.addEventListener("pageshow", resetSmallScrollDrift);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      window.removeEventListener("pageshow", resetSmallScrollDrift);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, [reducedMotion]);

  const value = useMemo<SmoothScrollContextValue>(
    () => ({
      scrollTo: (target, options) => {
        const anchorTarget =
          typeof target === "string" ? getAnchorTarget(target) : null;

        if (reducedMotion || !lenisRef.current) {
          if (typeof target === "number") {
            window.scrollTo({
              top: target,
              behavior: options?.immediate ? "auto" : "smooth",
            });
          } else if (anchorTarget) {
            window.scrollTo({
              top:
                anchorTarget.element.getBoundingClientRect().top +
                window.scrollY +
                anchorTarget.offset,
              behavior: options?.immediate ? "auto" : "smooth",
            });
          } else {
            const element = document.querySelector(target);
            element?.scrollIntoView({
              behavior: options?.immediate ? "auto" : "smooth",
              block: "start",
            });
          }
          return;
        }

        if (anchorTarget) {
          lenisRef.current.scrollTo(anchorTarget.element, {
            immediate: options?.immediate,
            offset: anchorTarget.offset,
          });
          return;
        }

        lenisRef.current.scrollTo(target, { immediate: options?.immediate });
      },
    }),
    [reducedMotion]
  );

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error("useSmoothScroll must be used within SmoothScrollProvider");
  }
  return context;
}
