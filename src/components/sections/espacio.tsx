"use client";

import Image from "next/image";

const portfolioImages = [
  {
    src: "/images/portfolio-1.jpg",
    alt: "Sesión de belleza y maquillaje profesional",
  },
  {
    src: "/images/portfolio-2.jpg",
    alt: "Consultoría de estilo y guardarropa",
  },
  {
    src: "/images/portfolio-3.jpg",
    alt: "Resultado de transformación de imagen",
  },
];

export function Espacio() {
  return (
    <section id="espacio" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Espacio
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-6">
            Mi estética, mi trabajo
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Un vistazo a mi espacio de trabajo y las transformaciones que
            acompaño. Cada imagen refleja mi filosofía: belleza auténtica y
            elegancia natural.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {portfolioImages.map((image) => (
            <div
              key={image.src}
              className={`relative overflow-hidden aspect-square`}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
