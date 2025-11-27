"use client"

import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { LanguageToggle } from "@/components/language-toggle"
import { ExpenseBubble } from "@/components/expense-bubble"
import { ExpenseModal } from "@/components/expense-modal"
import { ExpenseDetailModal } from "@/components/expense-detail-modal"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, Plus, TrendingDown, AlertCircle } from "lucide-react"
import { AuthWrapper } from "@/components/auth-wrapper"

const initialExpenseData = [
  {
    category: "Groceries",
    categoryHi: "किराना",
    amount: 2850,
    color: "border-sunset-pink/50 bg-sunset-pink/10",
    icon: "🛒",
    percentage: 0.35,
  },
  {
    category: "Food",
    categoryHi: "खाना",
    amount: 1620,
    color: "border-primary/50 bg-primary/10",
    icon: "🍽️",
    percentage: 0.2,
  },
  {
    category: "Transport",
    categoryHi: "यातायात",
    amount: 1215,
    color: "border-teal/50 bg-teal/10",
    icon: "🚗",
    percentage: 0.15,
  },
  {
    category: "Bills",
    categoryHi: "बिल",
    amount: 1620,
    color: "border-accent/50 bg-accent/10",
    icon: "💡",
    percentage: 0.2,
  },
  {
    category: "Health",
    categoryHi: "स्वास्थ्य",
    amount: 810,
    color: "border-destructive/50 bg-destructive/10",
    icon: "💊",
    percentage: 0.1,
  },
]

const categoryMetadata: Record<string, { icon: string; color: string; categoryHi: string }> = {
  Groceries: { icon: "🛒", color: "border-sunset-pink/50 bg-sunset-pink/10", categoryHi: "किराना" },
  Food: { icon: "🍽️", color: "border-primary/50 bg-primary/10", categoryHi: "खाना" },
  Transport: { icon: "🚗", color: "border-teal/50 bg-teal/10", categoryHi: "यातायात" },
  Bills: { icon: "💡", color: "border-accent/50 bg-accent/10", categoryHi: "बिल" },
  Health: { icon: "💊", color: "border-destructive/50 bg-destructive/10", categoryHi: "स्वास्थ्य" },
  Other: { icon: "☕", color: "border-primary/50 bg-primary/10", categoryHi: "अन्य" },
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState(initialExpenseData)
  const [expenseModalOpen, setExpenseModalOpen] = useState(false)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState<(typeof initialExpenseData)[0] | null>(null)

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)

  const handleBubbleClick = (expense: (typeof initialExpenseData)[0]) => {
    setSelectedExpense(expense)
    setDetailModalOpen(true)
  }

  const handleAddExpense = (category: string, amount: number, note: string) => {
    const metadata = categoryMetadata[category] || categoryMetadata.Other

    const existingIndex = expenses.findIndex((exp) => exp.category === category)

    if (existingIndex !== -1) {
      const updatedExpenses = [...expenses]
      updatedExpenses[existingIndex].amount += amount
      setExpenses(updatedExpenses)
    } else {
      const newExpense = {
        category,
        categoryHi: metadata.categoryHi,
        amount,
        color: metadata.color,
        icon: metadata.icon,
        percentage: 0,
      }
      setExpenses([...expenses, newExpense])
    }

    setTimeout(() => {
      setExpenses((current) => {
        const total = current.reduce((sum, exp) => sum + exp.amount, 0)
        return current.map((exp) => ({
          ...exp,
          percentage: exp.amount / total,
        }))
      })
    }, 0)
  }

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-sunset-pink/5 via-background to-primary/5 pb-24">
        <header className="sticky top-0 z-40 glass border-b border-white/10 backdrop-blur-2xl">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sunset-pink to-accent flex items-center justify-center">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Expenses</h1>
                <p className="text-[10px] text-muted-foreground">खर्च • Spending Overview</p>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 space-y-6">
          <Card className="glass border-white/20 p-6 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sunset-pink/10 blur-3xl" />
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Expenses This Month</span>
                <TrendingDown className="h-4 w-4 text-sunset-pink animate-pulse-slow" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-sunset-pink to-accent bg-clip-text text-transparent">
                ₹{totalExpenses.toLocaleString()}
              </h2>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <AlertCircle className="h-3 w-3" />
                <span>You've spent 68% of your monthly budget</span>
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-semibold text-muted-foreground">Spending by Category</h3>
              <Button
                size="sm"
                className="bg-gradient-to-r from-sunset-pink to-accent gap-2"
                onClick={() => {
                  setSelectedExpense(null)
                  setExpenseModalOpen(true)
                }}
              >
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>

            <Card className="glass border-white/20 p-6 min-h-[400px]">
              <div className="flex flex-wrap items-center justify-center gap-4">
                {expenses.map((expense, index) => (
                  <ExpenseBubble
                    key={expense.category}
                    {...expense}
                    index={index}
                    onClick={() => handleBubbleClick(expense)}
                  />
                ))}
              </div>
              <p className="text-center text-xs text-muted-foreground mt-6">
                Tap bubbles to view details • Bubble size = spending %
              </p>
            </Card>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground px-1">Breakdown</h3>
            <Card className="glass border-white/20 divide-y divide-border/50">
              {expenses.map((expense) => (
                <div key={expense.category} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className={`h-10 w-10 rounded-xl glass flex items-center justify-center text-xl ${expense.color}`}
                    >
                      {expense.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">{expense.category}</p>
                        <p className="text-sm font-bold">₹{expense.amount}</p>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${expense.color.replace("border-", "from-").replace(" bg-", " to-")}`}
                          style={{ width: `${expense.percentage * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Card>
          </div>

          <Card className="glass border-white/20 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Today's Spending Meter</h3>
              <span className="text-xs text-muted-foreground">Live</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">₹0</span>
                <span className="font-bold text-sunset-pink">₹850 / ₹1,000</span>
              </div>
              <div className="h-4 bg-muted rounded-full overflow-hidden relative">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-teal via-accent to-sunset-pink rounded-full animate-pulse"
                  style={{ width: "85%" }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center">₹150 left for today • आज के लिए ₹150 बचे हैं</p>
            </div>
          </Card>
        </main>

        <BottomNav />
        <ExpenseModal open={expenseModalOpen} onOpenChange={setExpenseModalOpen} onAdd={handleAddExpense} />
        {selectedExpense && (
          <ExpenseDetailModal
            open={detailModalOpen}
            onOpenChange={setDetailModalOpen}
            category={selectedExpense.category}
            categoryHi={selectedExpense.categoryHi}
            amount={selectedExpense.amount}
            icon={selectedExpense.icon}
            percentage={selectedExpense.percentage}
          />
        )}
      </div>
    </AuthWrapper>
  )
}
