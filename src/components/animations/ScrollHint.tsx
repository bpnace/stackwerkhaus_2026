"use client";

import { useRef } from "react";
import clsx from "clsx";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrollHintProps {
  className?: string;
  label?: string;
}

export function ScrollHint({ className = "", label = "Scroll" }: ScrollHintProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const trackRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const tracks = trackRefs.current.filter(
        (node): node is HTMLSpanElement => Boolean(node)
      );
      if (!tracks.length || reducedMotion) return;

      const tweens: gsap.core.Tween[] = [];

      tracks.forEach((track, index) => {
        const firstLine = track.firstElementChild as HTMLElement | null;
        const lineHeight = firstLine?.getBoundingClientRect().height ?? 0;
        if (!lineHeight) return;

        gsap.set(track, { y: 0 });
        tweens.push(
          gsap.to(track, {
            y: -lineHeight,
            duration: 0.7,
            ease: "power2.out",
            repeat: -1,
            repeatDelay: 2.8,
            delay: index * 0.06,
          })
        );
      });

      return () => {
        tweens.forEach((tween) => tween.kill());
      };
    },
    { scope: containerRef, dependencies: [reducedMotion, label] }
  );

  const letters = label.split("");

  return (
    <span
      ref={containerRef}
      className={clsx("relative inline-flex h-[1em] overflow-hidden", className)}
    >
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="flex items-center leading-[1]">
        {letters.map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className="relative inline-flex h-[1em] overflow-hidden leading-[1]"
          >
            <span
              ref={(el) => {
                trackRefs.current[index] = el;
              }}
              className="flex flex-col leading-[1]"
            >
              <span className="block leading-[1]">
                {letter === " " ? "\u00A0" : letter}
              </span>
              <span className="block leading-[1]">
                {letter === " " ? "\u00A0" : letter}
              </span>
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
