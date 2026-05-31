import { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Footer } from "@/components/sections/footer";
import { ServiceCategory } from "@/components/servicios/service-category";
import { getCategoriesWithServices } from "@/actions/categories";

export const metadata: Metadata = {
  title: "Servicios | Huarte Imagen",
  description:
    "Descubre todos nuestros servicios de maquillaje profesional y tratamientos estéticos. Reserva tu cita por WhatsApp.",
};

export default async function ServiciosPage() {

  const categories = await getCategoriesWithServices();

  return (
    <main className="min-h-screen bg-background">
      <PageHeader />
      
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Servicios
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-medium text-foreground mb-6 text-balance">
              Nuestros Servicios
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cada servicio que ofrezco está pensado para acompañarte en tu camino
              hacia una imagen más auténtica y segura. Descubre cómo puedo ayudarte
              a brillar.
            </p>
          </div>

          {/* Botones de navegación dinámicos basados en la BDD */}
          {categories.length > 0 && (
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              {categories.map((cat) => {
                const categoryId = cat.name.toLowerCase().replace(/\s+/g, "-");
                return (
                  <a
                    key={`nav-${cat.id}`}
                    href={`#${categoryId}`}
                    className="px-6 py-3 bg-background border border-border text-foreground text-sm uppercase tracking-wider hover:bg-secondary transition-colors"
                  >
                    {cat.name}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Secciones de Servicios agrupados por Categoría */}
      {categories.length > 0 ? (
        categories.map((cat, index) => {
          const categoryId = cat.name.toLowerCase().replace(/\s+/g, "-");
          const mappedServices = cat.services.map((s) => ({
            title: s.name,
            description: s.description || "",
            duration: s.duration || "Consultar",
            price: s.price > 0 ? `$ ${s.price.toLocaleString("es-AR")}` : "Consultar valor", 
            image: s.imageUrl || "/images/placeholder.jpg", 
          }));

          return (
            <ServiceCategory
              key={cat.id}
              id={categoryId}
              title={cat.name}
              subtitle={cat.slogan || `Servicios de ${cat.name}`}
              description={cat.description || ""}
              services={mappedServices}
              alternate={index % 2 !== 0}
            />
          );
        })
      ) : (
        <div className="py-32 text-center">
          <p className="text-muted-foreground">Próximamente nuevos servicios disponibles.</p>
        </div>
      )}

      <Footer />
    </main>
  );
}