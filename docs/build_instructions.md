# Technischer Entwicklungsplan: Premium Portfolio mit GSAP Animationen

## Projektübersicht

**Ziel:** Entwicklung einer hochwertigen Portfolio-Website mit Premium-Animationen, Smooth Scroll und modernen Interaktionen.

**Technologie-Stack:**
- Framework: Next.js 14+ (App Router)
- Styling: Tailwind CSS
- Animations-Library: GSAP (GreenSock Animation Platform)
- Smooth Scroll: Lenis
- CMS: Strapi (Headless CMS)
- Deployment: Vercel

---

## Phase 1: Projekt-Setup & Grundstruktur

### 1.1 Projekt initialisieren

```bash
npx create-next-app@latest marshall-portfolio --typescript --tailwind --eslint --app
cd marshall-portfolio
```

### 1.2 Dependencies installieren

```bash
# Core Animation Libraries
npm install gsap @gsap/react

# Smooth Scroll
npm install lenis

# Text Splitting (für Text-Animationen)
npm install split-type

# Strapi CMS Client
npm install qs

# Utilities
npm install clsx tailwind-merge
```

### 1.3 GSAP Plugins registrieren

```typescript
// lib/gsap.ts
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Plugins registrieren
gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
```

### 1.4 Lenis + GSAP Integration

```typescript
// providers/SmoothScrollProvider.tsx
"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,           // Interpolation Intensität (0-1)
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Lenis mit GSAP ScrollTrigger synchronisieren
    lenis.on("scroll", ScrollTrigger.update);

    // GSAP ticker mit Lenis RAF verbinden
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Lag Smoothing deaktivieren für flüssigere Animationen
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}
```

---

## Phase 2: Layout & Komponenten-Architektur

### 2.1 Ordnerstruktur

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── work/[slug]/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Work.tsx
│   │   ├── Skills.tsx
│   │   └── Contact.tsx
│   ├── animations/
│   │   ├── TextReveal.tsx
│   │   ├── ImageReveal.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── CustomCursor.tsx
│   │   └── Marquee.tsx
│   └── ui/
│       ├── ProjectCard.tsx
│       └── Button.tsx
├── hooks/
│   ├── useGSAP.ts
│   ├── useMouse.ts
│   └── useMediaQuery.ts
├── lib/
│   ├── gsap.ts
│   ├── sanity.ts
│   └── utils.ts
└── providers/
    └── SmoothScrollProvider.tsx
```

### 2.2 Root Layout

```typescript
// app/layout.tsx
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { Header } from "@/components/layout/Header";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          <CustomCursor />
          <Header />
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
```

---

## Phase 3: Animations-System

### 3.1 Text Reveal Animation (SplitType + GSAP)

```typescript
// components/animations/TextReveal.tsx
"use client";

import { useRef, useEffect } from "react";
import SplitType from "split-type";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface TextRevealProps {
  children: string;
  type?: "chars" | "words" | "lines";
  stagger?: number;
  duration?: number;
  delay?: number;
  trigger?: "scroll" | "load";
  className?: string;
}

export function TextReveal({
  children,
  type = "chars",
  stagger = 0.02,
  duration = 0.8,
  delay = 0,
  trigger = "scroll",
  className = "",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitType | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Text splitten
    splitRef.current = new SplitType(containerRef.current, {
      types: type === "chars" ? "chars,words" : type,
      tagName: "span",
    });

    const elements = type === "chars"
      ? splitRef.current.chars
      : type === "words"
        ? splitRef.current.words
        : splitRef.current.lines;

    if (!elements) return;

    // Initial state: versteckt
    gsap.set(elements, {
      yPercent: 100,
      opacity: 0,
    });

    // Mask-Effekt via CSS
    gsap.set(containerRef.current.querySelectorAll(".word"), {
      overflow: "hidden",
    });

    // Animation
    const animation = gsap.to(elements, {
      yPercent: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: "power3.out",
    });

    if (trigger === "scroll") {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 85%",
        animation,
        toggleActions: "play none none none",
      });
    }

    return () => {
      splitRef.current?.revert();
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
```

### 3.2 Masked Text Reveal (Premium-Effekt)

```typescript
// components/animations/MaskedTextReveal.tsx
"use client";

import { useRef } from "react";
import SplitType from "split-type";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface MaskedTextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
}

