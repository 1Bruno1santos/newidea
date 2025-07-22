import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// DELETE /api/customers/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params
    const id = parseInt(idStr)
    
    // First delete related bots, then delete customer
    await prisma.bot.deleteMany({
      where: { customer_id: id }
    })

    await prisma.customer.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting customer:', error)
    return NextResponse.json({ error: 'Failed to delete customer' }, { status: 500 })
  }
}

// GET /api/customers/:id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params
    const id = parseInt(idStr)
    
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        bots: true
      }
    })
    
    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 })
    }
    
    // Transform Prisma data to match frontend format
    const formattedCustomer = {
      id: customer.id,
      customer_code: customer.customer_code,
      name: customer.name,
      email: customer.email,
      whatsapp: customer.whatsapp,
      address: customer.address,
      totalBots: customer.bots.length,
      activeBots: customer.bots.filter((b: any) => b.status === 'active').length,
      expiredBots: customer.bots.filter((b: any) => b.status === 'expired').length,
      monthlyValue: customer.bots.reduce((sum: number, bot: any) => sum + bot.price, 0),
      created_at: customer.created_at.toISOString()
    }
    
    return NextResponse.json(formattedCustomer)
  } catch (error) {
    console.error('Error fetching customer:', error)
    return NextResponse.json({ error: 'Failed to fetch customer' }, { status: 500 })
  }
}
