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
import { getSiteConfig } from "@/actions/site-config";

export default async function Home() {
  const config = await getSiteConfig();

  return (
    <main>
      <Header />
      <Hero />
      <AnnouncementBar
        message={config.announcementMessage || "¡Bienvenido a Huarte Imagen!"}
        isActive={config.announcementActive}
        link={config.announcementLink || undefined}
      />
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
