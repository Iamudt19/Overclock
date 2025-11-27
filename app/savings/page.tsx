"use client"

import { cn } from "@/lib/utils"

import { useState, useEffect } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { LanguageToggle } from "@/components/language-toggle"
import { SavingsGoalCard } from "@/components/savings-goal-card"
import { SavingsGoalModal } from "@/components/savings-goal-modal"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, Plus, TrendingUp, Award } from "lucide-react"
import { AuthWrapper } from "@/components/auth-wrapper"
import { useAuth } from "@/lib/auth-context"

const initialGoals = [
  {
    id: "1",
    title: "Emergency Fund",
    titleHi: "आपातकालीन निधि",
    target: 50000,
    current: 34000,
    icon: "🛡️",
    color: "bg-teal",
    gradient: "from-teal to-secondary",
  },
  {
    id: "2",
    title: "New Phone",
    titleHi: "नया फोन",
    target: 30000,
    current: 22500,
    icon: "📱",
    color: "bg-primary",
    gradient: "from-primary to-secondary",
  },
  {
    id: "3",
    title: "Vacation",
    titleHi: "छुट्टी",
    target: 40000,
    current: 12000,
    icon: "✈️",
    color: "bg-accent",
    gradient: "from-accent to-gold-accent",
  },
]

export default function SavingsPage() {
  const { user } = useAuth()
  const [goalModalOpen, setGoalModalOpen] = useState(false)
  const [savingsGoals, setSavingsGoals] = useState(initialGoals)

  useEffect(() => {
    if (user?.username) {
      const storedGoals = localStorage.getItem(`savings_goals_${user.username}`)
      if (storedGoals) {
        try {
          setSavingsGoals(JSON.parse(storedGoals))
        } catch {
          setSavingsGoals(initialGoals)
        }
      } else {
        // Save initial goals if no stored goals exist
        localStorage.setItem(`savings_goals_${user.username}`, JSON.stringify(initialGoals))
      }
    }
  }, [user?.username])

  const handleAddGoal = (newGoal: any) => {
    console.log("[v0] Adding new goal:", newGoal)

    const goalToAdd = {
      id: Date.now().toString(),
      title: newGoal.name,
      titleHi: newGoal.nameHi || newGoal.name,
      target: Number(newGoal.target),
      current: 0,
      icon: newGoal.icon,
      color: "bg-teal",
      gradient: "from-teal to-secondary",
    }

    const updatedGoals = [...savingsGoals, goalToAdd]
    console.log("[v0] Updated goals list:", updatedGoals)
    setSavingsGoals(updatedGoals)

    if (user?.username) {
      localStorage.setItem(`savings_goals_${user.username}`, JSON.stringify(updatedGoals))
      console.log("[v0] Saved to localStorage")
    }
  }

  const totalTarget = savingsGoals.reduce((sum, goal) => sum + goal.target, 0)
  const totalSaved = savingsGoals.reduce((sum, goal) => sum + goal.current, 0)
  const overallPercentage = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-teal/5 via-background to-secondary/5 pb-24">
        {/* Header */}
        <header className="sticky top-0 z-40 glass border-b border-white/10 backdrop-blur-2xl">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal to-secondary flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Savings Goals</h1>
                <p className="text-[10px] text-muted-foreground">बचत लक्ष्य • Track Progress</p>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 space-y-6">
          {/* Overall Progress */}
          <Card className="glass border-white/20 p-6 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal/10 blur-3xl" />
            <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-secondary/10 blur-3xl" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm text-muted-foreground">Total Savings Progress</h2>
                  <p className="text-4xl font-bold bg-gradient-to-r from-teal to-secondary bg-clip-text text-transparent">
                    {overallPercentage}%
                  </p>
                </div>
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-teal to-secondary flex items-center justify-center">
                  <Award className="h-10 w-10 text-white animate-pulse" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">₹{totalSaved.toLocaleString()}</span>
                  <span className="text-muted-foreground">₹{totalTarget.toLocaleString()}</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal via-secondary to-accent rounded-full transition-all duration-1000"
                    style={{ width: `${overallPercentage}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-teal pt-2">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">Keep going! You're doing great!</span>
              </div>
            </div>
          </Card>

          {/* Action Button */}
          <div className="flex justify-between items-center px-1">
            <h3 className="text-sm font-semibold text-muted-foreground">Your Goals</h3>
            <Button
              size="sm"
              className="bg-gradient-to-r from-teal to-secondary gap-2"
              onClick={() => setGoalModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              New Goal
            </Button>
          </div>

          {/* Savings Goals Grid */}
          <div className="grid gap-4">
            {savingsGoals.map((goal, index) => (
              <SavingsGoalCard key={goal.id} {...goal} index={index} />
            ))}
          </div>

          {/* Milestones */}
          <Card className="glass border-white/20 p-6 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Award className="h-5 w-5 text-gold-accent" />
              Milestones Achieved
            </h3>
            <div className="space-y-3">
              {[
                { title: "First ₹10,000 saved", titleHi: "पहले ₹10,000 बचाए", date: "2 weeks ago", icon: "🎯" },
                { title: "Saved for 30 days straight", titleHi: "30 दिन लगातार बचत", date: "1 week ago", icon: "🔥" },
                { title: "Reached 50% of Emergency Fund", titleHi: "आपातकालीन निधि का 50%", date: "Today", icon: "⭐" },
              ].map((milestone, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl glass border border-white/20">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gold-accent to-accent flex items-center justify-center text-xl">
                    {milestone.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{milestone.title}</p>
                    <p className="text-xs text-muted-foreground">{milestone.titleHi}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{milestone.date}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Visual Pathway */}
          <Card className="glass border-white/20 p-6 space-y-4">
            <h3 className="font-semibold">Savings Journey</h3>
            <div className="relative py-4">
              {/* Progress Line */}
              <div className="absolute left-6 top-8 bottom-8 w-1 bg-gradient-to-b from-teal via-secondary to-accent" />

              {/* Journey Steps */}
              <div className="space-y-6">
                {[
                  { label: "Started Saving", amount: "₹0", status: "complete" },
                  { label: "First ₹10K", amount: "₹10,000", status: "complete" },
                  { label: "Halfway There", amount: "₹25,000", status: "current" },
                  { label: "Almost Done", amount: "₹40,000", status: "future" },
                  { label: "Goal Achieved!", amount: "₹50,000", status: "future" },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-4 relative">
                    <div
                      className={cn(
                        "h-12 w-12 rounded-full flex items-center justify-center font-bold z-10 border-4 border-background",
                        step.status === "complete" && "bg-gradient-to-br from-teal to-secondary text-white",
                        step.status === "current" &&
                          "bg-gradient-to-br from-accent to-gold-accent text-white animate-pulse",
                        step.status === "future" && "bg-muted text-muted-foreground",
                      )}
                    >
                      {step.status === "complete" ? "✓" : i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{step.label}</p>
                      <p className="text-xs text-muted-foreground">{step.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </main>

        <BottomNav />
        <SavingsGoalModal open={goalModalOpen} onOpenChange={setGoalModalOpen} onAddGoal={handleAddGoal} />
      </div>
    </AuthWrapper>
  )
}
