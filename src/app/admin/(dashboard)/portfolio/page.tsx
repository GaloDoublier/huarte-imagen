"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Plus, MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Empty } from "@/components/ui/empty";
import Image from "next/image";
import { useState } from "react";

const mockPortfolio = [
  { id: 1, src: "/images/portfolio-1.jpg", alt: "Portfolio 1" },
  { id: 2, src: "/images/portfolio-2.jpg", alt: "Portfolio 2" },
  { id: 3, src: "/images/portfolio-3.jpg", alt: "Portfolio 3" },
];

export default function AdminPortfolioPage() {
  const [images, setImages] = useState(mockPortfolio);

  const handleDelete = (id: number) => {
    setImages(images.filter((img) => img.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-medium text-foreground">
            Galeria
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestiona las imágenes de tu galería
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Subir Imagen
        </Button>
      </div>

      {/* Gallery Grid */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Galería ({images.length} imágenes)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="relative group aspect-square rounded-sm overflow-hidden bg-secondary"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors" />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(image.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium text-foreground mb-1">Sin imágenes</h3>
              <p className="text-sm text-muted-foreground">Sube imágenes para mostrar en tu galería</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
