"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createService, updateService } from "@/actions/services"; 

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Upload, X, ImageIcon, ArrowLeft } from "lucide-react";

export interface ServiceFormData {
  id?: string;
  name: string;
  category: string;
  description: string;
  // 1. Cambiamos price para que acepte números (o vacío si borran todo)
  price: number | ""; 
  duration: string; // duration lo dejamos en string porque en tu Prisma quedó como String
  status: "active" | "draft";
  isFeatured: boolean;
  image: string;
}

interface ServiceFormProps {
  initialData?: ServiceFormData;
  isEditing?: boolean;
}

const defaultFormData: ServiceFormData = {
  name: "",
  category: "",
  description: "",
  price: "", // Arranca vacío
  duration: "",
  status: "draft",
  isFeatured: false,
  image: "",
};

export function ServiceForm({ initialData, isEditing = false }: ServiceFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<ServiceFormData>(
    initialData || defaultFormData
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // 2. Mejoramos el handler para que convierta el texto a número automáticamente
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    let parsedValue: string | number = value;
    
    if (type === "number") {
      parsedValue = value === "" ? "" : Number(value);
    }

    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleFeaturedChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isFeatured: checked }));
  }

  const handleStatusChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, status: checked ? "active" : "draft" }));
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          image: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          image: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let result;
      
      if (isEditing && formData.id) {
        result = await updateService(formData.id, formData);
      } else {
        result = await createService(formData);
      }

      if (result.success) {
        router.push("/admin/servicios");
        router.refresh(); 
      } else {
        alert(result.error); 
      }
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      alert("Ocurrió un error inesperado de conexión");
    } finally {
      setIsSaving(false);
    }
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.category !== "" &&
    formData.description.trim() !== "";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" asChild className="shrink-0">
          <Link href="/admin/servicios">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Volver</span>
          </Link>
        </Button>
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-medium text-foreground">
            {isEditing ? "Editar Servicio" : "Nuevo Servicio"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isEditing
              ? "Modifica los detalles del servicio"
              : "Completa los datos del nuevo servicio"}
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Información Básica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Servicio *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ej: Maquillaje Social"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoría *</Label>
                <Select
                  value={formData.category}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger id="category" className="bg-background">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Maquillaje">Maquillaje</SelectItem>
                    <SelectItem value="Estética">Estética</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe brevemente el servicio..."
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="bg-background resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Precio y Duración
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Precio</Label>
                  {/* 3. Agregamos type="number" acá */}
                  <Input
                    id="price"
                    name="price"
                    type="number" 
                    placeholder="Ej: 45000"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="bg-background"
                  />
                  <p className="text-xs text-muted-foreground">
                    Opcional. Deja vacío si el precio es variable.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duración</Label>
                  <Input
                    id="duration"
                    name="duration"
                    placeholder="Ej: 45 min"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="bg-background"
                  />
                  <p className="text-xs text-muted-foreground">
                    Duración aproximada del servicio.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base font-medium">Estado</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="space-y-4">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Servicio Activo
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Visible en la página de servicios
                  </p>
                </div>
                <Switch
                  checked={formData.status === "active"}
                  onCheckedChange={handleStatusChange}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Servicio Principal
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Visible en la página principal (solo 4 servicios)
                  </p>
                </div>
                <Switch
                  checked={formData.isFeatured}
                  onCheckedChange={handleFeaturedChange}
                />
              </div>
            </div>
            </CardContent>
          </Card>

          {/* Image Upload */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base font-medium">Imagen</CardTitle>
            </CardHeader>
            <CardContent>
              {formData.image ? (
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-muted">
                  <Image
                    src={formData.image}
                    alt="Vista previa"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1.5 bg-foreground/80 text-background rounded-full hover:bg-foreground transition-colors"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Eliminar imagen</span>
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`
                    relative aspect-[4/3] rounded-sm border-2 border-dashed transition-colors
                    flex flex-col items-center justify-center gap-3
                    ${
                      isDragging
                        ? "border-accent bg-accent/10"
                        : "border-border hover:border-muted-foreground/50"
                    }
                  `}
                >
                  <div className="p-3 rounded-full bg-muted">
                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="text-center px-4">
                    <p className="text-sm text-foreground">
                      Arrastra una imagen aquí
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      o haz clic para seleccionar
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-3">
                Formatos: JPG, PNG. Tamaño recomendado: 800x600px
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 -mx-6 lg:-mx-8 mt-6 px-6 lg:px-8 py-4 bg-card border-t border-border flex items-center justify-end gap-3">
        <Button variant="outline" type="button" asChild>
          <Link href="/admin/servicios">Cancelar</Link>
        </Button>
        <Button type="submit" disabled={!isFormValid || isSaving}>
          {isSaving ? (
            <>
              <span className="animate-spin mr-2">
                <Upload className="h-4 w-4" />
              </span>
              Guardando...
            </>
          ) : (
            "Guardar Servicio"
          )}
        </Button>
      </div>
    </form>
  );
}