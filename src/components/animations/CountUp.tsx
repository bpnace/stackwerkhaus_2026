"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CountUpProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CountUp({
  value,
  duration = 1.4,
  prefix = "",
  suffix = "",
  className = "",
}: CountUpProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const element = numberRef.current;
      if (!element) return;

      if (reducedMotion) {
        element.textContent = `${prefix}${value}${suffix}`;
        return;
      }

      const counter = { value: 0 };

      gsap.to(counter, {
        value,
        duration,
        ease: "power2.out",
        roundProps: "value",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          element.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
        },
      });
    },
    { scope: numberRef, dependencies: [duration, prefix, reducedMotion, suffix, value] }
  );

  return (
    <span ref={numberRef} className={className}>
      {prefix}{value}{suffix}
    </span>
  );
}
