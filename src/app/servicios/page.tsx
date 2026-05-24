import { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Footer } from "@/components/sections/footer";
import { ServicesHero } from "@/components/servicios/services-hero";
import { ServiceCategory } from "@/components/servicios/service-category";


export const metadata: Metadata = {
  title: "Servicios | Huarte Imagen",
  description:
    "Descubre todos nuestros servicios de maquillaje profesional y tratamientos estéticos. Reserva tu cita por WhatsApp.",
};

const maquillajeServices = [
  {
    title: "Maquillaje Social",
    description:
      "Ideal para eventos, reuniones o cuando quieres verte espectacular. Un look personalizado que realza tu belleza natural.",
    duration: "45-60 min",
    price: "Desde 45€",
    image: "/images/service-maquillaje-1.jpg",
  },
  {
    title: "Maquillaje Novias",
    description:
      "Tu día especial merece un look perfecto. Incluye prueba previa y maquillaje el día de la boda con productos de larga duración.",
    duration: "90 min",
    price: "Desde 120€",
    image: "/images/service-maquillaje-2.jpg",
  },
  {
    title: "Clase de Automaquillaje",
    description:
      "Aprende a maquillarte según tus rasgos y estilo de vida. Técnicas personalizadas que podrás aplicar cada día.",
    duration: "2 horas",
    price: "Desde 85€",
    image: "/images/portfolio-1.jpg",
  },
  {
    title: "Maquillaje Editorial",
    description:
      "Para sesiones fotográficas, portfolios o contenido profesional. Looks creativos adaptados a tu visión.",
    duration: "60-90 min",
    price: "Consultar",
    image: "/images/portfolio-3.jpg",
  },
];

const tratamientosServices = [
  {
    title: "Tratamiento Facial Hidratante",
    description:
      "Hidratación profunda para pieles deshidratadas o apagadas. Recupera la luminosidad y elasticidad de tu piel.",
    duration: "60 min",
    price: "Desde 55€",
    image: "/images/service-tratamiento-1.jpg",
  },
  {
    title: "Limpieza Facial Profunda",
    description:
      "Limpieza completa con extracción, mascarilla y tratamiento específico para tu tipo de piel.",
    duration: "75 min",
    price: "Desde 65€",
    image: "/images/service-tratamiento-2.jpg",
  },
  {
    title: "Tratamiento Anti-edad",
    description:
      "Combate los signos del envejecimiento con activos de última generación. Resultados visibles desde la primera sesión.",
    duration: "90 min",
    price: "Desde 85€",
    image: "/images/portfolio-2.jpg",
  },
  {
    title: "Diseño de Cejas",
    description:
      "Armoniza tu rostro con un diseño de cejas personalizado. Incluye depilación, perfilado y acabado natural.",
    duration: "30 min",
    price: "Desde 20€",
    image: "/images/about.jpg",
  },
];

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-background">
      <PageHeader />
      <ServicesHero />
      <ServiceCategory
        id="maquillaje"
        title="Maquillaje"
        subtitle="Realza tu belleza"
        description="Cada rostro es único. Mis servicios de maquillaje están diseñados para potenciar tus rasgos naturales y hacerte sentir radiante."
        services={maquillajeServices}
      />
      <ServiceCategory
        id="tratamientos"
        title="Tratamientos Estéticos"
        subtitle="Cuida tu piel"
        description="Tratamientos profesionales con productos de alta calidad para mantener tu piel sana, luminosa y rejuvenecida."
        services={tratamientosServices}
        alternate
      />
      <Footer />
    </main>
  );
}
