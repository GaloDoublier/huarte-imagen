import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Espacio } from "@/components/sections/espacio";
import { About } from "@/components/sections/about";
import { Testimonials } from "@/components/sections/testimonials";
import { Program } from "@/components/sections/program";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { AnnouncementBar } from "@/components/ui/announcement-bar";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <AnnouncementBar  message="!25% de descuento pagando con tu targeta Porongon!" isActive={true} />
      <Services />
      <Espacio />
      <About />
      <Testimonials />
      <Program />
      <Contact />
      <Footer />
    </main>
  );
}
