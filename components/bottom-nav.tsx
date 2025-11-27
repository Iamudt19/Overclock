"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, PieChart, Target, Sparkles, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", icon: Home, label: "Home", labelHi: "होम" },
  { href: "/expenses", icon: PieChart, label: "Expenses", labelHi: "खर्च" },
  { href: "/savings", icon: Target, label: "Savings", labelHi: "बचत" },
  { href: "/ai-advisor", icon: MessageCircle, label: "AI Advisor", labelHi: "AI सलाहकार" },
  { href: "/analytics", icon: Sparkles, label: "Analytics", labelHi: "विश्लेषण" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 glass backdrop-blur-2xl">
      <div className="flex items-center justify-around px-2 py-3 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "animate-bounce")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
