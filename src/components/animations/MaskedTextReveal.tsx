"use client";

import { useRef } from "react";
import SplitType from "split-type";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MaskedTextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
}

export function MaskedTextReveal({
  children,
  as: Component = "h1",
  className = "",
}: MaskedTextRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!containerRef.current || reducedMotion) return;

      const split = new SplitType(containerRef.current, {
        types: "lines,words",
        tagName: "span",
      });

      split.lines?.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "block";
        line.parentNode?.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      gsap.set(split.lines, {
        yPercent: 100,
      });

      gsap.to(split.lines, {
        yPercent: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      return () => split.revert();
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <Component
      ref={(node: HTMLElement | null) => {
        containerRef.current = node;
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
