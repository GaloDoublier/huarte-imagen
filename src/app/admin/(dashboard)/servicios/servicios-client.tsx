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
import { deleteService } from "@/actions/services";

export function ServiciosClient({ initialServices }: { initialServices: any[] }) {
  const [services, setServices] = useState(initialServices);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. CORRECCIÓN ACÁ: Extraemos el nombre de la categoría de forma segura
  const filteredServices = services.filter((service) => {
    const categoryName = service.category?.name || "";
    
    return (
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      categoryName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    
    const previousServices = [...services];
    
    setServices(services.filter((s) => s.id !== deleteId));
    const targetId = deleteId;
    setDeleteId(null);

    try {
      const result = await deleteService(targetId);
      
      if (!result.success) {
        setServices(previousServices);
        alert(result.error || "No se pudo eliminar el servicio");
      }
    } catch (error) {
      setServices(previousServices);
      alert("Error de conexión al eliminar");
    } finally {
      setIsDeleting(false);
    }
  };

  const serviceToDelete = deleteId
    ? services.find((s) => s.id === deleteId)
    : null;

  return (
    <div className="space-y-6">
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
                        {service.image ? (
                          <Image
                            src={service.image}
                            alt={service.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-secondary" />
                        )}
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
                        {/* 2. CORRECCIÓN ACÁ: Renderizamos solo el 'name' de la categoría */}
                        {service.category?.name || "Sin categoría"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-foreground">
                      {service.price}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={service.isActive ? "default" : "secondary"}
                        className={
                          service.isActive
                            ? "bg-accent/30 text-accent-foreground hover:bg-accent/40 border-0"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {service.isActive ? "Activo" : "Borrador"}
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
                            className="text-destructive focus:text-destructive cursor-pointer"
                            onClick={() => setDeleteId(service.id)}
                            disabled={isDeleting}
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

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar servicio?</AlertDialogTitle>
            <AlertDialogDescription>
              {serviceToDelete && (
                <>
                  Vas a eliminar <strong>{serviceToDelete.name}</strong>. Esta
                  acción no se puede deshacer y el servicio dejará de mostrarse en la web.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-primary-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}