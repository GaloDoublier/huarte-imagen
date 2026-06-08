"use client";

import Link from "next/link";
import { Mail, Settings } from "lucide-react";
import { useSiteConfig } from "@/providers/SiteConfigProvider";

export function Footer() {
  const config = useSiteConfig();

  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <span className="font-serif text-xl font-medium tracking-wide">
              {config.siteName || "HUARTE IMAGEN"}
            </span>
          </a>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href={config.instagramUrl || "https://instagram.com/huarteimagen"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/60 hover:text-background transition-colors"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href={`mailto:${config.email}`}
              className="text-background/60 hover:text-background transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright & Admin Link */}
          <div className="flex items-center gap-4">
            <p className="text-sm text-background/60">
              © {new Date().getFullYear()} {config.siteName || "Huarte Imagen"}. Todos los derechos
              reservados.
            </p>
            <Link
              href="/admin/login"
              className="text-background/30 hover:text-background/60 transition-colors"
              aria-label="Acceso administrador"
              title="Admin"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
