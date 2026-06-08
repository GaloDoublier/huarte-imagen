import { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/sections/page-header";
import { Footer } from "@/components/sections/footer";
import { ServiceCategory } from "@/components/servicios/service-category";
import { getCategoriesWithServices } from "@/actions/categories";
import { AnnouncementBar } from "@/components/ui/announcement-bar";
import { getSiteConfig } from "@/actions/site-config";

export const metadata: Metadata = {
  title: "Servicios | Huarte Imagen",
  description:
    "Descubre todos nuestros servicios de maquillaje profesional y tratamientos estéticos. Reserva tu cita por WhatsApp.",
};

export default async function ServiciosPage() {
  const categories = await getCategoriesWithServices();
  const config = await getSiteConfig();

  return (
    <main className="min-h-screen bg-background">
      <PageHeader />
      
      <section 
        className="pt-32 pb-20 md:pt-40 md:pb-28 bg-secondary/30"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <div className="absolute inset-0 z-0">
          <Image
          src="/images/services.jpg"
          alt="Fondo de sección servicios"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/70" />
        </div>
        
        
        <div className="absolute inset-0 bg-background/80 -z-10" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
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
      
      <AnnouncementBar
        message={config.announcementMessage || "¡Bienvenido a Huarte Imagen!"}
        isActive={config.announcementActive}
        link={config.announcementLink || undefined}
      />

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