"use client";

import Link from "next/link";
import { useTransition } from "react";
import { deleteService } from "@/actions/services";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

export function ServiceActions({ serviceId }: { serviceId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (window.confirm("¿Estás segura de que querés eliminar este servicio?")) {
      startTransition(async () => {
        await deleteService(serviceId);
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8" disabled={isPending}>
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/admin/servicios/${serviceId}`}>
            <Pencil className="h-4 w-4 mr-2" />
            Editar
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive focus:text-destructive cursor-pointer"
          onClick={handleDelete}
          disabled={isPending}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          {isPending ? "Eliminando..." : "Eliminar"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}