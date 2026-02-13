"use client";

import { useRef } from "react";
import clsx from "clsx";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface LogoLockupProps {
  className?: string;
}

interface LockupSpacingConfig {
  stackedLetterGap: number;
  inlineLetterGap: number;
  inlineGroupGap: number;
  rowGap: number;
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
      const sLetter = letters[2];
      const skw = skwRef.current;
      if (!letters.length || !skw) return;

      const rowTop = [0];
      const rowBottom = [1, 2, 3];

      const getRowPositions = (
        indices: number[],
        boxes: DOMRect[],
        getGap: number | ((leftIndex: number, rightIndex: number) => number)
      ) => {
        const totalWidth =
          indices.reduce((sum, idx) => sum + boxes[idx].width, 0) +
          indices
            .slice(0, -1)
            .reduce((sum, _, index) => {
              const leftIndex = indices[index];
              const rightIndex = indices[index + 1];
              const gap =
                typeof getGap === "number" ? getGap : getGap(leftIndex, rightIndex);
              return sum + gap;
            }, 0);
        let cursor = -totalWidth / 2;
        const positions: number[] = [];

        indices.forEach((idx, index) => {
          const width = boxes[idx].width;
          positions[idx] = cursor + width / 2;
          if (index === indices.length - 1) return;
          const leftIndex = indices[index];
          const rightIndex = indices[index + 1];
          const gap =
            typeof getGap === "number" ? getGap : getGap(leftIndex, rightIndex);
          cursor += width + gap;
        });

        return positions;
      };

      const setPositions = ({
        stackedLetterGap,
        inlineLetterGap,
        inlineGroupGap,
        rowGap,
      }: LockupSpacingConfig) => {
        const boxes = [skw, ...letters].map((node) => node.getBoundingClientRect());
        const maxHeight = Math.max(...boxes.map((box) => box.height));
        const rowOffset = (maxHeight + rowGap) / 2;
        const inlinePositions = getRowPositions(
          boxes.map((_, index) => index),
          boxes,
          (leftIndex, rightIndex) =>
            leftIndex === 0 && rightIndex === 1 ? inlineGroupGap : inlineLetterGap
        );
        const rowTopPositions = getRowPositions(rowTop, boxes, stackedLetterGap);
        const rowBottomPositions = getRowPositions(rowBottom, boxes, stackedLetterGap);

        const setStacked = () => {
          rowTop.forEach((index) => {
            gsap.set(index === 0 ? skw : letters[index - 1], {
              x: rowTopPositions[index],
              y: -rowOffset,
              rotation: 0,
            });
          });
          rowBottom.forEach((index) => {
            gsap.set(letters[index - 1], {
              x: rowBottomPositions[index],
              y: rowOffset,
              rotation: 0,
            });
          });
        };

        const setInline = () => {
          gsap.set(skw, { x: inlinePositions[0], y: 0 });
          letters.forEach((letter, index) => {
            gsap.set(letter, {
              x: inlinePositions[index + 1],
              y: 0,
              rotation: 0,
            });
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

        const transitionDuration = 0.4;
        const transitionEase = "sine.inOut";
        const lettersStartDelay = 0.23;
        const letterStagger = 0.1;
        const sRotationDuration = 0.58;
        const sRotationEase = "power2.inOut";

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "25% top",
            toggleActions: "play none none reverse",
          },
          defaults: {
            duration: transitionDuration,
            ease: transitionEase,
          },
        });

        tl.to(
          skw,
          {
            x: inlinePositions[0],
            y: 0,
          },
          0
        ).to(
          letters,
          {
            x: (index) => inlinePositions[index + 1],
            y: 0,
            stagger: {
              each: letterStagger,
              ease: transitionEase,
            },
          },
          lettersStartDelay
        );

        if (sLetter) {
          tl.to(
            sLetter,
            {
              rotation: "+=360",
              duration: sRotationDuration,
              ease: sRotationEase,
            },
            lettersStartDelay
          );
        }

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      };

      // Tweak desktop spacing here.
      const desktopSpacing: LockupSpacingConfig = {
        stackedLetterGap: 3.5,
        inlineLetterGap: 3.5,
        inlineGroupGap: 3.7,
        rowGap: 3,
      };

      // Tweak mobile spacing here.
      const mobileSpacing: LockupSpacingConfig = {
        stackedLetterGap: 3.5,
        inlineLetterGap: 3.5,
        inlineGroupGap: 3.7,
        rowGap: 3,
      };

      mm.add("(min-width: 768px)", () => setPositions(desktopSpacing));
      mm.add("(max-width: 767px)", () => setPositions(mobileSpacing));

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  const letters = [
    { glyph: "K", width: 88, height: 154 },
    { glyph: "H", width: 88, height: 154 },
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
