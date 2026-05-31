import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Iniciando la siembra de la base de datos...')

  await prisma.service.deleteMany()
  console.log('Base de datos limpiada.')

  const servicios = [
    {
      name: 'Maquillaje Social',
      category: 'Maquillaje',
      description: 'Ideal para eventos de día o de noche. Incluye preparación de la piel y fijación de larga duración.',
      price: 35000,
      duration: "45 min",
      imageUrl: '/portfolio/img1.jpg',
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Perfilado de Cejas',
      category: 'Estética',
      description: 'Diseño y perfilado de cejas con hilo o pinza, adaptado a la morfología de tu rostro.',
      price: 8000,
      duration: "20 min",
      imageUrl: '/portfolio/img2.jpg',
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Asesoría de Imagen Express',
      category: 'Estilismo',
      description: 'Sesión de 1 hora para definir tu paleta de colores y estilo personal base.',
      price: 25000,
      duration: "60 min",
      imageUrl: '/portfolio/img3.jpg',
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Maquillaje Nupcial',
      category: 'Maquillaje',
      description: 'Maquillaje de alta definición para novias, a prueba de agua y lágrimas. Incluye prueba previa.',
      price: 85000,
      duration: "120 min",
      imageUrl: '/portfolio/img1.jpg',
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Colorimetría Personal',
      category: 'Estética',
      description: 'Descubre los colores que realzan tu belleza natural con un análisis de paños.',
      price: 40000,
      duration: "90 min",
      imageUrl: '/portfolio/img2.jpg',
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Limpieza Facial Profunda',
      category: 'Estética',
      description: 'Tratamiento completo para renovar tu piel y dejarla lista para el maquillaje.',
      price: 15000,
      duration: "60 min",
      imageUrl: '/portfolio/img3.jpg',
      isActive: true,
      isFeatured: false,
    }
  ]

  for (const s of servicios) {
    const servicioCreado = await prisma.service.create({
      data: s
    })
    console.log(`Creado: ${servicioCreado.name} (Destacado: ${servicioCreado.isFeatured})`)
  }

  console.log('¡Semilla completada!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })