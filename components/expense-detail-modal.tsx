"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { TrendingDown, Calendar, Receipt } from "lucide-react"
import { Card } from "@/components/ui/card"

interface ExpenseDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: string
  categoryHi: string
  amount: number
  icon: string
  percentage: number
}

export function ExpenseDetailModal({
  open,
  onOpenChange,
  category,
  categoryHi,
  amount,
  icon,
  percentage,
}: ExpenseDetailModalProps) {
  const transactions = [
    { date: "Today", amount: 450, note: "Dinner at restaurant" },
    { date: "Yesterday", amount: 280, note: "Grocery shopping" },
    { date: "2 days ago", amount: 320, note: "Gas station" },
  ]

  const monthlyAverage = Math.round(amount * 0.9)
  const changePercent = ((amount - monthlyAverage) / monthlyAverage) * 100

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-white/20 backdrop-blur-2xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <span className="text-4xl">{icon}</span>
            <div>
              <div className="text-xl font-bold">{category}</div>
              <div className="text-xs text-muted-foreground font-normal">{categoryHi}</div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Total Spending Card */}
          <Card className="glass border-white/20 p-4 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-sunset-pink/10 blur-2xl" />
            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total This Month</span>
                <TrendingDown className="h-4 w-4 text-sunset-pink" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-sunset-pink to-accent bg-clip-text text-transparent">
                ₹{amount.toLocaleString()}
              </h3>
              <div className="flex items-center gap-2">
                <div className="text-xs px-2 py-1 rounded-full bg-sunset-pink/10 text-sunset-pink font-medium">
                  {Math.round(percentage * 100)}% of total
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    changePercent > 0 ? "bg-destructive/10 text-destructive" : "bg-teal/10 text-teal"
                  }`}
                >
                  {changePercent > 0 ? "↑" : "↓"} {Math.abs(Math.round(changePercent))}% vs avg
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Transactions */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Receipt className="h-4 w-4" />
              Recent Transactions
            </div>
            <Card className="glass border-white/20 divide-y divide-border/50">
              {transactions.map((txn, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg glass flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{txn.note}</p>
                      <p className="text-xs text-muted-foreground">{txn.date}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold">₹{txn.amount}</span>
                </div>
              ))}
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="glass border-white/20 p-3">
              <div className="text-xs text-muted-foreground mb-1">Monthly Avg</div>
              <div className="text-lg font-bold">₹{monthlyAverage.toLocaleString()}</div>
            </Card>
            <Card className="glass border-white/20 p-3">
              <div className="text-xs text-muted-foreground mb-1">Daily Avg</div>
              <div className="text-lg font-bold">₹{Math.round(amount / 30)}</div>
            </Card>
          </div>

          <Button className="w-full bg-gradient-to-r from-sunset-pink to-accent" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
