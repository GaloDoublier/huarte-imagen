"use client";

import { Check } from "lucide-react";

const modules = [
  {
    number: "01",
    title: "Descubre Tu Colorimetría",
    topics: [
      "Análisis de tu paleta personal de colores",
      "Cómo identificar tu estación y subtono",
      "Guía de colores para maquillaje y ropa",
      "Errores comunes y cómo evitarlos",
    ],
  },
  {
    number: "02",
    title: "Maquillaje que Te Representa",
    topics: [
      "Técnicas básicas de aplicación",
      "Maquillaje según la forma de tu rostro",
      "Looks para día y noche",
      "Productos esenciales según tu tipo de piel",
    ],
  },
  {
    number: "03",
    title: "Estilismo y Armario Cápsula",
    topics: [
      "Cómo crear un armario funcional",
      "Prendas básicas que no pueden faltar",
      "Combinaciones versátiles y elegantes",
      "Vestir según tu tipo de cuerpo",
    ],
  },
  {
    number: "04",
    title: "Tu Imagen Personal",
    topics: [
      "Define tu estilo único",
      "Presencia y lenguaje corporal",
      "Accesorios que elevan tu look",
      "Plan de acción personalizado",
    ],
  },
];

const bonuses = [
  "Acceso a comunidad privada de alumnas",
  "Sesión grupal mensual en vivo",
  "Material descargable de por vida",
  "Templates de armario cápsula",
  "Guías de compras inteligentes",
];

export function ProgramaModules() {
  return (
    <section id="modulos" className="py-20 md:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Contenido
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-foreground mb-6 text-balance">
            Qué vas a aprender
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Un programa estructurado en 4 módulos diseñados para llevarte paso a
            paso hacia tu mejor versión.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {modules.map((module) => (
            <div
              key={module.number}
              className="bg-background border border-border/50 p-8 md:p-10"
            >
              <div className="flex items-start gap-6">
                <span className="text-5xl font-serif font-medium text-accent/40">
                  {module.number}
                </span>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl font-medium text-foreground mb-4">
                    {module.title}
                  </h3>
                  <ul className="space-y-3">
                    {module.topics.map((topic) => (
                      <li
                        key={topic}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <Check className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                        <span className="text-sm">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-foreground text-background p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-serif text-2xl md:text-3xl font-medium text-center mb-8">
              Además incluye
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {bonuses.map((bonus) => (
                <div key={bonus} className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-background/10 rounded-full flex-shrink-0">
                    <Check className="w-3 h-3" />
                  </span>
                  <span className="text-background/90">{bonus}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
