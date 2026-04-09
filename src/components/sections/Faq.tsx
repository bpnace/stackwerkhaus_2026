import { faqItems } from "@/lib/faq";

const faqColumns = faqItems.reduce<[typeof faqItems, typeof faqItems]>(
  (columns, item, index) => {
    columns[index % 2].push(item);
    return columns;
  },
  [[], []],
);

export function Faq() {
  const renderFaqItem = (
    item: (typeof faqItems)[number],
    index: number,
  ) => {
    const panelId = `faq-panel-${index + 1}`;
    const headingId = `faq-heading-${index + 1}`;

    return (
      <details
        key={item.question}
        className="group overflow-hidden border border-black/10 bg-white/85 shadow-[0_18px_40px_rgba(0,0,0,0.06)] transition-colors open:bg-white"
      >
        <summary
          aria-controls={panelId}
          className="flex cursor-pointer list-none items-start justify-between gap-5 px-5 py-5 text-left md:px-6 md:py-6"
        >
          <div className="flex min-w-0 gap-4">
            <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 text-[10px] font-bold uppercase tracking-[0.22em] text-ink-soft">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="space-y-2">
              <p className="hidden text-[10px] uppercase tracking-[0.35em] text-ink-soft md:block">
                Frage
              </p>
              <h3
                id={headingId}
                className="font-display text-lg font-bold uppercase tracking-[0.12em] md:text-xl md:tracking-[0.14em]"
              >
                {item.question}
              </h3>
            </div>
          </div>
          <span
            className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 text-base text-ink-soft transition-transform duration-300 group-open:rotate-45"
            aria-hidden="true"
          >
            +
          </span>
        </summary>
        <div
          id={panelId}
          role="region"
          aria-labelledby={headingId}
          className="border-t border-black/8 px-5 pb-5 pt-4 md:px-6 md:pb-6"
        >
          <p className="max-w-md text-sm leading-relaxed text-ink-soft">
            {item.answer}
          </p>
        </div>
      </details>
    );
  };

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

        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {faqColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-4 md:gap-6">
              {column.map((item, itemIndex) =>
                renderFaqItem(item, columnIndex + itemIndex * 2),
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
