"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [enabled, setEnabled] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled || reducedMotion) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      scale: 0,
    });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3.out" });

    const handleMouseMove = (event: MouseEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);
    };

    const handleMouseEnter = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "[data-cursor-text], a, button, [data-cursor-hover]"
      ) as HTMLElement | null;

      if (!interactive) return;

      const hoverText = interactive.dataset.cursorText;
      if (hoverText) {
        setCursorText(hoverText);
        gsap.to(cursor, {
          scale: 1,
          width: 120,
          height: 120,
          duration: 0.25,
          ease: "power2.out",
        });
      } else {
        setCursorText("");
        gsap.to(cursor, {
          scale: 1.4,
          duration: 0.25,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "[data-cursor-text], a, button, [data-cursor-hover]"
      ) as HTMLElement | null;

      if (!interactive) return;

      setCursorText("");
      gsap.to(cursor, {
        scale: 1,
        width: 14,
        height: 14,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    gsap.to(cursor, { scale: 1, duration: 0.4, delay: 0.2 });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, [enabled, reducedMotion]);

  if (!enabled || reducedMotion) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex h-3.5 w-3.5 items-center justify-center rounded-full border border-black/40 bg-[rgba(21,21,20,0.85)] text-[10px] uppercase tracking-[0.3em] text-[#f3efe6]"
    >
      {cursorText}
    </div>
  );
}
