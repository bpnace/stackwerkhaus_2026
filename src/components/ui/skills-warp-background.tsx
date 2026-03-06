"use client";

import { Warp } from "@paper-design/shaders-react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type SkillsWarpBackgroundProps = {
  className?: string;
};

const warpColors = [
  "hsl(0, 0%, 10%)",
  "hsl(0, 0%, 26%)",
  "hsl(22, 68%, 48%)",
  "hsl(0, 0%, 76%)",
];

export function SkillsWarpBackground({ className }: SkillsWarpBackgroundProps) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setParallaxY(0);
      return;
    }

    let rafId = 0;

    const updateParallax = () => {
      const element = rootRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, progress));
      const centeredProgress = clampedProgress - 0.5;
      const nextOffset = centeredProgress * 360;

      setParallaxY(nextOffset);
    };

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateParallax();
      });
    };

    updateParallax();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div
        ref={rootRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-0 opacity-60",
          "bg-[radial-gradient(1100px_560px_at_12%_18%,rgba(198,90,46,0.42),transparent_62%),radial-gradient(960px_520px_at_88%_84%,rgba(255,214,153,0.28),transparent_70%),linear-gradient(180deg,#080706_0%,#0f0d0a_55%,#070605_100%)]",
          className,
        )}
      />
    );
  }

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 z-0 opacity-95", className)}
    >
      <div
        className="absolute -inset-x-16 -inset-y-28 will-change-transform [&_canvas]:!z-0 [&_canvas]:!opacity-100 [&_canvas]:mix-blend-screen [&_canvas]:brightness-125 [&_canvas]:saturate-150"
        style={{ transform: `translate3d(0, ${parallaxY}px, 0) scale(1.26)` }}
      >
        <Warp
          style={{ height: "100%", width: "100%" }}
          proportion={0.45}
          softness={1}
          distortion={0.28}
          swirl={0.9}
          swirlIterations={8}
          shape="checks"
          shapeScale={0.11}
          scale={1}
          rotation={0}
          speed={1}
          colors={warpColors}
        />
      </div>
    </div>
  );
}
