"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ResponsiveAnimationOptions {
  minWidth?: number;
}

export function useResponsiveAnimation(
  options: ResponsiveAnimationOptions = {}
) {
  const { minWidth = 768 } = options;
  const reducedMotion = useReducedMotion();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => {
      setWidth(window.innerWidth);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return {
    width,
    isEnabled: !reducedMotion && width >= minWidth,
  };
}
