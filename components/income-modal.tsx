"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, DollarSign, Sparkles, Plus, Minus } from "lucide-react"

interface IncomeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onIncomeAdded: (amount: number) => void
}

export function IncomeModal({ open, onOpenChange, onIncomeAdded }: IncomeModalProps) {
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">("monthly")
  const [amount, setAmount] = useState("")
  const [source, setSource] = useState("")
  const [showAISuggestion, setShowAISuggestion] = useState(false)
  const [transactionType, setTransactionType] = useState<"add" | "reduce">("add")

  const handleSubmit = () => {
    const incomeAmount = Number.parseFloat(amount)
    if (incomeAmount && incomeAmount > 0) {
      const finalAmount = transactionType === "reduce" ? -incomeAmount : incomeAmount
      onIncomeAdded(finalAmount)
      onOpenChange(false)
      setAmount("")
      setSource("")
      setShowAISuggestion(true)
      setTimeout(() => setShowAISuggestion(false), 3000)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="glass border-white/20 backdrop-blur-2xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-primary" />
              {transactionType === "add" ? "Add Income" : "Reduce Balance"}
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              {transactionType === "add" ? "Track your earnings flexibly" : "Record expense or balance reduction"}
            </p>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Transaction Type</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={transactionType === "add" ? "default" : "outline"}
                  className={
                    transactionType === "add" ? "bg-gradient-to-r from-teal to-secondary" : "glass border-white/20"
                  }
                  onClick={() => setTransactionType("add")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Income
                </Button>
                <Button
                  type="button"
                  variant={transactionType === "reduce" ? "default" : "outline"}
                  className={
                    transactionType === "reduce"
                      ? "bg-gradient-to-r from-sunset-pink to-accent"
                      : "glass border-white/20"
                  }
                  onClick={() => setTransactionType("reduce")}
                >
                  <Minus className="h-4 w-4 mr-2" />
                  Reduce Balance
                </Button>
              </div>
            </div>

            {/* Frequency Selection */}
            <div className="space-y-2">
              <Label>Income Frequency</Label>
              <div className="grid grid-cols-3 gap-2">
                {(["daily", "weekly", "monthly"] as const).map((freq) => (
                  <Button
                    key={freq}
                    type="button"
                    variant={frequency === freq ? "default" : "outline"}
                    className={
                      frequency === freq ? "bg-gradient-to-r from-primary to-secondary" : "glass border-white/20"
                    }
                    onClick={() => setFrequency(freq)}
                  >
                    {freq.charAt(0).toUpperCase() + freq.slice(1)}
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>
                  {frequency === "daily" && "रोज़ाना • Daily wages"}
                  {frequency === "weekly" && "साप्ताहिक • Weekly salary"}
                  {frequency === "monthly" && "मासिक • Monthly income"}
                </span>
              </div>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8 h-12 text-lg glass border-white/20"
                />
              </div>
            </div>

            {/* Source Input */}
            <div className="space-y-2">
              <Label htmlFor="source">{transactionType === "add" ? "Income Source" : "Reason for Reduction"}</Label>
              <Input
                id="source"
                placeholder={
                  transactionType === "add" ? "e.g., Freelance, Salary, Business" : "e.g., Emergency, Bill Payment"
                }
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="glass border-white/20"
              />
            </div>

            {/* AI Suggestion */}
            {transactionType === "add" && (
              <div className="glass border-white/20 p-4 rounded-xl space-y-2 bg-primary/5">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  <span className="text-sm font-medium">AI Budget Suggestion</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Based on {frequency} income of ₹{amount || "0"}, we recommend setting aside 30% for savings, 50% for
                  essentials, and 20% for flexible spending.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 glass border-white/20 bg-transparent"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className={`flex-1 ${
                  transactionType === "add"
                    ? "bg-gradient-to-r from-teal to-secondary"
                    : "bg-gradient-to-r from-sunset-pink to-accent"
                }`}
                onClick={handleSubmit}
                disabled={!amount}
              >
                {transactionType === "add" ? "Add Income" : "Reduce Balance"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Notification */}
      {showAISuggestion && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 glass border-white/20 px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-top">
          <div className="flex items-center gap-3">
            <div
              className={`h-10 w-10 rounded-full ${transactionType === "add" ? "bg-gradient-to-br from-teal to-secondary" : "bg-gradient-to-br from-sunset-pink to-accent"} flex items-center justify-center`}
            >
              {transactionType === "add" ? (
                <Sparkles className="h-5 w-5 text-white animate-pulse" />
              ) : (
                <Minus className="h-5 w-5 text-white" />
              )}
            </div>
            <div>
              <p className="font-medium text-sm">
                {transactionType === "add" ? "Income Added Successfully!" : "Balance Updated!"}
              </p>
              <p className="text-xs text-muted-foreground">
                {transactionType === "add" ? "AI is preparing your budget..." : "Your balance has been reduced."}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
