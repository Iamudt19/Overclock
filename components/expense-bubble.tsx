"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ExpenseBubbleProps {
  category: string
  categoryHi: string
  amount: number
  color: string
  icon: string
  percentage: number
  index: number
  onClick?: () => void
}

export function ExpenseBubble({
  category,
  categoryHi,
  amount,
  color,
  icon,
  percentage,
  index,
  onClick,
}: ExpenseBubbleProps) {
  // Size based on percentage
  const size = Math.max(80, Math.min(160, 80 + percentage * 80))

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="cursor-pointer"
      style={{
        width: size,
        height: size,
      }}
    >
      <div
        className={cn(
          "w-full h-full rounded-full glass border-2 flex flex-col items-center justify-center gap-1 animate-float backdrop-blur-xl",
          color,
        )}
        style={{
          animationDelay: `${index * 0.3}s`,
        }}
      >
        <span className="text-2xl">{icon}</span>
        <span className="text-xs font-bold">{Math.round(percentage * 100)}%</span>
        <span className="text-[10px] font-medium text-center px-2">{category}</span>
        <span className="text-xs font-bold">₹{amount}</span>
      </div>
    </motion.div>
  )
}
