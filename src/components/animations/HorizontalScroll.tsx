"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

export function HorizontalScroll({
  children,
  className = "",
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const wrapper = wrapperRef.current;
      if (!container || !wrapper) return;

      const scrollWidth = wrapper.scrollWidth - container.offsetWidth;

      gsap.to(wrapper, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={wrapperRef} className="flex">
        {children}
      </div>
    </div>
  );
}
