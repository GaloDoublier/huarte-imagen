import { getServices } from "@/actions/services";
import {ServiciosClient} from "./servicios-client";

export default async function AdminServiciosPage() {
  const initialServices = await getServices();

  return <ServiciosClient initialServices={initialServices} />;
}