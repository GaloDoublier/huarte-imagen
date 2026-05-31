"use server"
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getAllCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { name: "asc" }
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getCategoriesWithServices() {
  try {
    const categories = await prisma.category.findMany({
      // Traemos solo las categorías que tienen servicios activos para no mostrar secciones vacías
      where: {
        services: {
          some: {
            isActive: true
          }
        }
      },

      include: {
        services: {
          where: {
            isActive: true
          }
        }
      },

      orderBy: {
        name: 'asc'
      }
    });
    
    return categories;
  } catch (error) {
    console.error("Error al obtener categorías con servicios:", error);
    return [];
  }
}

export async function createCategory(data: { name: string; slogan?: string; description?: string }) {
  try {
    const newCategory = await prisma.category.create({
      data: {
        name: data.name,
        slogan: data.slogan || null,
        description: data.description || null,
      }
    });
    
    revalidatePath("/admin/servicios/nuevo");
    revalidatePath("/admin/servicios");
    return { success: true, data: newCategory };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, error: "No se pudo crear la categoría. Quizás el nombre ya existe." };
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({
      where: { id }
    });
    
    revalidatePath("/admin/servicios/nuevo");
    revalidatePath("/admin/servicios");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting category:", error);
    // Atrapamos el error de "Restricción" que configuramos en el schema
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        return { 
          success: false, 
          error: "No puedes eliminar esta categoría porque tiene servicios asociados. Reasígnalos primero." 
        };
      }
    }
    
    return { success: false, error: "Error inesperado al eliminar." };
  }
}