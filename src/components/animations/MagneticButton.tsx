"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticButton({
  children,
  strength = 0.3,
  className = "",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: "power2.out",
    });

    const inner = button.querySelector("[data-magnetic-inner]");
    if (inner) {
      gsap.to(inner, {
        x: x * strength * 0.5,
        y: y * strength * 0.5,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    const button = buttonRef.current;
    if (!button) return;

    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });

    const inner = button.querySelector("[data-magnetic-inner]");
    if (inner) {
      gsap.to(inner, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    }
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      <span data-magnetic-inner>{children}</span>
    </button>
  );
}