export function MaskedTextReveal({
  children,
  as: Component = "h1",
  className = "",
}: MaskedTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Split in lines und words
    const split = new SplitType(containerRef.current, {
      types: "lines,words",
      tagName: "span",
    });

    // Jede Line braucht overflow: hidden für den Mask-Effekt
    split.lines?.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden";
      wrapper.style.display = "block";
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    // Initial State
    gsap.set(split.lines, {
      yPercent: 100,
    });

    // ScrollTrigger Animation
    gsap.to(split.lines, {
      yPercent: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    return () => split.revert();
  }, { scope: containerRef });

  return (
    <Component ref={containerRef as any} className={className}>
      {children}
    </Component>
  );
}
```

### 3.3 Custom Cursor

```typescript
// components/animations/CustomCursor.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Initial Setup
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      scale: 0,
    });

    // Smooth Cursor Movement mit quickTo
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.6, ease: "power3.out" });

    // Mouse Move Handler
    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    // Hover Detection für interaktive Elemente
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverText = target.dataset.cursorText;

      if (hoverText) {
        setCursorText(hoverText);
        gsap.to(cursor, {
          scale: 1,
          width: 120,
          height: 120,
          duration: 0.3,
          ease: "power2.out",
        });
      } else if (target.matches("a, button, [data-cursor-hover]")) {
        gsap.to(cursor, {
          scale: 1.5,
          duration: 0.3,
          ease: "power2.out",
        });
      }
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorText("");
      gsap.to(cursor, {
        scale: 1,
        width: 16,
        height: 16,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Event Listeners
    window.addEventListener("mousemove", handleMouseMove);

    // Delegation für Hover
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    // Initial Cursor einblenden
    gsap.to(cursor, { scale: 1, duration: 0.5, delay: 0.5 });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999]
                 w-4 h-4 rounded-full bg-white mix-blend-difference
                 flex items-center justify-center"
    >
      {cursorText && (
        <span
          ref={cursorTextRef}
          className="text-xs font-medium text-black"
        >
          {cursorText}
        </span>
      )}
    </div>
  );
}
```

### 3.4 Magnetic Button

```typescript
// components/animations/MagneticButton.tsx
"use client";

import { useRef, ReactNode } from "react";
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

  const handleMouseMove = (e: React.MouseEvent) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: "power2.out",
    });

    // Inner Content bewegt sich stärker
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
```

### 3.5 Infinite Marquee

```typescript
// components/animations/Marquee.tsx
"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(".marquee-item");
    const totalWidth = Array.from(items).reduce(
      (acc, item) => acc + (item as HTMLElement).offsetWidth,
      0
    );

    // Dupliziere Content für seamless loop
    const clone = container.innerHTML;
    container.innerHTML += clone;

    // Animation
    tweenRef.current = gsap.to(container, {
      x: direction === "left" ? -totalWidth : totalWidth,
      duration: totalWidth / speed,
      ease: "none",
      repeat: -1,
    });

    // Pause on Hover
    if (pauseOnHover) {
      container.addEventListener("mouseenter", () => {
        gsap.to(tweenRef.current, { timeScale: 0, duration: 0.5 });
      });
      container.addEventListener("mouseleave", () => {
        gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5 });
      });
    }
  }, { scope: containerRef });

  return (
    <div className="overflow-hidden">
      <div ref={containerRef} className={`flex whitespace-nowrap ${className}`}>
        {children}
      </div>
    </div>
  );
}
```

### 3.6 Image Reveal Animation

```typescript
// components/animations/ImageReveal.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

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
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;
    if (!container || !image || !overlay) return;

    // Initial State
    const clipPathStart = {
      left: "inset(0 100% 0 0)",
      right: "inset(0 0 0 100%)",
      up: "inset(100% 0 0 0)",
      down: "inset(0 0 100% 0)",
    };

    gsap.set(container, { clipPath: clipPathStart[direction] });
    gsap.set(image, { scale: 1.3 });

    // Timeline
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
    })
    .to(image, {
      scale: 1,
      duration: 1.5,
      ease: "power3.out",
    }, "-=0.8");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={imageRef}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
```

---

## Phase 4: Scroll-Animationen

### 4.1 Parallax-Effekte

```typescript
// hooks/useParallax.ts
"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ParallaxOptions {
  speed?: number;
  direction?: "vertical" | "horizontal";
}

export function useParallax(options: ParallaxOptions = {}) {
  const { speed = 0.5, direction = "vertical" } = options;
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const property = direction === "vertical" ? "yPercent" : "xPercent";
    const movement = speed * 100;

    gsap.to(element, {
      [property]: movement,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed, direction]);

  return elementRef;
}
```

### 4.2 Scroll-Triggered Fade-In

```typescript
// components/animations/FadeIn.tsx
"use client";

