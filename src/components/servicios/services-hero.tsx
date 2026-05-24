"use client";

export function ServicesHero() {
  return (
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

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a
            href="#maquillaje"
            className="px-6 py-3 bg-background border border-border text-foreground text-sm uppercase tracking-wider hover:bg-secondary transition-colors"
          >
            Maquillaje
          </a>
          <a
            href="#tratamientos"
            className="px-6 py-3 bg-background border border-border text-foreground text-sm uppercase tracking-wider hover:bg-secondary transition-colors"
          >
            Tratamientos Estéticos
          </a>
        </div>
      </div>
    </section>
  );
}
