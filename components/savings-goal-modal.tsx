"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Target, Calendar, Sparkles } from "lucide-react"

interface SavingsGoalModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddGoal?: (goal: any) => void
}

const goalTemplates = [
  { name: "Emergency Fund", nameHi: "आपातकालीन निधि", icon: "🛡️", suggested: 50000 },
  { name: "New Phone", nameHi: "नया फोन", icon: "📱", suggested: 30000 },
  { name: "Vacation", nameHi: "छुट्टी", icon: "✈️", suggested: 40000 },
  { name: "Education", nameHi: "शिक्षा", icon: "📚", suggested: 100000 },
  { name: "Vehicle", nameHi: "वाहन", icon: "🏍️", suggested: 80000 },
  { name: "Custom", nameHi: "कस्टम", icon: "🎯", suggested: 0 },
]

export function SavingsGoalModal({ open, onOpenChange, onAddGoal }: SavingsGoalModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(goalTemplates[0])
  const [goalName, setGoalName] = useState(goalTemplates[0].name)
  const [targetAmount, setTargetAmount] = useState(goalTemplates[0].suggested.toString())
  const [timeline, setTimeline] = useState("6")

  useState(() => {
    if (open) {
      setSelectedTemplate(goalTemplates[0])
      setGoalName(goalTemplates[0].name)
      setTargetAmount(goalTemplates[0].suggested.toString())
      setTimeline("6")
    }
  })

  const handleTemplateSelect = (template: (typeof goalTemplates)[0]) => {
    setSelectedTemplate(template)
    setGoalName(template.name)
    setTargetAmount(template.suggested.toString())
  }

  const handleCreateGoal = () => {
    console.log("[v0] Creating goal with:", { goalName, targetAmount, timeline })

    if (onAddGoal && goalName && targetAmount) {
      onAddGoal({
        name: goalName,
        nameHi: selectedTemplate.nameHi,
        icon: selectedTemplate.icon,
        target: targetAmount,
        timeline: timeline,
      })
      console.log("[v0] Goal creation triggered")
    }

    onOpenChange(false)

    // Reset form
    setSelectedTemplate(goalTemplates[0])
    setGoalName(goalTemplates[0].name)
    setTargetAmount(goalTemplates[0].suggested.toString())
    setTimeline("6")
  }

  const monthlySavings = targetAmount ? Math.ceil(Number.parseInt(targetAmount) / Number.parseInt(timeline)) : 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-white/20 backdrop-blur-2xl max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Target className="h-6 w-6 text-teal" />
            Create Savings Goal
          </DialogTitle>
          <p className="text-sm text-muted-foreground">Set a target and track your progress</p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Goal Templates */}
          <div className="space-y-2">
            <Label>Choose Template</Label>
            <div className="grid grid-cols-3 gap-2">
              {goalTemplates.map((template) => (
                <button
                  key={template.name}
                  type="button"
                  onClick={() => handleTemplateSelect(template)}
                  className={cn(
                    "p-3 rounded-xl glass border-2 transition-all flex flex-col items-center gap-1",
                    selectedTemplate.name === template.name
                      ? "border-teal bg-teal/10 scale-105"
                      : "border-white/20 hover:border-white/40",
                  )}
                >
                  <span className="text-2xl">{template.icon}</span>
                  <span className="text-[10px] font-medium text-center">{template.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Goal Name */}
          <div className="space-y-2">
            <Label htmlFor="goal-name">Goal Name</Label>
            <Input
              id="goal-name"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              placeholder="e.g., Emergency Fund"
              className="glass border-white/20"
            />
          </div>

          {/* Target Amount */}
          <div className="space-y-2">
            <Label htmlFor="target-amount">Target Amount (₹)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                id="target-amount"
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="0"
                className="pl-8 h-12 text-lg glass border-white/20"
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-2">
            <Label htmlFor="timeline">Timeline (Months)</Label>
            <div className="flex items-center gap-3">
              <Input
                id="timeline"
                type="number"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="glass border-white/20"
                min="1"
              />
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          {/* AI Suggestion */}
          <div className="glass border-white/20 p-4 rounded-xl space-y-2 bg-teal/5">
            <div className="flex items-center gap-2 text-teal">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span className="text-sm font-medium">Smart Savings Plan</span>
            </div>
            <p className="text-sm">
              Save <span className="font-bold text-teal">₹{monthlySavings.toLocaleString()}</span> per month to reach
              your goal in {timeline} months.
            </p>
            <p className="text-xs text-muted-foreground">
              Based on your income pattern, this is achievable with 15% of your monthly earnings.
            </p>
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
              className="flex-1 bg-gradient-to-r from-teal to-secondary"
              onClick={handleCreateGoal}
              disabled={!goalName || !targetAmount}
            >
              Create Goal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
