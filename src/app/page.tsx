import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { faqJsonLd } from "@/lib/faq";

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
  return (
    <>
      <div className="min-h-screen">
        <Hero />
        <Work />
        <Skills />
        <About />
        <Contact />
        <Faq />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
