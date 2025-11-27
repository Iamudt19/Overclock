"use client"

import { cn } from "@/lib/utils"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingBag, Utensils, Car, Home, Heart, Coffee, Plus } from "lucide-react"

interface ExpenseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd?: (category: string, amount: number, note: string) => void // Added onAdd callback
}

const categories = [
  { name: "Groceries", nameHi: "किराना", icon: ShoppingBag, color: "from-sunset-pink to-accent" },
  { name: "Food", nameHi: "खाना", icon: Utensils, color: "from-primary to-secondary" },
  { name: "Transport", nameHi: "यातायात", icon: Car, color: "from-teal to-secondary" },
  { name: "Bills", nameHi: "बिल", icon: Home, color: "from-accent to-gold-accent" },
  { name: "Health", nameHi: "स्वास्थ्य", icon: Heart, color: "from-destructive to-sunset-pink" },
  { name: "Other", nameHi: "अन्य", icon: Coffee, color: "from-primary to-accent" },
]

export function ExpenseModal({
  open,
  onOpenChange,
  onAdd, // Added onAdd prop
}: ExpenseModalProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name)
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")

  useEffect(() => {
    if (open) {
      setSelectedCategory(categories[0].name)
      setAmount("")
      setNote("")
    }
  }, [open])

  const handleSubmit = () => {
    const amountNum = Number.parseFloat(amount)
    if (amountNum && amountNum > 0 && onAdd) {
      onAdd(selectedCategory, amountNum, note)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-white/20 backdrop-blur-2xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Plus className="h-6 w-6 text-sunset-pink" />
            Add Expense
          </DialogTitle>
          <p className="text-sm text-muted-foreground">Track your spending</p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Category Selection */}
          <div className="space-y-2">
            <Label>Category</Label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon
                const isSelected = selectedCategory === cat.name
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setSelectedCategory(cat.name)}
                    className={cn(
                      "p-3 rounded-xl glass border-2 transition-all flex flex-col items-center gap-1",
                      isSelected ? "border-primary bg-primary/10 scale-105" : "border-white/20 hover:border-white/40",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-[10px] font-medium">{cat.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="expense-amount">Amount (₹)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                id="expense-amount"
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 h-12 text-lg glass border-white/20"
              />
            </div>
          </div>

          {/* Note Input */}
          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Input
              id="note"
              placeholder="e.g., Weekly groceries"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="glass border-white/20"
            />
          </div>

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
              className="flex-1 bg-gradient-to-r from-sunset-pink to-accent"
              onClick={handleSubmit}
              disabled={!amount || Number.parseFloat(amount) <= 0}
            >
              Add Expense
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
