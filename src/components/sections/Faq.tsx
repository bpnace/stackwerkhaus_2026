import { faqItems } from "@/lib/faq";

export function Faq() {
  return (
    <section
      className="mx-auto w-full max-w-6xl px-6 pb-20 pt-24 md:px-10 md:pb-24"
      aria-labelledby="faq-title"
    >
      <div className="space-y-8">
        <div
          id="faq"
          className="section-anchor flex flex-col gap-4 text-left md:flex-row md:items-end md:justify-between"
        >
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
              FAQ
            </p>
            <h2
              id="faq-title"
              className="font-display font-bold text-2xl uppercase tracking-[0.2em] md:text-4xl"
            >
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
            const panelId = `faq-panel-${index + 1}`;
            const headingId = `faq-heading-${index + 1}`;

            return (
              <details
                key={item.question}
                className="group border border-black/10 bg-white/80 shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
                open={index === 0}
              >
                <summary
                  aria-controls={panelId}
                  className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left md:p-6"
                >
                  <div className="space-y-2">
                    <p className="hidden text-xs uppercase tracking-[0.35em] text-ink-soft md:block">
                      Frage
                    </p>
                    <h3
                      id={headingId}
                      className="font-display text-lg font-bold uppercase tracking-[0.14em] md:text-xl md:tracking-[0.16em]"
                    >
                      {item.question}
                    </h3>
                  </div>
                  <span
                    className="text-lg text-ink-soft transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  className="px-5 pb-5 md:px-6 md:pb-6"
                >
                  <p className="max-w-md text-sm text-ink-soft">{item.answer}</p>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
