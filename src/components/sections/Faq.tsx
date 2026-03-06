"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { faqItems } from "@/lib/faq";

export function Faq() {
  return (
    <section
      className="mx-auto w-full max-w-6xl px-6 pb-20 pt-24 md:px-10 md:pb-24"
    >
      <div id="faq" className="scroll-mt-24" />
      <FadeIn direction="up" className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
              FAQ
            </p>
            <h2 className="font-display font-bold text-2xl uppercase tracking-[0.2em] md:text-4xl">
              Fragen vor dem Projektstart
            </h2>
          </div>
          <p className="max-w-md text-sm text-ink-soft">
            Die wichtigsten Fragen zu Umfang, Ablauf, SEO-Basis und dem ersten
            Gespräch. Kurz genug zum Scannen, konkret genug für eine echte
            Entscheidung.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {faqItems.map((item) => (
            <div
              key={item.question}
              className="space-y-3 border border-black/10 bg-white/80 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                Frage
              </p>
              <h4 className="font-display text-xl font-bold uppercase tracking-[0.16em]">
                {item.question}
              </h4>
              <p className="text-sm text-ink-soft">{item.answer}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
