"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Plus,
  Search,
} from "lucide-react";

// Mock data for all services
const initialServices = [
  {
    id: "1",
    name: "Maquillaje Social",
    category: "Maquillaje",
    description: "Maquillaje para eventos sociales y ocasiones especiales.",
    price: "€45",
    duration: "45 min",
    status: "active" as const,
    image: "/images/service-maquillaje-1.jpg",
  },
  {
    id: "2",
    name: "Maquillaje Nupcial",
    category: "Maquillaje",
    description: "Servicio completo de maquillaje para novias con prueba previa.",
    price: "€120",
    duration: "90 min",
    status: "active" as const,
    image: "/images/service-maquillaje-2.jpg",
  },
  {
    id: "3",
    name: "Maquillaje Editorial",
    category: "Maquillaje",
    description: "Maquillaje profesional para sesiones fotográficas y editoriales.",
    price: "€150",
    duration: "120 min",
    status: "active" as const,
    image: "/images/service-maquillaje-1.jpg",
  },
  {
    id: "4",
    name: "Maquillaje Express",
    category: "Maquillaje",
    description: "Maquillaje rápido para el día a día o eventos casuales.",
    price: "€30",
    duration: "30 min",
    status: "draft" as const,
    image: "/images/service-maquillaje-2.jpg",
  },
  {
    id: "5",
    name: "Limpieza Facial Profunda",
    category: "Estética",
    description: "Tratamiento completo de limpieza e hidratación facial.",
    price: "€65",
    duration: "60 min",
    status: "active" as const,
    image: "/images/service-tratamiento-1.jpg",
  },
  {
    id: "6",
    name: "Tratamiento Antiedad",
    category: "Estética",
    description: "Tratamiento rejuvenecedor con tecnología avanzada.",
    price: "€85",
    duration: "75 min",
    status: "draft" as const,
    image: "/images/service-tratamiento-2.jpg",
  },
  {
    id: "7",
    name: "Hidratación Intensiva",
    category: "Estética",
    description: "Tratamiento de hidratación profunda para pieles secas.",
    price: "€55",
    duration: "50 min",
    status: "active" as const,
    image: "/images/service-tratamiento-1.jpg",
  },
  {
    id: "8",
    name: "Radiofrecuencia Facial",
    category: "Estética",
    description: "Tratamiento de radiofrecuencia para reafirmar la piel.",
    price: "€95",
    duration: "60 min",
    status: "active" as const,
    image: "/images/service-tratamiento-2.jpg",
  },
];

export default function AdminServiciosPage() {
  const [services, setServices] = useState(initialServices);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = () => {
    if (deleteId) {
      setServices(services.filter((s) => s.id !== deleteId));
      setDeleteId(null);
    }
  };

  const serviceToDelete = deleteId
    ? services.find((s) => s.id === deleteId)
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-medium text-foreground">
            Servicios
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestiona todos los servicios disponibles
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/servicios/nuevo">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Servicio
          </Link>
        </Button>
      </div>

      {/* Search */}
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar servicios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
        </CardContent>
      </Card>

      {/* Services Table */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Todos los Servicios ({filteredServices.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Imagen</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead className="hidden md:table-cell">Precio</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <div className="relative h-12 w-12 rounded-sm overflow-hidden bg-muted">
                        <Image
                          src={service.image}
                          alt={service.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">
                          {service.name}
                        </p>
                        <p className="text-xs text-muted-foreground hidden sm:block">
                          {service.duration}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {service.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-foreground">
                      {service.price}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={service.status === "active" ? "default" : "secondary"}
                        className={
                          service.status === "active"
                            ? "bg-accent/30 text-accent-foreground hover:bg-accent/40 border-0"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {service.status === "active" ? "Activo" : "Borrador"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menú</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/servicios/${service.id}/editar`}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Editar
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => setDeleteId(service.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredServices.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-12 text-muted-foreground"
                    >
                      No se encontraron servicios
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar servicio?</AlertDialogTitle>
            <AlertDialogDescription>
              {serviceToDelete && (
                <>
                  Vas a eliminar <strong>{serviceToDelete.name}</strong>. Esta
                  acción no se puede deshacer.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-primary-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
