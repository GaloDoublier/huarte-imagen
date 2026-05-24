"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getServices() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
    });
    return services;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function getServiceById(id: string) {
  try {
    const service = await prisma.service.findUnique({
      where: { id },
    });
    return service;
  } catch (error) {
    console.error("Error al buscar el servicio:", error);
    return null;
  }
}

export async function deleteService(id: string) {
  try {
    await prisma.service.delete({
      where: { id },
    });
    
    revalidatePath("/admin");
    revalidatePath("/admin/servicios");
    revalidatePath("/servicios");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting service:", error);
    return { success: false, error: "No se pudo eliminar el servicio" };
  }
}

export async function createService(data: any) {
  try {
    const newService = await prisma.service.create({
      data: {
        name: data.name,
        category: data.category,
        description: data.description,
        price: data.price,
        duration: data.duration,
        imageUrl: data.image,
        isActive: data.status === "active",
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/servicios");
    revalidatePath("/servicios");
    revalidatePath("/");

    return { success: true, data: newService };
  } catch (error) {
    console.error("Error creating service:", error);
    return { success: false, error: "Hubo un error al crear el servicio." };
  }
}
export async function updateService(id: string, data: any) {
  try {
    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        name: data.name,
        category: data.category,
        description: data.description,
        price: data.price,          
        duration: data.duration,  
        imageUrl: data.image,       
        isActive: data.status === "active",
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/servicios");
    revalidatePath("/servicios");
    revalidatePath("/");

    return { success: true, data: updatedService };
  } catch (error) {
    console.error("Error updating service:", error);
    return { success: false, error: "Hubo un error al actualizar el servicio." };
  }
}