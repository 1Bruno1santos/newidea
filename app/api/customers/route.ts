import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface CustomerWithBots {
  id: number
  customer_code: string
  name: string
  email: string | null
  whatsapp: string | null
  address: string | null
  bots: Array<{
    id: number
    status: string
    price: number
  }>
  created_at: Date
}

interface FormattedCustomer {
  id: number
  customer_code: string
  name: string
  email: string | null
  whatsapp: string | null
  address: string | null
  totalBots: number
  activeBots: number
  expiredBots: number
  monthlyValue: number
  created_at: string
}

// GET /api/customers
export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        bots: true
      },
      orderBy: {
        created_at: 'desc'
      }
    }) as CustomerWithBots[]
    
    // Transform Prisma data to match frontend format
    const formattedCustomers: FormattedCustomer[] = customers.map((customer: CustomerWithBots) => ({
      id: customer.id,
      customer_code: customer.customer_code,
      name: customer.name,
      email: customer.email,
      whatsapp: customer.whatsapp,
      address: customer.address,
      totalBots: customer.bots.length,
      activeBots: customer.bots.filter((b: { status: string }) => b.status === 'active').length,
      expiredBots: customer.bots.filter((b: { status: string }) => b.status === 'expired').length,
      monthlyValue: customer.bots.reduce((sum: number, bot: { price: number }) => sum + bot.price, 0),
      created_at: customer.created_at.toISOString()
    }))
    
    return NextResponse.json(formattedCustomers)
  } catch (error) {
    console.error('Error fetching customers:', error)
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 })
  }
}

// POST /api/customers
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, whatsapp, address, password } = body

    if (!name || !password) {
      return NextResponse.json(
        { error: 'Name and password are required' },
        { status: 400 }
      )
    }

    // Generate customer code
    const lastCustomer = await prisma.customer.findFirst({
      orderBy: { id: 'desc' }
    })
    const nextNumber = lastCustomer ? lastCustomer.id + 1 : 1
    const customer_code = `CLIENTE_${nextNumber.toString().padStart(3, '0')}`

    const customer = await prisma.customer.create({
      data: {
        customer_code,
        name,
        email,
        whatsapp,
        address,
        password,
        role: 'client'
      }
    })

    // Return formatted customer
    const formattedCustomer: FormattedCustomer = {
      id: customer.id,
      customer_code: customer.customer_code,
      name: customer.name,
      email: customer.email,
      whatsapp: customer.whatsapp,
      address: customer.address,
      totalBots: 0,
      activeBots: 0,
      expiredBots: 0,
      monthlyValue: 0,
      created_at: customer.created_at.toISOString()
    }

    return NextResponse.json(formattedCustomer, { status: 201 })
  } catch (error) {
    console.error('Error creating customer:', error)
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 })
  }
}

// DELETE /api/customers/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    await prisma.customer.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting customer:', error)
    return NextResponse.json({ error: 'Failed to delete customer' }, { status: 500 })
  }
}
