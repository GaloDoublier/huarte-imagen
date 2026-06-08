"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type SiteConfigData = {
  siteName: string;
  whatsappNumber: string;
  instagramUrl: string;
  email: string;
  hotmartUrl: string;
  aboutBio: string;
  aboutStat1Value: string;
  aboutStat1Label: string;
  aboutStat2Value: string;
  aboutStat2Label: string;
  aboutStat3Value: string;
  aboutStat3Label: string;
  announcementMessage: string;
  announcementActive: boolean;
  announcementLink: string | null;
  testimonials: TestimonialItem[];
};

export type TestimonialItem = {
  quote: string;
  author: string;
  role: string;
};

const defaultConfig: SiteConfigData = {
  siteName: "Huarte Imagen",
  whatsappNumber: "",
  instagramUrl: "",
  email: "",
  hotmartUrl: "",
  aboutBio: "",
  aboutStat1Value: "8+",
  aboutStat1Label: "Años de experiencia",
  aboutStat2Value: "500+",
  aboutStat2Label: "Clientas transformadas",
  aboutStat3Value: "100%",
  aboutStat3Label: "Dedicación personal",
  announcementMessage: "",
  announcementActive: false,
  announcementLink: null,
  testimonials: [],
};

function serializeConfig(row: {
  siteName: string;
  whatsappNumber: string;
  instagramUrl: string;
  email: string;
  hotmartUrl: string;
  aboutBio: string;
  aboutStat1Value: string;
  aboutStat1Label: string;
  aboutStat2Value: string;
  aboutStat2Label: string;
  aboutStat3Value: string;
  aboutStat3Label: string;
  announcementMessage: string;
  announcementActive: boolean;
  announcementLink: string | null;
  testimonials: any;
}): SiteConfigData {
  return {
    siteName: row.siteName,
    whatsappNumber: row.whatsappNumber,
    instagramUrl: row.instagramUrl,
    email: row.email,
    hotmartUrl: row.hotmartUrl,
    aboutBio: row.aboutBio,
    aboutStat1Value: row.aboutStat1Value,
    aboutStat1Label: row.aboutStat1Label,
    aboutStat2Value: row.aboutStat2Value,
    aboutStat2Label: row.aboutStat2Label,
    aboutStat3Value: row.aboutStat3Value,
    aboutStat3Label: row.aboutStat3Label,
    announcementMessage: row.announcementMessage,
    announcementActive: row.announcementActive,
    announcementLink: row.announcementLink,
    testimonials: Array.isArray(row.testimonials) ? row.testimonials : [],
  };
}

export async function getSiteConfig(): Promise<SiteConfigData> {
  try {
    let config = await prisma.siteConfig.findFirst();

    if (!config) {
      config = await prisma.siteConfig.create({
        data: { ...defaultConfig, testimonials: [] },
      });
    }

    return serializeConfig(config);
  } catch (error) {
    console.error("Error fetching site config:", error);
    return defaultConfig;
  }
}

export async function updateSiteConfig(data: SiteConfigData) {
  try {
    let config = await prisma.siteConfig.findFirst();

    if (!config) {
      await prisma.siteConfig.create({ data: { ...data, testimonials: data.testimonials } });
    } else {
      await prisma.siteConfig.update({
        where: { id: config.id },
        data: { ...data, testimonials: data.testimonials },
      });
    }

    revalidatePath("/admin/configuracion");
    revalidatePath("/");
    revalidatePath("/servicios");
    revalidatePath("/programa-belleza");

    return { success: true };
  } catch (error) {
    console.error("Error updating site config:", error);
    return { success: false, error: "No se pudo guardar la configuración." };
  }
}
