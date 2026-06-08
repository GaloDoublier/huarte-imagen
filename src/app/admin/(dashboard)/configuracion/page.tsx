"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus, X, Check, ChevronDown, ChevronUp } from "lucide-react";
import { getSiteConfig, updateSiteConfig, type SiteConfigData, type TestimonialItem } from "@/actions/site-config";

type EditingSection = "general" | "contact" | "program" | "about" | "announcement" | "testimonials" | null;

export default function AdminConfiguracionPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [config, setConfig] = useState<SiteConfigData | null>(null);
  const [editingSection, setEditingSection] = useState<EditingSection>(null);
  const [editingTestimonialIndex, setEditingTestimonialIndex] = useState<number | null>(null);

  useEffect(() => {
    getSiteConfig().then((data) => {
      setConfig(data);
      setIsLoading(false);
    });
  }, []);

  const handleSave = async () => {
    if (!config) return;
    setIsSaving(true);
    await updateSiteConfig(config);
    setIsSaving(false);
    setEditingSection(null);
    setEditingTestimonialIndex(null);
  };

  const updateField = <K extends keyof SiteConfigData>(key: K, value: SiteConfigData[K]) => {
    if (!config) return;
    setConfig({ ...config, [key]: value });
  };

  const addTestimonial = () => {
    if (!config) return;
    const newT: TestimonialItem = { quote: "", author: "", role: "" };
    updateField("testimonials", [...config.testimonials, newT]);
    setEditingTestimonialIndex(config.testimonials.length);
  };

  const removeTestimonial = (index: number) => {
    if (!config) return;
    const updated = config.testimonials.filter((_, i) => i !== index);
    updateField("testimonials", updated);
    setEditingTestimonialIndex(null);
  };

  const updateTestimonial = (index: number, field: keyof TestimonialItem, value: string) => {
    if (!config) return;
    const updated = [...config.testimonials];
    updated[index] = { ...updated[index], [field]: value };
    updateField("testimonials", updated);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (!config) return null;

  const sectionButton = (section: EditingSection, isEditing: boolean) => {
    if (isEditing) {
      return (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => setEditingSection(null)}>
            <X className="h-4 w-4 mr-1" />
            Cancelar
          </Button>
          <Button size="sm" onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Spinner className="h-4 w-4" /> : <Check className="h-4 w-4 mr-1" />}
            Guardar
          </Button>
        </div>
      );
    }
    return (
      <Button variant="outline" size="sm" onClick={() => setEditingSection(section)}>
        <Pencil className="h-4 w-4 mr-1" />
        Editar
      </Button>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-medium text-foreground">
            Configuración
          </h1>
          <p className="text-muted-foreground mt-1">
            Personaliza la información de tu sitio web
          </p>
        </div>
        {editingSection && (
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
        )}
      </div>

      {/* Información General */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-lg font-medium">Información General</CardTitle>
            <CardDescription>Nombre del sitio que aparece en todo el sitio</CardDescription>
          </div>
          {sectionButton("general", editingSection === "general")}
        </CardHeader>
        {editingSection === "general" && (
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="siteName">Nombre del Sitio</FieldLabel>
                <Input
                  id="siteName"
                  value={config.siteName}
                  onChange={(e) => updateField("siteName", e.target.value)}
                  className="bg-background max-w-md"
                />
              </Field>
            </FieldGroup>
          </CardContent>
        )}
        {editingSection !== "general" && (
          <CardContent>
            <p className="text-sm text-muted-foreground">{config.siteName}</p>
          </CardContent>
        )}
      </Card>

      {/* Contacto y Redes */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-lg font-medium">Contacto y Redes</CardTitle>
            <CardDescription>WhatsApp, Instagram y correo electrónico</CardDescription>
          </div>
          {sectionButton("contact", editingSection === "contact")}
        </CardHeader>
        {editingSection === "contact" && (
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="whatsapp">Número de WhatsApp</FieldLabel>
                <Input
                  id="whatsapp"
                  value={config.whatsappNumber}
                  onChange={(e) => updateField("whatsappNumber", e.target.value)}
                  placeholder="34600000000"
                  className="bg-background max-w-md"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Solo números, con código de país (ej: 34600000000)
                </p>
              </Field>
              <Field>
                <FieldLabel htmlFor="instagram">Instagram URL</FieldLabel>
                <Input
                  id="instagram"
                  value={config.instagramUrl}
                  onChange={(e) => updateField("instagramUrl", e.target.value)}
                  placeholder="https://instagram.com/huarteimagen"
                  className="bg-background max-w-md"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Correo Electrónico</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={config.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="hola@huarteimagen.com"
                  className="bg-background max-w-md"
                />
              </Field>
            </FieldGroup>
          </CardContent>
        )}
        {editingSection !== "contact" && (
          <CardContent>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p><span className="font-medium text-foreground">WhatsApp:</span> {config.whatsappNumber || "(no configurado)"}</p>
              <p><span className="font-medium text-foreground">Instagram:</span> {config.instagramUrl || "(no configurado)"}</p>
              <p><span className="font-medium text-foreground">Email:</span> {config.email || "(no configurado)"}</p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Programa Online */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-lg font-medium">Programa Online</CardTitle>
            <CardDescription>Enlace al curso en Hotmart</CardDescription>
          </div>
          {sectionButton("program", editingSection === "program")}
        </CardHeader>
        {editingSection === "program" && (
          <CardContent>
            <Field>
              <FieldLabel htmlFor="hotmart">URL de Hotmart</FieldLabel>
              <Input
                id="hotmart"
                value={config.hotmartUrl}
                onChange={(e) => updateField("hotmartUrl", e.target.value)}
                placeholder="https://hotmart.com/..."
                className="bg-background"
              />
            </Field>
          </CardContent>
        )}
        {editingSection !== "program" && (
          <CardContent>
            <p className="text-sm text-muted-foreground">{config.hotmartUrl || "(no configurado)"}</p>
          </CardContent>
        )}
      </Card>

      {/* Sobre Mí */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-lg font-medium">Sobre Mí</CardTitle>
            <CardDescription>Biografía y estadísticas personales</CardDescription>
          </div>
          {sectionButton("about", editingSection === "about")}
        </CardHeader>
        {editingSection === "about" && (
          <CardContent className="space-y-6">
            <Field>
              <FieldLabel htmlFor="aboutBio">Biografía</FieldLabel>
              <Textarea
                id="aboutBio"
                value={config.aboutBio}
                onChange={(e) => updateField("aboutBio", e.target.value)}
                rows={6}
                className="bg-background"
                placeholder="Escribe tu biografía aquí. Usa saltos de línea para separar párrafos."
              />
            </Field>
            <Separator />
            <div>
              <p className="text-sm font-medium text-foreground mb-4">Estadísticas (3 campos)</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Valor 1</Label>
                  <Input
                    value={config.aboutStat1Value}
                    onChange={(e) => updateField("aboutStat1Value", e.target.value)}
                    placeholder="8+"
                    className="bg-background"
                  />
                  <Label>Etiqueta 1</Label>
                  <Input
                    value={config.aboutStat1Label}
                    onChange={(e) => updateField("aboutStat1Label", e.target.value)}
                    placeholder="Años de experiencia"
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Valor 2</Label>
                  <Input
                    value={config.aboutStat2Value}
                    onChange={(e) => updateField("aboutStat2Value", e.target.value)}
                    placeholder="500+"
                    className="bg-background"
                  />
                  <Label>Etiqueta 2</Label>
                  <Input
                    value={config.aboutStat2Label}
                    onChange={(e) => updateField("aboutStat2Label", e.target.value)}
                    placeholder="Clientas transformadas"
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Valor 3</Label>
                  <Input
                    value={config.aboutStat3Value}
                    onChange={(e) => updateField("aboutStat3Value", e.target.value)}
                    placeholder="100%"
                    className="bg-background"
                  />
                  <Label>Etiqueta 3</Label>
                  <Input
                    value={config.aboutStat3Label}
                    onChange={(e) => updateField("aboutStat3Label", e.target.value)}
                    placeholder="Dedicación personal"
                    className="bg-background"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        )}
        {editingSection !== "about" && (
          <CardContent>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="line-clamp-2">{config.aboutBio || "(sin biografía)"}</p>
              <div className="flex gap-4 mt-2 text-foreground">
                <span><strong>{config.aboutStat1Value}</strong> {config.aboutStat1Label}</span>
                <span><strong>{config.aboutStat2Value}</strong> {config.aboutStat2Label}</span>
                <span><strong>{config.aboutStat3Value}</strong> {config.aboutStat3Label}</span>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Anuncio / Oferta */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-lg font-medium">Anuncio / Oferta</CardTitle>
            <CardDescription>Barra de anuncio en la parte superior del sitio</CardDescription>
          </div>
          {sectionButton("announcement", editingSection === "announcement")}
        </CardHeader>
        {editingSection === "announcement" && (
          <CardContent className="space-y-4">
            <Field>
              <FieldLabel htmlFor="announcementMessage">Mensaje</FieldLabel>
              <Input
                id="announcementMessage"
                value={config.announcementMessage}
                onChange={(e) => updateField("announcementMessage", e.target.value)}
                placeholder="¡25% de descuento!"
                className="bg-background max-w-lg"
              />
            </Field>
            <div className="flex items-center gap-4">
              <Switch
                id="announcementActive"
                checked={config.announcementActive}
                onCheckedChange={(checked) => updateField("announcementActive", checked)}
              />
              <Label htmlFor="announcementActive">Activar anuncio</Label>
            </div>
            <Field>
              <FieldLabel htmlFor="announcementLink">Link (opcional)</FieldLabel>
              <Input
                id="announcementLink"
                value={config.announcementLink || ""}
                onChange={(e) => updateField("announcementLink", e.target.value || null)}
                placeholder="https://..."
                className="bg-background max-w-md"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Si se agrega un link, la barra será cliqueable
              </p>
            </Field>
          </CardContent>
        )}
        {editingSection !== "announcement" && (
          <CardContent>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>
                {config.announcementActive ? (
                  <span className="inline-flex items-center gap-1 text-green-600">
                    <span className="w-2 h-2 bg-green-600 rounded-full" /> Activo
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full" /> Inactivo
                  </span>
                )}
              </p>
              <p>{config.announcementMessage || "(sin mensaje)"}</p>
              {config.announcementLink && (
                <p className="text-xs truncate">Link: {config.announcementLink}</p>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Testimonios */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-lg font-medium">Testimonios</CardTitle>
            <CardDescription>Gestiona los testimonios que aparecen en el sitio</CardDescription>
          </div>
          <div className="flex gap-2">
            {editingSection === "testimonials" ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => { setEditingSection(null); setEditingTestimonialIndex(null); }}>
                  <X className="h-4 w-4 mr-1" />
                  Cancelar
                </Button>
                <Button size="sm" onClick={handleSave} disabled={isSaving}>
                  {isSaving ? <Spinner className="h-4 w-4" /> : <Check className="h-4 w-4 mr-1" />}
                  Guardar
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setEditingSection("testimonials")}>
                <Pencil className="h-4 w-4 mr-1" />
                Editar
              </Button>
            )}
          </div>
        </CardHeader>
        {editingSection === "testimonials" && (
          <CardContent className="space-y-4">
            {config.testimonials.map((t, i) => (
              <div key={i} className="border border-border/50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Testimonio #{i + 1}</span>
                  <Button variant="ghost" size="sm" className="text-destructive" onClick={() => removeTestimonial(i)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Texto / Cita</Label>
                  <Textarea
                    value={t.quote}
                    onChange={(e) => updateTestimonial(i, "quote", e.target.value)}
                    rows={3}
                    className="bg-background"
                    placeholder="Texto del testimonio..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nombre</Label>
                    <Input
                      value={t.author}
                      onChange={(e) => updateTestimonial(i, "author", e.target.value)}
                      className="bg-background"
                      placeholder="María García"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Puesto / Rol</Label>
                    <Input
                      value={t.role}
                      onChange={(e) => updateTestimonial(i, "role", e.target.value)}
                      className="bg-background"
                      placeholder="Empresaria"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addTestimonial}>
              <Plus className="h-4 w-4 mr-1" />
              Añadir testimonio
            </Button>
          </CardContent>
        )}
        {editingSection !== "testimonials" && (
          <CardContent>
            {config.testimonials.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sin testimonios configurados</p>
            ) : (
              <div className="space-y-2">
                {config.testimonials.map((t, i) => (
                  <div key={i} className="text-sm text-muted-foreground border-b border-border/50 pb-2 last:border-0">
                    <p className="line-clamp-1">&ldquo;{t.quote}&rdquo;</p>
                    <p className="text-foreground font-medium">{t.author} — {t.role}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        )}
      </Card>

      <Separator />

      {editingSection && (
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
      )}
    </div>
  );
}
