"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ImageRevealProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  direction?: "left" | "right" | "up" | "down";
  parallax?: number;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  disableOnMobile?: boolean;
  trigger?: "scroll" | "load";
  className?: string;
  imageClassName?: string;
}

export function ImageReveal({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  direction = "left",
  parallax = 0,
  priority = false,
  fetchPriority,
  disableOnMobile = false,
  trigger = "scroll",
  className = "",
  imageClassName = "",
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [revealEnabled, setRevealEnabled] = useState(true);

  useEffect(() => {
    if (!disableOnMobile) return;
    const media = window.matchMedia("(pointer: fine) and (hover: hover)");
    const update = () => setRevealEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [disableOnMobile]);

  useEffect(() => {
    if (!disableOnMobile || revealEnabled) return;
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;
    gsap.set(container, { clipPath: "inset(0 0 0 0)" });
    gsap.set(image, { scale: parallax ? 1 + Math.abs(parallax) / 100 + 0.06 : 1 });
  }, [disableOnMobile, revealEnabled, parallax]);

  useGSAP(
    () => {
      const container = containerRef.current;
      const image = imageRef.current;
      if (!container || !image || reducedMotion) return;

      const clipPathStart = {
        left: "inset(0 100% 0 0)",
        right: "inset(0 0 0 100%)",
        up: "inset(100% 0 0 0)",
        down: "inset(0 0 100% 0)",
      } as const;

      const finalScale = parallax ? 1 + Math.abs(parallax) / 100 + 0.06 : 1;
      gsap.set(image, { scale: finalScale });

      if (!disableOnMobile || revealEnabled) {
        gsap.set(container, { clipPath: clipPathStart[direction] });
        gsap.to(container, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power4.inOut",
          ...(trigger === "scroll"
            ? {
                scrollTrigger: {
                  trigger: container,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            : {}),
        });
      } else {
        gsap.set(container, { clipPath: "inset(0 0 0 0)" });
      }

      if (parallax) {
        gsap.to(image, {
          yPercent: parallax,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    {
      scope: containerRef,
      dependencies: [
        direction,
        reducedMotion,
        parallax,
        trigger,
        disableOnMobile,
        revealEnabled,
      ],
    }
  );

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div ref={imageRef} className={`h-full w-full ${imageClassName}`}>
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes || "100vw"}
            priority={priority}
            fetchPriority={fetchPriority}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width ?? 1200}
            height={height ?? 900}
            priority={priority}
            fetchPriority={fetchPriority}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