import { useRef, ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface FadeInProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  className?: string;
}

export function FadeIn({
  children,
  direction = "up",
  distance = 50,
  duration = 1,
  delay = 0,
  stagger = 0,
  className = "",
}: FadeInProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const element = containerRef.current;
    if (!element) return;

    const directionMap = {
      up: { y: distance },
      down: { y: -distance },
      left: { x: distance },
      right: { x: -distance },
      none: {},
    };

    const children = stagger
      ? element.children
      : [element];

    gsap.from(children, {
      opacity: 0,
      ...directionMap[direction],
      duration,
      delay,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
```

### 4.3 Horizontal Scroll Section

```typescript
// components/animations/HorizontalScroll.tsx
"use client";

import { useRef, ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

export function HorizontalScroll({ children, className = "" }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
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
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={wrapperRef} className="flex">
        {children}
      </div>
    </div>
  );
}
```

---

## Phase 5: Sektions-Komponenten

### 5.1 Hero Section

```typescript
// components/sections/Hero.tsx
"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MaskedTextReveal } from "@/components/animations/MaskedTextReveal";
import { FadeIn } from "@/components/animations/FadeIn";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    // Preloader Animation
    const tl = gsap.timeline({ delay: 0.5 });

    tl.from(yearRef.current, {
      yPercent: 100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center items-center relative"
    >
      {/* Jahr Overlay */}
      <div className="absolute top-8 left-8 overflow-hidden">
        <span ref={yearRef} className="text-sm font-medium block">
          2025
        </span>
      </div>

      {/* Haupttitel */}
      <div className="text-center">
        <MaskedTextReveal
          as="h1"
          className="text-[8vw] font-bold uppercase tracking-tight leading-none"
        >
          CRAFTING JOURNEYS
        </MaskedTextReveal>
        <MaskedTextReveal
          as="h1"
          className="text-[8vw] font-bold uppercase tracking-tight leading-none"
        >
          THROUGH VISION
        </MaskedTextReveal>
      </div>

      {/* Scroll Indicator */}
      <FadeIn
        delay={1.5}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-current animate-pulse" />
        </div>
      </FadeIn>
    </section>
  );
}
```

### 5.2 Work/Portfolio Section

```typescript
// components/sections/Work.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { MaskedTextReveal } from "@/components/animations/MaskedTextReveal";

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  slug: string;
}

interface WorkProps {
  projects: Project[];
}

export function Work({ projects }: WorkProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="py-32">
      <MaskedTextReveal as="h2" className="text-6xl font-bold mb-16 px-8">
        Work
      </MaskedTextReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;
    if (!card || !image || !overlay) return;

    // Scroll Animation
    gsap.from(card, {
      yPercent: 20,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
    });

    // Hover Animation
    const hoverTl = gsap.timeline({ paused: true });

    hoverTl
      .to(image, {
        scale: 1.1,
        duration: 0.6,
        ease: "power2.out",
      })
      .to(overlay, {
        opacity: 1,
        duration: 0.3,
      }, 0);

    card.addEventListener("mouseenter", () => hoverTl.play());
    card.addEventListener("mouseleave", () => hoverTl.reverse());

  }, { scope: cardRef });

  return (
    <Link href={`/work/${project.slug}`}>
      <div
        ref={cardRef}
        className="group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
        data-cursor-text="Dive In"
      >
        <div ref={imageRef} className="w-full h-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Hover Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black/40 opacity-0 flex items-end p-6"
        >
          <div>
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
            <p className="text-white/70">{project.category}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
```

### 5.3 Skills Marquee Section

```typescript
// components/sections/Skills.tsx
"use client";

import { Marquee } from "@/components/animations/Marquee";

const skills = [
  "Java", "JavaScript", "React", "Next.js",
  "Tailwind", "TypeScript", "SQL", "MongoDB", "Git"
];

export function Skills() {
  return (
    <section className="py-16 bg-black text-white overflow-hidden">
      {/* Top Marquee - Links */}
      <Marquee speed={40} direction="left" className="py-4">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="marquee-item text-4xl font-bold mx-8 opacity-50 hover:opacity-100 transition-opacity"
          >
            {skill}
          </span>
        ))}
      </Marquee>

      {/* Info Row */}
      <div className="flex justify-between px-8 py-8 text-sm">
        <span>Since 2020</span>
        <span>Based In India</span>
      </div>

      {/* Bottom Marquee - Rechts */}
      <Marquee speed={40} direction="right" className="py-4">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="marquee-item text-4xl font-bold mx-8 opacity-50 hover:opacity-100 transition-opacity"
          >
            {skill}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
```

---

## Phase 6: Page Transitions

### 6.1 Transition Provider

```typescript
// providers/TransitionProvider.tsx
"use client";

import { createContext, useContext, useRef, ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useRouter, usePathname } from "next/navigation";

interface TransitionContextType {
  triggerTransition: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const triggerTransition = (href: string) => {
    if (href === pathname) return;

    const overlay = overlayRef.current;
    if (!overlay) return;

    // Exit Animation
    const tl = gsap.timeline();

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

      {/* Transition Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black z-[9998] pointer-events-none scale-y-0"
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
```

### 6.2 Transition Link

```typescript
// components/ui/TransitionLink.tsx
"use client";

import { ReactNode } from "react";
import { useTransition } from "@/providers/TransitionProvider";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function TransitionLink({ href, children, className }: TransitionLinkProps) {
  const { triggerTransition } = useTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerTransition(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
```

---

## Phase 7: Strapi CMS Integration

### 7.1 Strapi Client Setup

```typescript
// lib/strapi.ts
import qs from "qs";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface FetchOptions {
  populate?: string | object;
  filters?: object;
  sort?: string[];
  pagination?: {
    page?: number;
    pageSize?: number;
  };
}

export async function fetchAPI(
  endpoint: string,
  options: FetchOptions = {}
) {
  const { populate, filters, sort, pagination } = options;

  const queryString = qs.stringify(
    {
      populate,
      filters,
      sort,
      pagination,
    },
    { encodeValuesOnly: true }
  );

  const url = `${STRAPI_URL}/api/${endpoint}${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
    },
    next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
  });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

// Helper für Bild-URLs
export function getStrapiImageUrl(image: any): string {
  if (!image?.data?.attributes?.url) return "";

  const url = image.data.attributes.url;

  // Wenn URL relativ ist, STRAPI_URL voranstellen
  if (url.startsWith("/")) {
    return `${STRAPI_URL}${url}`;
  }

  return url;
}
```

### 7.2 Data Fetching

```typescript
// lib/queries.ts
import { fetchAPI, getStrapiImageUrl } from "./strapi";

export interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export async function getProjects(): Promise<Project[]> {
  const response = await fetchAPI("projects", {
    populate: {
      mainImage: { fields: ["url", "alternativeText", "width", "height"] },
    },
    sort: ["order:asc"],
  });

  return response.data.map((item: any) => ({
    id: item.id,
    title: item.attributes.title,
    slug: item.attributes.slug,
    category: item.attributes.category,
    description: item.attributes.description,
    image: getStrapiImageUrl(item.attributes.mainImage),
    technologies: item.attributes.technologies || [],
  }));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const response = await fetchAPI("projects", {
    filters: {
      slug: { $eq: slug },
    },
    populate: {
      mainImage: { fields: ["url", "alternativeText", "width", "height"] },
      gallery: { fields: ["url", "alternativeText", "width", "height"] },
      content: true,
    },
  });

  if (!response.data || response.data.length === 0) {
    return null;
  }

  const item = response.data[0];

  return {
    id: item.id,
    title: item.attributes.title,
    slug: item.attributes.slug,
    category: item.attributes.category,
    description: item.attributes.description,
    image: getStrapiImageUrl(item.attributes.mainImage),
    technologies: item.attributes.technologies || [],
    liveUrl: item.attributes.liveUrl,
    githubUrl: item.attributes.githubUrl,
  };
}
```

### 7.3 Strapi Content Types (Schema)

```javascript
// Strapi Admin: Content-Type Builder

// Collection Type: Project
{
  "kind": "collectionType",
  "collectionName": "projects",
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "category": {
      "type": "string"
    },
    "description": {
      "type": "text"
    },
    "mainImage": {
      "type": "media",
      "allowedTypes": ["images"],
      "multiple": false
    },
    "gallery": {
      "type": "media",
      "allowedTypes": ["images"],
      "multiple": true
    },
    "technologies": {
      "type": "json"
    },
    "liveUrl": {
      "type": "string"
    },
    "githubUrl": {
      "type": "string"
    },
    "content": {
      "type": "richtext"
    },
    "order": {
      "type": "integer",
      "default": 0
    }
  }
}
```

### 7.4 Environment Variables

```env
# .env.local
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_api_token_here
```

---

## Phase 8: Performance-Optimierungen

### 8.1 GSAP Context Cleanup

```typescript
// hooks/useGSAPContext.ts
"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

export function useGSAPContext() {
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    contextRef.current = gsap.context(() => {});

    return () => {
      contextRef.current?.revert();
    };
  }, []);

  return contextRef;
}
```

### 8.2 Lazy Animation Loading

```typescript
// components/animations/LazyAnimation.tsx
"use client";

import { useRef, useState, useEffect, ReactNode } from "react";

interface LazyAnimationProps {
  children: ReactNode;
  threshold?: number;
}

export function LazyAnimation({
  children,
  threshold = 0.1
}: LazyAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref}>
      {isVisible ? children : <div className="min-h-[200px]" />}
    </div>
  );
}
```

### 8.3 will-change Optimierung

```css
/* globals.css */
.will-animate {
  will-change: transform, opacity;
}

.animation-complete {
  will-change: auto;
}
```

---

## Phase 9: Responsive Breakpoints

### 9.1 GSAP matchMedia Integration

```typescript
// hooks/useResponsiveAnimation.ts
"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function useResponsiveAnimation(
  callback: (context: gsap.MatchMediaContext) => void
) {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isTablet: "(min-width: 768px) and (max-width: 1023px)",
        isDesktop: "(min-width: 1024px)",
        reducedMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        callback(context);
      }
    );

    return () => mm.revert();
  }, [callback]);
}
```

### 9.2 Reduced Motion Support

```typescript
// hooks/useReducedMotion.ts
"use client";

