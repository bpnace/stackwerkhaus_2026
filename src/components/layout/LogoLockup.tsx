"use client";

import { useRef } from "react";
import clsx from "clsx";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface LogoLockupProps {
  className?: string;
}

export function LogoLockup({ className = "" }: LogoLockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<Array<HTMLDivElement | null>>([]);
  const skwRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const hero = document.querySelector("#top");
      const mm = gsap.matchMedia();
      const letters = letterRefs.current.filter(
        (node): node is HTMLDivElement => Boolean(node)
      );
      const skw = skwRef.current;
      if (!letters.length || !skw) return;

      const rowTop = [0];
      const rowBottom = [1, 2, 3];

      const getRowPositions = (indices: number[], gap: number, boxes: DOMRect[]) => {
        const totalWidth =
          indices.reduce((sum, idx) => sum + boxes[idx].width, 0) +
          gap * (indices.length - 1);
        let cursor = -totalWidth / 2;
        const positions: number[] = [];

        indices.forEach((idx) => {
          const width = boxes[idx].width;
          positions[idx] = cursor + width / 2;
          cursor += width + gap;
        });

        return positions;
      };

      const setPositions = (gap: number, gapY: number) => {
        const boxes = [skw, ...letters].map((node) => node.getBoundingClientRect());
        const maxHeight = Math.max(...boxes.map((box) => box.height));
        const rowOffset = (maxHeight + gapY) / 2;
        const inlinePositions = getRowPositions(
          boxes.map((_, index) => index),
          gap,
          boxes
        );
        const rowTopPositions = getRowPositions(rowTop, gap, boxes);
        const rowBottomPositions = getRowPositions(rowBottom, gap, boxes);

        const setStacked = () => {
          rowTop.forEach((index) => {
            gsap.set(index === 0 ? skw : letters[index - 1], {
              x: rowTopPositions[index],
              y: -rowOffset,
            });
          });
          rowBottom.forEach((index) => {
            gsap.set(letters[index - 1], {
              x: rowBottomPositions[index],
              y: rowOffset,
            });
          });
        };

        const setInline = () => {
          gsap.set(skw, { x: inlinePositions[0], y: 0 });
          letters.forEach((letter, index) => {
            gsap.set(letter, { x: inlinePositions[index + 1], y: 0 });
          });
        };

        setStacked();

        if (!hero) {
          setInline();
          return;
        }

        if (reducedMotion) {
          return;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "25% top",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(
          skw,
          {
            x: inlinePositions[0],
            y: 0,
            duration: 0.35,
            ease: "power3.out",
          },
          0
        ).to(
          letters,
          {
            x: (index) => inlinePositions[index + 1],
            y: 0,
            duration: 0.35,
            ease: "power3.out",
            stagger: 0.05,
          },
          0.06
        );

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      };

      mm.add("(min-width: 768px)", () => setPositions(-3, -3));
      mm.add("(max-width: 767px)", () => setPositions(-3, -3));

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  const letters = [
    { glyph: "H", width: 121, height: 154 },
    { glyph: "K", width: 88, height: 154 },
    { glyph: "S", width: 88, height: 154 },
  ];

  return (
    <div
      ref={containerRef}
      className={clsx(
        "relative h-14 w-40 overflow-visible md:h-16 md:w-48",
        className
      )}
      aria-label="STACKWERKHAUS"
    >
      <div
        ref={skwRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <Image
          src="/images/logos/SKW.svg"
          alt="SKW"
          width={300}
          height={145}
          className="h-6 w-auto md:h-7"
          priority
        />
      </div>
      {letters.map((letter, index) => (
        <div
          key={`${letter.glyph}-${index}`}
          ref={(el) => {
            letterRefs.current[index] = el;
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
        >
          <Image
            src={`/images/logos/${letter.glyph}.svg`}
            alt={letter.glyph}
            width={letter.width}
            height={letter.height}
            className="h-7 w-auto md:h-7"
            priority
          />
        </div>
      ))}
    </div>
  );
}
