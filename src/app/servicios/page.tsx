import { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Footer } from "@/components/sections/footer";
import { ServiceCategory } from "@/components/servicios/service-category";
import { getServices } from "@/actions/services";

export const metadata: Metadata = {
  title: "Servicios | Huarte Imagen",
  description:
    "Descubre todos nuestros servicios de maquillaje profesional y tratamientos estéticos. Reserva tu cita por WhatsApp.",
};

const categoryText: Record<string, { subtitle: string; description: string }> = {
  Maquillaje: {
    subtitle: "Realza tu belleza",
    description: "Cada rostro es único. Mis servicios de maquillaje están diseñados para potenciar tus rasgos naturales y hacerte sentir radiante.",
  },
  Estética: {
    subtitle: "Cuida tu piel",
    description: "Tratamientos profesionales con productos de alta calidad para mantener tu piel sana, luminosa y rejuvenecida.",
  },
  Estilismo: {
    subtitle: "Encuentra tu estilo",
    description: "Asesoría personalizada para que tu imagen exterior refleje tu verdadera esencia con total confianza.",
  },
};

export default async function ServiciosPage() {
  const allServices = await getServices();
  const activeServices = allServices.filter((s) => s.isActive);
  const categoriasUnicas = Array.from(new Set(activeServices.map((s) => s.category)));

  return (
    <main className="min-h-screen bg-background">
      <PageHeader />
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


          {categoriasUnicas.length > 0 && (
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              {categoriasUnicas.map((categoria) => {
                const categoryId = categoria.toLowerCase().replace(/\s+/g, "-");
                return (
                  <a
                    key={`nav-${categoria}`}
                    href={`#${categoryId}`}
                    className="px-6 py-3 bg-background border border-border text-foreground text-sm uppercase tracking-wider hover:bg-secondary transition-colors"
                  >
                    {categoria}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {categoriasUnicas.length > 0 ? (
        categoriasUnicas.map((categoria, index) => {
          const serviciosDeEstaCategoria = activeServices.filter((s) => s.category === categoria);
          
          const mappedServices = serviciosDeEstaCategoria.map((s) => ({
            title: s.name,
            description: s.description || "",
            duration: s.duration || "Consultar",
            price: s.price > 0 ? `$ ${s.price.toLocaleString("es-AR")}` : "Consultar valor", 
            image: s.imageUrl || "/images/placeholder.jpg", 
          }));

          const textos = categoryText[categoria] || {
            subtitle: `Servicios de ${categoria}`,
            description: `Explora todas nuestras opciones de ${categoria.toLowerCase()} diseñadas especialmente para ti.`,
          };

          const categoryId = categoria.toLowerCase().replace(/\s+/g, "-");

          return (
            <ServiceCategory
              key={categoria}
              id={categoryId}
              title={categoria}
              subtitle={textos.subtitle}
              description={textos.description}
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