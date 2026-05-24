"use client";

import { useParams } from "next/navigation";
import { ServiceForm, ServiceFormData } from "@/components/admin/service-form";

// Mock data - in a real app this would come from an API/database
const services: Record<string, ServiceFormData> = {
  "1": {
    id: "1",
    name: "Maquillaje Social",
    category: "Maquillaje",
    description: "Maquillaje para eventos sociales y ocasiones especiales.",
    price: "€45",
    duration: "45 min",
    status: "active",
    image: "/images/service-maquillaje-1.jpg",
  },
  "2": {
    id: "2",
    name: "Maquillaje Nupcial",
    category: "Maquillaje",
    description:
      "Servicio completo de maquillaje para novias con prueba previa.",
    price: "€120",
    duration: "90 min",
    status: "active",
    image: "/images/service-maquillaje-2.jpg",
  },
  "3": {
    id: "3",
    name: "Maquillaje Editorial",
    category: "Maquillaje",
    description:
      "Maquillaje profesional para sesiones fotográficas y editoriales.",
    price: "€150",
    duration: "120 min",
    status: "active",
    image: "/images/service-maquillaje-1.jpg",
  },
  "4": {
    id: "4",
    name: "Maquillaje Express",
    category: "Maquillaje",
    description: "Maquillaje rápido para el día a día o eventos casuales.",
    price: "€30",
    duration: "30 min",
    status: "draft",
    image: "/images/service-maquillaje-2.jpg",
  },
  "5": {
    id: "5",
    name: "Limpieza Facial Profunda",
    category: "Estética",
    description: "Tratamiento completo de limpieza e hidratación facial.",
    price: "€65",
    duration: "60 min",
    status: "active",
    image: "/images/service-tratamiento-1.jpg",
  },
  "6": {
    id: "6",
    name: "Tratamiento Antiedad",
    category: "Estética",
    description: "Tratamiento rejuvenecedor con tecnología avanzada.",
    price: "€85",
    duration: "75 min",
    status: "draft",
    image: "/images/service-tratamiento-2.jpg",
  },
  "7": {
    id: "7",
    name: "Hidratación Intensiva",
    category: "Estética",
    description: "Tratamiento de hidratación profunda para pieles secas.",
    price: "€55",
    duration: "50 min",
    status: "active",
    image: "/images/service-tratamiento-1.jpg",
  },
  "8": {
    id: "8",
    name: "Radiofrecuencia Facial",
    category: "Estética",
    description: "Tratamiento de radiofrecuencia para reafirmar la piel.",
    price: "€95",
    duration: "60 min",
    status: "active",
    image: "/images/service-tratamiento-2.jpg",
  },
};

export default function EditarServicioPage() {
  const params = useParams();
  const id = params.id as string;
  const service = services[id];

  if (!service) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground">Servicio no encontrado</p>
      </div>
    );
  }

  return <ServiceForm initialData={service} isEditing />;
}
