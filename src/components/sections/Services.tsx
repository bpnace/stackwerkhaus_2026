import { MaskedTextReveal } from "@/components/animations/MaskedTextReveal";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { getServices } from "@/lib/services";

export async function Services() {
  const services = await getServices();

  return (
    <section
      id="services"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 pb-8 md:px-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
            Leistungen
          </p>
          <MaskedTextReveal
            as="h2"
            className="font-display font-bold text-4xl uppercase tracking-[0.2em] md:text-5xl"
          >
            Unsere Leistungen im Detail
          </MaskedTextReveal>
        </div>
        <p className="max-w-lg text-sm text-ink-soft">
          Jeder Pfad ist auf ein typisches Ausgangsproblem ausgerichtet:
          neuer Auftritt, Relaunch oder eine datenschutzbewusste technische
          Basis. So bleibt die Seite für Suchende auffindbarer und sorgt für
          klare nächste Schritte.
        </p>
      </div>

      <div className="mt-6">
        <TransitionLink
          href="/leistungen"
          className="text-xs font-bold uppercase tracking-[0.35em] text-ink-soft hover:text-foreground"
        >
          Alle Leistungen ansehen
        </TransitionLink>
      </div>

      <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
        {services.map((service) => (
          <TransitionLink
            key={service.slug}
            href={`/leistungen/${service.slug}`}
            className="group flex h-full min-h-[31rem] flex-col justify-between border border-black/10 bg-white/70 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1"
            data-cursor-text="Leistung"
          >
            <div className="space-y-5">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                  {service.kicker}
                </p>
                <h3 className="font-display text-2xl font-bold uppercase tracking-[0.18em]">
                  {service.shortTitle}
                </h3>
              </div>
              <p className="text-sm text-ink-soft">{service.summary}</p>
              <div className="space-y-3 border-t border-black/10 pt-4 text-sm text-ink-soft">
                <p>{service.timeline}</p>
                <p>{service.pricingHint}</p>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-between text-xs uppercase tracking-[0.35em]">
              <span>Leistung ansehen</span>
              <span>↗</span>
            </div>
          </TransitionLink>
        ))}
      </div>
    </section>
  );
}
