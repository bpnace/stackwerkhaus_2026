"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TransitionContextType {
  triggerTransition: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

type NavigationSource = "link" | "history" | null;

export function TransitionProvider({ children }: { children: ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const navigationSourceRef = useRef<NavigationSource>(null);
  const pendingHrefRef = useRef<string | null>(null);
  const previousPathnameRef = useRef<string | null>(null);
  const isTransitioningRef = useRef(false);
  const overlayInCompleteRef = useRef(false);
  const routeReadyForExitRef = useRef(false);
  const exitStartedRef = useRef(false);
  const router = useRouter();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  const disableSmoothScrollForNavigation = useCallback(() => {
    document.documentElement.style.scrollBehavior = "auto";
  }, []);

  const restoreSmoothScrollAfterNavigation = useCallback(() => {
    document.documentElement.style.removeProperty("scroll-behavior");
  }, []);

  const setOverlayIdle = useCallback(() => {
    const overlay = overlayRef.current;
    const brand = brandRef.current;

    if (!overlay || !brand) return;

    gsap.killTweensOf([overlay, brand]);
    gsap.set(overlay, {
      scaleY: 0,
      transformOrigin: "bottom",
    });
    gsap.set(brand, {
      autoAlpha: 0,
      y: 18,
    });
  }, []);

  const resetTransitionState = useCallback(() => {
    pendingHrefRef.current = null;
    navigationSourceRef.current = null;
    isTransitioningRef.current = false;
    overlayInCompleteRef.current = false;
    routeReadyForExitRef.current = false;
    exitStartedRef.current = false;
    restoreSmoothScrollAfterNavigation();
    setOverlayIdle();
  }, [restoreSmoothScrollAfterNavigation, setOverlayIdle]);

  const playOverlayOut = useCallback(() => {
    const overlay = overlayRef.current;
    const brand = brandRef.current;

    if (reducedMotion || !overlay) {
      resetTransitionState();
      return;
    }

    gsap.killTweensOf([overlay, brand]);

    const timeline = gsap.timeline({
      onComplete: resetTransitionState,
    });

    if (brand) {
      timeline.to(
        brand,
        {
          autoAlpha: 0,
          duration: 0.24,
          y: -10,
          ease: "power2.inOut",
        },
        0
      );
    }

    timeline.to(
      overlay,
      {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.68,
        ease: "power4.inOut",
      },
      0
    );
  }, [reducedMotion, resetTransitionState]);

  const maybePlayOverlayOut = useCallback(() => {
    if (exitStartedRef.current) return;
    if (!overlayInCompleteRef.current) return;
    if (!routeReadyForExitRef.current) return;

    exitStartedRef.current = true;
    playOverlayOut();
  }, [playOverlayOut]);

  const playOverlayIn = useCallback(() => {
    const overlay = overlayRef.current;
    const brand = brandRef.current;
    const href = pendingHrefRef.current;

    if (!overlay) {
      if (href) {
        disableSmoothScrollForNavigation();
        router.push(href);
      }
      resetTransitionState();
      return;
    }

    gsap.killTweensOf([overlay, brand]);
    gsap.set(overlay, {
      autoAlpha: 1,
      scaleY: 0,
      transformOrigin: "bottom",
    });

    if (brand) {
      gsap.set(brand, {
        autoAlpha: 0,
        y: 12,
      });
    }

    const timeline = gsap.timeline({
      onComplete: () => {
        if (href) {
          disableSmoothScrollForNavigation();
          router.push(href);
        }
        overlayInCompleteRef.current = true;
        maybePlayOverlayOut();
      },
    });

    timeline.to(
      overlay,
      {
        scaleY: 1,
        duration: 0.78,
        ease: "power4.inOut",
      },
      0
    );

    if (brand) {
      timeline.to(
        brand,
        {
          autoAlpha: 1,
          duration: 0.32,
          y: 0,
          ease: "power2.out",
        },
        0.16
      );
    }
  }, [
    disableSmoothScrollForNavigation,
    maybePlayOverlayOut,
    resetTransitionState,
    router,
  ]);

  const triggerTransition = useCallback(
    (href: string) => {
      if (isTransitioningRef.current) return;

      pendingHrefRef.current = href;
      navigationSourceRef.current = "link";
      isTransitioningRef.current = true;
      overlayInCompleteRef.current = false;
      routeReadyForExitRef.current = false;
      exitStartedRef.current = false;

      if (reducedMotion || !overlayRef.current) {
        disableSmoothScrollForNavigation();
        router.push(href);
        resetTransitionState();
        return;
      }

      playOverlayIn();
    },
    [
      disableSmoothScrollForNavigation,
      playOverlayIn,
      reducedMotion,
      resetTransitionState,
      router,
    ]
  );

  useEffect(() => {
    setOverlayIdle();
  }, [setOverlayIdle]);

  useEffect(() => {
    const handlePopState = () => {
      navigationSourceRef.current = "history";
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (previousPathnameRef.current === null) {
      previousPathnameRef.current = pathname;
      return;
    }

    const previous = previousPathnameRef.current;
    if (previous === pathname) return;

    previousPathnameRef.current = pathname;

    if (navigationSourceRef.current !== "link") {
      resetTransitionState();
      return;
    }

    navigationSourceRef.current = null;

    if (reducedMotion) {
      resetTransitionState();
      return;
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        routeReadyForExitRef.current = true;
        maybePlayOverlayOut();
      });
    });
  }, [maybePlayOverlayOut, pathname, reducedMotion, resetTransitionState]);

  const contextValue = useMemo(
    () => ({
      triggerTransition,
    }),
    [triggerTransition]
  );

  return (
    <TransitionContext.Provider value={contextValue}>
      {children}
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[9998] bg-black"
        style={{ transform: "scaleY(0)", transformOrigin: "bottom" }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div
            ref={brandRef}
            className="flex flex-col items-center gap-2 text-center text-white"
          >
            <p className="font-display text-3xl font-bold uppercase tracking-[0.34em] md:text-6xl md:tracking-[0.4em]">
              SKWKHS
            </p>
            <p className="text-[10px] uppercase tracking-[0.42em] text-white/55 md:text-xs md:tracking-[0.45em]">
              Deine digitalen Architekten.
            </p>
          </div>
        </div>
      </div>
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
