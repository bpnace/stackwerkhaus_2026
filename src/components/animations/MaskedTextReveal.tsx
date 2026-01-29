"use client";

import { useRef } from "react";
import SplitType from "split-type";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MaskedTextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  lastLinePaddingEm?: number;
}

export function MaskedTextReveal({
  children,
  as: Component = "h1",
  className = "",
  lastLinePaddingEm,
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

      const lines = split.lines ?? [];
      lines.forEach((line, index) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "block";
        if (lastLinePaddingEm && index === lines.length - 1) {
          wrapper.style.paddingBottom = `${lastLinePaddingEm}em`;
          wrapper.style.marginBottom = `-${lastLinePaddingEm}em`;
        }
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
    { scope: containerRef, dependencies: [reducedMotion, lastLinePaddingEm] }
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
