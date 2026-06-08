import { getFeaturedServices } from "@/actions/services";
import { FeaturedServicesGrid } from "./featured-services-grid.tsx";

export async function Services() {
  
  const featuredServices = await getFeaturedServices();

  if (!featuredServices || featuredServices.length === 0) {
    return null;
  }

  
  return (
    <section id="servicios" className="py-24 md:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Servicios
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-6">
            Lo que puedo hacer por ti
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Cada servicio está diseñado para acompañarte en tu proceso de
            transformación personal con atención individualizada.
          </p>
        </div>

        <FeaturedServicesGrid services={featuredServices} />
        
      </div>
    </section>
  );
}