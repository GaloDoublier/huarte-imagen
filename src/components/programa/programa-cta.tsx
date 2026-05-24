"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, MessageCircle } from "lucide-react";
import { usePostHog } from "posthog-js/react";

export function ProgramaCTA() {
  const posthog = usePostHog();
  return (
    <section className="py-24 md:py-32 bg-foreground text-background">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-background/60 mb-4">
          Empieza Hoy
        </p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6 text-balance">
          Tu transformación comienza con un clic
        </h2>
        <p className="text-lg text-background/80 leading-relaxed mb-10 max-w-2xl mx-auto">
          No esperes más para convertirte en la mejor versión de ti misma.
          Únete a más de 200 mujeres que ya transformaron su imagen y su confianza.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Button
            asChild
            size="lg"
            className="bg-background text-foreground hover:bg-background/90 px-10 py-6 text-sm uppercase tracking-wider"
            onClick={() => posthog.capture("program_clicked")}
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
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-sm text-background/60">
          <span>Acceso de por vida</span>
          <span className="hidden sm:block">|</span>
          <span>Garantía de 7 días</span>
          <span className="hidden sm:block">|</span>
          <span>Comunidad privada</span>
        </div>
      </div>
    </section>
  );
}