import { useEffect, useState } from "react";

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return reducedMotion;
}
```

---

## Phase 10: Testing & Deployment

### 10.1 Animation Testing Checklist

- [ ] Smooth Scroll funktioniert auf allen Browsern
- [ ] Text Reveal Animationen triggern korrekt
- [ ] Custom Cursor folgt der Maus flüssig
- [ ] Magnetic Buttons reagieren auf Hover
- [ ] Marquee läuft endlos ohne Sprünge
- [ ] Page Transitions sind smooth
- [ ] Alle ScrollTrigger werden bei Unmount aufgeräumt
- [ ] Performance auf Mobile getestet (60fps)
- [ ] Reduced Motion wird respektiert

### 10.2 Browser-Kompatibilität

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Lenis Smooth Scroll | ✅ | ✅ | ✅ | ✅ |
| GSAP ScrollTrigger | ✅ | ✅ | ✅ | ✅ |
| clip-path Animations | ✅ | ✅ | ✅ | ✅ |
| mix-blend-mode | ✅ | ✅ | ✅ | ✅ |

### 10.3 Deployment Konfiguration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: process.env.STRAPI_HOSTNAME || "your-strapi-domain.com",
        pathname: "/uploads/**",
      },
    ],
  },
  // GSAP Transpilation
  transpilePackages: ["gsap"],
};

module.exports = nextConfig;
```

