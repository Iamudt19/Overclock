"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface SavingsGoalCardProps {
  title: string
  titleHi: string
  target: number
  current: number
  icon: string
  color: string
  gradient: string
  index: number
  onClick?: () => void
}

export function SavingsGoalCard({
  title,
  titleHi,
  target,
  current,
  icon,
  color,
  gradient,
  index,
  onClick,
}: SavingsGoalCardProps) {
  const percentage = Math.min((current / target) * 100, 100)
  const remaining = target - current

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
    >
      <Card className="glass border-white/20 p-6 cursor-pointer hover:scale-[1.02] transition-transform relative overflow-hidden">
        <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full ${color} blur-3xl opacity-30`} />

        <div className="relative z-10 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`h-12 w-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl`}
              >
                {icon}
              </div>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-xs text-muted-foreground">{titleHi}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Target</p>
              <p className="font-bold text-sm">₹{target.toLocaleString()}</p>
            </div>
          </div>

          {/* Animated Progress Arc */}
          <div className="relative h-32 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              {/* Background arc */}
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-muted/20"
                strokeLinecap="round"
              />
              {/* Animated progress arc */}
              <motion.circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 50}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - percentage / 100) }}
                transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" className={color} />
                  <stop offset="100%" className="stop-color-secondary" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.p
                className="text-3xl font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
              >
                {Math.round(percentage)}%
              </motion.p>
              <p className="text-xs text-muted-foreground">Complete</p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Saved</span>
              <span className="font-semibold text-teal">₹{current.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Remaining</span>
              <span className="font-semibold text-sunset-pink">₹{remaining.toLocaleString()}</span>
            </div>
          </div>

          {/* Add Money Button */}
          <Button
            className={`w-full bg-gradient-to-r ${gradient}`}
            onClick={(e) => {
              e.stopPropagation()
              // Handle add money
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Money
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
