"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TransitionContextType {
  triggerTransition: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);
  const router = useRouter();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  const triggerTransition = (href: string) => {
    if (href === pathname || isTransitioning.current) return;
    const overlay = overlayRef.current;

    if (reducedMotion || !overlay) {
      router.push(href);
      return;
    }

    isTransitioning.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioning.current = false;
      },
    });

    tl.to(overlay, {
      scaleY: 1,
      transformOrigin: "bottom",
      duration: 0.5,
      ease: "power4.inOut",
    })
      .call(() => {
        router.push(href);
      })
      .to(overlay, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.5,
        ease: "power4.inOut",
        delay: 0.3,
      });
  };

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      {children}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9998] pointer-events-none bg-black"
        style={{ transform: "scaleY(0)", transformOrigin: "bottom" }}
        aria-hidden="true"
      />
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within TransitionProvider");
  }
  return context;
}
