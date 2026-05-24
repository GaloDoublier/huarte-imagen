"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

export default function AdminConfiguracionPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [config, setConfig] = useState({
    siteName: "Huarte Imagen",
    whatsappNumber: "+34600000000",
    hotmartUrl: "https://hotmart.com/es/marketplace/productos/imagen-y-belleza",
    instagramUrl: "https://instagram.com/huarteimagen",
    email: "hola@huarteimagen.com",
    aboutText: "Soy María, asesora de imagen y especialista en belleza con más de 10 años de experiencia...",
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-medium text-foreground">
          Configuración
        </h1>
        <p className="text-muted-foreground mt-1">
          Personaliza la información de tu sitio web
        </p>
      </div>

      {/* General Settings */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Información General</CardTitle>
          <CardDescription>
            Datos básicos que aparecen en todo el sitio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="siteName">Nombre del Sitio</FieldLabel>
              <Input
                id="siteName"
                value={config.siteName}
                onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
                className="bg-background max-w-md"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Correo Electrónico</FieldLabel>
              <Input
                id="email"
                type="email"
                value={config.email}
                onChange={(e) => setConfig({ ...config, email: e.target.value })}
                className="bg-background max-w-md"
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      {/* Contact & Social */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Contacto y Redes</CardTitle>
          <CardDescription>
            Enlaces y números de contacto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="whatsapp">Número de WhatsApp</FieldLabel>
              <Input
                id="whatsapp"
                value={config.whatsappNumber}
                onChange={(e) => setConfig({ ...config, whatsappNumber: e.target.value })}
                placeholder="+34600000000"
                className="bg-background max-w-md"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Formato internacional con código de país
              </p>
            </Field>
            <Field>
              <FieldLabel htmlFor="instagram">Instagram URL</FieldLabel>
              <Input
                id="instagram"
                value={config.instagramUrl}
                onChange={(e) => setConfig({ ...config, instagramUrl: e.target.value })}
                placeholder="https://instagram.com/..."
                className="bg-background max-w-md"
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      {/* Program Settings */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Programa Online</CardTitle>
          <CardDescription>
            Configuración del curso en Hotmart
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Field>
            <FieldLabel htmlFor="hotmart">URL de Hotmart</FieldLabel>
            <Input
              id="hotmart"
              value={config.hotmartUrl}
              onChange={(e) => setConfig({ ...config, hotmartUrl: e.target.value })}
              placeholder="https://hotmart.com/..."
              className="bg-background"
            />
          </Field>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Sobre Mí</CardTitle>
          <CardDescription>
            Texto que aparece en la sección &quot;Sobre Mí&quot;
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Field>
            <FieldLabel htmlFor="about">Biografía</FieldLabel>
            <Textarea
              id="about"
              value={config.aboutText}
              onChange={(e) => setConfig({ ...config, aboutText: e.target.value })}
              rows={5}
              className="bg-background"
            />
          </Field>
        </CardContent>
      </Card>

      <Separator />

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Guardando...
            </>
          ) : (
            "Guardar Cambios"
          )}
        </Button>
      </div>
    </div>
  );
}
