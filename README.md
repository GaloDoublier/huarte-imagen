# 💄 Huarte Imagen | Web & Portfolio

Plataforma web y portfolio profesional para **Huarte Imagen**, orientada a ofrecer servicios de maquillaje, tratamientos estéticos y el programa de asesoramiento "Imagen y Belleza". 

El sitio está diseñado con un enfoque minimalista, elegante y cálido, optimizado para conversión directa a través de WhatsApp y enlaces externos (Hotmart).

## 🚀 Tech Stack

Este proyecto está construido con un stack moderno enfocado en rendimiento, escalabilidad y una excelente experiencia de desarrollo:

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Componentes UI:** [Shadcn UI](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Íconos:** [Lucide React](https://lucide.dev/)
- **Package Manager:** [pnpm](https://pnpm.io/)

### 🛠️ Próximas integraciones (Backend & Auth)
- **Base de Datos:** [Neon](https://neon.tech/) (Serverless PostgreSQL)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Autenticación:** [Auth.js / NextAuth](https://authjs.dev/)

---

## ✨ Características Principales

- **Landing Page Optimizada:** Hero section, propuesta de valor y llamados a la acción (CTAs) claros.
- **Gestión de Servicios:** Catálogo de servicios de maquillaje y estética.
- **Portfolio Visual:** Galería de alta calidad mostrando el espacio y trabajos anteriores.
- **Programa "Imagen y Belleza":** Sección dedicada para derivar tráfico al curso online.
- **Integración con WhatsApp:** Contacto directo y sin fricciones para reservas.
- **Dashboard de Administración (En progreso):** Panel privado para gestionar el catálogo de servicios (CRUD) de forma dinámica.

---

## 📂 Estructura del Proyecto

```bash
├── public/               # Imágenes estáticas, fuentes y assets
├── src/
│   ├── app/              # App Router: Vistas y layouts (Landing, /servicios, /admin)
│   ├── components/       # Componentes reutilizables (UI de Shadcn y secciones de la página)
│   ├── constants/        # Textos estáticos, testimonios, configuraciones y links
│   └── lib/              # Utilidades genéricas (ej: cn para Tailwind)
└── tailwind.config.ts    # Configuración de estilos y variables de la marca