"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { faqItems } from "@/lib/faq";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="mx-auto w-full max-w-6xl px-6 pb-20 pt-24 md:px-10 md:pb-24"
    >
      <div id="faq" className="scroll-mt-24" />
      <FadeIn direction="up" className="space-y-8">
        <div className="flex flex-col gap-4 text-left md:flex-row md:items-end md:justify-between">
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
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
            <div
              key={item.question}
              className="border border-black/10 bg-white/80 shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 p-5 text-left md:cursor-default md:p-6"
                onClick={() =>
                  setOpenIndex((current) => (current === index ? null : index))
                }
              >
                <div className="space-y-2">
                  <p className="hidden text-xs uppercase tracking-[0.35em] text-ink-soft md:block">
                    Frage
                  </p>
                  <h4 className="font-display text-lg font-bold uppercase tracking-[0.14em] md:text-xl md:tracking-[0.16em]">
                    {item.question}
                  </h4>
                </div>
                <span
                  className={`text-lg text-ink-soft transition-transform md:hidden ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <div className={`${isOpen ? "block" : "hidden"} px-5 pb-5 md:block md:px-6 md:pb-6`}>
                <p className="max-w-md text-sm text-ink-soft">{item.answer}</p>
              </div>
            </div>
          )})}
        </div>
      </FadeIn>
    </section>
  );
}
