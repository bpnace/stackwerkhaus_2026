import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Work } from "@/components/sections/Work";
import { faqJsonLd } from "@/lib/faq";

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
