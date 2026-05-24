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

  const servicios = [
    {
      name: 'Maquillaje Social',
      category: 'Maquillaje',
      description: 'Ideal para eventos de día o de noche. Incluye preparación de la piel y fijación de larga duración.',
      price: 35000,
      duration: "20m",
      imageUrl: '/portfolio/img1.jpg',
      isActive: true,
    },
    {
      name: 'Perfilado de Cejas',
      category: 'Estética',
      description: 'Diseño y perfilado de cejas con hilo o pinza, adaptado a la morfología de tu rostro.',
      price: 8000,
      duration: "20m",
      imageUrl: '/portfolio/img2.jpg',
      isActive: true,
    },
    {
      name: 'Asesoría de Imagen Express',
      category: 'Estética',
      description: 'Sesión de 1 hora para definir tu paleta de colores y estilo personal base.',
      price: 25000,
      duration: "20m",
      imageUrl: '/portfolio/img3.jpg',
      isActive: true,
    }
  ]

  for (const s of servicios) {
    const servicioCreado = await prisma.service.create({
      data: s
    })
    console.log(`Creado: ${servicioCreado.name}`)
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