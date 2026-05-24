import Link from "next/link";
import { getServices } from "@/actions/services";
import { getAnalyticsStats } from "@/actions/analytics";
import { TrafficChart, ConversionPieChart } from "@/components/analytics/dashboard-charts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ExternalLink, Plus, MessageCircle, MousePointerClick, TrendingUp } from "lucide-react";

export default async function AdminDashboardPage() {
  const adminName = "Monica";

  const services = await getServices();
  const activeServicesCount = services.filter((s) => s.isActive).length;

  const statsPosthog = await getAnalyticsStats() || {
    visitasTotales: 0,
    clicsPrograma: 0,
    clicsWhatsApp: 0,
    clicsServicios: 0,
    vistasPaginaPrograma: 0,
    vistasPaginaServicios: 0,
    topServicios: [],
    visitasDiarias: []
  };

  const tasaPrograma = statsPosthog.visitasTotales > 0 
    ? ((statsPosthog.clicsPrograma / statsPosthog.visitasTotales) * 100).toFixed(1)
    : "0.0";
    
  const tasaWhatsApp = statsPosthog.visitasTotales > 0
    ? ((statsPosthog.clicsWhatsApp / statsPosthog.visitasTotales) * 100).toFixed(1)
    : "0.0";

  const stats = [
    {
      label: "Servicios Activos",
      value: activeServicesCount.toString(),
      icon: Sparkles,
      subtext: "En el catálogo",
    },
    {
      label: "Visitas Totales",
      value: statsPosthog.visitasTotales.toString(),
      icon: MousePointerClick,
      subtext: "Últimos 30 días",
    },
    {
      label: "Clics en Programa",
      value: statsPosthog.clicsPrograma.toString(),
      icon: ExternalLink,
      subtext: `El ${tasaPrograma}% del trafico`,
    },
    {
      label: "Contactos (WhatsApp)",
      value: statsPosthog.clicsWhatsApp.toString(),
      icon: MessageCircle,
      subtext: `El ${tasaWhatsApp}% del trafico`,
    },
  ];

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
                  <p className="text-sm font-medium">{stat.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.subtext}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="border-border/50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Tráfico de los últimos 30 días</CardTitle>
          </CardHeader>
          <CardContent>
            <TrafficChart data={statsPosthog.visitasDiarias} />
          </CardContent>
        </Card>

        {/* Panel lateral de Top Servicios */}
        <Card className="border-[#8d734e]/20 lg:col-span-1 shadow-sm bg-gradient-to-b from-transparent to-[#8d734e]/[0.02]">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center gap-2 text-[#312620]">
              <TrendingUp className="h-5 w-5 text-[#8d734e]" />
              Top Servicios Vistos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <p className="text-sm text-muted-foreground/80 mb-2 border-b border-[#8d734e]/10 pb-4">
                Lo que más le interesa a tus clientes.
              </p>
              
              <div className="space-y-4">
                {statsPosthog.topServicios && statsPosthog.topServicios.length > 0 ? (
                  statsPosthog.topServicios.map((servicio: any, index: number) => (
                    <div key={servicio.nombre} className="flex justify-between items-center group">
                      <div className="flex items-center gap-3 overflow-hidden">
                        {/* Círculo decorativo para el número del ranking */}
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-[#8d734e]/10 text-[#8d734e] text-xs font-semibold shrink-0">
                          {index + 1}
                        </span>
                        <span className="truncate text-sm font-medium text-[#312620] group-hover:text-[#8d734e] transition-colors duration-200">
                          {servicio.nombre}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1 shrink-0 ml-4">
                        <span className="font-semibold text-base text-[#8d734e]">
                          {servicio.vistas}
                        </span>
                        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                          clicks
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center py-8 bg-[#8d734e]/5 rounded-md border border-[#8d734e]/10">
                    <p className="text-sm text-[#8d734e]/70">
                      Aún no hay visitas registradas
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Conversión /programa</CardTitle>
          </CardHeader>
          <CardContent>
            <ConversionPieChart 
              vistasTotales={statsPosthog.vistasPaginaPrograma}
              clics={statsPosthog.clicsPrograma}
              labelClic="Acceder al Programa"
              labelVista="Se metieron en /programa"
            />
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Conversión /servicios</CardTitle>
          </CardHeader>
          <CardContent>
            <ConversionPieChart 
              vistasTotales={statsPosthog.vistasPaginaServicios}
              clics={statsPosthog.clicsServicios}
              labelClic="Reserva de Servicio"
              labelVista="Se metieron en /servicios"
            />
          </CardContent>
        </Card>
      </div>

    </div>
  );
}