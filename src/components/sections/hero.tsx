"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export function Hero() {
  const whatsappUrl =
    "https://wa.me/1234567890?text=Hola,%20me%20gustaría%20agendar%20una%20sesión";

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Huarte Imagen - Asesoría de imagen y belleza"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6">
              Asesoría de Imagen Personal
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-foreground mb-6 text-balance">
              Descubre la mejor versión de ti misma
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
              Transforma tu imagen y eleva tu confianza con asesoría
              personalizada en estilo, belleza y presencia personal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-sm uppercase tracking-wider"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Agenda tu sesión
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-foreground/30 hover:bg-foreground/5 px-8 py-6 text-sm uppercase tracking-wider bg-transparent"
              >
                <a href="#servicios">Conoce mis servicios</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
