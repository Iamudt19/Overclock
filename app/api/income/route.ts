import prisma from '../../../lib/prisma'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET ?? 'change_this_secret'

// Helper to extract user ID from token
function getUserIdFromToken(token: string): number | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number }
    return decoded.userId
  } catch {
    return null
  }
}

// GET all income for the logged-in user
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const token = authHeader.substring(7)
    const userId = getUserIdFromToken(token)
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 })
    }

    const incomes = await prisma.income.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    })

    return new Response(JSON.stringify({ incomes }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}

// POST create a new income
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const token = authHeader.substring(7)
    const userId = getUserIdFromToken(token)
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 })
    }

    const { amount, source, description, date } = await req.json()
    if (!amount || !source) {
      return new Response(JSON.stringify({ error: 'Missing amount or source' }), { status: 400 })
    }

    const income = await prisma.income.create({
      data: {
        userId,
        amount: parseFloat(amount),
        source,
        description: description || null,
        date: date ? new Date(date) : new Date(),
      },
    })

    return new Response(JSON.stringify({ income }), { status: 201 })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}

// DELETE income
export async function DELETE(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const token = authHeader.substring(7)
    const userId = getUserIdFromToken(token)
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing income id' }), { status: 400 })
    }

    // Verify the income belongs to the user
    const income = await prisma.income.findUnique({ where: { id: parseInt(id) } })
    if (!income || income.userId !== userId) {
      return new Response(JSON.stringify({ error: 'Income not found' }), { status: 404 })
    }

    await prisma.income.delete({ where: { id: parseInt(id) } })

    return new Response(JSON.stringify({ message: 'Income deleted' }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}
