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

  // 1. Borrar en el orden correcto (primero hijos, luego padres)
  await prisma.service.deleteMany()
  await prisma.category.deleteMany()
  console.log('Base de datos limpiada.')

  // 2. Crear las categorías
  console.log('Creando categorías...')
  const catMaquillaje = await prisma.category.create({
    data: {
      name: 'Maquillaje',
      slogan: 'Realza tu belleza',
      description: 'Cada rostro es único. Mis servicios de maquillaje están diseñados para potenciar tus rasgos naturales y hacerte sentir radiante.',
    }
  })

  const catEstetica = await prisma.category.create({
    data: {
      name: 'Estética',
      slogan: 'Cuida tu piel',
      description: 'Tratamientos profesionales con productos de alta calidad para mantener tu piel sana, luminosa y rejuvenecida.',
    }
  })

  const catEstilismo = await prisma.category.create({
    data: {
      name: 'Estilismo',
      slogan: 'Encuentra tu estilo',
      description: 'Asesoría personalizada para que tu imagen exterior refleje tu verdadera esencia con total confianza.',
    }
  })

  // 3. Crear los servicios vinculándolos por ID
  console.log('Creando servicios...')
  const servicios = [
    {
      name: 'Maquillaje Social',
      categoryId: catMaquillaje.id,
      description: 'Ideal para eventos de día o de noche. Incluye preparación de la piel y fijación de larga duración.',
      price: 35000,
      duration: "45 min",
      imageUrl: '/portfolio/img1.jpg',
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Perfilado de Cejas',
      categoryId: catEstetica.id,
      description: 'Diseño y perfilado de cejas con hilo o pinza, adaptado a la morfología de tu rostro.',
      price: 8000,
      duration: "20 min",
      imageUrl: '/portfolio/img2.jpg',
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Asesoría de Imagen Express',
      categoryId: catEstilismo.id,
      description: 'Sesión de 1 hora para definir tu paleta de colores y estilo personal base.',
      price: 25000,
      duration: "60 min",
      imageUrl: '/portfolio/img3.jpg',
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Maquillaje Nupcial',
      categoryId: catMaquillaje.id,
      description: 'Maquillaje de alta definición para novias, a prueba de agua y lágrimas. Incluye prueba previa.',
      price: 85000,
      duration: "120 min",
      imageUrl: '/portfolio/img1.jpg',
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Colorimetría Personal',
      categoryId: catEstetica.id,
      description: 'Descubre los colores que realzan tu belleza natural con un análisis de paños.',
      price: 40000,
      duration: "90 min",
      imageUrl: '/portfolio/img2.jpg',
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Limpieza Facial Profunda',
      categoryId: catEstetica.id,
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