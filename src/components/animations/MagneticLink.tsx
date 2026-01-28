"use client";

import {
  useEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
} from "react";
import { gsap } from "@/lib/gsap";

type MagneticLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  strength?: number;
};

export function MagneticLink({
  children,
  strength = 0.3,
  className = "",
  ...props
}: MagneticLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (hover: hover)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const handleMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const link = linkRef.current;
    if (!link) return;

    const rect = link.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    gsap.to(link, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: "power2.out",
    });

    const inner = link.querySelector("[data-magnetic-inner]");
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
    const link = linkRef.current;
    if (!link) return;

    gsap.to(link, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });

    const inner = link.querySelector("[data-magnetic-inner]");
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
    <a
      ref={linkRef}
      onMouseMove={enabled ? handleMouseMove : undefined}
      onMouseLeave={enabled ? handleMouseLeave : undefined}
      className={className}
      {...props}
    >
      <span data-magnetic-inner className="block w-full">
        {children}
      </span>
    </a>
  );
}
