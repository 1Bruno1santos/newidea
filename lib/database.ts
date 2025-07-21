import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

// Helper function to check if database is available
export async function isDatabaseAvailable(): Promise<boolean> {
  try {
    await prisma.$connect()
    return true
  } catch (error) {
    console.warn('Database connection failed, using JSON fallback:', error)
    return false
  }
}

// Disconnect from database
export async function disconnectDatabase() {
  await prisma.$disconnect()
}