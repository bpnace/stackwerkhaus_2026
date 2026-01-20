"use client";

import { useRef } from "react";
import SplitType from "split-type";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface TextRevealProps {
  children: string;
  type?: "chars" | "words" | "lines";
  stagger?: number;
  duration?: number;
  delay?: number;
  trigger?: "scroll" | "load";
  className?: string;
}

export function TextReveal({
  children,
  type = "chars",
  stagger = 0.02,
  duration = 0.8,
  delay = 0,
  trigger = "scroll",
  className = "",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const split = new SplitType(containerRef.current, {
        types: type === "chars" ? "chars,words" : type,
        tagName: "span",
      });

      const elements =
        type === "chars"
          ? split.chars
          : type === "words"
            ? split.words
            : split.lines;

      if (!elements) return;

      gsap.set(elements, {
        yPercent: 100,
        opacity: 0,
      });

      gsap.set(containerRef.current.querySelectorAll(".word"), {
        overflow: "hidden",
      });

      const animation = gsap.to(elements, {
        yPercent: 0,
        opacity: 1,
        duration,
        stagger,
        delay,
        ease: "power3.out",
      });

      let triggerInstance: ScrollTrigger | null = null;

      if (trigger === "scroll") {
        triggerInstance = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 85%",
          animation,
          toggleActions: "play none none none",
        });
      }

      return () => {
        triggerInstance?.kill();
        split.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
