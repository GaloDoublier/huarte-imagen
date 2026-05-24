"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLink, Play } from "lucide-react";

export function ProgramaHero() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
              Programa Online
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6 text-balance">
              Imagen y Belleza: Tu Transformación Digital
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Un programa completo para mujeres que quieren transformar su
              imagen desde la comodidad de su hogar. Aprende a tu ritmo con
              contenido exclusivo, guías prácticas y acompañamiento personalizado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-sm uppercase tracking-wider"
              >
                <a
                  href="https://hotmart.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Acceder al programa
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-6 text-sm uppercase tracking-wider"
              >
                <a href="#modulos">
                  <Play className="mr-2 h-4 w-4" />
                  Ver contenido
                </a>
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/programa-hero.jpg"
                alt="Programa Imagen y Belleza"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-foreground/5" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background p-6 border border-border shadow-lg max-w-xs hidden md:block">
              <p className="font-serif text-2xl font-medium text-foreground mb-2">
                +200
              </p>
              <p className="text-sm text-muted-foreground">
                Mujeres ya transformaron su imagen con este programa
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
