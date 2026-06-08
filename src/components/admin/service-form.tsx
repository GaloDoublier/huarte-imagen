"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createService, updateService } from "@/actions/services"; 
import { getAllCategories } from "@/actions/categories";
import { CategoryManager } from "@/components/admin/category-manager";
import { CldUploadWidget } from "next-cloudinary";

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
  price: number | ""; 
  duration: string;
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
  price: "", 
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
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);

  const loadCategories = async () => {
    const cats = await getAllCategories();
    setCategories(cats);
  };

  useEffect(() => {
    loadCategories();
  }, []);

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
            {isEditing ? "Modifica los detalles del servicio" : "Completa los datos del nuevo servicio"}
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base font-medium">Información Básica</CardTitle>
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
                <div className="flex gap-2">
                  <Select value={formData.category} onValueChange={handleCategoryChange}>
                    <SelectTrigger id="category" className="bg-background flex-1">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <CategoryManager categories={categories} onCategoryUpdate={loadCategories} />
                </div>
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
              <CardTitle className="text-base font-medium">Precio y Duración</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Precio</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number" 
                    placeholder="Ej: 45000"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="bg-background"
                  />
                  <p className="text-xs text-muted-foreground">Opcional. Deja vacío si es variable.</p>
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
                    <p className="text-sm font-medium text-foreground">Servicio Activo</p>
                    <p className="text-xs text-muted-foreground">Visible en la página de servicios</p>
                  </div>
                  <Switch checked={formData.status === "active"} onCheckedChange={handleStatusChange} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Servicio Principal</p>
                    <p className="text-xs text-muted-foreground">Visible en la página principal (máx 4)</p>
                  </div>
                  <Switch checked={formData.isFeatured} onCheckedChange={handleFeaturedChange} />
                </div>
              </div>
            </CardContent>
          </Card>

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
                  </button>
                </div>
              ) : (
                <CldUploadWidget 
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                  options={{
                    maxFiles: 1,
                    clientAllowedFormats: ["jpg", "png", "jpeg", "webp"],
                  }}
                  onSuccess={(result: any) => {
                    if (result?.info?.secure_url) {
                      setFormData((prev) => ({
                        ...prev,
                        image: result.info.secure_url,
                      }));
                    }
                  }}
                >
                  {({ open }) => (
                    <div
                      onClick={() => open()}
                      className="relative aspect-[4/3] rounded-sm border-2 border-dashed border-border hover:border-muted-foreground/50 transition-colors flex flex-col items-center justify-center gap-3 cursor-pointer"
                    >
                      <div className="p-3 rounded-full bg-muted">
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="text-center px-4">
                        <p className="text-sm text-foreground">Subir imagen a Cloudinary</p>
                        <p className="text-xs text-muted-foreground mt-1">Haz clic para abrir el gestor</p>
                      </div>
                    </div>
                  )}
                </CldUploadWidget>
              )}
              <p className="text-xs text-muted-foreground mt-3">
                Subida optimizada de forma externa. Formatos: JPG, PNG, WEBP.
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
          {isSaving ? "Guardando..." : "Guardar Servicio"}
        </Button>
      </div>
    </form>
  );
}