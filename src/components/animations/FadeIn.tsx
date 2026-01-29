"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface FadeInProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  trigger?: "scroll" | "load";
  className?: string;
}

export function FadeIn({
  children,
  direction = "up",
  distance = 50,
  duration = 1,
  delay = 0,
  stagger = 0,
  trigger = "scroll",
  className = "",
}: FadeInProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const element = containerRef.current;
      if (!element || reducedMotion) return;

      const directionMap = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
        none: {},
      } as const;

      const targets = stagger ? element.children : [element];

      const vars = {
        opacity: 0,
        ...directionMap[direction],
        duration,
        delay,
        stagger,
        ease: "power3.out",
        ...(trigger === "scroll"
          ? {
              scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          : {}),
      };

      gsap.from(targets, vars);
    },
    { scope: containerRef, dependencies: [reducedMotion, trigger] }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
