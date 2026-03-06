import dynamic from "next/dynamic";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { faqItems } from "@/lib/faq";
import {
  buildFaqSchema,
  buildItemListSchema,
  buildWebPageSchema,
} from "@/lib/seo";
import { services } from "@/lib/services";

const Skills = dynamic(() =>
  import("@/components/sections/Skills").then((m) => ({ default: m.Skills })),
);
const About = dynamic(() =>
  import("@/components/sections/About").then((m) => ({ default: m.About })),
);
const Contact = dynamic(() =>
  import("@/components/sections/Contact").then((m) => ({
    default: m.Contact,
  })),
);
const Faq = dynamic(() =>
  import("@/components/sections/Faq").then((m) => ({ default: m.Faq })),
);

export default function Home() {
  const homepageGraph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageSchema({
        title: "Klare Websites für Dienstleister und KMU",
        description:
          "STACKWERKHAUS entwickelt schnelle, klare Websites für Dienstleister, kleine Unternehmen und neue Marken in DACH.",
        path: "/",
        dateModified: "2026-03-06",
      }),
      buildFaqSchema(faqItems),
      buildItemListSchema({
        title: "Leistungen von STACKWERKHAUS",
        path: "/leistungen",
        items: services.map((service) => ({
          name: service.title,
          path: `/leistungen/${service.slug}`,
        })),
      }),
    ],
  };

  return (
    <>
      <div className="min-h-screen">
        <Hero />
        <Services />
        <Work />
        <Skills />
        <About />
        <Contact />
        <Faq />
      </div>
      <JsonLd data={homepageGraph} />
    </>
  );
}
