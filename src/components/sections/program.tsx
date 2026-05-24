"use client";

import { Button } from "@/components/ui/button";
import { Check, ExternalLink } from "lucide-react";
import { usePostHog } from "posthog-js/react";

const programFeatures = [
  "Módulos de colorimetría y análisis de estilo",
  "Guías de maquillaje paso a paso",
  "Templates de armario cápsula",
  "Acceso a comunidad privada",
  "Sesión grupal mensual en vivo",
  "Material descargable de por vida",
];

export function Program() {
  const posthog = usePostHog();
  return (
    <section id="programa" className="py-24 md:py-32 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-background/60 mb-4">
              Programa Online
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6 text-balance">
              Imagen y Belleza: Tu Transformación Digital
            </h2>
            <p className="text-background/80 leading-relaxed mb-8">
              Un programa completo para mujeres que quieren transformar su
              imagen desde casa. Aprende a tu ritmo con contenido exclusivo y
              acompañamiento personalizado.
            </p>
            <p className="text-background/80 leading-relaxed mb-8">
              <strong className="text-background">
                ¿Para quién es este programa?
              </strong>{" "}
              Para ti, que quieres sentirte más segura, aprender a vestirte con
              intención y descubrir una versión más auténtica y elegante de ti
              misma.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 px-8 py-6 text-sm uppercase tracking-wider"
            >
              <a
                href="https://hotmart.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture("program_clicked")}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Acceder al programa
              </a>
            </Button>
          </div>

          {/* Features */}
          <div className="bg-background/5 border border-background/10 p-8 md:p-12">
            <h3 className="font-serif text-2xl font-medium mb-8">
              Qué incluye el programa
            </h3>
            <ul className="space-y-4">
              {programFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-background/10 rounded-full">
                    <Check className="w-3 h-3" />
                  </span>
                  <span className="text-background/80">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
