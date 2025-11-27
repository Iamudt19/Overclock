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

// GET all expenses for the logged-in user
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

    const expenses = await prisma.expense.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    })

    return new Response(JSON.stringify({ expenses }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}

// POST create a new expense
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

    const { amount, category, description, date } = await req.json()
    if (!amount || !category) {
      return new Response(JSON.stringify({ error: 'Missing amount or category' }), { status: 400 })
    }

    const expense = await prisma.expense.create({
      data: {
        userId,
        amount: parseFloat(amount),
        category,
        description: description || null,
        date: date ? new Date(date) : new Date(),
      },
    })

    return new Response(JSON.stringify({ expense }), { status: 201 })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}

// DELETE an expense
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
      return new Response(JSON.stringify({ error: 'Missing expense id' }), { status: 400 })
    }

    // Verify the expense belongs to the user
    const expense = await prisma.expense.findUnique({ where: { id: parseInt(id) } })
    if (!expense || expense.userId !== userId) {
      return new Response(JSON.stringify({ error: 'Expense not found' }), { status: 404 })
    }

    await prisma.expense.delete({ where: { id: parseInt(id) } })

    return new Response(JSON.stringify({ message: 'Expense deleted' }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}
