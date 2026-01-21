"use client";

import { useParallax } from "@/hooks/useParallax";

interface ParallaxOrbProps {
  className?: string;
  speed?: number;
}

export function ParallaxOrb({ className = "", speed = 0.12 }: ParallaxOrbProps) {
  const ref = useParallax({ speed, direction: "vertical" });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={className}
    />
  );
}
