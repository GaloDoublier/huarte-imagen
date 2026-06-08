"use client";

import { Quote } from "lucide-react";
import { useSiteConfig } from "@/providers/SiteConfigProvider";

const fallbackTestimonials = [
  {
    quote: "Después de mi sesión con Huarte, me miro al espejo y finalmente veo la mujer que siempre quise ser. No solo cambió mi armario, cambió cómo me siento conmigo misma.",
    author: "María García",
    role: "Empresaria",
  },
  {
    quote: "Pensé que sabía vestirme, pero Huarte me mostró colores y estilos que nunca hubiera elegido sola. Ahora recibo cumplidos constantemente.",
    author: "Laura Martínez",
    role: "Abogada",
  },
  {
    quote: "La inversión en asesoría de imagen fue la mejor decisión que tomé este año. Me siento más segura en reuniones y eventos profesionales.",
    author: "Ana Rodríguez",
    role: "Directora de Marketing",
  },
];

export function Testimonials() {
  const config = useSiteConfig();
  const testimonials = config.testimonials.length > 0 ? config.testimonials : fallbackTestimonials;

  return (
    <section id="testimonios" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Testimonios
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-6">
            Lo que dicen mis clientas
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author + index}
              className="bg-card border border-border/50 p-8 md:p-10"
            >
              <Quote className="w-8 h-8 text-accent mb-6" />
              <blockquote className="text-foreground leading-relaxed mb-8">
                {`"${testimonial.quote}"`}
              </blockquote>
              <div className="border-t border-border pt-6">
                <p className="font-medium text-foreground">
                  {testimonial.author}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
