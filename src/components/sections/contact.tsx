"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Mail } from "lucide-react";
import { useState } from "react";
import { usePostHog } from "posthog-js/react";
import { useSiteConfig } from "@/providers/SiteConfigProvider";

const WHATSAPP_BASE = "https://wa.me";

export function Contact() {
  const config = useSiteConfig();
  const [name, setName] = useState("");
  const [emailField, setEmailField] = useState("");
  const [service, setService] = useState("");
  const [messageField, setMessageField] = useState("");

  const posthog = usePostHog();

  const whatsappUrl = config.whatsappNumber
    ? `${WHATSAPP_BASE}/${config.whatsappNumber.replace(/[^0-9]/g, "")}`
    : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    posthog.capture("whatsapp_contact_form_submitted");

    const text = `Hola, soy ${name || "(sin nombre)"}.\nEmail: ${
      emailField || "(sin email)"
    }.\nServicio: ${service || "(sin servicio)"}.\nMensaje: ${
      messageField || "(sin mensaje)"
    }`;

    const base = `${WHATSAPP_BASE}/${config.whatsappNumber.replace(/[^0-9]/g, "")}`;
    const url = `${base}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contacto" className="py-24 md:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Contacto
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-6">
              ¿Lista para tu transformación?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Estoy aquí para acompañarte en este proceso. Escríbeme por
              WhatsApp para una consulta inicial gratuita o completa el
              formulario y me pondré en contacto contigo.
            </p>

            <div className="space-y-6">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-[#25D366] text-white hover:bg-[#25D366]/90 px-8 py-6 text-sm uppercase tracking-wider"
                onClick={() => posthog.capture("whatsapp_clicked")}
              >
                <a href={whatsappUrl || "#"} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Escríbeme por WhatsApp
                </a>
              </Button>

              <div className="flex items-center gap-6 pt-4">
                <a
                  href={`mailto:${config.email}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">{config.email || "hola@huarteimagen.com"}</span>
                </a>
                <a
                  href={config.instagramUrl || "https://instagram.com/huarteimagen"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span className="text-sm">{config.instagramUrl ? "@" + config.instagramUrl.split("/").pop()?.replace("@", "") || "huarteimagen" : "@huarteimagen"}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-background border border-border/50 p-8 md:p-10">
            <h3 className="font-serif text-2xl font-medium text-foreground mb-6">
              Envíame un mensaje
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm text-foreground">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-card border-border focus:border-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={emailField}
                    onChange={(e) => setEmailField(e.target.value)}
                    className="bg-card border-border focus:border-accent"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="service" className="text-sm text-foreground">
                  Servicio de interés
                </Label>
                <Input
                  id="service"
                  placeholder="¿Qué servicio te interesa?"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="bg-card border-border focus:border-accent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm text-foreground">
                  Mensaje
                </Label>
                <Textarea
                  id="message"
                  placeholder="Cuéntame un poco sobre ti y qué te gustaría lograr..."
                  rows={4}
                  value={messageField}
                  onChange={(e) => setMessageField(e.target.value)}
                  className="bg-card border-border focus:border-accent resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-foreground text-background hover:bg-foreground/90 py-6 text-sm uppercase tracking-wider"
              >
                Enviar mensaje
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Para una respuesta más rápida, te recomiendo contactarme por
                WhatsApp.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
