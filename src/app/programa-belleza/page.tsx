import { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Footer } from "@/components/sections/footer";
import { ProgramaHero } from "@/components/programa/programa-hero";
import { ProgramaAudience } from "@/components/programa/programa-audience";
import { ProgramaModules } from "@/components/programa/programa-modules";
import { ProgramaFAQ } from "@/components/programa/programa-faq";
import { ProgramaCTA } from "@/components/programa/programa-cta";

export const metadata: Metadata = {
  title: "Programa Imagen y Belleza | Huarte Imagen",
  description:
    "Transforma tu imagen desde casa con nuestro programa online. Colorimetría, maquillaje, estilismo y más. Accede ahora en Hotmart.",
};

export default function ProgramaBellezaPage() {
  return (
    <main className="min-h-screen bg-background">
      <PageHeader />
      <ProgramaHero />
      <ProgramaAudience />
      <ProgramaModules />
      <ProgramaFAQ />
      <ProgramaCTA />
      <Footer />
    </main>
  );
}
