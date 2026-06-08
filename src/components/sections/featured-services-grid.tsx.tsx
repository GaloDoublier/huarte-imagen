"use client";

import { Palette, Sparkles, Crown, Shirt, MessageCircle } from "lucide-react";
import { usePostHog } from "posthog-js/react";
import { Button } from "@/components/ui/button";

const getCategoryIcon = (category: string) => {
  const lowerCat = category.toLowerCase();
  if (lowerCat.includes("maquillaje")) return Sparkles;
  if (lowerCat.includes("estética") || lowerCat.includes("estetica")) return Palette;
  if (lowerCat.includes("estilismo") || lowerCat.includes("ropa")) return Shirt;
  return Crown;
};

export function FeaturedServicesGrid({ services }: { services: any[] }) {
  const posthog = usePostHog();

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      {services.map((service) => {
        const categoryName = service.category?.name || "Categoría";
        const Icon = getCategoryIcon(categoryName);

        return (
          <div
            key={service.id}
            className="group p-8 md:p-10 bg-background border border-border/50 hover:border-accent/50 transition-all duration-300 flex flex-col"
          >
            <div className="flex items-start gap-6 mb-8">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-secondary text-foreground">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-2xl font-medium text-foreground mb-3">
                  {service.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>

                {(service.duration || service.price > 0) && (
                  <div className="flex gap-4 text-sm text-accent-foreground/80 italic border-l-2 border-accent pl-4">
                    {service.duration && (
                      <span>Duración: {service.duration}</span>
                    )}
                    {service.price > 0 && (
                      <span>Valor: ${service.price}</span>
                    )}
                  </div>
                )}
              </div>
            </div>


            <div className="m-auto pt-4">
              <Button
                asChild
                className=" bg-foreground text-background hover:bg-foreground/90 text-xs uppercase tracking-wider"
                onClick={() => {
                  posthog.capture("service_reserved", {
                    servicio: service.name,
                    categoria: categoryName,
                  });
                }}
              >
                <a
                  href={`https://wa.me/34600000000?text=Hola, me interesa el servicio de ${service.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Reservar por WhatsApp
                </a>
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}