"use client";

import { Palette, Sparkles, Crown, Shirt } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Colorimetría Personal",
    description:
      "Descubre los colores que realzan tu belleza natural y te hacen brillar en cualquier ocasión.",
    benefit: "Potencia tu luminosidad y reduce la necesidad de maquillaje.",
  },
  {
    icon: Sparkles,
    title: "Asesoría de Maquillaje",
    description:
      "Aprende técnicas personalizadas para realzar tus rasgos únicos con un maquillaje que te representa.",
    benefit: "Siéntete segura y radiante con un look auténtico.",
  },
  {
    icon: Shirt,
    title: "Estilismo Personal",
    description:
      "Construye un guardarropa funcional y elegante que refleje tu personalidad y estilo de vida.",
    benefit: "Vístete con confianza cada día sin dudar frente al espejo.",
  },
  {
    icon: Crown,
    title: "Transformación Integral",
    description:
      "Un programa completo que combina imagen, estilo y presencia para una renovación total.",
    benefit: "Experimenta un cambio profundo en cómo te ves y te sientes.",
  },
];

export function Services() {
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
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-8 md:p-10 bg-background border border-border/50 hover:border-accent/50 transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-secondary text-foreground">
                  <service.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl font-medium text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <p className="text-sm text-accent-foreground/80 italic border-l-2 border-accent pl-4">
                    {service.benefit}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
