"use client";

import { Warp } from "@paper-design/shaders-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type SkillsWarpBackgroundProps = {
  className?: string;
};

const warpColors = [
  "hsl(0, 0%, 10%)",
  "hsl(0, 0%, 26%)",
  "hsl(0, 0%, 48%)",
  "hsl(0, 0%, 76%)",
];

export function SkillsWarpBackground({ className }: SkillsWarpBackgroundProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div
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
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 z-0 opacity-95", className)}
    >
      <div className="size-full [&_canvas]:!z-0 [&_canvas]:!opacity-100 [&_canvas]:mix-blend-screen [&_canvas]:brightness-125 [&_canvas]:saturate-150">
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
