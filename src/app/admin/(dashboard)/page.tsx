"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  Sparkles,
  ExternalLink,
  MoreHorizontal,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

// Mock data for services
const mockServices = [
  {
    id: 1,
    name: "Maquillaje Social",
    category: "Maquillaje",
    price: "€45",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Maquillaje Nupcial",
    category: "Maquillaje",
    price: "€120",
    status: "active",
    createdAt: "2024-01-14",
  },
  {
    id: 3,
    name: "Limpieza Facial Profunda",
    category: "Tratamientos",
    price: "€65",
    status: "active",
    createdAt: "2024-01-12",
  },
  {
    id: 4,
    name: "Tratamiento Antiedad",
    category: "Tratamientos",
    price: "€85",
    status: "inactive",
    createdAt: "2024-01-10",
  },
  {
    id: 5,
    name: "Maquillaje Editorial",
    category: "Maquillaje",
    price: "€150",
    status: "active",
    createdAt: "2024-01-08",
  },
];

// Mock stats
const stats = [
  {
    label: "Total Servicios Activos",
    value: "8",
    icon: Sparkles,
  },
  {
    label: "Visitas al Programa",
    value: "247",
    icon: ExternalLink,
  },
];

export default function AdminDashboardPage() {
  const [adminName, setAdminName] = useState("Admin");
  const [services, setServices] = useState(mockServices);

  useEffect(() => {
    const name = localStorage.getItem("admin_name");
    if (name) setAdminName(name);
  }, []);

  const handleDelete = (id: number) => {
    setServices(services.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-medium text-foreground">
            Hola, {adminName}
          </h1>
          <p className="text-muted-foreground mt-1">
            Bienvenida al panel de administración
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/servicios/nuevo">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Servicio
          </Link>
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-secondary rounded-sm">
                  <stat.icon className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Services Table */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-medium">
            Servicios Recientes
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/servicios" className="text-muted-foreground">
              Ver todos
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead className="hidden sm:table-cell">Categoría</TableHead>
                  <TableHead className="hidden md:table-cell">Precio</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.slice(0, 5).map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                      {service.category}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {service.price}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={service.status === "active" ? "default" : "secondary"}
                        className={
                          service.status === "active"
                            ? "bg-accent/20 text-accent-foreground hover:bg-accent/30"
                            : ""
                        }
                      >
                        {service.status === "active" ? "Activo" : "Inactivo"}
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
                            <Link href={`/admin/servicios/${service.id}`}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Editar
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDelete(service.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-border/50 hover:border-border transition-colors">
          <Link href="/servicios" target="_blank">
            <CardContent className="pt-6 flex items-center gap-3">
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Ver página de Servicios
              </span>
            </CardContent>
          </Link>
        </Card>
        <Card className="border-border/50 hover:border-border transition-colors">
          <Link href="/programa-belleza" target="_blank">
            <CardContent className="pt-6 flex items-center gap-3">
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Ver página del Programa
              </span>
            </CardContent>
          </Link>
        </Card>
        <Card className="border-border/50 hover:border-border transition-colors">
          <Link href="/" target="_blank">
            <CardContent className="pt-6 flex items-center gap-3">
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Ver página principal
              </span>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  );
}
