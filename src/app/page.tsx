import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Work } from "@/components/sections/Work";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Work />
      <Skills />
      <About />
      <Contact />
    </div>
  );
}
