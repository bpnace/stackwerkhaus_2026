"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

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

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const items = Array.from(container.children) as HTMLElement[];
      if (items.length === 0) return;

      const totalWidth = items.reduce(
        (acc, item) => acc + item.offsetWidth,
        0
      );

      items.forEach((item) => {
        container.appendChild(item.cloneNode(true));
      });

      tweenRef.current = gsap.to(container, {
        x: direction === "left" ? -totalWidth : totalWidth,
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
      };
    },
    { scope: containerRef }
  );

  return (
    <div className="overflow-hidden">
      <div ref={containerRef} className={`flex whitespace-nowrap ${className}`}>
        {children}
      </div>
    </div>
  );
}
