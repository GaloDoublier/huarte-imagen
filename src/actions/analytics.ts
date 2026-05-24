"use server";

const PH_PROJECT_ID = process.env.PERSONAL_POSTHOG_ID;
const PH_API_KEY = process.env.PERSONAL_POSTHOG_KEY;
const PH_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

async function fetchHogQL(query: string) {
  if (!PH_PROJECT_ID || !PH_API_KEY) return null;

  try {
    const res = await fetch(`${PH_HOST}/api/projects/${PH_PROJECT_ID}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${PH_API_KEY}`,
      },
      body: JSON.stringify({
        query: {
          kind: "HogQLQuery",
          query: query,
        },
      }),
      cache: "no-store", 
    });

    if (!res.ok) throw new Error("Fallo");
    
    const data = await res.json();
    return data.results; 
  } catch (error) {
    return null;
  }
}

export async function getAnalyticsStats() {
  const metricsQuery = `
    SELECT 
      sumIf(1, event = '$pageview') as visitasTotales,
      sumIf(1, event = 'program_clicked') as clicsPrograma,
      sumIf(1, event = 'whatsapp_clicked') as clicsWhatsApp,
      sumIf(1, event = 'service_reserved') as clicsServicios,
      sumIf(1, event = '$pageview' AND properties.$pathname LIKE '%/programa-belleza%') as vistasPaginaPrograma,
      sumIf(1, event = '$pageview' AND properties.$pathname LIKE '%/servicios%') as vistasPaginaServicios
    FROM events 
    WHERE timestamp > now() - INTERVAL 30 DAY
  `;
  
  const topServicesQuery = `
    SELECT properties.servicio, count() 
    FROM events 
    WHERE timestamp > now() - INTERVAL 30 DAY 
    AND event = 'service_reserved' 
    AND properties.servicio IS NOT NULL
    GROUP BY properties.servicio 
    ORDER BY count() DESC 
    LIMIT 3
  `;

  const dailyVisitsQuery = `
    SELECT toStartOfDay(timestamp) AS day, count() 
    FROM events 
    WHERE timestamp > now() - INTERVAL 30 DAY 
    AND event = '$pageview' 
    GROUP BY day 
    ORDER BY day ASC
  `;

  const [metricsData, topServicesData, dailyVisitsData] = await Promise.all([
    fetchHogQL(metricsQuery),
    fetchHogQL(topServicesQuery),
    fetchHogQL(dailyVisitsQuery)
  ]);

  let visitasTotales = 0;
  let clicsPrograma = 0;
  let clicsWhatsApp = 0;
  let clicsServicios = 0;
  let vistasPaginaPrograma = 0;
  let vistasPaginaServicios = 0;

  if (metricsData && metricsData.length > 0 && metricsData[0]) {
    const row = metricsData[0];
    visitasTotales = Number(row[0]) || 0;
    clicsPrograma = Number(row[1]) || 0;
    clicsWhatsApp = Number(row[2]) || 0;
    clicsServicios = Number(row[3]) || 0;
    vistasPaginaPrograma = Number(row[4]) || 0;
    vistasPaginaServicios = Number(row[5]) || 0;
  }

  const topServicios = topServicesData 
    ? topServicesData.map(([nombre, vistas]: [string, number]) => ({ nombre, vistas })) 
    : [];

  const visitasDiarias = dailyVisitsData
    ? dailyVisitsData.map(([day, vistas]: [string, number]) => {
        const dateObj = new Date(day);
        return {
          fecha: dateObj.toLocaleDateString('es-AR', { day: '2-digit', month: 'short' }),
          vistas
        };
      })
    : [];

  return {
    visitasTotales,
    clicsPrograma,
    clicsWhatsApp,
    clicsServicios,
    vistasPaginaPrograma,
    vistasPaginaServicios,
    topServicios,
    visitasDiarias
  };
}