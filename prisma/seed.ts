import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed customers
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        customer_code: 'CLIENTE_001',
        name: 'João Silva',
        email: 'joao.silva@email.com',
        whatsapp: '11999887766',
        address: 'Rua das Flores, 123 - São Paulo, SP',
        password: 'client123',
        role: 'client'
      }
    }),
    prisma.customer.create({
      data: {
        customer_code: 'CLIENTE_002',
        name: 'Maria Santos',
        email: 'maria.santos@email.com',
        whatsapp: '21998765432',
        address: 'Av. Principal, 456 - Rio de Janeiro, RJ',
        password: 'client123',
        role: 'client'
      }
    }),
    prisma.customer.create({
      data: {
        customer_code: 'CLIENTE_003',
        name: 'Pedro Costa',
        email: 'pedro.costa@email.com',
        whatsapp: '31987654321',
        address: 'Rua do Comércio, 789 - Belo Horizonte, MG',
        password: 'client123',
        role: 'client'
      }
    })
  ])

  // Seed bots for customers
  await Promise.all([
    prisma.bot.create({
      data: {
        customer_id: customers[0].id,
        castle_id: '830123456',
        igg_id: '123456789',
        plan_type: 'mensal',
        price: 150.00,
        status: 'active',
        end_date: new Date('2024-12-31')
      }
    }),
    prisma.bot.create({
      data: {
        customer_id: customers[0].id,
        castle_id: '830987654',
        igg_id: '987654321',
        plan_type: 'trimestral',
        price: 400.00,
        status: 'expired',
        end_date: new Date('2024-10-31')
      }
    }),
    prisma.bot.create({
      data: {
        customer_id: customers[1].id,
        castle_id: '830555555',
        igg_id: '555555555',
        plan_type: 'anual',
        price: 1500.00,
        status: 'active',
        end_date: new Date('2025-12-31')
      }
    })
  ])

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
