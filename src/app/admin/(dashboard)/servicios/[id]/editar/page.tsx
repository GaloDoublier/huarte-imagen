import { getServiceById } from "@/actions/services";
import { ServiceForm, ServiceFormData } from "@/components/admin/service-form";

export default async function EditarServicioPage({
  params,
}: {
  params: Promise<{ id: string }>; 
}) {
  const resolvedParams = await params;
  
  const service = await getServiceById(resolvedParams.id);

  if (!service) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground">Servicio no encontrado</p>
      </div>
    );
  }

  const formData: ServiceFormData = {
    id: service.id,
    name: service.name,
    category: service.categoryId, 
    description: service.description || "",
    price: service.price,
    duration: service.duration ?? "",
    status: service.isActive ? "active" : "draft",
    isFeatured: service.isFeatured,
    image: service.imageUrl || "",
  };

  return <ServiceForm initialData={formData} isEditing />;
}