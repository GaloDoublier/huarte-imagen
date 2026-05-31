import { getFeaturedServices } from "@/actions/services";
import { Palette, Sparkles, Crown, Shirt } from "lucide-react";

// Función auxiliar para asignar íconos según la categoría de tu base de datos
const getCategoryIcon = (category: string) => {
  const lowerCat = category.toLowerCase();
  if (lowerCat.includes("maquillaje")) return Sparkles;
  if (lowerCat.includes("estética") || lowerCat.includes("estetica")) return Palette;
  if (lowerCat.includes("estilismo") || lowerCat.includes("ropa")) return Shirt;
  return Crown; // Ícono por defecto
};

export async function Services() {
  // Traemos los 4 servicios destacados directamente desde Prisma
  const featuredServices = await getFeaturedServices();

  // Si Mónica no destacó ninguno todavía, ocultamos la sección
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

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {featuredServices.map((service) => {
            const Icon = getCategoryIcon(service.category);

            return (
              <div
                key={service.id}
                className="group p-8 md:p-10 bg-background border border-border/50 hover:border-accent/50 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-secondary text-foreground">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-medium text-foreground mb-3">
                      {service.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {service.description}
                    </p>
                    
                    {(service.duration || service.price > 0) && (
                      <div className="flex gap-4 text-sm text-accent-foreground/80 italic border-l-2 border-accent pl-4">
                        {service.duration && (
                          <span>Duración: {service.duration}</span>
                        )}
                        {service.price > 0 && (
                          <span>Valor: ${service.price}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}