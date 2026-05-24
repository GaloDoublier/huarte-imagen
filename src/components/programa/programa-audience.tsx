"use client";

import { Heart, Frown, HelpCircle, Sparkles } from "lucide-react";

const painPoints = [
  {
    icon: Frown,
    title: "Te vistes sin confianza",
    description:
      "Sientes que nada te queda bien y pasas demasiado tiempo frente al espejo sin saber qué ponerte.",
  },
  {
    icon: HelpCircle,
    title: "No conoces tus colores",
    description:
      "Compras ropa que luego no usas porque no sabes qué tonos realmente te favorecen.",
  },
  {
    icon: Heart,
    title: "Quieres verte mejor",
    description:
      "Sabes que puedes proyectar una mejor imagen pero no sabes por dónde empezar.",
  },
  {
    icon: Sparkles,
    title: "Buscas un cambio real",
    description:
      "Estás lista para invertir en ti misma y descubrir una versión más auténtica y elegante.",
  },
];

export function ProgramaAudience() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Para ti
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-foreground mb-6 text-balance">
            Este programa es para ti si...
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Si te identificas con alguna de estas situaciones, este programa fue
            creado pensando en ti.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {painPoints.map((point) => (
            <div
              key={point.title}
              className="text-center p-8 bg-card border border-border/50 hover:border-accent/30 transition-colors"
            >
              <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center bg-secondary text-foreground">
                <point.icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                {point.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
