"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getSiteConfig, type SiteConfigData } from "@/actions/site-config";

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

const SiteConfigContext = createContext<SiteConfigData>(defaultConfig);

export function useSiteConfig() {
  return useContext(SiteConfigContext);
}

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfigData>(defaultConfig);

  useEffect(() => {
    getSiteConfig().then(setConfig);
  }, []);

  return (
    <SiteConfigContext.Provider value={config}>
      {children}
    </SiteConfigContext.Provider>
  );
}
