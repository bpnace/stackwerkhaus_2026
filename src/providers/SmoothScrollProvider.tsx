"use client";

import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SmoothScrollContextValue {
  scrollTo: (target: number | string, options?: { immediate?: boolean }) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useReducedMotion();

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
        if (reducedMotion || !lenisRef.current) {
          if (typeof target === "number") {
            window.scrollTo({
              top: target,
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
