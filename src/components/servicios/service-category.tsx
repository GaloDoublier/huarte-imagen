"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Clock, MessageCircle } from "lucide-react";
import { usePostHog } from "posthog-js/react";

interface Service {
  title: string;
  description: string;
  duration: string;
  price: string;
  image: string;
}

interface ServiceCategoryProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  services: Service[];
  alternate?: boolean;
}

export function ServiceCategory({
  id,
  title,
  subtitle,
  description,
  services,
  alternate = false,
}: ServiceCategoryProps) {
  const posthog = usePostHog();
  return (
    <section
      id={id}
      className={`py-20 md:py-28 ${alternate ? "bg-card" : "bg-background"}`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
            {subtitle}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-foreground mb-6">
            {title}
          </h2>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service) => (
            <article
              key={service.title}
              className="group bg-background border border-border/50 overflow-hidden hover:border-accent/30 transition-all duration-300"
            >
              <div className="relative h-56 md:h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/5 transition-colors" />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="font-serif text-2xl font-medium text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {service.duration}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {service.price}
                  </span>
                </div>
                <Button
                  asChild
                  className="w-full bg-foreground text-background hover:bg-foreground/90 text-xs uppercase tracking-wider"
                  onClick={() => {
                    posthog.capture("service_reserved", {
                      servicio: service.title,
                      categoria: id,
                    });
                  }}
                >
                  <a
                    href={`https://wa.me/34600000000?text=Hola, me interesa el servicio de ${service.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Reservar por WhatsApp
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
