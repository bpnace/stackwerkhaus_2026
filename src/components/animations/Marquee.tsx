"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useResponsiveAnimation } from "@/hooks/useResponsiveAnimation";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const reducedMotion = useReducedMotion();
  const { width } = useResponsiveAnimation({ minWidth: 0 });

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container || reducedMotion) return;

      const root = container.parentElement;
      if (!root) return;

      container
        .querySelectorAll<HTMLElement>("[data-marquee-clone='true']")
        .forEach((node) => node.remove());

      const items = Array.from(container.children) as HTMLElement[];
      if (items.length === 0) return;

      const totalWidth = items.reduce(
        (acc, item) => acc + item.offsetWidth,
        0
      );

      if (!totalWidth) return;

      const viewportWidth = root.offsetWidth;
      const cloneSets = Math.max(2, Math.ceil(viewportWidth / totalWidth) + 1);

      for (let i = 0; i < cloneSets; i += 1) {
        items.forEach((item) => {
          const clone = item.cloneNode(true) as HTMLElement;
          clone.setAttribute("data-marquee-clone", "true");
          container.appendChild(clone);
        });
      }

      const startX = direction === "left" ? 0 : -totalWidth;
      const endX = direction === "left" ? -totalWidth : 0;

      gsap.set(container, { x: startX });

      tweenRef.current = gsap.to(container, {
        x: endX,
        duration: totalWidth / speed,
        ease: "none",
        repeat: -1,
      });

      const handleEnter = () => {
        gsap.to(tweenRef.current, { timeScale: 0, duration: 0.4 });
      };

      const handleLeave = () => {
        gsap.to(tweenRef.current, { timeScale: 1, duration: 0.4 });
      };

      if (pauseOnHover) {
        container.addEventListener("mouseenter", handleEnter);
        container.addEventListener("mouseleave", handleLeave);
      }

      return () => {
        if (pauseOnHover) {
          container.removeEventListener("mouseenter", handleEnter);
          container.removeEventListener("mouseleave", handleLeave);
        }
        tweenRef.current?.kill();
        tweenRef.current = null;
        gsap.set(container, { x: 0 });
        container
          .querySelectorAll<HTMLElement>("[data-marquee-clone='true']")
          .forEach((node) => node.remove());
      };
    },
    { scope: containerRef, dependencies: [direction, pauseOnHover, reducedMotion, speed, width] }
  );

  return (
    <div className="overflow-hidden">
      <div ref={containerRef} className={`flex whitespace-nowrap ${className}`}>
        {children}
      </div>
    </div>
  );
}
