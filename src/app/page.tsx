import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Portfolio } from "@/components/sections/portfolio";
import { About } from "@/components/sections/about";
import { Testimonials } from "@/components/sections/testimonials";
import { Program } from "@/components/sections/program";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Testimonials />
      <Program />
      <Contact />
      <Footer />
    </main>
  );
}
