"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SmoothScrollContextValue {
  scrollTo: (target: number | string, options?: { immediate?: boolean }) => void;
}

interface LenisInstance {
  destroy: () => void;
  off: (event: string, callback: (...args: unknown[]) => void) => void;
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  raf: (time: number) => void;
  scrollTo: (
    target: number | string | HTMLElement,
    options?: { immediate?: boolean; offset?: number }
  ) => void;
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
  const lenisRef = useRef<LenisInstance | null>(null);
  const reducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

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
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion || !isDesktop) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      return;
    }

    let isDisposed = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("@/lib/gsap"),
      ]);

      if (isDisposed) return;

      const lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      }) as LenisInstance;

      lenisRef.current = lenis;

      const onTick = (time: number) => {
        lenis.raf(time * 1000);
      };

      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        lenis.off("scroll", ScrollTrigger.update);
        gsap.ticker.remove(onTick);
        lenis.destroy();
        if (lenisRef.current === lenis) {
          lenisRef.current = null;
        }
      };
    })();

    return () => {
      isDisposed = true;
      cleanup?.();
    };
  }, [isDesktop, reducedMotion]);

  const value = useMemo<SmoothScrollContextValue>(
    () => ({
      scrollTo: (target, options) => {
        const anchorTarget =
          typeof target === "string" ? getAnchorTarget(target) : null;

        if (reducedMotion || !isDesktop || !lenisRef.current) {
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
    [isDesktop, reducedMotion]
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
