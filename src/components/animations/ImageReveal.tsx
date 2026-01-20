"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

interface ImageRevealProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  direction?: "left" | "right" | "up" | "down";
  className?: string;
}

export function ImageReveal({
  src,
  alt,
  width,
  height,
  direction = "left",
  className = "",
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const image = imageRef.current;
      if (!container || !image) return;

      const clipPathStart = {
        left: "inset(0 100% 0 0)",
        right: "inset(0 0 0 100%)",
        up: "inset(100% 0 0 0)",
        down: "inset(0 0 100% 0)",
      } as const;

      gsap.set(container, { clipPath: clipPathStart[direction] });
      gsap.set(image, { scale: 1.3 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.to(container, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.2,
        ease: "power4.inOut",
      }).to(
        image,
        {
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
        },
        "-=0.8"
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={imageRef}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
