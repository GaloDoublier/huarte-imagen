"use client";

import Image from "next/image";
import { useSiteConfig } from "@/providers/SiteConfigProvider";

export function About() {
  const config = useSiteConfig();

  return (
    <section id="sobre-mi" className="py-24 md:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] lg:aspect-[3/4]">
            <Image
              src="/images/about.jpg"
              alt="Huarte - Asesora de imagen personal"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Sobre Mí
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-8">
              Hola, soy Huarte
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              {config.aboutBio ? (
                config.aboutBio.split("\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))
              ) : (
                <>
                  <p>
                    Soy asesora de imagen y consultora de belleza con más de 8 años
                    de experiencia ayudando a mujeres a descubrir su verdadero
                    potencial a través de la imagen personal.
                  </p>
                  <p>
                    Mi filosofía se basa en que cada mujer tiene una belleza única
                    que merece ser realzada. No se trata de seguir tendencias, sino
                    de encontrar tu esencia y aprender a comunicarla a través de tu
                    imagen.
                  </p>
                  <p>
                    He formado a cientos de mujeres que hoy se sienten más seguras,
                    elegantes y auténticas. Mi mayor satisfacción es ver cómo la
                    transformación exterior despierta una confianza interior que
                    cambia vidas.
                  </p>
                </>
              )}
            </div>
            <div className="mt-10 pt-8 border-t border-border">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="font-serif text-3xl md:text-4xl font-medium text-foreground">
                    {config.aboutStat1Value || "8+"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {config.aboutStat1Label || "Años de experiencia"}
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl md:text-4xl font-medium text-foreground">
                    {config.aboutStat2Value || "500+"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {config.aboutStat2Label || "Clientas transformadas"}
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl md:text-4xl font-medium text-foreground">
                    {config.aboutStat3Value || "100%"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {config.aboutStat3Label || "Dedicación personal"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
