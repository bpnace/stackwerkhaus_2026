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
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,30rem)] lg:items-end">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
            Leistungen
          </p>
          <MaskedTextReveal
            as="h2"
            className="font-display font-bold text-4xl uppercase tracking-[0.2em] md:text-5xl"
          >
            Klare Angebote für echte Anfragepfade
          </MaskedTextReveal>
        </div>
        <div className="flex flex-col items-start gap-5 lg:items-end">
          <p className="max-w-xl text-sm text-ink-soft lg:text-right">
            Jede Leistung ist auf ein typisches Ausgangsproblem ausgerichtet:
            neuer Auftritt, Relaunch oder eine datenschutzbewusste technische
            Basis. So bleibt die Seite für Suchende klar und für Gespräche
            sofort brauchbar.
          </p>
          <TransitionLink
            href="/leistungen"
            className="inline-flex items-center gap-3 border border-black/20 px-5 py-4 text-xs uppercase tracking-[0.3em] transition-colors hover:bg-black hover:text-white"
            data-cursor-text="Leistungen"
          >
            Alle Leistungen
            <span className="text-lg">↗</span>
          </TransitionLink>
        </div>
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