---

## Zusammenfassung der Kern-Animationen

| Animation | Trigger | Library | Komplexität |
|-----------|---------|---------|-------------|
| Text Reveal (Masked) | Scroll | GSAP + SplitType | Mittel |
| Custom Cursor | Mouse Move | GSAP quickTo | Niedrig |
| Magnetic Button | Mouse Move/Leave | GSAP | Niedrig |
| Image Reveal (clip-path) | Scroll | GSAP ScrollTrigger | Mittel |
| Infinite Marquee | Auto | GSAP | Mittel |
| Parallax | Scroll | GSAP ScrollTrigger | Niedrig |
| Page Transitions | Navigation | GSAP Timeline | Hoch |
| Smooth Scroll | Global | Lenis | Niedrig |

---

## Zeitschätzung

| Phase | Aufwand |
|-------|---------|
| Phase 1: Setup | 2-4 Stunden |
| Phase 2: Layout | 4-6 Stunden |
| Phase 3: Animations-System | 8-12 Stunden |
| Phase 4: Scroll-Animationen | 4-6 Stunden |
| Phase 5: Sektionen | 8-12 Stunden |
| Phase 6: Page Transitions | 2-4 Stunden |
| Phase 7: CMS Integration | 4-6 Stunden |
| Phase 8: Performance | 2-4 Stunden |
| Phase 9: Responsive | 4-6 Stunden |
| Phase 10: Testing | 4-6 Stunden |
| **Gesamt** | **42-66 Stunden** |

---

## Ressourcen & Dokumentation

- [GSAP Docs](https://gsap.com/docs/)
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Lenis Documentation](https://github.com/darkroomengineering/lenis)
- [SplitType](https://www.npmjs.com/package/split-type)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Strapi Documentation](https://docs.strapi.io/)
- [Strapi REST API](https://docs.strapi.io/dev-docs/api/rest)
