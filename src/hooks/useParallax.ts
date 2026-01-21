"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useResponsiveAnimation } from "@/hooks/useResponsiveAnimation";

interface ParallaxOptions {
  speed?: number;
  direction?: "vertical" | "horizontal";
}

export function useParallax(options: ParallaxOptions = {}) {
  const { speed = 0.12, direction = "vertical" } = options;
  const elementRef = useRef<HTMLDivElement | null>(null);
  const { isEnabled } = useResponsiveAnimation({ minWidth: 900 });

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !isEnabled) {
      if (element) {
        gsap.set(element, { clearProps: "transform" });
      }
      return;
    }

    const property = direction === "vertical" ? "yPercent" : "xPercent";
    const movement = speed * 100;

    const tween = gsap.to(element, {
      [property]: movement,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [direction, isEnabled, speed]);

  return elementRef;
}
